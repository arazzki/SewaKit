import Link from "next/link";
import { DUMMY_ITEMS, getCategoryName } from "@/data/dummyItems";
import ItemThumbnail from "@/app/catalog/_components/ItemThumbnail";
import {
  AccordionApp,
  SEWAKIT_ACCORDION_ITEMS,
  type AccordionItemData,
} from "@/components/watermelon/card-split-accordian";
import {
  ArrowUpRight,
  Cpu,
  Camera,
  FlaskConical,
  Radio,
  Wallet,
  SlidersHorizontal,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

const CATEGORIES_LIST = [
  {
    name: "Perangkat IoT & Elektronika",
    code: "CAT-01",
    desc: "ESP32, Arduino, Oscilloscope, Logic Analyzer, Solder Station, dan kit sensor.",
    count: "14 Unit",
    icon: Cpu,
  },
  {
    name: "Komputer & Multimedia",
    code: "CAT-02",
    desc: "Kamera Mirrorless, Proyektor HDMI, Tripod, Drawing Tablet, dan Audio Recorder.",
    count: "9 Unit",
    icon: Camera,
  },
  {
    name: "Instrumen Akademik & Lab",
    code: "CAT-03",
    desc: "Kalkulator Saintifik/Grafik, Jas Lab, Kacamata Safety, dan modul praktikum.",
    count: "18 Unit",
    icon: FlaskConical,
  },
  {
    name: "Logistik Acara & Kepanitiaan",
    code: "CAT-04",
    desc: "Handy Talky (HT), Sound System Portable, Kabel Roll 25m, dan proyektor aula.",
    count: "11 Unit",
    icon: Radio,
  },
];

const ROLE_ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 101,
    title: "Alur Mahasiswa Penyewa (Renter Flow)",
    tag: "01 / RENTER WORKSPACE",
    icon: <UserCheck className="size-4 text-[#C83E2B]" />,
    content:
      "Cari alat praktikum yang tersedia, kunci jadwal selama 24 jam agar tidak diserobot, bayar sewa beserta deposit jaminan via Xendit Sandbox, dan lakukan serah terima COD di area kampus.",
    links: [
      { label: "Katalog Alat", href: "/catalog" },
      { label: "Pengajuan & Hold 24J", href: "/rentals/request" },
      { label: "Pembayaran Xendit", href: "/payments" },
      { label: "Serah Terima COD", href: "/handover" },
      { label: "Deposit & Sengketa", href: "/disputes" },
      { label: "Pembatalan & No-Show", href: "/rentals/cancellation" },
    ],
  },
  {
    id: 102,
    title: "Panel Pemilik Alat (Owner Workspace)",
    tag: "02 / OWNER WORKSPACE",
    icon: <Wallet className="size-4 text-[#1B4332]" />,
    content:
      "Monetisasi alat praktikum atau kamera yang sedang menganggur di kos. Atur tarif harian, nilai deposit jaminan, setujui atau tolak permintaan sewa, serta tarik saldo pendapatan ke rekening bank.",
    links: [
      { label: "Kelola Barang Sewaan", href: "/owner/items" },
      { label: "Dompet & Penarikan Dana", href: "/owner/wallet" },
      { label: "Tinjau Pengajuan Masuk", href: "/rentals/request" },
      { label: "Ulasan Dua Arah", href: "/reviews" },
    ],
  },
  {
    id: 103,
    title: "Moderasi, Kategori & Akun (Admin & Auth)",
    tag: "03 / GOVERNANCE & IDENTITY",
    icon: <SlidersHorizontal className="size-4 text-[#141413]" />,
    content:
      "Verifikasi identitas mahasiswa berbasis NIM Telkom University, pengelolaan kategori inventaris kampus, pemantauan metrik transaksi mingguan, dan mediasi klaim sengketa deposit.",
    links: [
      { label: "Dashboard Admin", href: "/admin/dashboard" },
      { label: "Kelola Kategori", href: "/admin/categories" },
      { label: "Profil Mahasiswa", href: "/profile" },
      { label: "Notifikasi Sistem", href: "/notifications" },
      { label: "Login / Register", href: "/auth/login" },
    ],
  },
];

