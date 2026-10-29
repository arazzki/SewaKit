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
    <div className="flex min-h-[80vh] items-center justify-center bg-[#F6F5F0] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 border border-[#DCD8CE] shadow-[0_12px_32px_-12px_rgba(20,20,19,0.08)]">
        <div className="mb-6">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
            REGISTRASI MAHASISWA
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#141413] mt-1">
            Daftar Akun SewaKit
          </h1>
          <p className="text-xs text-[#575653] mt-1">
            Verifikasi NIM Telkom University untuk mulai menyewa atau menyewakan peralatan.
          </p>
        </div>

        {registered && (
          <div className="mb-5 rounded-xl bg-[#E9F3ED] border border-[#1B4332]/25 p-3.5 text-xs font-medium text-[#1B4332]">
            ✓ Pendaftaran berhasil untuk {formData.name} (NIM: {formData.nim})!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Azriel Raihan"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                NIM Mahasiswa
              </label>
              <input
                type="text"
                name="nim"
                required
                placeholder="103032400010"
                value={formData.nim}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 font-mono text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Email Kampus
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@student.telkomuniversity.ac.id"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Nomor WhatsApp Aktif
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="081234567890"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 font-mono text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                name="password_confirmation"
                required
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#141413] py-3 text-xs font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
          >
            Daftarkan Akun Mahasiswa
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#575653]">
          Sudah memiliki akun?{' '}
          <Link href="/auth/login" className="font-semibold text-[#C83E2B] hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
