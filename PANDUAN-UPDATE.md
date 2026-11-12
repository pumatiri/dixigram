# DIXIGRAM v1.4.0 — Panduan Update

Paket ini sudah mencakup semua revisi sebelumnya (v1.2 sampai v1.3), jadi cukup pasang paket ini saja.

## Cara memasang

1. Buka proyek di editor Apps Script.
2. **Tambah file baru** (bila belum ada). Pilih `+` → Script untuk file `.gs`, atau `+` → HTML untuk file `.html`, lalu tempel isinya:
   - `Content2` ← `Content2.gs`
   - `Donation` ← `Donation.gs`
   - `Survey` (Script) ← `Survey.gs` **(baru)**
   - `Pdf` (HTML) ← `Pdf.html` **(baru)**
   - `SurveyUI` (HTML) ← `SurveyUI.html` **(baru)**
   - `SurveyAdmin` (HTML) ← `SurveyAdmin.html` **(baru)**
3. **Ganti isi semua file lain** dengan versi di paket ini:
   `Code.gs`, `Auth.gs`, `Database.gs`, `Admin.gs`, `Progress.gs`, `Quiz.gs`, `Content.gs`,
   `Index.html`, `App.html`, `Views.html`, `QuizUI.html`, `AdminUI.html`, `Styles.html`, `Icons.html`, `appsscript.json`.
4. Isi lagi email admin Anda di `ADMIN_EMAILS` (`Code.gs`).
5. Jalankan `setupDixigram` sekali dari editor.
6. **Deploy → Kelola deployment → ✏️ → Versi: Versi baru → Deploy.** URL `/exec` tetap sama.
7. Di repositori GitHub, unggah isi paket `DIXIGRAM-v1.4.0-github.zip`.
8. Buka **Admin → Angket → Pengaturan angket**, lalu isi **Institusi / program studi** dan periksa judul penelitian. Nilai ini tampil di halaman pengantar angket dan sampul laporan.

## Baru di v1.4.0 — Angket penelitian (R&D model ADDIE)

### Untuk responden (mahasiswa)
- **Tempat angket:** bagian **Angket penelitian** muncul di bagian bawah halaman depan dan di bawah setiap halaman aplikasi. Bagian ini juga ada di menu samping dan sebagai ajakan di halaman hasil latihan.
- **Syarat membuka angket:** tombol angket **terkunci sampai responden menyelesaikan minimal satu latihan**, termasuk sebagai tamu tanpa mendaftar. Server memberi "tiket" bertanda tangan saat latihan selesai, dan tiket ini diperiksa lagi ketika angket dikirim, jadi syarat ini tidak bisa dilewati.
- **Halaman pengantar:** menjelaskan maksud angket (tahap Implementation & Evaluation ADDIE), petunjuk pengisian, skala jawaban, dan jaminan kerahasiaan.
- **Identitas:** responden **hanya mengisi NIM** dan mengetik ulang NIM, tanpa nama. Satu NIM hanya bisa mengisi satu kali, dan NIM yang sudah mengisi langsung ditolak sejak halaman pengantar.
- **Pengisian:** formulir dibagi 7 bagian dengan indikator kemajuan. Butir yang belum dijawab ditandai, dan draf tersimpan otomatis di perangkat.
- **Bukti pengisian:** setelah mengirim, responden mendapat kode (mis. R-012) dan bisa mengunduh **bukti pengisian (PDF)**.

### Isi angket (56 butir)

| Bagian | Aspek | Butir |
|---|---|---|
| A | Profil penggunaan (perangkat, cara akses, durasi, jumlah latihan, jalur, kemampuan awal) | 6 |
| B | Kegunaan sistem: System Usability Scale baku (Brooke, 1996) | 10 |
| C | Tampilan antarmuka (layout, keterbacaan, ikon, tampilan di ponsel) | 5 |
| D | Navigasi dan kinerja (kemudahan, kecepatan, kestabilan) | 5 |
| E | Materi dan bahasa (kejelasan, contoh, kosakata, keruntutan, kesesuaian level) | 7 |
| F | Soal latihan (kesesuaian, kejelasan, pilihan jawaban, pembahasan, variasi) | 5 |
| G | Tingkat kesulitan, jumlah soal, level bahasa, jumlah modul, jenis soal yang diinginkan | 5 |
| H | Motivasi dan manfaat (gamifikasi, pemahaman grammar, kosakata, minat) | 6 |
| I | Penilaian umum, NPS, fitur favorit, testimoni, kendala, saran, izin kutipan | 7 |

