'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Perangkat IoT & Elektronika', slug: 'iot-elektronika', totalItems: 18 },
    { id: 2, name: 'Komputer & Multimedia', slug: 'komputer-multimedia', totalItems: 12 },
    { id: 3, name: 'Perlengkapan Akademik & Lab', slug: 'akademik', totalItems: 9 },
    { id: 4, name: 'Logistik Acara & Kepanitiaan', slug: 'acara-kegiatan', totalItems: 6 },
  ]);

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    const nextId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
    const newEntry = {
      id: nextId,
      name: newCategory,
      slug: newCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      totalItems: 0,
    };

    setCategories([...categories, newEntry]);
    setNewCategory('');
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <PageHeader
        eyebrow="TAKSONOMI INVENTARIS"
        title="Manajemen Master Kategori Alat"
        description="Kelola klasifikasi peralatan praktikum, riset, dan logistik acara mahasiswa."
        actions={
          <Link
            href="/admin/dashboard"
            className="rounded-xl border border-[#141413] bg-white px-4 py-2.5 text-xs font-medium text-[#141413] hover:bg-[#EFECE6] transition"
          >
            ← Dashboard Admin
          </Link>
        }
      />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <div className="bg-white rounded-2xl p-5 border border-[#DCD8CE]">
          <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Nama Kategori Baru (contoh: Instrumen Jaringan & Fiber Optik)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#141413] px-5 py-2.5 text-xs font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
            >
              <Plus className="size-4" />
              <span>Tambah Kategori</span>
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-[#DCD8CE] overflow-hidden">
          <table className="w-full text-left text-sm text-[#575653]">
            <thead className="bg-[#F6F5F0] font-mono text-[11px] uppercase tracking-wider text-[#78756F] border-b border-[#DCD8CE]">
              <tr>
                <th className="px-6 py-3.5">Nama Kategori</th>
                <th className="px-6 py-3.5">Slug Identifikasi</th>
                <th className="px-6 py-3.5">Unit Terdaftar</th>
                <th className="px-6 py-3.5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6]">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#FBF9F5]">
                  <td className="px-6 py-4 font-bold text-[#141413]">{cat.name}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs bg-[#EFECE6] px-2.5 py-1 rounded-md text-[#575653]">
                      /{cat.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-[#141413]">
                    {cat.totalItems} Barang
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#C83E2B]/30 bg-[#C83E2B]/10 px-3 py-1.5 text-xs font-medium text-[#C83E2B] hover:bg-[#C83E2B] hover:text-white transition"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Hapus</span>
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
