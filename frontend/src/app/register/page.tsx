'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [registered, setRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 my-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Daftar Akun SewaKit</h1>
          <p className="text-sm text-gray-500 mt-1">Buat akun untuk mulai menyewa atau menyewakan alat</p>
        </div>

        {registered && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-xs font-medium text-green-800">
            ✓ Pendaftaran berhasil untuk {formData.name} ({formData.nim})!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Azriel Raihan"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIM</label>
            <input
              type="text"
              name="nim"
              required
              placeholder="103032400010"
              value={formData.nim}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Kampus</label>
            <input
              type="email"
              name="email"
              required
              placeholder="nama@student.ac.id"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp / HP</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="081234567890"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
            <input
              type="password"
              name="password_confirmation"
              required
              placeholder="••••••••"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-600 space-y-2">
          <p>
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">
              Masuk di sini
            </Link>
          </p>
          <p>
            <Link href="/" className="text-gray-400 hover:text-gray-700">
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}