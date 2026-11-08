import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { DUMMY_ITEMS } from "@/data/dummyItems";
import CatalogView from "./_components/CatalogView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Katalog Alat - SewaKit",
  description: "Cari dan sewa alat penunjang kuliah dari sesama mahasiswa.",
};

function CatalogSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-36 animate-pulse rounded-2xl border border-hairline bg-surface" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="h-96 animate-pulse rounded-2xl border border-hairline bg-surface"
          />
        ))}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PageHeader
        eyebrow="Katalog Alat"
        title="Peralatan Praktikum & Kegiatan Kampus"
        description="Cari dan sewa alat ukur laboratorium, kit IoT, kamera, hingga perlengkapan kepanitiaan langsung dari sesama mahasiswa Telkom University."
        actions={
          <Link
            href="/rentals/request"
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-medium text-canvas transition hover:bg-accent"
          >
            <span>Ajukan Sewa</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogView items={DUMMY_ITEMS} />
        </Suspense>
      </main>
    </div>
  );
}
