/**
 * DIXIGRAM — Misi Harian & Tantangan Mingguan (v1.5)
 * File: Missions.gs
 *
 *  - Setiap hari ada 3 misi harian, setiap minggu (Senin–Minggu, WIB)
 *    ada 3 tantangan mingguan. Pilihannya sama untuk semua pengguna
 *    (diacak secara deterministik dari tanggal) agar bisa dibahas bersama.
 *  - Progres dihitung dari riwayat latihan (DIXI_Activity), jadi tidak
 *    ada kolom baru di sheet lama.
 *  - Misi yang sudah selesai diklaim untuk mendapat XP bonus. Klaim
 *    dicatat di sheet DIXI_Missions (dibuat otomatis saat klaim pertama).
 *  - Peringkat mingguan = XP latihan + XP misi pada minggu berjalan.
 *  - Hanya untuk akun aktif. Tamu & akun pending melihat pratinjau terkunci.
 */

const MISSION_SHEET = 'DIXI_Missions';
const MISSION_HEADERS = ['ID', 'Email', 'Period', 'MissionID', 'XP', 'ClaimedAt'];
const MISSION_FORMATS = ['@', '@', '@', '@', '0', '@'];
const MISSIONS_PER_PERIOD = 3;

/* metric = kunci di missionMetrics_(); group = misi segrup tidak muncul bersamaan */
const DAILY_MISSION_POOL = [
  { id: 'd-quiz2', group: 'quiz', title: 'Pemanasan', description: 'Selesaikan 2 latihan hari ini.', icon: 'play', metric: 'quizzes', target: 2, xp: 15 },
  { id: 'd-quiz3', group: 'quiz', title: 'Tiga Ronde', description: 'Selesaikan 3 latihan hari ini.', icon: 'rotate', metric: 'quizzes', target: 3, xp: 20 },
  { id: 'd-correct10', group: 'correct', title: 'Sepuluh Tepat', description: 'Jawab benar 10 soal hari ini.', icon: 'circle-check', metric: 'correct', target: 10, xp: 20 },
  { id: 'd-correct15', group: 'correct', title: 'Mesin Jawaban', description: 'Jawab benar 15 soal hari ini.', icon: 'circle-check', metric: 'correct', target: 15, xp: 25 },
  { id: 'd-score80', group: 'score', title: 'Bidikan Tajam', description: 'Raih skor minimal 80% dalam satu latihan.', icon: 'target', metric: 'bestScore', target: 80, xp: 20 },
  { id: 'd-perfect', group: 'score', title: 'Tanpa Cela', description: 'Raih skor 100% dalam satu latihan.', icon: 'sparkles', metric: 'perfect', target: 1, xp: 25 },
  { id: 'd-both', group: 'track', title: 'Dua Jalur', description: 'Latihan grammar dan vocabulary di hari yang sama.', icon: 'layers', metric: 'tracks', target: 2, xp: 20 },
  { id: 'd-grammar2', group: 'track', title: 'Fokus Grammar', description: 'Selesaikan 2 latihan grammar hari ini.', icon: 'book-open', metric: 'grammar', target: 2, xp: 15 },
  { id: 'd-vocab2', group: 'track', title: 'Fokus Kosakata', description: 'Selesaikan 2 latihan vocabulary hari ini.', icon: 'languages', metric: 'vocabulary', target: 2, xp: 15 },
  { id: 'd-new', group: 'new', title: 'Penjelajah', description: 'Coba 1 modul yang belum pernah kamu mainkan.', icon: 'compass', metric: 'newModules', target: 1, xp: 20 },
  { id: 'd-goal', group: 'goal', title: 'Target Tercapai', description: 'Penuhi target XP harianmu.', icon: 'flag', metric: 'goalPct', target: 100, xp: 25 }
];

