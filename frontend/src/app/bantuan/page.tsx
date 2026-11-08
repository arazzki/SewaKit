import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  CreditCard,
  ShieldCheck,
  MapPin,
  RotateCcw,
  Scale,
  Wallet,
  Package,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Accordion, { type AccordionItemData } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pusat Bantuan & Aturan Sewa - SewaKit",
  description:
    "Panduan lengkap cara sewa alat, pembayaran rekber, deposit jaminan, serah terima COD di kampus, hingga mediasi kendala di SewaKit.",
};

const RENTER_FAQ_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    tag: "Jadwal & Pengajuan",
    title: "Bagaimana sistem tahan jadwal 24 jam bekerja?",
    icon: <Clock className="size-4 text-accent" strokeWidth={1.75} />,
    content:
      "Begitu kamu mengirim pengajuan sewa, tanggal yang kamu pilih langsung ditahan selama 24 jam agar tidak bisa dipesan mahasiswa lain. Jika pemilik belum merespons dalam 24 jam, pengajuan otomatis batal tanpa biaya apa pun.",
    links: [
      { label: "Cari Alat di Katalog", href: "/catalog" },
      { label: "Ajukan Sewa", href: "/rentals/request" },
    ],
  },
  {
    id: 2,
    tag: "Pembayaran Rekber",
    title: "Berapa lama batas waktu pembayaran setelah disetujui pemilik?",
    icon: <CreditCard className="size-4 text-forest" strokeWidth={1.75} />,
    content:
      "Setelah pemilik menyetujui pengajuanmu, kamu punya waktu 2 jam untuk melunasi biaya sewa beserta uang deposit melalui QRIS atau Virtual Account. Dana ditahan di rekening bersama (rekber) SewaKit sampai masa sewa selesai.",
    links: [{ label: "Simulasi Pembayaran", href: "/payments" }],
  },
  {
    id: 3,
    tag: "Serah Terima COD",
    title: "Di mana lokasi ketemuan COD dan kapan nomor WhatsApp terbuka?",
    icon: <MapPin className="size-4 text-accent" strokeWidth={1.75} />,
    content:
      "Demi privasi, nomor WhatsApp penyewa dan pemilik baru terbuka setelah pembayaran rekber terverifikasi lunas. Serah terima wajib dilakukan di 4 titik kampus resmi (Lobi Gedung TULT, Selasar GKU, Open Library Lt. 5, atau Student Center) sambil mengisi daftar cek fisik dan foto kondisi awal.",
    links: [{ label: "Panduan Serah Terima COD", href: "/handover" }],
  },
  {
    id: 4,
    tag: "Deposit Jaminan",
    title: "Kapan uang deposit saya dikembalikan?",
    icon: <ShieldCheck className="size-4 text-forest" strokeWidth={1.75} />,
    content:
      "Saat barang dikembalikan tepat waktu dan pemilik mengonfirmasi kondisi fisik sesuai foto awal, 100% uang deposit otomatis dikembalikan ke saldo penyewa dan biaya sewa diteruskan ke dompet pemilik.",
    links: [{ label: "Info Deposit & Klaim", href: "/disputes" }],
  },
  {
    id: 5,
    tag: "Pembatalan & Kendala",
    title: "Bagaimana jika saya membatalkan sewa atau pemilik tidak hadir saat COD?",
    icon: <RotateCcw className="size-4 text-ink" strokeWidth={1.75} />,
    content:
      "Pembatalan sebelum pembayaran bebas potongan. Pembatalan setelah bayar mengikuti batas waktu sebelum jam COD. Jika pemilik tidak hadir lebih dari 30 menit di titik COD yang disepakati, kamu dapat mengirim laporan absen agar dana sewa dan deposit dikembalikan penuh.",
    links: [{ label: "Aturan Pembatalan & Refund", href: "/rentals/cancellation" }],
  },
];

