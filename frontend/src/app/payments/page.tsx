"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Timer,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Building2,
  Wallet,
  Copy,
  Check,
  ArrowUpRight,
  Zap,
  X,
  Lock,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BrandLogo from "@/components/BrandLogo";
import Badge from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";

type PaymentMethod = "qris" | "bca_va" | "mandiri_va" | "ewallet";

const PAYMENT_CHANNELS: {
  id: PaymentMethod;
  label: string;
  code: string;
  subtitle: string;
  feeTag: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "qris",
    label: "QRIS Instan Nasional",
    code: "QRIS",
    subtitle: "GoPay, ShopeePay, OVO, DANA, BCA Mobile, Livin'",
    feeTag: "Rp 0 Biaya Kanal",
    icon: QrCode,
  },
  {
    id: "bca_va",
    label: "BCA Virtual Account",
    code: "BCA-VA",
    subtitle: "Verifikasi webhook otomatis 24 jam",
    feeTag: "Auto-Callback",
    icon: Building2,
  },
  {
    id: "mandiri_va",
    label: "Mandiri Virtual Account",
    code: "MDR-VA",
    subtitle: "Pembayaran via Livin' by Mandiri / ATM",
    feeTag: "Auto-Callback",
    icon: Building2,
  },
  {
    id: "ewallet",
    label: "E-Wallet Direct Link",
    code: "EWALLET",
    subtitle: "Otorisasi instan nomor ponsel terdaftar",
    feeTag: "Instan",
    icon: Wallet,
  },
];

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("qris");
  const [showXenditModal, setShowXenditModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  // Timer batas waktu 2 jam (menit & detik)
  const [secondsLeft, setSecondsLeft] = useState(6135); // 01:42:15 seperti spesifikasi

  useEffect(() => {
    if (isPaid || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaid, secondsLeft]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const billDetails = {
    orderId: "INV-SK-2026-088",
    requestCode: "REQ-2026-088",
    itemName: "Kamera Mirrorless Sony Alpha A6400 + Lensa 16-50mm",
    sku: "MMD-SNY-6400",
    ownerName: "Azriel Raihan (S1 Informatika)",
    codLocation: "Selasar Gedung Kuliah Umum (GKU)",
    rentalDays: 2,
    rentalCost: 170000,
    depositAmount: 250000,
    adminFee: 2500,
  };

  const totalAmount =
    billDetails.rentalCost + billDetails.depositAmount + billDetails.adminFee;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowXenditModal(false);
      setIsPaid(true);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F0]">
      <PageHeader
        eyebrow="03 / REKENING BERSAMA & GATEWAY PEMBAYARAN"
        title="Checkout Escrow Xendit Sandbox"
        description="Dana sewa dan deposit jaminan disimpan aman pada akun penampung SewaKit hingga serah terima fisik COD terverifikasi."
        actions={
          <>
            <Link
              href="/rentals/request"
              className="rounded-xl border border-[#DCD8CE] bg-white px-3.5 py-2 text-xs font-semibold text-[#141413] transition hover:bg-[#EFECE6]"
            >
              ← Pengajuan Sewa
            </Link>
            {!isPaid ? (
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-[#E9C893] bg-[#FEF7EC] px-3.5 py-2">
                <Timer className="size-4 text-[#9A5B13]" />
                <div className="leading-none">
                  <span className="block font-mono text-[9px] font-semibold uppercase tracking-widest text-[#9A5B13]">
                    BATAS BAYAR 2 JAM
                  </span>
                  <span className="font-mono text-sm font-bold text-[#141413]">
                    {formatTimer(secondsLeft)}
                  </span>
                </div>
              </div>
            ) : (
              <Badge variant="available" dot className="px-3 py-1.5 text-xs">
                LUNAS TERVERIFIKASI WEBHOOK
              </Badge>
            )}
          </>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {isPaid && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1B4332]/25 bg-[#E9F3ED] p-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1B4332] text-white">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#141413]">
                  Pembayaran Terkonfirmasi (Idempotency Key Verified)
                </h2>
                <p className="mt-0.5 text-xs text-[#1B4332]">
                  Dana sebesar <strong>{formatRupiah(totalAmount)}</strong> telah diamankan di Escrow. Kontak WhatsApp COD kini terbuka dan siap lanjut ke tahap inspeksi fisik.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/handover"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1B4332] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#143326]"
              >
                <span>Lanjut ke Protokol COD</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Payment Channel Selector (7 Columns) */}
          <div className="space-y-4 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white">
              <div className="flex items-center justify-between border-b border-[#EFECE6] bg-[#FBF9F5] px-6 py-4">
                <div>
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                    METODE PEMBAYARAN TERINTEGRASI
                  </span>
                  <h2 className="mt-0.5 text-base font-bold text-[#141413]">
                    Pilih Kanal Pembayaran Xendit
                  </h2>
                </div>
                <Badge variant="outline">SANDBOX MODE</Badge>
              </div>

              <div className="space-y-2.5 p-6">
                {PAYMENT_CHANNELS.map((ch) => {
                  const Icon = ch.icon;
                  const active = selectedMethod === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setSelectedMethod(ch.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${
                        active
                          ? "border-[#141413] bg-[#FBF9F5] ring-1 ring-[#141413]"
                          : "border-[#DCD8CE] bg-white hover:border-[#141413]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                            active
                              ? "border-[#141413] bg-[#141413] text-[#F6F5F0]"
                              : "border-[#DCD8CE] bg-[#F6F5F0] text-[#141413]"
                          }`}
                        >
                          <Icon className="size-4.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-[#141413]">
                              {ch.label}
                            </span>
                            <span className="rounded border border-[#DCD8CE] bg-[#EFECE6] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#575653]">
                              {ch.code}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-[#575653]">
                            {ch.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 font-mono text-[11px] font-semibold text-[#1B4332]">
                        {ch.feeTag}
                      </span>
                    </button>
                  );
                })}

                {!isPaid ? (
                  <button
                    type="button"
                    onClick={() => setShowXenditModal(true)}
                    className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#141413] px-5 text-sm font-semibold text-[#F6F5F0] transition hover:bg-[#C83E2B]"
                  >
                    <Lock className="size-4" />
                    <span>
                      Bayar {formatRupiah(totalAmount)} via Xendit Invoice
                    </span>
                    <ArrowUpRight className="size-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="mt-4 flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#DCD8CE] bg-[#EFECE6] text-xs font-semibold text-[#575653]"
                  >
                    <CheckCircle2 className="size-4 text-[#1B4332]" />
                    <span>Invoice Telah Lunas Terbayar</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Official Stripe/Xendit Style Invoice Sheet (5 Columns) */}
          <aside className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white">
              {/* Official Brand Invoice Header */}
              <div className="flex items-center justify-between border-b border-[#EFECE6] bg-[#FBF9F5] px-6 py-4">
                <BrandLogo
                  size="sm"
                  theme="light"
                  showTagline={false}
                  href={null}
                />
                <span className="font-mono text-xs font-bold text-[#141413]">
                  {billDetails.orderId}
                </span>
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
                    INSTRUMEN DISEWA ({billDetails.sku})
                  </span>
                  <h3 className="mt-1 text-base font-bold text-[#141413]">
                    {billDetails.itemName}
                  </h3>
                  <p className="mt-1 text-xs text-[#575653]">
                    Pemilik: <strong className="text-[#141413]">{billDetails.ownerName}</strong>
                  </p>
                  <p className="text-xs text-[#575653]">
                    Titik COD: {billDetails.codLocation}
                  </p>
                </div>

                {/* Transparent Line-Item Ledger */}
                <dl className="space-y-2.5 border-y border-[#EFECE6] py-4 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-[#575653]">
                      Sewa Instrumen ({billDetails.rentalDays} Hari)
                    </dt>
                    <dd className="font-mono font-semibold text-[#141413]">
                      {formatRupiah(billDetails.rentalCost)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#575653]">
                      Deposit Jaminan Escrow (Refundable 100%)
                    </dt>
                    <dd className="font-mono font-semibold text-[#141413]">
                      {formatRupiah(billDetails.depositAmount)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#575653]">Biaya Infrastruktur Gateway</dt>
                    <dd className="font-mono font-semibold text-[#141413]">
                      {formatRupiah(billDetails.adminFee)}
                    </dd>
                  </div>
                </dl>

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#141413]">
                    Total Tagihan Escrow
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#C83E2B]">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] p-3.5 text-xs leading-relaxed text-[#575653]">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#1B4332]" />
                  <p>
                    <strong className="text-[#141413]">Proteksi Rekber SewaKit:</strong>{" "}
                    Deposit {formatRupiah(billDetails.depositAmount)} dikunci pada rekening penampung dan dikembalikan utuh otomatis setelah checklist pengembalian disetujui.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* MODAL SIMULATOR POPUP XENDIT SANDBOX */}
        {showXenditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141413]/50 p-4 backdrop-blur-[2px]">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[#EFECE6] bg-[#FBF9F5] px-5 py-3.5">
                <BrandLogo
                  size="sm"
                  theme="light"
                  showTagline={false}
                  href={null}
                />
                <div className="flex items-center gap-2">
                  <Badge variant="accent">XENDIT SANDBOX</Badge>
                  <button
                    type="button"
                    onClick={() => setShowXenditModal(false)}
                    className="rounded-lg p-1 text-[#78756F] hover:bg-[#EFECE6] hover:text-[#141413]"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 p-5 text-xs">
                <div className="flex items-center justify-between rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] p-3.5">
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-[#78756F]">
                      Nominal Pembayaran
                    </span>
                    <span className="font-mono text-xl font-bold text-[#141413]">
                      {formatRupiah(totalAmount)}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#9A5B13]">
                    {formatTimer(secondsLeft)}
                  </span>
                </div>

                {selectedMethod === "qris" ? (
                  <div className="space-y-3 rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-4 text-center">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#575653]">
                      QRIS DINAMIS SEWAKIT ESCROW
                    </span>
                    {/* Crisp Technical SVG QR Matrix Representation */}
                    <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl border border-[#DCD8CE] bg-white p-3">
                      <QrCode className="h-28 w-28 text-[#141413]" strokeWidth={1.25} />
                    </div>
                    <p className="text-[11px] text-[#575653]">
                      Pindai melalui aplikasi perbankan atau e-wallet, atau klik tombol simulasi webhook di bawah.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-4">
                    <span className="font-mono text-[10px] uppercase text-[#78756F]">
                      Nomor Virtual Account ({selectedMethod.toUpperCase()})
                    </span>
                    <div className="flex items-center justify-between rounded-xl border border-[#DCD8CE] bg-white px-3.5 py-2.5">
                      <span className="font-mono text-base font-bold tracking-wider text-[#141413]">
                        8808 9920 2608 81
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText("88089920260881");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#DCD8CE] bg-[#F6F5F0] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#141413] hover:border-[#141413]"
                      >
                        {copied ? (
                          <>
                            <Check className="size-3 text-[#1B4332]" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleSimulatePayment}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#1B4332] py-3 text-xs font-semibold text-white transition hover:bg-[#143326] disabled:opacity-60"
                  >
                    <Zap className="size-3.5" />
                    <span>
                      {isProcessing
                        ? "Memverifikasi Webhook..."
                        : "Simulasikan Callback Lunas"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowXenditModal(false)}
                    className="rounded-xl border border-[#DCD8CE] bg-white px-4 py-3 text-xs font-medium text-[#575653] hover:bg-[#F6F5F0]"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
