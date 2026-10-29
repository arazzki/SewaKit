"use client";

import { useState } from "react";
import { formatDate, getLateDays, type HandoverRental } from "@/data/dummyHandovers";
import { StatusBadge } from "./Badges";
import { ActiveRentalPanel, ClosedPanel, PickupPanel, ReturnReviewPanel, type Role } from "./StagePanels";

const STEPS = [
  { key: "SIAP_COD", label: "Serah terima" },
  { key: "DISEWA", label: "Masa sewa" },
  { key: "MENUNGGU_KONFIRMASI_PENGEMBALIAN", label: "Pemeriksaan pengembalian" },
  { key: "SELESAI", label: "Selesai" },
] as const;

function stepIndex(rental: HandoverRental): number {
  if (rental.status === "SENGKETA") return 3;
  return STEPS.findIndex((step) => step.key === rental.status);
}

export default function HandoverView({ initialRentals }: { initialRentals: HandoverRental[] }) {
  const [rentals, setRentals] = useState(initialRentals);
  const [selectedId, setSelectedId] = useState(initialRentals[0]?.id ?? "");
  // Sementara peran dipilih manual. Nanti diambil dari akun yang login (Fitur 1).
  const [role, setRole] = useState<Role>("PENYEWA");

  const selected = rentals.find((rental) => rental.id === selectedId);

  function updateRental(id: string, changes: Partial<HandoverRental>) {
    setRentals((current) => current.map((rental) => (rental.id === id ? { ...rental, ...changes } : rental)));
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Daftar sewa */}
      <aside className="space-y-3 lg:col-span-1">
        <div className="rounded-xl border border-[#DCD8CE] bg-white p-3">
          <p className="mb-2 text-xs font-medium text-[#575653]">Lihat sebagai (simulasi)</p>
          <div className="grid grid-cols-2 gap-2">
            {(["PENYEWA", "PEMILIK"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                aria-pressed={role === option}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  role === option ? "bg-[#141413] text-white" : "bg-[#EFECE6] text-[#575653] hover:bg-[#E2DFD7]"
                }`}
              >
                {option === "PENYEWA" ? "Penyewa" : "Pemilik"}
              </button>
            ))}
          </div>
        </div>

        {rentals.map((rental) => {
          const late = rental.status === "DISEWA" && getLateDays(rental.endDate) > 0;
          return (
            <button
              key={rental.id}
              type="button"
              onClick={() => setSelectedId(rental.id)}
              className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm transition ${
                rental.id === selectedId ? "border-[#141413] ring-2 ring-[#141413]/15" : "border-[#DCD8CE] hover:border-[#141413]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-[#575653]">{rental.id}</span>
                <StatusBadge status={rental.status} />
              </div>
              <p className="mt-2 text-sm font-semibold text-[#141413]">{rental.itemName}</p>
              <p className="mt-1 text-xs text-[#575653]">
                {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
                {late && <span className="ml-1 font-semibold text-rose-600">· Terlambat</span>}
              </p>
            </button>
          );
        })}
      </aside>

      {/* Detail sewa terpilih */}
      {selected ? (
        <section className="space-y-6 rounded-xl border border-[#DCD8CE] bg-white p-6 shadow-sm lg:col-span-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#575653]">{selected.id}</span>
              <StatusBadge status={selected.status} />
            </div>
            <h2 className="mt-2 text-xl font-bold text-[#141413]">{selected.itemName}</h2>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              <div>
                <dt className="inline text-[#575653]">Penyewa: </dt>
                <dd className="inline font-medium text-[#141413]">{selected.renterName}</dd>
              </div>
              <div>
                <dt className="inline text-[#575653]">Pemilik: </dt>
                <dd className="inline font-medium text-[#141413]">{selected.ownerName}</dd>
              </div>
              <div>
                <dt className="inline text-[#575653]">Jadwal: </dt>
                <dd className="inline font-medium text-[#141413]">
                  {formatDate(selected.startDate)} – {formatDate(selected.endDate)}
                </dd>
              </div>
              <div>
                <dt className="inline text-[#575653]">Titik COD: </dt>
                <dd className="inline font-medium text-[#141413]">
                  {selected.codLocation}, {selected.codTime}
                </dd>
              </div>
            </dl>
          </div>

          {/* Penanda tahapan */}
          <ol className="grid grid-cols-4 gap-2">
            {STEPS.map((step, index) => {
              const current = stepIndex(selected);
              const done = index < current || (index === current && (selected.status === "SELESAI" || selected.status === "SENGKETA"));
              const active = index === current && !done;
              return (
                <li key={step.key} className="text-center">
                  <div
                    className={`h-1.5 rounded-full ${done ? "bg-[#141413]" : active ? "bg-indigo-300" : "bg-slate-200"}`}
                  />
                  <p className={`mt-1.5 text-xs ${active ? "font-semibold text-[#C83E2B]" : "text-[#575653]"}`}>
                    {step.key === "SELESAI" && selected.status === "SENGKETA" ? "Sengketa" : step.label}
                  </p>
                </li>
              );
            })}
          </ol>

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
          {(selected.status === "SELESAI" || selected.status === "SENGKETA") && <ClosedPanel rental={selected} />}
        </section>
      ) : (
        <p className="text-sm text-[#575653] lg:col-span-2">Belum ada sewa yang perlu diserahterimakan.</p>
      )}
    </div>
  );
}
