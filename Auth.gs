/**
 * DIXIGRAM — Auth & Session
 * File: Auth.gs
 *
 * Login memakai email + password. Password tidak pernah disimpan mentah.
 * Sesi memakai token bertanda tangan (HMAC), sehingga tidak bergantung pada cache.
 *
 * Status akun:
 *   pending   → baru mendaftar, menunggu validasi admin (akses terbatas)
 *   active    → sudah divalidasi, full access
 *   suspended → dinonaktifkan admin (tidak bisa masuk)
 *   rejected  → pendaftaran ditolak admin (tidak bisa masuk)
 *
 * Single login (v1.2):
 *   Akun non-admin hanya boleh aktif di SATU perangkat/browser. Login kedua
 *   ditolak selama sesi lama masih aktif (ada aktivitas dalam
 *   DIXI.SESSION_IDLE_MINUTES menit terakhir). Admin dikecualikan.
 */

const AUTH_HASH_ROUNDS = 450;

/* =========================================================
   REGISTER / LOGIN
   ========================================================= */

function registerUser_(payload) {
  const settings = getSettings_();
  const name = sanitizeName_(payload.name);
  const email = normalizeEmail_(payload.email);
  const password = String(payload.password || '');

  validateName_(name);
  validateEmail_(email);
  validatePassword_(password);

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  let user;
  try {
    if (findUserByEmail_(email)) {
      throw apiError_('EMAIL_EXISTS', 'Email ini sudah terdaftar. Coba masuk saja.');
    }

    const isBootstrapAdmin = isBootstrapAdminEmail_(email) ||
      // Hanya berlaku pada database yang benar-benar kosong, supaya pada
      // aplikasi yang sudah berjalan tidak ada pendaftar acak menjadi admin.
      (DIXI.FIRST_USER_IS_ADMIN && getConfiguredAdminEmails_().length === 0 && getAllUsers_().length === 0);

    if (!settings.registrationOpen && !isBootstrapAdmin) {
      throw apiError_('REGISTRATION_CLOSED', 'Pendaftaran akun baru sedang ditutup oleh admin.');
    }

    const salt = randomHex_(16);
    const now = nowIso_();
    const role = isBootstrapAdmin ? 'admin' : 'user';
    user = {
      id: Utilities.getUuid(),
      name: name,
      email: email,
      salt: salt,
      passwordHash: hashPassword_(password, salt),
      role: role,
      tokenVersion: 1,
      xp: 0,
      streak: 0,
      lastActive: '',
      dailyGoal: DIXI.DEFAULT_GOAL,
      createdAt: now,
      lastLogin: now,
      status: (isBootstrapAdmin || !settings.requireApproval) ? USER_STATUS.ACTIVE : USER_STATUS.PENDING,
      sessionId: role === 'admin' ? '' : randomHex_(12),
      sessionDevice: role === 'admin' ? '' : cleanDeviceId_(payload.deviceId),
      sessionSeen: role === 'admin' ? '' : now
    };
    appendUser_(user);
  } finally {
    lock.releaseLock();
  }

  if (user.status === USER_STATUS.PENDING) {
    notifyAdminsOfRegistration_(user);
  }

  return authResult_(findUserByEmail_(email));
}

