# 📌 SEWAKIT — PROJECT STATE & ARCHITECTURE SNAPSHOT (SAVE.MD)
*Status Terakhir: 29 Oktober 2026 (Semua 12 Fitur Frontend Selesai & Ter-merge di Main)*

---

## 🎯 1. Ringkasan Eksekutif & Status Proyek
- **Aplikasi:** **SewaKit** — Platform sewa-menyewa alat praktikum & kuliah antar-mahasiswa berbasis P2P di lingkungan kampus (Telkom University).
- **Metodologi:** *Feature-Driven Development / Vertical Slicing* (6 Pengembang, masing-masing memegang 2 fitur secara menyeluruh).
- **Instruksi Dosen:** **Selesaikan Frontend (UI Mockup, State Interaktif, & Navigasi) terlebih dahulu**.
- **Status Terkini:** 🟢 **100% SELESAI (12 dari 12 Modul Frontend Berhasil Di-merge ke `main` dan Teruji 200 OK di Docker)**.

---

## 🛠️ 2. Arsitektur & Lingkungan Teknologi (Tech Stack)

Proyek ini dibangun menggunakan struktur **Monorepo**:

```text
SewaKit/
├── frontend/                   # Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript
├── backend/                    # Laravel 11 REST API (PHP 8.3 + PostgreSQL Driver)
├── docker-compose.yml          # Orkestrasi Docker lokal
├── Laporan_Rancangan_Aplikasi_SewaKit.pdf
├── README.md
└── SAVE.md                     # File dokumentasi snapshot proyek ini
```

### Konfigurasi Penting Setiap Komponen:
1. **Frontend (Next.js 16.4.3):**
   - **Port:** `http://localhost:3000`
   - **Script Dev:** Wajib menggunakan **`next dev --webpack`** di `package.json` (bukan Turbopack) untuk mencegah *I/O error (os error 5 / Permission Denied)* pada mount partisi drive Windows di Docker.
   - **CSS & Desain:** Tailwind CSS v4 dikompilasi lewat `@tailwindcss/postcss` + `postcss.config.mjs`.
   - **Tema Tampilan:** Mode gelap otomatis (`prefers-color-scheme: dark`) telah dimatikan di `globals.css`; tema dikunci ke **Light Mode** seragam (background terang `#f8fafc`).
2. **Backend (Laravel 11 REST API):**
   - **Port:** `http://localhost:8000`
   - **Routing API:** Aktif di `backend/routes/api.php` (`/api/health`).
   - **Autentikasi:** Direncanakan menggunakan API Bearer Token (Sanctum / JWT).
3. **Database (PostgreSQL 16 Alpine via Docker):**
   - **Port:** `localhost:5432`
   - **Kredensial:** DB: `sewakit` | User: `sewakit_user` | Pass: `sewakit_password`.
4. **Email Tester (Mailpit via Docker):**
   - **Web UI:** `http://localhost:8025` | **SMTP Port:** `1025` (untuk testing email OTP & pengingat jatuh tempo).
5. **Docker Compose:**
   - Menggunakan mekanisme sinkronisasi `develop: watch:` bawaan Docker Compose v5 untuk menyinkronkan file `./frontend/src` ke `/app/src` container secara instan.

---

## 🗺️ 3. Peta Lengkap 12 Modul Fitur & Tampilan Antarmuka

Seluruh 12 fitur sudah berstatus **Merged ke `main`** dan berhasil diverifikasi dengan kode HTTP **200 OK**:

| No | Modul Fitur | URL Rute Halaman | PIC Pengembang | Status di `main` |
| :-: | :--- | :--- | :--- | :---: |
| 1 | **Login & Manajemen Akun** | `/auth/login` | Azriel Raihan Eldova H. | 🟢 Merged |
| 2 | **Kategori & Dashboard Admin** | `/admin/dashboard` | Azriel Raihan Eldova H. | 🟢 Merged |
| 3 | **Kelola Barang & Paket Pemilik** | `/owner/items` | Triansyah Danishwara I. | 🟢 Merged |
| 4 | **Saldo & Penarikan Dana** | `/owner/wallet` | Triansyah Danishwara I. | 🟢 Merged |
| 5 | **Katalog & Pencarian Barang** | `/catalog` | Rayvan Alifarlo M. | 🟢 Merged |
| 6 | **Serah Terima & Pengembalian** | `/handover` | Rayvan Alifarlo M. | 🟢 Merged |
| 7 | **Pengajuan & Persetujuan Sewa** | `/rentals/request` | Muhammad Ariq Azzaki | 🟢 Merged |
| 8 | **Pembatalan & Laporan No-Show** | `/rentals/cancellation` | Muhammad Ariq Azzaki | 🟢 Merged |
| 9 | **Pembayaran (Xendit Sandbox)** | `/payments` | Muhammad Fiqri Habibi | 🟢 Merged |
| 10 | **Deposit, Denda & Sengketa** | `/disputes` | Muhammad Fiqri Habibi | 🟢 Merged |
| 11 | **Rating dan Ulasan Mahasiswa** | `/reviews` | Muhamad Alwan Suryadi | 🟢 Merged |
| 12 | **Notifikasi dan Pengingat** | `/notifications` | Muhamad Alwan Suryadi | 🟢 Merged |

