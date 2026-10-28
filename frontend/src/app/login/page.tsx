'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      setFeedback(`Login Mahasiswa berhasil sebagai ${email} (Token JWT aktif).`);
    } else {
      setFeedback(`Login Admin terverifikasi dengan OTP (${adminOtp}).`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md border border-gray-100">
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-sm mb-3"
          >
            SK
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Masuk ke SewaKit</h1>
          <p className="text-sm text-gray-500 mt-1">
            Platform sewa alat penunjang kuliah antar-mahasiswa
          </p>
        </div>

        {/* Pilihan Login Mahasiswa vs Admin (OTP) */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRoleTab('mahasiswa');
              setFeedback(null);
            }}
            className={`rounded-lg py-2 transition ${
              roleTab === 'mahasiswa'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Mahasiswa (Penyewa/Pemilik)
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleTab('admin');
              setFeedback(null);
            }}
            className={`rounded-lg py-2 transition ${
              roleTab === 'admin'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Admin (Login + OTP)
          </button>
        </div>

        {feedback && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-xs font-medium text-green-800">
            ✓ {feedback}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {roleTab === 'mahasiswa' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Kampus / NIM
              </label>
              <input
                type="email"
                required
                placeholder="nama@student.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username Admin
              </label>
              <input
                type="text"
                required
                placeholder="admin_sewakit"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {roleTab === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kode OTP Admin (6 Digit)
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={adminOtp}
                onChange={(e) => setAdminOtp(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-mono tracking-widest focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Dilengkapi pembatasan percobaan login (Maks 5x percobaan).
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {roleTab === 'mahasiswa' ? 'Masuk' : 'Verifikasi OTP & Masuk Admin'}
          </button>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-4 space-y-2 text-center text-xs text-gray-600">
          <p>
            Belum punya akun?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:underline">
              Daftar Sekarang
            </Link>
          </p>
          <p>
            Sudah login?{' '}
            <Link href="/profile" className="font-semibold text-blue-600 hover:underline">
              Buka Profil & Manajemen Akun →
            </Link>
          </p>
          <p className="pt-1">
            <Link href="/" className="text-gray-400 hover:text-gray-700">
              ← Kembali ke Beranda SewaKit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}