import type { Metadata } from "next";
import { DUMMY_ITEMS } from "@/data/dummyItems";
import CatalogHeader from "./_components/CatalogHeader";
import CatalogView from "./_components/CatalogView";

export const metadata: Metadata = {
  title: "Katalog Alat — SewaKit",
  description: "Cari dan sewa alat penunjang kuliah dari sesama mahasiswa.",
};

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <CatalogHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Katalog Alat</h1>
          <p className="mt-1 text-sm text-slate-600">
            Sewa alat penunjang kuliah dari sesama mahasiswa, dengan deposit dan serah terima COD di kampus.
          </p>
        </div>

        {/* Sementara memakai data dummy. Nanti diganti data dari API Laravel. */}
        <CatalogView items={DUMMY_ITEMS} />
      </main>
    </div>
  );
}
