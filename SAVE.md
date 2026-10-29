# 📌 SEWAKIT — PROJECT STATE & ARCHITECTURE SNAPSHOT (SAVE.MD)
*Status Terakhir: 29 Oktober 2026 — Seluruh 12 Fitur Frontend Selesai, Terintegrasi Layout Terpadu, Menggunakan Editorial Warm-Stone Palette & Watermelon Card Split Accordion, Serta Ter-merge di Main.*

---

## 🎯 1. Ringkasan Eksekutif & Status Proyek

- **Nama Aplikasi:** **SewaKit** — Platform *Peer-to-Peer (P2P) Campus Equipment Rental & Exchange* khusus mahasiswa Telkom University.
- **Tujuan Sistem:** Memfasilitasi sewa-menyewa alat praktikum (IoT, mikrokontroler, instrumen laboratorium), perangkat multimedia (kamera, proyektor, audio), perlengkapan akademik, serta logistik acara kampus dengan mekanisme rekening bersama (*escrow*), penahanan jadwal anti-bentrok, dan verifikasi fisik serah terima COD di titik kampus.
- **Metodologi Pengembangan:** *Feature-Driven Development / Vertical Slicing* (6 Mahasiswa / Pengembang, masing-masing bertanggung jawab penuh atas 2 modul fitur).
- **Status Terkini:** 🟢 **100% FRONTEND SELESAI & TERVERIFIKASI**
  - Seluruh 12 modul fitur utama beserta 5 sub-halaman pendukung (**total 17 rute URL**) telah terimplementasi, terhubung navigasi global, diuji dalam container Docker `sewakit-frontend`, dan menghasilkan kode respons HTTP **200 OK**.
  - Telah di-merge ke branch utama (**`main`**) di repositori GitHub `https://github.com/arazzki/SewaKit.git`.

---

## 🛠️ 2. Arsitektur & Lingkungan Teknologi (Tech Stack)

Proyek ini dibangun menggunakan struktur **Monorepo**:

```text
SewaKit/
├── frontend/                   # Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript 5
│   ├── public/                 # Aset statis & favicon
│   ├── src/
│   │   ├── app/                # 17 Rute Halaman App Router Next.js
│   │   ├── components/         # Komponen global (Navbar, Footer, PageHeader, Watermelon UI)
│   │   ├── data/               # Dummy database & mock contracts (dummyItems, dummyHandovers)
│   │   ├── lib/                # Utility formatting (rupiah, date)
│   │   └── utils/              # Class helper (cx.ts)
│   ├── package.json            # Scripts & dependencies
│   ├── postcss.config.mjs      # Tailwind CSS v4 PostCSS runner
│   └── tsconfig.json           # Konfigurasi TypeScript & path alias (@/*)
├── backend/                    # Laravel 11 REST API (PHP 8.3 + PostgreSQL Driver)
│   ├── app/                    # Models, Controllers, Middleware
│   ├── routes/                 # Endpoint REST API (api.php, health)
│   └── composer.json           # Dependensi PHP & Laravel
├── docker-compose.yml          # Orkestrasi 4 Service: frontend, backend, db, mailpit
├── Laporan_Rancangan_Aplikasi_SewaKit.pdf # Dokumen spesifikasi teknis resmi Telkom University
├── README.md                   # Panduan instalasi singkat
└── SAVE.md                     # File blueprint status & arsitektur proyek ini
```

### Konfigurasi Penting Setiap Layanan:

1. **Frontend (Next.js 16.4.3 & React 19.3.0):**
   - **Port:** `http://localhost:3000`
   - **Script Dev Wajib:** `"dev": "next dev --webpack"` di `frontend/package.json`.
     > [!IMPORTANT]
     > Jangan pernah mengganti dev script ke Turbopack default (`next dev`). Next.js 16 Turbopack berbasis Rust mengalami bug internal *I/O Error (os error 5 / Permission Denied)* ketika membaca `tsconfig.json` di atas partisi NTFS Windows yang di-mount ke WSL2 Docker. Mode Webpack berjalan 100% stabil.
   - **Styling Engine:** Tailwind CSS v4 via `@tailwindcss/postcss` dan `postcss.config.mjs`.
   - **Dependensi Interaktif & UI:**
     - `motion` (Motion for React) & `framer-motion` (animasi layout & physics spring)
     - `react-use-measure` (deteksi dimensi tinggi elemen dinamis)
     - `lucide-react` & `react-icons` (ikonografi vektor teknis)
     - `sonner` (komponen notifikasi toast modern)
     - `tailwind-merge` & `cx.ts` (manajemen class Tailwind dinamis)

