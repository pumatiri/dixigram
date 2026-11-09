# DIXIGRAM v1.2 — Panduan Update

## Cara memasang (dari v1.1)

1. Buka proyek di editor Apps Script.
2. **Tambah file baru:** `+` → Script, beri nama `Content2`, lalu tempel isi `Content2.gs` (berisi 12 modul baru).
3. **Ganti isi** file berikut dengan versi baru:
   `Code.gs`, `Auth.gs`, `Database.gs`, `Admin.gs`, `Content.gs`,
   `Index.html`, `App.html`, `Views.html`, `QuizUI.html`, `AdminUI.html`, `Styles.html`, `Icons.html`.
   File `Progress.gs`, `Quiz.gs`, dan `appsscript.json` tidak berubah.
4. Salin lagi email admin Anda ke `ADMIN_EMAILS` di `Code.gs` (file baru masih berisi daftar kosong/contoh).
5. Jalankan `setupDixigram` sekali dari editor. Kolom sesi baru (`SessionID`, `SessionDevice`, `SessionSeen`) ditambahkan otomatis ke sheet Users, dan data lama tetap aman.
6. **Deploy → Kelola deployment → ✏️ → Versi: Versi baru → Deploy.** URL `/exec` tetap sama.
7. (Opsional) Setelah situs GitHub Pages aktif, isi `PUBLIC_URL` di `Code.gs` dengan alamatnya (diakhiri `/`), lalu deploy versi baru lagi. Ini dipakai untuk favicon logo dan tautan di email notifikasi.

## Yang berubah

| No | Permintaan | Hasil |
|---|---|---|
| 1 | Tombol notifikasi pendaftar baru tidak memunculkan apa pun | Penyebabnya, data panel admin disimpan selamanya dan tidak pernah dimuat ulang. Sekarang tombol 🔔 di topbar membuka daftar pendaftar yang diambil langsung dari server, dengan tombol **Setujui/Tolak** di tempat. Badge diperbarui otomatis tiap ±2 menit, dan muncul notifikasi "Pendaftar baru" dengan tombol **Tinjau**. |
| 2 | Single login | Akun non-admin hanya bisa aktif di satu perangkat/browser. Login kedua ditolak dengan pesan yang jelas selama sesi lama masih aktif. Admin dikecualikan. |
| 3 | Menu masuk/daftar kadang tidak bereaksi | Login dan daftar kini cukup 1 panggilan ke server (sebelumnya 2). Tombol dikunci selama proses agar tidak terkirim ganda. Keyboard ponsel tidak lagi muncul otomatis, dan efek blur berat di halaman depan dihapus. |
| 4 | Bank soal | 24 modul: 12 grammar dan 12 vocabulary, masing-masing 3 modul per level A1, A2, B1, B2. Totalnya 192 soal dan 96 kata. |
| 5 | Materi grammar | 6 modul grammar baru lengkap dengan materi (rumus, tabel, contoh, tips). Semua modul grammar kini punya **Latihan kartu** (rumus, terjemahan, ubah kalimat). |
| 6 | Deploy di GitHub | Lihat paket `dixigram-github` dan README di dalamnya. |
| 7 | Kurangi animasi | Mode ringan: animasi dekoratif, efek blur, dan hitungan angka dimatikan. Confetti dibuat lebih ringan. Yang tersisa hanya spinner pemuatan. |
| 8 | Logo | Dipasang di layar pemuatan, topbar, halaman depan, layar kuis, favicon, ikon "Tambahkan ke Layar Utama", dan pratinjau tautan. |

## Cara kerja single login

- Sesi dianggap **aktif** selama aplikasi terbuka. Aplikasi mengirim sinyal ke server tiap ±2 menit.
- Bila pengguna **Keluar**, sesi langsung dilepas dan perangkat lain bisa masuk.
- Bila browser ditutup tanpa keluar, perangkat lain baru bisa masuk setelah **10 menit** tanpa aktivitas (`SESSION_IDLE_MINUTES` di `Code.gs`).
- Masuk ulang dari browser yang sama selalu diizinkan.
- Admin bisa melepas sesi yang "nyangkut": **Admin → Pengguna → Kelola → Keluarkan dari perangkat**. Pengguna yang sedang online ditandai titik hijau.
- Bila akun dibuka di perangkat lain, perangkat lama otomatis keluar dengan pesan "Sesi diakhiri".

---

# Catatan v1.1

## Cara memasang

1. Buka proyek di editor Apps Script.
2. **Ganti isi** file lama dengan versi baru: `Code.gs`, `Auth.gs`, `Database.gs`, `Quiz.gs`, `Progress.gs`, `Content.gs`, `Index.html`, `App.html`, `Views.html`, `QuizUI.html`, `Styles.html`.
3. **Tambah file baru**:
   - Skrip (`+` → Script) bernama `Admin` → tempel isi `Admin.gs`
   - HTML (`+` → HTML) bernama `AdminUI` → tempel isi `AdminUI.html`
