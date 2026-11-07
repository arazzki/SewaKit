"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Lock,
  Unlock,
  MessageSquare,
  X,
  Zap,
  Calendar,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import { DUMMY_ITEMS } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";

interface BookableItem {
  id: string;
  sku: string;
  name: string;
  pricePerDay: number;
  deposit: number;
  ownerName: string;
  ownerNim: string;
  ownerPhone: string;
  ownerProdi: string;
  bookedRanges: { start: string; end: string; reason: string }[];
}

interface RentalRequest {
  id: string;
  itemId: string;
  itemSku: string;
  itemName: string;
  renterName: string;
  renterNim: string;
  renterProdi: string;
  renterPhone: string;
  ownerName: string;
  ownerNim: string;
  ownerPhone: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  rentalCost: number;
  depositAmount: number;
  codLocation: string;
  codTime: string;
  purposeNote: string;
  status:
    | "MENUNGGU_PERSETUJUAN"
    | "DISETUJUI_MENUNGGU_BAYAR"
    | "SIAP_COD"
    | "DITOLAK";
  holdExpiresIn: string;
  paymentExpiresIn?: string;
  rejectReason?: string;
  createdAt: string;
}

const BOOKABLE_ITEMS: BookableItem[] = DUMMY_ITEMS.map((item, idx) => {
  // Convert individual bookedSlots in Nov 2026 into contiguous YYYY-MM-DD ranges
  const sorted = [...item.bookedSlots].sort((a, b) => a.day - b.day);
  const ranges: { start: string; end: string; reason: string }[] = [];
  for (const slot of sorted) {
    const dateStr = `2026-11-${String(slot.day).padStart(2, "0")}`;
    const label =
      slot.note ??
      (slot.status === "hold" ? "Ditahan (Hold 24 Jam)" : "Disewa Mahasiswa Lain");
    const prev = ranges[ranges.length - 1];
    const prevDay = prev ? Number(prev.end.slice(-2)) : -99;
    if (prev && slot.day === prevDay + 1 && prev.reason === label) {
      prev.end = dateStr;
    } else {
      ranges.push({ start: dateStr, end: dateStr, reason: label });
    }
  }

  const phones = [
    "0812-3456-7890",
    "0813-9876-5432",
    "0857-1122-3344",
    "0821-5566-7788",
  ];

  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    pricePerDay: item.pricePerDay,
    deposit: item.deposit,
    ownerName: item.ownerName,
    ownerNim: item.ownerNim,
    ownerPhone: phones[idx % phones.length],
    ownerProdi: item.ownerProdi,
    bookedRanges: ranges,
  };
});

const COD_LOCATIONS = [
  "Lobi Gedung TULT (Telkom University Landmark Tower)",
  "Perpustakaan Open Library (Gedung Manterawu Lt. 5)",
  "Selasar Gedung Kuliah Umum (GKU / Tokong Nanas)",
  "Area Kantin Teknik / Asrama Putra",
  "Student Center / Taman Danau Galau",
];

