import React from "react";
import Link from "next/link";
import { DUMMY_ITEMS } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import ItemThumbnail from "@/app/catalog/_components/ItemThumbnail";

const CATEGORY_CARDS = [
  {
    slug: "iot-elektronika",
    title: "IoT & Elektronika",
    desc: "ESP32, Arduino Uno, Raspberry Pi, sensor kit, multimeter, solder, dan osiloskop praktikum.",
    badge: "Praktikum Teknik",
    icon: "🔌",
    color: "from-indigo-500/10 to-blue-500/5 border-indigo-200",
  },
  {
    slug: "komputer-multimedia",
    title: "Komputer & Multimedia",
    desc: "Kamera DSLR/Mirrorless, tripod, mikrofon wireless, drawing tablet, dan capture card.",
    badge: "Dokumentasi & Desain",
    icon: "📷",
    color: "from-purple-500/10 to-indigo-500/5 border-purple-200",
  },
  {
    slug: "akademik",
    title: "Perlengkapan Akademik & Lab",
    desc: "Kalkulator saintifik/grafik, jas laboratorium, kacamata safety, dan alat ukur presisi.",
    badge: "Ujian & Lab",
    icon: "🔬",
    color: "from-emerald-500/10 to-teal-500/5 border-emerald-200",
  },
  {
    slug: "acara-kegiatan",
    title: "Acara & Kegiatan Kampus",
    desc: "Handy Talky (HT) kepanitiaan, proyektor portabel, speaker aktif, dan perlengkapan event.",
    badge: "Kepanitiaan & UKM",
    icon: "🎤",
    color: "from-amber-500/10 to-orange-500/5 border-amber-200",
  },
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Pilih Alat & Tahan Jadwal (Hold 24 Jam)",
    desc: "Pilih rentang tanggal sewa bebas bentrok dan tentukan titik temu COD di area kampus. Jadwal otomatis ditahan 24 jam menunggu persetujuan pemilik.",
    href: "/rentals/request",
    cta: "Coba Ajukan Sewa →",
  },
  {
    step: "02",
    title: "Bayar Sewa & Deposit Aman (Escrow)",
    desc: "Selesaikan pembayaran sewa beserta deposit jaminan dalam 2 jam melalui QRIS atau Virtual Account. Dana ditahan aman oleh sistem.",
    href: "/payments",
    cta: "Lihat Simulasi Bayar →",
  },
  {
    step: "03",
    title: "COD Kampus & Checklist Kondisi",
    desc: "Temui pemilik di titik COD (TULT, GKU, atau Open Library). Periksa kelengkapan komponen, unggah foto kondisi, dan konfirmasi kode serah terima.",
    href: "/handover",
    cta: "Buka Serah Terima →",
  },
  {
    step: "04",
    title: "Kembalikan Alat & Terima Refund Deposit",
    desc: "Setelah alat dikembalikan tepat waktu dan kondisi terverifikasi baik, deposit dikembalikan 100% ke penyewa dan uang sewa masuk ke saldo pemilik.",
    href: "/disputes",
    cta: "Cek Proteksi Deposit →",
  },
];