function loginUser_(payload) {
  const email = normalizeEmail_(payload.email);
  const password = String(payload.password || '');

  if (!email || !password) {
    throw apiError_('INVALID_LOGIN', 'Email dan password wajib diisi.');
  }
  assertLoginAllowed_(email);

  let user = findUserByEmail_(email);
  if (!user) {
    recordLoginFailure_(email);
    throw apiError_('INVALID_LOGIN', 'Email atau password tidak cocok.');
  }

  const candidate = hashPassword_(password, user.salt);
  if (!safeEqual_(candidate, user.passwordHash)) {
    recordLoginFailure_(email);
    throw apiError_('INVALID_LOGIN', 'Email atau password tidak cocok.');
  }
  clearLoginFailures_(email);

  // Email yang terdaftar di ADMIN_EMAILS otomatis menjadi admin aktif.
  if (isBootstrapAdminEmail_(email) && (user.role !== 'admin' || user.status !== USER_STATUS.ACTIVE)) {
    updateUserFields_(email, { role: 'admin', status: USER_STATUS.ACTIVE });
    user = findUserByEmail_(email);
  }

  if (user.status === USER_STATUS.SUSPENDED) {
    throw apiError_('ACCOUNT_SUSPENDED', 'Akun ini sedang dinonaktifkan admin. Hubungi admin untuk informasi lebih lanjut.');
  }
  if (user.status === USER_STATUS.REJECTED) {
    throw apiError_('ACCOUNT_REJECTED', 'Pendaftaran akun ini tidak disetujui admin.');
  }

  const now = nowIso_();
  if (user.role === 'admin') {
    updateUserFields_(email, { lastLogin: now });
  } else {
    // Single login: cek & ambil alih sesi di dalam lock agar dua login
    // bersamaan dari perangkat berbeda tidak sama-sama lolos.
    const deviceId = cleanDeviceId_(payload.deviceId);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const latest = findUserByEmail_(email);
      const activeElsewhere = isSessionActive_(latest) &&
        !(deviceId && latest.sessionDevice && latest.sessionDevice === deviceId);
      if (activeElsewhere) {
        const wait = sessionMinutesLeft_(latest);
        throw apiError_(
          'SESSION_ACTIVE',
          'Akun ini sedang aktif di perangkat atau browser lain. Keluar dulu dari perangkat tersebut, ' +
          'atau coba lagi sekitar ' + wait + ' menit lagi setelah perangkat itu tidak dipakai. ' +
          'Admin juga bisa mengeluarkan sesi lama.'
        );
      }
      updateUserFields_(email, {
        lastLogin: now,
        sessionId: randomHex_(12),
        sessionDevice: deviceId,
        sessionSeen: now
      });
    } finally {
      lock.releaseLock();
    }
  }

  return authResult_(findUserByEmail_(email));
}

/**
 * Hasil login/daftar: token + seluruh data bootstrap dalam SATU respons,
 * sehingga browser tidak perlu memanggil server dua kali.
 */
function authResult_(user) {
  const token = createUserToken_(user);
  const session = {
    role: user.role === 'admin' ? 'admin' : 'user',
    access: user.status === USER_STATUS.ACTIVE ? 'full' : 'pending',
    user: user,
    token: token,
    claims: null,
    expired: false
  };
  return {
    token: token,
    user: publicUserBrief_(user),
    boot: buildBootstrap_(session)
  };
}

/* =========================================================
   SINGLE LOGIN — STATUS SESI
   ========================================================= */

