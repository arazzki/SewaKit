import Link from "next/link";
import { DUMMY_ITEMS, getCategoryName } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import ItemCard from "@/app/catalog/_components/ItemCard";
import Badge from "@/components/ui/badge";
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
  MapPin,
  ShieldCheck,
  Clock,
  ScanLine,
  Star,
} from "lucide-react";

const CATEGORIES_BENTO = [
  {
    name: "Perangkat IoT & Elektronika",
    slug: "iot-elektronika",
    code: "CAT-01",
    desc: "Oscilloscope Rigol, ESP32, Arduino R3, Raspberry Pi 4, dan instrumen ukur.",
    count: "6 SKU Aktif",
    icon: Cpu,
  },
  {
    name: "Komputer & Multimedia",
    slug: "komputer-multimedia",
    code: "CAT-02",
    desc: "Kamera Mirrorless Sony A6400, Tripod Fluid-Head, dan Pen Tablet Grafis.",
    count: "3 SKU Aktif",
    icon: Camera,
  },
  {
    name: "Instrumen Akademik & Lab",
    slug: "akademik",
    code: "CAT-03",
    desc: "Kalkulator Saintifik 552 Fungsi, Jas Lab Oxford Steril, dan Safety Goggles.",
    count: "2 SKU Aktif",
    icon: FlaskConical,
  },
  {
    name: "Logistik Acara & Kepanitiaan",
    slug: "acara-kegiatan",
    code: "CAT-04",
    desc: "Handy Talky Dual-Band Sepasang, Proyektor Full HD 3.000 Lumen, dan kabel.",
    count: "2 SKU Aktif",
    icon: Radio,
  },
];

const CAMPUS_COD_ZONES = [
  { code: "COD-01", name: "Lobi Gedung TULT", detail: "CCTV 24J • Meja Inspeksi" },
  { code: "COD-02", name: "Selasar GKU", detail: "Area Publik Utama" },
  { code: "COD-03", name: "Open Library Lt. 5", detail: "Gedung Manterawu" },
  { code: "COD-04", name: "Student Center", detail: "Pos Kegiatan Mahasiswa" },
];

