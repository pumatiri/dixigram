/**
 * DIXIGRAM — Angket Respon Pengguna (penelitian R&D, model ADDIE)
 * File: Survey.gs
 *
 * - Instrumen angket didefinisikan di SURVEY_INSTRUMENT (satu sumber untuk
 *   formulir responden, penyimpanan, dan laporan admin).
 * - Angket hanya bisa dikirim setelah responden menyelesaikan minimal satu
 *   latihan (tamu maupun anggota). Bukti latihan berupa "tiket" bertanda tangan
 *   yang diberikan server saat latihan selesai (lihat finishQuiz_).
 * - Identitas responden hanya NIM (tanpa nama). Satu NIM = satu jawaban.
 * - Jawaban disimpan di sheet DIXI_Survey, satu kolom per butir, sehingga
 *   bisa langsung diolah di Sheets/Excel/SPSS.
 */

const SURVEY_SHEET = 'DIXI_Survey';
const SURVEY_SETTINGS_KEY = 'DIXI_SURVEY_SETTINGS';
const SURVEY_TICKET_DAYS = 30;

const SURVEY_SCALES = Object.freeze({
  agree: {
    min: 1, max: 5,
    labels: ['Sangat tidak setuju', 'Tidak setuju', 'Netral', 'Setuju', 'Sangat setuju'],
    short: ['STS', 'TS', 'N', 'S', 'SS']
  },
  overall: {
    min: 1, max: 5,
    labels: ['Sangat buruk', 'Buruk', 'Cukup', 'Baik', 'Sangat baik'],
    short: ['1', '2', '3', '4', '5']
  },
  nps: {
    min: 0, max: 10,
    labels: ['Sangat tidak mungkin', '', '', '', '', '', '', '', '', '', 'Sangat mungkin'],
    short: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  }
});