const INITIAL_REQUESTS: RentalRequest[] = [
  {
    id: "REQ-2026-089",
    itemId: "oscilloscope-rigol-ds1054z",
    itemSku: "LAB-OSC-1054",
    itemName: "Rigol DS1054Z Digital Oscilloscope (50 MHz, 4 Ch)",
    renterName: "Muhamad Alwan Suryadi",
    renterNim: "103032400104",
    renterProdi: "S1 Teknologi Informasi",
    renterPhone: "0821-8899-7766",
    ownerName: "Triansyah Danishwara",
    ownerNim: "103032400062",
    ownerPhone: "0812-3456-7890",
    startDate: "2026-11-10",
    endDate: "2026-11-11",
    totalDays: 2,
    rentalCost: 90000,
    depositAmount: 150000,
    codLocation: "Lobi Gedung TULT (Telkom University Landmark Tower)",
    codTime: "13:00 WIB",
    purposeNote:
      "Untuk praktikum modul rangkaian listrik & pengukuran sinyal gelombang PWM.",
    status: "MENUNGGU_PERSETUJUAN",
    holdExpiresIn: "18:42:10",
    createdAt: "Hari ini, 10:15 WIB",
  },
  {
    id: "REQ-2026-088",
    itemId: "sony-a6400-kit",
    itemSku: "CAM-SNY-6400",
    itemName: "Kamera Mirrorless Sony Alpha A6400 + Kit 16-50mm",
    renterName: "Muhammad Ariq Azzaki",
    renterNim: "103032400138",
    renterProdi: "S1 Teknologi Informasi",
    renterPhone: "0812-9988-1122",
    ownerName: "Azriel Raihan",
    ownerNim: "103032400010",
    ownerPhone: "0857-1122-3344",
    startDate: "2026-11-14",
    endDate: "2026-11-15",
    totalDays: 2,
    rentalCost: 190000,
    depositAmount: 300000,
    codLocation: "Selasar Gedung Kuliah Umum (GKU / Tokong Nanas)",
    codTime: "15:30 WIB",
    purposeNote: "Dokumentasi kegiatan himpunan & video presentasi proyek akhir.",
    status: "DISETUJUI_MENUNGGU_BAYAR",
    holdExpiresIn: "Disetujui Pemilik",
    paymentExpiresIn: "01:48:00",
    createdAt: "Hari ini, 11:20 WIB",
  },
  {
    id: "REQ-2026-085",
    itemId: "esp32-devkit-sensor-pack",
    itemSku: "IOT-ESP-0032",
    itemName: "Kit Praktikum ESP32 WiFi + BLE + Paket Sensor IoT",
    renterName: "Muhammad Fiqri Habibi",
    renterNim: "103032400056",
    renterProdi: "S1 Teknologi Informasi",
    renterPhone: "0819-4455-6677",
    ownerName: "Rayvan Alifarlo",
    ownerNim: "103032400087",
    ownerPhone: "0813-9876-5432",
    startDate: "2026-11-05",
    endDate: "2026-11-07",
    totalDays: 3,
    rentalCost: 45000,
    depositAmount: 75000,
    codLocation: "Perpustakaan Open Library (Gedung Manterawu Lt. 5)",
    codTime: "10:00 WIB",
    purposeNote: "Demo tugas besar mata kuliah Jaringan Sensor Nirkabel.",
    status: "SIAP_COD",
    holdExpiresIn: "-",
    createdAt: "Kemarin, 14:30 WIB",
  },
];

function isDateOverlapping(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
) {
  return startA <= endB && endA >= startB;
}

