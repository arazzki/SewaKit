import { Suspense } from "react";
import { INITIAL_REQUESTS } from "@/data/dummyRequests";
import RentalDetailClient from "./RentalDetailClient";

export async function generateStaticParams() {
  return INITIAL_REQUESTS.map((r) => ({ id: r.id }));
}

async function RentalDetailLoader({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RentalDetailClient id={id} />;
}

export default function RentalDetailPage({
  params,
}: PageProps<"/rentals/[id]">) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 text-xs text-ink-subtle">
          Memuat detail pesanan...
        </div>
      }
    >
      <RentalDetailLoader params={params} />
    </Suspense>
  );
}