const SURVEY_INSTRUMENT = Object.freeze({
  version: '1.1',
  title: 'Angket Respon Pengguna DIXIGRAM',
  sections: [
    {
      id: 'A', title: 'Profil Penggunaan', short: 'Profil',
      intro: 'Bagian ini menggambarkan cara Anda menggunakan DIXIGRAM. Pilih satu jawaban yang paling sesuai.',
      items: [
        { id: 'A1', type: 'choice', text: 'Perangkat yang paling sering Anda gunakan untuk membuka DIXIGRAM',
          options: ['Ponsel (smartphone)', 'Tablet', 'Laptop atau komputer'] },
        { id: 'A2', type: 'choice', text: 'Cara Anda menggunakan DIXIGRAM',
          options: ['Sebagai tamu (tanpa akun)', 'Dengan akun terdaftar'] },
        { id: 'A3', type: 'choice', text: 'Perkiraan total waktu Anda menggunakan DIXIGRAM sejauh ini',
          options: ['Kurang dari 30 menit', '30–60 menit', '1–3 jam', 'Lebih dari 3 jam'] },
        { id: 'A4', type: 'choice', text: 'Jumlah latihan (kuis) yang sudah Anda selesaikan',
          options: ['1 latihan', '2–3 latihan', '4–6 latihan', 'Lebih dari 6 latihan'] },
        { id: 'A5', type: 'choice', text: 'Jalur belajar yang sudah Anda coba',
          options: ['Grammar saja', 'Vocabulary saja', 'Grammar dan vocabulary'] },
        { id: 'A6', type: 'choice', text: 'Menurut penilaian Anda sendiri, kemampuan bahasa Inggris Anda saat ini berada pada tingkat',
          options: ['Pemula (A1)', 'Dasar (A2)', 'Menengah (B1)', 'Menengah atas (B2) atau lebih'] }
      ]
    },
    {
      id: 'B', title: 'Kegunaan Sistem', short: 'Kegunaan (SUS)', aspect: 'Kegunaan sistem (SUS)', sus: true,
      intro: 'Sepuluh pernyataan baku System Usability Scale (Brooke, 1996). Sebagian pernyataan sengaja bernada negatif; bacalah dengan teliti.',
      items: [
        { id: 'B1', type: 'likert', polarity: 1, text: 'Saya rasa saya akan sering menggunakan DIXIGRAM.' },
        { id: 'B2', type: 'likert', polarity: -1, text: 'Saya merasa DIXIGRAM terlalu rumit untuk digunakan.' },
        { id: 'B3', type: 'likert', polarity: 1, text: 'Saya merasa DIXIGRAM mudah digunakan.' },
        { id: 'B4', type: 'likert', polarity: -1, text: 'Saya membutuhkan bantuan orang lain untuk dapat menggunakan DIXIGRAM.' },
        { id: 'B5', type: 'likert', polarity: 1, text: 'Saya merasa fitur-fitur DIXIGRAM terpadu dengan baik.' },
        { id: 'B6', type: 'likert', polarity: -1, text: 'Saya merasa ada banyak hal yang tidak konsisten di DIXIGRAM.' },
        { id: 'B7', type: 'likert', polarity: 1, text: 'Saya rasa kebanyakan orang akan cepat memahami cara menggunakan DIXIGRAM.' },
        { id: 'B8', type: 'likert', polarity: -1, text: 'Saya merasa DIXIGRAM membingungkan untuk digunakan.' },
        { id: 'B9', type: 'likert', polarity: 1, text: 'Saya merasa percaya diri saat menggunakan DIXIGRAM.' },
        { id: 'B10', type: 'likert', polarity: -1, text: 'Saya perlu mempelajari banyak hal sebelum dapat menggunakan DIXIGRAM.' }
      ]
    },
    {
      id: 'C', title: 'Tampilan Antarmuka', short: 'Tampilan', aspect: 'Tampilan antarmuka',
      intro: 'Penilaian terhadap desain visual dan tata letak (layout) DIXIGRAM.',
      items: [
        { id: 'C1', type: 'likert', text: 'Tampilan DIXIGRAM menarik.' },
        { id: 'C2', type: 'likert', text: 'Tata letak (layout) setiap halaman rapi dan tidak membingungkan.' },
        { id: 'C3', type: 'likert', text: 'Ukuran huruf dan kontras warna nyaman dibaca.' },
        { id: 'C4', type: 'likert', text: 'Ikon, warna, dan simbol membantu saya memahami fungsi setiap bagian.' },
        { id: 'C5', type: 'likert', text: 'Tampilan tetap rapi dan nyaman ketika dibuka di layar ponsel.' }
      ]
    },
    {
      id: 'D', title: 'Navigasi dan Kinerja', short: 'Navigasi', aspect: 'Navigasi dan kinerja',
      intro: 'Penilaian terhadap kemudahan berpindah halaman serta kecepatan dan kestabilan aplikasi.',
      items: [
        { id: 'D1', type: 'likert', text: 'Saya dapat mulai menggunakan DIXIGRAM dengan cepat, baik sebagai tamu maupun dengan akun.' },
        { id: 'D2', type: 'likert', text: 'Menu dan tombol mudah ditemukan.' },
        { id: 'D3', type: 'likert', text: 'Saya mudah berpindah antara materi, latihan kartu, dan kuis.' },
        { id: 'D4', type: 'likert', text: 'Halaman dan latihan dimuat dengan cukup cepat.' },
        { id: 'D5', type: 'likert', text: 'DIXIGRAM berjalan lancar tanpa gangguan atau galat (error).' }
      ]
    },
    {
      id: 'E', title: 'Materi dan Bahasa', short: 'Materi', aspect: 'Materi dan bahasa',
      intro: 'Penilaian terhadap isi materi grammar dan vocabulary.',
      items: [
        { id: 'E1', type: 'likert', text: 'Penjelasan materi grammar mudah dipahami.' },
        { id: 'E2', type: 'likert', text: 'Bahasa Indonesia yang digunakan dalam penjelasan jelas dan komunikatif.' },
        { id: 'E3', type: 'likert', text: 'Contoh kalimat relevan dengan kehidupan sehari-hari dan akademik.' },
        { id: 'E4', type: 'likert', text: 'Kosakata yang disajikan bermanfaat bagi saya.' },
        { id: 'E5', type: 'likert', text: 'Materi tersusun runtut dari yang mudah ke yang sulit.' },
        { id: 'E6', type: 'likert', text: 'Pembagian level (A1–B2) sesuai dengan tingkat kesulitan materi.' },
        { id: 'E7', type: 'likert', text: 'Latihan kartu (flashcard) membantu saya mengingat materi.' }
      ]
    },
    {
      id: 'F', title: 'Soal Latihan', short: 'Soal', aspect: 'Soal latihan',
      intro: 'Penilaian terhadap kualitas soal latihan dan umpan baliknya.',
      items: [
        { id: 'F1', type: 'likert', text: 'Soal latihan sesuai dengan materi yang dipelajari.' },
        { id: 'F2', type: 'likert', text: 'Petunjuk dan kalimat soal jelas.' },
        { id: 'F3', type: 'likert', text: 'Pilihan jawaban masuk akal dan tidak membingungkan.' },
        { id: 'F4', type: 'likert', text: 'Pembahasan setelah menjawab membantu saya memahami kesalahan.' },
        { id: 'F5', type: 'likert', text: 'Jenis soal (pilihan ganda dan isian) cukup bervariasi.' }
      ]
    },
    {
      id: 'G', title: 'Tingkat Kesulitan, Jumlah, dan Jenis Soal', short: 'Kesesuaian',
      intro: 'Pilih posisi yang paling menggambarkan pendapat Anda. Nilai tengah (3) berarti sudah sesuai.',
      items: [
        { id: 'G1', type: 'semantic', text: 'Tingkat kesulitan soal secara umum',
          options: ['Terlalu mudah', 'Agak mudah', 'Sesuai', 'Agak sulit', 'Terlalu sulit'] },
        { id: 'G2', type: 'semantic', text: 'Jumlah soal dalam satu latihan (6 soal)',
          options: ['Terlalu sedikit', 'Agak sedikit', 'Pas', 'Agak banyak', 'Terlalu banyak'] },
        { id: 'G3', type: 'semantic', text: 'Tingkat bahasa Inggris dalam materi dan soal dibandingkan kemampuan saya',
          options: ['Terlalu rendah', 'Agak rendah', 'Sesuai', 'Agak tinggi', 'Terlalu tinggi'] },
        { id: 'G4', type: 'semantic', text: 'Jumlah modul yang tersedia (40 modul)',
          options: ['Sangat kurang', 'Kurang', 'Cukup', 'Banyak', 'Sangat banyak'] },
        { id: 'G5', type: 'multi', required: false, max: 7, text: 'Jenis soal yang perlu ditambahkan (boleh lebih dari satu)',
          options: ['Mendengarkan (listening)', 'Menyusun kata menjadi kalimat', 'Mencocokkan (matching)',
            'Melengkapi teks rumpang (cloze)', 'Membaca pemahaman (reading)', 'Menulis kalimat', 'Berbicara/pelafalan (speaking)'] }
      ]
    },
    {
      id: 'H', title: 'Motivasi dan Manfaat', short: 'Manfaat', aspect: 'Motivasi dan manfaat',
      intro: 'Penilaian terhadap dampak DIXIGRAM pada motivasi dan hasil belajar Anda.',
      items: [
        { id: 'H1', type: 'likert', text: 'Fitur XP, level, dan streak membuat saya lebih termotivasi untuk berlatih.' },
        { id: 'H2', type: 'likert', text: 'Pencapaian (lencana) dan papan peringkat mendorong saya belajar lebih giat.' },
        { id: 'H3', type: 'likert', text: 'DIXIGRAM membantu saya memahami grammar bahasa Inggris dengan lebih baik.' },
        { id: 'H4', type: 'likert', text: 'DIXIGRAM membantu saya menambah kosakata bahasa Inggris.' },
        { id: 'H5', type: 'likert', text: 'Belajar dengan DIXIGRAM lebih menyenangkan dibandingkan latihan konvensional (buku atau lembar kerja).' },
        { id: 'H6', type: 'likert', text: 'Saya ingin terus menggunakan DIXIGRAM untuk belajar mandiri.' }
      ]
    },
    {
      id: 'I', title: 'Penilaian Umum dan Testimoni', short: 'Testimoni',
      intro: 'Penilaian akhir, testimoni, dan masukan Anda untuk perbaikan DIXIGRAM.',
      items: [
        { id: 'I1', type: 'rating', scale: 'overall', text: 'Secara keseluruhan, bagaimana penilaian Anda terhadap DIXIGRAM?' },
        { id: 'I2', type: 'nps', scale: 'nps', text: 'Seberapa besar kemungkinan Anda merekomendasikan DIXIGRAM kepada teman? (0 = sangat tidak mungkin, 10 = sangat mungkin)' },
        { id: 'I3', type: 'multi', max: 3, text: 'Fitur yang paling bermanfaat bagi Anda (pilih maksimal 3)',
          options: ['Materi ringkas', 'Latihan kartu', 'Kuis dan pembahasan', 'XP, level, dan streak', 'Pencapaian dan papan peringkat',
            'Word of the day', 'Audio pelafalan', 'Mode tamu (tanpa daftar)', 'Tema gelap dan ukuran teks'] },
        { id: 'I4', type: 'text', min: 20, max: 1500, text: 'Tuliskan kesan dan testimoni Anda tentang DIXIGRAM (minimal satu atau dua kalimat).',
          placeholder: 'Contoh: Materinya ringkas dan mudah dipahami, kuisnya membuat saya ingin terus berlatih karena…' },
        { id: 'I5', type: 'text', required: false, max: 1500, text: 'Kendala atau kesulitan yang Anda alami saat menggunakan DIXIGRAM (opsional).',
          placeholder: 'Misalnya: halaman lambat dimuat, tombol sulit ditemukan, soal kurang jelas…' },
        { id: 'I6', type: 'text', required: false, max: 1500, text: 'Saran perbaikan untuk pengembangan DIXIGRAM (opsional).',
          placeholder: 'Fitur, materi, atau jenis soal yang ingin Anda tambahkan…' },
        { id: 'I7', type: 'choice', text: 'Apakah Anda bersedia testimoni Anda dikutip (tanpa identitas) dalam laporan atau publikasi penelitian?',
          options: ['Ya, bersedia', 'Tidak bersedia'] }
      ]
    }
  ],
  steps: [['A'], ['B'], ['C', 'D'], ['E'], ['F', 'G'], ['H'], ['I']]
});