const WEEKLY_MISSION_POOL = [
  { id: 'w-quiz10', group: 'quiz', title: 'Maraton Mingguan', description: 'Selesaikan 10 latihan minggu ini.', icon: 'rocket', metric: 'quizzes', target: 10, xp: 60 },
  { id: 'w-xp400', group: 'xp', title: 'Pemburu XP', description: 'Kumpulkan 400 XP dari latihan minggu ini.', icon: 'bolt', metric: 'xp', target: 400, xp: 80 },
  { id: 'w-correct50', group: 'xp', title: 'Lima Puluh Benar', description: 'Jawab benar 50 soal minggu ini.', icon: 'circle-check', metric: 'correct', target: 50, xp: 70 },
  { id: 'w-perfect3', group: 'score', title: 'Trio Sempurna', description: 'Raih 3 skor 100% minggu ini.', icon: 'sparkles', metric: 'perfect', target: 3, xp: 80 },
  { id: 'w-pass4', group: 'score', title: 'Penakluk Modul', description: 'Lulus (≥ 60%) di 4 modul berbeda minggu ini.', icon: 'award', metric: 'passedModules', target: 4, xp: 70 },
  { id: 'w-days5', group: 'days', title: 'Rajin Lima Hari', description: 'Berlatih pada 5 hari berbeda minggu ini.', icon: 'calendar', metric: 'days', target: 5, xp: 80 },
  { id: 'w-days3', group: 'days', title: 'Konsisten', description: 'Berlatih pada 3 hari berbeda minggu ini.', icon: 'flame', metric: 'days', target: 3, xp: 60 },
  { id: 'w-grammar5', group: 'track', title: 'Pekan Grammar', description: 'Selesaikan 5 latihan grammar minggu ini.', icon: 'book-open', metric: 'grammar', target: 5, xp: 60 },
  { id: 'w-vocab5', group: 'track', title: 'Pekan Kosakata', description: 'Selesaikan 5 latihan vocabulary minggu ini.', icon: 'languages', metric: 'vocabulary', target: 5, xp: 60 },
  { id: 'w-new3', group: 'new', title: 'Jelajah Materi', description: 'Coba 3 modul baru minggu ini.', icon: 'map', metric: 'newModules', target: 3, xp: 70 }
];

/* =========================================================
   API
   ========================================================= */

function apiMissions(token) {
  return api_(function () {
    const session = resolveSession_(token, true);
    return { missions: buildMissions_(session) };
  });
}

function apiClaimMission(token, missionId) {
  return api_(function () {
    const session = resolveSession_(token, true);
    if (!session.user || session.access !== 'full') {
      throw apiError_('FORBIDDEN', 'Misi hanya tersedia untuk akun yang sudah aktif.');
    }
    const id = String(missionId || '').trim();
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      invalidateTable_(DIXI.SHEETS.ACTIVITY);
      const state = buildMissions_(session);
      const all = state.daily.missions.concat(state.weekly.missions);
      const mission = all.filter(function (m) { return m.id === id; })[0];
      if (!mission) throw apiError_('NOT_FOUND', 'Misi ini tidak berlaku pada periode sekarang. Muat ulang halaman.');
      if (mission.claimed) throw apiError_('ALREADY_CLAIMED', 'Hadiah misi ini sudah kamu klaim.');
      if (!mission.completed) throw apiError_('NOT_COMPLETE', 'Misi belum selesai. Lanjutkan latihan dulu, ya.');

      const period = mission.period === 'weekly' ? state.weekly.key : state.daily.key;
      appendMissionClaim_({
        id: Utilities.getUuid(),
        email: session.user.email,
        period: period,
        missionId: mission.id,
        xp: mission.xp,
        claimedAt: nowIso_()
      });

      const fresh = findUserByEmail_(session.user.email);
      updateUserGameStats_(fresh.email, { xp: fresh.xp + mission.xp });

      const updatedUser = findUserByEmail_(fresh.email);
      const nextSession = Object.assign({}, session, { user: updatedUser });
      const profile = buildProfile_(updatedUser);
      const progress = buildProgressSummary_(updatedUser, nextSession);
      return {
        claimed: { id: mission.id, title: mission.title, xp: mission.xp, period: mission.period },
        profile: profile,
        progress: progress,
        achievements: evaluateAchievements_(progress, profile, updatedUser),
        leaderboard: buildLeaderboard_(nextSession),
        missions: buildMissions_(nextSession)
      };
    } finally {
      lock.releaseLock();
    }
  });
}

/* =========================================================
   PENYIMPANAN
   ========================================================= */

