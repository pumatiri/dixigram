/**
 * DIXIGRAM — Quiz Engine
 * File: Quiz.gs
 *
 * Alur:
 *   startQuiz  -> server memilih soal + menyimpan attempt di cache
 *   submit     -> server menilai jawaban, mengirim feedback
 *   finish     -> server menghitung XP, progress, streak, activity
 */

function startQuiz_(token, track, moduleId) {
  const session = resolveSession_(token, true);
  assertNotExpired_(session);
  const module = getModuleById_(moduleId);

  if (!module || module.track !== track) {
    throw apiError_('NOT_FOUND', 'Latihan tidak ditemukan.');
  }
  if (!isModuleUnlocked_(session, module.id)) {
    if (session.access === 'pending') {
      throw apiError_('PENDING_APPROVAL', 'Modul ini terbuka setelah akunmu divalidasi admin.');
    }
    throw apiError_('LOCKED', 'Latihan ini khusus member. Daftar gratis untuk membuka semua modul.');
  }

  // Tamu & akun yang menunggu validasi memakai kuota harian.
  const quota = consumeQuota_(session);

  const size = Math.min(DIXI.QUIZ_SIZE, module.quiz.length);
  const picked = shuffle_(module.quiz).slice(0, size);
  const attemptId = Utilities.getUuid();
  const now = nowIso_();

  const attempt = {
    id: attemptId,
    owner: attemptOwner_(session),
    role: session.user ? 'user' : 'guest',
    email: session.user ? session.user.email : '',
    guestId: session.user ? '' : session.guestId,
    track: track,
    moduleId: moduleId,
    questionIds: picked.map(function (q) { return q.id; }),
    answers: {},
    startedAt: now,
    finished: false,
    finishedResult: null
  };

  cacheAttempt_(attempt, 2 * 60 * 60);

  return {
    attemptId: attemptId,
    token: session.token,
    isGuest: !session.user,
    access: session.access,
    module: {
      id: module.id,
      track: module.track,
      title: module.title,
      subtitle: module.subtitle,
      level: module.level,
      icon: module.icon,
      accent: module.accent,
      minutes: module.minutes
    },
    questions: picked.map(publicQuestion_),
    total: picked.length,
    quota: quota,
    xpRules: publicConfig_().xp,
    passScore: DIXI.PASS_SCORE,
    startedAt: now
  };
}

function submitAnswer_(token, attemptId, questionId, answer) {
  const session = resolveSession_(token, true);
  assertNotExpired_(session);
  const attempt = getAttempt_(attemptId, session);

  if (attempt.finished) {
    throw apiError_('QUIZ_FINISHED', 'Latihan ini sudah selesai.');
  }
  if (attempt.questionIds.indexOf(questionId) === -1) {
    throw apiError_('INVALID_QUESTION', 'Soal tidak termasuk dalam latihan ini.');
  }

  const module = getModuleById_(attempt.moduleId);
  const question = findQuestion_(module, questionId);
  if (!question) {
    throw apiError_('NOT_FOUND', 'Soal tidak ditemukan.');
  }

  // Idempotensi: jangan menilai dua kali, kembalikan hasil yang sama.
  if (attempt.answers[questionId]) {
    return Object.assign({}, attempt.answers[questionId], {
      duplicate: true,
      answeredCount: Object.keys(attempt.answers).length,
      total: attempt.questionIds.length
    });
  }

  const feedback = gradeAnswer_(question, String(answer == null ? '' : answer).slice(0, 200));
  attempt.answers[questionId] = feedback;
  cacheAttempt_(attempt, 2 * 60 * 60);

  return Object.assign({}, feedback, {
    answeredCount: Object.keys(attempt.answers).length,
    total: attempt.questionIds.length,
    duplicate: false
  });
}

