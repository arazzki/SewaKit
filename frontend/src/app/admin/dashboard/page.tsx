'use client';

import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Total Pengguna', value: '124', color: 'bg-blue-500' },
    { name: 'Barang Disewakan', value: '45', color: 'bg-green-500' },
    { name: 'Transaksi Aktif', value: '18', color: 'bg-amber-500' },
    { name: 'Total Pendapatan', value: 'Rp 4.250.000', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-sm text-gray-500">
              Ringkasan statistik dan aktivitas platform SewaKit
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/categories"
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
            >
              Kelola Kategori Barang →
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              ← Beranda
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`h-3 w-3 rounded-full ${stat.color}`}></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Aktivitas Transaksi Terbaru
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Penyewa</th>
                  <th className="px-4 py-3">Barang</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    Fathurrahman Alfarizi
                  </td>
                  <td className="px-4 py-3">Arduino Uno Kit</td>
                  <td className="px-4 py-3">28 Okt 2026</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Berhasil
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    Muhammad Alwan
                  </td>
                  <td className="px-4 py-3">Kamera DSLR Canon</td>
                  <td className="px-4 py-3">27 Okt 2026</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                      Diproses
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}