const SURVEY_DEFAULTS = Object.freeze({
  open: true,
  target: 110,
  title: 'Pengembangan Aplikasi DIXIGRAM sebagai Media Latihan Grammar dan Vocabulary Bahasa Inggris Berbasis Web dengan Model ADDIE',
  researcher: 'Bahruddin',
  institution: '',
  contact: 'bahruddin@privatbee.com'
});

/* =========================================================
   PENGATURAN
   ========================================================= */

function getSurveySettings_() {
  let stored = {};
  try {
    stored = JSON.parse(PropertiesService.getScriptProperties().getProperty(SURVEY_SETTINGS_KEY) || '{}') || {};
  } catch (err) {
    stored = {};
  }
  return sanitizeSurveySettings_(Object.assign({}, SURVEY_DEFAULTS, stored));
}

function sanitizeSurveySettings_(s) {
  const text = function (v, max) { return String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max); };
  const target = Math.round(Number(s.target));
  return {
    open: s.open !== false,
    target: isFinite(target) && target >= 1 && target <= 100000 ? target : SURVEY_DEFAULTS.target,
    title: text(s.title, 300),
    researcher: text(s.researcher, 120),
    institution: text(s.institution, 160),
    contact: text(s.contact, 160)
  };
}

function surveyPublic_() {
  const s = getSurveySettings_();
  return { open: s.open, version: SURVEY_INSTRUMENT.version };
}

