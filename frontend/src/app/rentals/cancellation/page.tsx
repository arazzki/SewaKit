"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Timer,
  AlertTriangle,
  ShieldAlert,
  RotateCcw,
  Camera,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";

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
    itemName: "Kamera Mirrorless Sony Alpha A6400 + Kit 16-50mm",
    renterName: "Muhammad Ariq Azzaki",
    ownerName: "Azriel Raihan",
    codSchedule: "2026-11-14 • 15:30 WIB",
    codLocation: "Selasar Gedung Kuliah Umum (GKU)",
    rentalCost: 190000,
    depositAmount: 300000,
    isPaid: true,
    status: "SIAP_COD",
    timeRemaining: "Jadwal COD Terkonfirmasi",
  },
  {
    id: "TRX-2026-302",
    itemName: "Rigol DS1054Z Digital Oscilloscope (50 MHz, 4 Ch)",
    renterName: "Muhamad Alwan Suryadi",
    ownerName: "Triansyah Danishwara",
    codSchedule: "2026-11-10 • 13:00 WIB",
    codLocation: "Lobi Gedung TULT",
    rentalCost: 90000,
    depositAmount: 150000,
    isPaid: false,
    status: "MENUNGGU_PEMBAYARAN_2_JAM",
    timeRemaining: "00:14:22 (Batas Bayar 2 Jam)",
  },
  {
    id: "TRX-2026-303",
    itemName: "Kit Praktikum ESP32 WiFi + BLE + Paket Sensor IoT",
    renterName: "Muhammad Fiqri Habibi",
    ownerName: "Rayvan Alifarlo",
    codSchedule: "2026-11-08 • 09:00 WIB",
    codLocation: "Perpustakaan Open Library Lt. 5",
    rentalCost: 45000,
    depositAmount: 75000,
    isPaid: false,
    status: "MENUNGGU_RESPON_24_JAM",
    timeRemaining: "00:05:10 (Batas Hold 24 Jam)",
  },
  {
    id: "TRX-2026-304",
    itemName: "Multimeter Digital Auto-Range + Solder Station",
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
    "manual",
  );

  const [selectedOrderId, setSelectedOrderId] = useState<string>("TRX-2026-301");
  const [scenario, setScenario] =
    useState<CancellationScenario>("RENTER_EARLY");
  const [cancelReason, setCancelReason] = useState<string>("");
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const [noShowOrderId, setNoShowOrderId] = useState<string>("TRX-2026-304");
  const [noShowParty, setNoShowParty] = useState<
    "RENTER_ABSENT" | "OWNER_ABSENT"
  >("RENTER_ABSENT");
  const [waitedMinutes, setWaitedMinutes] = useState<number>(35);
  const [proofFileName, setProofFileName] = useState<string>(
    "bukti_tunggu_lobi_tult.jpg",
  );
  const [noShowNotes, setNoShowNotes] = useState<string>("");

  const selectedOrder =
    orders.find((o) => o.id === selectedOrderId) || orders[0];
  const selectedNoShowOrder =
    orders.find((o) => o.id === noShowOrderId) || orders[3];

  const computeRefundPreview = (
    order: ActiveOrder,
    scen: CancellationScenario,
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
          "Pesanan belum dibayar. Pembatalan bebas biaya dan slot kalender langsung dibuka kembali.",
      };
    }

    if (scen === "RENTER_EARLY") {
      return {
        totalPaid,
        refundRenter: totalPaid,
        ownerComp: 0,
        ruleDesc:
          "Pembatalan Penyewa > 24 jam sebelum jadwal COD: Pengembalian dana escrow 100% (Sewa + Deposit utuh).",
      };
    }

    if (scen === "RENTER_LATE") {
      const penalty = Math.round(order.rentalCost * 0.5);
      return {
        totalPaid,
        refundRenter: order.depositAmount + (order.rentalCost - penalty),
        ownerComp: penalty,
        ruleDesc:
          "Pembatalan mendadak Penyewa (< 12 jam sebelum COD): Deposit kembali 100%, tarif sewa dipotong 50% sebagai kompensasi jadwal pemilik.",
      };
    }

    return {
      totalPaid,
      refundRenter: totalPaid,
      ownerComp: 0,
      ruleDesc:
        "Pembatalan sepihak Pemilik Barang: Penyewa menerima refund 100% (Sewa + Deposit) dan sistem mencatat penalti reputasi pemilik.",
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
          : o,
      ),
    );
    setCancelReason("");
    setActionAlert(
      `Pesanan ${selectedOrder.id} dibatalkan. Refund otomatis ke Penyewa: ${formatRupiah(preview.refundRenter)}.`,
    );
  };

  const handleTriggerAutoCancel = (
    id: string,
    type: "2H_PAYMENT" | "24H_HOLD",
  ) => {
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
                  ? "Auto-Cancel Scheduler: Penyewa melewati batas waktu bayar 120 menit. Slot tanggal dikembalikan ke katalog publik."
                  : "Auto-Cancel Scheduler: Pemilik tidak merespons dalam batas Hold 24 jam. Slot tanggal dibuka kembali.",
            }
          : o,
      ),
    );
    setActionAlert(
      `Scheduler Sistem: Pesanan ${id} dibatalkan otomatis karena batas waktu terlewat & kalender dibuka kembali.`,
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
                ? `No-Show Penyewa (ditunggu ${waitedMinutes} menit di ${selectedNoShowOrder.codLocation}). Deposit ${formatRupiah(renterRefund)} dikembalikan ke Penyewa; biaya sewa ${formatRupiah(ownerComp)} diteruskan ke Pemilik.`
                : `No-Show Pemilik (ditunggu ${waitedMinutes} menit di ${selectedNoShowOrder.codLocation}). Dana penuh ${formatRupiah(renterRefund)} dikembalikan 100% ke Penyewa.`,
            }
          : o,
      ),
    );

    setActionAlert(
      `Laporan No-Show ${selectedNoShowOrder.id} terverifikasi! Bukti kehadiran (${proofFileName}) telah dicatat di buku besar escrow.`,
    );
    setNoShowNotes("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PageHeader
        eyebrow="Pembatalan Sewa"
        title="Pembatalan Pesanan & Laporan Tidak Hadir COD"
        description="Cek perhitungan pengembalian dana rekber serta laporkan jika pihak lawan tidak hadir saat jadwal COD."
        actions={
          <>
            <Link
              href="/rentals/request"
              className="rounded-xl border border-hairline bg-surface px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-surface-muted"
            >
              ← Pengajuan Sewa
            </Link>
            <Link
              href="/disputes"
              className="rounded-xl border border-ink bg-ink px-3.5 py-2 text-xs font-semibold text-canvas transition hover:bg-accent hover:border-accent"
            >
              Pusat Deposit &amp; Klaim →
            </Link>
          </>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        {actionAlert && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-forest/25 bg-forest-subtle px-5 py-3.5 text-xs font-medium text-forest">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{actionAlert}</span>
            </span>
            <button
              type="button"
              onClick={() => setActionAlert(null)}
              className="font-mono text-xs font-bold underline"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-hairline pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("manual")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "manual"
                ? "bg-ink text-canvas"
                : "border border-hairline bg-surface text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            <RotateCcw className="size-3.5" />
            <span>1. Kalkulator Pembatalan &amp; Refund</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("auto")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "auto"
                ? "bg-ink text-canvas"
                : "border border-hairline bg-surface text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            <Timer className="size-3.5" />
            <span>2. Auto-Cancel (Lewat 2 Jam / Hold 24 Jam)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("noshow")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "noshow"
                ? "bg-ink text-canvas"
                : "border border-hairline bg-surface text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            <ShieldAlert className="size-3.5" />
            <span>3. Laporan No-Show COD Kampus</span>
          </button>
        </div>

        {/* TAB 1: MANUAL CANCEL */}
        {activeTab === "manual" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-hairline bg-surface p-6 lg:col-span-8">
              <h3 className="text-base font-bold text-ink">
                Formulir Pembatalan &amp; Kalkulasi Pengembalian Dana
              </h3>
              <p className="mt-1 mb-6 text-xs text-ink-muted">
                Sistem menghitung otomatis porsi pengembalian biaya sewa dan deposit escrow berdasarkan jarak waktu ke jadwal COD.
              </p>

              <form onSubmit={handleConfirmManualCancel} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                    Pilih Nomor Transaksi Aktif
                  </label>
                  <select
                    value={selectedOrderId}
                    onChange={(e) => setSelectedOrderId(e.target.value)}
                    className="w-full rounded-xl border border-hairline bg-surface-subtle px-4 py-3 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        [{o.id}] {o.itemName} ({o.isPaid ? "Escrow Lunas" : "Belum Dibayar"})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                    Parameter Waktu &amp; Pihak Pembatal
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      {
                        key: "RENTER_EARLY" as const,
                        title: "Penyewa Batal (> 24 Jam Sebelum COD)",
                        desc: "Refund 100% (Sewa + Deposit kembali penuh)",
                      },
                      {
                        key: "RENTER_LATE" as const,
                        title: "Penyewa Batal Mendadak (< 12 Jam COD)",
                        desc: "Deposit kembali 100%, Sewa dipotong 50%",
                      },
                      {
                        key: "OWNER_CANCEL" as const,
                        title: "Dibatalkan Sepihak oleh Pemilik",
                        desc: "Refund 100% ke Penyewa + Penalti Pemilik",
                      },
                      {
                        key: "UNPAID_CANCEL" as const,
                        title: "Batal Sebelum Pembayaran",
                        desc: "Bebas denda, slot kalender dibuka kembali",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setScenario(opt.key)}
                        className={`rounded-xl border p-3.5 text-left text-xs transition ${
                          scenario === opt.key
                            ? "border-ink bg-surface-subtle ring-1 ring-ink"
                            : "border-hairline bg-surface text-ink-muted hover:border-ink"
                        }`}
                      >
                        <span className="mb-0.5 block font-bold text-ink">
                          {opt.title}
                        </span>
                        <span className="text-ink-muted">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                    Alasan Pembatalan
                  </label>
                  <textarea
                    rows={3}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Contoh: Jadwal praktikum laboratorium diundur ke minggu depan oleh asisten..."
                    className="w-full rounded-xl border border-hairline bg-surface-subtle px-4 py-3 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!cancelReason.trim()}
                  className="w-full rounded-xl bg-accent px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-hairline disabled:text-ink-subtle"
                >
                  Konfirmasi Pembatalan &amp; Proses Refund Escrow
                </button>
              </form>
            </div>

            <div className="h-fit rounded-2xl border border-hairline bg-surface p-6 lg:col-span-4">
              <Badge variant="rented" dot>
                SIMULASI REFUND ESCROW
              </Badge>
              <h4 className="mt-3 text-base font-bold text-ink">
                {selectedOrder.itemName}
              </h4>
              <p className="mt-1 font-mono text-xs text-ink-muted">
                COD: {selectedOrder.codSchedule}
              </p>

              <dl className="my-5 space-y-2.5 border-y border-surface-muted py-4 text-xs">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Biaya Sewa Terbayar</dt>
                  <dd className="font-mono font-semibold text-ink">
                    {formatRupiah(selectedOrder.isPaid ? selectedOrder.rentalCost : 0)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Deposit Jaminan</dt>
                  <dd className="font-mono font-semibold text-ink">
                    {formatRupiah(
                      selectedOrder.isPaid ? selectedOrder.depositAmount : 0,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-surface-muted pt-2.5">
                  <dt className="font-bold text-ink">Refund ke Penyewa</dt>
                  <dd className="font-mono text-sm font-bold text-forest">
                    {formatRupiah(preview.refundRenter)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-bold text-ink">Kompensasi Pemilik</dt>
                  <dd className="font-mono text-sm font-bold text-accent">
                    {formatRupiah(preview.ownerComp)}
                  </dd>
                </div>
              </dl>

              <div className="rounded-xl border border-hairline bg-surface-subtle p-3.5 text-xs leading-relaxed text-ink-muted">
                <strong className="text-ink">Aturan Diterapkan:</strong>{" "}
                {preview.ruleDesc}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AUTO-CANCEL */}
        {activeTab === "auto" && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-6"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-md border border-hairline bg-canvas px-2.5 py-1 font-mono text-xs font-bold text-ink">
                      {o.id}
                    </span>
                    <Badge
                      variant={
                        o.status === "MENUNGGU_PEMBAYARAN_2_JAM" ||
                        o.status === "MENUNGGU_RESPON_24_JAM"
                          ? "hold"
                          : o.status === "SIAP_COD"
                            ? "available"
                            : "rented"
                      }
                      dot
                    >
                      {o.status.replace(/_/g, " ")}
                    </Badge>
                  </div>

                  <h4 className="mb-2 text-base font-bold text-ink">
                    {o.itemName}
                  </h4>

                  <div className="mb-4 space-y-1 text-xs text-ink-muted">
                    <p>
                      Penyewa: <strong className="text-ink">{o.renterName}</strong> • Pemilik:{" "}
                      <strong className="text-ink">{o.ownerName}</strong>
                    </p>
                    <p>
                      Timer SLA:{" "}
                      <strong className="font-mono text-warning-ink">
                        {o.timeRemaining}
                      </strong>
                    </p>
                  </div>

                  {o.cancelSummary && (
                    <div className="mb-4 rounded-xl border border-accent/30 bg-accent-subtle p-3 text-xs text-accent-ink">
                      {o.cancelSummary}
                    </div>
                  )}
                </div>

                <div className="border-t border-surface-muted pt-3.5">
                  {o.status === "MENUNGGU_PEMBAYARAN_2_JAM" && (
                    <button
                      type="button"
                      onClick={() => handleTriggerAutoCancel(o.id, "2H_PAYMENT")}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-canvas transition hover:bg-accent"
                    >
                      <Timer className="size-3.5" />
                      <span>Simulasikan Lewat Batas Bayar 2 Jam (Auto-Cancel)</span>
                    </button>
                  )}
                  {o.status === "MENUNGGU_RESPON_24_JAM" && (
                    <button
                      type="button"
                      onClick={() => handleTriggerAutoCancel(o.id, "24H_HOLD")}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-canvas transition hover:bg-accent"
                    >
                      <Timer className="size-3.5" />
                      <span>Simulasikan Lewat Hold 24 Jam (Auto-Cancel)</span>
                    </button>
                  )}
                  {o.status !== "MENUNGGU_PEMBAYARAN_2_JAM" &&
                    o.status !== "MENUNGGU_RESPON_24_JAM" && (
                      <span className="block text-center font-mono text-xs text-ink-subtle">
                        STATUS AKHIR: {o.status.replace(/_/g, " ")}
                      </span>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: NO-SHOW */}
        {activeTab === "noshow" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-hairline bg-surface p-6 lg:col-span-8">
              <h3 className="text-base font-bold text-ink">
                Formulir Klaim No-Show Titik COD Kampus
              </h3>
              <p className="mt-1 mb-6 text-xs text-ink-muted">
                Jika salah satu pihak tidak hadir di titik temu kampus setelah melewati toleransi tunggu 30 menit, transaksi dibatalkan dengan pembagian kompensasi otomatis.
              </p>

              <form onSubmit={handleReportNoShow} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                    Pilih Transaksi Terjadwal COD
                  </label>
                  <select
                    value={noShowOrderId}
                    onChange={(e) => setNoShowOrderId(e.target.value)}
                    className="w-full rounded-xl border border-hairline bg-surface-subtle px-4 py-3 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                  >
                    {orders.map((o) => (
                      <option key={o.id} value={o.id}>
                        [{o.id}] {o.itemName} — {o.codLocation}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                    Pihak yang Tidak Hadir (No-Show)
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setNoShowParty("RENTER_ABSENT")}
                      className={`rounded-xl border p-4 text-left text-xs transition ${
                        noShowParty === "RENTER_ABSENT"
                          ? "border-accent bg-accent-subtle ring-1 ring-accent"
                          : "border-hairline bg-surface text-ink-muted"
                      }`}
                    >
                      <span className="mb-1 block font-bold text-ink">
                        Penyewa Tidak Hadir (Dilaporkan Pemilik)
                      </span>
                      Deposit dikembalikan ke Penyewa; biaya sewa diteruskan ke Pemilik sebagai kompensasi waktu tunggu.
                    </button>

                    <button
                      type="button"
                      onClick={() => setNoShowParty("OWNER_ABSENT")}
                      className={`rounded-xl border p-4 text-left text-xs transition ${
                        noShowParty === "OWNER_ABSENT"
                          ? "border-accent bg-accent-subtle ring-1 ring-accent"
                          : "border-hairline bg-surface text-ink-muted"
                      }`}
                    >
                      <span className="mb-1 block font-bold text-ink">
                        Pemilik Tidak Hadir (Dilaporkan Penyewa)
                      </span>
                      Dana Sewa + Deposit dikembalikan 100% utuh ke Penyewa &amp; akun Pemilik tercatat penalti SLA.
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                      Durasi Menunggu di Titik COD (Menit)
                    </label>
                    <input
                      type="number"
                      min={30}
                      value={waitedMinutes}
                      onChange={(e) => setWaitedMinutes(Number(e.target.value))}
                      className="w-full rounded-xl border border-hairline bg-surface-subtle px-4 py-2.5 font-mono text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                      Lampiran Foto Bukti Kehadiran
                    </label>
                    <div className="relative">
                      <Camera className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
                      <input
                        type="text"
                        value={proofFileName}
                        onChange={(e) => setProofFileName(e.target.value)}
                        className="w-full rounded-xl border border-hairline bg-surface-subtle py-2.5 pl-10 pr-4 font-mono text-xs text-ink focus:border-ink focus:bg-surface focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-ink-muted">
                    Kronologi Kejadian
                  </label>
                  <textarea
                    rows={3}
                    value={noShowNotes}
                    onChange={(e) => setNoShowNotes(e.target.value)}
                    placeholder="Contoh: Sudah menunggu di Lobi Gedung TULT sejak pukul 10:00 WIB dan menghubungi via WhatsApp namun tidak aktif..."
                    className="w-full rounded-xl border border-hairline bg-surface-subtle px-4 py-3 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-xs font-semibold text-white transition hover:bg-accent-hover"
                >
                  <AlertTriangle className="size-4" />
                  <span>Kirim Laporan No-Show &amp; Eksekusi Kompensasi</span>
                </button>
              </form>
            </div>

            <div className="h-fit space-y-4 rounded-2xl border border-hairline bg-surface p-6 lg:col-span-4">
              <Badge variant="hold" dot>
                KEPUTUSAN OTOMATIS NO-SHOW
              </Badge>
              <h4 className="text-base font-bold text-ink">
                {selectedNoShowOrder.itemName}
              </h4>
              <p className="text-xs text-ink-muted">
                Titik COD: <strong className="text-ink">{selectedNoShowOrder.codLocation}</strong>
              </p>

              <dl className="space-y-2.5 border-y border-surface-muted py-4 text-xs">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Refund ke Penyewa</dt>
                  <dd className="font-mono text-sm font-bold text-forest">
                    {formatRupiah(
                      noShowParty === "RENTER_ABSENT"
                        ? selectedNoShowOrder.depositAmount
                        : selectedNoShowOrder.rentalCost +
                            selectedNoShowOrder.depositAmount,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Kompensasi Pemilik</dt>
                  <dd className="font-mono text-sm font-bold text-accent">
                    {formatRupiah(
                      noShowParty === "RENTER_ABSENT"
                        ? selectedNoShowOrder.rentalCost
                        : 0,
                    )}
                  </dd>
                </div>
              </dl>

              <p className="text-xs leading-relaxed text-ink-muted">
                Klaim No-Show wajib melampirkan foto timestamp di lokasi CCTV kampus setelah menunggu minimal <strong>30 menit</strong> dari jam kesepakatan.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
