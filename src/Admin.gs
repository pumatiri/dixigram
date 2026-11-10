/**
 * DIXIGRAM — Admin & Pengaturan Aplikasi
 * File: Admin.gs
 *
 * - Validasi pendaftar (setujui / tolak)
 * - Kelola akun (nonaktifkan, aktifkan, jadikan admin, reset password,
 *   reset progress, hapus)
 * - Pengaturan aplikasi (wajib validasi, buka/tutup pendaftaran,
 *   pengumuman, kuota tamu, notifikasi email)
 * - Jejak audit setiap tindakan admin
 */

const SETTINGS_PROPERTY = 'DIXI_SETTINGS';

/* =========================================================
   PENGATURAN APLIKASI
   ========================================================= */

function defaultSettings_() {
  return {
    requireApproval: true,
    registrationOpen: true,
    announcement: '',
    announcementTone: 'info',
    guestLimit: DIXI.GUEST_QUIZ_LIMIT,
    notifyAdmins: false,
    notifyUsers: false,
    publicUrl: '',
    donationEnabled: true,
    donationMessage: ''
  };
}

var SETTINGS_RUNTIME_ = null;

function getSettings_() {
  if (SETTINGS_RUNTIME_) return SETTINGS_RUNTIME_;
  const base = defaultSettings_();
  try {
    const raw = PropertiesService.getScriptProperties().getProperty(SETTINGS_PROPERTY);
    if (raw) {
      const saved = JSON.parse(raw);
      Object.keys(base).forEach(function (key) {
        if (saved[key] !== undefined) base[key] = saved[key];
      });
    }
  } catch (err) {
    console.error('Pengaturan rusak, memakai default: ' + err);
  }
  SETTINGS_RUNTIME_ = sanitizeSettings_(base);
  return SETTINGS_RUNTIME_;
}

function sanitizeSettings_(input) {
  const base = defaultSettings_();
  const tone = String(input.announcementTone || 'info');
  return {
    requireApproval: input.requireApproval !== undefined ? !!input.requireApproval : base.requireApproval,
    registrationOpen: input.registrationOpen !== undefined ? !!input.registrationOpen : base.registrationOpen,
    announcement: String(input.announcement || '')
      .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
      .trim()
      .slice(0, 280),
    announcementTone: ['info', 'success', 'warning'].indexOf(tone) !== -1 ? tone : 'info',
    guestLimit: Math.max(0, Math.min(20, Math.round(Number(input.guestLimit)))) || 0,
    notifyAdmins: !!input.notifyAdmins,
    notifyUsers: !!input.notifyUsers,
    publicUrl: cleanPublicUrl_(input.publicUrl) || '',
    donationEnabled: input.donationEnabled !== undefined ? !!input.donationEnabled : base.donationEnabled,
    donationMessage: String(input.donationMessage || '')
      .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
      .trim()
      .slice(0, 280)
  };
}

function saveSettings_(patch) {
  const merged = Object.assign({}, getSettings_(), patch || {});
  if (patch && patch.guestLimit !== undefined && !isFinite(Number(patch.guestLimit))) {
    throw apiError_('INVALID_SETTINGS', 'Kuota tamu harus berupa angka 0–20.');
  }
  if (patch && patch.publicUrl !== undefined && cleanPublicUrl_(patch.publicUrl) === null) {
    throw apiError_('INVALID_SETTINGS', 'Alamat aplikasi harus diawali https://, misalnya https://namakamu.github.io/dixigram/');
  }
  const clean = sanitizeSettings_(merged);
  PropertiesService.getScriptProperties().setProperty(SETTINGS_PROPERTY, JSON.stringify(clean));
  SETTINGS_RUNTIME_ = clean;
  return clean;
}

/** Pengaturan yang aman dikirim ke semua pengunjung. */
function publicSettings_() {
  const s = getSettings_();
  return {
    requireApproval: s.requireApproval,
    registrationOpen: s.registrationOpen,
    announcement: s.announcement,
    announcementTone: s.announcementTone,
    guestLimit: s.guestLimit,
    donationEnabled: s.donationEnabled
  };
}

/* =========================================================
   API ADMIN
   ========================================================= */

function apiAdminOverview(token) {
  return api_(function () {
    requireAdmin_(token);
    return buildAdminOverview_();
  });
}

/** Daftar pendaftar yang menunggu, selalu diambil langsung dari database. */
function apiAdminPending(token) {
  return api_(function () {
    requireAdmin_(token);
    const pending = getAllUsers_()
      .filter(function (u) { return u.status === USER_STATUS.PENDING; })
      .sort(function (a, b) { return String(b.createdAt).localeCompare(String(a.createdAt)); })
      .map(function (u) { return adminUserView_(u); });
    return { pending: pending, pulse: adminPulse_() };
  });
}

