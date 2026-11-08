import type { HandoverStatus, ItemCondition } from "@/data/dummyHandovers";
import Badge, { type BadgeVariant } from "@/components/ui/badge";

const STATUS_MAP: Record<
  HandoverStatus,
  { label: string; variant: BadgeVariant }
> = {
  SIAP_COD: { label: "Siap COD Kampus", variant: "accent" },
  DISEWA: { label: "Masa Sewa Aktif", variant: "dark" },
  MENUNGGU_KONFIRMASI_PENGEMBALIAN: {
    label: "Inspeksi Kembali",
    variant: "hold",
  },
  SELESAI: { label: "Selesai", variant: "available" },
  SENGKETA: { label: "Sengketa", variant: "danger" },
};

export function StatusBadge({ status }: { status: HandoverStatus }) {
  const cfg = STATUS_MAP[status];
  return (
    <Badge variant={cfg.variant} dot>
      {cfg.label}
    </Badge>
  );
}

const CONDITION_MAP: Record<
  ItemCondition,
  { label: string; variant: BadgeVariant }
> = {
  BAIK: { label: "Baik / Normal", variant: "available" },
  RUSAK: { label: "Cacat / Rusak", variant: "hold" },
  HILANG: { label: "Komponen Hilang", variant: "danger" },
};

export function ConditionBadge({ condition }: { condition: ItemCondition }) {
  const cfg = CONDITION_MAP[condition];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}
