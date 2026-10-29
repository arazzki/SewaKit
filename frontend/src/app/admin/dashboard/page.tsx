'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { Users, Package, Activity, Wallet, ArrowUpRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Total Mahasiswa Terdaftar', value: '124', code: 'USR-01', icon: Users },
    { name: 'Unit Alat Aktif', value: '45', code: 'INV-02', icon: Package },
    { name: 'Transaksi Berjalan', value: '18', code: 'TRX-03', icon: Activity },
    { name: 'Volume Escrow Kampus', value: 'Rp 4.250.000', code: 'VOL-04', icon: Wallet },
  ];

  const recentTransactions = [
    {
      id: 'TRX-2026-901',
      renter: 'Fathurrahman Alfarizi',
      item: 'Arduino Uno Starter Kit',
      date: '28 Okt 2026',
      status: 'Selesai',
      tone: 'forest',
    },
    {
      id: 'TRX-2026-902',
      renter: 'Muhamad Alwan Suryadi',
      item: 'Kamera Mirrorless Sony A6400',
      date: '28 Okt 2026',
      status: 'Masa Sewa',
      tone: 'terracotta',
    },
    {
      id: 'TRX-2026-903',
      renter: 'Rayvan Alifarlo',
      item: 'Oscilloscope Digital Rigol',
      date: '27 Okt 2026',
      status: 'Selesai',
      tone: 'forest',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <PageHeader
        eyebrow="MODERASI & TATA KELOLA"
        title="Dashboard Administrator SewaKit"
        description="Pemantauan metrik inventaris kampus, pengawasan transaksi escrow, dan pengelolaan master kategori."
        actions={
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#141413] px-4 py-2.5 text-xs font-medium text-[#F6F5F0] hover:bg-[#C83E2B] transition"
          >
            <span>Kelola Master Kategori</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        }
      />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.code}
                className="bg-white p-5 rounded-2xl border border-[#DCD8CE] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                    {stat.code}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EFECE6] bg-[#F6F5F0] text-[#141413]">
                    <IconComponent className="size-4" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-[#141413]">{stat.value}</p>
                  <p className="text-xs text-[#575653] mt-1">{stat.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-[#DCD8CE] overflow-hidden">
          <div className="border-b border-[#EFECE6] px-6 py-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#78756F] block">
                AUDIT TRAIL
              </span>
              <h2 className="text-base font-bold text-[#141413]">
                Log Aktivitas Transaksi Terbaru
              </h2>
            </div>
            <Link
              href="/disputes"
              className="font-mono text-xs font-semibold text-[#C83E2B] hover:underline"
            >
              Tinjau Sengketa →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#575653]">
              <thead className="bg-[#F6F5F0] font-mono text-[11px] uppercase tracking-wider text-[#78756F] border-b border-[#DCD8CE]">
                <tr>
                  <th className="px-6 py-3.5">ID Transaksi</th>
                  <th className="px-6 py-3.5">Mahasiswa Penyewa</th>
                  <th className="px-6 py-3.5">Instrumen / Alat</th>
                  <th className="px-6 py-3.5">Tanggal</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {recentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-[#FBF9F5]">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-[#141413]">
                      {trx.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#141413]">{trx.renter}</td>
                    <td className="px-6 py-4">{trx.item}</td>
                    <td className="px-6 py-4 font-mono text-xs">{trx.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-md border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                          trx.tone === 'forest'
                            ? 'border-[#1B4332]/20 bg-[#E9F3ED] text-[#1B4332]'
                            : 'border-[#C83E2B]/25 bg-[#C83E2B]/10 text-[#C83E2B]'
                        }`}
                      >
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