/** Ringkasan kecil untuk lonceng notifikasi admin. */
function adminPulse_() {
  const users = getAllUsers_();
  let pending = 0;
  let latest = '';
  let latestName = '';
  let online = 0;
  users.forEach(function (u) {
    if (u.status === USER_STATUS.PENDING) {
      pending++;
      if (String(u.createdAt) > latest) {
        latest = String(u.createdAt);
        latestName = u.name;
      }
    }
    if (u.role !== 'admin' && isSessionActive_(u)) online++;
  });
  return { pending: pending, latestPendingAt: latest, latestPendingName: latestName, online: online };
}

function apiAdminListUsers(token) {
  return api_(function () {
    requireAdmin_(token);
    return { users: buildAdminUserList_() };
  });
}

function apiAdminUserAction(token, email, action) {
  return api_(function () {
    const session = requireAdmin_(token);
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    let result;
    try {
      result = performUserAction_(session.user, normalizeEmail_(email), String(action || ''));
    } finally {
      lock.releaseLock();
    }
    if (result.notify) notifyUserApproved_(result.notify);
    delete result.notify;
    result.users = buildAdminUserList_();
    result.counts = countUsersByStatus_();
    return result;
  });
}

function apiAdminBulkApprove(token, emails) {
  return api_(function () {
    const session = requireAdmin_(token);
    const wanted = Array.isArray(emails) ? emails.map(normalizeEmail_).filter(Boolean) : [];
    const approved = [];
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      getAllUsers_().forEach(function (u) {
        if (u.status !== USER_STATUS.PENDING) return;
        if (wanted.length && wanted.indexOf(u.email) === -1) return;
        updateUserFields_(u.email, { status: USER_STATUS.ACTIVE });
        approved.push(u);
      });
      if (approved.length) {
        appendAudit_(session.user.email, 'bulk-approve', approved.length + ' akun',
          approved.map(function (u) { return u.email; }).join(', '));
      }
    } finally {
      lock.releaseLock();
    }
    approved.forEach(function (u) { notifyUserApproved_(u); });
    return {
      approved: approved.length,
      message: approved.length ? approved.length + ' akun disetujui.' : 'Tidak ada akun yang menunggu validasi.',
      users: buildAdminUserList_(),
      counts: countUsersByStatus_()
    };
  });
}

function apiAdminSaveSettings(token, patch) {
  return api_(function () {
    const session = requireAdmin_(token);
    const before = getSettings_();
    const after = saveSettings_(patch || {});
    const changed = Object.keys(after).filter(function (k) {
      return JSON.stringify(after[k]) !== JSON.stringify(before[k]);
    });
    if (changed.length) {
      appendAudit_(session.user.email, 'settings', '-', 'Mengubah: ' + changed.join(', '));
    }
    return { settings: after, appUrl: getAppUrl_() };
  });
}

/* =========================================================
   LOGIKA ADMIN
   ========================================================= */