/* =========================================================
   TIKET LATIHAN (bukti sudah mengerjakan latihan)
   ========================================================= */

function createSurveyTicket_() {
  const issued = Math.floor(Date.now() / 1000);
  return signToken_({
    role: 'svt', typ: 'svt', jti: randomHex_(8),
    iat: issued, exp: issued + SURVEY_TICKET_DAYS * 86400
  });
}

function verifySurveyTicket_(ticket) {
  const info = inspectToken_(String(ticket || ''));
  if (info.reason !== 'ok' || !info.claims || info.claims.typ !== 'svt' || !info.claims.jti) return null;
  return info.claims;
}

/* =========================================================
   PENYIMPANAN
   ========================================================= */

function surveyItems_() {
  const list = [];
  SURVEY_INSTRUMENT.sections.forEach(function (sec) {
    sec.items.forEach(function (item) { list.push(Object.assign({ section: sec.id }, item)); });
  });
  return list;
}

function surveyHeaders_() {
  return ['ID', 'Kode', 'NIM', 'Waktu', 'Akses', 'DurasiDetik', 'SkorSUS', 'Tiket', 'Versi']
    .concat(surveyItems_().map(function (i) { return i.id; }));
}

function surveyFormats_() {
  const base = ['@', '@', '@', '@', '@', '0', '0.0', '@', '@'];
  return base.concat(surveyItems_().map(function (i) {
    return (i.type === 'likert' || i.type === 'semantic' || i.type === 'rating' || i.type === 'nps') ? '0' : '@';
  }));
}

