import type { ReactNode } from "react";
import Link from "next/link";
import { DUMMY_ITEMS, type CategorySlug } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import ItemCard from "@/app/catalog/_components/ItemCard";
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
  Star,
} from "lucide-react";

const CATEGORY_TILES: {
  slug: CategorySlug;
  name: string;
  desc: string;
  icon: typeof Cpu;
}[] = [
  {
    slug: "iot-elektronika",
    name: "IoT & Elektronika",
    desc: "Oscilloscope, ESP32, Arduino, Raspberry Pi",
    icon: Cpu,
  },
  {
    slug: "komputer-multimedia",
    name: "Komputer & Multimedia",
    desc: "Kamera mirrorless, tripod, pen tablet",
    icon: Camera,
  },
  {
    slug: "akademik",
    name: "Perlengkapan Akademik",
    desc: "Kalkulator saintifik, jas lab, goggles",
    icon: FlaskConical,
  },
  {
    slug: "acara-kegiatan",
    name: "Acara & Kegiatan",
    desc: "Handy talky, proyektor, kabel",
    icon: Radio,
  },
];

const CAMPUS_COD_ZONES = [
  { name: "Lobi Gedung TULT", detail: "Ada CCTV & meja inspeksi" },
  { name: "Selasar GKU", detail: "Area publik utama" },
  { name: "Open Library Lt. 5", detail: "Gedung Manterawu" },
  { name: "Student Center", detail: "Pos kegiatan mahasiswa" },
];

const HOW_IT_WORKS = [
  {
    title: "Pilih & ajukan",
    desc: "Tentukan tanggal sewa. Jadwalnya kami tahan 24 jam sambil menunggu pemilik.",
  },
  {
    title: "Bayar sewa + deposit",
    desc: "Setelah disetujui, bayar dalam 2 jam lewat QRIS atau virtual account.",
  },
  {
    title: "Ketemu di kampus",
    desc: "Cek kondisi alat bersama, lalu konfirmasi pakai kode serah terima.",
  },
  {
    title: "Kembalikan & beri ulasan",
    desc: "Deposit kembali otomatis setelah checklist pengembalian disetujui.",
  },
];

