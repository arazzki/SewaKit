import Link from "next/link";
import { DUMMY_ITEMS, getCategoryName, type CategorySlug } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import ItemCard from "@/app/catalog/_components/ItemCard";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
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
  CreditCard,
  ScanLine,
  Star,
} from "lucide-react";

const CATEGORIES: {
  name: string;
  slug: CategorySlug;
  desc: string;
  icon: typeof Cpu;
}[] = [
  {
    name: "IoT & Elektronika",
    slug: "iot-elektronika",
    desc: "Oscilloscope Rigol, ESP32, Arduino R3, Raspberry Pi 4, dan alat ukur rangkaian.",
    icon: Cpu,
  },
  {
    name: "Kamera & Multimedia",
    slug: "komputer-multimedia",
    desc: "Kamera mirrorless Sony A6400, tripod video, dan pen tablet untuk tugas desain.",
    icon: Camera,
  },
  {
    name: "Praktikum & Akademik",
    slug: "akademik",
    desc: "Kalkulator saintifik, jas lab bersih, dan kacamata pelindung praktikum.",
    icon: FlaskConical,
  },
  {
    name: "Acara & Kepanitiaan",
    slug: "acara-kegiatan",
    desc: "Handy talky sepasang, proyektor Full HD, dan perlengkapan kegiatan himpunan.",
    icon: Radio,
  },
];

const CAMPUS_COD_ZONES = [
  { name: "Lobi Gedung TULT", detail: "Area lobi utama, terang & ramai" },
  { name: "Selasar GKU", detail: "Mudah dijangkau di sela jam kuliah" },
  { name: "Open Library Lt. 5", detail: "Gedung Manterawu" },
  { name: "Student Center", detail: "Dekat area kegiatan UKM & himpunan" },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    title: "Pilih Alat & Tanggal",
    desc: "Cari alat di katalog lalu ajukan tanggal sewa. Jadwal otomatis ditahan 24 jam selagi menunggu konfirmasi pemilik.",
    href: "/catalog",
    cta: "Cari di Katalog",
    icon: Clock,
  },
  {
    step: "2",
    title: "Bayar Lewat Rekber",
    desc: "Setelah disetujui pemilik, selesaikan pembayaran sewa beserta deposit jaminan dalam waktu 2 jam via QRIS atau VA.",
    href: "/payments",
    cta: "Lihat Pembayaran",
    icon: CreditCard,
  },
  {
    step: "3",
    title: "Ketemuan & Cek Fisik COD",
    desc: "Ambil barang langsung di titik COD kampus sambil mencocokkan kondisi fisik dan kelengkapan bersama pemilik.",
    href: "/handover",
    cta: "Alur Serah Terima",
    icon: ScanLine,
  },
  {
    step: "4",
    title: "Kembalikan & Deposit Cair",
    desc: "Begitu barang dikembalikan tepat waktu dengan kondisi aman, deposit kembali utuh ke penyewa dan uang sewa cair ke pemilik.",
    href: "/disputes",
    cta: "Aturan Deposit",
    icon: ShieldCheck,
  },
];

const WORKSPACE_SHORTCUTS = [
  {
    title: "Mahasiswa Penyewa",
    desc: "Ajukan sewa, cek status persetujuan, dan kelola jadwal pengambilan barang.",
    icon: UserCheck,
    links: [
      { label: "Katalog Alat", href: "/catalog" },
      { label: "Ajukan Sewa", href: "/rentals/request" },
      { label: "Pembatalan", href: "/rentals/cancellation" },
    ],
  },
  {
    title: "Pemilik Alat",
    desc: "Sewakan alat praktikum atau kamera yang jarang dipakai supaya tetap produktif.",
    icon: Wallet,
    links: [
      { label: "Barang Saya", href: "/owner/items" },
      { label: "Dompet & Penarikan", href: "/owner/wallet" },
      { label: "Ulasan", href: "/reviews" },
    ],
  },
  {
    title: "Moderator Kampus",
    desc: "Pantau transaksi berjalan, kelola kategori alat, dan bantu mediasi kendala deposit.",
    icon: SlidersHorizontal,
    links: [
      { label: "Dashboard Admin", href: "/admin/dashboard" },
      { label: "Kategori Alat", href: "/admin/categories" },
    ],
  },
];