export default function HomePage() {
  const featuredItems = DUMMY_ITEMS.slice(0, 6);

  return (
    <main className="flex-1">
      {/* 1. HERO MARKETPLACE SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Platform P2P Sewa Alat Kuliah Antar-Mahasiswa
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Butuh Alat Praktikum atau Tugas Besar?{" "}
                <span className="text-indigo-400">Sewa dari Teman Kampusmu!</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Hemat biaya kuliah tanpa harus beli perangkat mahal yang hanya dipakai satu semester. Transaksi terlindungi sistem{" "}
                <strong className="text-white">Escrow Deposit</strong>, kalender anti-bentrok, dan{" "}
                <strong className="text-white">Checklist COD dua arah</strong> di lingkungan kampus.
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/catalog"
                  className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-indigo-500 transition"
                >
                  🔍 Jelajahi Katalog Alat
                </Link>
                <Link
                  href="/rentals/request"
                  className="rounded-xl bg-white/10 border border-white/20 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  📅 Ajukan Booking Sewa
                </Link>
                <Link
                  href="/owner/items"
                  className="rounded-xl bg-emerald-500/20 border border-emerald-400/30 px-5 py-3.5 text-sm font-bold text-emerald-200 hover:bg-emerald-500/30 transition"
                >
                  + Sewakan Alat Milikmu
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
                <div>
                  <p className="text-xl font-extrabold text-white">100%</p>
                  <p className="text-slate-400">Deposit Dijamin Escrow</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">24 Jam</p>
                  <p className="text-slate-400">Proteksi Hold Jadwal</p>
                </div>
                <div>
                  <p className="text-xl font-extrabold text-white">COD Kampus</p>
                  <p className="text-slate-400">TULT • GKU • Open Library</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Highlight Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      Simulasi Transaksi Aman
                    </span>
                    <h2 className="text-lg font-bold text-white">
                      Proteksi Dua Arah SewaKit
                    </h2>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300">
                    Verified Campus
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="rounded-xl bg-slate-900/70 p-3.5 border border-white/10 flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-white">Bebas Jadwal Bentrok</p>
                      <p className="text-slate-300 mt-0.5">
                        Kalender otomatis memblokir tanggal yang sedang disewa atau ditahan (Hold 24 jam).
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-900/70 p-3.5 border border-white/10 flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-white">Checklist Fisik & Bukti Foto COD</p>
                      <p className="text-slate-300 mt-0.5">
                        Kondisi awal dan akhir dicatat bersama menggunakan kode serah terima untuk mencegah klaim sepihak.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-900/70 p-3.5 border border-white/10 flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-white">Denda & Refund Otomatis</p>
                      <p className="text-slate-300 mt-0.5">
                        Denda keterlambatan/kerusakan dihitung adil (maksimal sebesar deposit) dan sisanya dikembalikan otomatis.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Link
                    href="/handover"
                    className="flex-1 rounded-xl bg-white py-2.5 text-center text-xs font-bold text-slate-900 hover:bg-slate-100 transition"
                  >
                    Lihat Alur COD
                  </Link>
                  <Link
                    href="/rentals/cancellation"
                    className="flex-1 rounded-xl border border-white/20 py-2.5 text-center text-xs font-bold text-white hover:bg-white/10 transition"
                  >
                    Aturan Refund & Batal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KATEGORI ALAT PENUNJANG KULIAH */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Kategori Peralatan
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Cari Alat Sesuai Kebutuhan Kuliahmu
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-500"
          >
            Lihat Semua Kategori di Katalog →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.slug}
              href="/catalog"
              className={`group rounded-2xl border bg-gradient-to-br p-6 transition hover:shadow-md ${cat.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{cat.icon}</span>
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-bold text-slate-700 border border-slate-200/60">
                  {cat.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                {cat.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. KATALOG ALAT POPULER MINGGU INI */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Rekomendasi Kampus
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Alat Praktikum & Multimedia Siap Disewa
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Pilih alat dari mahasiswa satu kampus dan sepakati jadwal serah terima COD.
              </p>
            </div>
            <Link
              href="/catalog"
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition w-fit"
            >
              Buka Katalog Lengkap ({DUMMY_ITEMS.length} Alat) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-indigo-300 transition"
              >
                <div>
                  <div className="relative">
                    <ItemThumbnail
                      category={item.category}
                      name={item.name}
                      className="h-44"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-2xs">
                      Kondisi: {item.condition}
                    </span>
                    <span className="absolute top-3 right-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs">
                      {item.unitsAvailable} Unit Tersedia
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>👤 {item.ownerName}</span>
                      <span className="font-semibold text-amber-600">
                        ★ {item.rating ?? "Baru"}
                      </span>
                    </div>

                    <Link
                      href={`/catalog/${item.id}`}
                      className="text-base font-bold text-slate-900 hover:text-indigo-600 transition line-clamp-1"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <span>📍</span>
                      <span className="truncate">COD: {item.codLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block">
                      Tarif Sewa
                    </span>
                    <span className="text-sm font-extrabold text-indigo-600">
                      {formatRupiah(item.pricePerDay)}
                      <span className="text-xs font-normal text-slate-500">
                        /hari
                      </span>
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Deposit: {formatRupiah(item.deposit)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/catalog/${item.id}`}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                    >
                      Detail
                    </Link>
                    <Link
                      href="/rentals/request"
                      className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition"
                    >
                      Sewa
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CARA KERJA SEWAKIT (4 LANGKAH TRANSAKSI) */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Alur Transaksi Terpadu
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
            Bagaimana Cara Menyewa Alat di SewaKit?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Setiap tahap dirancang untuk melindungi pemilik barang dan penyewa secara adil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((w) => (
            <div
              key={w.step}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
            >
              <div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 font-mono text-sm font-extrabold text-indigo-600 mb-4">
                  {w.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {w.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {w.desc}
                </p>
              </div>
              <Link
                href={w.href}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-500 inline-flex items-center gap-1 pt-2 border-t border-slate-100"
              >
                {w.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PORTAL AKSES PERAN PENGGUNA (PENYEWA, PEMILIK BARANG, ADMIN) */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Navigasi Cepat Berdasarkan Peran
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Akses Seluruh Layanan SewaKit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kartu Penyewa */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
              <div>
                <span className="rounded-md bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                  Mahasiswa Penyewa
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Pinjam & Kelola Pesanan Sewa
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Cari alat praktikum, ajukan jadwal, bayar deposit, dan konfirmasi serah terima COD.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                <Link
                  href="/catalog"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>🔍 Katalog & Pencarian Alat</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/rentals/request"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>📅 Pengajuan & Persetujuan Sewa</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/payments"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>💳 Pembayaran Xendit (Hold 2 Jam)</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/handover"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>🤝 Serah Terima & Pengembalian COD</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/rentals/cancellation"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>🚫 Pembatalan & Laporan No-Show</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Kartu Pemilik Barang */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
              <div>
                <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                  Mahasiswa Pemilik Barang
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Monetisasi Alat Kuliahmu
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Unggah alat/paket praktikum, terima pesanan sewa, dan tarik penghasilan sewamu.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                <Link
                  href="/owner/items"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition"
                >
                  <span>📦 Kelola Barang & Paket Sewa</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/owner/wallet"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition"
                >
                  <span>💰 Saldo & Penarikan Dana (Payout)</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/disputes"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition"
                >
                  <span>🛡️ Klaim Deposit, Denda & Sengketa</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/reviews"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition"
                >
                  <span>⭐ Rating & Ulasan Transaksi</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Kartu Akun & Admin */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-4">
              <div>
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                  Akun & Administrator
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Pusat Akun, Notifikasi & Admin
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Kelola profil mahasiswa, pantau pengingat jatuh tempo, dan akses panel moderasi Admin.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>🔐 Login Mahasiswa & Admin OTP</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>👤 Profil & Pengaturan Akun</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>🔔 Pusat Notifikasi & Pengingat H-1</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>📊 Dashboard Statistik Admin</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/admin/categories"
                  className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition"
                >
                  <span>🗂️ Manajemen Kategori Barang</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
