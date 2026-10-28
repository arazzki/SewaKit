"use client";

import { useState, type ReactNode } from "react";
import {
  formatDate,
  getLateDays,
  type ChecklistRecord,
  type HandoverRental,
} from "@/data/dummyHandovers";
import { formatRupiah } from "@/lib/format";
import ChecklistComparison, { countWorsened } from "./ChecklistComparison";
import ChecklistForm from "./ChecklistForm";

export type Role = "PENYEWA" | "PEMILIK";

type PanelProps = {
  rental: HandoverRental;
  role: Role;
  onUpdate: (changes: Partial<HandoverRental>) => void;
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {children}
    </section>
  );
}

function InfoBox({ tone = "slate", children }: { tone?: "slate" | "amber" | "emerald" | "rose"; children: ReactNode }) {
  const tones = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
    rose: "border-rose-200 bg-rose-50 text-rose-900",
  };
  return <div className={`rounded-xl border p-4 text-sm leading-relaxed ${tones[tone]}`}>{children}</div>;
}

/* ---------- Tahap 1: serah terima saat pengambilan (status SIAP_COD) ---------- */

export function PickupPanel({ rental, role, onUpdate }: PanelProps) {
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  if (role === "PENYEWA") {
    if (!rental.pickupChecklist) {
      return (
        <Section title="1. Periksa barang yang kamu terima">
          <InfoBox>
            Saat bertemu Pemilik di titik COD, periksa setiap komponen lalu isi checklist di bawah. Checklist ini
            menjadi bukti kondisi awal barang.
          </InfoBox>
          <ChecklistForm
            components={rental.components}
            filledBy="PENYEWA"
            submitLabel="Simpan checklist dan tampilkan kode serah terima"
            onSubmit={(record) => onUpdate({ pickupChecklist: record })}
          />
        </Section>
      );
    }
    return (
      <Section title="2. Tunjukkan kode ini ke Pemilik">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-center">
          <p className="text-xs font-medium text-indigo-700">Kode serah terima</p>
          <p className="mt-2 font-mono text-4xl font-bold tracking-[0.3em] text-indigo-900">{rental.handoverCode}</p>
          <p className="mt-3 text-xs text-indigo-700">
            Pemilik memasukkan kode ini di aplikasinya untuk mengonfirmasi bahwa barang sudah diserahkan.
          </p>
        </div>
        <ChecklistComparison components={rental.components} pickup={rental.pickupChecklist} />
      </Section>
    );
  }

  // Sudut pandang Pemilik
  if (!rental.pickupChecklist) {
    return (
      <Section title="Menunggu Penyewa memeriksa barang">
        <InfoBox>
          Serahkan barang kepada <strong>{rental.renterName}</strong>. Penyewa akan memeriksa dan mengisi checklist
          kondisi, lalu menunjukkan kode serah terima kepadamu.
        </InfoBox>
        <ul className="list-inside list-disc text-sm text-slate-700">
          {rental.components.map((component) => (
            <li key={component.id}>{component.name}</li>
          ))}
        </ul>
      </Section>
    );
  }

  function confirmCode() {
    if (!/^\d{6}$/.test(codeInput)) {
      setCodeError("Kode harus 6 digit angka.");
      return;
    }
    if (codeInput !== rental.handoverCode) {
      setCodeError("Kode tidak cocok. Minta Penyewa menunjukkan ulang kodenya.");
      return;
    }
    onUpdate({ status: "DISEWA" });
  }

  return (
    <Section title="Konfirmasi serah terima">
      <p className="text-sm text-slate-600">Checklist yang diisi Penyewa:</p>
      <ChecklistComparison components={rental.components} pickup={rental.pickupChecklist} />
      {rental.pickupChecklist.generalNote && (
        <InfoBox>Catatan Penyewa: {rental.pickupChecklist.generalNote}</InfoBox>
      )}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <label htmlFor="handover-code" className="text-sm font-medium text-slate-900">
          Masukkan kode serah terima dari Penyewa
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="handover-code"
            inputMode="numeric"
            maxLength={6}
            value={codeInput}
            onChange={(event) => {
              setCodeInput(event.target.value.replace(/\D/g, ""));
              setCodeError("");
            }}
            placeholder="6 digit"
            className="w-40 rounded-lg border border-slate-300 px-3 py-2 font-mono text-lg tracking-widest focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="button"
            onClick={confirmCode}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Konfirmasi
          </button>
        </div>
        {codeError && <p className="mt-2 text-sm font-medium text-rose-600">{codeError}</p>}
        <p className="mt-2 text-xs text-slate-400">Kode demo untuk sewa ini: {rental.handoverCode}</p>
      </div>
    </Section>
  );
}

/* ---------- Tahap 2: masa sewa dan pengembalian (status DISEWA) ---------- */