---

### Rincian Tampilan dan Logika Setiap Halaman:

#### A. Halaman Beranda / Portal Pengujian (`/`)
- **File:** `frontend/src/app/page.tsx`
- **Fungsi:** Dashboard Developer & Pengujian Internal. Berisi Navbar SewaKit, Hero Banner kampus, dan 12 kartu modul fitur interaktif yang masing-masing langsung mengarah ke rute halaman bersangkutan.

#### B. Fitur #1: Login, Register, Profil & Admin OTP (`/auth/login`, `/register`, `/profile`)
- **File:** `src/app/auth/login/page.tsx`, `src/app/register/page.tsx`, `src/app/profile/page.tsx`
- **Fungsi:** 
  - Login Mahasiswa via email kampus `@student.telkomuniversity.ac.id` / NIM.
  - Tab terpisah untuk **Login Admin** dengan verifikasi **Kode OTP 6 Digit** dan batas percobaan login (*rate limiter*).
  - Pendaftaran akun mahasiswa baru (`/register`).
  - Halaman edit profil mahasiswa dan ubah password (`/profile`).

#### C. Fitur #2: Dashboard Admin & Kategori (`/admin/dashboard`, `/admin/categories`)
- **File:** `src/app/admin/dashboard/page.tsx`, `src/app/admin/categories/page.tsx`
- **Fungsi:** 
  - Statistik platform (Total Pengguna, Barang Disewakan, Transaksi Aktif, Total Pendapatan).
  - Tabel aktivitas transaksi sewa terbaru.
  - CRUD Kategori Barang Praktikum (tambah kategori baru, slug otomatis, hapus kategori).

#### D. Fitur #3: Kelola Barang dan Paket Pemilik (`/owner/items`)
- **File:** `src/app/owner/items/page.tsx`
- **Fungsi:** 
  - Panel inventaris pemilik barang (status: Tersedia, Disewa, Maintenance).
  - Formulir penambahan alat baru: foto, spesifikasi, tarif harian, deposit jaminan, dan checklist kelengkapan komponen fisik.
  - Pembuatan paket bundling alat praktikum per mata kuliah.

#### E. Fitur #4: Saldo dan Penarikan Dana Pemilik (`/owner/wallet`)
- **File:** `src/app/owner/wallet/page.tsx`
- **Fungsi:** 
  - Ringkasan saldo aktif pemilik yang siap dicairkan pasca-transaksi selesai.
  - Formulir simulasi penarikan dana (Payout) ke rekening bank / e-wallet.
  - Riwayat mutasi saldo masuk dan riwayat pencairan dana.

#### F. Fitur #5: Katalog dan Detail Barang (`/catalog`, `/catalog/[id]`)
- **File:** `src/app/catalog/page.tsx`, `src/app/catalog/[id]/page.tsx`
- **Fungsi:** 
  - Filter kategori alat (IoT, Elektronika, Komputer, Multimedia, Lab).
  - Kolom pencarian teks dan filter rentang harga.
  - Halaman detail unit barang lengkap dengan galeri foto, spesifikasi teknis, dan kalender ketersediaan alat.

#### G. Fitur #6: Serah Terima & Pengembalian Fisik (`/handover`)
- **File:** `src/app/handover/page.tsx`
- **Fungsi:** 
  - Alur serah terima COD dua arah (*two-way handshake*).
  - Kode verifikasi penyerahan barang saat COD di kampus.
  - Formulir checklist kondisi fisik dan upload foto komparasi (kondisi awal serah terima vs kondisi akhir pengembalian).

