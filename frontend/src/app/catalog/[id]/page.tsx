import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DUMMY_ITEMS, getCategoryName, getItemById } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import CatalogHeader from "../_components/CatalogHeader";
import ItemThumbnail from "../_components/ItemThumbnail";

// Dengan Cache Components, halaman dinamis perlu contoh params saat build.
// Sementara diambil dari data dummy; nanti diganti daftar id dari API.
export async function generateStaticParams() {
  return DUMMY_ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps<"/catalog/[id]">): Promise<Metadata> {
  const { id } = await params;
  const item = getItemById(id);
  return { title: item ? `${item.name} — SewaKit` : "Barang tidak ditemukan — SewaKit" };
}

// Bagian halaman yang tidak bergantung pada id langsung tampil,
// sedangkan detail barang dibungkus Suspense karena membaca params dari URL
// (wajib karena project memakai Cache Components dan Partial Prefetching).
export default function ItemDetailPage({ params }: PageProps<"/catalog/[id]">) {
  return (
    <div className="flex min-h-screen flex-col">
      <CatalogHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <Link href="/catalog" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          ← Kembali ke katalog
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
    <div className="mt-6 grid animate-pulse grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="h-64 rounded-lg bg-slate-200" />
        <div className="mt-6 h-8 w-2/3 rounded bg-slate-200" />
        <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
      </div>
      <div className="h-64 rounded-xl bg-slate-200" />
    </div>
  );
}

async function ItemDetail({ params }: { params: PageProps<"/catalog/[id]">["params"] }) {
  const { id } = await params;
  const item = getItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Kolom kiri: informasi barang */}
      <div className="lg:col-span-2">
        <ItemThumbnail name={item.name} category={item.category} size="lg" />

        <span className="mt-6 inline-block text-sm font-medium text-indigo-600">
          {getCategoryName(item.category)}
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{item.name}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {item.rating !== null ? `★ ${item.rating.toFixed(1)}` : "Belum ada ulasan"} · Kondisi{" "}
          {item.condition.toLowerCase()} · {item.unitsAvailable} unit
        </p>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-slate-900">Deskripsi</h2>
          <p className="mt-2 leading-relaxed text-slate-700">{item.description}</p>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-slate-900">Spesifikasi</h2>
          <dl className="mt-2 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {item.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
                <dt className="text-slate-500">{spec.label}</dt>
                <dd className="col-span-2 text-slate-900">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-slate-900">Kalender ketersediaan</h2>
          <div className="mt-2 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
            Kalender ketersediaan akan tampil setelah data jadwal sewa (Fitur 7) tersedia.
          </div>
        </section>
      </div>

      {/* Kolom kanan: ringkasan harga dan pemilik */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-2xl font-bold text-slate-900">
            {formatRupiah(item.pricePerDay)}
            <span className="text-base font-normal text-slate-500"> / hari</span>
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Deposit</dt>
              <dd className="font-medium text-slate-900">{formatRupiah(item.deposit)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Pemilik</dt>
              <dd className="font-medium text-slate-900">{item.ownerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Titik COD</dt>
              <dd className="text-right font-medium text-slate-900">{item.codLocation}</dd>
            </div>
          </dl>

          {/* Alur pengajuan sewa dikerjakan di Fitur 7 (Ariq) */}
          <Link
            href={`/rentals/request?item=${item.id}`}
            className="mt-5 block rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Ajukan Sewa
          </Link>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Deposit dikembalikan setelah barang dikembalikan dalam kondisi sesuai checklist serah terima.
          </p>
        </div>
      </aside>
    </div>
  );
}
