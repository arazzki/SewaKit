"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Copy,
  Check,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Star,
  Wallet,
  Scale,
} from "lucide-react";
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
      <h3 className="text-sm font-bold tracking-tight text-ink sm:text-base">
        {title}
      </h3>
      {children}
    </section>
  );
}

function InfoBox({
  tone = "slate",
  icon,
  children,
}: {
  tone?: "slate" | "amber" | "emerald" | "rose";
  icon?: ReactNode;
  children: ReactNode;
}) {
  const tones = {
    slate: "border-hairline bg-canvas text-ink-muted",
    amber: "border-warning-border bg-warning-subtle text-warning-ink",
    emerald: "border-forest/25 bg-forest-subtle text-forest",
    rose: "border-danger-border bg-danger-subtle text-danger",
  };
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border p-4 text-xs leading-relaxed sm:text-sm ${tones[tone]}`}
    >
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

/* ---------- Tahap 1: serah terima saat pengambilan (status SIAP_COD) ---------- */

export function PickupPanel({ rental, role, onUpdate }: PanelProps) {
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [copiedOtp, setCopiedOtp] = useState(false);

  const formattedOtp = `${rental.handoverCode.slice(0, 3)} ${rental.handoverCode.slice(3)}`;

  if (role === "PENYEWA") {
    if (!rental.pickupChecklist) {
      return (
        <Section title="Langkah 1 — Inspeksi Fisik Komponen Saat Pengambilan COD">
          <InfoBox icon={<ShieldCheck className="size-4 text-ink" />}>
            Saat bertemu Pemilik di titik COD kampus, periksa setiap komponen lalu isi checklist kondisi awal di bawah. Dokumentasi ini menjadi acuan sah jika terjadi klaim sengketa.
          </InfoBox>
          <ChecklistForm
            components={rental.components}
            filledBy="PENYEWA"
            submitLabel="Simpan Checklist Awal & Terbitkan Token OTP 6-Digit"
            onSubmit={(record) => onUpdate({ pickupChecklist: record })}
          />
        </Section>
      );
    }
    return (
      <Section title="Langkah 2 — Tunjukkan Token OTP 6-Digit kepada Pemilik Alat">
        <div className="bg-tech-grid rounded-2xl border border-hairline bg-surface-subtle p-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            <KeyRound className="size-3" />
            TOKEN VERIFIKASI SERAH TERIMA
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="rounded-xl border border-ink bg-surface px-5 py-3 font-mono text-3xl font-black tracking-[0.25em] text-ink sm:text-4xl">
              {formattedOtp}
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(rental.handoverCode);
                setCopiedOtp(true);
                setTimeout(() => setCopiedOtp(false), 2000);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface text-ink transition hover:border-ink"
              title="Salin kode OTP"
            >
              {copiedOtp ? (
                <Check className="size-4 text-forest" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>

          <p className="mx-auto mt-3 max-w-md text-xs text-ink-muted">
            Berikan kode 6 digit ini kepada <strong>{rental.ownerName}</strong> hanya setelah unit fisik Anda terima secara langsung di lokasi COD.
          </p>
        </div>

        <ChecklistComparison
          components={rental.components}
          pickup={rental.pickupChecklist}
        />
      </Section>
    );
  }

  // Sudut pandang Pemilik
  if (!rental.pickupChecklist) {
    return (
      <Section title="Menunggu Penyewa Menyelesaikan Inspeksi Awal">
        <InfoBox icon={<Clock className="size-4 text-ink-muted" />}>
          Serahkan instrumen kepada <strong>{rental.renterName}</strong> untuk diperiksa. Setelah Penyewa menyimpan checklist dan foto bukti awal, ia akan memberikan Token OTP 6-digit kepada Anda.
        </InfoBox>
        <div className="rounded-xl border border-hairline bg-surface-subtle p-4">
          <span className="block text-xs font-semibold text-ink-subtle">
            DAFTAR KOMPONEN WAJIB DISERAHKAN ({rental.components.length} ITEM)
          </span>
          <ul className="mt-2.5 grid grid-cols-1 gap-1.5 text-xs font-medium text-ink sm:grid-cols-2">
            {rental.components.map((component, idx) => (
              <li
                key={component.id}
                className="flex items-center gap-2 rounded-lg border border-surface-muted bg-surface px-3 py-2"
              >
                <span className="font-mono text-xs text-ink-subtle">
                  0{idx + 1}
                </span>
                <span>{component.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  function confirmCode() {
    if (!/^\d{6}$/.test(codeInput)) {
      setCodeError("Kode OTP wajib terdiri dari 6 digit angka.");
      return;
    }
    if (codeInput !== rental.handoverCode) {
      setCodeError("Token OTP tidak cocok. Periksa kembali kode di layar Penyewa.");
      return;
    }
    onUpdate({ status: "DISEWA" });
  }

  return (
    <Section title="Verifikasi Token OTP 6-Digit dari Penyewa">
      <p className="text-xs text-ink-muted">
        Hasil checklist awal yang dicatat oleh Penyewa:
      </p>
      <ChecklistComparison
        components={rental.components}
        pickup={rental.pickupChecklist}
      />
      {rental.pickupChecklist.generalNote && (
        <InfoBox>Catatan Penyewa: {rental.pickupChecklist.generalNote}</InfoBox>
      )}
      <div className="rounded-2xl border border-hairline bg-surface-subtle p-4 sm:p-5">
        <label
          htmlFor="handover-code"
          className="block text-xs font-bold uppercase tracking-wider text-ink"
        >
          Masukkan Token OTP Serah Terima (6 Digit)
        </label>
        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          <input
            id="handover-code"
            inputMode="numeric"
            maxLength={6}
            value={codeInput}
            onChange={(event) => {
              setCodeInput(event.target.value.replace(/\D/g, ""));
              setCodeError("");
            }}
            placeholder="000000"
            className="h-11 w-44 rounded-xl border border-hairline bg-surface px-4 font-mono text-lg font-bold tracking-[0.25em] text-ink focus:border-ink focus:outline-none"
          />
          <button
            type="button"
            onClick={confirmCode}
            className="h-11 rounded-xl bg-ink px-5 text-xs font-semibold text-canvas transition hover:bg-accent"
          >
            Verifikasi &amp; Mulai Masa Sewa
          </button>
          <button
            type="button"
            onClick={() => {
              setCodeInput(rental.handoverCode);
              setCodeError("");
            }}
            className="h-11 rounded-xl border border-hairline bg-surface px-3.5 font-mono text-xs font-medium text-ink-muted transition hover:border-ink hover:text-ink"
          >
            Isi OTP Demo ({rental.handoverCode})
          </button>
        </div>
        {codeError && (
          <p className="mt-2 text-xs font-semibold text-danger">{codeError}</p>
        )}
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
        <InfoBox
          tone="rose"
          icon={<AlertTriangle className="size-4 text-danger" />}
        >
          Masa sewa melewati jatuh tempo selama{" "}
          <strong>{lateDays} hari</strong> ({formatDate(rental.endDate)}).
          Sistem akan menghitung denda proporsional saat checklist pengembalian disimpan.
        </InfoBox>
      ) : (
        <InfoBox
          tone="emerald"
          icon={<CheckCircle2 className="size-4 text-forest" />}
        >
          Masa sewa berjalan aktif. Batas pengembalian COD tanpa denda:{" "}
          <strong>{formatDate(rental.endDate)}</strong>.
        </InfoBox>
      )}

      {role === "PEMILIK" ? (
        <Section title="Inspeksi Pengembalian Alat oleh Pemilik">
          <p className="text-xs text-ink-muted">
            Periksa kondisi setiap komponen saat dikembalikan oleh Penyewa dan lampirkan foto bukti akhir.
          </p>
          <ChecklistForm
            components={rental.components}
            filledBy="PEMILIK"
            submitLabel="Kirim Hasil Audit Pengembalian ke Penyewa"
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
        <InfoBox icon={<Clock className="size-4 text-ink-muted" />}>
          Kembalikan instrumen kepada <strong>{rental.ownerName}</strong> di{" "}
          <strong>{rental.codLocation}</strong>. Setelah Pemilik mengisi checklist pengembalian, Anda dapat menyetujui atau mengajukan keberatan di layar ini.
        </InfoBox>
      )}

      <Section title="Rekaman Kondisi Awal Saat Pengambilan">
        <ChecklistComparison
          components={rental.components}
          pickup={rental.pickupChecklist}
        />
      </Section>
    </div>
  );
}

/* ---------- Tahap 3: konfirmasi hasil pemeriksaan pengembalian ---------- */

function ReturnSummary({ rental }: { rental: HandoverRental }) {
  const worsened = countWorsened(
    rental.pickupChecklist,
    rental.returnChecklist,
  );
  const lateDays = rental.returnLateDays ?? 0;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-hairline bg-surface-subtle p-3.5">
        <p className="text-xs font-semibold text-ink-subtle">
          Status Ketepatan Waktu
        </p>
        <p
          className={`mt-1 font-mono text-base font-bold ${
            lateDays > 0 ? "text-danger" : "text-forest"
          }`}
        >
          {lateDays > 0 ? `Terlambat ${lateDays} Hari` : "Tepat Waktu"}
        </p>
      </div>
      <div className="rounded-xl border border-hairline bg-surface-subtle p-3.5">
        <p className="text-xs font-semibold text-ink-subtle">
          Selisih Kondisi Fisik
        </p>
        <p
          className={`mt-1 font-mono text-base font-bold ${
            worsened > 0 ? "text-danger" : "text-forest"
          }`}
        >
          {worsened > 0 ? `${worsened} Komponen Berubah` : "0 Selisih (Aman)"}
        </p>
      </div>
      <div className="rounded-xl border border-hairline bg-surface-subtle p-3.5">
        <p className="text-xs font-semibold text-ink-subtle">
          Dana Deposit Escrow
        </p>
        <p className="mt-1 font-mono text-base font-bold text-ink">
          {formatRupiah(rental.depositAmount)}
        </p>
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
      setReasonError("Jelaskan kronologi keberatan minimal 10 karakter.");
      return;
    }
    onUpdate({ status: "SENGKETA", disputeReason: reason.trim() });
  }

  return (
    <div className="space-y-6">
      <ReturnSummary rental={rental} />

      <Section title="Komparasi Kondisi Awal vs Pengembalian">
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
        <InfoBox tone="amber" icon={<Clock className="size-4" />}>
          Menunggu konfirmasi persetujuan hasil pemeriksaan dari{" "}
          <strong>{rental.renterName}</strong>.
        </InfoBox>
      ) : objecting ? (
        <Section title="Formulir Keberatan ke Moderator Admin">
          <textarea
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
              setReasonError("");
            }}
            rows={3}
            placeholder="Contoh: Probe oscilloscope dikembalikan lengkap 4 unit sesuai dokumentasi foto di meja lobi TULT."
            className="w-full rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-xs text-ink focus:border-ink focus:outline-none"
          />
          {reasonError && (
            <p className="text-xs font-semibold text-danger">{reasonError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={submitObjection}
              className="rounded-xl bg-danger px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-danger-hover"
            >
              Eskalasi Sengketa ke Admin
            </button>
            <button
              type="button"
              onClick={() => setObjecting(false)}
              className="rounded-xl border border-hairline bg-surface px-4 py-2.5 text-xs font-medium text-ink-muted hover:bg-canvas"
            >
              Batal
            </button>
          </div>
        </Section>
      ) : (
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => onUpdate({ status: "SELESAI" })}
            className="flex-1 rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-canvas transition hover:bg-forest"
          >
            Setujui Pemeriksaan &amp; Selesaikan Sewa
          </button>
          <button
            type="button"
            onClick={() => setObjecting(true)}
            className="flex-1 rounded-xl border border-danger-border bg-danger-subtle px-4 py-3 text-xs font-semibold text-danger transition hover:bg-danger hover:text-white"
          >
            Ajukan Sengketa Pemeriksaan
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
        <div className="space-y-3">
          <InfoBox
            tone="rose"
            icon={<AlertTriangle className="size-4 text-danger" />}
          >
            <strong>Eskalasi Mediasi Admin Aktif.</strong> Alasan keberatan
            Penyewa: &ldquo;{rental.disputeReason}&rdquo;. Deposit dibekukan sementara hingga keputusan moderator keluar.
          </InfoBox>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/disputes"
              className="inline-flex items-center gap-1.5 rounded-xl bg-danger px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-danger-hover"
            >
              <Scale className="size-3.5" />
              <span>Buka Ruang Mediasi &amp; Sengketa →</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <InfoBox
            tone="emerald"
            icon={<CheckCircle2 className="size-4 text-forest" />}
          >
            Protokol serah terima pengembalian selesai dan disahkan kedua pihak. Pencairan pendapatan pemilik serta pengembalian deposit telah diteruskan otomatis oleh sistem Escrow.
          </InfoBox>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-canvas transition hover:bg-accent"
            >
              <Star className="size-3.5" />
              <span>Beri Rating &amp; Ulasan Transaksi →</span>
            </Link>
            <Link
              href="/owner/wallet"
              className="inline-flex items-center gap-1.5 rounded-xl border border-ink bg-surface px-4 py-2.5 text-xs font-semibold text-ink transition hover:bg-surface-muted"
            >
              <Wallet className="size-3.5" />
              <span>Lihat Pencairan Dompet Pemilik →</span>
            </Link>
          </div>
        </div>
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