function cleanDeviceId_(value) {
  return String(value || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
}

function sessionIdleMs_() {
  return Math.max(2, Number(DIXI.SESSION_IDLE_MINUTES) || 10) * 60000;
}

function isSessionActive_(user) {
  if (!user || !user.sessionId || !user.sessionSeen) return false;
  const seen = new Date(user.sessionSeen).getTime();
  return isFinite(seen) && (Date.now() - seen) < sessionIdleMs_();
}

function sessionMinutesLeft_(user) {
  const seen = new Date(user.sessionSeen).getTime();
  const left = sessionIdleMs_() - (Date.now() - seen);
  return Math.max(1, Math.ceil(left / 60000));
}

function clearUserSession_(email) {
  updateUserFields_(email, { sessionId: '', sessionDevice: '', sessionSeen: '' });
}

/** Mencatat bahwa sesi masih dipakai (maks. 1 tulis per menit). */
function touchSession_(user) {
  const seen = new Date(user.sessionSeen || 0).getTime();
  if (!isFinite(seen) || Date.now() - seen > 60000) {
    const now = nowIso_();
    try {
      updateUserFields_(user.email, { sessionSeen: now });
      user.sessionSeen = now;
    } catch (err) {
      console.error('Gagal memperbarui sesi: ' + err);
    }
  }
}

function changePassword_(session, currentPassword, nextPassword) {
  const user = session.user;
  const current = String(currentPassword || '');
  const next = String(nextPassword || '');

  if (!safeEqual_(hashPassword_(current, user.salt), user.passwordHash)) {
    throw apiError_('INVALID_PASSWORD', 'Password saat ini tidak cocok.');
  }
  validatePassword_(next);
  if (current === next) {
    throw apiError_('WEAK_PASSWORD', 'Password baru harus berbeda dari password lama.');
  }

  const salt = randomHex_(16);
  updateUserFields_(user.email, {
    salt: salt,
    passwordHash: hashPassword_(next, salt),
    tokenVersion: Number(user.tokenVersion) + 1
  });
  const fresh = findUserByEmail_(user.email);
  return { token: createUserToken_(fresh) };
}

function revokeUserSessions_(email) {
  const user = findUserByEmail_(email);
  if (!user) return;
  updateUserFields_(email, {
    tokenVersion: Number(user.tokenVersion) + 1,
    sessionId: '',
    sessionDevice: '',
    sessionSeen: ''
  });
}

function publicUserBrief_(user) {
  return {
    name: user.name,
    email: user.email,
    status: user.status,
    role: user.role
  };
}

/* =========================================================
   ADMIN BOOTSTRAP
   ========================================================= */

function getConfiguredAdminEmails_() {
  const fromCode = (DIXI.ADMIN_EMAILS || []).map(normalizeEmail_);
  const raw = PropertiesService.getScriptProperties().getProperty(DIXI.ADMIN_PROPERTY) || '';
  const fromProps = raw.split(/[,\s;]+/).map(normalizeEmail_);
  return fromCode.concat(fromProps).filter(Boolean);
}

function isBootstrapAdminEmail_(email) {
  return getConfiguredAdminEmails_().indexOf(normalizeEmail_(email)) !== -1;
}

/* =========================================================
   TOKEN
   ========================================================= */

function getSecret_() {
  const props = PropertiesService.getScriptProperties();
  let secret = props.getProperty(DIXI.SECRET_PROPERTY);
  if (!secret) {
    secret = randomHex_(48) + Utilities.getUuid().replace(/-/g, '');
    props.setProperty(DIXI.SECRET_PROPERTY, secret);
  }
  return secret;
}

function createUserToken_(user) {
  const issued = Math.floor(Date.now() / 1000);
  const claims = {
    sub: user.email,
    role: 'user',
    ver: Number(user.tokenVersion) || 1,
    iat: issued,
    exp: issued + DIXI.USER_TOKEN_TTL
  };
  if (user.role !== 'admin' && user.sessionId) claims.sid = user.sessionId;
  return signToken_(claims);
}

function createGuestToken_(guestId) {
  const issued = Math.floor(Date.now() / 1000);
  return signToken_({
    sub: 'guest:' + guestId,
    role: 'guest',
    gid: guestId,
    iat: issued,
    exp: issued + DIXI.GUEST_TOKEN_TTL
  });
}

function signToken_(claims) {
  const payload = Utilities.base64EncodeWebSafe(JSON.stringify(claims));
  const signature = Utilities.base64EncodeWebSafe(
    Utilities.computeHmacSha256Signature(payload, getSecret_())
  );
  return 'v1.' + payload + '.' + signature;
}

/**
 * Memeriksa token dan mengembalikan alasan kegagalan.
 * reason: 'ok' | 'missing' | 'invalid' | 'expired'
 * role diisi bila payload bisa dibaca (dipakai untuk membedakan
 * token tamu yang kedaluwarsa dari sesi login yang berakhir).
 */
function inspectToken_(token) {
  if (!token || typeof token !== 'string') return { reason: 'missing', claims: null, role: '' };
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return { reason: 'invalid', claims: null, role: '' };

  let claims = null;
  try {
    const bytes = Utilities.base64DecodeWebSafe(parts[1]);
    claims = JSON.parse(Utilities.newBlob(bytes).getDataAsString());
  } catch (err) {
    return { reason: 'invalid', claims: null, role: '' };
  }

  const expected = Utilities.base64EncodeWebSafe(
    Utilities.computeHmacSha256Signature(parts[1], getSecret_())
  );
  if (!safeEqual_(expected, parts[2])) return { reason: 'invalid', claims: null, role: '' };

  const role = claims && claims.role ? String(claims.role) : '';
  if (!claims || !claims.exp || Number(claims.exp) <= Math.floor(Date.now() / 1000)) {
    return { reason: 'expired', claims: null, role: role };
  }
  return { reason: 'ok', claims: claims, role: role };
}

function verifyToken_(token) {
  const info = inspectToken_(token);
  return info.reason === 'ok' ? info.claims : null;
}

/* =========================================================
   SESI
   ========================================================= */

/**
 * session.access:
 *   'guest'   → tanpa akun
 *   'pending' → akun menunggu validasi admin (akses terbatas)
 *   'full'    → akun aktif (termasuk admin)
 */
function resolveSession_(token, allowGuest) {
  const info = inspectToken_(token);

  if (info.reason === 'missing') {
    if (allowGuest) return createGuestSession_(false);
    throw apiError_('AUTH_REQUIRED', 'Silakan masuk atau daftar untuk melanjutkan.');
  }

  if (info.reason !== 'ok') {
    // Token tamu yang habis bukan "sesi login berakhir".
    const wasUser = info.role === 'user';
    if (allowGuest) return createGuestSession_(wasUser, 'expired');
    throw apiError_('SESSION_EXPIRED', 'Sesi kamu berakhir. Silakan masuk kembali.');
  }

  const claims = info.claims;

  if (claims.role === 'guest') {
    if (!allowGuest) {
      throw apiError_('AUTH_REQUIRED', 'Fitur ini memerlukan akun.');
    }
    return {
      role: 'guest',
      access: 'guest',
      guestId: String(claims.gid || ''),
      token: token,
      claims: claims,
      expired: false,
      user: null
    };
  }

  if (claims.role !== 'user') {
    if (allowGuest) return createGuestSession_(true);
    throw apiError_('SESSION_EXPIRED', 'Sesi tidak valid. Silakan masuk kembali.');
  }

  const user = findUserByEmail_(claims.sub);
  const allowedStatus = user && (user.status === USER_STATUS.ACTIVE || user.status === USER_STATUS.PENDING);
  if (!allowedStatus || Number(user.tokenVersion) !== Number(claims.ver)) {
    if (allowGuest) return createGuestSession_(true);
    throw apiError_('SESSION_EXPIRED', 'Sesi kamu berakhir. Silakan masuk kembali.');
  }

  let activeToken = token;
  if (user.role !== 'admin') {
    if (claims.sid) {
      if (claims.sid !== user.sessionId) {
        // Sesi diambil alih perangkat lain (atau dikeluarkan admin).
        if (allowGuest) return createGuestSession_(true, 'replaced');
        throw apiError_('SESSION_REPLACED', 'Akunmu sudah dipakai masuk di perangkat lain, jadi sesi di sini diakhiri.');
      }
      touchSession_(user);
    } else {
      // Token lama (sebelum v1.2) tanpa ID sesi: ambil alih bila tidak ada sesi aktif.
      if (isSessionActive_(user)) {
        if (allowGuest) return createGuestSession_(true, 'replaced');
        throw apiError_('SESSION_REPLACED', 'Akunmu sedang aktif di perangkat lain. Silakan masuk kembali.');
      }
      const now = nowIso_();
      user.sessionId = randomHex_(12);
      user.sessionDevice = '';
      user.sessionSeen = now;
      updateUserFields_(user.email, { sessionId: user.sessionId, sessionDevice: '', sessionSeen: now });
      activeToken = createUserToken_(user);
    }
  }

  return {
    role: user.role === 'admin' ? 'admin' : 'user',
    access: user.status === USER_STATUS.ACTIVE ? 'full' : 'pending',
    user: user,
    token: activeToken,
    claims: claims,
    expired: false
  };
}

function requireUser_(token) {
  const session = resolveSession_(token, false);
  if (!session.user) {
    throw apiError_('AUTH_REQUIRED', 'Silakan masuk atau daftar untuk melanjutkan.');
  }
  return session;
}

function requireAdmin_(token) {
  const session = requireUser_(token);
  if (session.user.role !== 'admin' || session.user.status !== USER_STATUS.ACTIVE) {
    throw apiError_('FORBIDDEN', 'Halaman ini khusus admin.');
  }
  return session;
}

/**
 * Untuk aksi yang menulis data: sesi login yang berakhir tidak boleh
 * diam-diam berubah menjadi sesi tamu.
 */
function assertNotExpired_(session) {
  if (!session.expired) return;
  if (session.endReason === 'replaced') {
    throw apiError_('SESSION_REPLACED', 'Akunmu sudah dipakai masuk di perangkat lain, jadi sesi di sini diakhiri.');
  }
  throw apiError_('SESSION_EXPIRED', 'Sesi kamu berakhir. Silakan masuk kembali.');
}

function createGuestSession_(expired, reason) {
  const guestId = Utilities.getUuid();
  return {
    role: 'guest',
    access: 'guest',
    guestId: guestId,
    token: createGuestToken_(guestId),
    claims: null,
    expired: !!expired,
    endReason: expired ? (reason || 'expired') : '',
    user: null
  };
}

/* =========================================================
   KUOTA (TAMU & AKUN PENDING)
   ========================================================= */

function quotaOwnerId_(session) {
  if (session.user) return 'u:' + session.user.email;
  return 'g:' + session.guestId;
}

function quotaUsage_(session) {
  if (session.access === 'full') return null;
  const limit = getSettings_().guestLimit;
  const raw = CacheService.getScriptCache().get(quotaKey_(quotaOwnerId_(session)));
  const used = Math.max(0, Number(raw) || 0);
  return {
    used: used,
    limit: limit,
    remaining: Math.max(0, limit - used),
    date: todayKey_()
  };
}

function consumeQuota_(session) {
  const usage = quotaUsage_(session);
  if (!usage) return null;
  if (usage.remaining <= 0) {
    throw apiError_(
      'GUEST_LIMIT',
      session.access === 'pending'
        ? 'Kuota latihan hari ini sudah habis. Akses penuh terbuka setelah akunmu divalidasi admin.'
        : 'Kuota tamu hari ini sudah habis. Buat akun gratis untuk latihan tanpa batas.'
    );
  }
  const next = usage.used + 1;
  CacheService.getScriptCache().put(quotaKey_(quotaOwnerId_(session)), String(next), 21600);
  return {
    used: next,
    limit: usage.limit,
    remaining: Math.max(0, usage.limit - next),
    date: todayKey_()
  };
}

function quotaKey_(ownerId) {
  const digest = bytesToHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, ownerId));
  return 'dixi_quota_' + digest + '_' + todayKey_();
}

