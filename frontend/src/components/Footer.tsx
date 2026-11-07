import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#262523] bg-[#141413] text-[#A09D95]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Standardized Dark-Theme Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" theme="dark" showTagline />
            <p className="max-w-sm text-sm leading-relaxed text-[#A09D95]">
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
            <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#F6F5F0]">
              Kategori Inventaris
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/catalog" className="transition hover:text-[#F6F5F0]">
                  Perangkat IoT &amp; Mikrokontroler
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="transition hover:text-[#F6F5F0]">
                  Kamera &amp; Multimedia
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="transition hover:text-[#F6F5F0]">
                  Instrumen Pengukuran Lab
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="transition hover:text-[#F6F5F0]">
                  Logistik Acara &amp; Kepanitiaan
                </Link>
              </li>
            </ul>
          </div>

          {/* Alur Penyewa */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#F6F5F0]">
              Transaksi Penyewa
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/rentals/request" className="transition hover:text-[#F6F5F0]">
                  Booking &amp; Hold 24 Jam
                </Link>
              </li>
              <li>
                <Link href="/payments" className="transition hover:text-[#F6F5F0]">
                  Pembayaran Xendit Sandbox
                </Link>
              </li>
              <li>
                <Link href="/handover" className="transition hover:text-[#F6F5F0]">
                  Protokol Serah Terima COD
                </Link>
              </li>
              <li>
                <Link href="/disputes" className="transition hover:text-[#F6F5F0]">
                  Manajemen Deposit &amp; Klaim
                </Link>
              </li>
              <li>
                <Link href="/rentals/cancellation" className="transition hover:text-[#F6F5F0]">
                  Pembatalan &amp; No-Show
                </Link>
              </li>
            </ul>
          </div>

          {/* Pemilik & Admin */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#F6F5F0]">
              Pemilik &amp; Moderasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/owner/items" className="transition hover:text-[#F6F5F0]">
                  Kelola Barang Sewaan
                </Link>
              </li>
              <li>
                <Link href="/owner/wallet" className="transition hover:text-[#F6F5F0]">
                  Dompet &amp; Pencairan Dana
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="transition hover:text-[#F6F5F0]">
                  Reputasi &amp; Ulasan Dua Arah
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="transition hover:text-[#F6F5F0]">
                  Dashboard Admin
                </Link>
              </li>
              <li>
                <Link href="/admin/categories" className="transition hover:text-[#F6F5F0]">
                  Master Kategori Alat
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#262523] pt-6 text-xs text-[#78756F] sm:flex-row">
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
