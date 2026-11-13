/**
 * DIXIGRAM — Database (Google Sheets)
 * File: Database.gs
 *
 * Struktur sheet:
 *  DIXI_Users     : akun, status validasi, XP, streak, target harian
 *  DIXI_Progress  : rekap per modul (best score, attempts, accuracy)
 *  DIXI_Activity  : riwayat latihan (untuk grafik & misi harian)
 *  DIXI_AuditLog  : jejak tindakan admin
 *
 * Catatan penting (v1.1):
 *  - Kolom teks/tanggal dipaksa berformat "plain text" (@). Tanpa ini Google Sheets
 *    mengubah "2026-11-09" menjadi objek Date, sehingga perbandingan tanggal
 *    (streak, misi harian, grafik mingguan, XP ulang) selalu gagal.
 *  - Nilai lama yang sudah terlanjur menjadi Date tetap dibaca dengan benar
 *    lewat fungsi normalisasi cellDateKey_ / cellIso_.
 *  - Spreadsheet & isi sheet di-cache per eksekusi agar tidak membaca ulang
 *    seluruh sheet berkali-kali dalam satu permintaan.
 */

const DB_SCHEMA_VERSION = 3;
const DB_SCHEMA_PROPERTY = 'DIXI_SCHEMA_VERSION';

const DB_HEADERS = Object.freeze({
  USERS: [
    'ID', 'Nama', 'Email', 'Salt', 'PasswordHash', 'Role', 'TokenVersion',
    'XP', 'Streak', 'LastActive', 'DailyGoal', 'CreatedAt', 'LastLogin', 'Status',
    'SessionID', 'SessionDevice', 'SessionSeen'
  ],
  PROGRESS: [
    'Email', 'Track', 'ModuleID', 'Attempts', 'Correct', 'Total',
    'BestScore', 'Completed', 'LastPlayed', 'UpdatedAt'
  ],
  ACTIVITY: [
    'ID', 'Email', 'Date', 'Track', 'ModuleID', 'Correct', 'Total',
    'Score', 'XP', 'CreatedAt'
  ],
  AUDIT: [
    'ID', 'Waktu', 'Admin', 'Aksi', 'Target', 'Detail'
  ]
});

// '@' = teks, '0' = angka bulat
const DB_FORMATS = Object.freeze({
  USERS: ['@', '@', '@', '@', '@', '@', '0', '0', '0', '@', '0', '@', '@', '@', '@', '@', '@'],
  PROGRESS: ['@', '@', '@', '0', '0', '0', '0', '@', '@', '@'],
  ACTIVITY: ['@', '@', '@', '@', '@', '0', '0', '0', '0', '@'],
  AUDIT: ['@', '@', '@', '@', '@', '@']
});

const USER_COL = Object.freeze({
  id: 1, name: 2, email: 3, salt: 4, passwordHash: 5, role: 6,
  tokenVersion: 7, xp: 8, streak: 9, lastActive: 10, dailyGoal: 11,
  createdAt: 12, lastLogin: 13, status: 14,
  sessionId: 15, sessionDevice: 16, sessionSeen: 17
});

const USER_STATUS = Object.freeze({
  PENDING: 'pending',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  REJECTED: 'rejected'
});

// Cache per eksekusi (google.script.run selalu memulai eksekusi baru).
var DB_RUNTIME_ = { ss: null, tz: null, ensured: false, tables: {} };

/* =========================================================
   KONEKSI & SETUP
   ========================================================= */

function getDatabase_() {
  if (DB_RUNTIME_.ss) return DB_RUNTIME_.ss;

  const props = PropertiesService.getScriptProperties();
  const storedId = props.getProperty(DIXI.DB_PROPERTY);
  let ss = null;

  if (storedId) {
    try {
      ss = SpreadsheetApp.openById(storedId);
    } catch (err) {
      // Jangan langsung menghapus ID: bisa jadi hanya gangguan sementara.
      console.error('Gagal membuka database ' + storedId + ': ' + err);
      throw new Error('Database tidak bisa dibuka. Periksa akses spreadsheet atau jalankan setupDixigram().');
    }
  }

  if (!ss) {
    let active = null;
    try { active = SpreadsheetApp.getActiveSpreadsheet(); } catch (err) { active = null; }
    ss = active || SpreadsheetApp.create('DIXIGRAM — Database');
    props.setProperty(DIXI.DB_PROPERTY, ss.getId());
  }

  DB_RUNTIME_.ss = ss;
  try { DB_RUNTIME_.tz = ss.getSpreadsheetTimeZone(); } catch (err) { DB_RUNTIME_.tz = DIXI.TIMEZONE; }
  ensureSheets_(ss);
  return ss;
}

