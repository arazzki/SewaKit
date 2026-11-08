"use client";

import { useState } from "react";
import {
  MapPin,
  ShieldCheck,
  UserCheck,
  Wallet,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import {
  formatDate,
  getLateDays,
  type HandoverRental,
} from "@/data/dummyHandovers";
import { formatRupiah } from "@/lib/format";
import BrandLogo from "@/components/BrandLogo";
import Stepper, { type StepItem } from "@/components/ui/stepper";
import { StatusBadge } from "./Badges";
import {
  ActiveRentalPanel,
  ClosedPanel,
  PickupPanel,
  ReturnReviewPanel,
  type Role,
} from "./StagePanels";

const PROTOCOL_STEPS: readonly StepItem[] = [
  {
    key: "SIAP_COD",
    code: "Tahap 1",
    label: "Ambil Barang COD",
    description: "Cek fisik & konfirmasi kode",
  },
  {
    key: "DISEWA",
    code: "Tahap 2",
    label: "Masa Pemakaian",
    description: "Deposit disimpan di rekber",
  },
  {
    key: "MENUNGGU_KONFIRMASI_PENGEMBALIAN",
    code: "Tahap 3",
    label: "Cek Pengembalian",
    description: "Cocokkan kondisi awal & akhir",
  },
  {
    key: "SELESAI",
    code: "Tahap 4",
    label: "Selesai & Dana Cair",
    description: "Deposit kembali & sewa cair",
  },
];

function resolveStepIndex(rental: HandoverRental): number {
  if (rental.status === "SENGKETA" || rental.status === "SELESAI") return 3;
  const idx = PROTOCOL_STEPS.findIndex((s) => s.key === rental.status);
  return idx >= 0 ? idx : 0;
}

export default function HandoverView({
  initialRentals,
}: {
  initialRentals: HandoverRental[];
}) {
  const [rentals, setRentals] = useState(initialRentals);
  const [selectedId, setSelectedId] = useState(initialRentals[0]?.id ?? "");
  const [role, setRole] = useState<Role>("PENYEWA");

  const selected = rentals.find((rental) => rental.id === selectedId);

  function updateRental(id: string, changes: Partial<HandoverRental>) {
    setRentals((current) =>
      current.map((rental) =>
        rental.id === id ? { ...rental, ...changes } : rental,
      ),
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
      {/* Left Sidebar: Role Simulator & Active Handover Queue (4 Columns) */}
      <aside className="space-y-4 lg:col-span-4">
        {/* Role Simulator Switch */}
        <div className="rounded-2xl border border-hairline bg-surface p-4">
          <span className="block text-xs font-semibold text-ink-subtle">
            MODE PERSPEKTIF SIMULASI
          </span>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 rounded-xl bg-surface-muted p-1">
            {(["PENYEWA", "PEMILIK"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                aria-pressed={role === option}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                  role === option
                    ? "bg-ink text-canvas shadow-2xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {option === "PENYEWA" ? (
                  <UserCheck className="size-3.5" />
                ) : (
                  <Wallet className="size-3.5" />
                )}
                <span>{option === "PENYEWA" ? "Penyewa" : "Pemilik Alat"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active COD Transactions Queue */}
        <div className="space-y-2.5">
          <div className="px-1 text-xs font-semibold text-ink-subtle">
            Daftar Transaksi COD ({rentals.length})
          </div>
          {rentals.map((rental) => {
            const late =
              rental.status === "DISEWA" && getLateDays(rental.endDate) > 0;
            const isSelected = rental.id === selectedId;
            return (
              <button
                key={rental.id}
                type="button"
                onClick={() => setSelectedId(rental.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-ink bg-surface ring-2 ring-ink/10"
                    : "border-hairline bg-surface/85 hover:border-ink hover:bg-surface"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-ink">
                    {rental.id}
                  </span>
                  <StatusBadge status={rental.status} />
                </div>
                <p className="mt-2 line-clamp-1 text-sm font-bold text-ink">
                  {rental.itemName}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2 font-mono text-xs text-ink-muted">
                  <span>
                    {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
                  </span>
                  {late && (
                    <span className="inline-flex items-center gap-1 font-semibold text-danger">
                      <AlertTriangle className="size-3" />
                      Terlambat
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Main Sheet: Official COD Inspection Protocol (8 Columns) */}
      {selected ? (
        <section className="overflow-hidden rounded-2xl border border-hairline bg-surface lg:col-span-8">
          {/* Official Protocol Header with Standardized BrandLogo */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-muted bg-surface-subtle px-6 py-4">
            <BrandLogo size="sm" theme="light" showTagline={false} href={null} />
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-hairline bg-surface px-2.5 py-1 font-mono text-xs font-bold text-ink">
                {selected.id}
              </span>
              <StatusBadge status={selected.status} />
            </div>
          </div>

          <div className="space-y-6 p-6">
            {/* Equipment Title & Campus COD Meeting Point Card */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-ink">
                {selected.itemName}
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-surface-muted bg-surface-subtle p-3">
                  <span className="flex items-center gap-1.5 font-mono text-xs uppercase text-ink-subtle">
                    <MapPin className="size-3 text-accent" />
                    Titik Temu CCTV Kampus
                  </span>
                  <p className="mt-1 text-xs font-bold text-ink">
                    {selected.codLocation}
                  </p>
                  <p className="font-mono text-xs text-ink-muted">
                    Jadwal: {selected.codTime}
                  </p>
                </div>

                <div className="rounded-xl border border-surface-muted bg-surface-subtle p-3">
                  <span className="flex items-center gap-1.5 font-mono text-xs uppercase text-ink-subtle">
                    <Calendar className="size-3 text-ink" />
                    Pihak Terverifikasi NIM
                  </span>
                  <p className="mt-1 text-xs text-ink">
                    Penyewa: <strong>{selected.renterName}</strong>
                  </p>
                  <p className="text-xs text-ink-muted">
                    Pemilik: <strong>{selected.ownerName}</strong>
                  </p>
                </div>

                <div className="rounded-xl border border-forest/20 bg-forest-subtle/50 p-3">
                  <span className="flex items-center gap-1.5 font-mono text-xs uppercase text-forest">
                    <ShieldCheck className="size-3" />
                    Jaminan Escrow Aktif
                  </span>
                  <p className="mt-1 font-mono text-sm font-bold text-forest">
                    {formatRupiah(selected.depositAmount)}
                  </p>
                  <p className="font-mono text-xs text-forest/80">
                    {formatDate(selected.startDate)} – {formatDate(selected.endDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive 4-Step COD Protocol Timeline */}
            <Stepper
              steps={PROTOCOL_STEPS}
              currentIndex={resolveStepIndex(selected)}
              status={
                selected.status === "SELESAI"
                  ? "completed"
                  : selected.status === "SENGKETA"
                    ? "dispute"
                    : "normal"
              }
            />

            <div className="border-t border-surface-muted pt-5">
              {selected.status === "SIAP_COD" && (
                <PickupPanel
                  key={`${selected.id}-${role}`}
                  rental={selected}
                  role={role}
                  onUpdate={(changes) => updateRental(selected.id, changes)}
                />
              )}
              {selected.status === "DISEWA" && (
                <ActiveRentalPanel
                  key={`${selected.id}-${role}`}
                  rental={selected}
                  role={role}
                  onUpdate={(changes) => updateRental(selected.id, changes)}
                />
              )}
              {selected.status === "MENUNGGU_KONFIRMASI_PENGEMBALIAN" && (
                <ReturnReviewPanel
                  key={`${selected.id}-${role}`}
                  rental={selected}
                  role={role}
                  onUpdate={(changes) => updateRental(selected.id, changes)}
                />
              )}
              {(selected.status === "SELESAI" ||
                selected.status === "SENGKETA") && (
                <ClosedPanel rental={selected} />
              )}
            </div>
          </div>
        </section>
      ) : (
        <p className="text-sm text-ink-muted lg:col-span-8">
          Belum ada sewa yang perlu diserahterimakan.
        </p>
      )}
    </div>
  );
}
