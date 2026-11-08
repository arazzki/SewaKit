"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Lock,
  Calendar,
  ShieldCheck,
  ArrowRight,
  MapPin,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import {
  BOOKABLE_ITEMS,
  COD_LOCATIONS,
  isDateOverlapping,
} from "@/data/dummyRequests";
import { DEMO_STUDENT_SESSION, useRentalSession } from "@/context/RentalSessionContext";
import { formatRupiah } from "@/lib/format";

function RenterBookingContent() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("item");
  const initialItem =
    BOOKABLE_ITEMS.find((i) => i.id === requestedSlug) ?? BOOKABLE_ITEMS[0];

  const { session, requests, createRequest } = useRentalSession();

  const [selectedItemId, setSelectedItemId] = useState<string>(initialItem.id);
  const [startDate, setStartDate] = useState<string>("2026-11-18");
  const [endDate, setEndDate] = useState<string>("2026-11-19");
  const [codLocation, setCodLocation] = useState<string>(COD_LOCATIONS[0]);
  const [codTime, setCodTime] = useState<string>("13:00");
  const [purposeNote, setPurposeNote] = useState<string>("");
  const [formFeedback, setFormFeedback] = useState<{
    type: "error" | "success";
    message: string;
    createdId?: string;
  } | null>(null);

  const selectedItem =
    BOOKABLE_ITEMS.find((item) => item.id === selectedItemId) ??
    BOOKABLE_ITEMS[0];

  const totalDays = (() => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff =
      Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  })();

  const rentalCost = totalDays * selectedItem.pricePerDay;
  const totalPayable = rentalCost + selectedItem.deposit;

  const conflictingRange = selectedItem.bookedRanges.find((range) =>
    startDate && endDate && startDate <= endDate
      ? isDateOverlapping(startDate, endDate, range.start, range.end)
      : false,
  );

  const activeRenterNim = session.nim ?? DEMO_STUDENT_SESSION.nim!;
  const myRequests = requests.filter((r) => r.renterNim === activeRenterNim);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!startDate || !endDate || totalDays <= 0) {
      setFormFeedback({
        type: "error",
        message: "Tanggal pengembalian harus sama atau setelah tanggal mulai sewa.",
      });
      return;
    }

    if (conflictingRange) {
      setFormFeedback({
        type: "error",
        message: `Jadwal bentrok. Alat tidak tersedia pada ${conflictingRange.start} s/d ${conflictingRange.end} (${conflictingRange.reason}).`,
      });
      return;
    }

    if (!purposeNote.trim()) {
      setFormFeedback({
        type: "error",
        message: "Mohon isi catatan keperluan pemakaian alat terlebih dahulu.",
      });
      return;
    }

    const created = createRequest({
      itemId: selectedItem.id,
      itemSku: selectedItem.sku,
      itemName: selectedItem.name,
      renterName:
        session.role === "mahasiswa"
          ? session.name
          : DEMO_STUDENT_SESSION.name,
      renterNim: activeRenterNim,
      renterProdi: session.prodi ?? DEMO_STUDENT_SESSION.prodi!,
      renterPhone: session.phone ?? DEMO_STUDENT_SESSION.phone!,
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
    });

    setPurposeNote("");
    setFormFeedback({
      type: "success",
      message: `Pengajuan ${created.id} berhasil dikirim! Jadwal dikunci selama 24 jam sambil menunggu persetujuan pemilik alat.`,
      createdId: created.id,
    });
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6">
      {/* Formulir Pengajuan & Ringkasan Biaya */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Card className="p-6 lg:col-span-8">
          <div className="mb-5 border-b border-surface-muted pb-4">
            <h2 className="text-base font-bold text-ink">
              Formulir Pengajuan Sewa
            </h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              Pilih alat, cek tanggal yang masih kosong, lalu tentukan titik ketemuan COD di kampus.
            </p>
          </div>

          {formFeedback && (
            <div
              className={`mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5 text-xs font-medium ${
                formFeedback.type === "error"
                  ? "border-accent/30 bg-accent-subtle text-accent-ink"
                  : "border-forest/25 bg-forest-subtle text-forest"
              }`}
            >
              <span className="flex items-start gap-2.5">
                {formFeedback.type === "error" ? (
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                )}
                <span>{formFeedback.message}</span>
              </span>
              {formFeedback.createdId && (
                <Button
                  href={`/rentals/${formFeedback.createdId}`}
                  variant="forest"
                  size="xs"
                >
                  <span>Lihat Pesanan</span>
                  <ArrowRight className="size-3" />
                </Button>
              )}
            </div>
          )}

          <form onSubmit={handleCreateRequest} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Pilih Alat
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => {
                  setSelectedItemId(e.target.value);
                  setFormFeedback(null);
                }}
                className="w-full rounded-xl border border-hairline bg-surface-subtle px-4 py-2.5 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
              >
                {BOOKABLE_ITEMS.map((item) => (
                  <option key={item.id} value={item.id}>
                    [{item.sku}] {item.name} — {formatRupiah(item.pricePerDay)}/hari
                  </option>
                ))}
              </select>
            </div>

            {/* Tanggal Terpakai */}
            <div className="rounded-xl border border-hairline bg-surface-subtle p-4">
              <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink">
                  <Calendar className="size-3.5 text-accent" />
                  <span>Tanggal yang Sudah Terisi:</span>
                </span>
                <Badge variant="neutral">November 2026</Badge>
              </div>

              {selectedItem.bookedRanges.length === 0 ? (
                <p className="inline-flex items-center gap-1.5 text-xs font-medium text-forest">
                  <CheckCircle2 className="size-3.5" />
                  <span>Semua tanggal bulan ini masih kosong.</span>
                </p>
              ) : (
                <ul className="space-y-1.5 text-xs text-ink-muted">
                  {selectedItem.bookedRanges.map((r, idx) => (
                    <li key={idx} className="flex flex-wrap items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-ink">
                        {r.start} s/d {r.end}
                      </span>
                      <span className="text-ink-subtle">— {r.reason}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink">
                  Tanggal Mulai Sewa
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setFormFeedback(null);
                  }}
                  className="bg-surface-subtle font-mono focus:bg-surface"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink">
                  Tanggal Pengembalian
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setFormFeedback(null);
                  }}
                  className="bg-surface-subtle font-mono focus:bg-surface"
                />
              </div>
            </div>

            {conflictingRange && (
              <div className="flex items-start gap-2.5 rounded-xl border border-accent/30 bg-accent-subtle p-3.5 text-xs font-medium text-accent-ink">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  Tanggal bentrok dengan jadwal{" "}
                  <span className="font-mono font-semibold underline">
                    {conflictingRange.start} s/d {conflictingRange.end}
                  </span>{" "}
                  ({conflictingRange.reason}). Silakan pilih tanggal lain.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-ink">
                  Lokasi Ketemuan COD di Kampus
                </label>
                <select
                  value={codLocation}
                  onChange={(e) => setCodLocation(e.target.value)}
                  className="h-10 w-full rounded-xl border border-hairline bg-surface-subtle px-3.5 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                >
                  {COD_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink">
                  Jam Ketemuan
                </label>
                <Input
                  type="time"
                  value={codTime}
                  onChange={(e) => setCodTime(e.target.value)}
                  className="bg-surface-subtle font-mono focus:bg-surface"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Keperluan Pemakaian
              </label>
              <textarea
                rows={3}
                value={purposeNote}
                onChange={(e) => setPurposeNote(e.target.value)}
                placeholder="Contoh: Untuk praktikum Sistem Mikrokontroler modul 4 di Lab TULT Lt. 9..."
                className="w-full rounded-xl border border-hairline bg-surface-subtle px-4 py-3 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={Boolean(conflictingRange) || totalDays <= 0}
              className="w-full text-xs font-semibold"
            >
              <Clock className="size-4" />
              <span>Kirim Pengajuan &amp; Tahan Jadwal 24 Jam</span>
            </Button>
          </form>
        </Card>

        {/* Ringkasan Biaya */}
        <div className="lg:col-span-4">
          <Card className="sticky top-24 p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-md border border-hairline bg-canvas px-2 py-0.5 font-mono text-xs font-semibold text-ink-muted">
                {selectedItem.sku}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest">
                <ShieldCheck className="size-3.5" />
                Jaminan Rekber
              </span>
            </div>

            <h3 className="mt-3 text-base font-bold text-ink">
              {selectedItem.name}
            </h3>
            <p className="mt-1 text-xs text-ink-muted">
              Pemilik: <strong className="text-ink">{selectedItem.ownerName}</strong> •{" "}
              {selectedItem.ownerProdi}
            </p>

            <dl className="my-5 space-y-2.5 border-y border-surface-muted py-4 text-xs">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Durasi sewa</dt>
                <dd className="font-mono font-semibold text-ink">
                  {totalDays > 0 ? `${totalDays} hari` : "-"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">
                  Sewa ({totalDays} × {formatRupiah(selectedItem.pricePerDay)})
                </dt>
                <dd className="font-mono font-semibold text-ink">
                  {formatRupiah(rentalCost)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Deposit jaminan (kembali 100%)</dt>
                <dd className="font-mono font-semibold text-ink">
                  {formatRupiah(selectedItem.deposit)}
                </dd>
              </div>
            </dl>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold text-ink">
                Total dibayar setelah disetujui
              </span>
              <span className="font-mono text-lg font-bold text-accent">
                {formatRupiah(totalDays > 0 ? totalPayable : 0)}
              </span>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-hairline bg-surface-subtle p-3.5 text-xs leading-relaxed text-ink-muted">
              <Lock className="mt-0.5 size-4 shrink-0 text-ink" />
              <span>
                Kamu belum ditagih saat mengajukan. Tagihan rekber baru dibuka selama{" "}
                <strong className="text-ink">2 jam</strong> setelah pemilik menyetujui jadwalmu.
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Daftar Pengajuan Milik Penyewa Sendiri (Tanpa Tombol Pemilik!) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-hairline pb-3">
          <div>
            <h2 className="text-lg font-bold text-ink">Pengajuan Sewa Saya</h2>
            <p className="text-xs text-ink-muted">
              Pantau status persetujuan pemilik, lanjutkan pembayaran rekber, atau buka kontak COD.
            </p>
          </div>
          <Badge variant="neutral">{myRequests.length} Pesanan</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {myRequests.map((req) => (
            <Card key={req.id} className="flex flex-col justify-between p-5">
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md border border-hairline bg-canvas px-2 py-0.5 font-mono text-xs font-bold text-ink">
                    {req.id}
                  </span>
                  {req.status === "MENUNGGU_PERSETUJUAN" && (
                    <Badge variant="hold" dot>
                      Menunggu Pemilik ({req.holdExpiresIn})
                    </Badge>
                  )}
                  {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                    <Badge variant="accent" dot>
                      Disetujui — Batas Bayar {req.paymentExpiresIn}
                    </Badge>
                  )}
                  {req.status === "SIAP_COD" && (
                    <Badge variant="available" dot>
                      Lunas — Siap COD
                    </Badge>
                  )}
                  {req.status === "DITOLAK" && (
                    <Badge variant="rented" dot>
                      Ditolak Pemilik
                    </Badge>
                  )}
                </div>

                <h3 className="text-sm font-bold text-ink">{req.itemName}</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  Pemilik: <strong className="text-ink">{req.ownerName}</strong> •{" "}
                  <span className="font-mono">
                    {req.startDate} s/d {req.endDate} ({req.totalDays} hari)
                  </span>
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-ink-subtle">
                  <MapPin className="size-3.5 text-accent" />
                  <span>
                    {req.codLocation} ({req.codTime})
                  </span>
                </p>

                {req.rejectReason && (
                  <p className="mt-2 rounded-lg border border-accent/25 bg-accent-subtle px-3 py-2 text-xs text-accent-ink">
                    Alasan penolakan: {req.rejectReason}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-surface-muted pt-3.5">
                <span className="font-mono text-xs font-bold text-ink">
                  Total {formatRupiah(req.rentalCost + req.depositAmount)}
                </span>

                <div className="flex items-center gap-2">
                  {req.status === "DISETUJUI_MENUNGGU_BAYAR" && (
                    <Button href="/payments" variant="accent" size="xs">
                      <span>Bayar Rekber</span>
                      <ArrowRight className="size-3" />
                    </Button>
                  )}
                  <Button
                    href={`/rentals/${req.id}`}
                    variant={req.status === "SIAP_COD" ? "forest" : "outline"}
                    size="xs"
                  >
                    <span>
                      {req.status === "SIAP_COD"
                        ? "Kontak COD"
                        : "Detail Pesanan"}
                    </span>
                    <ArrowRight className="size-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function RentalRequestPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PageHeader
        eyebrow="Penyewa"
        title="Ajukan Sewa & Jadwal Pengambilan"
        description="Pilih tanggal sewa yang tersedia, tentukan titik ketemuan COD di kampus, dan pantau konfirmasi dari pemilik alat."
        actions={
          <>
            <Button href="/rentals/cancellation" variant="outline">
              Pembatalan Sewa
            </Button>
            <Button href="/catalog" variant="outline" className="border-ink">
              ← Katalog Alat
            </Button>
          </>
        }
      />

      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 text-xs text-ink-subtle">
            Memuat formulir pengajuan sewa...
          </div>
        }
      >
        <RenterBookingContent />
      </Suspense>
    </div>
  );
}
