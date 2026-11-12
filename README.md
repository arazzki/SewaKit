# SewaKit | Platform Sewa Alat Penunjang Kuliah Antar-Mahasiswa

**SewaKit** adalah aplikasi web untuk sewa-menyewa alat penunjang kuliah (perangkat IoT, elektronika, komputer, multimedia, perlengkapan akademik, dan kegiatan) antar-mahasiswa dalam satu lingkungan kampus.

---

## 👥 Anggota Tim Pengembang

| No. | Nama Anggota | NIM | Fitur yang Dipegang (End-to-End) |
| :-: | :--- | :---: | :--- |
| 1 | **Rayvan Alifarlo Mahesworo** | 103032400087 | (5) Katalog & Pencarian, (6) Serah Terima & Pengembalian |
| 2 | **Triansyah Danishwara Ibrahim** | 103032400062 | (3) Kelola Barang & Paket, (4) Saldo & Penarikan Dana |
| 3 | **Azriel Raihan Eldova Hartoto** | 103032400010 | (1) Login & Manajemen Akun, (2) Kategori & Dashboard Admin |
| 4 | **Muhammad Ariq Azzaki** | 103032400138 | (7) Pengajuan & Persetujuan Sewa, (8) Pembatalan & No-Show |
| 5 | **Muhammad Fiqri Habibi** | 103032400056 | (9) Pembayaran, (10) Deposit, Denda & Sengketa |
| 6 | **Muhamad Alwan Suryadi** | 103032400104 | (11) Rating & Ulasan, (12) Notifikasi & Pengingat |

---

## 🛠️ Tech Stack

| Bagian | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend** | Next.js (App Router) + Tailwind CSS | Berjalan di `http://localhost:3000` |
| **Backend** | Laravel (REST API, Sanctum) | Berjalan di `http://localhost:8000` |
| **Database** | PostgreSQL 16 | Berjalan lokal via Docker Compose (`localhost:5432`) |
| **Pembayaran** | Xendit (Sandbox) | Integrasi pembayaran sewa & deposit |
| **Lingkungan** | Docker Compose | Standarisasi database PostgreSQL & Mailpit lokal |

---

## 📁 Struktur Direktori (Monorepo)

```text
SewaKit/
├── .github/                # Template Pull Request & GitHub Actions
├── backend/                # REST API Laravel (Port 8000)
│   ├── routes/api.php      # Endpoint REST API
│   └── Dockerfile          # Container PHP 8.3 + PostgreSQL driver
├── frontend/               # Aplikasi Web Next.js (Port 3000)
│   ├── src/app/            # App Router halaman fitur
│   └── Dockerfile          # Container Node 22 + Hot Reload
├── docker-compose.yml      # Menjalankan Frontend, Backend, PostgreSQL 16 & Mailpit
├── Laporan_Rancangan_Aplikasi_SewaKit.pdf
└── README.md
```

---

## 🐳 Cara Menjalankan Project

### Opsi A: Menggunakan Docker (Direkomendasikan agar Versi Seragam)
Pastikan aplikasi **Docker Desktop** sudah menyala, lalu jalankan perintah ini di folder utama (`SewaKit/`):

```bash
# Menjalankan khusus Frontend saja (Fase Pengerjaan UI):
docker compose up --build frontend

# ATAU menjalankan seluruh sistem (Frontend + Backend + PostgreSQL + Mailpit):
docker compose up --build
```
Akses di browser:
- **Frontend (Next.js):** `http://localhost:3000`
- **Backend API (Laravel):** `http://localhost:8000/api/health`
- **Mailpit (Cek Email OTP/Notifikasi):** `http://localhost:8025`
- **PostgreSQL Database:** `localhost:5432` (DB: `sewakit`, User: `sewakit_user`, Pass: `sewakit_password`)

### Opsi B: Menjalankan Frontend Tanpa Docker (Lokal Node.js)
Jika ingin mengerjakan tampilan Frontend secara cepat tanpa menyalakan Docker:
```bash
cd frontend
npm install
npm run dev
```
Buka `http://localhost:3000`.

---

## 🚀 Panduan Kolaborasi Git (Wajib Diikuti Tim)

Setiap anggota mengerjakan fiturnya di **branch terpisah** agar tidak terjadi konflik di branch `main`.

### 1. Clone Repository (Pertama Kali)
```bash
git clone <URL_REPOSITORY_GITHUB>
cd SewaKit
```

### 2. Membuat Branch Fitur Baru
Selalu pastikan berada di branch `main` terbaru sebelum membuat branch fitur:
```bash
git checkout main
git pull origin main
git checkout -b feat/nama-fitur
```
**Contoh penamaan branch per fitur:**
- `feat/auth-dan-akun` (Azriel)
- `feat/kategori-dashboard-admin` (Azriel)
- `feat/kelola-barang-paket` (Triansyah)
- `feat/saldo-penarikan` (Triansyah)
- `feat/katalog-pencarian` (Rayvan)
- `feat/serah-terima-pengembalian` (Rayvan)
- `feat/pengajuan-persetujuan-sewa` (Ariq)
- `feat/pembatalan-noshow` (Ariq)
- `feat/pembayaran-xendit` (Fiqri)
- `feat/deposit-denda-sengketa` (Fiqri)
- `feat/rating-ulasan` (Alwan)
- `feat/notifikasi-pengingat` (Alwan)

### 3. Commit & Push Pekerjaan
```bash
git add .
git commit -m "feat: menyelesaikan tampilan halaman katalog barang"
git push -u origin feat/nama-fitur
```

### 4. Buat Pull Request (PR)
1. Buka repository di GitHub.
2. Klik **Compare & pull request** dari branch fitur kamu ke `main`.
3. Minta minimal 1 anggota tim untuk me-*review* sebelum klik **Merge**.
