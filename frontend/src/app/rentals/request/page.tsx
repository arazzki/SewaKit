"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CatalogItem {
  id: string;
  name: string;
  category: string;
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

const DUMMY_ITEMS: CatalogItem[] = [
  {
    id: "ITM-001",
    name: "Oscilloscope Digital Rigol DS1054Z (4 Channel 50MHz)",
    category: "Perangkat IoT & Elektronika",
    pricePerDay: 45000,
    deposit: 150000,
    ownerName: "Triansyah Danishwara",
    ownerNim: "103032400062",
    ownerPhone: "0812-3456-7890",
    ownerProdi: "S1 Teknik Elektro",
    bookedRanges: [
      {
        start: "2026-11-02",
        end: "2026-11-04",
        reason: "Disewa oleh Mahasiswa lain",
      },
      {
        start: "2026-11-10",
        end: "2026-11-11",
        reason: "Ditahan (Hold 24 Jam)",
      },
    ],
  },
  {
    id: "ITM-002",
    name: "Paket Praktikum IoT Lengkap (ESP32 + Sensor Suhu, Ultrasonik, Relay, Breadboard)",
    category: "Perangkat IoT & Elektronika",
    pricePerDay: 20000,
    deposit: 75000,
    ownerName: "Rayvan Alifarlo",
    ownerNim: "103032400087",
    ownerPhone: "0813-9876-5432",
    ownerProdi: "S1 Teknologi Informasi",
    bookedRanges: [
      {
        start: "2026-11-05",
        end: "2026-11-07",
        reason: "Disewa oleh Mahasiswa lain",
      },
    ],
  },
  {
    id: "ITM-003",
    name: "Kamera Mirrorless Sony Alpha A6400 + Lensa 16-50mm + Tripod",
    category: "Perangkat Komputer & Multimedia",
    pricePerDay: 85000,
    deposit: 250000,
    ownerName: "Azriel Raihan",
    ownerNim: "103032400010",
    ownerPhone: "0857-1122-3344",
    ownerProdi: "S1 Informatika",
    bookedRanges: [],
  },
];

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
    itemId: "ITM-001",
    itemName: "Oscilloscope Digital Rigol DS1054Z (4 Channel 50MHz)",
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
    purposeNote: "Untuk praktikum modul rangkaian listrik & pengukuran sinyal gelombang.",
    status: "MENUNGGU_PERSETUJUAN",
    holdExpiresIn: "18 jam 42 menit",
    createdAt: "Hari ini, 10:15 WIB",
  },
  {
    id: "REQ-2026-085",
    itemId: "ITM-002",
    itemName: "Paket Praktikum IoT Lengkap (ESP32 + Sensor Suhu, Ultrasonik, Relay, Breadboard)",
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
    rentalCost: 60000,
    depositAmount: 75000,
    codLocation: "Perpustakaan Open Library (Gedung Manterawu Lt. 5)",
    codTime: "10:00 WIB",
    purposeNote: "Demo tugas besar mata kuliah IoT.",
    status: "SIAP_COD",
    holdExpiresIn: "-",
    createdAt: "Kemarin, 14:30 WIB",
  },
  {
    id: "REQ-2026-088",
    itemId: "ITM-003",
    itemName: "Kamera Mirrorless Sony Alpha A6400 + Lensa 16-50mm + Tripod",
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
    rentalCost: 170000,
    depositAmount: 250000,
    codLocation: "Selasar Gedung Kuliah Umum (GKU / Tokong Nanas)",
    codTime: "15:30 WIB",
    purposeNote: "Dokumentasi kegiatan himpunan & video presentasi proyek.",
    status: "DISETUJUI_MENUNGGU_BAYAR",
    holdExpiresIn: "Disetujui Pemilik",
    paymentExpiresIn: "01 jam 48 menit",
    createdAt: "Hari ini, 11:20 WIB",
  },
];

function isDateOverlapping(
  startA: string,
  endA: string,
  startB: string,
  endB: string
) {
  return startA <= endB && endA >= startB;
}

