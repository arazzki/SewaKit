"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  ArrowLeft,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";

export default function DisputesAndDepositPage() {
  const [activeTab, setActiveTab] = useState<"deposit" | "sengketa">("deposit");
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimReason, setClaimReason] = useState("");
  const [claimAmount, setClaimAmount] = useState("50000");
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const [depositData] = useState({
    totalHeld: 150000,
    orderId: "REQ-2026-089",
    itemName: "Rigol DS1054Z Digital Oscilloscope (50 MHz, 4 Ch)",
    status: "DITAHAN_ESCROW",
    dendaKeterlambatan: 0,
    dendaKerusakan: 0,
  });

  const netRefund =
    depositData.totalHeld -
    depositData.dendaKeterlambatan -
    depositData.dendaKerusakan;

  const handleWithdraw = () => {
    setAlertMsg(
      `Pencairan deposit berhasil diproses. Dana ${formatRupiah(
        netRefund,
      )} diteruskan otomatis ke rekening penyewa.`,
    );
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setShowClaimModal(false);
    setAlertMsg(
      "Klaim sengketa sebesar " +
        formatRupiah(Number(claimAmount)) +
        " diteruskan ke Moderator SewaKit untuk audit perbandingan foto serah terima.",
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F0]">
      <PageHeader
        eyebrow="05 / PROTEKSI DEPOSIT & MEDIASI SENGKETA"
        title="Manajemen Deposit Escrow & Resolusi Klaim"
        description="Transparansi perhitungan pengembalian jaminan penyewa, pemotongan denda terukur, dan eskalasi bukti fisik ke moderator kampus."
        actions={
          <Link
            href="/handover"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#141413] bg-white px-4 py-2.5 text-xs font-medium text-[#141413] transition hover:bg-[#EFECE6]"
          >
            <ArrowLeft className="size-3.5" />
            <span>Protokol Serah Terima</span>
          </Link>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        {alertMsg && (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1B4332]/25 bg-[#E9F3ED] px-4 py-3 text-xs font-medium text-[#1B4332]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{alertMsg}</span>
            </span>
            <button
              type="button"
              onClick={() => setAlertMsg(null)}
              className="font-mono font-semibold underline"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Minimalist Segmented Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#DCD8CE] pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("deposit")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "deposit"
                ? "bg-[#141413] text-[#F6F5F0]"
                : "border border-[#DCD8CE] bg-white text-[#575653] hover:border-[#141413] hover:text-[#141413]"
            }`}
          >
            <ShieldCheck className="size-3.5" />
            <span>01. Buku Besar Penahanan Deposit</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sengketa")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "sengketa"
                ? "bg-[#141413] text-[#F6F5F0]"
                : "border border-[#DCD8CE] bg-white text-[#575653] hover:border-[#141413] hover:text-[#141413]"
            }`}
          >
            <Scale className="size-3.5" />
            <span>02. Pusat Mediasi Sengketa &amp; Klaim</span>
          </button>
        </div>

        {/* TAB 1: KELOLA DEPOSIT */}
        {activeTab === "deposit" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFECE6] bg-[#FBF9F5] px-6 py-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#78756F]">
                      {depositData.orderId}
                    </span>
                    <h2 className="mt-0.5 text-base font-bold text-[#141413]">
                      {depositData.itemName}
                    </h2>
                  </div>
                  <Badge variant="available" dot>
                    Dana Terkunci di Escrow
                  </Badge>
                </div>

                <div className="p-6">
                  <dl className="space-y-3 border-b border-[#EFECE6] pb-5 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-[#575653]">
                        Setoran Awal Deposit Jaminan
                      </dt>
                      <dd className="font-mono font-semibold text-[#141413]">
                        {formatRupiah(depositData.totalHeld)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#575653]">
                        Potongan Denda Keterlambatan
                      </dt>
                      <dd className="font-mono font-semibold text-[#141413]">
                        -{formatRupiah(depositData.dendaKeterlambatan)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#575653]">
                        Potongan Kompensasi Kerusakan Fisik
                      </dt>
                      <dd className="font-mono font-semibold text-[#141413]">
                        -{formatRupiah(depositData.dendaKerusakan)}
                      </dd>
                    </div>
                  </dl>

                  <div className="my-5 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-[#141413]">
                      Estimasi Pengembalian Bersih ke Penyewa
                    </span>
                    <span className="font-mono text-2xl font-bold text-[#1B4332]">
                      {formatRupiah(netRefund)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleWithdraw}
                      className="flex-1 rounded-xl bg-[#141413] px-4 py-3 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#1B4332]"
                    >
                      Rilis &amp; Kembalikan Deposit ke Penyewa
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowClaimModal(true)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-xs font-semibold text-[#B42318] transition hover:bg-[#B42318] hover:text-white"
                    >
                      <AlertTriangle className="size-3.5" />
                      <span>Ajukan Klaim Kerusakan</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 space-y-3 text-xs">
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
                  ATURAN ESCROW SEWAKIT
                </span>
                <h3 className="text-sm font-bold text-[#141413]">
                  Perlindungan Dua Arah
                </h3>
                <ol className="space-y-2.5 text-[#575653] leading-relaxed">
                  <li>
                    <strong className="font-mono text-[#141413]">01.</strong>{" "}
                    Dana jaminan dibekukan pada rekening penampung selama masa sewa aktif.
                  </li>
                  <li>
                    <strong className="font-mono text-[#141413]">02.</strong>{" "}
                    Apabila checklist pengembalian cocok dengan kondisi awal, dana kembali 100% tanpa potongan.
                  </li>
                  <li>
                    <strong className="font-mono text-[#141413]">03.</strong>{" "}
                    Plafon maksimal klaim denda dibatasi sebesar nilai deposit ({formatRupiah(depositData.totalHeld)}).
                  </li>
                </ol>
              </div>
            </aside>
          </div>
        )}

        {/* TAB 2: SENGKETA */}
        {activeTab === "sengketa" && (
          <div className="rounded-2xl border border-[#DCD8CE] bg-white p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-[#141413]">
                  Antrian Mediasi Sengketa Aktif
                </h2>
                <p className="mt-0.5 text-xs text-[#575653]">
                  Keputusan akhir ditetapkan oleh Moderator berdasarkan bukti foto timestamp saat pengambilan vs pengembalian COD.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowClaimModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#C83E2B] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#AE3221]"
              >
                <Plus className="size-3.5" />
                <span>Buat Tiket Klaim Baru</span>
              </button>
            </div>

            <div className="rounded-xl border border-dashed border-[#DCD8CE] bg-[#FBF9F5] py-12 text-center">
              <Scale className="mx-auto mb-2 size-6 text-[#78756F]" />
              <p className="text-xs font-semibold text-[#141413]">
                Tidak ada tiket sengketa yang sedang terbuka
              </p>
              <p className="mt-1 text-xs text-[#78756F]">
                Seluruh transaksi aktif berjalan normal sesuai protokol serah terima.
              </p>
            </div>
          </div>
        )}

        {/* MODAL KLAIM */}
        {showClaimModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/45 p-4 backdrop-blur-[2px]">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[#EFECE6] bg-[#FBF9F5] px-5 py-3.5">
                <h3 className="text-sm font-bold text-[#141413]">
                  Formulir Pengajuan Klaim Deposit
                </h3>
                <button
                  type="button"
                  onClick={() => setShowClaimModal(false)}
                  className="rounded-lg p-1 text-[#78756F] hover:bg-[#EFECE6] hover:text-[#141413]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitClaim} className="space-y-4 p-5 text-xs">
                <div>
                  <label className="mb-1.5 block font-semibold text-[#141413]">
                    Nominal Kompensasi yang Diajukan (Rp)
                  </label>
                  <input
                    type="number"
                    max={depositData.totalHeld}
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[#DCD8CE] bg-white px-3.5 font-mono text-sm text-[#141413] focus:border-[#141413] focus:outline-none"
                  />
                  <span className="mt-1 block font-mono text-[10px] text-[#78756F]">
                    Batas klaim: {formatRupiah(depositData.totalHeld)} (100% nilai deposit)
                  </span>
                </div>

                <div>
                  <label className="mb-1.5 block font-semibold text-[#141413]">
                    Kronologi &amp; Rincian Kerusakan Komponen
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={claimReason}
                    onChange={(e) => setClaimReason(e.target.value)}
                    placeholder="Contoh: Probe channel 2 patah pada pengait ujung saat pengembalian di Lobi TULT..."
                    className="w-full rounded-xl border border-[#DCD8CE] bg-white px-3.5 py-2.5 text-xs text-[#141413] focus:border-[#141413] focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#B42318] py-2.5 font-semibold text-white transition hover:bg-[#912018]"
                  >
                    Kirim Klaim ke Moderator
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClaimModal(false)}
                    className="rounded-xl border border-[#DCD8CE] bg-white px-4 py-2.5 font-medium text-[#575653] hover:bg-[#F6F5F0]"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