#### H. Fitur #7: Pengajuan & Persetujuan Sewa (`/rentals/request`)
- **File:** `src/app/rentals/request/page.tsx`
- **Fungsi:** 
  - Formulir pengajuan sewa dengan **Proteksi Anti-Bentrok Real-time** (tanggal yang bentrok otomatis terblokir dan tombol terkunci).
  - Penahanan jadwal (**Hold 24 Jam**) otomatis setelah pengajuan dibuat.
  - Panel pemilik barang untuk menerima atau menolak pengajuan sewa.
  - Pembukaan nomor WhatsApp kedua pihak untuk janjian COD setelah status pembayaran lunas.

#### I. Fitur #8: Pembatalan dan Laporan No-Show (`/rentals/cancellation`)
- **File:** `src/app/rentals/cancellation/page.tsx`
- **Fungsi:** 
  - Kalkulator refund pembatalan otomatis (Batal > 24 jam refund 100%, batal < 12 jam sewa dipotong 50% untuk kompensasi pemilik).
  - Simulasi *Auto-Cancel Scheduler* saat batas bayar 2 jam atau batas hold 24 jam terlewat.
  - Formulir laporan *No-Show* jika salah satu pihak tidak datang setelah ditunggu $\ge 30$ menit di titik COD kampus.

#### J. Fitur #9: Pembayaran Xendit Sandbox (`/payments`)
- **File:** `src/app/payments/page.tsx`
- **Fungsi:** 
  - Rincian tagihan transparan (Biaya Sewa + Deposit Escrow + Admin).
  - Countdown timer batas waktu pembayaran **2 jam**.
  - Pilihan metode bayar Xendit: QRIS, BCA Virtual Account, Mandiri Virtual Account.
  - Modal simulator invoice Xendit Sandbox dengan simulasi pembayaran sukses via webhook.

#### K. Fitur #10: Deposit, Denda, dan Sengketa (`/disputes`)
- **File:** `src/app/disputes/page.tsx`
- **Fungsi:** 
  - Panel monitoring status penahanan deposit jaminan (Escrow).
  - Perhitungan denda keterlambatan dan kerusakan fisik (maksimal sebesar nominal deposit).
  - Formulir pengajuan klaim/sengketa keberatan yang ditujukan ke Admin.

#### L. Fitur #11: Rating dan Ulasan Mahasiswa (`/reviews`)
- **File:** `src/app/reviews/page.tsx`
- **Fungsi:** 
  - Penilaian bintang 1–5 dan ulasan dua arah antara Pemilik dan Penyewa setelah transaksi selesai.

#### M. Fitur #12: Notifikasi dan Pengingat (`/notifications`)
- **File:** `src/app/notifications/page.tsx`
- **Fungsi:** 
  - Pusat notifikasi status pesanan, pengingat batas waktu bayar 2 jam, dan notifikasi email H-1 pengembalian alat.

---

## 🚀 4. Cara Menjalankan & Menguji Seluruh Proyek

### Menggunakan Docker (Rekomendasi Utama)
```bash
# 1. Jalankan container frontend:
docker compose up -d frontend

# 2. Sinkronkan folder src ke dalam container:
docker cp frontend/src sewakit-frontend:/app/
```
Akses di browser: 👉 **`http://localhost:3000`**

### Menjalankan Tanpa Docker (Node.js Lokal)
```bash
cd frontend
npm install
npm run dev
```
Akses di browser: 👉 **`http://localhost:3000`**

---

## 🤖 5. PANDUAN KONTINUITAS UNTUK AI AGENT / SESI BERIKUTNYA

Jika kamu adalah AI Coding Assistant yang membaca file ini untuk melanjutkan proyek:
1. **JANGAN MENGUBAH SCRIPT DEV DI PACKAGE.JSON MENJADI TURBOPACK.** Biarkan tetap `"dev": "next dev --webpack"` karena Turbopack memiliki bug `I/O os error 5` pada volume mount partisi Windows di WSL2 Docker.
2. **JANGAN MENGAKTIFKAN KEMBALI MEDIA QUERY DARK MODE** di `globals.css` agar tema tetap seragam terang (*Light Mode*) di seluruh device tim.
3. **FASE SELANJUTNYA (FASE BACKEND & DATABASE):**
   - Seluruh Frontend UI (12 modul) sudah lengkap 100%.
   - Fase berikutnya adalah mengaktifkan container PostgreSQL (`db`) dan Mailpit (`mailpit`), menjalankan migrasi database tabel (`users`, `items`, `rentals`, `payments`, `disputes`, `reviews`), serta menghubungkan REST API di `backend/routes/api.php` untuk menggantikan data dummy di Frontend.
