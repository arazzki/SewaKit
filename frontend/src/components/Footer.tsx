import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-extrabold text-white">
                SK
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                SewaKit
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Platform peer-to-peer (P2P) sewa-menyewa alat penunjang praktikum, tugas besar, dan perkuliahan antar-mahasiswa dalam satu lingkungan kampus. Dilengkapi proteksi deposit jaminan (Escrow) dan validasi COD dua pihak.
            </p>
            <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-medium text-slate-500">
              <span className="rounded-md bg-slate-100 px-2.5 py-1">
                📍 Titik COD: TULT • GKU • Open Library • Manterawu
              </span>
            </div>
          </div>

          {/* Kategori Alat */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Kategori Alat
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/catalog" className="hover:text-indigo-600 transition">
                  Perangkat IoT & Elektronika
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-indigo-600 transition">
                  Komputer & Multimedia
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-indigo-600 transition">
                  Perlengkapan Akademik & Lab
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-indigo-600 transition">
                  Perlengkapan Acara Kampus
                </Link>
              </li>
            </ul>
          </div>

          {/* Layanan Penyewa */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Layanan Penyewa
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/rentals/request" className="hover:text-indigo-600 transition">
                  Pengajuan & Booking Alat
                </Link>
              </li>
              <li>
                <Link href="/payments" className="hover:text-indigo-600 transition">
                  Pembayaran & Escrow
                </Link>
              </li>
              <li>
                <Link href="/handover" className="hover:text-indigo-600 transition">
                  Serah Terima & Pengembalian
                </Link>
              </li>
              <li>
                <Link href="/rentals/cancellation" className="hover:text-indigo-600 transition">
                  Pembatalan & No-Show
                </Link>
              </li>
              <li>
                <Link href="/disputes" className="hover:text-indigo-600 transition">
                  Klaim Deposit & Sengketa
                </Link>
              </li>
            </ul>
          </div>

          {/* Panel Pemilik & Akun */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Pemilik & Akun
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/owner/items" className="hover:text-indigo-600 transition">
                  Sewakan Alat & Paketmu
                </Link>
              </li>
              <li>
                <Link href="/owner/wallet" className="hover:text-indigo-600 transition">
                  Saldo & Penarikan Dana
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-indigo-600 transition">
                  Ulasan & Reputasi Mahasiswa
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-indigo-600 transition">
                  Portal Administrator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>SewaKit &copy; 2026 — Platform Sewa Alat Penunjang Kuliah Antar-Mahasiswa.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Proteksi Deposit Escrow Aktif
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