export function ActiveRentalPanel({ rental, role, onUpdate }: PanelProps) {
  const lateDays = getLateDays(rental.endDate);

  return (
    <div className="space-y-6">
      {lateDays > 0 ? (
        <InfoBox tone="rose">
          Sewa ini <strong>terlambat {lateDays} hari</strong> dari jatuh tempo {formatDate(rental.endDate)}. Keterlambatan
          akan dihitung sebagai denda saat pengembalian.
        </InfoBox>
      ) : (
        <InfoBox tone="emerald">Jatuh tempo pengembalian: {formatDate(rental.endDate)}.</InfoBox>
      )}

      {role === "PEMILIK" ? (
        <Section title="Barang sudah dikembalikan? Isi checklist pengembalian">
          <p className="text-sm text-slate-600">
            Bandingkan kondisi barang sekarang dengan kondisi saat diambil di tabel bawah.
          </p>
          <ChecklistForm
            components={rental.components}
            filledBy="PEMILIK"
            submitLabel="Kirim checklist pengembalian ke Penyewa"
            onSubmit={(record: ChecklistRecord) =>
              onUpdate({
                status: "MENUNGGU_KONFIRMASI_PENGEMBALIAN",
                returnChecklist: record,
                returnLateDays: lateDays,
              })
            }
          />
        </Section>
      ) : (
        <InfoBox>
          Kembalikan barang kepada <strong>{rental.ownerName}</strong> di {rental.codLocation}. Setelah Pemilik
          memeriksa barang, kamu akan diminta mengonfirmasi hasil pemeriksaannya.
        </InfoBox>
      )}

      <Section title="Kondisi saat diambil">
        <ChecklistComparison components={rental.components} pickup={rental.pickupChecklist} />
      </Section>
    </div>
  );
}

/* ---------- Tahap 3: konfirmasi hasil pemeriksaan pengembalian ---------- */

function ReturnSummary({ rental }: { rental: HandoverRental }) {
  const worsened = countWorsened(rental.pickupChecklist, rental.returnChecklist);
  const lateDays = rental.returnLateDays ?? 0;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs text-slate-500">Keterlambatan</p>
        <p className={`mt-1 text-lg font-bold ${lateDays > 0 ? "text-rose-700" : "text-slate-900"}`}>
          {lateDays > 0 ? `${lateDays} hari` : "Tepat waktu"}
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs text-slate-500">Komponen bermasalah</p>
        <p className={`mt-1 text-lg font-bold ${worsened > 0 ? "text-rose-700" : "text-slate-900"}`}>
          {worsened > 0 ? `${worsened} komponen` : "Tidak ada"}
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs text-slate-500">Deposit ditahan</p>
        <p className="mt-1 text-lg font-bold text-slate-900">{formatRupiah(rental.depositAmount)}</p>
      </div>
    </div>
  );
}

export function ReturnReviewPanel({ rental, role, onUpdate }: PanelProps) {
  const [objecting, setObjecting] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  function submitObjection() {
    if (reason.trim().length < 10) {
      setReasonError("Jelaskan alasan keberatan minimal 10 karakter.");
      return;
    }
    onUpdate({ status: "SENGKETA", disputeReason: reason.trim() });
  }

  return (
    <div className="space-y-6">
      <ReturnSummary rental={rental} />

      <Section title="Hasil pemeriksaan pengembalian">
        <ChecklistComparison
          components={rental.components}
          pickup={rental.pickupChecklist}
          returned={rental.returnChecklist}
        />
        {rental.returnChecklist?.generalNote && (
          <InfoBox>Catatan Pemilik: {rental.returnChecklist.generalNote}</InfoBox>
        )}
      </Section>

      {role === "PEMILIK" ? (
        <InfoBox tone="amber">Menunggu {rental.renterName} menyetujui hasil pemeriksaan ini.</InfoBox>
      ) : objecting ? (
        <Section title="Ajukan keberatan">
          <textarea
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
              setReasonError("");
            }}
            rows={3}
            placeholder="Contoh: probe dikembalikan lengkap 4 buah, ada di foto pengembalian."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          {reasonError && <p className="text-sm font-medium text-rose-600">{reasonError}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={submitObjection}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-500"
            >
              Kirim keberatan ke Admin
            </button>
            <button
              type="button"
              onClick={() => setObjecting(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
          </div>
        </Section>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => onUpdate({ status: "SELESAI" })}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Setuju dengan hasil pemeriksaan
          </button>
          <button
            type="button"
            onClick={() => setObjecting(true)}
            className="flex-1 rounded-lg border border-rose-300 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50"
          >
            Ajukan keberatan
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Tahap akhir: selesai atau sengketa ---------- */

export function ClosedPanel({ rental }: { rental: HandoverRental }) {
  return (
    <div className="space-y-6">
      {rental.status === "SENGKETA" ? (
        <InfoBox tone="rose">
          <strong>Diteruskan ke Admin.</strong> Alasan keberatan Penyewa: “{rental.disputeReason}”. Admin akan
          memutuskan berdasarkan checklist dan foto dari kedua pihak.
        </InfoBox>
      ) : (
        <InfoBox tone="emerald">
          Serah terima selesai dan disetujui kedua pihak. Rincian denda dan pengembalian deposit diproses di Fitur 10
          (Deposit, Denda, dan Sengketa).
        </InfoBox>
      )}
      <ReturnSummary rental={rental} />
      <ChecklistComparison
        components={rental.components}
        pickup={rental.pickupChecklist}
        returned={rental.returnChecklist}
      />
    </div>
  );
}
