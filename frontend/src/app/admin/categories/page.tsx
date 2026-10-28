'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Elektronik & Gadget', slug: 'elektronik-gadget', totalItems: 18 },
    { id: 2, name: 'Kamera & Fotografi', slug: 'kamera-fotografi', totalItems: 12 },
    { id: 3, name: 'Alat Laboratorium', slug: 'alat-laboratorium', totalItems: 9 },
    { id: 4, name: 'Buku & Referensi', slug: 'buku-referensi', totalItems: 6 },
  ]);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const nextId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
    const newEntry = {
      id: nextId,
      name: newCategory,
      slug: newCategory.toLowerCase().replace(/\s+/g, '-'),
      totalItems: 0,
    };

    setCategories([...categories, newEntry]);
    setNewCategory('');
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Kategori Barang</h1>
            <p className="text-sm text-gray-500">Tambah, ubah, atau hapus kategori penunjang kuliah</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              ← Kembali ke Dashboard Admin
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              Beranda
            </Link>
          </div>
        </div>

        {/* Form Tambah Kategori */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input
              type="text"
              placeholder="Nama Kategori Baru (misal: Alat Olahraga)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Tambah Kategori
            </button>
          </form>
        </div>

        {/* Tabel Daftar Kategori */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">Nama Kategori</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Jumlah Barang</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{cat.slug}</td>
                  <td className="px-6 py-4">{cat.totalItems} barang</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-xs font-semibold text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}