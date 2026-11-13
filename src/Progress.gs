/**
 * DIXIGRAM — Progress & Achievements
 * File: Progress.gs
 */

function buildProgressSummary_(user, session) {
  const access = session ? session.access : (user.status === 'active' ? 'full' : 'pending');
  const modules = getAllModules_();
  const progressRows = getProgressRowsByEmail_(user.email);
  const activity = getActivityByEmail_(user.email);
  const byKey = {};

  progressRows.forEach(function (row) {
    byKey[row.track + ':' + row.moduleId] = row;
  });

  const today = todayKey_();
  const todayStats = { xp: 0, answers: 0, correct: 0, quizzes: 0, bestScore: 0 };

  activity.forEach(function (a) {
    if (a.date === today) {
      todayStats.xp += a.xp;
      todayStats.answers += a.total;
      todayStats.correct += a.correct;
      todayStats.quizzes += 1;
      todayStats.bestScore = Math.max(todayStats.bestScore, a.score);
    }
  });

  const totalModules = modules.length;
  const moduleSummaries = modules.map(function (m) {
    const p = byKey[m.track + ':' + m.id];
    return {
      track: m.track,
      moduleId: m.id,
      title: m.title,
      subtitle: m.subtitle,
      level: m.level,
      icon: m.icon,
      order: m.order,
      locked: access !== 'full' && !isFreeModule_(m.id),
      bestScore: p ? p.bestScore : 0,
      attempts: p ? p.attempts : 0,
      correct: p ? p.correct : 0,
      total: p ? p.total : 0,
      completed: p ? !!p.completed : false,
      lastPlayed: p ? p.lastPlayed : ''
    };
  });

  function trackStats(track) {
    const list = moduleSummaries.filter(function (m) { return m.track === track; });
    const attempted = list.filter(function (m) { return m.attempts > 0; });
    const completed = list.filter(function (m) { return m.completed; });
    const correct = attempted.reduce(function (sum, m) { return sum + m.correct; }, 0);
    const total = attempted.reduce(function (sum, m) { return sum + m.total; }, 0);
    const avgBest = attempted.length
      ? Math.round(attempted.reduce(function (sum, m) { return sum + m.bestScore; }, 0) / attempted.length)
      : 0;
    const xp = activity
      .filter(function (a) { return a.track === track; })
      .reduce(function (sum, a) { return sum + a.xp; }, 0);
    return {
      total: list.length,
      attempted: attempted.length,
      completed: completed.length,
      accuracy: total ? Math.round((correct / total) * 100) : 0,
      avgBest: avgBest,
      xp: xp,
      completionPct: list.length ? Math.round((completed.length / list.length) * 100) : 0
    };
  }

  const quizzes = progressRows.reduce(function (sum, p) { return sum + p.attempts; }, 0);
  const correct = progressRows.reduce(function (sum, p) { return sum + p.correct; }, 0);
  const answers = progressRows.reduce(function (sum, p) { return sum + p.total; }, 0);
  const completed = moduleSummaries.filter(function (m) { return m.completed; }).length;
  const perfect = moduleSummaries.filter(function (m) { return m.bestScore >= 100; }).length;
  const goalDays = countGoalDays_(activity, user.dailyGoal || DIXI.DEFAULT_GOAL);

  return {
    level: levelInfo_(user.xp),
    xp: user.xp,
    streak: currentStreak_(user),
    bestStreak: bestStreakFromActivity_(activity),
    goal: user.dailyGoal || DIXI.DEFAULT_GOAL,
    today: todayStats,
    goalPct: Math.min(100, Math.round((todayStats.xp / (user.dailyGoal || DIXI.DEFAULT_GOAL)) * 100)),
    totalModules: totalModules,
    completed: completed,
    completionPct: totalModules ? Math.round((completed / totalModules) * 100) : 0,
    quizzes: quizzes,
    answers: answers,
    correct: correct,
    accuracy: answers ? Math.round((correct / answers) * 100) : 0,
    accuracyPeak: accuracyPeakFromActivity_(activity),
    perfect: perfect,
    goalDays: goalDays,
    missionTotals: missionTotals_(user.email),
    trackStats: {
      grammar: trackStats('grammar'),
      vocabulary: trackStats('vocabulary')
    },
    modules: moduleSummaries,
    weekly: buildWeekly_(activity),
    recent: activity.slice(0, 5).map(function (a) {
      const m = getModuleById_(a.moduleId);
      return {
        id: a.id,
        date: a.date,
        createdAt: a.createdAt,
        track: a.track,
        moduleId: a.moduleId,
        title: m ? m.title : a.moduleId,
        icon: m ? m.icon : 'book-open',
        score: a.score,
        correct: a.correct,
        total: a.total,
        xp: a.xp
      };
    }),
    lastActive: activity.length ? activity[0].createdAt : ''
  };
}

