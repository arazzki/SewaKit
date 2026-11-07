"use client";

import { useState, type ReactNode } from "react";
import {
  Copy,
  Check,
  KeyRound,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
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
      <h3 className="text-sm font-bold tracking-tight text-[#141413] sm:text-base">
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
    slate: "border-[#DCD8CE] bg-[#F6F5F0] text-[#575653]",
    amber: "border-[#E9C893] bg-[#FEF7EC] text-[#9A5B13]",
    emerald: "border-[#1B4332]/25 bg-[#E9F3ED] text-[#1B4332]",
    rose: "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]",
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
          <InfoBox icon={<ShieldCheck className="size-4 text-[#141413]" />}>
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
        <div className="bg-tech-grid rounded-2xl border border-[#DCD8CE] bg-[#FBF9F5] p-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-[#C83E2B]/25 bg-[#C83E2B]/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
            <KeyRound className="size-3" />
            TOKEN VERIFIKASI SERAH TERIMA
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="rounded-xl border border-[#141413] bg-white px-5 py-3 font-mono text-3xl font-black tracking-[0.25em] text-[#141413] sm:text-4xl">
              {formattedOtp}
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(rental.handoverCode);
                setCopiedOtp(true);
                setTimeout(() => setCopiedOtp(false), 2000);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DCD8CE] bg-white text-[#141413] transition hover:border-[#141413]"
              title="Salin kode OTP"
            >
              {copiedOtp ? (
                <Check className="size-4 text-[#1B4332]" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>

          <p className="mx-auto mt-3 max-w-md text-xs text-[#575653]">
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
        <InfoBox icon={<Clock className="size-4 text-[#575653]" />}>
          Serahkan instrumen kepada <strong>{rental.renterName}</strong> untuk diperiksa. Setelah Penyewa menyimpan checklist dan foto bukti awal, ia akan memberikan Token OTP 6-digit kepada Anda.
        </InfoBox>
        <div className="rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-4">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#78756F]">
            DAFTAR KOMPONEN WAJIB DISERAHKAN ({rental.components.length} ITEM)
          </span>
          <ul className="mt-2.5 grid grid-cols-1 gap-1.5 text-xs font-medium text-[#141413] sm:grid-cols-2">
            {rental.components.map((component, idx) => (
              <li
                key={component.id}
                className="flex items-center gap-2 rounded-lg border border-[#EFECE6] bg-white px-3 py-2"
              >
                <span className="font-mono text-[10px] text-[#78756F]">
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
      <p className="text-xs text-[#575653]">
        Hasil checklist awal yang dicatat oleh Penyewa:
      </p>
      <ChecklistComparison
        components={rental.components}
        pickup={rental.pickupChecklist}
      />
      {rental.pickupChecklist.generalNote && (
        <InfoBox>Catatan Penyewa: {rental.pickupChecklist.generalNote}</InfoBox>
      )}
      <div className="rounded-2xl border border-[#DCD8CE] bg-[#FBF9F5] p-4 sm:p-5">
        <label
          htmlFor="handover-code"
          className="block text-xs font-bold uppercase tracking-wider text-[#141413]"
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
            className="h-11 w-44 rounded-xl border border-[#DCD8CE] bg-white px-4 font-mono text-lg font-bold tracking-[0.25em] text-[#141413] focus:border-[#141413] focus:outline-none"
          />
          <button
            type="button"
            onClick={confirmCode}
            className="h-11 rounded-xl bg-[#141413] px-5 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#C83E2B]"
          >
            Verifikasi &amp; Mulai Masa Sewa
          </button>
          <button
            type="button"
            onClick={() => {
              setCodeInput(rental.handoverCode);
              setCodeError("");
            }}
            className="h-11 rounded-xl border border-[#DCD8CE] bg-white px-3.5 font-mono text-[11px] font-medium text-[#575653] transition hover:border-[#141413] hover:text-[#141413]"
          >
            Isi OTP Demo ({rental.handoverCode})
          </button>
        </div>
        {codeError && (
          <p className="mt-2 text-xs font-semibold text-[#B42318]">{codeError}</p>
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
          icon={<AlertTriangle className="size-4 text-[#B42318]" />}
        >
          Masa sewa melewati jatuh tempo selama{" "}
          <strong>{lateDays} hari</strong> ({formatDate(rental.endDate)}).
          Sistem akan menghitung denda proporsional saat checklist pengembalian disimpan.
        </InfoBox>
      ) : (
        <InfoBox
          tone="emerald"
          icon={<CheckCircle2 className="size-4 text-[#1B4332]" />}
        >
          Masa sewa berjalan aktif. Batas pengembalian COD tanpa denda:{" "}
          <strong>{formatDate(rental.endDate)}</strong>.
        </InfoBox>
      )}

      {role === "PEMILIK" ? (
        <Section title="Inspeksi Pengembalian Alat oleh Pemilik">
          <p className="text-xs text-[#575653]">
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
        <InfoBox icon={<Clock className="size-4 text-[#575653]" />}>
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
      <div className="rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-3.5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
          Status Ketepatan Waktu
        </p>
        <p
          className={`mt-1 font-mono text-base font-bold ${
            lateDays > 0 ? "text-[#B42318]" : "text-[#1B4332]"
          }`}
        >
          {lateDays > 0 ? `Terlambat ${lateDays} Hari` : "Tepat Waktu"}
        </p>
      </div>
      <div className="rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-3.5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
          Selisih Kondisi Fisik
        </p>
        <p
          className={`mt-1 font-mono text-base font-bold ${
            worsened > 0 ? "text-[#B42318]" : "text-[#1B4332]"
          }`}
        >
          {worsened > 0 ? `${worsened} Komponen Berubah` : "0 Selisih (Aman)"}
        </p>
      </div>
      <div className="rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] p-3.5">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
          Dana Deposit Escrow
        </p>
        <p className="mt-1 font-mono text-base font-bold text-[#141413]">
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
            className="w-full rounded-xl border border-[#DCD8CE] bg-white px-3.5 py-2.5 text-xs text-[#141413] focus:border-[#141413] focus:outline-none"
          />
          {reasonError && (
            <p className="text-xs font-semibold text-[#B42318]">{reasonError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={submitObjection}
              className="rounded-xl bg-[#B42318] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#912018]"
            >
              Eskalasi Sengketa ke Admin
            </button>
            <button
              type="button"
              onClick={() => setObjecting(false)}
              className="rounded-xl border border-[#DCD8CE] bg-white px-4 py-2.5 text-xs font-medium text-[#575653] hover:bg-[#F6F5F0]"
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
            className="flex-1 rounded-xl bg-[#141413] px-4 py-3 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#1B4332]"
          >
            Setujui Pemeriksaan &amp; Selesaikan Sewa
          </button>
          <button
            type="button"
            onClick={() => setObjecting(true)}
            className="flex-1 rounded-xl border border-[#FECDCA] bg-[#FEF3F2] px-4 py-3 text-xs font-semibold text-[#B42318] transition hover:bg-[#B42318] hover:text-white"
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
        <InfoBox
          tone="rose"
          icon={<AlertTriangle className="size-4 text-[#B42318]" />}
        >
          <strong>Eskalasi Mediasi Admin Aktif.</strong> Alasan keberatan
          Penyewa: &ldquo;{rental.disputeReason}&rdquo;. Deposit dibekukan sementara hingga keputusan moderator keluar.
        </InfoBox>
      ) : (
        <InfoBox
          tone="emerald"
          icon={<CheckCircle2 className="size-4 text-[#1B4332]" />}
        >
          Protokol serah terima pengembalian selesai dan disahkan kedua pihak. Pencairan pendapatan pemilik serta pengembalian deposit telah diteruskan otomatis oleh sistem Escrow.
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
