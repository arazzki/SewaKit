'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DisputesAndDepositPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'sengketa'>('deposit');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimReason, setClaimReason] = useState('');
  const [claimAmount, setClaimAmount] = useState('50000');
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const [depositData, setDepositData] = useState({
    totalHeld: 150000,
    orderId: 'REQ-2026-089',
    itemName: 'Oscilloscope Digital Rigol DS1054Z',
    status: 'DITAHAN_SISTEM',
    dendaKeterlambatan: 0,
    dendaKerusakan: 0,
  });

  const handleWithdraw = () => {
    setAlertMsg('Pengajuan pengembalian deposit berhasil! Dana Rp ' + depositData.totalHeld.toLocaleString('id-ID') + ' diteruskan ke rekening penyewa.');
  };

  const handleSubmiClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setShowClaimModal(false);
    setAlertMsg('Klaim sengketa berhasil diajukan ke Admin SewaKit! Tim Admin akan meninjau foto kondisi barang saat serah terima.');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header & Navigasi */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-900">
                Manajemen Deposit, Denda {"&"} Sengketa
              </span>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                Pusat Resolusi
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Escrow Penahanan Deposit Jaminan • Otomatisasi Denda • Penyelesaian Sengketa Admin
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>

        {alertMsg && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-900 flex justify-between items-center">
            <span>✓ {alertMsg}</span>
            <button onClick={() => setAlertMsg(null)} className="underline font-bold ml-4">
              Tutup
            </button>
          </div>
        )}

        {/* Tab Pilihan */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'deposit'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            1. Status Penahanan Deposit (Escrow)
          </button>
          <button
            onClick={() => setActiveTab('sengketa')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              activeTab === 'sengketa'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            2. Pusat Resolusi Sengketa {"&"} Klaim
          </button>
        </div>

        {/* TAB 1: KELOLA DEPOSIT */}
        {activeTab === 'deposit' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-bold">
                      {depositData.orderId}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 mt-1">
                      {depositData.itemName}
                    </h2>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">
                    Aman di Escrow
                  </span>
                </div>

                <div className="border-t border-b border-slate-100 py-4 my-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nominal Deposit Disetor:</span>
                    <strong className="text-slate-900">
                      Rp {depositData.totalHeld.toLocaleString('id-ID')}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Potongan Denda Keterlambatan:</span>
                    <strong className="text-slate-900">
                      Rp {depositData.dendaKeterlambatan.toLocaleString('id-ID')}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Potongan Klaim Kerusakan Fisik:</span>
                    <strong className="text-slate-900">
                      Rp {depositData.dendaKerusakan.toLocaleString('id-ID')}
                    </strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 text-sm">
                    <span className="font-bold text-slate-900">Sisa Deposit Siap Dicairkan:</span>
                    <strong className="text-emerald-600 font-extrabold">
                      Rp {(depositData.totalHeld - depositData.dendaKeterlambatan - depositData.dendaKerusakan).toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleWithdraw}
                    className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-500 transition"
                  >
                    Konfirmasi Pencairan Deposit ke Penyewa
                  </button>
                  <button
                    onClick={() => setShowClaimModal(true)}
                    className="border border-rose-200 bg-rose-50 text-rose-700 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-rose-100 transition"
                  >
                    Klaim Denda / Kerusakan
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 text-xs space-y-3">
                <span className="font-bold text-slate-900 block">
                  Ketentuan Perlindungan Deposit:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  1. Uang deposit ditahan oleh sistem SewaKit selama masa transaksi COD berlangsung.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  2. Jika barang kembali lengkap dan sesuai checklist fisik awal, deposit kembali 100% utuh ke saldo penyewa.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  3. Total maksimal denda keterlambatan/kerusakan dibatasi <strong>sebesar nominal deposit jaminan</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SENGKETA */}
        {activeTab === 'sengketa' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Daftar Sengketa {"&"} Keberatan Aktif
                </h3>
                <p className="text-xs text-slate-500">
                  Sengketa diputuskan secara adil oleh Admin berdasarkan perbandingan foto serah terima.
                </p>
              </div>
              <button
                onClick={() => setShowClaimModal(true)}
                className="bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-500 transition"
              >
                + Ajukan Sengketa Baru
              </button>
            </div>

            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
              Belum ada sengketa transaksi yang sedang berjalan. Semua transaksi dalam status aman.
            </div>
          </div>
        )}

        {/* MODAL KLAIM */}
        {showClaimModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Formulir Pengajuan Klaim / Sengketa
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Diajukan jika ada keterlambatan pengembalian atau kerusakan komponen fisik alat.
              </p>

              <form onSubmit={handleSubmiClaim} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nominal Denda / Klaim yang Dituntut (Rp)
                  </label>
                  <input
                    type="number"
                    max={depositData.totalHeld}
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                  <span className="text-[11px] text-slate-400">
                    Maksimal klaim: Rp {depositData.totalHeld.toLocaleString('id-ID')} (sebesar deposit).
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Alasan Klaim / Bukti Kerusakan
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={claimReason}
                    onChange={(e) => setClaimReason(e.target.value)}
                    placeholder="Contoh: Kabel probe osiloskop putus saat pengembalian barang..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-rose-600 text-white py-2.5 rounded-xl font-bold hover:bg-rose-500 transition"
                  >
                    Kirim Klaim ke Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClaimModal(false)}
                    className="border border-slate-200 bg-white px-4 py-2.5 rounded-xl font-semibold text-slate-600"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}