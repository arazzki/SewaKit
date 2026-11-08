"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CreditCard,
  Minus,
  Plus,
} from "lucide-react";
import type { BookedSlot, CatalogItem } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";

const WEEKDAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
// Nov 2026 starts on Sunday (1 Nov 2026 is Sunday!)
const TOTAL_DAYS_NOV = 30;

export function AvailabilityCalendar({
  bookedSlots,
}: {
  bookedSlots: BookedSlot[];
}) {
  const [selectedDay, setSelectedDay] = useState<number>(12);

  const slotMap = new Map<number, BookedSlot>();
  for (const s of bookedSlots) {
    slotMap.set(s.day, s);
  }

  const selectedSlot = slotMap.get(selectedDay);

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-surface-muted pb-3.5">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-accent" />
          <div>
            <h2 className="text-sm font-bold text-ink">
              Matriks Kalender Anti-Bentrok - November 2026
            </h2>
            <p className="text-xs text-ink-subtle">
              Klik tanggal untuk memeriksa status ketersediaan unit secara real-time
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-forest/30 bg-forest-subtle" />
            Tersedia
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-warning-border bg-warning-subtle" />
            Hold 24J
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-hairline bg-surface-muted" />
            Disewa
          </span>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="mb-1.5 grid grid-cols-7 gap-1.5 text-center font-mono text-xs font-semibold uppercase text-ink-subtle">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Matrix */}
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: TOTAL_DAYS_NOV }, (_, idx) => {
          const day = idx + 1;
          const slot = slotMap.get(day);
          const isPast = day < 8; // DEMO_TODAY = 8 Nov 2026
          const isSelected = selectedDay === day;

          let toneClass =
            "border-hairline bg-surface text-ink hover:border-ink";
          if (isPast) {
            toneClass =
              "border-surface-muted bg-canvas/60 text-ink-inverse-subtle cursor-default";
          } else if (slot?.status === "booked") {
            toneClass =
              "border-hairline bg-surface-muted text-ink-subtle line-through";
          } else if (slot?.status === "hold") {
            toneClass = "border-warning-border bg-warning-subtle text-warning-ink";
          } else {
            toneClass =
              "border-forest/20 bg-forest-subtle/60 text-forest hover:border-forest";
          }

          if (isSelected && !isPast) {
            toneClass += " ring-2 ring-ink font-bold";
          }

          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => setSelectedDay(day)}
              className={`flex h-10 flex-col items-center justify-center rounded-lg border font-mono text-xs transition ${toneClass}`}
            >
              <span>{day.toString().padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-surface-muted bg-surface-subtle px-3.5 py-2.5 text-xs">
        <span className="font-mono text-ink-muted">
          Tanggal dipilih: <strong className="text-ink">{selectedDay} Nov 2026</strong>
        </span>
        {selectedSlot ? (
          <span className="font-mono font-semibold text-accent">
            Status: {selectedSlot.note} (Tidak Tersedia)
          </span>
        ) : (
          <span className="font-mono font-semibold text-forest">
            Status: Siap Dibooking (Hold 24J Tersedia)
          </span>
        )}
      </div>
    </div>
  );
}

export function StickyEscrowCheckoutCard({ item }: { item: CatalogItem }) {
  const [days, setDays] = useState<number>(2);
  const serviceFee = 2500;
  const rentalSubtotal = item.pricePerDay * days;
  const grandTotal = rentalSubtotal + item.deposit + serviceFee;

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5">
      <div className="flex items-baseline justify-between border-b border-surface-muted pb-4">
        <div>
          <span className="block text-xs font-semibold text-ink-subtle">
            Tarif Sewa Harian
          </span>
          <p className="mt-0.5 font-mono text-2xl font-bold text-ink">
            {formatRupiah(item.pricePerDay)}
            <span className="font-sans text-xs font-normal text-ink-subtle">
              {" "}
              / hari
            </span>
          </p>
        </div>
        <span className="rounded-md border border-hairline bg-canvas px-2 py-1 font-mono text-xs font-semibold text-ink-muted">
          {item.sku}
        </span>
      </div>

      {/* Duration Estimator */}
      <div className="mt-4 rounded-xl border border-hairline bg-surface-subtle p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ink">
            Simulasi Durasi Sewa
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(1, d - 1))}
              aria-label="Kurangi hari"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-surface text-ink hover:border-ink"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-14 text-center font-mono text-xs font-bold text-ink">
              {days} Hari
            </span>
            <button
              type="button"
              onClick={() => setDays((d) => Math.min(14, d + 1))}
              aria-label="Tambah hari"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-hairline bg-surface text-ink hover:border-ink"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <dl className="mt-4 space-y-2.5 border-b border-surface-muted pb-4 text-xs">
        <div className="flex justify-between">
          <dt className="text-ink-muted">
            Sewa ({days} hari × {formatRupiah(item.pricePerDay)})
          </dt>
          <dd className="font-mono font-semibold text-ink">
            {formatRupiah(rentalSubtotal)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Deposit Escrow (Refund 100%)</dt>
          <dd className="font-mono font-semibold text-ink">
            {formatRupiah(item.deposit)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-muted">Biaya Gateway Xendit</dt>
          <dd className="font-mono font-semibold text-ink">
            {formatRupiah(serviceFee)}
          </dd>
        </div>
      </dl>

      <div className="mt-3.5 flex items-center justify-between">
        <span className="text-xs font-bold text-ink">
          Estimasi Total Escrow
        </span>
        <span className="font-mono text-lg font-bold text-accent">
          {formatRupiah(grandTotal)}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <Link
          href={`/rentals/request?item=${item.id}`}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 text-xs font-semibold text-canvas transition hover:bg-accent"
        >
          <Clock className="size-4" />
          <span>Ajukan Sewa &amp; Hold 24 Jam</span>
          <ArrowUpRight className="size-3.5" />
        </Link>

        <Link
          href="/payments"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-4 text-xs font-medium text-ink transition hover:border-ink hover:bg-surface-subtle"
        >
          <CreditCard className="size-3.5 text-ink-muted" />
          <span>Simulasi Checkout Xendit</span>
        </Link>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-forest/20 bg-forest-subtle/60 p-3 text-xs leading-relaxed text-forest">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        <p>
          Deposit <strong>{formatRupiah(item.deposit)}</strong> ditahan aman di rekening bersama SewaKit dan dikembalikan utuh setelah checklist pengembalian selesai.
        </p>
      </div>
    </div>
  );
}