/* =========================================================
   VALIDASI & KEAMANAN
   ========================================================= */

function sanitizeName_(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[=+\-@'"]+/, '')
    .trim()
    .slice(0, 40);
}

function normalizeEmail_(value) {
  return String(value || '').trim().toLowerCase().slice(0, 160);
}

function validateName_(name) {
  if (name.length < 2 || name.length > 40) {
    throw apiError_('INVALID_NAME', 'Nama harus 2–40 karakter.');
  }
  if (!/^[A-Za-zÀ-ÿ0-9 .'_-]+$/.test(name)) {
    throw apiError_('INVALID_NAME', 'Nama hanya boleh berisi huruf, angka, titik, apostrof, garis bawah, strip, dan spasi.');
  }
}

function validateEmail_(email) {
  // Karakter pertama wajib huruf/angka: mencegah nilai seperti "=..." atau "+..."
  // ditafsirkan sebagai formula oleh Google Sheets.
  if (!/^[a-z0-9][a-z0-9._%+-]*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(String(email || ''))) {
    throw apiError_('INVALID_EMAIL', 'Alamat email belum valid.');
  }
}

function validatePassword_(password) {
  if (password.length < 8) {
    throw apiError_('WEAK_PASSWORD', 'Password minimal 8 karakter.');
  }
  if (password.length > 100) {
    throw apiError_('WEAK_PASSWORD', 'Password maksimal 100 karakter.');
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    throw apiError_('WEAK_PASSWORD', 'Gunakan minimal satu huruf dan satu angka.');
  }
}

function hashPassword_(password, salt) {
  // Gunakan input String pada semua putaran computeDigest.
  // Catatan: formula ini dipertahankan agar hash akun lama tetap valid.
  let hex = bytesToHex_(Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    salt + '|' + password + '|' + getSecret_()
  ));
  for (let i = 0; i < AUTH_HASH_ROUNDS; i++) {
    hex = bytesToHex_(Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      hex
    ));
  }
  return hex;
}