function ensureSheets_(ss) {
  if (DB_RUNTIME_.ensured) return;
  ensureSheet_(ss, DIXI.SHEETS.USERS, DB_HEADERS.USERS, DB_FORMATS.USERS, '#7c5cff');
  ensureSheet_(ss, DIXI.SHEETS.PROGRESS, DB_HEADERS.PROGRESS, DB_FORMATS.PROGRESS, '#14b8a6');
  ensureSheet_(ss, DIXI.SHEETS.ACTIVITY, DB_HEADERS.ACTIVITY, DB_FORMATS.ACTIVITY, '#d8f56b');
  ensureSheet_(ss, DIXI.SHEETS.AUDIT, DB_HEADERS.AUDIT, DB_FORMATS.AUDIT, '#ff8a5b');
  DB_RUNTIME_.ensured = true;
  migrateSchema_(ss);
  // Catatan: sheet lain milik pengguna tidak pernah dihapus.
}

function ensureSheet_(ss, name, headers, formats, tabColor) {
  let sheet = ss.getSheetByName(name);
  let isNew = false;

  if (!sheet) {
    sheet = ss.insertSheet(name);
    isNew = true;
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    isNew = true;
  }

  if (isNew) {
    sheet.setFrozenRows(1);
    sheet.setTabColor(tabColor);
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#111827')
      .setFontColor('#ffffff')
      .setFontWeight('bold')
      .setFontSize(10)
      .setVerticalAlignment('middle')
      .setHorizontalAlignment('left');
    sheet.setRowHeight(1, 32);
    for (let i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, i === 1 ? 190 : 130);
    }
    applyColumnFormats_(sheet, formats);
  }
  return sheet;
}

function applyColumnFormats_(sheet, formats) {
  const rows = Math.max(1, sheet.getMaxRows() - 1);
  formats.forEach(function (fmt, index) {
    sheet.getRange(2, index + 1, rows, 1).setNumberFormat(fmt);
  });
}

/**
 * Migrasi sekali jalan: memaksa format teks pada kolom tanggal/teks
 * di sheet lama, supaya data baru tidak lagi diubah menjadi Date.
 */
function migrateSchema_(ss) {
  const props = PropertiesService.getScriptProperties();
  const current = Number(props.getProperty(DB_SCHEMA_PROPERTY)) || 1;
  if (current >= DB_SCHEMA_VERSION) return;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;
  try {
    if ((Number(props.getProperty(DB_SCHEMA_PROPERTY)) || 1) >= DB_SCHEMA_VERSION) return;
    ensureHeaderColumns_(ss.getSheetByName(DIXI.SHEETS.USERS), DB_HEADERS.USERS);
    applyColumnFormats_(ss.getSheetByName(DIXI.SHEETS.USERS), DB_FORMATS.USERS);
    applyColumnFormats_(ss.getSheetByName(DIXI.SHEETS.PROGRESS), DB_FORMATS.PROGRESS);
    applyColumnFormats_(ss.getSheetByName(DIXI.SHEETS.ACTIVITY), DB_FORMATS.ACTIVITY);
    applyColumnFormats_(ss.getSheetByName(DIXI.SHEETS.AUDIT), DB_FORMATS.AUDIT);
    props.setProperty(DB_SCHEMA_PROPERTY, String(DB_SCHEMA_VERSION));
  } finally {
    lock.releaseLock();
  }
}

/** Menambahkan judul kolom baru pada sheet lama (mis. kolom sesi v1.2). */
function ensureHeaderColumns_(sheet, headers) {
  if (!sheet) return;
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  let changed = false;
  for (let i = 0; i < headers.length; i++) {
    if (!String(current[i] || '').trim()) {
      current[i] = headers[i];
      changed = true;
    }
  }
  if (changed) {
    sheet.getRange(1, 1, 1, headers.length).setValues([current])
      .setBackground('#111827').setFontColor('#ffffff').setFontWeight('bold');
  }
}

function getSheet_(name) {
  const ss = getDatabase_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    DB_RUNTIME_.ensured = false;
    ensureSheets_(ss);
    sheet = ss.getSheetByName(name);
  }
  if (!sheet) throw new Error('Sheet tidak ditemukan: ' + name);
  return sheet;
}

/* =========================================================
   HELPER TABEL
   ========================================================= */