export default function HomePage() {
  const featuredItems = DUMMY_ITEMS.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#141413]">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="border-b border-[#DCD8CE] bg-[#F6F5F0]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Editorial Headline & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#DCD8CE] bg-white px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#C83E2B]" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-[#575653]">
                  TELKOM UNIVERSITY • PEER-TO-PEER LAB EXCHANGE
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#141413] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                Sewa alat praktikum & riset kampus,{" "}
                <span className="underline decoration-[#C83E2B] decoration-2 underline-offset-8">
                  tanpa beli baru.
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[#575653] sm:text-lg">
                Pinjam mikrokontroler IoT, oscilloscope, kamera mirrorless, hingga HT kepanitiaan langsung dari sesama mahasiswa Telkom University. Dilindungi sistem penahanan jadwal 24 jam, rekening bersama (escrow), dan serah terima COD di titik kampus.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#141413] px-6 py-3.5 text-sm font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
                >
                  <span>Eksplorasi Katalog Alat</span>
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/rentals/request"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#141413] bg-white px-5 py-3.5 text-sm font-medium text-[#141413] transition hover:bg-[#EFECE6]"
                >
                  <span>Ajukan Booking Sekarang</span>
                </Link>
                <Link
                  href="/owner/items"
                  className="inline-flex items-center gap-1.5 px-3 py-2 font-mono text-xs font-medium text-[#575653] underline underline-offset-4 hover:text-[#141413]"
                >
                  <span>Sewakan Alat Milikmu →</span>
                </Link>
              </div>

              {/* Specification Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 border-t border-[#DCD8CE] pt-6 sm:max-w-xl">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#78756F] block">
                    Hold Jadwal
                  </span>
                  <span className="mt-1 block font-mono text-2xl font-bold text-[#141413]">
                    24 Jam
                  </span>
                  <span className="text-xs text-[#575653]">Anti-bentrok tanggal</span>
                </div>
                <div className="border-l border-[#DCD8CE] pl-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#78756F] block">
                    Batas Bayar
                  </span>
                  <span className="mt-1 block font-mono text-2xl font-bold text-[#C83E2B]">
                    120 Menit
                  </span>
                  <span className="text-xs text-[#575653]">Via Xendit Escrow</span>
                </div>
                <div className="border-l border-[#DCD8CE] pl-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#78756F] block">
                    Titik COD
                  </span>
                  <span className="mt-1 block font-mono text-2xl font-bold text-[#1B4332]">
                    5 Lokasi
                  </span>
                  <span className="text-xs text-[#575653]">Area dalam kampus</span>
                </div>
              </div>
            </div>

            {/* Right Column: Watermelon Card Split Accordion (Interactive Protocol) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#DCD8CE] bg-[#EFECE6]/80 p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between border-b border-[#DCD8CE] pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#C83E2B] font-semibold block">
                      INTERACTIVE SYSTEM PROTOCOL
                    </span>
                    <h2 className="text-base font-bold text-[#141413]">
                      Arsitektur Transaksi & Proteksi SewaKit
                    </h2>
                  </div>
                  <span className="rounded-md border border-[#DCD8CE] bg-white px-2 py-1 font-mono text-[10px] text-[#575653]">
                    Klik untuk detail
                  </span>
                </div>

                <AccordionApp items={SEWAKIT_ACCORDION_ITEMS} defaultOpenId={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KATEGORI INVENTARIS KAMPUS */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-b border-[#DCD8CE]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#78756F]">
              01 / KLASIFIKASI PERALATAN
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#141413] sm:text-3xl">
              Kategori Inventaris Kampus
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#141413] hover:text-[#C83E2B]"
          >
            <span>Lihat Semua Kategori</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES_LIST.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.code}
                href="/catalog"
                className="group flex flex-col justify-between rounded-2xl border border-[#DCD8CE] bg-white p-6 transition hover:border-[#141413] hover:shadow-[0_10px_28px_-12px_rgba(20,20,19,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2DFD7] bg-[#F6F5F0] text-[#141413] transition group-hover:bg-[#141413] group-hover:text-[#F6F5F0] group-hover:border-[#141413]">
                      <IconComponent className="size-5" />
                    </div>
                    <span className="font-mono text-[11px] text-[#78756F]">
                      {cat.code} • {cat.count}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#141413] group-hover:text-[#C83E2B] transition">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#575653]">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#EFECE6] pt-3 font-mono text-[11px] font-medium text-[#141413]">
                  <span>Buka Katalog</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. KATALOG ALAT POPULER */}
      <section className="mx-auto max-w-7xl px-6 py-16 border-b border-[#DCD8CE]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#78756F]">
              02 / SIAP DISEWA HARI INI
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#141413] sm:text-3xl">
              Peralatan Praktikum & Multimedia Terpopuler
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-xl border border-[#141413] bg-white px-4 py-2.5 text-xs font-medium text-[#141413] hover:bg-[#141413] hover:text-white transition"
          >
            <span>Buka Seluruh Katalog ({DUMMY_ITEMS.length} Alat)</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => {
            const isAvailable = item.unitsAvailable > 0;
            return (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white transition hover:border-[#141413]"
              >
                {/* Visual Header */}
                <Link href={`/catalog/${item.id}`} className="relative block border-b border-[#EFECE6]">
                  <ItemThumbnail
                    name={item.name}
                    category={item.category}
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                        isAvailable
                          ? "border-[#1B4332]/20 bg-[#E9F3ED] text-[#1B4332]"
                          : "border-[#DCD8CE] bg-[#F6F5F0] text-[#575653]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isAvailable ? "bg-[#1B4332]" : "bg-[#78756F]"
                        }`}
                      />
                      {isAvailable ? `Tersedia (${item.unitsAvailable})` : "Sedang Disewa"}
                    </span>
                  </div>
                  {item.rating && (
                    <div className="absolute top-3 right-3 z-20 rounded-md border border-[#DCD8CE] bg-white/95 px-2 py-1 font-mono text-[11px] font-semibold text-[#141413]">
                      ★ {item.rating.toFixed(1)}
                    </div>
                  )}
                </Link>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#78756F] mb-1.5">
                    <span className="truncate">{getCategoryName(item.category)}</span>
                    <span className="shrink-0">{item.codLocation}</span>
                  </div>

                  <Link
                    href={`/catalog/${item.id}`}
                    className="text-base font-bold text-[#141413] group-hover:text-[#C83E2B] transition line-clamp-1"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-1.5 text-xs text-[#575653] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Owner Meta */}
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-[#EFECE6] bg-[#F9F8F5] px-3 py-2 text-xs">
                    <div className="truncate">
                      <span className="font-semibold text-[#141413]">{item.ownerName}</span>
                      <span className="text-[#78756F]"> • Kondisi {item.condition}</span>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#1B4332] font-semibold">
                      NIM Verified
                    </span>
                  </div>

                  {/* Price & Actions */}
                  <div className="mt-5 pt-4 border-t border-[#EFECE6] flex items-end justify-between gap-3">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
                        Tarif Sewa / Hari
                      </span>
                      <span className="font-mono text-lg font-bold text-[#141413]">
                        {formatRupiah(item.pricePerDay)}
                      </span>
                      <span className="block font-mono text-[10px] text-[#575653]">
                        Deposit: {formatRupiah(item.deposit)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/catalog/${item.id}`}
                        className="rounded-xl border border-[#DCD8CE] bg-white px-3 py-2 text-xs font-medium text-[#141413] hover:border-[#141413] transition"
                      >
                        Detail
                      </Link>
                      <Link
                        href="/rentals/request"
                        className="rounded-xl bg-[#141413] px-3.5 py-2 text-xs font-medium text-[#F6F5F0] hover:bg-[#C83E2B] transition"
                      >
                        Sewa
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WORKSPACE PORTAL DENGAN CARD-SPLIT-ACCORDIAN */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C83E2B] font-semibold">
              03 / NAVIGASI MODUL TERINTEGRASI
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[#141413] sm:text-3xl">
              Akses Cepat Berdasarkan Peran Pengguna
            </h2>
            <p className="text-sm leading-relaxed text-[#575653]">
              Seluruh ekosistem SewaKit dirancang untuk tiga peran utama: Mahasiswa Penyewa, Pemilik Alat, dan Tim Moderasi Kampus. Pilih kartu di samping untuk membuka tautan langsung ke setiap modul.
            </p>

            <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#141413]">
                <CheckCircle2 className="size-4 text-[#1B4332]" />
                <span>Titik Pertemuan COD Resmi Kampus</span>
              </div>
              <p className="text-xs text-[#575653] leading-relaxed">
                Serah terima alat hanya dilakukan di area publik kampus yang terpantau CCTV: Lobi Gedung TULT, Selasar GKU, Perpustakaan Open Library (Manterawu Lt. 5), dan Student Center.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#DCD8CE] bg-[#EFECE6]/80 p-5 sm:p-7">
              <AccordionApp items={ROLE_ACCORDION_ITEMS} defaultOpenId={101} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
