'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

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
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#F6F5F0] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 border border-[#DCD8CE] shadow-[0_12px_32px_-12px_rgba(20,20,19,0.08)]">
        <div className="mb-6">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
            PORTAL OTENTIKASI
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#141413] mt-1">
            Masuk ke Akun SewaKit
          </h1>
          <p className="text-xs text-[#575653] mt-1">
            Gunakan kredensial mahasiswa Telkom University atau akun moderator.
          </p>
        </div>

        {/* Pilihan Login Mahasiswa vs Admin (OTP) */}
        <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#EFECE6] p-1 mb-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setRoleTab('mahasiswa');
              setFeedback(null);
            }}
            className={`rounded-lg py-2 transition ${
              roleTab === 'mahasiswa'
                ? 'bg-[#141413] text-[#F6F5F0]'
                : 'text-[#575653] hover:text-[#141413]'
            }`}
          >
            Mahasiswa (NIM/Email)
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleTab('admin');
              setFeedback(null);
            }}
            className={`rounded-lg py-2 transition ${
              roleTab === 'admin'
                ? 'bg-[#141413] text-[#F6F5F0]'
                : 'text-[#575653] hover:text-[#141413]'
            }`}
          >
            Moderator (OTP 2FA)
          </button>
        </div>

        {feedback && (
          <div className="mb-5 rounded-xl bg-[#E9F3ED] border border-[#1B4332]/25 p-3.5 text-xs font-medium text-[#1B4332]">
            ✓ {feedback}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {roleTab === 'mahasiswa' ? (
            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Email Kampus / NIM
              </label>
              <input
                type="text"
                required
                placeholder="nama@student.telkomuniversity.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Username Administrator
              </label>
              <input
                type="text"
                required
                placeholder="admin.sewakit"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#575653] mb-1.5">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
            />
          </div>

          {roleTab === 'admin' && (
            <div>
              <label className="block text-xs font-medium text-[#575653] mb-1.5">
                Kode Verifikasi OTP (6 Digit)
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={adminOtp}
                onChange={(e) => setAdminOtp(e.target.value)}
                className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 font-mono text-sm tracking-widest text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-[#141413] py-3 text-xs font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
          >
            {roleTab === 'mahasiswa' ? 'Masuk ke Akun' : 'Verifikasi & Masuk Admin'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#575653]">
          Belum memiliki akun mahasiswa?{' '}
          <Link href="/register" className="font-semibold text-[#C83E2B] hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