function finishQuiz_(token, attemptId) {
  const session = resolveSession_(token, true);
  assertNotExpired_(session);
  const attempt = getAttempt_(attemptId, session);

  if (attempt.finished && attempt.finishedResult && !attempt.finishedResult.slim) {
    return attempt.finishedResult;
  }
  if (attempt.finished) {
    throw apiError_('QUIZ_FINISHED', 'Latihan ini sudah selesai dan tersimpan. Muat ulang halaman untuk melihat progres terbaru.');
  }

  const module = getModuleById_(attempt.moduleId);
  const total = attempt.questionIds.length;

  if (Object.keys(attempt.answers).length < total) {
    throw apiError_('INCOMPLETE', 'Masih ada soal yang belum dijawab. Selesaikan semua soal dulu, ya.');
  }

  let correct = 0;
  attempt.questionIds.forEach(function (id) {
    const answer = attempt.answers[id];
    if (answer && answer.correct) correct++;
  });

  const score = total ? Math.round((correct / total) * 100) : 0;
  const perfect = total > 0 && correct === total;
  const baseXp = (correct * DIXI.XP_CORRECT) + DIXI.XP_COMPLETE + (perfect ? DIXI.XP_PERFECT : 0);
  const startedMs = new Date(attempt.startedAt).getTime();
  const durationSec = Math.max(1, Math.round((Date.now() - startedMs) / 1000));

  let result;
  let profile = null;
  let progress = null;
  let achievements = null;
  let quota = null;

  if (session.user) {
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      // Cek lagi setelah lock: mungkin request finish yang lain sudah selesai.
      const latest = getAttempt_(attemptId, session);
      if (latest.finished) {
        if (latest.finishedResult && !latest.finishedResult.slim) return latest.finishedResult;
        throw apiError_('QUIZ_FINISHED', 'Latihan ini sudah selesai dan tersimpan.');
      }

      const dateKey = todayKey_();
      const repeat = hasCompletedModuleOnDate_(
        session.user.email, attempt.track, attempt.moduleId, dateKey
      );
      const xpEarned = Math.round(baseXp * (repeat ? DIXI.XP_REPEAT_MULTIPLIER : 1));

      const existingRows = getProgressRowsByEmail_(session.user.email);
      const previous = existingRows.filter(function (p) {
        return p.track === attempt.track && p.moduleId === attempt.moduleId;
      })[0] || null;
      const previousBest = previous ? previous.bestScore : 0;

      const now = nowIso_();
      upsertProgress_({
        email: session.user.email,
        track: attempt.track,
        moduleId: attempt.moduleId,
        attempts: (previous ? previous.attempts : 0) + 1,
        correct: (previous ? previous.correct : 0) + correct,
        total: (previous ? previous.total : 0) + total,
        bestScore: Math.max(previousBest, score),
        completed: (previous ? previous.completed : false) || score >= DIXI.PASS_SCORE,
        lastPlayed: now,
        updatedAt: now
      });

      const freshUser = findUserByEmail_(session.user.email);
      const newStreak = calculateStreak_(freshUser.lastActive, dateKey, freshUser.streak);
      const newXp = freshUser.xp + xpEarned;
      updateUserGameStats_(freshUser.email, {
        xp: newXp,
        streak: newStreak,
        lastActive: dateKey
      });

      appendActivity_({
        id: Utilities.getUuid(),
        email: freshUser.email,
        date: dateKey,
        track: attempt.track,
        moduleId: attempt.moduleId,
        correct: correct,
        total: total,
        score: score,
        xp: xpEarned,
        createdAt: now
      });

      const updatedUser = findUserByEmail_(freshUser.email);
      profile = buildProfile_(updatedUser);
      progress = buildProgressSummary_(updatedUser, session);
      achievements = evaluateAchievements_(progress, profile, updatedUser);

      result = {
        moduleId: attempt.moduleId,
        track: attempt.track,
        moduleTitle: module.title,
        moduleIcon: module.icon,
        score: score,
        correct: correct,
        total: total,
        xpEarned: xpEarned,
        baseXp: baseXp,
        repeat: repeat,
        perfect: perfect,
        passScore: DIXI.PASS_SCORE,
        passed: score >= DIXI.PASS_SCORE,
        bestScore: Math.max(previousBest, score),
        previousBest: previousBest,
        isNewBest: score > previousBest,
        durationSec: durationSec,
        isGuest: false,
        access: session.access
      };

      // Tandai selesai SEBELUM lock dilepas: mencegah XP tercatat dua kali
      // bila tombol "Lihat hasil" terkirim ganda.
      const payloadUser = {
        result: result,
        profile: profile,
        progress: progress,
        achievements: achievements,
        quota: quotaUsage_(session),
        isGuest: false
      };
      attempt.finished = true;
      attempt.finishedResult = payloadUser;
      cacheAttempt_(attempt, 10 * 60);
      return payloadUser;
    } finally {
      lock.releaseLock();
    }
  } else {
    quota = quotaUsage_(session);
    result = {
      moduleId: attempt.moduleId,
      track: attempt.track,
      moduleTitle: module.title,
      moduleIcon: module.icon,
      score: score,
      correct: correct,
      total: total,
      xpEarned: baseXp,
      baseXp: baseXp,
      repeat: false,
      perfect: perfect,
      passScore: DIXI.PASS_SCORE,
      passed: score >= DIXI.PASS_SCORE,
      bestScore: score,
      previousBest: 0,
      isNewBest: true,
      durationSec: durationSec,
      isGuest: true,
      access: 'guest'
    };
  }

  const payload = {
    result: result,
    profile: profile,
    progress: progress,
    achievements: achievements,
    quota: quota,
    isGuest: !session.user
  };

  attempt.finished = true;
  attempt.finishedResult = payload;
  cacheAttempt_(attempt, 10 * 60);

  return payload;
}