function performUserAction_(admin, email, action) {
  const target = findUserByEmail_(email);
  if (!target) throw apiError_('NOT_FOUND', 'Akun tidak ditemukan.');

  const isSelf = target.email === admin.email;
  const selfBlocked = ['reject', 'suspend', 'delete', 'removeAdmin', 'resetPassword', 'revokeSessions'];
  if (isSelf && selfBlocked.indexOf(action) !== -1) {
    throw apiError_('FORBIDDEN', 'Tindakan ini tidak bisa dilakukan pada akunmu sendiri.');
  }

  const lastAdmin = target.role === 'admin' && target.status === USER_STATUS.ACTIVE && countAdmins_() <= 1;
  if (lastAdmin && ['removeAdmin', 'suspend', 'reject', 'delete'].indexOf(action) !== -1) {
    throw apiError_('FORBIDDEN', 'Minimal harus ada satu admin aktif.');
  }

  const out = { action: action, email: target.email };

  switch (action) {
    case 'approve':
      if (target.status === USER_STATUS.ACTIVE) throw apiError_('NO_CHANGE', 'Akun ini sudah aktif.');
      updateUserFields_(target.email, { status: USER_STATUS.ACTIVE });
      out.message = target.name + ' disetujui. Full access aktif.';
      out.notify = target;
      break;

    case 'activate':
      if (target.status === USER_STATUS.ACTIVE) throw apiError_('NO_CHANGE', 'Akun ini sudah aktif.');
      updateUserFields_(target.email, { status: USER_STATUS.ACTIVE });
      out.message = target.name + ' diaktifkan kembali.';
      break;

    case 'reject':
      updateUserFields_(target.email, {
        status: USER_STATUS.REJECTED,
        tokenVersion: target.tokenVersion + 1,
        sessionId: '', sessionDevice: '', sessionSeen: ''
      });
      out.message = 'Pendaftaran ' + target.name + ' ditolak.';
      break;

    case 'suspend':
      updateUserFields_(target.email, {
        status: USER_STATUS.SUSPENDED,
        tokenVersion: target.tokenVersion + 1,
        sessionId: '', sessionDevice: '', sessionSeen: ''
      });
      out.message = target.name + ' dinonaktifkan dan dikeluarkan dari semua perangkat.';
      break;

    case 'makeAdmin':
      if (target.role === 'admin') throw apiError_('NO_CHANGE', 'Akun ini sudah admin.');
      updateUserFields_(target.email, { role: 'admin', status: USER_STATUS.ACTIVE });
      out.message = target.name + ' sekarang admin.';
      break;

    case 'removeAdmin':
      if (target.role !== 'admin') throw apiError_('NO_CHANGE', 'Akun ini bukan admin.');
      updateUserFields_(target.email, { role: 'user' });
      out.message = 'Hak admin ' + target.name + ' dicabut.';
      break;

    case 'resetPassword': {
      const temp = generateTempPassword_();
      const salt = randomHex_(16);
      updateUserFields_(target.email, {
        salt: salt,
        passwordHash: hashPassword_(temp, salt),
        tokenVersion: target.tokenVersion + 1,
        sessionId: '', sessionDevice: '', sessionSeen: ''
      });
      clearLoginFailures_(target.email);
      out.tempPassword = temp;
      out.message = 'Password ' + target.name + ' direset. Berikan password sementara ini kepadanya.';
      break;
    }

    case 'revokeSessions':
      updateUserFields_(target.email, {
        tokenVersion: target.tokenVersion + 1,
        sessionId: '', sessionDevice: '', sessionSeen: ''
      });
      out.message = target.name + ' dikeluarkan dari semua perangkat dan bisa langsung masuk lagi di perangkat lain.';
      break;

    case 'resetProgress': {
      const removed = deleteUserLearningData_(target.email);
      updateUserFields_(target.email, { xp: 0, streak: 0, lastActive: '' });
      out.message = 'Progress ' + target.name + ' direset (' + removed.activity + ' riwayat dihapus).';
      break;
    }

    case 'delete':
      deleteUserLearningData_(target.email);
      deleteUserRow_(target.email);
      out.message = 'Akun ' + target.name + ' dihapus permanen.';
      break;

    default:
      throw apiError_('INVALID_ACTION', 'Tindakan tidak dikenal.');
  }

  appendAudit_(admin.email, action, target.email, out.message);
  return out;
}

function countUsersByStatus_() {
  const counts = { total: 0, pending: 0, active: 0, suspended: 0, rejected: 0, admin: 0 };
  getAllUsers_().forEach(function (u) {
    counts.total++;
    counts[u.status] = (counts[u.status] || 0) + 1;
    if (u.role === 'admin') counts.admin++;
  });
  return counts;
}

function adminUserView_(u, stats) {
  const s = stats || { quizzes: 0, completed: 0, lastPlayed: '' };
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    xp: u.xp,
    level: levelInfo_(u.xp).level,
    streak: u.streak,
    createdAt: u.createdAt,
    lastLogin: u.lastLogin,
    lastActive: u.lastActive,
    online: u.role !== 'admin' && isSessionActive_(u),
    lastSeen: u.sessionSeen || '',
    quizzes: s.quizzes,
    completed: s.completed,
    lastPlayed: s.lastPlayed
  };
}

function buildAdminUserList_() {
  const stats = {};
  getProgressTable_().forEach(function (row) {
    const p = mapProgressRow_(row);
    const s = stats[p.email] || (stats[p.email] = { quizzes: 0, completed: 0, lastPlayed: '' });
    s.quizzes += p.attempts;
    if (p.completed) s.completed++;
    if (String(p.lastPlayed) > String(s.lastPlayed)) s.lastPlayed = p.lastPlayed;
  });

  const order = { pending: 0, active: 1, suspended: 2, rejected: 3 };
  return getAllUsers_()
    .map(function (u) { return adminUserView_(u, stats[u.email]); })
    .sort(function (a, b) {
      if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
      return String(b.createdAt).localeCompare(String(a.createdAt));
    });
}

