import type { Metadata } from "next";
import Link from "next/link";
import { DEMO_TODAY, DUMMY_HANDOVERS, formatDate } from "@/data/dummyHandovers";
import HandoverView from "./_components/HandoverView";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Serah Terima dan Pengembalian — SewaKit",
  description: "Konfirmasi serah terima dan pengembalian barang sewa dengan checklist dua pihak.",
};

export default function HandoverPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F0]">
      <PageHeader
        eyebrow="04 / PROTOKOL COD KAMPUS"
        title="Serah Terima & Pengembalian Alat"
        description={`Checklist kondisi fisik dua arah dan verifikasi pengembalian saat COD di titik kampus. Tanggal simulasi aktif: ${formatDate(DEMO_TODAY)}.`}
        actions={
          <Link
            href="/disputes"
            className="rounded-xl border border-[#141413] bg-white px-4 py-2.5 text-xs font-medium text-[#141413] hover:bg-[#EFECE6] transition"
          >
            Pusat Deposit & Klaim →
          </Link>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <HandoverView initialRentals={DUMMY_HANDOVERS} />
      </main>
    </div>
  );
}