export default function RentalRequestPage() {
  const [activeTab, setActiveTab] = useState<"form" | "owner" | "cod">("form");
  const [requests, setRequests] = useState<RentalRequest[]>(INITIAL_REQUESTS);

  // Form states
  const [selectedItemId, setSelectedItemId] = useState<string>(DUMMY_ITEMS[0].id);
  const [startDate, setStartDate] = useState<string>("2026-11-12");
  const [endDate, setEndDate] = useState<string>("2026-11-13");
  const [codLocation, setCodLocation] = useState<string>(COD_LOCATIONS[0]);
  const [codTime, setCodTime] = useState<string>("13:00");
  const [purposeNote, setPurposeNote] = useState<string>("");
  const [formFeedback, setFormFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  // Reject modal state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectInput, setRejectInput] = useState<string>("");

  const selectedItem =
    DUMMY_ITEMS.find((item) => item.id === selectedItemId) || DUMMY_ITEMS[0];

  // Calculate days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const rentalCost = totalDays * selectedItem.pricePerDay;
  const totalPayable = rentalCost + selectedItem.deposit;

  // Check schedule conflict
  const conflictingRange = selectedItem.bookedRanges.find((range) =>
    startDate && endDate && startDate <= endDate
      ? isDateOverlapping(startDate, endDate, range.start, range.end)
      : false
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
        message: `Jadwal bentrok! Barang sudah tidak tersedia pada ${conflictingRange.start} s/d ${conflictingRange.end} (${conflictingRange.reason}).`,
      });
      return;
    }

    if (!purposeNote.trim()) {
      setFormFeedback({
        type: "error",
        message: "Mohon isi catatan keperluan praktikum/kuliah terlebih dahulu.",
      });
      return;
    }

    const newReq: RentalRequest = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 899)}`,
      itemId: selectedItem.id,
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
      holdExpiresIn: "23 jam 59 menit",
      createdAt: "Baru saja",
    };

    setRequests([newReq, ...requests]);
    setPurposeNote("");
    setFormFeedback({
      type: "success",
      message: `Pengajuan ${newReq.id} berhasil dibuat! Jadwal tanggal ${startDate} s/d ${endDate} kini ditahan (Hold) selama 24 jam menunggu respons Pemilik.`,
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
              paymentExpiresIn: "01 jam 59 menit",
            }
          : req
      )
    );
  };

  const handleSimulatePaid = (id: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "SIAP_COD",
              paymentExpiresIn: "Lunas (Xendit)",
            }
          : req
      )
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
          : req
      )
    );
    setRejectingId(null);
    setRejectInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-sm hover:bg-indigo-500 transition"
            >
              SK
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  Fitur #7: Pengajuan & Persetujuan Sewa
                </span>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                  PIC: Muhammad Ariq Azzaki
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Booking Tanggal Anti-Bentrok • Hold Jadwal 24 Jam • Persetujuan Pemilik • Kontak COD Kampus
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/rentals/cancellation"
              className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition"
            >
              Buka Fitur #8 (Pembatalan & No-Show) →
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl w-full flex-1 px-6 py-8">
        {/* Alur Informasi Banner */}
        <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
          <h2 className="text-sm font-bold text-indigo-950 mb-2">
            Alur Sistem Pengajuan & Persetujuan Sewa (Aturan Bisnis SewaKit):
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs text-indigo-900">
            <div className="rounded-xl bg-white p-3.5 shadow-xs border border-indigo-100">
              <span className="font-bold text-indigo-600 block mb-1">
                1. Cek Anti-Bentrok & Hold 24 Jam
              </span>
              Penyewa memilih rentang tanggal kosong. Begitu diajukan, jadwal otomatis ditahan (Hold) selama 24 jam agar tidak diserobot mahasiswa lain.
            </div>
            <div className="rounded-xl bg-white p-3.5 shadow-xs border border-indigo-100">
              <span className="font-bold text-indigo-600 block mb-1">
                2. Persetujuan Pemilik (Maks 24 Jam)
              </span>
              Pemilik menerima atau menolak pengajuan. Jika tidak direspons dalam 24 jam, pengajuan batal otomatis dan jadwal dibuka kembali.
            </div>
            <div className="rounded-xl bg-white p-3.5 shadow-xs border border-indigo-100">
              <span className="font-bold text-indigo-600 block mb-1">
                3. Batas Waktu Bayar 2 Jam
              </span>
              Setelah disetujui Pemilik, Penyewa wajib membayar biaya sewa + deposit dalam waktu 2 jam sebelum pesanan hangus otomatis.
            </div>
            <div className="rounded-xl bg-white p-3.5 shadow-xs border border-indigo-100">
              <span className="font-bold text-indigo-600 block mb-1">
                4. Pembukaan Kontak & Janjian COD
              </span>
              Setelah pembayaran terkonfirmasi, nomor WhatsApp kedua pihak ditampilkan untuk menyepakati serah terima COD di titik kampus.
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab("form")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "form"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            1. Form Pengajuan Sewa (Penyewa)
          </button>
          <button
            onClick={() => setActiveTab("owner")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === "owner"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>2. Panel Persetujuan Pemilik Barang</span>
            <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-950">
              {requests.filter((r) => r.status === "MENUNGGU_PERSETUJUAN").length} Pending
            </span>
          </button>
          <button
            onClick={() => setActiveTab("cod")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === "cod"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>3. Status Pengajuan & Kontak COD Kampus</span>
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
              {requests.filter((r) => r.status === "SIAP_COD").length} Siap COD
            </span>
          </button>
        </div>

        {/* TAB 1: FORM PENGAJUAN SEWA */}
        {activeTab === "form" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Formulir Pengajuan Sewa Alat Kuliah
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Pilih alat, periksa kalender tanggal yang terblokir, dan ajukan jadwal sewa.
              </p>

              {formFeedback && (
                <div
                  className={`mb-6 rounded-xl p-4 text-sm font-medium border ${
                    formFeedback.type === "error"
                      ? "bg-rose-50 border-rose-200 text-rose-800"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  }`}
                >
                  {formFeedback.message}
                </div>
              )}

              <form onSubmit={handleCreateRequest} className="space-y-5">
                {/* Pilih Barang */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pilih Alat / Paket Praktikum
                  </label>
                  <select
                    value={selectedItemId}
                    onChange={(e) => {
                      setSelectedItemId(e.target.value);
                      setFormFeedback(null);
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                  >
                    {DUMMY_ITEMS.map((item) => (
                      <option key={item.id} value={item.id}>
                        [{item.id}] {item.name} — Rp{" "}
                        {item.pricePerDay.toLocaleString("id-ID")}/hari
                      </option>
                    ))}
                  </select>
                </div>

                {/* Info Jadwal Terblokir / Anti-Bentrok */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-900">
                      Jadwal Tidak Tersedia (Sudah Dibooking / Ditahan 24 Jam):
                    </span>
                    <span className="rounded bg-amber-200/80 px-2 py-0.5 text-[11px] font-semibold text-amber-950">
                      Proteksi Anti-Bentrok Aktif
                    </span>
                  </div>
                  {selectedItem.bookedRanges.length === 0 ? (
                    <p className="text-xs text-emerald-700 font-medium">
                      ✓ Seluruh tanggal bulan ini masih tersedia untuk disewa.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-xs text-amber-900">
                      {selectedItem.bookedRanges.map((r, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
                          <span className="font-mono font-semibold">
                            {r.start} s/d {r.end}
                          </span>
                          <span className="text-amber-700">— {r.reason}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Pilih Rentang Tanggal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Tanggal Mulai Sewa
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setFormFeedback(null);
                      }}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Tanggal Selesai (Pengembalian)
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setFormFeedback(null);
                      }}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Real-time Conflict Warning */}
                {conflictingRange && (
                  <div className="rounded-xl border border-rose-300 bg-rose-50 p-3.5 text-xs text-rose-800 font-medium">
                    ⚠️ <strong>Jadwal Bentrok Terdeteksi:</strong> Rentang tanggal yang kamu pilih bertabrakan dengan jadwal{" "}
                    <span className="underline font-mono">
                      {conflictingRange.start} s/d {conflictingRange.end}
                    </span>{" "}
                    ({conflictingRange.reason}). Silakan pilih tanggal lain!
                  </div>
                )}

                {/* Pilih Titik COD & Jam */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Usulan Titik Temu COD Kampus
                    </label>
                    <select
                      value={codLocation}
                      onChange={(e) => setCodLocation(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    >
                      {COD_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Usulan Waktu COD
                    </label>
                    <input
                      type="time"
                      value={codTime}
                      onChange={(e) => setCodTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Catatan Keperluan */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Catatan Keperluan Praktikum / Kuliah untuk Pemilik
                  </label>
                  <textarea
                    rows={3}
                    value={purposeNote}
                    onChange={(e) => setPurposeNote(e.target.value)}
                    placeholder="Contoh: Digunakan untuk praktikum Sistem Mikrokontroler modul 4 di Lab TULT Lt. 9..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={Boolean(conflictingRange) || totalDays <= 0}
                  className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                >
                  Ajukan Sewa & Tahan Jadwal (Hold 24 Jam)
                </button>
              </form>
            </div>

            {/* Ringkasan Kalkulasi Biaya & Info Hold */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                  Ringkasan Pengajuan
                </span>
                <h4 className="mt-3 text-base font-bold text-slate-900">
                  {selectedItem.name}
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Pemilik: <strong className="text-slate-800">{selectedItem.ownerName}</strong> ({selectedItem.ownerProdi})
                </p>

                <div className="my-5 border-t border-b border-slate-100 py-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Durasi Sewa</span>
                    <span className="font-semibold text-slate-900">
                      {totalDays > 0 ? `${totalDays} Hari` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Biaya Sewa ({totalDays} x Rp{" "}
                      {selectedItem.pricePerDay.toLocaleString("id-ID")})
                    </span>
                    <span className="font-semibold text-slate-900">
                      Rp {rentalCost.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Deposit Jaminan (Refundable)</span>
                    <span className="font-semibold text-slate-900">
                      Rp {selectedItem.deposit.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-slate-900">
                    Total Dibayar Saat Disetujui
                  </span>
                  <span className="text-lg font-extrabold text-indigo-600">
                    Rp {(totalDays > 0 ? totalPayable : 0).toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3.5 text-xs text-slate-600 leading-relaxed border border-slate-200/80">
                  🔒 <strong>Aturan Penahanan Jadwal:</strong> Kamu belum perlu membayar sekarang. Pembayaran dibuka selama <strong>2 jam</strong> setelah Pemilik menyetujui pengajuanmu.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PANEL PERSETUJUAN PEMILIK BARANG */}
        {activeTab === "owner" && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Panel Persetujuan Sewa Masuk (Tampilan Pemilik Barang)
                </h3>
                <p className="text-xs text-slate-500">
                  Setiap pengajuan menahan jadwal selama 24 jam. Jika tidak direspons dalam 24 jam, pengajuan batal otomatis.
                </p>
              </div>
            </div>

            {requests.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-800">
                      {req.id}
                    </span>
                    <span className="text-xs text-slate-500">
                      Diajukan: {req.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === "MENUNGGU_PERSETUJUAN" && (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                        ⏳ Hold Jadwal 24 Jam (Sisa: {req.holdExpiresIn})
                      </span>
                    )}
                    {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                        ✓ Disetujui — Menunggu Pembayaran Penyewa (Batas 2 Jam: {req.paymentExpiresIn})
                      </span>
                    )}
                    {req.status === "SIAP_COD" && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                        ✓ Lunas — Siap COD di Kampus
                      </span>
                    )}
                    {req.status === "DITOLAK" && (
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                        ✕ Ditolak Pemilik
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {req.itemName}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                      <div>
                        <span className="text-slate-400 block">Peminjam (Penyewa):</span>
                        <strong className="text-slate-800">
                          {req.renterName} ({req.renterNim})
                        </strong>{" "}
                        — {req.renterProdi}
                      </div>
                      <div>
                        <span className="text-slate-400 block">Rentang Tanggal Sewa:</span>
                        <strong className="font-mono text-indigo-700">
                          {req.startDate} s/d {req.endDate} ({req.totalDays} Hari)
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Usulan Lokasi & Jam COD:</span>
                        <strong className="text-slate-800">
                          {req.codLocation} ({req.codTime})
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Nilai Transaksi:</span>
                        <strong className="text-slate-800">
                          Sewa Rp {req.rentalCost.toLocaleString("id-ID")} + Deposit Rp{" "}
                          {req.depositAmount.toLocaleString("id-ID")}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 border border-slate-200/70">
                      <span className="font-semibold text-slate-900">
                        Catatan Keperluan Penyewa:
                      </span>{" "}
                      &ldquo;{req.purposeNote}&rdquo;
                    </div>

                    {req.rejectReason && (
                      <div className="mt-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-800 border border-rose-200">
                        <strong>Alasan Penolakan:</strong> {req.rejectReason}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col justify-center gap-2.5 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    {req.status === "MENUNGGU_PERSETUJUAN" && (
                      <>
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition"
                        >
                          ✓ Terima Pengajuan Sewa
                        </button>
                        <button
                          onClick={() => setRejectingId(req.id)}
                          className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                        >
                          ✕ Tolak Pengajuan
                        </button>
                      </>
                    )}

                    {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                      <div className="space-y-2">
                        <p className="text-xs text-slate-500">
                          Menunggu Penyewa menyelesaikan pembayaran dalam 2 jam.
                        </p>
                        <button
                          onClick={() => handleSimulatePaid(req.id)}
                          className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
                        >
                          ⚡ Simulasikan Sudah Dibayar (Buka Kontak COD)
                        </button>
                      </div>
                    )}

                    {req.status === "SIAP_COD" && (
                      <button
                        onClick={() => setActiveTab("cod")}
                        className="w-full rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition"
                      >
                        Lihat Kontak WhatsApp & Detail COD →
                      </button>
                    )}

                    {req.status === "DITOLAK" && (
                      <span className="text-xs text-slate-400 text-center">
                        Pengajuan telah ditolak & jadwal dibuka kembali.
                      </span>
                    )}

                    {rejectingId === req.id && (
                      <div className="mt-2 space-y-2 rounded-xl border border-rose-200 bg-rose-50/50 p-3">
                        <input
                          type="text"
                          value={rejectInput}
                          onChange={(e) => setRejectInput(e.target.value)}
                          placeholder="Tulis alasan penolakan..."
                          className="w-full rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleConfirmReject(req.id)}
                            className="flex-1 rounded-lg bg-rose-600 py-1.5 text-xs font-bold text-white"
                          >
                            Konfirmasi Tolak
                          </button>
                          <button
                            onClick={() => setRejectingId(null)}
                            className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-slate-600 border"
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

        {/* TAB 3: TAMPILAN KONTAK UNTUK JANJIAN COD */}
        {activeTab === "cod" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">
                Daftar Kontak & Kesepakatan Titik COD Kampus
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Demi keamanan dan mencegah transaksi di luar platform, kontak WhatsApp kedua pihak hanya terbuka setelah pengajuan disetujui dan dibayar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.map((req) => {
                const isUnlocked = req.status === "SIAP_COD";
                return (
                  <div
                    key={req.id}
                    className={`rounded-2xl border p-6 shadow-xs ${
                      isUnlocked
                        ? "border-emerald-200 bg-white"
                        : "border-slate-200 bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded text-slate-800">
                        {req.id}
                      </span>
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                          isUnlocked
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isUnlocked ? "🔓 Kontak COD Terbuka" : "🔒 Kontak Terkunci"}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-3">
                      {req.itemName}
                    </h4>

                    <div className="rounded-xl bg-slate-50 p-3.5 text-xs space-y-1.5 border border-slate-200/80 mb-4">
                      <div>
                        <span className="text-slate-400">Titik Temu COD Kampus:</span>{" "}
                        <strong className="text-slate-900">{req.codLocation}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Jadwal Sewa & Jam COD:</span>{" "}
                        <strong className="text-indigo-700 font-mono">
                          {req.startDate} s/d {req.endDate} • Pukul {req.codTime}
                        </strong>
                      </div>
                    </div>

                    {isUnlocked ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                            <span className="text-slate-400 block mb-0.5">
                              Kontak Pemilik Alat:
                            </span>
                            <strong className="text-slate-900 block">
                              {req.ownerName}
                            </strong>
                            <span className="text-slate-500 block">
                              NIM: {req.ownerNim}
                            </span>
                            <span className="font-mono font-bold text-emerald-700 mt-1 block">
                              WA: {req.ownerPhone}
                            </span>
                          </div>
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                            <span className="text-slate-400 block mb-0.5">
                              Kontak Penyewa:
                            </span>
                            <strong className="text-slate-900 block">
                              {req.renterName}
                            </strong>
                            <span className="text-slate-500 block">
                              NIM: {req.renterNim}
                            </span>
                            <span className="font-mono font-bold text-emerald-700 mt-1 block">
                              WA: {req.renterPhone}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <a
                            href={`https://wa.me/62${req.ownerPhone.replace(/[^0-9]/g, "").replace(/^0/, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-center text-xs font-bold text-white hover:bg-emerald-500 transition"
                          >
                            💬 Hubungi WhatsApp untuk Janjian COD
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500">
                        Nomor WhatsApp Pemilik (<strong>08xx-xxxx-xxxx</strong>) & Penyewa masih disembunyikan hingga pengajuan disetujui dan pembayaran selesai.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