const OWNER_DISPUTE_FAQ_ITEMS: AccordionItemData[] = [
  {
    id: 1,
    tag: "Pemilik Alat",
    title: "Siapa saja yang boleh menyewakan alat di SewaKit?",
    icon: <Package className="size-4 text-ink" strokeWidth={1.75} />,
    content:
      "Seluruh mahasiswa aktif Telkom University yang akunnya sudah terverifikasi email kampus dan NIM dapat menyewakan alat praktikum, kamera, perangkat IoT, maupun perlengkapan kepanitiaan dari satu akun yang sama.",
    links: [{ label: "Mulai Sewakan Alat", href: "/login?redirect=/owner/items" }],
  },
  {
    id: 2,
    tag: "Pencairan Dana",
    title: "Kapan pendapatan sewa bisa ditarik ke rekening bank?",
    icon: <Wallet className="size-4 text-forest" strokeWidth={1.75} />,
    content:
      "Dana sewa langsung masuk ke Dompet Pemilik segera setelah proses pengembalian COD diselesaikan tanpa klaim kerusakan. Kamu bisa menarik saldo kapan saja ke rekening bank atau e-wallet terdaftar.",
    links: [{ label: "Dompet & Penarikan", href: "/owner/wallet" }],
  },
  {
    id: 3,
    tag: "Mediasi Sengketa",
    title: "Apa yang terjadi jika alat kembali dalam kondisi rusak atau komponen kurang?",
    icon: <Scale className="size-4 text-accent" strokeWidth={1.75} />,
    content:
      "Jangan selesaikan konfirmasi pengembalian lebih dulu - ajukan klaim langsung dari halaman serah terima dengan mengunggah foto pembanding sebelum dan sesudah sewa. Deposit akan dibekukan sementara dan Moderator Kampus akan meninjau bukti kedua pihak secara objektif.",
    links: [{ label: "Halaman Mediasi Sengketa", href: "/disputes" }],
  },
];

const QUICK_RULES = [
  {
    title: "Tahan Jadwal 24 Jam",
    detail: "Tanggal otomatis dikunci selama menunggu persetujuan pemilik.",
    badge: "Anti Bentrok",
  },
  {
    title: "Batas Bayar 2 Jam",
    detail: "Pembayaran QRIS & Virtual Account ditahan aman di rekber.",
    badge: "Rekber",
  },
  {
    title: "4 Titik COD Kampus",
    detail: "TULT, GKU, Open Library Lt. 5, dan Student Center Tel-U.",
    badge: "Wajib Cek Fisik",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <PageHeader
        eyebrow="Pusat Bantuan"
        title="Aturan Sewa, Rekber, & Perlindungan Deposit"
        description="Pelajari cara kerja peminjaman alat antar mahasiswa Telkom University supaya transaksi aman bagi penyewa maupun pemilik barang."
        actions={
          <>
            <Button href="/catalog" variant="outline">
              <span>Lihat Katalog</span>
            </Button>
            <Button href="/login?redirect=/owner/items" variant="primary">
              <span>Sewakan Alatmu</span>
              <ArrowUpRight className="size-3.5" />
            </Button>
          </>
        }
      />

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">
        {/* Ringkasan Aturan Utama */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {QUICK_RULES.map((rule) => (
            <Card key={rule.title} className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-ink">{rule.title}</h2>
                <Badge variant="neutral">{rule.badge}</Badge>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                {rule.detail}
              </p>
            </Card>
          ))}
        </div>

        {/* Dua Kolom FAQ: Penyewa & Pemilik/Mediasi */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <section className="space-y-4 lg:col-span-7">
            <div>
              <span className="text-xs font-semibold text-accent">
                Panduan Penyewa
              </span>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-ink">
                Pertanyaan Seputar Meminjam Alat
              </h2>
            </div>
            <Accordion items={RENTER_FAQ_ITEMS} defaultOpenId={1} />
          </section>

          <section className="space-y-4 lg:col-span-5">
            <div>
              <span className="text-xs font-semibold text-forest">
                Pemilik Alat &amp; Mediasi
              </span>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-ink">
                Menyewakan Barang &amp; Klaim Kondisi
              </h2>
            </div>
            <Accordion items={OWNER_DISPUTE_FAQ_ITEMS} defaultOpenId={1} />

            <Card variant="subtle" className="p-5">
              <h3 className="text-sm font-bold text-ink">
                Butuh bantuan mediasi transaksi berjalan?
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                Jika terjadi selisih kondisi fisik saat serah terima COD atau keterlambatan pengembalian, buka halaman klaim deposit agar ditinjau oleh Moderator Kampus.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button href="/disputes" size="sm">
                  <span>Buka Mediasi Deposit</span>
                  <ArrowUpRight className="size-3.5" />
                </Button>
                <Link
                  href="/#cara-kerja"
                  className="px-2 text-xs font-semibold text-ink-muted underline underline-offset-4 hover:text-ink"
                >
                  Lihat ringkasan 4 langkah →
                </Link>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