2. **Sistem Desain & Palet Warna (Editorial Warm-Stone & Obsidian):**
   - Mode gelap otomatis (`@media (prefers-color-scheme: dark)`) telah dinonaktifkan di `globals.css`.
   - Seluruh halaman terkunci pada tema terang editorial berstandar tinggi (bebas gradien *AI-slop* ungu/biru neon):
     - **Canvas Background:** Warm Alabaster Stone (`#F6F5F0`)
     - **Secondary Surface:** Warm Sand (`#EFECE6`)
     - **Card Surface:** Crisp Paper White (`#FFFFFF`)
     - **Garis & Border:** Hairline 1px Warm Stone (`#DCD8CE`) & Subtle Divider (`#EFECE6`)
     - **Teks Utama:** Obsidian Charcoal (`#141413`)
     - **Teks Sekunder:** Muted Graphite (`#575653`) & Monospace Slate (`#78756F`)
     - **Aksen Utama:** Telkom Terracotta Ember (`#C83E2B`)
     - **Aksen Transaksi/Sukses:** Deep Forest Moss (`#1B4332` / `#E9F3ED`)

3. **Backend (Laravel 11 REST API):**
   - **Port:** `http://localhost:8000`
   - **Entrypoint:** `backend/routes/api.php` (`GET /api/health`).
   - **Autentikasi:** Direncanakan menggunakan API Bearer Token (Laravel Sanctum).

4. **Database (PostgreSQL 16 Alpine via Docker):**
   - **Port Host:** `localhost:5432`
   - **Nama Database:** `sewakit`
   - **Username:** `sewakit_user`
   - **Password:** `sewakit_password`

5. **Email Sandbox (Mailpit via Docker):**
   - **Web UI:** `http://localhost:8025`
   - **SMTP Port:** `1025` (untuk pengujian email OTP 2FA dan notifikasi pengingat H-1).

6. **Mekanisme Sinkronisasi Docker:**
   - Karena Windows drive `E:` rentan terhadap *I/O error* saat binding volume direktori penuh `./frontend:/app`, sinkronisasi kode dilakukan melalui perintah instan:
     ```bash
     docker cp frontend/src sewakit-frontend:/app/
     ```

---

## 🗺️ 3. Peta Lengkap 12 Modul Fitur & 17 Rute Halaman

Seluruh 12 fitur dan 17 URL telah diverifikasi berjalan dengan status HTTP **200 OK**:

| No | Modul Fitur Utama | Rute URL | PIC Pengembang | Status di `main` |
| :-: | :--- | :--- | :--- | :---: |
| 1 | **Login, Register & Akun** | `/auth/login`, `/login`, `/register`, `/profile` | Azriel Raihan Eldova H. | 🟢 Merged |
| 2 | **Dashboard & Kategori Admin** | `/admin/dashboard`, `/admin/categories` | Azriel Raihan Eldova H. | 🟢 Merged |
| 3 | **Kelola Barang Pemilik** | `/owner/items` | Triansyah Danishwara I. | 🟢 Merged |
| 4 | **Saldo & Dompet Pemilik** | `/owner/wallet` | Triansyah Danishwara I. | 🟢 Merged |
| 5 | **Katalog & Detail Alat** | `/catalog`, `/catalog/[id]` | Rayvan Alifarlo M. | 🟢 Merged |
| 6 | **Serah Terima COD** | `/handover` | Rayvan Alifarlo M. | 🟢 Merged |
| 7 | **Pengajuan Sewa & Hold 24J** | `/rentals/request` | Muhammad Ariq Azzaki | 🟢 Merged |
| 8 | **Pembatalan & No-Show** | `/rentals/cancellation` | Muhammad Ariq Azzaki | 🟢 Merged |
| 9 | **Pembayaran Xendit Sandbox** | `/payments` | Muhammad Fiqri Habibi | 🟢 Merged |
| 10 | **Deposit, Denda & Sengketa** | `/disputes` | Muhammad Fiqri Habibi | 🟢 Merged |
| 11 | **Rating & Ulasan Dua Arah** | `/reviews` | Muhamad Alwan Suryadi | 🟢 Merged |
| 12 | **Pusat Notifikasi & Alarm** | `/notifications` | Muhamad Alwan Suryadi | 🟢 Merged |