function readTable_(name, width) {
  if (DB_RUNTIME_.tables[name]) return DB_RUNTIME_.tables[name];
  const sheet = getSheet_(name);
  const lastRow = sheet.getLastRow();
  const rows = lastRow < 2 ? [] : sheet.getRange(2, 1, lastRow - 1, width).getValues();
  DB_RUNTIME_.tables[name] = rows;
  return rows;
}

function invalidateTable_(name) {
  delete DB_RUNTIME_.tables[name];
}

function appendTypedRow_(name, values, formats) {
  const sheet = getSheet_(name);
  const row = sheet.getLastRow() + 1;
  if (row > sheet.getMaxRows()) {
    sheet.insertRowsAfter(sheet.getMaxRows(), 50);
  }
  const range = sheet.getRange(row, 1, 1, values.length);
  range.setNumberFormats([formats]);
  range.setValues([values]);
  invalidateTable_(name);
}

/** Menulis ulang seluruh isi tabel (dipakai untuk hapus massal). */
function rewriteTable_(name, width, rows) {
  const sheet = getSheet_(name);
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    sheet.getRange(2, 1, lastRow - 1, width).clearContent();
  }
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, width).setValues(rows);
  }
  invalidateTable_(name);
}

/* =========================================================
   NORMALISASI SEL
   ========================================================= */

function sheetTz_() {
  if (!DB_RUNTIME_.tz) getDatabase_();
  return DB_RUNTIME_.tz || DIXI.TIMEZONE;
}

/** Mengembalikan 'yyyy-MM-dd' baik sel berisi teks maupun Date. */
function cellDateKey_(value) {
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return '';
    return Utilities.formatDate(value, sheetTz_(), 'yyyy-MM-dd');
  }
  const text = String(value == null ? '' : value).trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? match[0] : text;
}

/** Mengembalikan ISO string baik sel berisi teks maupun Date. */
function cellIso_(value) {
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? '' : value.toISOString();
  }
  return String(value == null ? '' : value).trim();
}

function cellText_(value) {
  if (value instanceof Date) return cellIso_(value);
  return String(value == null ? '' : value).trim();
}

function cellBool_(value) {
  return value === true || String(value).toLowerCase() === 'true';
}

/* =========================================================
   USERS
   ========================================================= */

function getUsersRaw_() {
  return readTable_(DIXI.SHEETS.USERS, DB_HEADERS.USERS.length);
}

function normalizeStatus_(value) {
  const s = String(value || '').trim().toLowerCase();
  if (s === USER_STATUS.PENDING || s === USER_STATUS.SUSPENDED || s === USER_STATUS.REJECTED) return s;
  return USER_STATUS.ACTIVE; // data lama tanpa status dianggap aktif
}

function normalizeRole_(value) {
  return String(value || '').trim().toLowerCase() === 'admin' ? 'admin' : 'user';
}

function mapUserRow_(row) {
  return {
    id: cellText_(row[0]),
    name: cellText_(row[1]),
    email: cellText_(row[2]).toLowerCase(),
    salt: cellText_(row[3]),
    passwordHash: cellText_(row[4]),
    role: normalizeRole_(row[5]),
    tokenVersion: Number(row[6]) || 1,
    xp: Number(row[7]) || 0,
    streak: Number(row[8]) || 0,
    lastActive: cellDateKey_(row[9]),
    dailyGoal: Number(row[10]) || DIXI.DEFAULT_GOAL,
    createdAt: cellIso_(row[11]),
    lastLogin: cellIso_(row[12]),
    status: normalizeStatus_(row[13]),
    sessionId: cellText_(row[14]),
    sessionDevice: cellText_(row[15]),
    sessionSeen: cellIso_(row[16])
  };
}

function getAllUsers_() {
  return getUsersRaw_()
    .map(mapUserRow_)
    .filter(function (u) { return !!u.email; });
}

function findUserByEmail_(email) {
  const needle = normalizeEmail_(email);
  if (!needle) return null;
  const users = getUsersRaw_();
  for (let i = 0; i < users.length; i++) {
    if (cellText_(users[i][2]).toLowerCase() === needle) {
      return mapUserRow_(users[i]);
    }
  }
  return null;
}

function countAdmins_() {
  return getAllUsers_().filter(function (u) {
    return u.role === 'admin' && u.status === USER_STATUS.ACTIVE;
  }).length;
}

function appendUser_(user) {
  appendTypedRow_(DIXI.SHEETS.USERS, [
    user.id,
    user.name,
    user.email,
    user.salt,
    user.passwordHash,
    user.role,
    user.tokenVersion,
    user.xp,
    user.streak,
    user.lastActive,
    user.dailyGoal,
    user.createdAt,
    user.lastLogin,
    user.status,
    user.sessionId || '',
    user.sessionDevice || '',
    user.sessionSeen || ''
  ], DB_FORMATS.USERS);
}

