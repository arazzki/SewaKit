import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Package,
} from "lucide-react";
import { DUMMY_ITEMS, getCategoryName, getItemById } from "@/data/dummyItems";
import Badge from "@/components/ui/badge";
import ItemThumbnail from "../_components/ItemThumbnail";
import {
  AvailabilityCalendar,
  StickyEscrowCheckoutCard,
} from "../_components/ItemBookingInteractive";

export async function generateStaticParams() {
  return DUMMY_ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = getItemById(id);
  return {
    title: item
      ? `${item.name} — Datasheet SewaKit`
      : "Barang tidak ditemukan — SewaKit",
  };
}

export default function ItemDetailPage({ params }: PageProps<"/catalog/[id]">) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F0]">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCD8CE] bg-white px-3 py-1.5 text-xs font-medium text-[#141413] transition hover:border-[#141413]"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Katalog Alat</span>
        </Link>

        <Suspense fallback={<ItemDetailSkeleton />}>
          <ItemDetail params={params} />
        </Suspense>
      </main>
    </div>
  );
}

function ItemDetailSkeleton() {
  return (
    <div className="mt-6 grid animate-pulse grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        <div className="h-80 rounded-2xl border border-[#DCD8CE] bg-white" />
        <div className="h-44 rounded-2xl border border-[#DCD8CE] bg-white" />
      </div>
      <div className="h-96 rounded-2xl border border-[#DCD8CE] bg-white lg:col-span-4" />
    </div>
  );
}

async function ItemDetail({
  params,
}: {
  params: PageProps<"/catalog/[id]">["params"];
}) {
  const { id } = await params;
  const item = getItemById(id);

  if (!item) {
    notFound();
  }

  const isAvailable = item.unitsAvailable > 0;

  return (
    <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
      {/* Left Column: Hardware Datasheet & Calendar (8 Columns) */}
      <div className="space-y-6 lg:col-span-8">
        {/* Main Hardware Showcase Card */}
        <div className="overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white">
          <div className="relative border-b border-[#EFECE6]">
            <ItemThumbnail
              id={item.id}
              name={item.name}
              category={item.category}
              imageUrl={item.imageUrl}
              sku={item.sku}
              size="lg"
            />
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
              <Badge variant={isAvailable ? "available" : "rented"} dot>
                {isAvailable
                  ? `Tersedia (${item.unitsAvailable} Unit)`
                  : "Sedang Disewa"}
              </Badge>
              <Badge variant="outline">{getCategoryName(item.category)}</Badge>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#78756F]">
              <span>KODE SKU: {item.sku}</span>
              <div className="flex items-center gap-3">
                {item.rating !== null ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-[#141413]">
                    <Star className="size-3.5 fill-[#C83E2B] text-[#C83E2B]" />
                    {item.rating.toFixed(1)} ({item.completedRentals} sewa sukses)
                  </span>
                ) : (
                  <span>Unit baru terdaftar</span>
                )}
              </div>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#141413] sm:text-3xl">
              {item.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[#575653]">
              {item.description}
            </p>

            {/* Quick Metadata Strip */}
            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-[#EFECE6] pt-4 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3">
                <Package className="size-4 text-[#141413]" />
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[#78756F]">
                    Kondisi Fisik
                  </span>
                  <span className="text-xs font-bold text-[#141413]">
                    {item.condition}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3">
                <MapPin className="size-4 text-[#C83E2B]" />
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[#78756F]">
                    Titik COD Utama
                  </span>
                  <span className="text-xs font-bold text-[#141413]">
                    {item.codLocation}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3">
                <CheckCircle2 className="size-4 text-[#1B4332]" />
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[#78756F]">
                    Inspeksi COD
                  </span>
                  <span className="text-xs font-bold text-[#141413]">
                    Wajib Checklist 2 Arah
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specification Datasheet */}
        <section className="overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white">
          <div className="flex items-center justify-between border-b border-[#EFECE6] bg-[#FBF9F5] px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-[#141413]" />
              <h2 className="text-sm font-bold text-[#141413]">
                Lembar Spesifikasi Teknis &amp; Kelengkapan Paket
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
              HARDWARE DATASHEET
            </span>
          </div>

          <dl className="divide-y divide-[#EFECE6]">
            {item.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-1 gap-1 px-5 py-3.5 text-xs sm:grid-cols-3 sm:gap-4"
              >
                <dt className="font-mono uppercase tracking-wider text-[#78756F]">
                  {spec.label}
                </dt>
                <dd className="font-medium text-[#141413] sm:col-span-2">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Interactive Anti-Collision Availability Calendar */}
        <AvailabilityCalendar bookedSlots={item.bookedSlots} />
      </div>

      {/* Right Column: Sticky Checkout & Verified Owner Card (4 Columns) */}
      <aside className="space-y-4 lg:sticky lg:top-24 lg:col-span-4">
        <StickyEscrowCheckoutCard item={item} />

        {/* Verified Student Owner Card */}
        <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
            IDENTITAS PEMILIK TERVERIFIKASI
          </span>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#141413] font-mono text-sm font-bold text-[#F6F5F0]">
              {item.ownerName
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-bold text-[#141413]">
                  {item.ownerName}
                </p>
                <ShieldCheck className="size-4 shrink-0 text-[#1B4332]" />
              </div>
              <p className="truncate font-mono text-[11px] text-[#575653]">
                NIM {item.ownerNim.slice(0, 8)}•••• • {item.ownerProdi}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#EFECE6] pt-3.5 font-mono text-xs">
            <div className="rounded-xl bg-[#F6F5F0] p-2.5">
              <span className="block text-[10px] text-[#78756F]">
                TRANSAKSI SUKSES
              </span>
              <span className="font-bold text-[#141413]">
                {item.completedRentals}× Sewa
              </span>
            </div>
            <div className="rounded-xl bg-[#F6F5F0] p-2.5">
              <span className="block text-[10px] text-[#78756F]">
                RESPON RATA-RATA
              </span>
              <span className="font-bold text-[#1B4332]">&lt; 25 Menit</span>
            </div>
          </div>

          <Link
            href="/reviews"
            className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-3.5 py-2.5 text-xs font-semibold text-[#141413] transition hover:border-[#141413] hover:bg-white"
          >
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-3.5 fill-[#C83E2B] text-[#C83E2B]" />
              <span>Lihat Ulasan &amp; Reputasi 2 Arah</span>
            </span>
            <span className="font-mono text-[#C83E2B]">→</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