Butir C–F dan H memakai skala Likert 1–5 (STS–SS). Bagian G memakai skala 1–5 dengan nilai tengah = "sesuai".

### Untuk peneliti (admin)
Menu **Admin → Angket** berisi:
- **Ringkasan hasil:** jumlah responden dibanding target 110, skor SUS (grade), persentase respon pengguna (kategori), penilaian umum, dan NPS.
- **Analisis rinci:** tabel per aspek, sebaran tingkat kesulitan/jumlah soal/level, dan butir dengan skor terendah sebagai prioritas revisi.
- **Daftar responden:** dengan tanda kualitas data (*cepat* = diisi < 3 menit, *seragam* = semua jawaban sama) dan tombol hapus.
- **Unduh laporan PDF:** laporan resmi ±18 halaman berisi sampul, daftar isi, pendahuluan dan kisi-kisi, metode analisis, profil responden, SUS, hasil per aspek (rerata, SD, %, kategori, sebaran), kesulitan dan level, NPS, reliabilitas Cronbach's alpha, kualitas data, testimoni dan masukan, kesimpulan dan rekomendasi revisi, serta lampiran instrumen. Lampiran daftar NIM bersifat opsional (kotak centang).
- **Unduh data CSV** dan tautan ke Google Sheets. Data mentah ada di sheet **DIXI_Survey**, satu kolom per butir, siap diolah di Excel/SPSS. Sheet ini dibuat otomatis saat angket pertama kali dibuka.
- **Pengaturan angket:** buka/tutup angket, target responden, judul penelitian, nama peneliti, institusi, dan kontak.

Dokumen **Instrumen-Angket-DIXIGRAM.docx/.pdf** (terpisah dari paket ini) memuat instrumen yang sama dalam bentuk cetak. Dokumen ini bisa dipakai untuk lampiran proposal/laporan atau untuk validasi ahli.

## Riwayat v1.3.0


| No | Permintaan | Hasil |
|---|---|---|
| 1 | Istilah V1, V2, V3 | Diganti menjadi **V‑base**, **V‑past**, dan **V‑past participle** di semua materi, rumus, tabel, dan pembahasan soal. Modul Past Simple dan Present Perfect mendapat tips singkat yang menjelaskan ketiga istilah (go → went → gone). |
| 2 | Tombol refresh manual | Ikon ⟳ di topbar, plus menu **Muat ulang data** di sidebar dan menu profil. Mengambil ulang data akun, progres, peringkat, status validasi, dan panel admin tanpa memuat ulang halaman. |
| 3 | Donasi QRIS | Tombol **Donasi** (ikon hati) membuka jendela berisi kode QRIS **BeeCOMP Servis**, langkah membayar, tombol **Simpan gambar QRIS**, dan **Buka di tab baru**. |

### Penyesuaian untuk donasi

- **Tempat tombol:** halaman depan (navigasi, menu ponsel, bagian Akses, FAQ, footer), topbar (desktop), sidebar, menu profil, dan kartu kecil di dashboard. Tidak ada pop-up yang muncul sendiri.
- **Akses tetap sama:** semua fitur sama bagi yang berdonasi maupun tidak, dan hal ini disebutkan di jendela donasi dan FAQ.
- **Ringan:** gambar QRIS (±30 KB) baru diambil saat jendela donasi dibuka, jadi pemuatan awal tidak bertambah berat.
- **Pengaturan admin:** **Admin → Pengaturan → Donasi** untuk menyalakan/mematikan tombol dan mengubah pesan. Admin tetap bisa melihat pratinjau walau tombol dimatikan.
- **Pengecekan QRIS:** kodenya sudah dibaca ulang dan valid: QRIS statis atas nama BeeCOMP Servis, Kediri. Nominal diisi sendiri oleh donatur.
- **Ganti QRIS:** ubah `IMAGE_BASE64` di `Donation.gs` dan `docs/assets/qris.png` di GitHub.

## Riwayat v1.2.1 — tautan email ke GitHub

- `PUBLIC_URL` di `Code.gs` berisi `https://pumatiri.github.io/dixigram/`, sehingga semua tautan di email notifikasi mengarah ke GitHub Pages.
- Tautan `#/admin` di email benar-benar membuka panel admin.
- **Admin → Pengaturan → Alamat aplikasi** menampilkan alamat yang dipakai.

## Riwayat v1.2


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