function getSurveySheet_() {
  const ss = getDatabase_();
  const headers = surveyHeaders_();
  const sheet = ensureSheet_(ss, SURVEY_SHEET, headers, surveyFormats_(), '#003cb4');
  ensureHeaderColumns_(sheet, headers);
  return sheet;
}

function readSurveyRows_() {
  const sheet = getSurveySheet_();
  const headers = surveyHeaders_();
  const last = sheet.getLastRow();
  if (last < 2) return [];
  const values = sheet.getRange(2, 1, last - 1, headers.length).getValues();
  return values.map(function (row, idx) {
    const answers = {};
    surveyItems_().forEach(function (item, i) {
      const v = row[9 + i];
      if (item.type === 'multi') {
        answers[item.id] = String(v || '').split(';').map(function (x) { return x.trim(); }).filter(Boolean);
      } else if (item.type === 'text' || item.type === 'choice') {
        answers[item.id] = cellText_(v);
      } else {
        answers[item.id] = v === '' || v == null ? null : Number(v);
      }
    });
    return {
      row: idx + 2,
      id: cellText_(row[0]),
      code: cellText_(row[1]),
      nim: cellText_(row[2]),
      submittedAt: cellIso_(row[3]),
      access: cellText_(row[4]),
      durationSec: Number(row[5]) || 0,
      sus: row[6] === '' ? null : Number(row[6]),
      ticket: cellText_(row[7]),
      version: cellText_(row[8]),
      answers: answers
    };
  }).filter(function (r) { return r.id; });
}

function normalizeNim_(value) {
  return String(value || '').toUpperCase().replace(/\s+/g, '');
}

function assertNim_(nim) {
  if (!/^[A-Z0-9][A-Z0-9.\-\/]{3,23}$/.test(nim) || !/\d/.test(nim)) {
    throw apiError_('INVALID_NIM', 'NIM tidak valid. Tulis NIM sesuai kartu mahasiswa (5–24 karakter, berisi angka).');
  }
}

function computeSus_(answers) {
  let total = 0;
  for (let i = 1; i <= 10; i++) {
    const v = Number(answers['B' + i]);
    if (!(v >= 1 && v <= 5)) return null;
    total += (i % 2 === 1) ? (v - 1) : (5 - v);
  }
  return Math.round(total * 2.5 * 10) / 10;
}

/** Cegah teks dibaca sebagai rumus oleh Google Sheets. */
function safeCellText_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function cleanSurveyText_(value, max) {
  return String(value == null ? '' : value)
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max || 1500);
}

