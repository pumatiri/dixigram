/**
 * DIXIGRAM — Grammar & Vocabulary Game
 * File: Code.gs
 *
 * Titik masuk Web App + "kontrak" API antara frontend dan backend.
 * Semua fungsi yang dipanggil dari browser harus diawali "api".
 */

const DIXI = Object.freeze({
  APP_NAME: 'DIXIGRAM',
  VERSION: '1.5.0',
  TIMEZONE: 'Asia/Jakarta',

  // URL publik aplikasi (mis. GitHub Pages). Dipakai untuk tautan di email
  // dan favicon. Contoh: 'https://namakamu.github.io/dixigram/'
  // Kosongkan bila aplikasi hanya dibuka lewat URL /exec.
  PUBLIC_URL: 'https://pumatiri.github.io/dixigram/',

  // ---------------------------------------------------------------
  // ADMIN
  // Tulis email admin di sini (huruf kecil). Saat email ini mendaftar
  // atau masuk, akunnya otomatis menjadi admin aktif.
  // Alternatif tanpa mengubah kode: isi Script Property
  // "DIXI_ADMIN_EMAILS" (pisahkan dengan koma).
  ADMIN_EMAILS: Object.freeze([
    // 'emailkamu@gmail.com'
  ]),
  ADMIN_PROPERTY: 'DIXI_ADMIN_EMAILS',
  // Jika daftar admin di atas kosong DAN database belum punya pengguna
  // sama sekali, pendaftar pertama otomatis menjadi admin.
  // Pada aplikasi yang sudah punya pengguna, isi ADMIN_EMAILS lalu
  // jalankan promoteConfiguredAdmins() dari editor.
  FIRST_USER_IS_ADMIN: true,
  // ---------------------------------------------------------------

  // Penyimpanan
  DB_PROPERTY: 'DIXI_DB_ID',
  SECRET_PROPERTY: 'DIXI_SECRET',

  // Sesi
  USER_TOKEN_TTL: 7 * 24 * 60 * 60,   // 7 hari (detik)
  // Single login: sesi pengguna (non-admin) dianggap masih aktif bila ada
  // aktivitas dalam N menit terakhir. Selama aktif, login dari perangkat lain ditolak.
  SESSION_IDLE_MINUTES: 10,
  HEARTBEAT_SECONDS: 120,             // browser melapor "masih aktif" tiap 2 menit
  GUEST_TOKEN_TTL: 12 * 60 * 60,      // 12 jam
  GUEST_QUIZ_LIMIT: 2,                // default kuota harian tamu & akun pending (bisa diubah admin)

  // Gameplay
  QUIZ_SIZE: 6,                       // soal yang diambil dari bank tiap sesi
  PASS_SCORE: 60,
  XP_CORRECT: 10,
  XP_COMPLETE: 20,
  XP_PERFECT: 30,
  XP_REPEAT_MULTIPLIER: 0.3,          // XP latihan ulang modul yang sama di hari yang sama
  LEVEL_XP: 200,                      // 200 XP per level
  DEFAULT_GOAL: 80,

  // Modul yang bisa dicoba tanpa akun / sebelum divalidasi admin
  FREE_MODULES: Object.freeze({
    grammar: Object.freeze(['present-simple', 'past-simple']),
    vocabulary: Object.freeze(['daily-routines', 'food-drink'])
  }),

  SHEETS: Object.freeze({
    USERS: 'DIXI_Users',
    PROGRESS: 'DIXI_Progress',
    ACTIVITY: 'DIXI_Activity',
    AUDIT: 'DIXI_AuditLog'
  })
});

/* =========================================================
   WEB APP
   ========================================================= */

function doGet(e) {
  // PENTING untuk ponsel: Web App Apps Script berjalan di dalam iframe.
  // Meta viewport di Index.html tidak berlaku untuk halaman luar, sehingga
  // tanpa addMetaTag ini ponsel merender versi desktop yang mengecil.
  const output = HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('DIXIGRAM — Grammar & Vocabulary Game')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    // ALLOWALL: aplikasi boleh ditanam di halaman GitHub Pages (iframe).
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  const base = publicBaseUrl_();
  if (base) {
    try { output.setFaviconUrl(base + 'assets/favicon-64.png'); } catch (err) { /* abaikan */ }
  }
  return output;
}