/* =========================================================
   PENILAIAN
   ========================================================= */

function gradeAnswer_(question, rawAnswer) {
  let correct = false;
  let given = '';
  let correctAnswer = '';

  if (question.type === 'mcq') {
    const key = String(question.answer || 'a').toLowerCase();
    given = String(rawAnswer || '').trim().toLowerCase().slice(0, 1);
    correct = given === key;
    correctAnswer = question.options[key.charCodeAt(0) - 97] || '';
  } else {
    const normalized = normalizeAnswer_(rawAnswer);
    const accepted = (question.answers || []).map(normalizeAnswer_);
    given = String(rawAnswer || '').trim();
    correct = normalized.length > 0 && accepted.indexOf(normalized) !== -1;
    correctAnswer = (question.answers || [''])[0];
  }

  return {
    questionId: question.id,
    given: given,
    correct: correct,
    correctAnswer: correctAnswer,
    explanation: question.explanation || ''
  };
}

function normalizeAnswer_(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .replace(/^[\s"'.,!?;:]+|[\s"'.,!?;:]+$/g, '')
    .trim();
}

function publicQuestion_(q) {
  const item = {
    id: q.id,
    type: q.type,
    prompt: q.prompt,
    context: q.context || '',
    placeholder: q.placeholder || ''
  };
  if (q.type === 'mcq') {
    item.options = q.options.map(function (text, index) {
      return { id: optionLetter_(index), text: text };
    });
  }
  return item;
}

/* =========================================================
   ATTEMPT CACHE
   ========================================================= */

function cacheAttempt_(attempt, seconds) {
  const cache = CacheService.getScriptCache();
  const key = attemptCacheKey_(attempt.id);
  try {
    cache.put(key, JSON.stringify(attempt), seconds);
  } catch (err) {
    // Batas 100 KB per entri cache: simpan tanpa ringkasan hasil bila terlalu besar.
    const slim = Object.assign({}, attempt, {
      finishedResult: attempt.finishedResult ? { result: attempt.finishedResult.result, slim: true } : null
    });
    cache.put(key, JSON.stringify(slim), seconds);
  }
}

function getAttempt_(attemptId, session) {
  if (!attemptId) {
    throw apiError_('INVALID_ATTEMPT', 'Sesi latihan tidak valid.');
  }
  const raw = CacheService.getScriptCache().get(attemptCacheKey_(attemptId));
  if (!raw) {
    throw apiError_('ATTEMPT_EXPIRED', 'Sesi latihan kedaluwarsa. Mulai latihan baru, ya.');
  }

  let attempt;
  try {
    attempt = JSON.parse(raw);
  } catch (err) {
    throw apiError_('ATTEMPT_EXPIRED', 'Sesi latihan tidak bisa dibaca. Mulai lagi, ya.');
  }

  if (attempt.owner !== attemptOwner_(session)) {
    throw apiError_('FORBIDDEN', 'Latihan ini bukan milik sesi kamu.');
  }
  return attempt;
}

function attemptCacheKey_(attemptId) {
  return 'dixi_attempt_' + attemptId;
}

function attemptOwner_(session) {
  return session.user ? 'user:' + session.user.email : 'guest:' + session.guestId;
}

function calculateStreak_(lastActive, today, currentStreak) {
  if (!lastActive) return 1;
  if (lastActive === today) return Math.max(1, Number(currentStreak) || 1);
  if (lastActive === yesterdayKey_()) return (Number(currentStreak) || 0) + 1;
  return 1;
}