/** Memeriksa dan merapikan jawaban sesuai instrumen. */
function validateSurveyAnswers_(raw) {
  const input = raw && typeof raw === 'object' ? raw : {};
  const clean = {};
  surveyItems_().forEach(function (item) {
    const required = item.required !== false;
    const v = input[item.id];
    const label = 'Butir ' + item.id;
    if (item.type === 'likert' || item.type === 'semantic' || item.type === 'rating' || item.type === 'nps') {
      const scale = item.type === 'nps' ? SURVEY_SCALES.nps : { min: 1, max: 5 };
      const n = Number(v);
      if (v === null || v === undefined || v === '' || !(n >= scale.min && n <= scale.max) || Math.round(n) !== n) {
        if (required) throw apiError_('SURVEY_INCOMPLETE', label + ' belum dijawab.');
        clean[item.id] = null;
      } else {
        clean[item.id] = n;
      }
    } else if (item.type === 'choice') {
      const text = String(v || '');
      if (item.options.indexOf(text) === -1) {
        if (required) throw apiError_('SURVEY_INCOMPLETE', label + ' belum dijawab.');
        clean[item.id] = '';
      } else {
        clean[item.id] = text;
      }
    } else if (item.type === 'multi') {
      const list = (Array.isArray(v) ? v : []).map(String).filter(function (x, i, arr) {
        return item.options.indexOf(x) !== -1 && arr.indexOf(x) === i;
      });
      if (item.max && list.length > item.max) throw apiError_('SURVEY_INVALID', label + ': pilih maksimal ' + item.max + '.');
      if (required && !list.length) throw apiError_('SURVEY_INCOMPLETE', label + ' belum dijawab.');
      clean[item.id] = list;
    } else if (item.type === 'text') {
      const text = cleanSurveyText_(v, item.max || 1500);
      if (required && text.length < (item.min || 1)) {
        throw apiError_('SURVEY_INCOMPLETE', label + ' minimal ' + (item.min || 1) + ' karakter.');
      }
      clean[item.id] = text;
    }
  });
  return clean;
}

/* =========================================================
   API RESPONDEN
   ========================================================= */

/** Instrumen + info penelitian untuk formulir. Terbuka untuk semua. */
function apiSurveyForm() {
  return api_(function () {
    const s = getSurveySettings_();
    return {
      instrument: SURVEY_INSTRUMENT,
      scales: SURVEY_SCALES,
      settings: { open: s.open, title: s.title, researcher: s.researcher, institution: s.institution, contact: s.contact }
    };
  });
}

/** Pemeriksaan awal: tiket valid dan NIM belum pernah mengisi. */
function apiSurveyCheck(payload) {
  return api_(function () {
    const p = payload || {};
    if (!getSurveySettings_().open) throw apiError_('SURVEY_CLOSED', 'Angket sedang ditutup oleh peneliti.');
    const claims = verifySurveyTicket_(p.ticket);
    if (!claims) throw apiError_('SURVEY_LOCKED', 'Selesaikan minimal satu latihan dulu, lalu buka angket ini lagi.');
    const nim = normalizeNim_(p.nim);
    assertNim_(nim);
    const rows = readSurveyRows_();
    if (rows.some(function (r) { return normalizeNim_(r.nim) === nim; })) {
      throw apiError_('SURVEY_DUPLICATE', 'NIM ' + nim + ' sudah mengisi angket. Terima kasih atas partisipasinya.');
    }
    if (rows.some(function (r) { return r.ticket === claims.jti; })) {
      throw apiError_('SURVEY_TICKET_USED', 'Bukti latihan ini sudah dipakai untuk mengisi angket. Selesaikan satu latihan lagi bila Anda belum pernah mengisi.');
    }
    return { nim: nim };
  });
}

