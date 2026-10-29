import Link from "next/link";
import { MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#DCD8CE] bg-[#141413] text-[#A09D95] mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C83E2B] font-mono text-xs font-bold text-white">
                SK
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-[#F6F5F0] block leading-none">
                  SewaKit
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                  Campus Equipment Exchange
                </span>
              </div>
            </div>
            <p className="text-sm text-[#A09D95] leading-relaxed max-w-sm">
              Infrastruktur sewa-menyewa alat praktikum, perangkat IoT, instrumen laboratorium, dan perlengkapan riset antar mahasiswa Telkom University dengan proteksi rekber (escrow).
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[#2A2927] bg-[#1D1D1B] px-2.5 py-1 text-[#D5D2CA]">
                <MapPin className="size-3 text-[#C83E2B]" />
                TULT • GKU • Open Library • Student Center
              </span>
            </div>
          </div>

          {/* Katalog */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#F6F5F0] mb-4">
              Kategori Inventaris
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/catalog" className="hover:text-[#F6F5F0] transition">
                  Perangkat IoT & Mikrokontroler
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#F6F5F0] transition">
                  Kamera & Multimedia
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#F6F5F0] transition">
                  Instrumen Pengukuran Lab
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#F6F5F0] transition">
                  Logistik Acara & Kepanitiaan
                </Link>
              </li>
            </ul>
          </div>

          {/* Alur Penyewa */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#F6F5F0] mb-4">
              Transaksi Penyewa
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/rentals/request" className="hover:text-[#F6F5F0] transition">
                  Booking & Hold 24 Jam
                </Link>
              </li>
              <li>
                <Link href="/payments" className="hover:text-[#F6F5F0] transition">
                  Pembayaran Xendit Sandbox
                </Link>
              </li>
              <li>
                <Link href="/handover" className="hover:text-[#F6F5F0] transition">
                  Protokol Serah Terima COD
                </Link>
              </li>
              <li>
                <Link href="/disputes" className="hover:text-[#F6F5F0] transition">
                  Manajemen Deposit & Klaim
                </Link>
              </li>
              <li>
                <Link href="/rentals/cancellation" className="hover:text-[#F6F5F0] transition">
                  Pembatalan & No-Show
                </Link>
              </li>
            </ul>
          </div>

          {/* Pemilik & Admin */}
          <div>
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#F6F5F0] mb-4">
              Pemilik & Moderasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/owner/items" className="hover:text-[#F6F5F0] transition">
                  Kelola Barang Sewaan
                </Link>
              </li>
              <li>
                <Link href="/owner/wallet" className="hover:text-[#F6F5F0] transition">
                  Dompet & Pencairan Dana
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#F6F5F0] transition">
                  Reputasi & Ulasan Dua Arah
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-[#F6F5F0] transition">
                  Dashboard Admin
                </Link>
              </li>
              <li>
                <Link href="/admin/categories" className="hover:text-[#F6F5F0] transition">
                  Master Kategori Alat
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#262523] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78756F]">
          <p className="font-mono">
            © 2026 SEWAKIT — S1 TEKNOLOGI INFORMASI, TELKOM UNIVERSITY.
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#D5D2CA]">
            <ShieldCheck className="size-4 text-[#C83E2B]" />
            <span>ESCROW PROTECTED • NIM VERIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