function getMissionSheet_(create) {
  const ss = getDatabase_();
  let sheet = ss.getSheetByName(MISSION_SHEET);
  if (!sheet && create) {
    sheet = ensureSheet_(ss, MISSION_SHEET, MISSION_HEADERS, MISSION_FORMATS, '#f472b6');
  }
  return sheet;
}

function getMissionTable_() {
  if (DB_RUNTIME_.tables[MISSION_SHEET]) return DB_RUNTIME_.tables[MISSION_SHEET];
  const sheet = getMissionSheet_(false);
  if (!sheet) return [];
  const last = sheet.getLastRow();
  const rows = last < 2 ? [] : sheet.getRange(2, 1, last - 1, MISSION_HEADERS.length).getValues();
  DB_RUNTIME_.tables[MISSION_SHEET] = rows;
  return rows;
}

function mapMissionRow_(row) {
  return {
    id: cellText_(row[0]),
    email: cellText_(row[1]).toLowerCase(),
    period: cellText_(row[2]),
    missionId: cellText_(row[3]),
    xp: Number(row[4]) || 0,
    claimedAt: cellIso_(row[5])
  };
}

function appendMissionClaim_(claim) {
  getMissionSheet_(true);
  appendTypedRow_(MISSION_SHEET, [
    claim.id, claim.email, claim.period, claim.missionId, claim.xp, claim.claimedAt
  ], MISSION_FORMATS);
}

function getMissionClaimsByEmail_(email) {
  const needle = normalizeEmail_(email);
  return getMissionTable_()
    .filter(function (row) { return cellText_(row[1]).toLowerCase() === needle; })
    .map(mapMissionRow_);
}

/** Dipanggil saat admin mereset/menghapus data belajar pengguna. */
function deleteUserMissionData_(email) {
  const sheet = getMissionSheet_(false);
  if (!sheet) return 0;
  const needle = normalizeEmail_(email);
  const rows = getMissionTable_();
  const kept = rows.filter(function (row) { return cellText_(row[1]).toLowerCase() !== needle; });
  if (kept.length !== rows.length) {
    rewriteTable_(MISSION_SHEET, MISSION_HEADERS.length, kept);
  }
  return rows.length - kept.length;
}

/** Ringkasan klaim untuk lencana: jumlah misi harian & tantangan mingguan. */
function missionTotals_(email) {
  const totals = { daily: 0, weekly: 0, xp: 0 };
  getMissionClaimsByEmail_(email).forEach(function (c) {
    if (c.period.indexOf('W:') === 0) totals.weekly++;
    else totals.daily++;
    totals.xp += c.xp;
  });
  return totals;
}

/* =========================================================
   PERIODE & PEMILIHAN MISI
   ========================================================= */