export default function HomePage() {
  const spotlightItem = DUMMY_ITEMS[0];
  const featuredItems = DUMMY_ITEMS.slice(0, 6);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Hero */}
      <section className="border-b border-hairline bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <Card className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
              <div className="space-y-5">
                <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                  Sewa alat praktikum &amp; kegiatan kampus,{" "}
                  <span className="underline decoration-accent decoration-2 underline-offset-6">
                    tanpa harus beli baru.
                  </span>
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                  Pinjam oscilloscope, kit ESP32, kamera mirrorless, sampai HT kepanitiaan langsung dari sesama mahasiswa Tel-U. Jadwal dikunci otomatis saat pengajuan, uang deposit aman di rekber, dan serah terima dilakukan COD di area kampus.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Button href="/catalog" size="lg">
                    <span>Lihat Katalog Alat</span>
                    <ArrowUpRight className="size-4" />
                  </Button>
                  <Button
                    href="/rentals/request"
                    variant="outline"
                    size="lg"
                    className="bg-surface-subtle hover:bg-surface"
                  >
                    <Clock className="size-4 text-accent" />
                    <span>Ajukan Sewa</span>
                  </Button>
                  <Link
                    href="/owner/items"
                    className="inline-flex h-11 items-center px-2 text-xs font-semibold text-ink-muted underline underline-offset-4 transition hover:text-ink"
                  >
                    Punya alat nganggur? Sewakan →
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-surface-muted pt-6 sm:grid-cols-4">
                <div>
                  <span className="block text-xs text-ink-subtle">
                    Tahan Jadwal
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-ink">
                    24 Jam
                  </span>
                  <span className="text-xs text-ink-muted">Anti bentrok tanggal</span>
                </div>
                <div className="border-l border-surface-muted pl-4">
                  <span className="block text-xs text-ink-subtle">
                    Batas Bayar
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-accent">
                    2 Jam
                  </span>
                  <span className="text-xs text-ink-muted">QRIS &amp; Virtual Account</span>
                </div>
                <div className="border-t border-surface-muted pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <span className="block text-xs text-ink-subtle">
                    Lokasi COD
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-forest">
                    {CAMPUS_COD_ZONES.length} Titik
                  </span>
                  <span className="text-xs text-ink-muted">Di dalam area kampus</span>
                </div>
                <div className="border-l border-t border-surface-muted pl-4 pt-3 sm:border-t-0 sm:pt-0">
                  <span className="block text-xs text-ink-subtle">
                    Total Koleksi
                  </span>
                  <span className="mt-1 block font-mono text-xl font-bold text-ink">
                    {DUMMY_ITEMS.length} Alat
                  </span>
                  <span className="text-xs text-ink-muted">Siap dipakai praktikum</span>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-5 lg:col-span-5">
              {/* Spotlight Item */}
              <Card className="group relative overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden border-b border-surface-muted bg-surface-muted">
                  <img
                    src={spotlightItem.imageUrl}
                    alt={spotlightItem.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
                  <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                    <Badge variant="dark">Pilihan Minggu Ini</Badge>
                    <Badge variant="available" dot>
                      Tersedia
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white">
                    <div>
                      <span className="text-xs text-ink-inverse-muted">
                        <span className="font-mono">{spotlightItem.sku}</span> •{" "}
                        {getCategoryName(spotlightItem.category)}
                      </span>
                      <h2 className="text-sm font-bold leading-snug sm:text-base">
                        {spotlightItem.name}
                      </h2>
                    </div>
                    {spotlightItem.rating && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded bg-surface/95 px-2 py-0.5 font-mono text-xs font-bold text-ink">
                        <Star className="size-3 fill-accent text-accent" />
                        {spotlightItem.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="block text-xs text-ink-subtle">
                        Harga sewa / hari
                      </span>
                      <span className="font-mono text-base font-bold text-ink">
                        {formatRupiah(spotlightItem.pricePerDay)}
                      </span>
                    </div>
                    <div className="h-7 w-px bg-surface-muted" />
                    <div>
                      <span className="block text-xs text-ink-subtle">
                        Lokasi COD
                      </span>
                      <span className="text-xs font-semibold text-ink">
                        {spotlightItem.codLocation}
                      </span>
                    </div>
                  </div>

                  <Button href={`/catalog/${spotlightItem.id}`} size="sm">
                    <span>Lihat Detail</span>
                    <ArrowUpRight className="size-3.5" />
                  </Button>
                </div>
              </Card>

              {/* Campus COD Locations */}
              <Card className="flex-1 p-5">
                <div className="mb-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-accent" />
                    <h3 className="text-xs font-bold text-ink">
                      Titik Ketemuan COD di Kampus
                    </h3>
                  </div>
                  <Link
                    href="/handover"
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Panduan COD →
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CAMPUS_COD_ZONES.map((zone) => (
                    <div
                      key={zone.name}
                      className="rounded-xl border border-surface-muted bg-surface-subtle p-3"
                    >
                      <span className="block truncate text-xs font-semibold text-ink">
                        {zone.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-subtle">
                        {zone.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori Alat */}
      <section className="mx-auto max-w-7xl border-b border-hairline px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Kategori Alat"
          title="Cari Sesuai Kebutuhan Kuliah & Kegiatan"
          action={
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-accent"
            >
              <span>Semua Kategori</span>
              <ArrowUpRight className="size-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            const itemCount = DUMMY_ITEMS.filter(
              (item) => item.category === cat.slug,
            ).length;
            return (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-5 transition hover:border-ink hover:shadow-card"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-canvas text-ink transition group-hover:border-ink group-hover:bg-ink group-hover:text-canvas">
                      <IconComponent className="size-4.5" strokeWidth={1.6} />
                    </div>
                    <span className="rounded-md border border-surface-muted bg-surface-subtle px-2 py-0.5 text-xs font-medium text-ink-muted">
                      <span className="font-mono font-semibold text-ink">{itemCount}</span> alat
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-ink transition group-hover:text-accent">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-surface-muted pt-3 text-xs font-medium text-ink">
                  <span>Lihat alat</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Katalog Populer */}
      <section className="mx-auto max-w-7xl border-b border-hairline px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Siap Disewa"
          title="Alat yang Sering Dipinjam Mahasiswa"
          action={
            <Button
              href="/catalog"
              variant="outline"
              className="border-ink hover:bg-ink hover:text-canvas"
            >
              <span>Lihat Semua ({DUMMY_ITEMS.length} Alat)</span>
              <ArrowUpRight className="size-3.5" />
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Cara Kerja & Akses Cepat */}
      <section
        id="cara-kerja"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 space-y-10"
      >
        <div>
          <SectionHeading
            eyebrow="Cara Kerja"
            title="Alur Sewa yang Jelas dari Awal Sampai Kembali"
            description="Dirancang supaya penyewa tenang soal ketersediaan alat, dan pemilik aman soal kondisi barangnya."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="flex flex-col justify-between p-5">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-canvas text-ink">
                        <Icon className="size-4 text-accent" />
                      </div>
                      <span className="font-mono text-xs font-bold text-ink-subtle">
                        Langkah {item.step}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                      {item.desc}
                    </p>
                  </div>

                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1 border-t border-surface-muted pt-3 text-xs font-semibold text-ink transition hover:text-accent"
                  >
                    <span>{item.cta}</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {WORKSPACE_SHORTCUTS.map((role) => {
            const Icon = role.icon;
            return (
              <Card key={role.title} variant="subtle" className="p-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-surface text-ink">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-sm font-bold text-ink">{role.title}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  {role.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.links.map((link) => (
                    <Button
                      key={link.href}
                      href={link.href}
                      variant="outline"
                      size="xs"
                      className="text-xs"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="size-3" />
                    </Button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