const ROLE_ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 101,
    title: "Alur Mahasiswa Penyewa (Renter Workspace)",
    tag: "01 / RENTER FLOW",
    icon: <UserCheck className="size-4 text-[#C83E2B]" strokeWidth={1.75} />,
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
    title: "Panel Pemilik Alat (Merchant Console)",
    tag: "02 / OWNER WORKSPACE",
    icon: <Wallet className="size-4 text-[#1B4332]" strokeWidth={1.75} />,
    content:
      "Monetisasi instrumen praktikum atau kamera yang sedang menganggur di kos. Atur tarif harian, nilai deposit jaminan, setujui permintaan sewa, serta tarik saldo pendapatan ke rekening bank.",
    links: [
      { label: "Kelola Barang Sewaan", href: "/owner/items" },
      { label: "Dompet & Penarikan Dana", href: "/owner/wallet" },
      { label: "Tinjau Pengajuan Masuk", href: "/rentals/request" },
      { label: "Ulasan Dua Arah", href: "/reviews" },
    ],
  },
  {
    id: 103,
    title: "Moderasi, Kategori & Akun (Governance)",
    tag: "03 / PLATFORM OPS",
    icon: <SlidersHorizontal className="size-4 text-[#141413]" strokeWidth={1.75} />,
    content:
      "Verifikasi identitas mahasiswa berbasis NIM Telkom University, pengelolaan taksonomi inventaris kampus, pemantauan audit trail transaksi, dan mediasi klaim sengketa deposit.",
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
  const spotlightItem = DUMMY_ITEMS[0];
  const featuredItems = DUMMY_ITEMS.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#141413]">
      {/* 1. BENTO GRID HERO ARCHITECTURE */}
      <section className="border-b border-[#DCD8CE] bg-[#F6F5F0]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Primary Editorial Hero Tile (7 Columns) */}
            <div className="bg-tech-grid flex flex-col justify-between rounded-2xl border border-[#DCD8CE] bg-white p-6 sm:p-8 lg:col-span-7">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="available" dot>
                    CIVITAS TELKOM UNIVERSITY TERVERIFIKASI
                  </Badge>
                  <span className="rounded-md border border-[#DCD8CE] bg-[#F6F5F0] px-2 py-0.5 font-mono text-[10px] font-medium text-[#575653]">
                    ESCROW REKBER XENDIT
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[#141413] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1]">
                  Infrastruktur sewa alat praktikum &amp; riset kampus,{" "}
                  <span className="underline decoration-[#C83E2B] decoration-2 underline-offset-6">
                    tanpa beli baru.
                  </span>
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-[#575653] sm:text-base">
                  Pinjam oscilloscope, board IoT ESP32, kamera mirrorless, hingga HT kepanitiaan langsung dari sesama mahasiswa Telkom University. Dilengkapi penahanan jadwal 24 jam, proteksi deposit escrow, dan protokol inspeksi fisik COD.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href="/catalog"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#141413] px-5 text-sm font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
                  >
                    <span>Eksplorasi Katalog Alat</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <Link
                    href="/rentals/request"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 text-sm font-medium text-[#141413] transition hover:border-[#141413] hover:bg-white"
                  >
                    <Clock className="size-4 text-[#C83E2B]" />
                    <span>Booking &amp; Hold 24 Jam</span>
                  </Link>
                  <Link
                    href="/owner/items"
                    className="inline-flex h-11 items-center px-2 font-mono text-xs font-semibold text-[#575653] underline underline-offset-4 transition hover:text-[#141413]"
                  >
                    Sewakan Alatmu →
                  </Link>
                </div>
              </div>

              {/* Tabular Specification Metrics Strip */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#EFECE6] pt-6 sm:grid-cols-4">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                    Hold Jadwal
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-[#141413]">
                    24 Jam
                  </span>
                  <span className="text-[11px] text-[#575653]">Anti-bentrok kalender</span>
                </div>
                <div className="border-l border-[#EFECE6] pl-4">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                    Batas Bayar
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-[#C83E2B]">
                    120 Menit
                  </span>
                  <span className="text-[11px] text-[#575653]">QRIS &amp; Virtual Account</span>
                </div>
                <div className="border-t border-[#EFECE6] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                    Titik COD
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-[#1B4332]">
                    5 Gedung
                  </span>
                  <span className="text-[11px] text-[#575653]">Area pantauan CCTV</span>
                </div>
                <div className="border-l border-t border-[#EFECE6] pl-4 pt-3 sm:border-t-0 sm:pt-0">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                    Inspeksi COD
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-[#141413]">
                    OTP 6-Digit
                  </span>
                  <span className="text-[11px] text-[#575653]">Checklist 2 arah</span>
                </div>
              </div>
            </div>

            {/* Secondary Bento Stack (5 Columns) */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              {/* Spotlight Hardware Unit Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white">
                <div className="relative h-48 w-full overflow-hidden border-b border-[#EFECE6] bg-[#EFECE6]">
                  <img
                    src={spotlightItem.imageUrl}
                    alt={spotlightItem.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/70 via-[#141413]/15 to-transparent" />
                  <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                    <Badge variant="dark">UNIT SOROTAN LAB</Badge>
                    <Badge variant="available" dot>
                      Siap COD Hari Ini
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2DFD7]">
                        {spotlightItem.sku} • {getCategoryName(spotlightItem.category)}
                      </span>
                      <h2 className="text-sm font-bold leading-snug sm:text-base">
                        {spotlightItem.name}
                      </h2>
                    </div>
                    {spotlightItem.rating && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded bg-white/95 px-2 py-0.5 font-mono text-[11px] font-bold text-[#141413]">
                        <Star className="size-3 fill-[#C83E2B] text-[#C83E2B]" />
                        {spotlightItem.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-[#78756F]">
                        Tarif Harian
                      </span>
                      <span className="font-mono text-base font-bold text-[#141413]">
                        {formatRupiah(spotlightItem.pricePerDay)}
                      </span>
                    </div>
                    <div className="h-7 w-px bg-[#EFECE6]" />
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-[#78756F]">
                        Titik Ambil
                      </span>
                      <span className="text-xs font-semibold text-[#141413]">
                        {spotlightItem.codLocation}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/catalog/${spotlightItem.id}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#141413] bg-[#141413] px-3.5 text-xs font-medium text-[#F6F5F0] transition hover:border-[#C83E2B] hover:bg-[#C83E2B]"
                  >
                    <span>Lihat Datasheet</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Campus COD Zone Bento Tile */}
              <div className="flex-1 rounded-2xl border border-[#DCD8CE] bg-white p-5">
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ScanLine className="size-4 text-[#C83E2B]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413]">
                      Zona Serah Terima COD Resmi Kampus
                    </h3>
                  </div>
                  <Link
                    href="/handover"
                    className="font-mono text-[11px] font-semibold text-[#C83E2B] hover:underline"
                  >
                    Protokol COD →
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CAMPUS_COD_ZONES.map((zone) => (
                    <div
                      key={zone.code}
                      className="flex items-start gap-2.5 rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-2.5"
                    >
                      <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#1B4332]" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-xs font-semibold text-[#141413]">
                            {zone.name}
                          </span>
                        </div>
                        <span className="block font-mono text-[10px] text-[#78756F]">
                          {zone.code} • {zone.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KATEGORI INVENTARIS KAMPUS (BENTO 4-COL) */}
      <section className="mx-auto max-w-7xl border-b border-[#DCD8CE] px-4 py-14 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#C83E2B]">
              01 / TAKSONOMI PERANGKAT KERAS
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#141413] sm:text-3xl">
              Klasifikasi Inventaris Kampus
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#141413] transition hover:text-[#C83E2B]"
          >
            <span>Buka Filter Katalog</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES_BENTO.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.code}
                href={`/catalog?category=${cat.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[#DCD8CE] bg-white p-5 transition hover:border-[#141413] hover:shadow-[0_10px_28px_-14px_rgba(20,20,19,0.12)]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] text-[#141413] transition group-hover:border-[#141413] group-hover:bg-[#141413] group-hover:text-[#F6F5F0]">
                      <IconComponent className="size-4.5" strokeWidth={1.6} />
                    </div>
                    <span className="rounded-md border border-[#EFECE6] bg-[#FBF9F5] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#575653]">
                      {cat.code} • {cat.count}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#141413] transition group-hover:text-[#C83E2B] sm:text-base">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#575653]">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#EFECE6] pt-3 font-mono text-[11px] font-medium text-[#141413]">
                  <span>Filter Kategori</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. KATALOG INSTRUMEN & PERALATAN POPULER */}
      <section className="mx-auto max-w-7xl border-b border-[#DCD8CE] px-4 py-14 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#C83E2B]">
              02 / UNIT SIAP SERAH TERIMA COD
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#141413] sm:text-3xl">
              Instrumen Praktikum &amp; Multimedia Terpopuler
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#141413] bg-white px-4 text-xs font-medium text-[#141413] transition hover:bg-[#141413] hover:text-[#F6F5F0]"
          >
            <span>Lihat Seluruh Katalog ({DUMMY_ITEMS.length} Unit)</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 4. ARSITEKTUR PROTOKOL & NAVIGASI PERAN */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left: System Protocol Accordion */}
          <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 sm:p-6 lg:col-span-6">
            <div className="mb-4 flex items-center justify-between border-b border-[#EFECE6] pb-3.5">
              <div>
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
                  03 / PROTOKOL KEAMANAN TRANSAKSI
                </span>
                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#141413]">
                  Mekanisme Hold, Escrow &amp; Inspeksi Fisik
                </h2>
              </div>
              <Badge variant="outline">5 Tahap</Badge>
            </div>

            <AccordionApp items={SEWAKIT_ACCORDION_ITEMS} defaultOpenId={1} />
          </div>

          {/* Right: Role Workspace Portal */}
          <div className="space-y-4 lg:col-span-6">
            <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-[#EFECE6] pb-3.5">
                <div>
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#1B4332]">
                    04 / AKSES MODUL BERDASARKAN PERAN
                  </span>
                  <h2 className="mt-0.5 text-lg font-bold tracking-tight text-[#141413]">
                    Portal Penyewa, Pemilik &amp; Moderator
                  </h2>
                </div>
                <Badge variant="available">Terintegrasi</Badge>
              </div>

              <AccordionApp items={ROLE_ACCORDION_ITEMS} defaultOpenId={101} />
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-[#DCD8CE] bg-[#FBF9F5] p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1B4332]/20 bg-[#E9F3ED] text-[#1B4332]">
                <ShieldCheck className="size-4.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#141413]">
                  Jaminan Keamanan Rekber &amp; Verifikasi NIM
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#575653]">
                  Seluruh pemilik dan penyewa wajib terautentikasi melalui SSO / NIM Telkom University. Dana deposit ditahan penuh oleh sistem dan dikembalikan otomatis begitu checklist fisik pengembalian disetujui kedua belah pihak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