function getUserRowIndex_(email) {
  const needle = normalizeEmail_(email);
  const users = getUsersRaw_();
  for (let i = 0; i < users.length; i++) {
    if (cellText_(users[i][2]).toLowerCase() === needle) {
      return i + 2;
    }
  }
  return -1;
}

/**
 * Memperbarui beberapa kolom user. Kolom yang bersebelahan ditulis
 * dalam satu panggilan agar lebih cepat.
 */
function updateUserFields_(email, patch) {
  const rowIndex = getUserRowIndex_(email);
  if (rowIndex < 0) throw new Error('User tidak ditemukan: ' + email);

  const sheet = getSheet_(DIXI.SHEETS.USERS);
  const cols = Object.keys(patch)
    .filter(function (key) { return USER_COL[key]; })
    .map(function (key) { return { col: USER_COL[key], value: patch[key] }; })
    .sort(function (a, b) { return a.col - b.col; });

  let i = 0;
  while (i < cols.length) {
    let j = i;
    while (j + 1 < cols.length && cols[j + 1].col === cols[j].col + 1) j++;
    const run = cols.slice(i, j + 1);
    const range = sheet.getRange(rowIndex, run[0].col, 1, run.length);
    range.setNumberFormats([run.map(function (c) { return DB_FORMATS.USERS[c.col - 1]; })]);
    range.setValues([run.map(function (c) { return c.value; })]);
    i = j + 1;
  }
  invalidateTable_(DIXI.SHEETS.USERS);
}

function updateUserGameStats_(email, stats) {
  const patch = {};
  ['xp', 'streak', 'lastActive', 'dailyGoal'].forEach(function (key) {
    if (stats[key] !== undefined) patch[key] = stats[key];
  });
  if (Object.keys(patch).length) updateUserFields_(email, patch);
}

function deleteUserRow_(email) {
  const rowIndex = getUserRowIndex_(email);
  if (rowIndex < 0) return false;
  getSheet_(DIXI.SHEETS.USERS).deleteRow(rowIndex);
  invalidateTable_(DIXI.SHEETS.USERS);
  return true;
}

function sortLeaderboard_(a, b) {
  if (b.xp !== a.xp) return b.xp - a.xp;
  if (b.streak !== a.streak) return b.streak - a.streak;
  return a.name.localeCompare(b.name);
}

function getRankedUsers_() {
  return getAllUsers_()
    .filter(function (u) { return u.status === USER_STATUS.ACTIVE; })
    .sort(sortLeaderboard_);
}

function getLeaderboardUsers_(limit) {
  return getRankedUsers_().slice(0, limit || 10);
}

function getLeaderboardRank_(email) {
  const needle = normalizeEmail_(email);
  const users = getRankedUsers_();
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === needle) return i + 1;
  }
  return 0;
}

/* =========================================================
   PROGRESS
   ========================================================= */

function mapProgressRow_(row) {
  return {
    email: cellText_(row[0]).toLowerCase(),
    track: cellText_(row[1]),
    moduleId: cellText_(row[2]),
    attempts: Number(row[3]) || 0,
    correct: Number(row[4]) || 0,
    total: Number(row[5]) || 0,
    bestScore: Number(row[6]) || 0,
    completed: cellBool_(row[7]),
    lastPlayed: cellIso_(row[8]),
    updatedAt: cellIso_(row[9])
  };
}

function getProgressTable_() {
  return readTable_(DIXI.SHEETS.PROGRESS, DB_HEADERS.PROGRESS.length);
}

function getProgressRowsByEmail_(email) {
  const needle = normalizeEmail_(email);
  return getProgressTable_()
    .filter(function (row) { return cellText_(row[0]).toLowerCase() === needle; })
    .map(mapProgressRow_);
}

function upsertProgress_(entry) {
  const rows = getProgressTable_();
  let rowIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (cellText_(rows[i][0]).toLowerCase() === entry.email &&
        cellText_(rows[i][1]) === entry.track &&
        cellText_(rows[i][2]) === entry.moduleId) {
      rowIndex = i + 2;
      break;
    }
  }

  const values = [
    entry.email,
    entry.track,
    entry.moduleId,
    entry.attempts,
    entry.correct,
    entry.total,
    entry.bestScore,
    entry.completed ? 'TRUE' : 'FALSE',
    entry.lastPlayed,
    entry.updatedAt
  ];

  if (rowIndex > 0) {
    const range = getSheet_(DIXI.SHEETS.PROGRESS).getRange(rowIndex, 1, 1, values.length);
    range.setNumberFormats([DB_FORMATS.PROGRESS]);
    range.setValues([values]);
    invalidateTable_(DIXI.SHEETS.PROGRESS);
  } else {
    appendTypedRow_(DIXI.SHEETS.PROGRESS, values, DB_FORMATS.PROGRESS);
  }
}