function apiSurveySubmit(payload) {
  return api_(function () {
    const p = payload || {};
    const settings = getSurveySettings_();
    if (!settings.open) throw apiError_('SURVEY_CLOSED', 'Angket sedang ditutup oleh peneliti.');

    const claims = verifySurveyTicket_(p.ticket);
    if (!claims) throw apiError_('SURVEY_LOCKED', 'Selesaikan minimal satu latihan dulu, lalu buka angket ini lagi.');

    const nim = normalizeNim_(p.nim);
    assertNim_(nim);
    if (normalizeNim_(p.nimConfirm) !== nim) throw apiError_('INVALID_NIM', 'Konfirmasi NIM tidak sama. Periksa kembali NIM Anda.');
    if (p.consent !== true) throw apiError_('SURVEY_CONSENT', 'Persetujuan responden diperlukan sebelum mengirim angket.');

    const answers = validateSurveyAnswers_(p.answers);
    const sus = computeSus_(answers);
    const duration = Math.max(0, Math.min(86400, Math.round(Number(p.durationSec) || 0)));

    let access = 'tamu';
    try {
      const session = resolveSession_(p.token, true);
      if (session.user) access = session.user.status === USER_STATUS.ACTIVE ? 'anggota' : 'menunggu validasi';
    } catch (err) {
      access = 'tamu';
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      const rows = readSurveyRows_();
      if (rows.some(function (r) { return normalizeNim_(r.nim) === nim; })) {
        throw apiError_('SURVEY_DUPLICATE', 'NIM ' + nim + ' sudah mengisi angket. Terima kasih atas partisipasinya.');
      }
      if (rows.some(function (r) { return r.ticket === claims.jti; })) {
        throw apiError_('SURVEY_TICKET_USED', 'Bukti latihan ini sudah dipakai untuk mengisi angket.');
      }
      const lastNumber = rows.reduce(function (max, r) {
        const n = Number(String(r.code).replace(/\D/g, '')) || 0;
        return Math.max(max, n);
      }, 0);
      const code = 'R-' + ('000' + (lastNumber + 1)).slice(-3);
      const id = Utilities.getUuid();
      const submittedAt = nowIso_();

      const values = [id, code, safeCellText_(nim), submittedAt, access, duration, sus === null ? '' : sus, claims.jti, SURVEY_INSTRUMENT.version];
      surveyItems_().forEach(function (item) {
        const v = answers[item.id];
        if (item.type === 'multi') values.push(safeCellText_(v.join('; ')));
        else if (item.type === 'text' || item.type === 'choice') values.push(safeCellText_(v));
        else values.push(v === null ? '' : v);
      });

      const sheet = getSurveySheet_();
      const row = sheet.getLastRow() + 1;
      if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 50);
      const range = sheet.getRange(row, 1, 1, values.length);
      range.setNumberFormats([surveyFormats_()]);
      range.setValues([values]);

      return { code: code, nim: nim, submittedAt: submittedAt, sus: sus, access: access };
    } finally {
      lock.releaseLock();
    }
  });
}

/* =========================================================
   API ADMIN
   ========================================================= */

function apiAdminSurvey(token) {
  return api_(function () {
    requireAdmin_(token);
    return {
      instrument: SURVEY_INSTRUMENT,
      scales: SURVEY_SCALES,
      settings: getSurveySettings_(),
      responses: readSurveyRows_().map(function (r) {
        const copy = Object.assign({}, r);
        delete copy.ticket;
        delete copy.row;
        return copy;
      }),
      generatedAt: nowIso_()
    };
  });
}

function apiAdminSurveySettings(token, patch) {
  return api_(function () {
    const session = requireAdmin_(token);
    const before = getSurveySettings_();
    const next = sanitizeSurveySettings_(Object.assign({}, before, patch || {}));
    PropertiesService.getScriptProperties().setProperty(SURVEY_SETTINGS_KEY, JSON.stringify(next));
    appendAudit_(session.user.email, 'survey-settings', '-', JSON.stringify({ open: next.open, target: next.target }));
    return { settings: next };
  });
}

function apiAdminSurveyDelete(token, responseId) {
  return api_(function () {
    const session = requireAdmin_(token);
    const id = String(responseId || '');
    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      const target = readSurveyRows_().filter(function (r) { return r.id === id; })[0];
      if (!target) throw apiError_('NOT_FOUND', 'Jawaban tidak ditemukan atau sudah dihapus.');
      getSurveySheet_().deleteRow(target.row);
      appendAudit_(session.user.email, 'survey-delete', target.code, 'NIM ' + target.nim);
      return { deleted: target.code };
    } finally {
      lock.releaseLock();
    }
  });
}