function RentalRequestContent() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("item");
  const initialItem =
    BOOKABLE_ITEMS.find((i) => i.id === requestedSlug) ?? BOOKABLE_ITEMS[0];

  const [activeTab, setActiveTab] = useState<"form" | "owner" | "cod">("form");
  const [requests, setRequests] = useState<RentalRequest[]>(INITIAL_REQUESTS);

  const [selectedItemId, setSelectedItemId] = useState<string>(initialItem.id);
  const [startDate, setStartDate] = useState<string>("2026-11-18");
  const [endDate, setEndDate] = useState<string>("2026-11-19");
  const [codLocation, setCodLocation] = useState<string>(COD_LOCATIONS[0]);
  const [codTime, setCodTime] = useState<string>("13:00");
  const [purposeNote, setPurposeNote] = useState<string>("");
  const [requestSeq, setRequestSeq] = useState<number>(90);
  const [formFeedback, setFormFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectInput, setRejectInput] = useState<string>("");

  const selectedItem =
    BOOKABLE_ITEMS.find((item) => item.id === selectedItemId) ?? BOOKABLE_ITEMS[0];

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff =
      Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const rentalCost = totalDays * selectedItem.pricePerDay;
  const totalPayable = rentalCost + selectedItem.deposit;

  const conflictingRange = selectedItem.bookedRanges.find((range) =>
    startDate && endDate && startDate <= endDate
      ? isDateOverlapping(startDate, endDate, range.start, range.end)
      : false,
  );

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!startDate || !endDate || totalDays <= 0) {
      setFormFeedback({
        type: "error",
        message: "Tanggal selesai harus sama atau setelah tanggal mulai sewa.",
      });
      return;
    }

    if (conflictingRange) {
      setFormFeedback({
        type: "error",
        message: `Jadwal bentrok! Unit sudah tidak tersedia pada ${conflictingRange.start} s/d ${conflictingRange.end} (${conflictingRange.reason}).`,
      });
      return;
    }

    if (!purposeNote.trim()) {
      setFormFeedback({
        type: "error",
        message: "Mohon isi catatan keperluan praktikum/riset terlebih dahulu.",
      });
      return;
    }

    const nextCode = `REQ-2026-0${requestSeq}`;
    setRequestSeq((n) => n + 1);

    const newReq: RentalRequest = {
      id: nextCode,
      itemId: selectedItem.id,
      itemSku: selectedItem.sku,
      itemName: selectedItem.name,
      renterName: "Muhammad Ariq Azzaki (Anda)",
      renterNim: "103032400138",
      renterProdi: "S1 Teknologi Informasi",
      renterPhone: "0812-9988-1122",
      ownerName: selectedItem.ownerName,
      ownerNim: selectedItem.ownerNim,
      ownerPhone: selectedItem.ownerPhone,
      startDate,
      endDate,
      totalDays,
      rentalCost,
      depositAmount: selectedItem.deposit,
      codLocation,
      codTime: `${codTime} WIB`,
      purposeNote,
      status: "MENUNGGU_PERSETUJUAN",
      holdExpiresIn: "23:59:59",
      createdAt: "Baru saja",
    };

    setRequests([newReq, ...requests]);
    setPurposeNote("");
    setFormFeedback({
      type: "success",
      message: `Pengajuan ${newReq.id} diterbitkan! Jadwal ${startDate} s/d ${endDate} kini ditahan (Hold 24 Jam) menunggu persetujuan pemilik.`,
    });
  };

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "DISETUJUI_MENUNGGU_BAYAR",
              holdExpiresIn: "Disetujui Pemilik",
              paymentExpiresIn: "01:59:59",
            }
          : req,
      ),
    );
  };

  const handleSimulatePaid = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "SIAP_COD",
              paymentExpiresIn: "Lunas (Escrow Xendit)",
            }
          : req,
      ),
    );
  };

  const handleConfirmReject = (id: string) => {
    if (!rejectInput.trim()) return;
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "DITOLAK",
              holdExpiresIn: "Jadwal Dibuka Kembali",
              rejectReason: rejectInput,
            }
          : req,
      ),
    );
    setRejectingId(null);
    setRejectInput("");
  };

  const pendingCount = requests.filter(
    (r) => r.status === "MENUNGGU_PERSETUJUAN",
  ).length;
  const readyCodCount = requests.filter((r) => r.status === "SIAP_COD").length;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
      {/* Business Rules Protocol Strip */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            step: "01 / ANTI-COLLISION",
            title: "Cek Bentrok & Hold 24J",
            desc: "Tanggal yang diajukan langsung dikunci selama 24 jam agar tidak terjadi booking ganda.",
          },
          {
            step: "02 / OWNER SLA",
            title: "Persetujuan Pemilik",
            desc: "Pemilik wajib merespons maks. 24 jam; lewat batas tersebut jadwal otomatis dibuka kembali.",
          },
          {
            step: "03 / ESCROW WINDOW",
            title: "Batas Bayar 120 Menit",
            desc: "Setelah disetujui, penyewa melunasi sewa + deposit ke rekening bersama dalam waktu 2 jam.",
          },
          {
            step: "04 / COD UNLOCK",
            title: "Kontak & Titik CCTV",
            desc: "Nomor WhatsApp kedua belah pihak baru terbuka setelah dana escrow terverifikasi lunas.",
          },
        ].map((rule) => (
          <div
            key={rule.step}
            className="rounded-xl border border-[#DCD8CE] bg-white p-4"
          >
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
              {rule.step}
            </span>
            <h2 className="mt-1 text-xs font-bold text-[#141413]">{rule.title}</h2>
            <p className="mt-1 text-[11px] leading-relaxed text-[#575653]">
              {rule.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[#DCD8CE] pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("form")}
          className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            activeTab === "form"
              ? "bg-[#141413] text-[#F6F5F0]"
              : "border border-[#DCD8CE] bg-white text-[#575653] hover:border-[#141413] hover:text-[#141413]"
          }`}
        >
          1. Formulir Pengajuan Sewa (Penyewa)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("owner")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            activeTab === "owner"
              ? "bg-[#141413] text-[#F6F5F0]"
              : "border border-[#DCD8CE] bg-white text-[#575653] hover:border-[#141413] hover:text-[#141413]"
          }`}
        >
          <span>2. Antrean Persetujuan Pemilik</span>
          <span className="rounded-md bg-[#FEF7EC] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#9A5B13]">
            {pendingCount} HOLD
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cod")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            activeTab === "cod"
              ? "bg-[#141413] text-[#F6F5F0]"
              : "border border-[#DCD8CE] bg-white text-[#575653] hover:border-[#141413] hover:text-[#141413]"
          }`}
        >
          <span>3. Kontak WhatsApp &amp; Titik COD</span>
          <span className="rounded-md bg-[#E9F3ED] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#1B4332]">
            {readyCodCount} SIAP COD
          </span>
        </button>
      </div>

      {/* TAB 1: FORM PENGAJUAN SEWA */}
      {activeTab === "form" && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="rounded-2xl border border-[#DCD8CE] bg-white p-6 lg:col-span-8">
            <div className="mb-5 border-b border-[#EFECE6] pb-4">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                BOOKING REQUEST FORM
              </span>
              <h3 className="mt-0.5 text-base font-bold text-[#141413]">
                Formulir Pengajuan Sewa Perangkat Kampus
              </h3>
              <p className="mt-0.5 text-xs text-[#575653]">
                Pilih instrumen praktikum, periksa matriks tanggal terblokir, dan kunci jadwal selama 24 jam.
              </p>
            </div>

            {formFeedback && (
              <div
                className={`mb-5 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-medium ${
                  formFeedback.type === "error"
                    ? "border-[#C83E2B]/30 bg-[#FDF2F0] text-[#9E2A1B]"
                    : "border-[#1B4332]/25 bg-[#E9F3ED] text-[#1B4332]"
                }`}
              >
                {formFeedback.type === "error" ? (
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                )}
                <span>{formFeedback.message}</span>
              </div>
            )}

            <form onSubmit={handleCreateRequest} className="space-y-5">
              <div>
                <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                  Pilih Unit Perangkat / SKU Katalog
                </label>
                <select
                  value={selectedItemId}
                  onChange={(e) => {
                    setSelectedItemId(e.target.value);
                    setFormFeedback(null);
                  }}
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-3 text-sm text-[#141413] focus:border-[#141413] focus:bg-white focus:outline-none"
                >
                  {BOOKABLE_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      [{item.sku}] {item.name} — {formatRupiah(item.pricePerDay)}/hari
                    </option>
                  ))}
                </select>
              </div>

              {/* Jadwal Terblokir */}
              <div className="rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-4">
                <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#141413]">
                    <Calendar className="size-3.5 text-[#C83E2B]" />
                    <span>Slot Tanggal Terkunci (Anti-Bentrok):</span>
                  </span>
                  <Badge variant="hold" dot>
                     Kalender Aktif Nov 2026
                  </Badge>
                </div>

                {selectedItem.bookedRanges.length === 0 ? (
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1B4332]">
                    <CheckCircle2 className="size-3.5" />
                    <span>Seluruh tanggal bulan ini tersedia untuk dibooking.</span>
                  </p>
                ) : (
                  <ul className="space-y-1.5 text-xs text-[#575653]">
                    {selectedItem.bookedRanges.map((r, idx) => (
                      <li key={idx} className="flex flex-wrap items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C83E2B]" />
                        <span className="rounded bg-[#EFECE6] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[#141413]">
                          {r.start} s/d {r.end}
                        </span>
                        <span className="text-[#78756F]">— {r.reason}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Rentang Tanggal */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                    Tanggal Mulai Sewa
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setFormFeedback(null);
                    }}
                    className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 font-mono text-sm text-[#141413] focus:border-[#141413] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                    Tanggal Pengembalian
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setFormFeedback(null);
                    }}
                    className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 font-mono text-sm text-[#141413] focus:border-[#141413] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {conflictingRange && (
                <div className="flex items-start gap-2.5 rounded-xl border border-[#C83E2B]/30 bg-[#FDF2F0] p-3.5 text-xs font-medium text-[#9E2A1B]">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#C83E2B]" />
                  <span>
                    <strong>Jadwal Bentrok Terdeteksi:</strong> Rentang tanggal bertabrakan dengan slot{" "}
                    <span className="font-mono underline">
                      {conflictingRange.start} s/d {conflictingRange.end}
                    </span>{" "}
                    ({conflictingRange.reason}). Silakan pilih tanggal lain.
                  </span>
                </div>
              )}

              {/* Lokasi COD & Jam */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                    Zona Titik Temu COD Kampus (CCTV)
                  </label>
                  <select
                    value={codLocation}
                    onChange={(e) => setCodLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#141413] focus:border-[#141413] focus:bg-white focus:outline-none"
                  >
                    {COD_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                    Jam Serah Terima
                  </label>
                  <input
                    type="time"
                    value={codTime}
                    onChange={(e) => setCodTime(e.target.value)}
                    className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 font-mono text-sm text-[#141413] focus:border-[#141413] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                  Catatan Keperluan Praktikum / Riset
                </label>
                <textarea
                  rows={3}
                  value={purposeNote}
                  onChange={(e) => setPurposeNote(e.target.value)}
                  placeholder="Contoh: Digunakan untuk praktikum Sistem Mikrokontroler modul 4 di Lab TULT Lt. 9..."
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-3 text-sm text-[#141413] focus:border-[#141413] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={Boolean(conflictingRange) || totalDays <= 0}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#141413] px-6 py-3.5 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#C83E2B] disabled:cursor-not-allowed disabled:bg-[#DCD8CE] disabled:text-[#78756F]"
              >
                <Clock className="size-4" />
                <span>Ajukan Sewa &amp; Tahan Jadwal (Hold 24 Jam)</span>
              </button>
            </form>
          </div>

          {/* Ringkasan Kalkulasi Escrow */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-[#DCD8CE] bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-[#DCD8CE] bg-[#F6F5F0] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#575653]">
                  {selectedItem.sku}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#1B4332]">
                  <ShieldCheck className="size-3.5" />
                  ESCROW PROTECTED
                </span>
              </div>

              <h4 className="mt-3 text-base font-bold text-[#141413]">
                {selectedItem.name}
              </h4>
              <p className="mt-1 text-xs text-[#575653]">
                Pemilik: <strong className="text-[#141413]">{selectedItem.ownerName}</strong> •{" "}
                <span className="font-mono text-[11px]">NIM {selectedItem.ownerNim}</span>
              </p>

              <dl className="my-5 space-y-2.5 border-y border-[#EFECE6] py-4 text-xs">
                <div className="flex justify-between">
                  <dt className="text-[#575653]">Durasi Sewa</dt>
                  <dd className="font-mono font-semibold text-[#141413]">
                    {totalDays > 0 ? `${totalDays} Hari` : "-"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#575653]">
                    Tarif Sewa ({totalDays} × {formatRupiah(selectedItem.pricePerDay)})
                  </dt>
                  <dd className="font-mono font-semibold text-[#141413]">
                    {formatRupiah(rentalCost)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#575653]">Deposit Jaminan (Refund 100%)</dt>
                  <dd className="font-mono font-semibold text-[#141413]">
                    {formatRupiah(selectedItem.deposit)}
                  </dd>
                </div>
              </dl>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold text-[#141413]">
                  Total Tagihan Saat Disetujui
                </span>
                <span className="font-mono text-lg font-bold text-[#C83E2B]">
                  {formatRupiah(totalDays > 0 ? totalPayable : 0)}
                </span>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-3.5 text-xs leading-relaxed text-[#575653]">
                <Lock className="mt-0.5 size-4 shrink-0 text-[#141413]" />
                <span>
                  <strong className="text-[#141413]">Protokol Hold 24 Jam:</strong> Anda belum ditagih sekarang. Invoice Xendit dibuka selama <strong>120 menit</strong> setelah pemilik menyetujui pengajuan.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PANEL PERSETUJUAN PEMILIK */}
      {activeTab === "owner" && (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl border border-[#DCD8CE] bg-white p-6"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-md border border-[#DCD8CE] bg-[#F6F5F0] px-2.5 py-1 font-mono text-xs font-bold text-[#141413]">
                    {req.id}
                  </span>
                  <span className="font-mono text-[11px] text-[#78756F]">
                    SKU: {req.itemSku} • {req.createdAt}
                  </span>
                </div>

                <div>
                  {req.status === "MENUNGGU_PERSETUJUAN" && (
                    <Badge variant="hold" dot>
                      Hold 24J Aktif — Sisa {req.holdExpiresIn}
                    </Badge>
                  )}
                  {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                    <Badge variant="neutral" dot>
                      Disetujui — Menunggu Bayar ({req.paymentExpiresIn})
                    </Badge>
                  )}
                  {req.status === "SIAP_COD" && (
                    <Badge variant="available" dot>
                      Escrow Lunas — Siap COD Kampus
                    </Badge>
                  )}
                  {req.status === "DITOLAK" && (
                    <Badge variant="rented" dot>
                      Ditolak Pemilik
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2 md:col-span-2">
                  <h4 className="text-base font-bold text-[#141413]">{req.itemName}</h4>
                  <div className="grid grid-cols-1 gap-3 pt-1 text-xs text-[#575653] sm:grid-cols-2">
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
                        Penyewa Terverifikasi
                      </span>
                      <strong className="text-[#141413]">
                        {req.renterName} ({req.renterNim})
                      </strong>{" "}
                      — {req.renterProdi}
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
                        Periode Sewa
                      </span>
                      <strong className="font-mono text-[#C83E2B]">
                        {req.startDate} s/d {req.endDate} ({req.totalDays} Hari)
                      </strong>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
                        Titik Temu COD
                      </span>
                      <strong className="text-[#141413]">
                        {req.codLocation} ({req.codTime})
                      </strong>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
                        Nilai Escrow
                      </span>
                      <strong className="font-mono text-[#141413]">
                        Sewa {formatRupiah(req.rentalCost)} + Deposit{" "}
                        {formatRupiah(req.depositAmount)}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3 text-xs text-[#575653]">
                    <span className="font-semibold text-[#141413]">Catatan Keperluan:</span>{" "}
                    &ldquo;{req.purposeNote}&rdquo;
                  </div>

                  {req.rejectReason && (
                    <div className="mt-2 rounded-xl border border-[#C83E2B]/30 bg-[#FDF2F0] p-3 text-xs text-[#9E2A1B]">
                      <strong>Alasan Penolakan:</strong> {req.rejectReason}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-center gap-2.5 border-t border-[#EFECE6] pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  {req.status === "MENUNGGU_PERSETUJUAN" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApprove(req.id)}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1B4332] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#143326]"
                      >
                        <CheckCircle2 className="size-3.5" />
                        <span>Setujui Pengajuan Sewa</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejectingId(req.id)}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#C83E2B]/30 bg-[#FDF2F0] px-4 py-2.5 text-xs font-semibold text-[#C83E2B] transition hover:bg-[#C83E2B] hover:text-white"
                      >
                        <X className="size-3.5" />
                        <span>Tolak Pengajuan</span>
                      </button>
                    </>
                  )}

                  {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                    <div className="space-y-2">
                      <p className="text-xs text-[#575653]">
                        Menunggu penyewa melunasi invoice Xendit dalam batas 2 jam.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSimulatePaid(req.id)}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#141413] px-4 py-2.5 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#C83E2B]"
                      >
                        <Zap className="size-3.5" />
                        <span>Simulasikan Lunas (Buka Kontak)</span>
                      </button>
                    </div>
                  )}

                  {req.status === "SIAP_COD" && (
                    <button
                      type="button"
                      onClick={() => setActiveTab("cod")}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#1B4332]/25 bg-[#E9F3ED] px-4 py-2.5 text-xs font-semibold text-[#1B4332] transition hover:bg-[#1B4332] hover:text-white"
                    >
                      <span>Lihat Kontak COD</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  )}

                  {req.status === "DITOLAK" && (
                    <span className="text-center font-mono text-xs text-[#78756F]">
                      Pengajuan ditolak • Slot dibuka kembali
                    </span>
                  )}

                  {rejectingId === req.id && (
                    <div className="mt-2 space-y-2 rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-3">
                      <input
                        type="text"
                        value={rejectInput}
                        onChange={(e) => setRejectInput(e.target.value)}
                        placeholder="Tulis alasan penolakan teknis..."
                        className="w-full rounded-lg border border-[#DCD8CE] bg-white px-3 py-1.5 text-xs text-[#141413] focus:border-[#141413] focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleConfirmReject(req.id)}
                          className="flex-1 rounded-lg bg-[#C83E2B] py-1.5 text-xs font-semibold text-white"
                        >
                          Konfirmasi
                        </button>
                        <button
                          type="button"
                          onClick={() => setRejectingId(null)}
                          className="rounded-lg border border-[#DCD8CE] bg-white px-2.5 py-1.5 text-xs text-[#575653]"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: KONTAK WHATSAPP & COD */}
      {activeTab === "cod" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {requests.map((req) => {
            const isUnlocked = req.status === "SIAP_COD";
            return (
              <div
                key={req.id}
                className={`rounded-2xl border bg-white p-6 ${
                  isUnlocked ? "border-[#1B4332]/30" : "border-[#DCD8CE]"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md border border-[#DCD8CE] bg-[#F6F5F0] px-2.5 py-1 font-mono text-xs font-bold text-[#141413]">
                    {req.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold ${
                      isUnlocked
                        ? "bg-[#E9F3ED] text-[#1B4332]"
                        : "bg-[#EFECE6] text-[#575653]"
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Unlock className="size-3" />
                        <span>KONTAK COD TERBUKA</span>
                      </>
                    ) : (
                      <>
                        <Lock className="size-3" />
                        <span>KONTAK TERKUNCI</span>
                      </>
                    )}
                  </span>
                </div>

                <h4 className="mb-3 text-base font-bold text-[#141413]">{req.itemName}</h4>

                <div className="mb-4 space-y-1.5 rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[#575653]">
                    <MapPin className="size-3.5 shrink-0 text-[#C83E2B]" />
                    <strong className="text-[#141413]">{req.codLocation}</strong>
                  </div>
                  <div className="font-mono text-[11px] text-[#575653]">
                    Jadwal: <strong className="text-[#C83E2B]">{req.startDate} s/d {req.endDate}</strong> • Pukul {req.codTime}
                  </div>
                </div>

                {isUnlocked ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl border border-[#1B4332]/20 bg-[#E9F3ED]/50 p-3">
                        <span className="block font-mono text-[10px] uppercase text-[#575653]">
                          Pemilik Alat
                        </span>
                        <strong className="mt-0.5 block text-[#141413]">
                          {req.ownerName}
                        </strong>
                        <span className="block font-mono text-[11px] text-[#575653]">
                          NIM {req.ownerNim}
                        </span>
                        <span className="mt-1 block font-mono font-bold text-[#1B4332]">
                          {req.ownerPhone}
                        </span>
                      </div>

                      <div className="rounded-xl border border-[#1B4332]/20 bg-[#E9F3ED]/50 p-3">
                        <span className="block font-mono text-[10px] uppercase text-[#575653]">
                          Penyewa
                        </span>
                        <strong className="mt-0.5 block text-[#141413]">
                          {req.renterName}
                        </strong>
                        <span className="block font-mono text-[11px] text-[#575653]">
                          NIM {req.renterNim}
                        </span>
                        <span className="mt-1 block font-mono font-bold text-[#1B4332]">
                          {req.renterPhone}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`https://wa.me/62${req.ownerPhone.replace(/[^0-9]/g, "").replace(/^0/, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1B4332] py-2.5 text-xs font-semibold text-white transition hover:bg-[#143326]"
                      >
                        <MessageSquare className="size-3.5" />
                        <span>Hubungi WhatsApp COD</span>
                      </a>
                      <Link
                        href="/handover"
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-[#141413] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#141413] transition hover:bg-[#EFECE6]"
                      >
                        <span>Buka Checklist COD →</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-[#DCD8CE] bg-[#F6F5F0]/50 p-4 text-center text-xs text-[#575653]">
                    Nomor WhatsApp Pemilik (<span className="font-mono font-semibold">08xx-xxxx-xxxx</span>) disembunyikan otomatis hingga pembayaran escrow terkonfirmasi.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default function RentalRequestPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F0]">
      <PageHeader
        eyebrow="03 / BOOKING & JADWAL ANTI-BENTROK"
        title="Pengajuan & Persetujuan Sewa Alat"
        description="Kunci jadwal sewa selama 24 jam (Hold), pantau persetujuan pemilik, dan buka akses kontak COD kampus setelah pembayaran escrow lunas."
        actions={
          <>
            <Link
              href="/rentals/cancellation"
              className="rounded-xl border border-[#C83E2B]/35 bg-[#FDF2F0] px-3.5 py-2 text-xs font-semibold text-[#C83E2B] transition hover:bg-[#C83E2B] hover:text-white"
            >
              Pembatalan &amp; No-Show →
            </Link>
            <Link
              href="/catalog"
              className="rounded-xl border border-[#DCD8CE] bg-white px-3.5 py-2 text-xs font-semibold text-[#141413] transition hover:bg-[#EFECE6]"
            >
              ← Katalog Alat
            </Link>
          </>
        }
      />

      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 font-mono text-xs text-[#78756F]">
            Memuat matriks pengajuan sewa...
          </div>
        }
      >
        <RentalRequestContent />
      </Suspense>
    </div>
  );
}
