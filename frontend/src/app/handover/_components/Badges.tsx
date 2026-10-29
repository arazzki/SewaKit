import type { HandoverStatus, ItemCondition } from "@/data/dummyHandovers";

const STATUS_STYLES: Record<HandoverStatus, { label: string; className: string }> = {
  SIAP_COD: { label: "Siap diambil (COD)", className: "bg-sky-100 text-sky-800" },
  DISEWA: { label: "Sedang disewa", className: "bg-[#EFECE6] text-[#141413]" },
  MENUNGGU_KONFIRMASI_PENGEMBALIAN: {
    label: "Menunggu konfirmasi pengembalian",
    className: "bg-amber-100 text-amber-800",
  },
  SELESAI: { label: "Selesai", className: "bg-[#E9F3ED] text-[#1B4332]" },
  SENGKETA: { label: "Sengketa", className: "bg-rose-100 text-rose-800" },
};

export function StatusBadge({ status }: { status: HandoverStatus }) {
  const style = STATUS_STYLES[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.className}`}>
      {style.label}
    </span>
  );
}

const CONDITION_STYLES: Record<ItemCondition, { label: string; className: string }> = {
  BAIK: { label: "Baik", className: "bg-[#E9F3ED] text-[#1B4332]" },
  RUSAK: { label: "Rusak", className: "bg-amber-50 text-amber-800" },
  HILANG: { label: "Hilang", className: "bg-rose-50 text-rose-700" },
};

export function ConditionBadge({ condition }: { condition: ItemCondition }) {
  const style = CONDITION_STYLES[condition];
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${style.className}`}>
      {style.label}
    </span>
  );
}