/* =========================================================
   ACTIVITY
   ========================================================= */

function mapActivityRow_(row) {
  return {
    id: cellText_(row[0]),
    email: cellText_(row[1]).toLowerCase(),
    date: cellDateKey_(row[2]),
    track: cellText_(row[3]),
    moduleId: cellText_(row[4]),
    correct: Number(row[5]) || 0,
    total: Number(row[6]) || 0,
    score: Number(row[7]) || 0,
    xp: Number(row[8]) || 0,
    createdAt: cellIso_(row[9])
  };
}

function getActivityTable_() {
  return readTable_(DIXI.SHEETS.ACTIVITY, DB_HEADERS.ACTIVITY.length);
}

function appendActivity_(activity) {
  appendTypedRow_(DIXI.SHEETS.ACTIVITY, [
    activity.id,
    activity.email,
    activity.date,
    activity.track,
    activity.moduleId,
    activity.correct,
    activity.total,
    activity.score,
    activity.xp,
    activity.createdAt
  ], DB_FORMATS.ACTIVITY);
}

function getActivityByEmail_(email, limit) {
  const needle = normalizeEmail_(email);
  const result = getActivityTable_()
    .filter(function (row) { return cellText_(row[1]).toLowerCase() === needle; })
    .map(mapActivityRow_)
    .sort(function (a, b) { return String(b.createdAt).localeCompare(String(a.createdAt)); });
  return limit ? result.slice(0, limit) : result;
}

function hasCompletedModuleOnDate_(email, track, moduleId, dateKey) {
  const needle = normalizeEmail_(email);
  const rows = getActivityTable_();
  for (let i = rows.length - 1; i >= 0; i--) {
    const row = rows[i];
    if (cellText_(row[1]).toLowerCase() === needle &&
        cellDateKey_(row[2]) === dateKey &&
        cellText_(row[3]) === track &&
        cellText_(row[4]) === moduleId) {
      return true;
    }
  }
  return false;
}

/** Menghapus seluruh progress & aktivitas milik satu email. */
function deleteUserLearningData_(email) {
  const needle = normalizeEmail_(email);
  const progress = getProgressTable_();
  const keptProgress = progress.filter(function (row) {
    return cellText_(row[0]).toLowerCase() !== needle;
  });
  if (keptProgress.length !== progress.length) {
    rewriteTable_(DIXI.SHEETS.PROGRESS, DB_HEADERS.PROGRESS.length, keptProgress);
  }

  const activity = getActivityTable_();
  const keptActivity = activity.filter(function (row) {
    return cellText_(row[1]).toLowerCase() !== needle;
  });
  if (keptActivity.length !== activity.length) {
    rewriteTable_(DIXI.SHEETS.ACTIVITY, DB_HEADERS.ACTIVITY.length, keptActivity);
  }
  const missions = typeof deleteUserMissionData_ === 'function' ? deleteUserMissionData_(email) : 0;
  return {
    progress: progress.length - keptProgress.length,
    activity: activity.length - keptActivity.length,
    missions: missions
  };
}

/* =========================================================
   AUDIT LOG
   ========================================================= */

function appendAudit_(adminEmail, action, target, detail) {
  try {
    appendTypedRow_(DIXI.SHEETS.AUDIT, [
      Utilities.getUuid(),
      nowIso_(),
      adminEmail || '',
      action || '',
      target || '',
      String(detail || '').slice(0, 300)
    ], DB_FORMATS.AUDIT);
  } catch (err) {
    console.error('Audit log gagal: ' + err);
  }
}

function getAuditLog_(limit) {
  return readTable_(DIXI.SHEETS.AUDIT, DB_HEADERS.AUDIT.length)
    .map(function (row) {
      return {
        id: cellText_(row[0]),
        at: cellIso_(row[1]),
        admin: cellText_(row[2]),
        action: cellText_(row[3]),
        target: cellText_(row[4]),
        detail: cellText_(row[5])
      };
    })
    .sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); })
    .slice(0, limit || 50);
}
