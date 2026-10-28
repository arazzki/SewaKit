"use client";

import React, { useState } from "react";
import Link from "next/link";

type CancellationScenario =
  | "RENTER_EARLY"
  | "RENTER_LATE"
  | "OWNER_CANCEL"
  | "UNPAID_CANCEL";

interface ActiveOrder {
  id: string;
  itemName: string;
  renterName: string;
  ownerName: string;
  codSchedule: string;
  codLocation: string;
  rentalCost: number;
  depositAmount: number;
  isPaid: boolean;
  status:
    | "MENUNGGU_PEMBAYARAN_2_JAM"
    | "MENUNGGU_RESPON_24_JAM"
    | "SIAP_COD"
    | "DIBATALKAN_MANUAL"
    | "BATAL_OTOMATIS_SISTEM"
    | "BATAL_NO_SHOW";
  timeRemaining: string;
  cancelSummary?: string;
  refundToRenter?: number;
  compensationToOwner?: number;
}

const INITIAL_ORDERS: ActiveOrder[] = [
  {
    id: "TRX-2026-301",
    itemName: "Kamera Mirrorless Sony Alpha A6400 + Lensa 16-50mm",
    renterName: "Muhammad Ariq Azzaki",
    ownerName: "Azriel Raihan",
    codSchedule: "2026-11-14 • 15:30 WIB",
    codLocation: "Selasar Gedung Kuliah Umum (GKU)",
    rentalCost: 170000,
    depositAmount: 250000,
    isPaid: true,
    status: "SIAP_COD",
    timeRemaining: "Jadwal COD Terkonfirmasi",
  },
  {
    id: "TRX-2026-302",
    itemName: "Oscilloscope Digital Rigol DS1054Z (4 Channel 50MHz)",
    renterName: "Muhamad Alwan Suryadi",
    ownerName: "Triansyah Danishwara",
    codSchedule: "2026-11-10 • 13:00 WIB",
    codLocation: "Lobi Gedung TULT",
    rentalCost: 90000,
    depositAmount: 150000,
    isPaid: false,
    status: "MENUNGGU_PEMBAYARAN_2_JAM",
    timeRemaining: "00 jam 14 menit (Batas Bayar 2 Jam)",
  },
  {
    id: "TRX-2026-303",
    itemName: "Paket Praktikum IoT Lengkap (ESP32 + Sensor Kit)",
    renterName: "Muhammad Fiqri Habibi",
    ownerName: "Rayvan Alifarlo",
    codSchedule: "2026-11-08 • 09:00 WIB",
    codLocation: "Perpustakaan Open Library Lt. 5",
    rentalCost: 60000,
    depositAmount: 75000,
    isPaid: false,
    status: "MENUNGGU_RESPON_24_JAM",
    timeRemaining: "00 jam 05 menit (Batas Hold 24 Jam)",
  },
  {
    id: "TRX-2026-304",
    itemName: "Solder Station Digital + Multimeter Fluke 117",
    renterName: "Muhammad Ariq Azzaki",
    ownerName: "Triansyah Danishwara",
    codSchedule: "Hari ini • 10:00 WIB",
    codLocation: "Lobi Gedung TULT",
    rentalCost: 50000,
    depositAmount: 100000,
    isPaid: true,
    status: "SIAP_COD",
    timeRemaining: "Waktu COD Sedang Berlangsung",
  },
];

