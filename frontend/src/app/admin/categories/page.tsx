'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
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
    <div className="min-h-screen bg-canvas">
      <PageHeader
        eyebrow="Moderasi Kampus"
        title="Kelola Kategori Alat"
        description="Tambah atau atur kategori peralatan praktikum, multimedia, dan kepanitiaan kampus."
        actions={
          <Button href="/admin/dashboard" variant="outline" className="border-ink">
            ← Dashboard Admin
          </Button>
        }
      />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
        <Card className="p-5">
          <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Nama Kategori Baru (contoh: Instrumen Jaringan & Fiber Optik)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 bg-canvas focus:bg-surface"
            />
            <Button type="submit" className="shrink-0">
              <Plus className="size-4" />
              <span>Tambah Kategori</span>
            </Button>
          </form>
        </Card>

        <Card className="overflow-hidden">
          <table className="w-full text-left text-sm text-ink-muted">
            <thead className="bg-canvas text-xs font-semibold text-ink-subtle border-b border-hairline">
              <tr>
                <th className="px-6 py-3.5">Nama Kategori</th>
                <th className="px-6 py-3.5">Slug Identifikasi</th>
                <th className="px-6 py-3.5">Unit Terdaftar</th>
                <th className="px-6 py-3.5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-muted">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-surface-subtle">
                  <td className="px-6 py-4 font-bold text-ink">{cat.name}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs bg-surface-muted px-2.5 py-1 rounded-md text-ink-muted">
                      /{cat.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-ink">
                    {cat.totalItems} Barang
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="danger"
                      size="xs"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2 className="size-3.5" />
                      <span>Hapus</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
