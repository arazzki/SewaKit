'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'bca_va' | 'mandiri_va' | 'ewallet'>('qris');
  const [showXenditModal, setShowXenditModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  // Timer batas waktu 2 jam (menit & detik)
  const [secondsLeft, setSecondsLeft] = useState(7140); // 1 jam 59 menit

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
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const billDetails = {
    orderId: 'REQ-2026-088',
    itemName: 'Kamera Mirrorless Sony Alpha A6400 + Tripod',
    ownerName: 'Azriel Raihan (Informatika)',
    rentalDays: 2,
    rentalCost: 170000,
    depositAmount: 250000,
    adminFee: 2500,
  };

  const totalAmount = billDetails.rentalCost + billDetails.depositAmount + billDetails.adminFee;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowXenditModal(false);
      setIsPaid(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header & Navigasi */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#DCD8CE] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#141413]">
                Pembayaran Transaksi Sewa (Xendit Gateway)
              </span>
              <span className="rounded-full bg-[#EFECE6] px-2.5 py-0.5 text-xs font-semibold text-[#C83E2B]">
                Escrow Terlindungi
              </span>
            </div>
            <p className="text-xs text-[#575653] mt-1">
              Gateway Pembayaran Sewa {"&"} Deposit Jaminan • Idempotency Webhook • Batas Bayar 2 Jam
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-[#DCD8CE] bg-white px-3.5 py-2 text-xs font-semibold text-[#575653] hover:bg-[#EFECE6] transition"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* Banner Timer Batas Waktu Bayar 2 Jam */}
        {!isPaid ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white font-bold text-lg">
                ⏳
              </span>
              <div>
                <h4 className="text-sm font-bold text-amber-950">
                  Batas Waktu Pembayaran (Hold 2 Jam)
                </h4>
                <p className="text-xs text-amber-800">
                  Selesaikan pembayaran sebelum batas waktu habis, atau pesanan dibatalkan otomatis dan jadwal dibuka kembali.
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-amber-800">Sisa Waktu</span>
              <span className="font-mono text-xl font-extrabold text-amber-900">
                {formatTimer(secondsLeft)}
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#1B4332]/25 bg-[#E9F3ED] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1B4332] text-white font-bold text-lg">
                ✓
              </span>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">
                  Pembayaran Berhasil Dikonfirmasi (Webhook Xendit Verified)
                </h4>
                <p className="text-xs text-[#1B4332]">
                  Dana sewa dan deposit tersimpan aman di sistem. Silakan lanjut janjian serah terima COD dengan pemilik alat.
                </p>
              </div>
            </div>
            <Link
              href="/rentals/request"
              className="rounded-xl bg-[#1B4332] px-4 py-2 text-xs font-bold text-white hover:bg-[#1B4332] transition"
            >
              Lihat Kontak COD →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kolom Kiri: Pilihan Metode Pembayaran Xendit */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#DCD8CE] shadow-xs">
              <h3 className="text-base font-bold text-[#141413] mb-1">
                Pilih Jalur Pembayaran (Xendit Sandbox)
              </h3>
              <p className="text-xs text-[#575653] mb-4">
                Uji coba transaksi menggunakan simulator pembayaran Xendit.
              </p>

              <div className="space-y-3">
                {/* Opsi QRIS */}
                <label
                  onClick={() => setSelectedMethod('qris')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    selectedMethod === 'qris'
                      ? 'border-[#141413] bg-[#EFECE6] ring-1 ring-indigo-600'
                      : 'border-[#DCD8CE] hover:bg-[#F6F5F0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-[#141413]">QRIS Instan</span>
                    <span className="rounded bg-[#EFECE6] text-[#C83E2B] text-[10px] px-2 py-0.5 font-bold">
                      Bebas Biaya Admin
                    </span>
                  </div>
                  <span className="text-xs text-[#575653]">GoPay, OVO, ShopeePay, BCA Mobile</span>
                </label>

                {/* Opsi Virtual Account BCA */}
                <label
                  onClick={() => setSelectedMethod('bca_va')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    selectedMethod === 'bca_va'
                      ? 'border-[#141413] bg-[#EFECE6] ring-1 ring-indigo-600'
                      : 'border-[#DCD8CE] hover:bg-[#F6F5F0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-[#141413]">BCA Virtual Account</span>
                  </div>
                  <span className="text-xs text-[#575653] font-mono">Verifikasi Otomatis</span>
                </label>

                {/* Opsi Virtual Account Mandiri */}
                <label
                  onClick={() => setSelectedMethod('mandiri_va')}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                    selectedMethod === 'mandiri_va'
                      ? 'border-[#141413] bg-[#EFECE6] ring-1 ring-indigo-600'
                      : 'border-[#DCD8CE] hover:bg-[#F6F5F0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-[#141413]">Mandiri Virtual Account</span>
                  </div>
                  <span className="text-xs text-[#575653] font-mono">Verifikasi Otomatis</span>
                </label>
              </div>

              {!isPaid ? (
                <button
                  type="button"
                  onClick={() => setShowXenditModal(true)}
                  className="mt-6 w-full rounded-xl bg-[#141413] py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#141413] transition"
                >
                  Buka Invoice Pembayaran Xendit Sandbox →
                </button>
              ) : (
                <button
                  disabled
                  className="mt-6 w-full rounded-xl bg-[#EFECE6] py-3 text-sm font-bold text-[#78756F] cursor-not-allowed"
                >
                  ✓ Tagihan Ini Sudah Lunas Terbayar
                </button>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Rincian Tagihan */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#DCD8CE] shadow-xs">
              <span className="text-[11px] font-mono bg-[#EFECE6] text-[#575653] px-2.5 py-1 rounded-md font-bold">
                {billDetails.orderId}
              </span>
              <h4 className="text-base font-bold text-[#141413] mt-2">
                {billDetails.itemName}
              </h4>
              <p className="text-xs text-[#575653] mt-0.5">
                Pemilik: <strong>{billDetails.ownerName}</strong>
              </p>

              <div className="border-t border-b border-[#EFECE6] my-4 py-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#575653]">Biaya Sewa ({billDetails.rentalDays} Hari)</span>
                  <span className="font-semibold text-[#141413]">
                    Rp {billDetails.rentalCost.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#575653]">Deposit Jaminan (Kembali 100%)</span>
                  <span className="font-semibold text-[#141413]">
                    Rp {billDetails.depositAmount.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#575653]">Biaya Layanan Gateway</span>
                  <span className="font-semibold text-[#141413]">
                    Rp {billDetails.adminFee.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EFECE6] text-sm">
                  <span className="font-bold text-[#141413]">Total Pembayaran</span>
                  <span className="font-extrabold text-[#C83E2B]">
                    Rp {totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#F6F5F0] p-3 text-[11px] text-[#575653] leading-relaxed border border-[#DCD8CE]">
                🔒 <strong>Proteksi Escrow:</strong> Deposit Rp {billDetails.depositAmount.toLocaleString('id-ID')} disimpan di rekening penampung dan akan dikembalikan otomatis pasca serah terima pengembalian alat.
              </div>
            </div>
          </div>
        </div>

        {/* MODAL SIMULATOR POPUP XENDIT SANDBOX */}
        {showXenditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#DCD8CE]">
              <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#141413] font-extrabold text-white text-xs">
                    X
                  </span>
                  <span className="font-bold text-[#141413] text-sm">Xendit Invoice (Sandbox)</span>
                </div>
                <span className="text-[11px] bg-[#EFECE6] text-[#C83E2B] font-mono px-2 py-0.5 rounded font-bold">
                  TEST_MODE
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="rounded-xl bg-[#F6F5F0] p-3.5 border border-[#DCD8CE]">
                  <span className="text-[#78756F] block mb-0.5">Total Tagihan:</span>
                  <span className="text-xl font-extrabold text-[#141413] font-mono">
                    Rp {totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>

                {selectedMethod === 'qris' && (
                  <div className="text-center py-2 space-y-2">
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-xl bg-[#EFECE6] border border-dashed border-[#DCD8CE] font-mono text-[#575653] text-xs">
                      [ QRIS CODE MOCKUP ]
                    </div>
                    <p className="text-[11px] text-[#575653]">
                      Scan kode QRIS di atas menggunakan aplikasi e-wallet simulator.
                    </p>
                  </div>
                )}

                {(selectedMethod === 'bca_va' || selectedMethod === 'mandiri_va') && (
                  <div className="rounded-xl border border-[#DCD8CE] p-4 space-y-2">
                    <span className="text-[#78756F] block">Nomor Virtual Account Simulasi:</span>
                    <div className="flex items-center justify-between bg-white border p-2.5 rounded-lg">
                      <span className="font-mono font-bold text-sm text-[#141413]">
                        8808992026088
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="text-[#C83E2B] font-bold hover:underline"
                      >
                        {copied ? 'Tersalin!' : 'Salin'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleSimulatePayment}
                    className="flex-1 rounded-xl bg-[#1B4332] py-3 text-xs font-bold text-white hover:bg-[#1B4332] transition"
                  >
                    {isProcessing ? 'Memproses Webhook...' : '⚡ Simulasikan Bayar Sukses (Webhook)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowXenditModal(false)}
                    className="rounded-xl border border-[#DCD8CE] px-4 py-3 text-xs font-semibold text-[#575653] hover:bg-[#F6F5F0]"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}