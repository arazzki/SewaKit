'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

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
    <div className="flex min-h-[82vh] items-center justify-center bg-[#F6F5F0] bg-tech-grid px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#DCD8CE] bg-white p-7 sm:p-8 shadow-[0_10px_28px_-14px_rgba(20,20,19,0.10)]">
        {/* Official Standardized BrandLogo */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#EFECE6] pb-5">
          <BrandLogo size="lg" theme="light" showTagline />
          <span className="inline-flex items-center gap-1 rounded-md border border-[#1B4332]/20 bg-[#E9F3ED] px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1B4332]">
            <ShieldCheck className="size-3" />
            KYC NIM KAMPUS
          </span>
        </div>

        <div className="mb-5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
            02 / REGISTRASI CIVITAS AKADEMIKA
          </span>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-[#141413]">
            Daftar Akun Mahasiswa SewaKit
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-[#575653]">
            Verifikasi identitas NIM Telkom University untuk mulai menyewa atau menyewakan perangkat praktikum dengan proteksi escrow.
          </p>
        </div>

        {registered && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#1B4332]/25 bg-[#E9F3ED] p-3.5 text-xs font-medium text-[#1B4332]">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <span>
              Pendaftaran berhasil diverifikasi untuk <strong>{formData.name}</strong> (NIM:{' '}
              <span className="font-mono">{formData.nim}</span>).
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Azriel Raihan"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                NIM Mahasiswa
              </label>
              <input
                type="text"
                name="nim"
                required
                placeholder="103032400010"
                value={formData.nim}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 font-mono text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Email SSO Kampus
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nama@student.telkomuniversity.ac.id"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Nomor WhatsApp COD
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="081234567890"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 font-mono text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                name="password_confirmation"
                required
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#141413] py-3 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#C83E2B]"
          >
            <span>Daftarkan Akun Mahasiswa</span>
            <ArrowRight className="size-3.5" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-[#EFECE6] pt-4 text-xs text-[#575653]">
          <span>Sudah terdaftar sebagai civitas?</span>
          <Link href="/auth/login" className="font-semibold text-[#C83E2B] hover:underline">
            Masuk di sini →
          </Link>
        </div>
      </div>
    </div>
  );
}
