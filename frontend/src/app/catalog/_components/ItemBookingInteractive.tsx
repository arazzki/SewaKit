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
    <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE6] pb-3.5">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-[#C83E2B]" />
          <div>
            <h2 className="text-sm font-bold text-[#141413]">
              Matriks Kalender Anti-Bentrok — November 2026
            </h2>
            <p className="text-[11px] text-[#78756F]">
              Klik tanggal untuk memeriksa status ketersediaan unit secara real-time
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-[#575653]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-[#1B4332]/30 bg-[#E9F3ED]" />
            Tersedia
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-[#E9C893] bg-[#FEF7EC]" />
            Hold 24J
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-xs border border-[#DCD8CE] bg-[#EFECE6]" />
            Disewa
          </span>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="mb-1.5 grid grid-cols-7 gap-1.5 text-center font-mono text-[10px] font-semibold uppercase text-[#78756F]">
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
            "border-[#DCD8CE] bg-white text-[#141413] hover:border-[#141413]";
          if (isPast) {
            toneClass =
              "border-[#EFECE6] bg-[#F6F5F0]/60 text-[#A09D95] cursor-default";
          } else if (slot?.status === "booked") {
            toneClass =
              "border-[#DCD8CE] bg-[#EFECE6] text-[#78756F] line-through";
          } else if (slot?.status === "hold") {
            toneClass = "border-[#E9C893] bg-[#FEF7EC] text-[#9A5B13]";
          } else {
            toneClass =
              "border-[#1B4332]/20 bg-[#E9F3ED]/60 text-[#1B4332] hover:border-[#1B4332]";
          }

          if (isSelected && !isPast) {
            toneClass += " ring-2 ring-[#141413] font-bold";
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

      <div className="mt-4 flex items-center justify-between rounded-xl border border-[#EFECE6] bg-[#FBF9F5] px-3.5 py-2.5 text-xs">
        <span className="font-mono text-[#575653]">
          Tanggal dipilih: <strong className="text-[#141413]">{selectedDay} Nov 2026</strong>
        </span>
        {selectedSlot ? (
          <span className="font-mono font-semibold text-[#C83E2B]">
            Status: {selectedSlot.note} (Tidak Tersedia)
          </span>
        ) : (
          <span className="font-mono font-semibold text-[#1B4332]">
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
    <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5">
      <div className="flex items-baseline justify-between border-b border-[#EFECE6] pb-4">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
            Tarif Sewa Harian
          </span>
          <p className="mt-0.5 font-mono text-2xl font-bold text-[#141413]">
            {formatRupiah(item.pricePerDay)}
            <span className="font-sans text-xs font-normal text-[#78756F]">
              {" "}
              / hari
            </span>
          </p>
        </div>
        <span className="rounded-md border border-[#DCD8CE] bg-[#F6F5F0] px-2 py-1 font-mono text-[10px] font-semibold text-[#575653]">
          {item.sku}
        </span>
      </div>

      {/* Duration Estimator */}
      <div className="mt-4 rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#141413]">
            Simulasi Durasi Sewa
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(1, d - 1))}
              aria-label="Kurangi hari"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#DCD8CE] bg-white text-[#141413] hover:border-[#141413]"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-14 text-center font-mono text-xs font-bold text-[#141413]">
              {days} Hari
            </span>
            <button
              type="button"
              onClick={() => setDays((d) => Math.min(14, d + 1))}
              aria-label="Tambah hari"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#DCD8CE] bg-white text-[#141413] hover:border-[#141413]"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <dl className="mt-4 space-y-2.5 border-b border-[#EFECE6] pb-4 text-xs">
        <div className="flex justify-between">
          <dt className="text-[#575653]">
            Sewa ({days} hari × {formatRupiah(item.pricePerDay)})
          </dt>
          <dd className="font-mono font-semibold text-[#141413]">
            {formatRupiah(rentalSubtotal)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#575653]">Deposit Escrow (Refund 100%)</dt>
          <dd className="font-mono font-semibold text-[#141413]">
            {formatRupiah(item.deposit)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#575653]">Biaya Gateway Xendit</dt>
          <dd className="font-mono font-semibold text-[#141413]">
            {formatRupiah(serviceFee)}
          </dd>
        </div>
      </dl>

      <div className="mt-3.5 flex items-center justify-between">
        <span className="text-xs font-bold text-[#141413]">
          Estimasi Total Escrow
        </span>
        <span className="font-mono text-lg font-bold text-[#C83E2B]">
          {formatRupiah(grandTotal)}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <Link
          href={`/rentals/request?item=${item.id}`}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#141413] px-4 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#C83E2B]"
        >
          <Clock className="size-4" />
          <span>Ajukan Sewa &amp; Hold 24 Jam</span>
          <ArrowUpRight className="size-3.5" />
        </Link>

        <Link
          href="/payments"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#DCD8CE] bg-white px-4 text-xs font-medium text-[#141413] transition hover:border-[#141413] hover:bg-[#FBF9F5]"
        >
          <CreditCard className="size-3.5 text-[#575653]" />
          <span>Simulasi Checkout Xendit</span>
        </Link>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#1B4332]/20 bg-[#E9F3ED]/60 p-3 text-[11px] leading-relaxed text-[#1B4332]">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        <p>
          Deposit <strong>{formatRupiah(item.deposit)}</strong> ditahan aman di rekening bersama SewaKit dan dikembalikan utuh setelah checklist pengembalian selesai.
        </p>
      </div>
    </div>
  );
}
