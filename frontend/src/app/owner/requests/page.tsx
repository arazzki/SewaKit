"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  X,
  ArrowRight,
  Package,
  Wallet,
  Inbox,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { useRentalSession } from "@/context/RentalSessionContext";
import type { RentalRequestStatus } from "@/data/dummyRequests";
import { formatRupiah } from "@/lib/format";

type FilterKey = "SEMUA" | RentalRequestStatus;

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "SEMUA", label: "Semua Permohonan" },
  { key: "MENUNGGU_PERSETUJUAN", label: "Perlu Persetujuan" },
  { key: "DISETUJUI_MENUNGGU_BAYAR", label: "Menunggu Bayar Penyewa" },
  { key: "SIAP_COD", label: "Siap COD" },
  { key: "DITOLAK", label: "Ditolak" },
];

export default function OwnerIncomingRequestsPage() {
  const { requests, approveRequest, rejectRequest } = useRentalSession();
  const [filter, setFilter] = useState<FilterKey>("SEMUA");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectInput, setRejectInput] = useState<string>("");

  const filteredRequests =
    filter === "SEMUA"
      ? requests
      : requests.filter((r) => r.status === filter);

  const pendingCount = requests.filter(
    (r) => r.status === "MENUNGGU_PERSETUJUAN",
  ).length;

  const handleConfirmReject = (id: string) => {
    rejectRequest(id, rejectInput);
    setRejectingId(null);
    setRejectInput("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PageHeader
        eyebrow="Panel Pemilik"
        title="Permohonan Sewa Masuk"
        description="Tinjau permintaan sewa untuk alat milikmu. Setujui jadwal jika barang siap, atau tolak disertai alasan agar slot tanggal kembali terbuka."
        actions={
          <>
            <Button href="/owner/items" variant="outline">
              <Package className="size-3.5" />
              <span>Barang Saya</span>
            </Button>
            <Button href="/owner/wallet" variant="outline" className="border-ink">
              <Wallet className="size-3.5 text-forest" />
              <span>Dompet Pendapatan</span>
            </Button>
          </>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-8 sm:px-6">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((opt) => (
              <Button
                key={opt.key}
                variant={filter === opt.key ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(opt.key)}
              >
                <span>{opt.label}</span>
                {opt.key === "MENUNGGU_PERSETUJUAN" && pendingCount > 0 && (
                  <span className="rounded bg-warning-subtle px-1.5 py-0.5 font-mono text-xs font-bold text-warning-ink">
                    {pendingCount}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Incoming Requests Queue (Hanya Aksi Pemilik!) */}
        {filteredRequests.length === 0 ? (
          <Card className="py-14 text-center">
            <Inbox className="mx-auto mb-2 size-6 text-ink-subtle" />
            <p className="text-sm font-semibold text-ink">
              Belum ada permohonan pada filter ini
            </p>
            <p className="mt-1 text-xs text-ink-subtle">
              Permohonan baru dari mahasiswa penyewa akan muncul di sini.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <Card key={req.id} className="p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-surface-muted pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-md border border-hairline bg-canvas px-2.5 py-1 font-mono text-xs font-bold text-ink">
                      {req.id}
                    </span>
                    <span className="text-xs text-ink-subtle">
                      SKU <span className="font-mono">{req.itemSku}</span> •{" "}
                      {req.createdAt}
                    </span>
                  </div>

                  <div>
                    {req.status === "MENUNGGU_PERSETUJUAN" && (
                      <Badge variant="hold" dot>
                        Menunggu Konfirmasimu — Sisa {req.holdExpiresIn}
                      </Badge>
                    )}
                    {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                      <Badge variant="neutral" dot>
                        Menunggu Penyewa Membayar ({req.paymentExpiresIn})
                      </Badge>
                    )}
                    {req.status === "SIAP_COD" && (
                      <Badge variant="available" dot>
                        Rekber Lunas — Siap Ketemuan COD
                      </Badge>
                    )}
                    {req.status === "DITOLAK" && (
                      <Badge variant="rented" dot>
                        Ditolak
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2 md:col-span-2">
                    <h2 className="text-base font-bold text-ink">
                      {req.itemName}
                    </h2>
                    <div className="grid grid-cols-1 gap-3 pt-1 text-xs text-ink-muted sm:grid-cols-2">
                      <div>
                        <span className="block text-xs text-ink-subtle">
                          Mahasiswa Penyewa
                        </span>
                        <strong className="text-ink">{req.renterName}</strong>{" "}
                        (<span className="font-mono">{req.renterNim}</span>) —{" "}
                        {req.renterProdi}
                      </div>
                      <div>
                        <span className="block text-xs text-ink-subtle">
                          Jadwal Sewa
                        </span>
                        <strong className="font-mono text-accent">
                          {req.startDate} s/d {req.endDate} ({req.totalDays} hari)
                        </strong>
                      </div>
                      <div>
                        <span className="block text-xs text-ink-subtle">
                          Lokasi &amp; Jam COD
                        </span>
                        <strong className="text-ink">
                          {req.codLocation} ({req.codTime})
                        </strong>
                      </div>
                      <div>
                        <span className="block text-xs text-ink-subtle">
                          Pendapatan Sewa &amp; Jaminan
                        </span>
                        <strong className="font-mono text-ink">
                          Sewa {formatRupiah(req.rentalCost)} + Deposit{" "}
                          {formatRupiah(req.depositAmount)}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-surface-muted bg-surface-subtle p-3 text-xs text-ink-muted">
                      <span className="font-semibold text-ink">
                        Keperluan penyewa:
                      </span>{" "}
                      &ldquo;{req.purposeNote}&rdquo;
                    </div>

                    {req.rejectReason && (
                      <div className="mt-2 rounded-xl border border-accent/30 bg-accent-subtle p-3 text-xs text-accent-ink">
                        <strong>Alasan penolakan:</strong> {req.rejectReason}
                      </div>
                    )}
                  </div>

                  {/* Aksi Khusus Pemilik Alat */}
                  <div className="flex flex-col justify-center gap-2.5 border-t border-surface-muted pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                    {req.status === "MENUNGGU_PERSETUJUAN" && (
                      <>
                        <Button
                          variant="forest"
                          onClick={() => approveRequest(req.id)}
                          className="w-full font-semibold"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Setujui Pengajuan</span>
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => setRejectingId(req.id)}
                          className="w-full font-semibold"
                        >
                          <X className="size-3.5" />
                          <span>Tolak Pengajuan</span>
                        </Button>
                      </>
                    )}

                    {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                      <div className="space-y-2.5">
                        <p className="rounded-xl border border-hairline bg-surface-subtle p-3 text-xs leading-relaxed text-ink-muted">
                          Tagihan rekber sudah dikirim ke penyewa. Nomor WhatsApp penyewa akan terbuka otomatis setelah pembayaran lunas.
                        </p>
                        <Button
                          href={`/rentals/${req.id}`}
                          variant="outline"
                          className="w-full"
                        >
                          <span>Lihat Detail Pesanan</span>
                          <ArrowRight className="size-3.5" />
                        </Button>
                      </div>
                    )}

                    {req.status === "SIAP_COD" && (
                      <Button
                        href={`/rentals/${req.id}`}
                        variant="forest"
                        className="w-full font-semibold"
                      >
                        <span>Buka Kontak WhatsApp &amp; COD</span>
                        <ArrowRight className="size-3.5" />
                      </Button>
                    )}

                    {req.status === "DITOLAK" && (
                      <span className="text-center text-xs text-ink-subtle">
                        Pengajuan ditolak • Tanggal dibuka kembali
                      </span>
                    )}

                    {rejectingId === req.id && (
                      <div className="mt-2 space-y-2 rounded-xl border border-hairline bg-surface-subtle p-3">
                        <Input
                          type="text"
                          value={rejectInput}
                          onChange={(e) => setRejectInput(e.target.value)}
                          placeholder="Tulis alasan penolakan singkat..."
                          className="h-9 text-xs"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="accent"
                            size="xs"
                            onClick={() => handleConfirmReject(req.id)}
                            className="flex-1"
                          >
                            Konfirmasi Tolak
                          </Button>
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => setRejectingId(null)}
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