export default function CancellationAndNoShowPage() {
  const [orders, setOrders] = useState<ActiveOrder[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<"manual" | "auto" | "noshow">(
    "manual"
  );

  // Manual cancellation states
  const [selectedOrderId, setSelectedOrderId] = useState<string>("TRX-2026-301");
  const [scenario, setScenario] =
    useState<CancellationScenario>("RENTER_EARLY");
  const [cancelReason, setCancelReason] = useState<string>("");
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  // No-show states
  const [noShowOrderId, setNoShowOrderId] = useState<string>("TRX-2026-304");
  const [noShowParty, setNoShowParty] = useState<
    "RENTER_ABSENT" | "OWNER_ABSENT"
  >("RENTER_ABSENT");
  const [waitedMinutes, setWaitedMinutes] = useState<number>(35);
  const [proofFileName, setProofFileName] = useState<string>(
    "bukti_tunggu_lobi_tult.jpg"
  );
  const [noShowNotes, setNoShowNotes] = useState<string>("");

  const selectedOrder =
    orders.find((o) => o.id === selectedOrderId) || orders[0];
  const selectedNoShowOrder =
    orders.find((o) => o.id === noShowOrderId) || orders[3];

  // Refund calculation helper
  const computeRefundPreview = (
    order: ActiveOrder,
    scen: CancellationScenario
  ) => {
    const totalPaid = order.isPaid
      ? order.rentalCost + order.depositAmount
      : 0;
    if (!order.isPaid || scen === "UNPAID_CANCEL") {
      return {
        totalPaid: 0,
        refundRenter: 0,
        ownerComp: 0,
        ruleDesc:
          "Pesanan belum dibayar. Pembatalan bebas biaya dan jadwal barang langsung dibuka kembali.",
      };
    }

    if (scen === "RENTER_EARLY") {
      return {
        totalPaid,
        refundRenter: totalPaid,
        ownerComp: 0,
        ruleDesc:
          "Pembatalan oleh Penyewa > 24 jam sebelum jadwal COD: Pengembalian dana 100% (Sewa + Deposit kembali utuh).",
      };
    }

    if (scen === "RENTER_LATE") {
      const penalty = Math.round(order.rentalCost * 0.5);
      return {
        totalPaid,
        refundRenter: order.depositAmount + (order.rentalCost - penalty),
        ownerComp: penalty,
        ruleDesc:
          "Pembatalan mendadak oleh Penyewa (< 12 jam sebelum COD): Deposit kembali 100%, namun biaya sewa dipotong 50% sebagai kompensasi jadwal Pemilik.",
      };
    }

    return {
      totalPaid,
      refundRenter: totalPaid,
      ownerComp: 0,
      ruleDesc:
        "Pembatalan sepihak oleh Pemilik Barang: Penyewa menerima refund penuh 100% (Sewa + Deposit) dan sistem mencatat penalti pada akun Pemilik.",
    };
  };

  const preview = computeRefundPreview(selectedOrder, scenario);

  const handleConfirmManualCancel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelReason.trim()) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? {
              ...o,
              status: "DIBATALKAN_MANUAL",
              timeRemaining: "Jadwal Dibuka Kembali",
              refundToRenter: preview.refundRenter,
              compensationToOwner: preview.ownerComp,
              cancelSummary: `${preview.ruleDesc} (Alasan: "${cancelReason}")`,
            }
          : o
      )
    );
    setCancelReason("");
    setActionAlert(
      `Pesanan ${selectedOrder.id} berhasil dibatalkan. Refund ke Penyewa: Rp ${preview.refundRenter.toLocaleString("id-ID")}.`
    );
  };

  const handleTriggerAutoCancel = (id: string, type: "2H_PAYMENT" | "24H_HOLD") => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: "BATAL_OTOMATIS_SISTEM",
              timeRemaining: "Waktu Habis (Expired)",
              refundToRenter: 0,
              compensationToOwner: 0,
              cancelSummary:
                type === "2H_PAYMENT"
                  ? "Batal Otomatis: Penyewa melewati batas waktu pembayaran 2 jam setelah disetujui. Jadwal barang telah dibuka kembali untuk umum."
                  : "Batal Otomatis: Pemilik tidak merespons pengajuan dalam batas penahanan (Hold) 24 jam. Jadwal dibuka kembali.",
            }
          : o
      )
    );
    setActionAlert(
      `Simulasi Scheduler Berhasil: Pesanan ${id} otomatis dibatalkan karena batas waktu terlewat dan jadwal dikembalikan ke katalog!`
    );
  };

  const handleReportNoShow = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPaid =
      selectedNoShowOrder.rentalCost + selectedNoShowOrder.depositAmount;
    const isRenterAbsent = noShowParty === "RENTER_ABSENT";
    const ownerComp = isRenterAbsent ? selectedNoShowOrder.rentalCost : 0;
    const renterRefund = isRenterAbsent
      ? selectedNoShowOrder.depositAmount
      : totalPaid;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedNoShowOrder.id
          ? {
              ...o,
              status: "BATAL_NO_SHOW",
              timeRemaining: "Batal karena No-Show COD",
              refundToRenter: renterRefund,
              compensationToOwner: ownerComp,
              cancelSummary: isRenterAbsent
                ? `No-Show Penyewa (tidak hadir setelah ditunggu ${waitedMinutes} menit di ${selectedNoShowOrder.codLocation}). Deposit Rp ${renterRefund.toLocaleString("id-ID")} dikembalikan ke Penyewa, uang sewa Rp ${ownerComp.toLocaleString("id-ID")} diteruskan ke Pemilik sebagai kompensasi.`
                : `No-Show Pemilik Barang (tidak hadir setelah ditunggu ${waitedMinutes} menit di ${selectedNoShowOrder.codLocation}). Dana penuh Rp ${renterRefund.toLocaleString("id-ID")} (Sewa + Deposit) dikembalikan 100% ke Penyewa.`,
            }
          : o
      )
    );

    setActionAlert(
      `Laporan No-Show untuk ${selectedNoShowOrder.id} berhasil diproses! Bukti kehadiran (${proofFileName}) tercatat.`
    );
    setNoShowNotes("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
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
                  Fitur #8: Pembatalan & Laporan No-Show
                </span>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                  PIC: Muhammad Ariq Azzaki
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Kalkulasi Refund Pembatalan • Auto-Cancel Batas Bayar 2 Jam & Hold 24 Jam • Penanganan No-Show COD
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/rentals/request"
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition"
            >
              ← Kembali ke Fitur #7 (Pengajuan Sewa)
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Beranda
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl w-full flex-1 px-6 py-8">
        {actionAlert && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-900">
            <span>✓ {actionAlert}</span>
            <button
              onClick={() => setActionAlert(null)}
              className="text-xs font-bold text-emerald-700 underline ml-4"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab("manual")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "manual"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            1. Pembatalan oleh Penyewa / Pemilik (Aturan Refund)
          </button>
          <button
            onClick={() => setActiveTab("auto")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "auto"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            2. Pembatalan Otomatis (Lewat Batas Bayar 2 Jam / Hold 24 Jam)
          </button>
          <button
            onClick={() => setActiveTab("noshow")}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === "noshow"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            3. Laporan No-Show (Tidak Hadir Saat COD Kampus)
          </button>
        </div>

        {/* TAB 1: PEMBATALAN MANUAL & SIMULASI REFUND */}
        {activeTab === "manual" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Formulir Pembatalan Pesanan & Kalkulasi Pengembalian Dana
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Sistem otomatis menghitung nominal pengembalian sewa dan deposit sesuai waktu pembatalan dan pihak yang membatalkan.
              </p>

              <form onSubmit={handleConfirmManualCancel} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pilih Pesanan Sewa
                  </label>
                  <select
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        [{o.id}] {o.itemName} ({o.isPaid ? "Sudah Dibayar" : "Belum Dibayar"})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Skenario & Kondisi Pembatalan
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setScenario("RENTER_EARLY")}
                      className={`rounded-xl border p-3.5 text-left text-xs transition ${
                        scenario === "RENTER_EARLY"
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <span className="block font-bold text-slate-900 mb-0.5">
                        Penyewa Batal (&gt; 24 Jam Sebelum COD)
                      </span>
                      Refund 100% (Uang Sewa + Deposit kembali penuh)
                    </button>

                    <button
                      type="button"
                      onClick={() => setScenario("RENTER_LATE")}
                      className={`rounded-xl border p-3.5 text-left text-xs transition ${
                        scenario === "RENTER_LATE"
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <span className="block font-bold text-slate-900 mb-0.5">
                        Penyewa Batal Mendadak (&lt; 12 Jam COD)
                      </span>
                      Deposit kembali 100%, Sewa dipotong 50%
                    </button>

                    <button
                      type="button"
                      onClick={() => setScenario("OWNER_CANCEL")}
                      className={`rounded-xl border p-3.5 text-left text-xs transition ${
                        scenario === "OWNER_CANCEL"
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <span className="block font-bold text-slate-900 mb-0.5">
                        Dibatalkan oleh Pemilik Barang
                      </span>
                      Refund 100% utuh ke Penyewa + Penalti Pemilik
                    </button>

                    <button
                      type="button"
                      onClick={() => setScenario("UNPAID_CANCEL")}
                      className={`rounded-xl border p-3.5 text-left text-xs transition ${
                        scenario === "UNPAID_CANCEL"
                          ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <span className="block font-bold text-slate-900 mb-0.5">
                        Batal Sebelum Pembayaran
                      </span>
                      Tanpa denda, jadwal langsung dibuka kembali
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Alasan Pembatalan
                  </label>
                  <textarea
                    rows={3}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Contoh: Jadwal praktikum laboratorium diundur ke minggu depan oleh dosen..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!cancelReason.trim()}
                  className="w-full rounded-xl bg-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-xs hover:bg-rose-500 disabled:bg-slate-300 transition"
                >
                  Konfirmasi Batalkan Pesanan & Proses Pengembalian Dana
                </button>
              </form>
            </div>

            {/* Rincian Refund Otomatis */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs h-fit">
              <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
                Simulasi Perhitungan Refund
              </span>
              <h4 className="mt-3 text-base font-bold text-slate-900">
                {selectedOrder.itemName}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Jadwal COD: {selectedOrder.codSchedule}
              </p>

              <div className="my-5 border-t border-b border-slate-100 py-4 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Biaya Sewa Dibayar</span>
                  <span className="font-semibold text-slate-900">
                    Rp {(selectedOrder.isPaid ? selectedOrder.rentalCost : 0).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deposit Jaminan</span>
                  <span className="font-semibold text-slate-900">
                    Rp {(selectedOrder.isPaid ? selectedOrder.depositAmount : 0).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="text-slate-700 font-bold">Refund ke Penyewa</span>
                  <span className="font-extrabold text-emerald-600">
                    Rp {preview.refundRenter.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 font-bold">Kompensasi ke Pemilik</span>
                  <span className="font-bold text-indigo-600">
                    Rp {preview.ownerComp.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3.5 text-xs text-slate-700 leading-relaxed border border-slate-200">
                <strong>Aturan Diterapkan:</strong> {preview.ruleDesc}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUTO-CANCEL BATAS WAKTU */}
        {activeTab === "auto" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">
                Monitoring Batas Waktu & Pembatalan Otomatis (Auto-Expire)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Sistem otomatis membatalkan pesanan jika Pemilik tidak merespons dalam <strong>24 jam</strong> atau Penyewa tidak membayar dalam <strong>2 jam</strong> setelah disetujui.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-1 rounded text-slate-800">
                        {o.id}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          o.status === "MENUNGGU_PEMBAYARAN_2_JAM" ||
                          o.status === "MENUNGGU_RESPON_24_JAM"
                            ? "bg-amber-100 text-amber-800"
                            : o.status === "SIAP_COD"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {o.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {o.itemName}
                    </h4>

                    <div className="text-xs text-slate-600 space-y-1 mb-4">
                      <p>
                        Penyewa: <strong>{o.renterName}</strong> • Pemilik:{" "}
                        <strong>{o.ownerName}</strong>
                      </p>
                      <p>
                        Timer Status:{" "}
                        <strong className="text-amber-700 font-mono">
                          {o.timeRemaining}
                        </strong>
                      </p>
                    </div>

                    {o.cancelSummary && (
                      <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-900 mb-4">
                        {o.cancelSummary}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    {o.status === "MENUNGGU_PEMBAYARAN_2_JAM" && (
                      <button
                        onClick={() =>
                          handleTriggerAutoCancel(o.id, "2H_PAYMENT")
                        }
                        className="w-full rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-500 transition"
                      >
                        ⏰ Simulasikan Lewat Batas Bayar 2 Jam (Auto-Cancel)
                      </button>
                    )}
                    {o.status === "MENUNGGU_RESPON_24_JAM" && (
                      <button
                        onClick={() => handleTriggerAutoCancel(o.id, "24H_HOLD")}
                        className="w-full rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-500 transition"
                      >
                        ⏰ Simulasikan Lewat Hold 24 Jam Tanpa Respons (Auto-Cancel)
                      </button>
                    )}
                    {o.status !== "MENUNGGU_PEMBAYARAN_2_JAM" &&
                      o.status !== "MENUNGGU_RESPON_24_JAM" && (
                        <span className="block text-center text-xs text-slate-400">
                          Status transaksi: {o.status.replace(/_/g, " ")}
                        </span>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LAPORAN NO-SHOW SAAT COD */}
        {activeTab === "noshow" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Formulir Pelaporan No-Show (Pihak Tidak Datang Saat COD)
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Jika salah satu pihak tidak hadir di titik temu kampus setelah melewati batas toleransi tunggu (30 menit), transaksi dapat dibatalkan dengan kompensasi otomatis.
              </p>

              <form onSubmit={handleReportNoShow} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Pilih Transaksi yang Sedang Dijadwalkan COD
                  </label>
                  <select
                    value={noShowOrderId}
                    onChange={(e) => setNoShowOrderId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        [{o.id}] {o.itemName} — Lokasi: {o.codLocation}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Siapa Pihak yang Tidak Hadir (No-Show)?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNoShowParty("RENTER_ABSENT")}
                      className={`rounded-xl border p-4 text-left text-xs transition ${
                        noShowParty === "RENTER_ABSENT"
                          ? "border-rose-600 bg-rose-50 text-rose-950 font-semibold"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <span className="block font-bold text-slate-900 mb-1">
                        Penyewa Tidak Datang (Dilaporkan Pemilik)
                      </span>
                      Deposit dikembalikan ke Penyewa, tetapi biaya sewa diberikan ke Pemilik sebagai kompensasi waktu & transportasi.
                    </button>

                    <button
                      type="button"
                      onClick={() => setNoShowParty("OWNER_ABSENT")}
                      className={`rounded-xl border p-4 text-left text-xs transition ${
                        noShowParty === "OWNER_ABSENT"
                          ? "border-rose-600 bg-rose-50 text-rose-950 font-semibold"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <span className="block font-bold text-slate-900 mb-1">
                        Pemilik Barang Tidak Datang (Dilaporkan Penyewa)
                      </span>
                      Dana Sewa + Deposit dikembalikan 100% utuh ke Penyewa & akun Pemilik mendapat penalti No-Show.
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Durasi Menunggu di Titik COD (Menit)
                    </label>
                    <input
                      type="number"
                      min={30}
                      value={waitedMinutes}
                      onChange={(e) => setWaitedMinutes(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Bukti Foto Kehadiran di Titik COD Kampus
                    </label>
                    <input
                      type="text"
                      value={proofFileName}
                      onChange={(e) => setProofFileName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Kronologi Singkat
                  </label>
                  <textarea
                    rows={3}
                    value={noShowNotes}
                    onChange={(e) => setNoShowNotes(e.target.value)}
                    placeholder="Contoh: Sudah menunggu di Lobi Gedung TULT sejak pukul 10:00 WIB dan menghubungi via WhatsApp namun tidak aktif..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-rose-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-rose-500 transition"
                >
                  Kirim Laporan No-Show & Batalkan Transaksi
                </button>
              </form>
            </div>

            {/* Info Ringkasan Keputusan No-Show */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs h-fit space-y-4">
              <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                Keputusan Otomatis No-Show
              </span>
              <h4 className="text-base font-bold text-slate-900">
                {selectedNoShowOrder.itemName}
              </h4>
              <p className="text-xs text-slate-500">
                Titik COD: <strong>{selectedNoShowOrder.codLocation}</strong>
              </p>

              <div className="border-t border-b border-slate-100 py-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Refund ke Penyewa:</span>
                  <strong className="text-emerald-600 text-sm">
                    Rp{" "}
                    {(noShowParty === "RENTER_ABSENT"
                      ? selectedNoShowOrder.depositAmount
                      : selectedNoShowOrder.rentalCost +
                        selectedNoShowOrder.depositAmount
                    ).toLocaleString("id-ID")}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kompensasi ke Pemilik:</span>
                  <strong className="text-indigo-600 text-sm">
                    Rp{" "}
                    {(noShowParty === "RENTER_ABSENT"
                      ? selectedNoShowOrder.rentalCost
                      : 0
                    ).toLocaleString("id-ID")}
                  </strong>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Laporan No-Show wajib menyertakan bukti kehadiran di titik COD kampus setelah menunggu minimal <strong>30 menit</strong> dari jadwal yang disepakati.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
