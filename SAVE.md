# 📌 SEWAKIT — PROJECT STATE & ARCHITECTURE SNAPSHOT (SAVE)
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
└── README.md