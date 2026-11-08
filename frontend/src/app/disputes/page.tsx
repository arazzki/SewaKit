"use client";

import React, { useState } from "react";
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
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
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
    <div className="flex min-h-screen flex-col bg-canvas">
      <PageHeader
        eyebrow="Deposit & Sengketa"
        title="Pengembalian Deposit & Mediasi Klaim"
        description="Rincian pengembalian uang jaminan penyewa, perhitungan denda keterlambatan, dan pengajuan klaim kerusakan ke moderator."
        actions={
          <Button href="/handover" variant="outline" className="border-ink">
            <ArrowLeft className="size-3.5" />
            <span>Protokol Serah Terima</span>
          </Button>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        {alertMsg && (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-forest/25 bg-forest-subtle px-4 py-3 text-xs font-medium text-forest">
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

        <div className="flex flex-wrap gap-2 border-b border-hairline pb-4">
          <Button
            variant={activeTab === "deposit" ? "primary" : "outline"}
            onClick={() => setActiveTab("deposit")}
            className="font-semibold"
          >
            <ShieldCheck className="size-3.5" />
            <span>01. Buku Besar Penahanan Deposit</span>
          </Button>
          <Button
            variant={activeTab === "sengketa" ? "primary" : "outline"}
            onClick={() => setActiveTab("sengketa")}
            className="font-semibold"
          >
            <Scale className="size-3.5" />
            <span>02. Pusat Mediasi Sengketa &amp; Klaim</span>
          </Button>
        </div>

        {activeTab === "deposit" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Card className="overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-muted bg-surface-subtle px-6 py-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-ink-subtle">
                      {depositData.orderId}
                    </span>
                    <h2 className="mt-0.5 text-base font-bold text-ink">
                      {depositData.itemName}
                    </h2>
                  </div>
                  <Badge variant="available" dot>
                    Dana Terkunci di Escrow
                  </Badge>
                </div>

                <div className="p-6">
                  <dl className="space-y-3 border-b border-surface-muted pb-5 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">
                        Setoran Awal Deposit Jaminan
                      </dt>
                      <dd className="font-mono font-semibold text-ink">
                        {formatRupiah(depositData.totalHeld)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">
                        Potongan Denda Keterlambatan
                      </dt>
                      <dd className="font-mono font-semibold text-ink">
                        -{formatRupiah(depositData.dendaKeterlambatan)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-muted">
                        Potongan Kompensasi Kerusakan Fisik
                      </dt>
                      <dd className="font-mono font-semibold text-ink">
                        -{formatRupiah(depositData.dendaKerusakan)}
                      </dd>
                    </div>
                  </dl>

                  <div className="my-5 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-ink">
                      Estimasi Pengembalian Bersih ke Penyewa
                    </span>
                    <span className="font-mono text-2xl font-bold text-forest">
                      {formatRupiah(netRefund)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <Button
                      size="lg"
                      onClick={handleWithdraw}
                      className="flex-1 text-xs font-semibold hover:bg-forest hover:border-forest"
                    >
                      Rilis &amp; Kembalikan Deposit ke Penyewa
                    </Button>
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={() => setShowClaimModal(true)}
                      className="text-xs font-semibold"
                    >
                      <AlertTriangle className="size-3.5" />
                      <span>Ajukan Klaim Kerusakan</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <Card as="aside" className="lg:col-span-4 p-5 space-y-3 text-xs">
              <span className="block text-xs font-semibold text-accent">
                ATURAN ESCROW SEWAKIT
              </span>
              <h3 className="text-sm font-bold text-ink">
                Perlindungan Dua Arah
              </h3>
              <ol className="space-y-2.5 text-ink-muted leading-relaxed">
                <li>
                  <strong className="font-mono text-ink">01.</strong>{" "}
                  Dana jaminan dibekukan pada rekening penampung selama masa sewa aktif.
                </li>
                <li>
                  <strong className="font-mono text-ink">02.</strong>{" "}
                  Apabila checklist pengembalian cocok dengan kondisi awal, dana kembali 100% tanpa potongan.
                </li>
                <li>
                  <strong className="font-mono text-ink">03.</strong>{" "}
                  Plafon maksimal klaim denda dibatasi sebesar nilai deposit ({formatRupiah(depositData.totalHeld)}).
                </li>
              </ol>
            </Card>
          </div>
        )}

        {activeTab === "sengketa" && (
          <Card className="p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-ink">
                  Antrian Mediasi Sengketa Aktif
                </h2>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Keputusan akhir ditetapkan oleh Moderator berdasarkan bukti foto timestamp saat pengambilan vs pengembalian COD.
                </p>
              </div>
              <Button
                variant="accent"
                onClick={() => setShowClaimModal(true)}
                className="font-semibold"
              >
                <Plus className="size-3.5" />
                <span>Buat Tiket Klaim Baru</span>
              </Button>
            </div>

            <div className="rounded-xl border border-dashed border-hairline bg-surface-subtle py-12 text-center">
              <Scale className="mx-auto mb-2 size-6 text-ink-subtle" />
              <p className="text-xs font-semibold text-ink">
                Tidak ada tiket sengketa yang sedang terbuka
              </p>
              <p className="mt-1 text-xs text-ink-subtle">
                Seluruh transaksi aktif berjalan normal sesuai protokol serah terima.
              </p>
            </div>
          </Card>
        )}

        {showClaimModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-[2px]">
            <Card className="w-full max-w-md overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-surface-muted bg-surface-subtle px-5 py-3.5">
                <h3 className="text-sm font-bold text-ink">
                  Formulir Pengajuan Klaim Deposit
                </h3>
                <button
                  type="button"
                  onClick={() => setShowClaimModal(false)}
                  className="rounded-lg p-1 text-ink-subtle hover:bg-surface-muted hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitClaim} className="space-y-4 p-5 text-xs">
                <div>
                  <label className="mb-1.5 block font-semibold text-ink">
                    Nominal Kompensasi yang Diajukan (Rp)
                  </label>
                  <Input
                    type="number"
                    max={depositData.totalHeld}
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="font-mono"
                  />
                  <span className="mt-1 block font-mono text-xs text-ink-subtle">
                    Batas klaim: {formatRupiah(depositData.totalHeld)} (100% nilai deposit)
                  </span>
                </div>

                <div>
                  <label className="mb-1.5 block font-semibold text-ink">
                    Kronologi &amp; Rincian Kerusakan Komponen
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={claimReason}
                    onChange={(e) => setClaimReason(e.target.value)}
                    placeholder="Contoh: Probe channel 2 patah pada pengait ujung saat pengembalian di Lobi TULT..."
                    className="w-full rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-xs text-ink focus:border-ink focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    type="submit"
                    variant="danger-solid"
                    className="flex-1 font-semibold"
                  >
                    Kirim Klaim ke Moderator
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowClaimModal(false)}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
