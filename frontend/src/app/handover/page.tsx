import type { Metadata } from "next";
import { DEMO_TODAY, DUMMY_HANDOVERS, formatDate } from "@/data/dummyHandovers";
import HandoverHeader from "./_components/HandoverHeader";
import HandoverView from "./_components/HandoverView";

export const metadata: Metadata = {
  title: "Serah Terima dan Pengembalian — SewaKit",
  description: "Konfirmasi serah terima dan pengembalian barang sewa dengan checklist dua pihak.",
};

export default function HandoverPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HandoverHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Serah Terima dan Pengembalian</h1>
          <p className="mt-1 text-sm text-slate-600">
            Checklist kondisi barang dan konfirmasi dua pihak saat COD. Mode simulasi dengan data dummy, tanggal hari
            ini dianggap {formatDate(DEMO_TODAY)}.
          </p>
        </div>

        <HandoverView initialRentals={DUMMY_HANDOVERS} />
      </main>
    </div>
  );
}