function bytesToHex_(bytes) {
  return bytes.map(function (b) {
    const v = b < 0 ? b + 256 : b;
    return ('0' + v.toString(16)).slice(-2);
  }).join('');
}

/** Membuat password sementara yang mudah dibaca (untuk reset oleh admin). */
function generateTempPassword_() {
  const letters = 'abcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  const seed = randomHex_(16);
  let out = '';
  for (let i = 0; i < 6; i++) {
    out += letters.charAt(parseInt(seed.substr(i * 2, 2), 16) % letters.length);
  }
  for (let j = 6; j < 10; j++) {
    out += digits.charAt(parseInt(seed.substr(j * 2, 2), 16) % digits.length);
  }
  return out.charAt(0).toUpperCase() + out.slice(1);
}

function assertLoginAllowed_(email) {
  const raw = CacheService.getScriptCache().get(loginFailKey_(email));
  if (Number(raw) >= 5) {
    throw apiError_('RATE_LIMIT', 'Terlalu banyak percobaan. Coba lagi dalam 10 menit.');
  }
}

function recordLoginFailure_(email) {
  const cache = CacheService.getScriptCache();
  const key = loginFailKey_(email);
  const count = Number(cache.get(key)) || 0;
  cache.put(key, String(count + 1), 10 * 60);
}

function clearLoginFailures_(email) {
  CacheService.getScriptCache().remove(loginFailKey_(email));
}

function loginFailKey_(email) {
  return 'dixi_login_fail_' + bytesToHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, email));
}