const ROLE_ACCORDION_ITEMS: AccordionItemData[] = [
  {
    id: 101,
    title: "Untuk mahasiswa yang menyewa",
    tag: "Penyewa",
    icon: <UserCheck className="size-4 text-clay" strokeWidth={1.75} />,
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
    title: "Untuk pemilik alat",
    tag: "Pemilik",
    icon: <Wallet className="size-4 text-forest" strokeWidth={1.75} />,
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
    title: "Moderasi & akun",
    tag: "Admin",
    icon: <SlidersHorizontal className="size-4 text-ink" strokeWidth={1.75} />,
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

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-clay">{eyebrow}</p>
        <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[2rem] sm:leading-tight">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export default function HomePage() {
  const featuredItems = DUMMY_ITEMS.slice(0, 6);
  const heroMain = DUMMY_ITEMS[0];
  const heroSide = [
    DUMMY_ITEMS.find((it) => it.category === "komputer-multimedia"),
    DUMMY_ITEMS.find((it) => it.category === "acara-kegiatan"),
  ].filter((it): it is (typeof DUMMY_ITEMS)[number] => Boolean(it));

  const categoryTiles = CATEGORY_TILES.map((cat) => {
    const items = DUMMY_ITEMS.filter((it) => it.category === cat.slug);
    return { ...cat, count: items.length, cover: items[0] };
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* 1. HERO */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-20">
          {/* Teks */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink-2">
              <ShieldCheck className="size-3.5 text-forest" aria-hidden />
              Khusus mahasiswa Telkom University
            </p>

            <h1 className="mt-6 text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.6rem]">
              Sewa alat kuliah dari teman sekampus,{" "}
              <span className="text-clay">tanpa harus beli baru.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Oscilloscope untuk praktikum, kamera untuk tugas video, sampai HT
              untuk kepanitiaan. Pesan di sini, ambil langsung di area kampus.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-clay"
              >
                Cari alat
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/owner/items"
                className="inline-flex h-12 items-center rounded-full border border-line bg-white px-6 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Sewakan alatmu
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
              <div>
                <dt className="text-xs text-muted">Jadwal ditahan</dt>
                <dd className="tabular mt-1 text-xl font-semibold tracking-tight">24 jam</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Deposit</dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight">Dijamin</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Titik COD</dt>
                <dd className="tabular mt-1 text-xl font-semibold tracking-tight">
                  {CAMPUS_COD_ZONES.length} lokasi
                </dd>
              </div>
            </dl>
          </div>

          {/* Mosaik foto produk */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
            <Link
              href={`/catalog/${heroMain.id}`}
              className="group relative col-span-2 overflow-hidden rounded-3xl bg-sand sm:col-span-1 sm:row-span-2"
            >
              <img
                src={heroMain.imageUrl}
                alt={heroMain.name}
                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] sm:aspect-auto"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3 backdrop-blur-sm">
                <p className="line-clamp-1 text-sm font-semibold text-ink">{heroMain.name}</p>
                <div className="mt-0.5 flex items-center justify-between text-xs text-muted">
                  <span>
                    <span className="tabular font-semibold text-ink">
                      {formatRupiah(heroMain.pricePerDay)}
                    </span>{" "}
                    / hari
                  </span>
                  {heroMain.rating !== null && (
                    <span className="inline-flex items-center gap-1 text-ink">
                      <Star className="size-3 fill-clay text-clay" aria-hidden />
                      <span className="tabular">{heroMain.rating.toFixed(1)}</span>
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {heroSide.map((item) => (
              <Link
                key={item.id}
                href={`/catalog/${item.id}`}
                className="group relative overflow-hidden rounded-3xl bg-sand"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="aspect-square h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
                <span className="tabular absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
                  {formatRupiah(item.pricePerDay)}
                  <span className="font-normal text-muted"> / hari</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. KATEGORI */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Kategori"
          title="Cari berdasarkan kebutuhan kuliahmu"
          action={
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              Semua kategori
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          }
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categoryTiles.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-white p-2 transition-[border-color,box-shadow] duration-200 hover:border-ink/40 hover:shadow-[0_12px_32px_-18px_rgba(20,20,19,0.25)]"
              >
                <div className="relative aspect-[5/3] overflow-hidden rounded-xl bg-sand">
                  {cat.cover && (
                    <img
                      src={cat.cover.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                  )}
                  <span className="absolute left-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-white/95 text-ink backdrop-blur-sm">
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 px-2.5 pb-2 pt-3.5">
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-ink sm:text-[15px]">
                      {cat.name}
                    </h3>
                    <p className="mt-0.5 hidden text-xs leading-relaxed text-muted sm:block">{cat.desc}</p>
                  </div>
                  <span className="tabular shrink-0 rounded-full bg-paper px-2 py-0.5 text-xs font-medium text-ink-2">
                    {cat.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. ALAT POPULER */}
      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="Siap diambil minggu ini"
            title="Paling sering disewa"
            action={
              <Link
                href="/catalog"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                Lihat {DUMMY_ITEMS.length} alat
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            }
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CARA KERJA + TITIK COD */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Cara kerja" title="Dari pesan sampai deposit kembali" />

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.title} className="bg-white p-5 sm:p-6">
              <span className="tabular flex size-7 items-center justify-center rounded-full bg-paper text-xs font-semibold text-ink">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
              <MapPin className="size-4" aria-hidden />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-ink">Titik serah terima resmi</h3>
              <p className="text-xs text-muted">Area publik yang ramai dan terpantau.</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2">
            {CAMPUS_COD_ZONES.map((zone) => (
              <li
                key={zone.name}
                title={zone.detail}
                className="rounded-full border border-line bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink-2"
              >
                {zone.name}
              </li>
            ))}
          </ul>
          <Link
            href="/handover"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Aturan COD
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* 5. DETAIL PROTOKOL & PORTAL PERAN */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="mb-5">
              <p className="text-sm font-medium text-clay">Keamanan transaksi</p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-ink">
                Bagaimana uang dan barangmu dilindungi
              </h2>
            </div>
            <AccordionApp items={SEWAKIT_ACCORDION_ITEMS} defaultOpenId={1} />
          </div>

          <div>
            <div className="mb-5">
              <p className="text-sm font-medium text-forest">Mulai dari peranmu</p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-ink">
                Penyewa, pemilik, atau admin
              </h2>
            </div>
            <AccordionApp items={ROLE_ACCORDION_ITEMS} defaultOpenId={101} />

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
              <Clock className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">Semua akun terverifikasi NIM.</span>{" "}
                Deposit ditahan sistem dan dikembalikan otomatis setelah checklist
                pengembalian disetujui kedua pihak.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