4. `Icons.html` dan `appsscript.json` tidak berubah.
5. Tentukan admin (lihat bawah), lalu jalankan `setupDixigram` sekali dari editor dan setujui izin baru (Gmail diperlukan untuk notifikasi email opsional).
6. **Deploy → Kelola deployment → edit → Versi baru → Deploy.** Tanpa versi baru, URL `/exec` masih menjalankan kode lama.

## Menentukan admin

Pilih salah satu:

- **Disarankan:** di `Code.gs`, isi `ADMIN_EMAILS: Object.freeze(['emailkamu@gmail.com'])`. Saat email itu mendaftar atau masuk, akunnya otomatis menjadi admin aktif. Kalau akunnya sudah terdaftar, jalankan `promoteConfiguredAdmins` dari editor.
- Tanpa mengubah kode: Project Settings → Script Properties → tambah `DIXI_ADMIN_EMAILS` berisi email (pisahkan dengan koma).
- Database **masih kosong**: pendaftar pertama otomatis menjadi admin (`FIRST_USER_IS_ADMIN`).

Akun lama yang sudah ada tetap **aktif** (tidak perlu divalidasi ulang). Hanya pendaftar baru yang berstatus "menunggu".

## Alur validasi

| Status | Bisa masuk | Akses |
|---|---|---|
| Menunggu | Ya | 4 modul gratis, kuota harian, progress tersimpan, belum tampil di peringkat |
| Aktif | Ya | Semua modul, latihan tanpa batas |
| Nonaktif | Tidak | — (langsung dikeluarkan dari semua perangkat) |
| Ditolak | Tidak | — |

Panel admin: menu **Panel admin** di sidebar/menu profil, atau tab **Admin** di navigasi bawah ponsel.

## Bug yang diperbaiki

1. **Streak selalu kembali ke 1, misi harian & grafik mingguan selalu kosong, XP latihan ulang tidak pernah dibatasi.** Penyebab: Google Sheets mengubah teks `2026-11-09` menjadi tanggal, sehingga perbandingan tanggal selalu gagal. Kolom kini berformat teks, dan data lama tetap terbaca benar.
2. **Tampilan ponsel mengecil seperti versi desktop.** Web App berjalan di dalam iframe; meta viewport kini dipasang lewat `addMetaTag` di `doGet`.
3. **Salt password bisa diawali tanda "-"** (≈1 dari 64 akun) yang dibaca Sheets sebagai formula → akun tidak bisa login. Salt kini heksadesimal.
4. **Gangguan sesaat saat membuka spreadsheet bisa membuat database baru yang kosong** (seolah semua akun hilang). Sekarang menampilkan error, bukan membuat database baru.
5. **XP bisa tercatat dua kali** bila tombol "Lihat hasil" terkirim ganda.
6. **Sesi login yang berakhir diam-diam berubah menjadi sesi tamu** saat memulai kuis, sehingga hasil tersimpan ke tempat yang salah.
7. Token tamu yang kedaluwarsa memunculkan pesan "sesi login berakhir" yang keliru.
8. Email berawalan `=`/`+` bisa disimpan sebagai formula.
9. Logout selalu mengeluarkan semua perangkat — kini opsional.
10. Performa: spreadsheet dibuka dan tiap sheet dibaca sekali per permintaan (sebelumnya berulang kali).
11. Soal ambigu diperbaiki: "goes to ___" (sleep juga benar), "Solar and wind are ___" (sustainable juga benar), "You ___ take a break" (must juga benar), serta isian yang kini menerima jawaban alternatif (get up, roasted, reserve).
12. Selector CSS rusak `.mini-feedback is .icon`, kontras label level A1/A2 di mode gelap, tombol Esc menutup dialog yang tidak boleh ditutup.

## Fitur baru

- Validasi pendaftar oleh admin + panel admin (ringkasan, daftar pengguna, pengaturan, log audit).
- Aksi admin: setujui/tolak, setujui semua, nonaktifkan/aktifkan, jadikan/cabut admin, reset password (password sementara), keluarkan dari semua perangkat, reset progress, hapus akun.
- Pengaturan aplikasi: wajib validasi, buka/tutup pendaftaran, kuota harian tamu, pengumuman banner, notifikasi email ke admin & pengguna.
- Ubah password dari Pengaturan.
- **Ukuran teks** Normal / Besar / Ekstra.
- **Mode kartu (flashcard)** untuk kosakata di setiap modul vocabulary.
- Cek status validasi otomatis saat pengguna kembali ke tab.

## Tampilan ponsel

- Semua huruf yang sebelumnya 7–10 px dinaikkan menjadi minimal ±10,5–12,5 px; teks materi dan soal di ponsel ±14–15 px.
- Kolom input minimal 16 px (iOS tidak lagi memperbesar halaman saat mengetik).
- Dialog tampil sebagai *bottom sheet*, target sentuh minimal 44 px, toast tidak menutupi navigasi atas.
- Tabel materi bisa digeser horizontal di layar sempit.
