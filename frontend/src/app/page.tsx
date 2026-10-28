import Link from "next/link";

const FEATURES = [
  {
    no: 1,
    title: "Login dan Manajemen Akun",
    desc: "Login mahasiswa via email, login Admin terpisah dengan OTP & rate limiter, JWT session, dan blokir akun.",
    pic: "Azriel Raihan Eldova Hartoto",
    route: "/auth/login",
    branch: "feat/auth-dan-akun",
  },
  {
    no: 2,
    title: "Kategori dan Dashboard Admin",
    desc: "Pengelolaan kategori barang serta dashboard statistik pengguna, barang, dan transaksi.",
    pic: "Azriel Raihan Eldova Hartoto",
    route: "/admin/dashboard",
    branch: "feat/kategori-dashboard-admin",
  },
  {
    no: 3,
    title: "Kelola Barang dan Paket",
    desc: "CRUD barang (foto, spesifikasi, harga, deposit, ketersediaan) serta penyusunan paket sewa milik Pemilik.",
    pic: "Triansyah Danishwara Ibrahim",
    route: "/owner/items",
    branch: "feat/kelola-barang-paket",
  },
  {
    no: 4,
    title: "Saldo dan Penarikan Dana",
    desc: "Pencatatan saldo sewa Pemilik setelah transaksi selesai dan pengajuan penarikan dana (simulasi).",
    pic: "Triansyah Danishwara Ibrahim",
    route: "/owner/wallet",
    branch: "feat/saldo-penarikan",
  },
  {
    no: 5,
    title: "Katalog dan Pencarian",
    desc: "Daftar barang & paket dengan filter kategori, harga, tanggal, serta halaman detail dengan kalender ketersediaan.",
    pic: "Rayvan Alifarlo Mahesworo",
    route: "/catalog",
    branch: "feat/katalog-pencarian",
  },
  {
    no: 6,
    title: "Serah Terima dan Pengembalian",
    desc: "Kode serah terima, checklist & foto kondisi barang saat COD, konfirmasi dua pihak, dan perubahan status sewa.",
    pic: "Rayvan Alifarlo Mahesworo",
    route: "/handover",
    branch: "feat/serah-terima-pengembalian",
  },
  {
    no: 7,
    title: "Pengajuan dan Persetujuan Sewa",
    desc: "Booking rentang tanggal anti-bentrok, hold jadwal 24 jam, terima/tolak oleh Pemilik, dan kontak janjian COD.",
    pic: "Muhammad Ariq Azzaki",
    route: "/rentals/request",
    branch: "feat/pengajuan-persetujuan-sewa",
  },
  {
    no: 8,
    title: "Pembatalan dan No-Show",
    desc: "Pembatalan oleh Penyewa/Pemilik sesuai aturan refund, auto-cancel lewat batas bayar 2 jam, dan laporan no-show.",
    pic: "Muhammad Ariq Azzaki",
    route: "/rentals/cancellation",
    branch: "feat/pembatalan-noshow",
  },
  {
    no: 9,
    title: "Pembayaran (Xendit Sandbox)",
    desc: "Pembayaran sewa + deposit via Xendit dengan batas waktu 2 jam, notifikasi webhook, dan pengembalian dana.",
    pic: "Muhammad Fiqri Habibi",
    route: "/payments",
    branch: "feat/pembayaran-xendit",
  },
  {
    no: 10,
    title: "Deposit, Denda, dan Sengketa",
    desc: "Kalkulasi otomatis denda keterlambatan/kerusakan (maks sebesar deposit), refund sisa deposit, dan pusat resolusi sengketa.",
    pic: "Muhammad Fiqri Habibi",
    route: "/disputes",
    branch: "feat/deposit-denda-sengketa",
  },
  {
    no: 11,
    title: "Rating dan Ulasan",
    desc: "Ulasan dan rating dua arah antara Pemilik dan Penyewa pasca-transaksi yang tampil di profil pengguna.",
    pic: "Muhamad Alwan Suryadi",
    route: "/reviews",
    branch: "feat/rating-ulasan",
  },
  {
    no: 12,
    title: "Notifikasi dan Pengingat",
    desc: "Notifikasi status pengajuan, pembayaran, pembatalan, pengingat jatuh tempo H-1, dan penandaan sewa terlambat.",
    pic: "Muhamad Alwan Suryadi",
    route: "/notifications",
    branch: "feat/notifikasi-pengingat",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Dasar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-sm">
              SK
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                SewaKit
              </span>
              <span className="ml-2 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                Kampus P2P Rental
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/catalog" className="hover:text-indigo-600 transition">
              Katalog Alat
            </Link>
            <Link href="/rentals/request" className="hover:text-indigo-600 transition">
              Pesanan Saya
            </Link>
            <Link href="/owner/items" className="hover:text-indigo-600 transition">
              Panel Pemilik
            </Link>
            <Link href="/admin/dashboard" className="hover:text-indigo-600 transition">
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
            >
              Masuk / Daftar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 mx-auto max-w-7xl px-6 py-12 w-full">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-8 md:p-12 text-white shadow-lg mb-12">
          <div className="max-w-3xl">
            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-wider mb-2">
              Platform Kolaborasi Tim SewaKit
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Sewa Alat Praktikum & Kuliah Antar-Mahasiswa Lebih Aman
            </h1>
            <p className="text-indigo-100 text-base md:text-lg leading-relaxed mb-6">
              Dilengkapi sistem proteksi deposit, jadwal anti-bentrok, dan konfirmasi serah terima COD dua arah dengan checklist kondisi fisik serta bukti foto.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-mono">
              <span className="rounded-lg bg-white/15 px-3 py-1.5 backdrop-blur">
                Frontend: Next.js (Port 3000)
              </span>
              <span className="rounded-lg bg-white/15 px-3 py-1.5 backdrop-blur">
                Backend: Laravel REST API (Port 8000)
              </span>
              <span className="rounded-lg bg-white/15 px-3 py-1.5 backdrop-blur">
                Database: PostgreSQL 16 (Docker Port 5432)
              </span>
            </div>
          </div>
        </div>

        {/* Daftar 12 Modul Fitur & Rute */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Peta Modul & Pembagian Fitur Tim (12 Fitur)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Setiap anggota tim dapat membuat halaman Frontend masing-masing di dalam folder{" "}
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs font-mono">
                frontend/src/app/[route]/page.tsx
              </code>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((item) => (
            <div
              key={item.no}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center justify-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                    Fitur #{item.no}
                  </span>
                  <code className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 font-mono">
                    {item.route}
                  </code>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-2 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">PIC:</span>
                  <span className="font-semibold text-slate-800">{item.pic}</span>
                </div>
                <span className="rounded bg-emerald-50 px-2 py-1 font-mono text-[11px] text-emerald-700">
                  {item.branch}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        SewaKit &copy; 2026 — Proyek Aplikasi Kolaborasi Mahasiswa
      </footer>
    </div>
  );
}