/**
 * Alamat publik aplikasi (mis. GitHub Pages) untuk tautan email dan favicon.
 * Urutan: DIXI.PUBLIC_URL di file ini → Admin → Pengaturan → "Alamat aplikasi".
 * Kosong berarti memakai URL Apps Script (/exec).
 */
function publicBaseUrl_() {
  const fromCode = cleanPublicUrl_(DIXI.PUBLIC_URL);
  if (fromCode) return fromCode;
  try { return getSettings_().publicUrl || ''; } catch (err) { return ''; }
}

/** '' bila kosong, null bila tidak valid, selain itu URL rapi berakhiran '/'. */
function cleanPublicUrl_(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (url.length > 300 || !/^https:\/\/[^\s\/?#]+\.[^\s\/?#]+(\/[^\s]*)?$/i.test(url)) return null;
  return url.replace(/[#?].*$/, '').replace(/\/?$/, '/');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Jalankan sekali dari editor Apps Script untuk menyiapkan database.
 * Bisa juga dijalankan lewat menu DIXIGRAM di Google Sheet (jika bound).
 */
function setupDixigram() {
  const ss = getDatabase_();
  getSecret_();
  getSettings_();
  getMissionSheet_(true);
  const url = ss.getUrl();
  Logger.log('Database DIXIGRAM siap: ' + url);
  Logger.log('Admin terdaftar di konfigurasi: ' + (getConfiguredAdminEmails_().join(', ') || '(belum ada)'));
  Logger.log('Setelah deploy Web App, buka URL /exec untuk mulai bermain.');
  return url;
}

/**
 * Menjadikan semua email di DIXI.ADMIN_EMAILS / Script Property
 * DIXI_ADMIN_EMAILS sebagai admin aktif. Jalankan dari editor bila
 * akun admin sudah terlanjur terdaftar sebagai pengguna biasa.
 */
function promoteConfiguredAdmins() {
  const emails = getConfiguredAdminEmails_();
  if (!emails.length) {
    Logger.log('Belum ada email admin. Isi DIXI.ADMIN_EMAILS di Code.gs atau Script Property DIXI_ADMIN_EMAILS.');
    return 0;
  }
  let changed = 0;
  emails.forEach(function (email) {
    const user = findUserByEmail_(email);
    if (!user) {
      Logger.log('• ' + email + ' belum mendaftar. Akan otomatis menjadi admin saat mendaftar.');
      return;
    }
    updateUserFields_(email, { role: 'admin', status: USER_STATUS.ACTIVE });
    appendAudit_('system', 'makeAdmin', email, 'Dipromosikan dari editor');
    Logger.log('• ' + email + ' sekarang admin aktif.');
    changed++;
  });
  return changed;
}

/**
 * Diagnostik cepat. Jalankan dari editor Apps Script, lalu buka Execution log.
 * Fungsi ini tidak membuat akun permanen.
 */
function diagnoseDixigram() {
  const lines = [];
  const started = Date.now();

  try {
    const ss = getDatabase_();
    lines.push('1. DATABASE OK — ' + ss.getName() + ' (zona waktu sheet: ' + ss.getSpreadsheetTimeZone() + ')');
  } catch (err) {
    lines.push('1. DATABASE ERROR — ' + (err && err.stack ? err.stack : err));
  }

  try {
    const counts = countUsersByStatus_();
    lines.push('2. USERS OK — total ' + counts.total + ', pending ' + counts.pending +
      ', aktif ' + counts.active + ', admin ' + counts.admin);
  } catch (err) {
    lines.push('2. USERS ERROR — ' + (err && err.stack ? err.stack : err));
  }

  try {
    getSecret_();
    lines.push('3. SECRET OK — tersedia');
  } catch (err) {
    lines.push('3. SECRET ERROR — ' + (err && err.stack ? err.stack : err));
  }

  try {
    const hash = hashPassword_('Diagnostic123', randomHex_(8));
    lines.push('4. HASH OK — panjang ' + hash.length + ' karakter');
  } catch (err) {
    lines.push('4. HASH ERROR — ' + (err && err.stack ? err.stack : err));
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const token = signToken_({ sub: 'diagnostic@local', role: 'user', ver: 1, iat: now, exp: now + 60 });
    const claims = verifyToken_(token);
    lines.push('5. TOKEN OK — ' + (claims && claims.sub === 'diagnostic@local' ? 'terverifikasi' : 'GAGAL'));
  } catch (err) {
    lines.push('5. TOKEN ERROR — ' + (err && err.stack ? err.stack : err));
  }

  try {
    const sheet = getSheet_(DIXI.SHEETS.ACTIVITY);
    const before = sheet.getLastRow();
    const key = todayKey_();
    appendActivity_({
      id: Utilities.getUuid(), email: 'diagnostic@local', date: key,
      track: 'diagnostic', moduleId: 'diagnostic', correct: 0, total: 0,
      score: 0, xp: 0, createdAt: nowIso_()
    });
    const after = sheet.getLastRow();
    const stored = cellDateKey_(sheet.getRange(after, 3).getValue());
    if (after > before) sheet.deleteRow(after);
    lines.push('6. WRITE TEST ' + (stored === key ? 'OK' : 'PERINGATAN') +
      ' — tanggal tersimpan "' + stored + '" (harus "' + key + '")');
  } catch (err) {
    lines.push('6. WRITE TEST ERROR — ' + (err && err.stack ? err.stack : err));
  }

  try {
    lines.push('7. PENGATURAN — ' + JSON.stringify(getSettings_()));
    lines.push('   Email admin dikonfigurasi: ' + (getConfiguredAdminEmails_().join(', ') || '(kosong)'));
  } catch (err) {
    lines.push('7. PENGATURAN ERROR — ' + err);
  }

  lines.push('Selesai dalam ' + (Date.now() - started) + ' ms.');
  const message = lines.join('\n');
  Logger.log(message);
  return message;
}

function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('DIXIGRAM')
      .addItem('Siapkan database', 'setupDixigram')
      .addItem('Jadikan admin (dari ADMIN_EMAILS)', 'promoteConfiguredAdmins')
      .addItem('Diagnostik', 'diagnoseDixigram')
      .addItem('Lihat status', 'showDixigramStatus')
      .addToUi();
  } catch (err) {
    // onOpen juga bisa berjalan di project standalone; abaikan dengan aman.
  }
}

function showDixigramStatus() {
  const ss = getDatabase_();
  const counts = countUsersByStatus_();
  const message = [
    'DIXIGRAM v' + DIXI.VERSION,
    'Database: ' + ss.getName(),
    'Pengguna: ' + counts.total + ' (menunggu validasi: ' + counts.pending + ')',
    'Timezone: ' + DIXI.TIMEZONE
  ].join('\n');
  Logger.log(message);
  try {
    ss.toast(counts.total + ' pengguna · ' + counts.pending + ' menunggu validasi', 'DIXIGRAM', 8);
  } catch (err) {
    // standalone: cukup tampil di log
  }
}

/* =========================================================
   API PUBLIK (dipanggil google.script.run)
   ========================================================= */

function apiBootstrap(token) {
  return api_(function () {
    return buildBootstrap_(resolveSession_(token, true));
  });
}

function buildBootstrap_(session) {
  let profile;
  let progress = null;
  let achievements;

  if (session.user) {
    profile = buildProfile_(session.user);
    progress = buildProgressSummary_(session.user, session);
    achievements = evaluateAchievements_(progress, profile, session.user);
  } else {
    profile = guestProfile_();
    achievements = getAchievementMeta_().map(function (a) {
      return Object.assign({}, a, { unlocked: false, progress: 0 });
    });
  }

  const data = {
    token: session.token,
    session: publicSession_(session),
    config: publicConfig_(),
    settings: publicSettings_(),
    catalog: buildCatalog_(session),
    stats: getContentStats_(),
    profile: profile,
    progress: progress,
    achievements: achievements,
    achievementCatalog: getAchievementMeta_(),
    leaderboard: buildLeaderboard_(session),
    wordOfDay: getWordOfDay_(),
    survey: surveyPublic_(),
    missions: buildMissions_(session)
  };

  if (session.role === 'admin') {
    data.admin = adminPulse_();
  }
  return data;
}

/**
 * Detak sesi (dipanggil browser tiap ~2 menit):
 *  - menjaga sesi single-login tetap tercatat aktif
 *  - memberi tahu admin jumlah pendaftar yang menunggu
 *  - memberi tahu akun pending bila sudah divalidasi
 */
function apiPing(token) {
  return api_(function () {
    const info = inspectToken_(token);
    if (info.reason === 'expired' && info.role === 'user') {
      throw apiError_('SESSION_EXPIRED', 'Sesi kamu berakhir. Silakan masuk kembali.');
    }
    if (info.reason !== 'ok' || !info.claims || info.claims.role !== 'user') {
      return { role: 'guest', access: 'guest' };
    }
    const session = resolveSession_(token, false);
    const out = {
      role: session.role,
      access: session.access,
      status: session.user.status,
      token: session.token !== token ? session.token : ''
    };
    if (session.role === 'admin') out.admin = adminPulse_();
    return out;
  });
}

function apiRegister(payload) {
  return api_(function () {
    return registerUser_(payload || {});
  });
}

function apiLogin(payload) {
  return api_(function () {
    return loginUser_(payload || {});
  });
}

function apiLogout(token, allDevices) {
  return api_(function () {
    const session = resolveSession_(token, true);
    if (session.user) {
      if (allDevices) {
        revokeUserSessions_(session.user.email);
      } else if (session.role !== 'admin') {
        // Lepas kunci single-login supaya bisa langsung masuk di perangkat lain.
        clearUserSession_(session.user.email);
      }
    }
    return { loggedOut: true, allDevices: !!(session.user && allDevices) };
  });
}

function apiGetLesson(token, track, moduleId) {
  return api_(function () {
    const session = resolveSession_(token, true);
    const module = getModuleById_(moduleId);
    if (!module || module.track !== track) {
      throw apiError_('NOT_FOUND', 'Materi tidak ditemukan.');
    }
    if (!isModuleUnlocked_(session, module.id)) {
      throw apiError_(
        session.access === 'pending' ? 'PENDING_APPROVAL' : 'LOCKED',
        session.access === 'pending'
          ? 'Modul ini terbuka setelah akunmu divalidasi admin.'
          : 'Materi ini khusus member. Daftar gratis untuk membuka semua modul.'
      );
    }
    return {
      module: sanitizeModule_(module),
      quota: quotaUsage_(session),
      nextModule: getNextModuleSummary_(module)
    };
  });
}

function apiStartQuiz(token, track, moduleId) {
  return api_(function () {
    return startQuiz_(token, track, moduleId);
  });
}

function apiSubmitAnswer(token, attemptId, questionId, answer) {
  return api_(function () {
    return submitAnswer_(token, attemptId, questionId, answer);
  });
}

function apiFinishQuiz(token, attemptId) {
  return api_(function () {
    return finishQuiz_(token, attemptId);
  });
}

function apiUpdateGoal(token, goal) {
  return api_(function () {
    const session = requireUser_(token);
    const value = Number(goal);
    if (!isFinite(value) || value < 20 || value > 300 || value % 10 !== 0) {
      throw apiError_('INVALID_GOAL', 'Target harian harus antara 20–300 XP (kelipatan 10).');
    }
    updateUserFields_(session.user.email, { dailyGoal: value });
    const fresh = findUserByEmail_(session.user.email);
    return { profile: buildProfile_(fresh) };
  });
}

function apiUpdateName(token, name) {
  return api_(function () {
    const session = requireUser_(token);
    const clean = sanitizeName_(name);
    validateName_(clean);
    updateUserFields_(session.user.email, { name: clean });
    const fresh = findUserByEmail_(session.user.email);
    return { profile: buildProfile_(fresh) };
  });
}

function apiChangePassword(token, currentPassword, nextPassword) {
  return api_(function () {
    const session = requireUser_(token);
    return changePassword_(session, currentPassword, nextPassword);
  });
}

/* =========================================================
   PEMBUNGKUS API & ERROR
   ========================================================= */

function api_(fn) {
  try {
    return { ok: true, data: fn() };
  } catch (err) {
    if (err && err.isApiError) {
      return { ok: false, code: err.code || 'APP_ERROR', message: err.message };
    }
    const text = String(err && err.message ? err.message : err);
    console.error(err && err.stack ? err.stack : err);
    if (/lock/i.test(text) && /timeout|timed out|waktu/i.test(text)) {
      return { ok: false, code: 'BUSY', message: 'Server sedang sibuk. Coba lagi beberapa detik lagi.' };
    }
    return {
      ok: false,
      code: 'SERVER_ERROR',
      message: 'Server sedang tidak bisa memproses permintaan. Coba lagi sebentar lagi.'
    };
  }
}

function apiError_(code, message) {
  const err = new Error(message);
  err.isApiError = true;
  err.code = code;
  return err;
}

/* =========================================================
   DATA PUBLIK
   ========================================================= */

function publicConfig_() {
  return {
    appName: DIXI.APP_NAME,
    version: DIXI.VERSION,
    timezone: DIXI.TIMEZONE,
    guest: {
      quizLimit: getSettings_().guestLimit,
      freeModules: DIXI.FREE_MODULES
    },
    quizSize: DIXI.QUIZ_SIZE,
    passScore: DIXI.PASS_SCORE,
    xp: {
      correct: DIXI.XP_CORRECT,
      complete: DIXI.XP_COMPLETE,
      perfect: DIXI.XP_PERFECT,
      repeatMultiplier: DIXI.XP_REPEAT_MULTIPLIER,
      levelXp: DIXI.LEVEL_XP
    },
    defaultGoal: DIXI.DEFAULT_GOAL
  };
}

function guestProfile_() {
  return {
    name: 'Explorer',
    email: '',
    isGuest: true,
    role: 'guest',
    status: 'guest',
    xp: 0,
    level: 1,
    levelProgress: 0,
    nextLevelXp: DIXI.LEVEL_XP,
    xpInLevel: 0,
    streak: 0,
    dailyGoal: DIXI.DEFAULT_GOAL,
    joinedAt: null
  };
}

function publicSession_(session) {
  if (session.user) {
    return {
      isGuest: false,
      role: session.role,
      access: session.access,
      status: session.user.status,
      isAdmin: session.role === 'admin',
      expired: !!session.expired,
      endReason: '',
      singleLogin: session.role !== 'admin',
      heartbeat: DIXI.HEARTBEAT_SECONDS,
      user: {
        name: session.user.name,
        email: session.user.email,
        joinedAt: session.user.createdAt
      },
      quota: quotaUsage_(session),
      guest: null
    };
  }
  const quota = quotaUsage_(session);
  return {
    isGuest: true,
    role: 'guest',
    access: 'guest',
    status: 'guest',
    isAdmin: false,
    expired: !!session.expired,
    endReason: session.endReason || '',
    user: null,
    quota: quota,
    guest: quota
  };
}

function buildProfile_(user) {
  const level = levelInfo_(user.xp);
  return {
    name: user.name,
    email: user.email,
    isGuest: false,
    role: user.role,
    status: user.status,
    xp: user.xp,
    level: level.level,
    levelProgress: level.progress,
    nextLevelXp: level.nextXp,
    xpInLevel: level.xpInLevel,
    streak: currentStreak_(user),
    dailyGoal: user.dailyGoal || DIXI.DEFAULT_GOAL,
    joinedAt: user.createdAt,
    lastActive: user.lastActive
  };
}

/**
 * Streak yang ditampilkan: bila hari terakhir aktif lebih lama dari kemarin,
 * streak sudah putus (meski nilai di sheet belum diperbarui).
 */
function currentStreak_(user) {
  const last = user.lastActive;
  if (!last) return 0;
  if (last === todayKey_() || last === yesterdayKey_()) return Number(user.streak) || 0;
  return 0;
}

function levelInfo_(xp) {
  const total = Math.max(0, Number(xp) || 0);
  const level = Math.floor(total / DIXI.LEVEL_XP) + 1;
  const xpInLevel = total % DIXI.LEVEL_XP;
  return {
    level: level,
    xpInLevel: xpInLevel,
    nextXp: level * DIXI.LEVEL_XP,
    progress: Math.round((xpInLevel / DIXI.LEVEL_XP) * 100)
  };
}

function buildCatalog_(session) {
  const progressByKey = {};
  if (session.user) {
    getProgressRowsByEmail_(session.user.email).forEach(function (row) {
      progressByKey[row.track + ':' + row.moduleId] = row;
    });
  }

  const out = { grammar: [], vocabulary: [] };
  getAllModules_().forEach(function (module) {
    const p = progressByKey[module.track + ':' + module.id];
    out[module.track].push({
      id: module.id,
      track: module.track,
      order: module.order,
      title: module.title,
      subtitle: module.subtitle,
      level: module.level,
      minutes: module.minutes,
      icon: module.icon,
      accent: module.accent,
      description: module.description,
      objectives: module.objectives.slice(0, 3),
      questionCount: module.quiz.length,
      wordCount: module.vocab ? module.vocab.length : 0,
      locked: !isModuleUnlocked_(session, module.id),
      bestScore: p ? p.bestScore : 0,
      attempts: p ? p.attempts : 0,
      completed: p ? !!p.completed : false
    });
  });
  return out;
}

function buildLeaderboard_(session) {
  const users = getLeaderboardUsers_(10);
  const me = session.user ? session.user.email : '';
  const entries = users.map(function (u, index) {
    return {
      rank: index + 1,
      name: u.name,
      xp: u.xp,
      level: levelInfo_(u.xp).level,
      streak: currentStreak_(u),
      isMe: u.email === me
    };
  });

  let you = null;
  if (session.user) {
    you = {
      rank: getLeaderboardRank_(session.user.email),
      name: session.user.name,
      xp: session.user.xp,
      level: levelInfo_(session.user.xp).level,
      streak: currentStreak_(session.user),
      pending: session.access === 'pending'
    };
  }
  return { entries: entries, you: you };
}

function getNextModuleSummary_(module) {
  const all = getAllModules_().filter(function (m) {
    return m.track === module.track;
  }).sort(function (a, b) {
    return a.order - b.order;
  });
  const index = all.findIndex(function (m) {
    return m.id === module.id;
  });
  const next = index >= 0 ? all[index + 1] : null;
  return next ? {
    id: next.id,
    track: next.track,
    title: next.title,
    level: next.level
  } : null;
}

/* =========================================================
   UTILITAS UMUM
   ========================================================= */

function isFreeModule_(moduleId) {
  return DIXI.FREE_MODULES.grammar.indexOf(moduleId) !== -1 ||
    DIXI.FREE_MODULES.vocabulary.indexOf(moduleId) !== -1;
}

function isModuleUnlocked_(session, moduleId) {
  if (session.access === 'full') return true;
  return isFreeModule_(moduleId);
}

function todayKey_() {
  return Utilities.formatDate(new Date(), DIXI.TIMEZONE, 'yyyy-MM-dd');
}

function yesterdayKey_() {
  return Utilities.formatDate(new Date(Date.now() - 86400000), DIXI.TIMEZONE, 'yyyy-MM-dd');
}

function nowIso_() {
  return new Date().toISOString();
}

/**
 * Bilangan acak aman dalam bentuk hex. Hex dipakai (bukan base64) supaya
 * nilai tidak pernah diawali "-" atau "+", yang bisa ditafsirkan Google Sheets
 * sebagai formula dan merusak salt/password.
 */
function randomHex_(bytes) {
  const size = (bytes || 16) * 2;
  let out = '';
  while (out.length < size) {
    out += bytesToHex_(Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      Utilities.getUuid() + ':' + Date.now() + ':' + Math.random() + ':' + out
    ));
  }
  return out.slice(0, size);
}

function safeEqual_(a, b) {
  const left = String(a || '');
  const right = String(b || '');
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i++) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return diff === 0;
}

function shuffle_(items) {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}