function buildWeekly_(activity) {
  const xpByDate = {};
  activity.forEach(function (a) {
    xpByDate[a.date] = (xpByDate[a.date] || 0) + a.xp;
  });

  const labels = {
    Sun: 'Min', Mon: 'Sen', Tue: 'Sel', Wed: 'Rab',
    Thu: 'Kam', Fri: 'Jum', Sat: 'Sab'
  };
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = Utilities.formatDate(d, DIXI.TIMEZONE, 'yyyy-MM-dd');
    const dayName = Utilities.formatDate(d, DIXI.TIMEZONE, 'EEE');
    days.push({
      date: dateKey,
      label: labels[dayName] || dayName,
      xp: xpByDate[dateKey] || 0,
      isToday: i === 0
    });
  }
  return days;
}

function countGoalDays_(activity, goal) {
  const byDate = {};
  activity.forEach(function (a) {
    byDate[a.date] = (byDate[a.date] || 0) + a.xp;
  });
  let count = 0;
  Object.keys(byDate).forEach(function (date) {
    if (byDate[date] >= goal) count++;
  });
  return count;
}

function bestStreakFromActivity_(activity) {
  const dates = Array.from(new Set(activity.map(function (a) { return a.date; }).filter(Boolean))).sort();
  if (!dates.length) return 0;
  let best = 1;
  let current = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1] + 'T00:00:00Z').getTime();
    const next = new Date(dates[i] + 'T00:00:00Z').getTime();
    const gap = Math.round((next - prev) / 86400000);
    current = gap === 1 ? current + 1 : 1;
    if (current > best) best = current;
  }
  return best;
}

function accuracyPeakFromActivity_(activity) {
  const chrono = activity.slice().sort(function (a, b) {
    return String(a.createdAt || a.date).localeCompare(String(b.createdAt || b.date));
  });
  let correct = 0;
  let answers = 0;
  let peak = 0;
  chrono.forEach(function (a) {
    correct += Number(a.correct) || 0;
    answers += Number(a.total) || 0;
    if (answers >= 30) {
      peak = Math.max(peak, Math.round((correct / answers) * 100));
    }
  });
  return peak;
}

function evaluateAchievements_(progress, profile, user) {
  const grammarCompleted = progress.trackStats.grammar.completed;
  const vocabCompleted = progress.trackStats.vocabulary.completed;
  const metrics = {
    quizzes: progress.quizzes,
    perfect: progress.perfect,
    streak: progress.bestStreak,
    grammarCompleted: grammarCompleted,
    vocabCompleted: vocabCompleted,
    completed: progress.completed,
    xp: profile.xp,
    answers: progress.answers,
    accuracy: progress.accuracyPeak,
    goalDays: progress.goalDays,
    balanced: Math.min(grammarCompleted, 2) + Math.min(vocabCompleted, 2),
    missions: progress.missionTotals ? progress.missionTotals.daily : 0,
    weeklyChallenges: progress.missionTotals ? progress.missionTotals.weekly : 0
  };

  return getAchievementMeta_().map(function (a) {
    const value = Number(metrics[a.metric]) || 0;
    const gateOk = !a.gate || (Number(metrics[a.gate.metric]) || 0) >= a.gate.target;
    return Object.assign({}, a, {
      unlocked: value >= a.target && gateOk,
      progress: Math.min(value, a.target),
      gateMet: gateOk,
      gateProgress: a.gate ? Math.min(Number(metrics[a.gate.metric]) || 0, a.gate.target) : null
    });
  });
}
