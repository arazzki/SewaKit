import type { Metadata } from "next";
import Link from "next/link";
import { DUMMY_ITEMS } from "@/data/dummyItems";
import CatalogView from "./_components/CatalogView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Katalog Alat — SewaKit",
  description: "Cari dan sewa alat penunjang kuliah dari sesama mahasiswa.",
};

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F0]">
      <PageHeader
        eyebrow="01 / INVENTARIS KAMPUS"
        title="Katalog Peralatan Praktikum & Multimedia"
        description="Sewa alat penunjang kuliah langsung dari sesama mahasiswa Telkom University dengan proteksi deposit dan serah terima COD di kampus."
        actions={
          <Link
            href="/rentals/request"
            className="rounded-xl bg-[#141413] px-4 py-2.5 text-xs font-medium text-[#F6F5F0] hover:bg-[#C83E2B] transition"
          >
            Ajukan Booking Alat →
          </Link>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <CatalogView items={DUMMY_ITEMS} />
      </main>
    </div>
  );
}
