import type { Metadata } from "next";
import { DEMO_TODAY, DUMMY_HANDOVERS, formatDate } from "@/data/dummyHandovers";
import HandoverView from "./_components/HandoverView";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Serah Terima dan Pengembalian - SewaKit",
  description: "Konfirmasi serah terima dan pengembalian barang sewa dengan checklist dua pihak.",
};

export default function HandoverPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PageHeader
        eyebrow="Serah Terima COD"
        title="Pengambilan & Pengembalian Alat"
        description={`Cocokkan kondisi fisik barang saat ketemuan di titik COD kampus. Tanggal simulasi: ${formatDate(DEMO_TODAY)}.`}
        actions={
          <Button href="/disputes" variant="outline" className="border-ink">
            Deposit &amp; Klaim →
          </Button>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <HandoverView initialRentals={DUMMY_HANDOVERS} />
      </main>
    </div>
  );
}
