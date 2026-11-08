import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-border bg-ink text-ink-inverse-subtle">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" theme="dark" showTagline />
            <p className="max-w-sm text-sm leading-relaxed text-ink-inverse-subtle">
              Platform sewa-menyewa alat praktikum, kamera, perangkat IoT, dan perlengkapan kepanitiaan antar mahasiswa Telkom University dengan jaminan rekber.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-border bg-ink-elevated px-2.5 py-1 text-ink-inverse-muted">
                <MapPin className="size-3.5 text-accent" />
                Titik COD: TULT • GKU • Open Library • Student Center
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold text-canvas">
              Kategori Alat
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/catalog?category=iot-elektronika" className="transition hover:text-canvas">
                  IoT &amp; Elektronika
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=komputer-multimedia" className="transition hover:text-canvas">
                  Kamera &amp; Multimedia
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=akademik" className="transition hover:text-canvas">
                  Alat Praktikum &amp; Lab
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=acara-kegiatan" className="transition hover:text-canvas">
                  Perlengkapan Kepanitiaan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold text-canvas">
              Untuk Penyewa
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/rentals/request" className="transition hover:text-canvas">
                  Ajukan Sewa Alat
                </Link>
              </li>
              <li>
                <Link href="/payments" className="transition hover:text-canvas">
                  Pembayaran Rekber
                </Link>
              </li>
              <li>
                <Link href="/handover" className="transition hover:text-canvas">
                  Serah Terima COD
                </Link>
              </li>
              <li>
                <Link href="/disputes" className="transition hover:text-canvas">
                  Deposit &amp; Sengketa
                </Link>
              </li>
              <li>
                <Link href="/rentals/cancellation" className="transition hover:text-canvas">
                  Pembatalan Sewa
                </Link>
              </li>
              <li>
                <Link href="/#cara-kerja" className="transition hover:text-canvas">
                  Cara Kerja Sewa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold text-canvas">
              Pemilik &amp; Bantuan
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/owner/requests" className="transition hover:text-canvas">
                  Permohonan Sewa Masuk
                </Link>
              </li>
              <li>
                <Link href="/owner/items" className="transition hover:text-canvas">
                  Kelola Barang Sewaan
                </Link>
              </li>
              <li>
                <Link href="/owner/wallet" className="transition hover:text-canvas">
                  Dompet &amp; Pencairan Dana
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="transition hover:text-canvas">
                  Ulasan Pengguna
                </Link>
              </li>
              <li>
                <Link href="/bantuan" className="transition hover:text-canvas">
                  Pusat Bantuan &amp; FAQ
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="transition hover:text-canvas">
                  Dashboard Moderator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-6 text-xs text-ink-subtle sm:flex-row">
          <p>
            © 2026 SewaKit - S1 Teknologi Informasi, Telkom University.
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-inverse-muted">
            <ShieldCheck className="size-4 text-accent" />
            <span>Transaksi dilindungi rekening bersama</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