function addDaysKey_(dateKey, days) {
  const d = new Date(dateKey + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Senin awal minggu (WIB) untuk tanggal yyyy-MM-dd. */
function weekStartKey_(dateKey) {
  const dow = new Date(dateKey + 'T00:00:00Z').getUTCDay(); // 0 = Minggu
  return addDaysKey_(dateKey, -((dow + 6) % 7));
}

function missionSeed_(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function pickMissions_(pool, seedText, count) {
  let seed = missionSeed_(seedText) || 1;
  function rnd() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  const shuffled = pool.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
  }
  const groups = {};
  const picked = [];
  shuffled.forEach(function (m) {
    if (picked.length >= count || groups[m.group]) return;
    groups[m.group] = true;
    picked.push(m);
  });
  return picked;
}

function shortDateLabel_(dateKey) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const parts = dateKey.split('-');
  return Number(parts[2]) + ' ' + months[Number(parts[1]) - 1];
}

/* =========================================================
   PERHITUNGAN PROGRES
   ========================================================= */

function missionMetrics_(rows, firstPlayed, inRange, goal) {
  const m = {
    quizzes: 0, correct: 0, xp: 0, bestScore: 0, perfect: 0,
    grammar: 0, vocabulary: 0, tracks: 0, newModules: 0,
    days: 0, passedModules: 0, goalPct: 0
  };
  const tracks = {};
  const days = {};
  const passed = {};
  rows.forEach(function (a) {
    m.quizzes++;
    m.correct += a.correct;
    m.xp += a.xp;
    m.bestScore = Math.max(m.bestScore, a.score);
    if (a.score >= 100) m.perfect++;
    if (a.track === 'grammar') m.grammar++;
    if (a.track === 'vocabulary') m.vocabulary++;
    tracks[a.track] = true;
    days[a.date] = true;
    if (a.score >= DIXI.PASS_SCORE) passed[a.track + ':' + a.moduleId] = true;
  });
  m.tracks = Object.keys(tracks).length;
  m.days = Object.keys(days).length;
  m.passedModules = Object.keys(passed).length;
  Object.keys(firstPlayed).forEach(function (key) {
    if (inRange(firstPlayed[key])) m.newModules++;
  });
  m.goalPct = goal ? Math.round((m.xp / goal) * 100) : 0;
  return m;
}

function decorateMissions_(defs, metrics, claimedIds, period) {
  return defs.map(function (d) {
    const value = Number(metrics[d.metric]) || 0;
    const completed = value >= d.target;
    const claimed = !!claimedIds[d.id];
    return {
      id: d.id,
      period: period,
      title: d.title,
      description: d.description,
      icon: d.icon,
      target: d.target,
      value: Math.min(value, d.target),
      unit: d.metric === 'goalPct' || d.metric === 'bestScore' ? '%' : (d.metric === 'xp' ? ' XP' : ''),
      pct: Math.min(100, Math.round((value / d.target) * 100)),
      xp: d.xp,
      completed: completed,
      claimed: claimed,
      claimable: completed && !claimed
    };
  });
}

/**
 * Status misi untuk satu sesi. Selalu mengembalikan daftar misi periode ini
 * (untuk pratinjau), tetapi progres & klaim hanya untuk akun aktif.
 */
function buildMissions_(session) {
  const today = todayKey_();
  const weekStart = weekStartKey_(today);
  const weekEnd = addDaysKey_(weekStart, 6);
  const dailyKey = 'D:' + today;
  const weeklyKey = 'W:' + weekStart;
  const dailyDefs = pickMissions_(DAILY_MISSION_POOL, dailyKey, MISSIONS_PER_PERIOD);
  const weeklyDefs = pickMissions_(WEEKLY_MISSION_POOL, weeklyKey, MISSIONS_PER_PERIOD);
  const active = !!(session.user && session.access === 'full');

  const now = new Date();
  const hh = Number(Utilities.formatDate(now, DIXI.TIMEZONE, 'HH')) || 0;
  const mm = Number(Utilities.formatDate(now, DIXI.TIMEZONE, 'mm')) || 0;
  const minutesLeftToday = Math.max(1, (24 * 60) - (hh * 60 + mm));
  const dow = new Date(today + 'T00:00:00Z').getUTCDay();
  const daysLeftWeek = 7 - ((dow + 6) % 7); // termasuk hari ini

  let dailyMetrics = {};
  let weeklyMetrics = {};
  let claimedDaily = {};
  let claimedWeekly = {};
  let totals = { daily: 0, weekly: 0, xp: 0 };

  if (active) {
    const activity = getActivityByEmail_(session.user.email);
    const firstPlayed = {};
    activity.forEach(function (a) {
      const key = a.track + ':' + a.moduleId;
      if (!firstPlayed[key] || a.date < firstPlayed[key]) firstPlayed[key] = a.date;
    });
    const goal = session.user.dailyGoal || DIXI.DEFAULT_GOAL;
    dailyMetrics = missionMetrics_(
      activity.filter(function (a) { return a.date === today; }),
      firstPlayed,
      function (d) { return d === today; },
      goal
    );
    weeklyMetrics = missionMetrics_(
      activity.filter(function (a) { return a.date >= weekStart && a.date <= weekEnd; }),
      firstPlayed,
      function (d) { return d >= weekStart && d <= weekEnd; },
      goal
    );
    getMissionClaimsByEmail_(session.user.email).forEach(function (c) {
      if (c.period === dailyKey) claimedDaily[c.missionId] = true;
      if (c.period === weeklyKey) claimedWeekly[c.missionId] = true;
      if (c.period.indexOf('W:') === 0) totals.weekly++; else totals.daily++;
      totals.xp += c.xp;
    });
  }

  const daily = decorateMissions_(dailyDefs, dailyMetrics, claimedDaily, 'daily');
  const weekly = decorateMissions_(weeklyDefs, weeklyMetrics, claimedWeekly, 'weekly');
  if (!active) {
    daily.concat(weekly).forEach(function (m) {
      m.value = 0; m.pct = 0; m.completed = false; m.claimed = false; m.claimable = false;
    });
  }

  function sumXp(list, claimedOnly) {
    return list.reduce(function (s, m) { return s + (!claimedOnly || m.claimed ? m.xp : 0); }, 0);
  }

  return {
    available: active,
    reason: active ? '' : (session.user ? 'pending' : 'guest'),
    daily: {
      key: dailyKey,
      date: today,
      label: shortDateLabel_(today),
      minutesLeft: minutesLeftToday,
      missions: daily,
      done: daily.filter(function (m) { return m.claimed; }).length,
      xpTotal: sumXp(daily, false),
      xpClaimed: sumXp(daily, true)
    },
    weekly: {
      key: weeklyKey,
      start: weekStart,
      end: weekEnd,
      label: shortDateLabel_(weekStart) + ' – ' + shortDateLabel_(weekEnd),
      daysLeft: daysLeftWeek,
      missions: weekly,
      done: weekly.filter(function (m) { return m.claimed; }).length,
      xpTotal: sumXp(weekly, false),
      xpClaimed: sumXp(weekly, true),
      stats: active ? {
        quizzes: weeklyMetrics.quizzes || 0,
        xp: weeklyMetrics.xp || 0,
        days: weeklyMetrics.days || 0
      } : null
    },
    claimable: daily.concat(weekly).filter(function (m) { return m.claimable; }).length,
    totals: totals,
    leaderboard: buildWeeklyLeaderboard_(session, weekStart, weekEnd)
  };
}

/** Peringkat minggu ini: XP latihan + XP misi (Senin–Minggu). */
function buildWeeklyLeaderboard_(session, weekStart, weekEnd) {
  const users = getRankedUsers_();
  const byEmail = {};
  users.forEach(function (u) { byEmail[u.email] = { user: u, xp: 0, quizzes: 0 }; });

  getActivityTable_().forEach(function (row) {
    const email = cellText_(row[1]).toLowerCase();
    const entry = byEmail[email];
    if (!entry) return;
    const date = cellDateKey_(row[2]);
    if (date >= weekStart && date <= weekEnd) {
      entry.xp += Number(row[8]) || 0;
      entry.quizzes++;
    }
  });

  const weeklyKey = 'W:' + weekStart;
  getMissionTable_().forEach(function (row) {
    const entry = byEmail[cellText_(row[1]).toLowerCase()];
    if (!entry) return;
    const period = cellText_(row[2]);
    const inWeek = period === weeklyKey ||
      (period.indexOf('D:') === 0 && period.slice(2) >= weekStart && period.slice(2) <= weekEnd);
    if (inWeek) entry.xp += Number(row[4]) || 0;
  });

  const ranked = Object.keys(byEmail).map(function (k) { return byEmail[k]; })
    .filter(function (e) { return e.xp > 0; })
    .sort(function (a, b) {
      if (b.xp !== a.xp) return b.xp - a.xp;
      if (b.quizzes !== a.quizzes) return b.quizzes - a.quizzes;
      return a.user.name.localeCompare(b.user.name);
    });

  const me = session.user ? session.user.email : '';
  const entries = ranked.slice(0, 10).map(function (e, i) {
    return {
      rank: i + 1,
      name: e.user.name,
      xp: e.xp,
      quizzes: e.quizzes,
      level: levelInfo_(e.user.xp).level,
      isMe: e.user.email === me
    };
  });

  let you = null;
  if (session.user) {
    const idx = ranked.findIndex(function (e) { return e.user.email === me; });
    const mine = byEmail[me];
    you = {
      rank: idx >= 0 ? idx + 1 : 0,
      name: session.user.name,
      xp: mine ? mine.xp : 0,
      quizzes: mine ? mine.quizzes : 0,
      pending: session.access !== 'full'
    };
  }
  return { entries: entries, you: you, participants: ranked.length };
}
