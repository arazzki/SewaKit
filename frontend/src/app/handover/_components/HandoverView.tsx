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
    code: "01 / TITIK COD",
    label: "Inspeksi Awal & Token OTP",
    description: "Cek fisik & tukar 6 digit",
  },
  {
    key: "DISEWA",
    code: "02 / MASA SEWA",
    label: "Pemakaian Instrumen",
    description: "Deposit ditahan di Escrow",
  },
  {
    key: "MENUNGGU_KONFIRMASI_PENGEMBALIAN",
    code: "03 / KOMPARASI",
    label: "Audit Pengembalian",
    description: "Komparasi foto awal vs akhir",
  },
  {
    key: "SELESAI",
    code: "04 / PENYELESAIAN",
    label: "Rilis Deposit Otomatis",
    description: "Pencairan saldo & deposit",
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
        <div className="rounded-2xl border border-[#DCD8CE] bg-white p-4">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
            MODE PERSPEKTIF SIMULASI
          </span>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 rounded-xl bg-[#EFECE6] p-1">
            {(["PENYEWA", "PEMILIK"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                aria-pressed={role === option}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                  role === option
                    ? "bg-[#141413] text-[#F6F5F0] shadow-2xs"
                    : "text-[#575653] hover:text-[#141413]"
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
          <div className="px-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
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
                    ? "border-[#141413] bg-white ring-2 ring-[#141413]/10"
                    : "border-[#DCD8CE] bg-white/85 hover:border-[#141413] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[#141413]">
                    {rental.id}
                  </span>
                  <StatusBadge status={rental.status} />
                </div>
                <p className="mt-2 line-clamp-1 text-sm font-bold text-[#141413]">
                  {rental.itemName}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2 font-mono text-[11px] text-[#575653]">
                  <span>
                    {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
                  </span>
                  {late && (
                    <span className="inline-flex items-center gap-1 font-semibold text-[#B42318]">
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
        <section className="overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white lg:col-span-8">
          {/* Official Protocol Header with Standardized BrandLogo */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EFECE6] bg-[#FBF9F5] px-6 py-4">
            <BrandLogo size="sm" theme="light" showTagline={false} href={null} />
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-[#DCD8CE] bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#141413]">
                {selected.id}
              </span>
              <StatusBadge status={selected.status} />
            </div>
          </div>

          <div className="space-y-6 p-6">
            {/* Equipment Title & Campus COD Meeting Point Card */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#141413]">
                {selected.itemName}
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#78756F]">
                    <MapPin className="size-3 text-[#C83E2B]" />
                    Titik Temu CCTV Kampus
                  </span>
                  <p className="mt-1 text-xs font-bold text-[#141413]">
                    {selected.codLocation}
                  </p>
                  <p className="font-mono text-[11px] text-[#575653]">
                    Jadwal: {selected.codTime}
                  </p>
                </div>

                <div className="rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#78756F]">
                    <Calendar className="size-3 text-[#141413]" />
                    Pihak Terverifikasi NIM
                  </span>
                  <p className="mt-1 text-xs text-[#141413]">
                    Penyewa: <strong>{selected.renterName}</strong>
                  </p>
                  <p className="text-xs text-[#575653]">
                    Pemilik: <strong>{selected.ownerName}</strong>
                  </p>
                </div>

                <div className="rounded-xl border border-[#1B4332]/20 bg-[#E9F3ED]/50 p-3">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#1B4332]">
                    <ShieldCheck className="size-3" />
                    Jaminan Escrow Aktif
                  </span>
                  <p className="mt-1 font-mono text-sm font-bold text-[#1B4332]">
                    {formatRupiah(selected.depositAmount)}
                  </p>
                  <p className="font-mono text-[10px] text-[#1B4332]/80">
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

            <div className="border-t border-[#EFECE6] pt-5">
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
        <p className="text-sm text-[#575653] lg:col-span-8">
          Belum ada sewa yang perlu diserahterimakan.
        </p>
      )}
    </div>
  );
}
