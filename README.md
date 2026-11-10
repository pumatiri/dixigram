<p align="center"><img src="docs/assets/logo-192.png" width="96" alt="DIXIGRAM"></p>

<h1 align="center">DIXIGRAM</h1>
<p align="center">Game belajar grammar &amp; vocabulary bahasa Inggris — 24 modul level A1–B2, XP, streak, peringkat, dan panel admin.<br>
Backend: Google Apps Script + Google Sheets · Frontend: HtmlService</p>

---

## Struktur repositori

```
src/                     Kode Apps Script (yang di-push ke script.google.com)
  appsscript.json
  Code.gs  Auth.gs  Database.gs  Admin.gs  Progress.gs  Quiz.gs
  Content.gs  Content2.gs  Donation.gs
  Index.html  App.html  Views.html  QuizUI.html  AdminUI.html  Styles.html  Icons.html
docs/                    Situs GitHub Pages (pembungkus Web App + ikon)
  index.html  manifest.webmanifest  assets/
.github/workflows/       Deploy otomatis ke Apps Script (opsional)
```

## 1. Publikasikan di GitHub Pages

Halaman di `docs/` menampilkan Web App Apps Script secara penuh layar di alamat yang lebih rapi
(`https://pumatiri.github.io/dixigram/`), lengkap dengan logo, favicon, dan pratinjau tautan.

1. Buat repositori baru di GitHub, lalu unggah seluruh isi folder ini (atau `git push`).
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, branch **main**, folder **/docs**, lalu **Save**.
4. Tunggu ±1 menit. Alamatnya muncul di halaman yang sama.

URL Web App sudah terpasang di `docs/index.html`:

```
https://script.google.com/macros/s/AKfycbziyKkuiVjUwUN0dMuUeSbLMtxTsNA4YyiCgajUzBe3WIyQjehz7l3_Ha9wRehdalkjAg/exec
```

Bila URL deployment berubah, ganti nilai `APP_URL` di `docs/index.html`.

`PUBLIC_URL` di `src/Code.gs` sudah diisi `https://pumatiri.github.io/dixigram/`, jadi tautan di email
notifikasi (pendaftar baru dan akun disetujui) mengarah ke GitHub Pages, bukan ke URL Apps Script.
Tautan langsung seperti `https://pumatiri.github.io/dixigram/#/admin` diteruskan ke halaman yang sesuai.
Bila nama repositori/akun berubah, ganti nilai itu (atau kosongkan dan isi lewat **Admin → Pengaturan → Alamat aplikasi**).

> **Catatan:** Google selalu menampilkan banner kecil "This application was created by a Google Apps Script user"
> di Web App akun Gmail biasa; ini tidak bisa dihilangkan. Bila suatu browser memblokir aplikasi di dalam iframe,
> halaman otomatis menampilkan tombol **Buka langsung**.

## 2. Pasang kode di Apps Script (manual)

1. Buka proyek di [script.google.com](https://script.google.com).
2. Salin setiap file dari `src/` ke file dengan nama yang sama (file `.gs` = Script, `.html` = HTML).
3. Isi email admin di `DIXI.ADMIN_EMAILS` (`src/Code.gs`), lalu jalankan `setupDixigram` sekali.
4. **Deploy → Manage deployments → ✏️ → Version: New version → Deploy.**
   Dengan cara ini URL `/exec` tidak berubah.

## 3. Deploy otomatis dari GitHub (opsional)

Workflow `.github/workflows/deploy-apps-script.yml` mengirim isi `src/` ke Apps Script dan
memperbarui deployment yang sama setiap kali ada perubahan di `src/` pada branch `main`.

Persiapan sekali saja:

1. Aktifkan **Google Apps Script API** di <https://script.google.com/home/usersettings>.
2. Di komputer: `npm install -g @google/clasp@2.4.2`, lalu `clasp login`.
   Setelah berhasil, salin seluruh isi file `~/.clasprc.json`.
3. Ambil **Script ID** di Apps Script: **Project Settings → IDs → Script ID**.
4. Di GitHub: **Settings → Secrets and variables → Actions → New repository secret**
   - `CLASPRC_JSON` → isi file `.clasprc.json`
   - `GAS_SCRIPT_ID` → Script ID
5. (Opsional) Tab **Variables**: `GAS_DEPLOYMENT_ID` bila memakai deployment lain.
   Bawaannya ID dari URL di atas.
6. Jalankan sekali lewat **Actions → Deploy ke Google Apps Script → Run workflow**.

> Jangan pernah meng-commit `.clasprc.json` atau `.clasp.json` (sudah ada di `.gitignore`).
> Bila workflow gagal dengan pesan login/izin, ulangi `clasp login` dan perbarui secret `CLASPRC_JSON`.

## Fitur utama (v1.3)

- 24 modul: 12 grammar + 12 vocabulary, 3 modul di setiap level A1, A2, B1, B2 · 192 soal · 96 kata
- Mode kartu: kosakata (kata → arti) dan grammar (rumus, terjemahan, ubah kalimat)
- Validasi pendaftar oleh admin + lonceng notifikasi pendaftar baru
- **Single login**: akun non-admin hanya aktif di satu perangkat/browser; login kedua ditolak selama sesi lama aktif
  (aktif = ada aktivitas dalam 10 menit terakhir). Admin bisa mengeluarkan sesi yang "nyangkut".
- Mode ringan: animasi dekoratif dan efek blur dimatikan agar cepat di ponsel
- Istilah kata kerja: V‑base, V‑past, V‑past participle
- Tombol muat ulang data (⟳) tanpa memuat ulang halaman
- Gratis, dengan **donasi sukarela via QRIS** (bisa dimatikan di Admin → Pengaturan → Donasi).
  Gambar QRIS ada di `src/Donation.gs` dan `docs/assets/qris.png`.
- Ukuran teks Normal/Besar/Ekstra, tema terang/gelap
