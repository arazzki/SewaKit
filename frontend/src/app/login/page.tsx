'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  Lock,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function LoginPage() {
  const [roleTab, setRoleTab] = useState<'mahasiswa' | 'admin'>('mahasiswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminOtp, setAdminOtp] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleTab === 'mahasiswa') {
      setFeedback(`Sesi Mahasiswa aktif untuk ${email} (JWT Token diterbitkan).`);
    } else {
      setFeedback(`Sesi Administrator terverifikasi dengan kode OTP (${adminOtp}).`);
    }
  };

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center bg-[#F6F5F0] bg-tech-grid px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#DCD8CE] bg-white p-7 sm:p-8 shadow-[0_10px_28px_-14px_rgba(20,20,19,0.10)]">
        {/* Official Standardized BrandLogo */}
        <div className="mb-6 flex items-center justify-between border-b border-[#EFECE6] pb-5">
          <BrandLogo size="lg" theme="light" showTagline />
        </div>

        <div className="mb-5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
            01 / PORTAL OTENTIKASI SSO
          </span>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-[#141413]">
            Masuk ke Akun SewaKit
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-[#575653]">
            Gunakan kredensial mahasiswa Telkom University terverifikasi atau akun moderator kampus.
          </p>
        </div>

        {/* Pilihan Login Mahasiswa vs Admin (OTP) */}
        <div className="mb-6 grid grid-cols-2 gap-1.5 rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setRoleTab('mahasiswa');
              setFeedback(null);
            }}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              roleTab === 'mahasiswa'
                ? 'bg-[#141413] text-[#F6F5F0] font-semibold'
                : 'text-[#575653] hover:text-[#141413]'
            }`}
          >
            <GraduationCap className="size-3.5" />
            <span>Mahasiswa (NIM)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleTab('admin');
              setFeedback(null);
            }}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              roleTab === 'admin'
                ? 'bg-[#141413] text-[#F6F5F0] font-semibold'
                : 'text-[#575653] hover:text-[#141413]'
            }`}
          >
            <ShieldCheck className="size-3.5" />
            <span>Moderator (2FA)</span>
          </button>
        </div>

        {feedback && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#1B4332]/25 bg-[#E9F3ED] p-3.5 text-xs font-medium text-[#1B4332]">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {roleTab === 'mahasiswa' ? (
            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Email Kampus / NIM
              </label>
              <input
                type="text"
                required
                placeholder="nama@student.telkomuniversity.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Username Administrator
              </label>
              <input
                type="text"
                required
                placeholder="admin.sewakit"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] px-4 py-2.5 font-mono text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#78756F]" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] py-2.5 pl-10 pr-4 text-sm text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {roleTab === 'admin' && (
            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#575653]">
                Token Verifikasi OTP (6 Digit)
              </label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#C83E2B]" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="849201"
                  value={adminOtp}
                  onChange={(e) => setAdminOtp(e.target.value)}
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#FBF9F5] py-2.5 pl-10 pr-4 font-mono text-sm font-bold tracking-[0.25em] text-[#141413] transition focus:border-[#141413] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#141413] py-3 text-xs font-semibold text-[#F6F5F0] transition hover:bg-[#C83E2B]"
          >
            <span>
              {roleTab === 'mahasiswa' ? 'Masuk ke Akun Mahasiswa' : 'Verifikasi & Masuk Admin'}
            </span>
            <ArrowRight className="size-3.5" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-[#EFECE6] pt-4 text-xs text-[#575653]">
          <span>Belum memiliki akun civitas?</span>
          <Link href="/register" className="font-semibold text-[#C83E2B] hover:underline">
            Daftar NIM Sekarang →
          </Link>
        </div>
      </div>
    </div>
  );
}