---

### Rincian Tampilan dan Logika Setiap Halaman

#### 1. Marketplace Landing Page (`/`)
- **File:** [`frontend/src/app/page.tsx`](file:///e:/Project/SewaKit/frontend/src/app/page.tsx)
- **Komponen Kunci:**
  - **Hero Section:** Judul editorial dengan aksen terracotta, metrik platform (Hold 24J, Batas Bayar 120 Menit, 5 Titik COD Kampus), dan CTA pencarian.
  - **Watermelon Card Split Accordion:** Menampilkan 5 protokol transaksi SewaKit (*Hold 24J, Escrow Xendit, COD Kampus, Denda Otomatis, Reputasi 2 Arah*) dengan animasi physics spring.
  - **Grid Kategori Alat:** 4 kategori inventaris utama (IoT, Komputer & Multimedia, Instrumen Lab, Logistik Acara).
  - **Katalog Populer Minggu Ini:** 6 item unggulan dari `DUMMY_ITEMS` menggunakan [`ItemThumbnail.tsx`](file:///e:/Project/SewaKit/frontend/src/app/catalog/_components/ItemThumbnail.tsx) berarsitektur blueprint.
  - **Role Workspace Portal:** Navigasi cepat berbasis peran (Mahasiswa Penyewa, Pemilik Alat, Administrator).

#### 2. Autentikasi Mahasiswa & Admin (`/auth/login`, `/login`, `/register`, `/profile`)
- **File:** `src/app/login/page.tsx`, `src/app/register/page.tsx`, `src/app/profile/page.tsx`
- **Fitur:**
  - Tab pemisah antara Mahasiswa (login via NIM/Email SSO Telkom University) dan Administrator (dilengkapi input **Kode OTP 6 Digit** simulasi 2FA).
  - Validasi pendaftaran akun mahasiswa baru dengan pencatatan nama, NIM, email kampus, nomor WhatsApp, dan konfirmasi password.
  - Halaman profil mahasiswa dengan badge status **NIM TERVERIFIKASI**, manajemen data kontak COD, dan pembaruan kata sandi.

#### 3. Panel Moderasi & Tata Kelola Admin (`/admin/dashboard`, `/admin/categories`)
- **File:** `src/app/admin/dashboard/page.tsx`, `src/app/admin/categories/page.tsx`
- **Fitur:**
  - Kartu statistik platform: Total Mahasiswa (124), Unit Alat Aktif (45), Transaksi Berjalan (18), dan Volume Escrow Kampus (Rp 4.250.000).
  - Audit trail log transaksi terkini dengan status badge Deep Forest & Terracotta.
  - Manajemen master kategori alat praktikum (tambah nama, generate slug otomatis, hapus kategori).

#### 4. Panel Inventaris & Dompet Pemilik Alat (`/owner/items`, `/owner/wallet`)
- **File:** `src/app/owner/items/page.tsx`, `src/app/owner/wallet/page.tsx`
- **Fitur:**
  - Panel pengelolaan unit barang: tambah barang baru, ubah deskripsi, upload foto, penetapan tarif sewa harian, deposit jaminan, dan kuota stok.
  - Dompet pemilik: ringkasan saldo aktif siap ditarik, total pendapatan, formulir penarikan dana (*payout*) ke rekening bank kampus (BCA, BRI, BNI, Mandiri), dan tabel riwayat mutasi.

#### 5. Eksplorasi Katalog & Detail Unit Barang (`/catalog`, `/catalog/[id]`)
- **File:** `src/app/catalog/page.tsx`, `src/app/catalog/[id]/page.tsx`, `src/app/catalog/_components/*`
- **Fitur:**
  - Pencarian teks instan (nama, deskripsi, pemilik), filter kategori, dan rentang harga sewa.
  - Kartu barang terpadu dengan label kategori, lokasi gedung COD, tarif per hari, dan nominal deposit.
  - Detail spesifikasi barang lengkap dengan tabel parameter teknis, deskripsi pemilik, dan tombol langsung menuju pengajuan sewa.

#### 6. Protokol Serah Terima COD di Kampus (`/handover`)
- **File:** `src/app/handover/page.tsx`, `src/app/handover/_components/*`
- **Fitur:**
  - Simulasi berganti peran antara Penyewa dan Pemilik.
  - 4 Tahapan transaksi COD (*Serah Terima Awal, Masa Sewa Berjalan, Pemeriksaan Pengembalian, Selesai*).
  - Pertukaran kode token verifikasi rahasia (6 digit) saat bertemu di titik COD kampus (TULT, GKU, Open Library, Student Center).
  - Checklist fisik kondisi barang dan foto komparasi sebelum disewa vs sesudah dikembalikan.

#### 7. Pengajuan Sewa & Penahanan Jadwal Anti-Bentrok (`/rentals/request`)
- **File:** `src/app/rentals/request/page.tsx`
- **Fitur:**
  - Pemilihan rentang tanggal sewa dengan **Proteksi Anti-Bentrok Otomatis** (tanggal yang sudah ter-booking terkunci dengan indikator visual merah).
  - Begitu formulir disubmit, jadwal otomatis masuk status **Hold 24 Jam** agar tidak dapat diserobot mahasiswa lain.
  - Panel aksi bagi pemilik untuk menerima (*Approve*) atau menolak (*Reject* dengan alasan).
  - Pembukaan tautan langsung WhatsApp ke kedua belah pihak setelah pesanan lunas.

#### 8. Pembatalan Pesanan & Penanganan No-Show COD (`/rentals/cancellation`)
- **File:** `src/app/rentals/cancellation/page.tsx`
- **Fitur:**
  - Kalkulasi pengembalian dana proporsional:
    - Batal sebelum bayar: Bebas biaya.
    - Batal oleh penyewa > 24 jam sebelum COD: Refund 100% (sewa + deposit).
    - Batal oleh penyewa < 12 jam: Potongan 50% biaya sewa diteruskan ke pemilik sebagai kompensasi waktu.
  - Simulasi otomatisasi pembatalan sistem (*Auto-Cancel Scheduler*) ketika batas bayar 2 jam atau batas hold 24 jam terlewati.
  - Formulir pelaporan ketidakhadiran (*No-Show COD*) jika salah satu pihak tidak hadir setelah ditunggu $\ge 30$ menit di titik kumpul kampus.

#### 9. Gateway Pembayaran Xendit Sandbox & Escrow (`/payments`)
- **File:** `src/app/payments/page.tsx`
- **Fitur:**
  - Rincian biaya transparan: Biaya Sewa + Deposit Jaminan Escrow + Biaya Gateway.
  - Hitung mundur batas waktu pembayaran **2 jam** (120 menit).
  - Pilihan metode bayar: QRIS Sandbox dan Virtual Account (BCA / Mandiri).
  - Modal simulator invoice Xendit Sandbox dengan mock webhook verifikasi pembayaran instan.

#### 10. Manajemen Deposit, Denda & Sengketa (`/disputes`)
- **File:** `src/app/disputes/page.tsx`
- **Fitur:**
  - Pemantauan status penahanan dana deposit jaminan di rekening penampung (*escrow*).
  - Otomatisasi pemotongan denda keterlambatan per hari dan denda kerusakan (maksimal sebesar plafon deposit).
  - Formulir pengajuan sengketa / klaim keberatan yang langsung diteruskan ke tim moderator kampus.

#### 11. Rating & Ulasan Dua Arah (`/reviews`)
- **File:** `src/app/reviews/page.tsx`, `src/components/foundations/*`
- **Fitur:**
  - Penilaian bintang interaktif 1–5 dengan animasi tap spring.
  - Komponen metrik [`RatingBadge.tsx`](file:///e:/Project/SewaKit/frontend/src/components/foundations/rating-badge.tsx) dan [`RatingStars.tsx`](file:///e:/Project/SewaKit/frontend/src/components/foundations/rating-stars.tsx).
  - Upload foto kondisi barang aktual dan pengiriman ulasan dengan feedback toast via `sonner`.
  - Tampilan tanggapan resmi dari pemilik alat (*two-way reputation*).

#### 12. Pusat Notifikasi & Pengingat Sewa (`/notifications`)
- **File:** `src/app/notifications/page.tsx`
- **Fitur:**
  - Notifikasi terklasifikasi dalam 3 tab: Transaksi, Pengingat, dan Sistem.
  - Pengingat otomatis jatuh tempo pengembalian alat (H-1).
  - Aksi interaktif: tandai sudah dibaca, hapus notifikasi, dan tombol *Tandai Semua Dibaca*.

---

## 🧩 4. Komponen Global Terpadu

1. **[`Navbar.tsx`](file:///e:/Project/SewaKit/frontend/src/components/Navbar.tsx):**
   - Navigasi utama: Beranda, Katalog Alat, Pengajuan Sewa, Inventaris Pemilik, Moderasi.
   - Aksi kanan: Notifikasi (dengan red indicator dot), Profil Mahasiswa, Masuk, dan Daftar.
   - Sub-bar alur sistem 8 langkah (Cari Alat -> Booking -> Escrow -> COD -> Deposit -> Batal -> Ulasan -> Dompet).
   - Menu drawer responsif untuk tampilan layar seluler.

2. **[`Footer.tsx`](file:///e:/Project/SewaKit/frontend/src/components/Footer.tsx):**
   - Footer bertema Obsidian (`#141413`) dengan daftar 4 titik COD kampus Telkom University, navigasi taksonomi alat, alur penyewa, panel pemilik, serta badge keamanan *Escrow Protected & NIM Verified*.

3. **[`PageHeader.tsx`](file:///e:/Project/SewaKit/frontend/src/components/PageHeader.tsx):**
   - Komponen judul standar sub-halaman: label *eyebrow* monospace uppercase (`#C83E2B`), judul tebal, deskripsi singkat, dan wadah tombol aksi kanan.

4. **[`card-split-accordian.tsx`](file:///e:/Project/SewaKit/frontend/src/components/watermelon/card-split-accordian.tsx):**
   - Komponen akordion animasi dari Watermelon UI Registry dengan kalkulasi dinamis border radius saat dibuka (*split-card effect*), didukung spring physics `stiffness: 600, damping: 50`.

5. **[`ItemThumbnail.tsx`](file:///e:/Project/SewaKit/frontend/src/app/catalog/_components/ItemThumbnail.tsx):**
   - Komponen kartu visual bertekstur arsitektural grid blueprint untuk menampilkan inisial dan klasifikasi instrumen praktikum secara konsisten.

---

## 🚀 5. Panduan Menjalankan & Menguji Proyek

### A. Menjalankan Menggunakan Docker (Metode Terstandar)

1. **Pastikan Docker Desktop aktif di Windows.**
2. **Jalankan container backend, database, mailpit, dan frontend:**
   ```powershell
   # Dari root project (e:\Project\SewaKit):
   docker compose up -d
   ```
3. **Sinkronkan kode frontend ke dalam container:**
   ```powershell
   docker cp frontend/src sewakit-frontend:/app/
   ```
4. **Buka di Web Browser:**
   - **Frontend Marketplace:** 👉 `http://localhost:3000`
   - **Backend API Health:** 👉 `http://localhost:8000/api/health`
   - **Mailpit Email Inbox:** 👉 `http://localhost:8025`

### B. Pengujian Otomatis Seluruh Rute via PowerShell

Jalankan perintah berikut di PowerShell untuk memverifikasi 17 rute sekaligus:

```powershell
$routes = @(
  "/", "/catalog", "/catalog/esp32-devkit", 
  "/rentals/request", "/rentals/cancellation", 
  "/payments", "/disputes", "/handover", 
  "/owner/items", "/owner/wallet", 
  "/admin/dashboard", "/admin/categories", 
  "/auth/login", "/register", "/profile", 
  "/reviews", "/notifications"
)
foreach ($r in $routes) {
  $res = Invoke-WebRequest -Uri "http://localhost:3000$r" -UseBasicParsing -TimeoutSec 15
  Write-Output "$r -> $($res.StatusCode)"
}
```
*Hasil yang diharapkan: Seluruh rute mengembalikan status `200`.*

---

## 🔮 6. Roadmap & Panduan Kontinuitas untuk Fase Backend / Sesi Selanjutnya

Jika Anda adalah pengembang atau AI Assistant yang melanjutkan sesi ini, berikut adalah panduan langkah demi langkah untuk **Fase Backend & Integrasi API**:

### Aturan Integritas Kode:
1. **DILARANG MENGUBAH DEV SCRIPT FRONTEND KE TURBOPACK.** Pertahankan `"dev": "next dev --webpack"` di `frontend/package.json`.
2. **DILARANG MENGEMBALIKAN WARNA AI-SLOP.** Jangan memasang gradien ungu/indigo/biru elektrik generik. Gunakan palet editorial yang telah diseragamkan (`#F6F5F0`, `#141413`, `#C83E2B`, `#1B4332`).
3. **DILARANG MEMBUAT HEADER/LOGO GANDA.** Setiap halaman baru harus otomatis memanfaatkan `<Navbar />` dari `layout.tsx` dan `<PageHeader />` untuk judul konten.

### Rencana Kerja Fase Backend (Laravel 11 + PostgreSQL):
1. **Database Schema & Migrations:**
   - Tabel `users` (id, name, nim, email, phone, role: renter/owner/admin, password, is_verified).
   - Tabel `categories` (id, name, slug).
   - Tabel `items` (id, owner_id, category_id, name, description, price_per_day, deposit_amount, campus_location).
   - Tabel `rental_requests` (id, item_id, renter_id, start_date, end_date, total_days, rental_fee, deposit_fee, status: pending/approved/rejected/paid/cancelled/completed).
   - Tabel `transactions` (id, rental_id, invoice_url, xendit_id, payment_method, status: pending/paid/expired).
   - Tabel `handovers` (id, rental_id, pickup_code, return_code, pickup_notes, return_notes, status).
   - Tabel `disputes` (id, rental_id, reported_by, reason, claim_amount, status: open/resolved).
   - Tabel `reviews` (id, rental_id, reviewer_id, reviewee_id, rating, comment, proof_image).
   - Tabel `notifications` (id, user_id, title, message, type, is_read).

2. **API Endpoint & Service Controllers:**
   - `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`
   - `GET /api/catalog/items`, `GET /api/catalog/items/{id}`
   - `POST /api/rentals/request` (validasi anti-bentrok tanggal sewa & hold 24 jam)
   - `POST /api/payments/xendit/webhook` (idempotent webhook pembaruan status lunas)
   - `POST /api/handover/verify-code` (pencocokan token 6 digit dua arah)
   - `POST /api/owner/wallet/withdraw` (pengajuan penarikan dana)

3. **Background Scheduler (Cron Job):**
   - Evaluasi setiap menit: Pembatalan otomatis pesanan yang melewati batas bayar 2 jam (*Auto-Cancel Expired Payment*).
   - Evaluasi setiap jam: Pembatalan otomatis pengajuan yang tidak direspons pemilik dalam 24 jam (*Auto-Cancel Expired Hold*).
   - Pengiriman email pengingat H-1 jadwal pengembalian alat via Mailpit.