function buildAdminOverview_() {
  const users = getAllUsers_();
  const counts = countUsersByStatus_();
  const today = todayKey_();
  const days = [];
  const now = Date.now();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    days.push({
      date: Utilities.formatDate(d, DIXI.TIMEZONE, 'yyyy-MM-dd'),
      label: Utilities.formatDate(d, DIXI.TIMEZONE, 'dd/MM'),
      quizzes: 0,
      learners: 0,
      isToday: i === 0
    });
  }
  const dayIndex = {};
  days.forEach(function (d, i) { dayIndex[d.date] = i; });

  const learnersByDay = {};
  const moduleCount = {};
  let quizzesToday = 0;
  let quizzesWeek = 0;
  let correctWeek = 0;
  let answersWeek = 0;

  getActivityTable_().forEach(function (row) {
    const a = mapActivityRow_(row);
    if (a.track === 'diagnostic') return;
    if (a.date === today) quizzesToday++;
    const idx = dayIndex[a.date];
    if (idx !== undefined) {
      days[idx].quizzes++;
      quizzesWeek++;
      correctWeek += a.correct;
      answersWeek += a.total;
      const key = a.date + '|' + a.email;
      if (!learnersByDay[key]) {
        learnersByDay[key] = true;
        days[idx].learners++;
      }
      moduleCount[a.moduleId] = (moduleCount[a.moduleId] || 0) + 1;
    }
  });

  const topModules = Object.keys(moduleCount)
    .map(function (id) {
      const m = getModuleById_(id);
      return {
        id: id,
        title: m ? m.title : id,
        track: m ? m.track : 'grammar',
        icon: m ? m.icon : 'book-open',
        count: moduleCount[id]
      };
    })
    .sort(function (a, b) { return b.count - a.count; })
    .slice(0, 5);

  const weekAgo = new Date(now - 7 * 86400000).toISOString();
  const newThisWeek = users.filter(function (u) { return String(u.createdAt) >= weekAgo; }).length;

  let dbUrl = '';
  try { dbUrl = getDatabase_().getUrl(); } catch (err) { dbUrl = ''; }

  return {
    counts: counts,
    online: adminPulse_().online,
    newThisWeek: newThisWeek,
    quizzesToday: quizzesToday,
    quizzesWeek: quizzesWeek,
    accuracyWeek: answersWeek ? Math.round((correctWeek / answersWeek) * 100) : 0,
    activeToday: days[days.length - 1].learners,
    days: days,
    topModules: topModules,
    pending: users
      .filter(function (u) { return u.status === USER_STATUS.PENDING; })
      .sort(function (a, b) { return String(b.createdAt).localeCompare(String(a.createdAt)); })
      .slice(0, 8)
      .map(function (u) { return adminUserView_(u); }),
    audit: getAuditLog_(30),
    settings: getSettings_(),
    dbUrl: dbUrl,
    appUrl: getAppUrl_(),
    publicUrlInCode: !!cleanPublicUrl_(DIXI.PUBLIC_URL)
  };
}

/* =========================================================
   NOTIFIKASI EMAIL (opsional, bisa dimatikan di Pengaturan)
   ========================================================= */

/** Tautan untuk email: alamat GitHub Pages bila diatur, selain itu URL Apps Script. */
function getAppUrl_() {
  const base = publicBaseUrl_();
  if (base) return base;
  try { return ScriptApp.getService().getUrl() || ''; } catch (err) { return ''; }
}

function canSendMail_() {
  try { return MailApp.getRemainingDailyQuota() > 0; } catch (err) { return false; }
}

function notifyAdminsOfRegistration_(user) {
  try {
    if (!getSettings_().notifyAdmins || !canSendMail_()) return;
    const admins = getAllUsers_()
      .filter(function (u) { return u.role === 'admin' && u.status === USER_STATUS.ACTIVE; })
      .map(function (u) { return u.email; });
    if (!admins.length) return;
    const url = getAppUrl_();
    MailApp.sendEmail({
      to: admins.join(','),
      subject: '[DIXIGRAM] Pendaftar baru menunggu validasi: ' + user.name,
      body: 'Ada pendaftar baru di DIXIGRAM.\n\n' +
        'Nama  : ' + user.name + '\n' +
        'Email : ' + user.email + '\n\n' +
        'Buka panel admin untuk menyetujui atau menolak' + (url ? ':\n' + url + '#/admin' : '.') + '\n'
    });
  } catch (err) {
    console.error('Notifikasi admin gagal: ' + err);
  }
}

function notifyUserApproved_(user) {
  try {
    if (!user || !getSettings_().notifyUsers || !canSendMail_()) return;
    const url = getAppUrl_();
    MailApp.sendEmail({
      to: user.email,
      subject: 'Akun DIXIGRAM kamu sudah aktif',
      body: 'Halo ' + user.name + ',\n\n' +
        'Akun DIXIGRAM kamu sudah divalidasi admin. Semua modul dan latihan tanpa batas sekarang terbuka.\n' +
        (url ? '\nMasuk di: ' + url + '\n' : '') +
        '\nSelamat belajar!\nDIXIGRAM'
    });
  } catch (err) {
    console.error('Notifikasi pengguna gagal: ' + err);
  }
}
