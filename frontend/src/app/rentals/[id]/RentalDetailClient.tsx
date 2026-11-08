"use client";

import React from "react";
import {
  Lock,
  Unlock,
  MapPin,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Zap,
  CreditCard,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Stepper, { type StepItem } from "@/components/ui/stepper";
import { useRentalSession } from "@/context/RentalSessionContext";
import type { RentalRequestStatus } from "@/data/dummyRequests";
import { formatRupiah } from "@/lib/format";

const ORDER_STEPS: readonly StepItem[] = [
  {
    key: "MENUNGGU_PERSETUJUAN",
    code: "Tahap 1",
    label: "Persetujuan Pemilik",
    description: "Jadwal ditahan maks. 24 jam",
  },
  {
    key: "DISETUJUI_MENUNGGU_BAYAR",
    code: "Tahap 2",
    label: "Pembayaran Rekber",
    description: "Sewa + deposit via QRIS/VA",
  },
  {
    key: "SIAP_COD",
    code: "Tahap 3",
    label: "Kontak & Ambil COD",
    description: "WhatsApp terbuka & cek fisik",
  },
];

function getStepIndex(status: RentalRequestStatus): number {
  if (status === "MENUNGGU_PERSETUJUAN") return 0;
  if (status === "DISETUJUI_MENUNGGU_BAYAR") return 1;
  if (status === "SIAP_COD") return 2;
  return 0;
}

export default function RentalDetailClient({ id }: { id: string }) {
  const { requests, markPaid } = useRentalSession();
  const req = requests.find((r) => r.id === id);

  if (!req) {
    return (
      <div className="flex min-h-screen flex-col bg-canvas">
        <PageHeader
          eyebrow="Detail Pesanan"
          title="Pesanan Tidak Ditemukan"
          description={` Kode pesanan ${id} tidak ditemukan pada sesi saat ini.`}
          actions={
            <Button href="/rentals/request" variant="outline" className="border-ink">
              ← Kembali ke Pengajuan
            </Button>
          }
        />
      </div>
    );
  }

  const isUnlocked = req.status === "SIAP_COD";

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PageHeader
        eyebrow="Detail Pesanan"
        title={req.itemName}
        description={`Kode pesanan ${req.id} • Diajukan ${req.createdAt}`}
        actions={
          <>
            <Button href="/rentals/request" variant="outline">
              <ArrowLeft className="size-3.5" />
              <span>Pengajuan Saya</span>
            </Button>
            {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
              <Button href="/payments" variant="accent">
                <CreditCard className="size-3.5" />
                <span>Bayar Rekber</span>
              </Button>
            )}
          </>
        }
      />

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-8 sm:px-6">
        <Stepper
          steps={ORDER_STEPS}
          currentIndex={getStepIndex(req.status)}
          status={req.status === "DITOLAK" ? "dispute" : "normal"}
          className="sm:grid-cols-3"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Rincian Sewa */}
          <Card className="p-6 space-y-5 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-muted pb-4">
              <span className="font-mono text-xs font-bold text-ink">
                {req.id} • SKU {req.itemSku}
              </span>
              {req.status === "MENUNGGU_PERSETUJUAN" && (
                <Badge variant="hold" dot>
                  Menunggu Pemilik ({req.holdExpiresIn})
                </Badge>
              )}
              {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                <Badge variant="accent" dot>
                  Menunggu Pembayaran ({req.paymentExpiresIn})
                </Badge>
              )}
              {req.status === "SIAP_COD" && (
                <Badge variant="available" dot>
                  Lunas — Siap COD
                </Badge>
              )}
              {req.status === "DITOLAK" && (
                <Badge variant="danger" dot>
                  Ditolak Pemilik
                </Badge>
              )}
            </div>

            <dl className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
              <div>
                <dt className="text-ink-subtle">Jadwal Sewa</dt>
                <dd className="mt-0.5 font-mono font-semibold text-ink">
                  {req.startDate} s/d {req.endDate} ({req.totalDays} hari)
                </dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Titik &amp; Jam COD</dt>
                <dd className="mt-0.5 font-semibold text-ink">
                  {req.codLocation} ({req.codTime})
                </dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Biaya Sewa</dt>
                <dd className="mt-0.5 font-mono font-semibold text-ink">
                  {formatRupiah(req.rentalCost)}
                </dd>
              </div>
              <div>
                <dt className="text-ink-subtle">Deposit Jaminan (Kembali 100%)</dt>
                <dd className="mt-0.5 font-mono font-semibold text-ink">
                  {formatRupiah(req.depositAmount)}
                </dd>
              </div>
            </dl>

            <div className="rounded-xl border border-surface-muted bg-surface-subtle p-3.5 text-xs text-ink-muted">
              <strong className="text-ink">Catatan keperluan:</strong>{" "}
              &ldquo;{req.purposeNote}&rdquo;
            </div>

            {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-warning-border bg-warning-subtle p-4 text-xs text-warning-ink">
                <span>
                  Pemilik sudah menyetujui jadwalmu. Lunasi tagihan rekber untuk membuka nomor WhatsApp COD.
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button href="/payments" variant="accent" size="xs">
                    <span>Halaman Pembayaran</span>
                    <ArrowRight className="size-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => markPaid(req.id)}
                  >
                    <Zap className="size-3" />
                    <span>Simulasi Lunas</span>
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Panel Kontak WhatsApp & COD */}
          <Card
            className={`p-6 space-y-4 lg:col-span-5 ${
              isUnlocked ? "border-forest/35" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-ink">
                Kontak WhatsApp &amp; COD
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  isUnlocked
                    ? "bg-forest-subtle text-forest"
                    : "bg-surface-muted text-ink-muted"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Unlock className="size-3" />
                    <span>Terbuka</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-3" />
                    <span>Terkunci</span>
                  </>
                )}
              </span>
            </div>

            <div className="rounded-xl border border-surface-muted bg-surface-subtle p-3.5 text-xs">
              <div className="flex items-center gap-1.5 text-ink">
                <MapPin className="size-3.5 shrink-0 text-accent" />
                <strong>{req.codLocation}</strong>
              </div>
              <p className="mt-1 font-mono text-ink-muted">
                {req.startDate} • Pukul {req.codTime}
              </p>
            </div>

            {isUnlocked ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-xl border border-forest/20 bg-forest-subtle/50 p-3.5">
                    <span className="block text-xs text-ink-muted">
                      Pemilik Alat
                    </span>
                    <strong className="mt-0.5 block text-ink">
                      {req.ownerName}
                    </strong>
                    <span className="block font-mono text-xs text-ink-muted">
                      NIM {req.ownerNim}
                    </span>
                    <span className="mt-1 block font-mono font-bold text-forest">
                      {req.ownerPhone}
                    </span>
                  </div>

                  <div className="rounded-xl border border-forest/20 bg-forest-subtle/50 p-3.5">
                    <span className="block text-xs text-ink-muted">Penyewa</span>
                    <strong className="mt-0.5 block text-ink">
                      {req.renterName}
                    </strong>
                    <span className="block font-mono text-xs text-ink-muted">
                      NIM {req.renterNim}
                    </span>
                    <span className="mt-1 block font-mono font-bold text-forest">
                      {req.renterPhone}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={`https://wa.me/62${req.ownerPhone.replace(/[^0-9]/g, "").replace(/^0/, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-forest px-4 text-xs font-semibold text-white transition hover:bg-forest-hover"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>Hubungi via WhatsApp</span>
                  </a>
                  <Button
                    href="/handover"
                    variant="outline"
                    className="w-full border-ink"
                  >
                    <span>Lanjut ke Checklist Serah Terima COD →</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-hairline bg-canvas/60 p-5 text-center text-xs leading-relaxed text-ink-muted">
                Nomor WhatsApp pemilik (<span className="font-mono font-semibold">08xx-xxxx-xxxx</span>) baru ditampilkan setelah pembayaran rekber selesai dikonfirmasi.
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
