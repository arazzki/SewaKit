'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Azriel Raihan',
    nim: '103032400010',
    email: 'azriel@student.telkomuniversity.ac.id',
    phone: '0812-3456-7890',
    prodi: 'S1 Teknologi Informasi',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savedAlert, setSavedAlert] = useState<string | null>(null);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAlert('Data profil mahasiswa berhasil diperbarui.');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAlert('Kata sandi keamanan akun berhasil diperbarui.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <PageHeader
        eyebrow="IDENTITAS CIVITAS AKADEMIKA"
        title="Profil & Keamanan Akun Mahasiswa"
        description="Data identitas NIM dan kontak WhatsApp resmi yang digunakan saat verifikasi serah terima COD."
      />

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {savedAlert && (
          <div className="flex items-center justify-between rounded-xl border border-[#1B4332]/25 bg-[#E9F3ED] px-4 py-3 text-xs font-medium text-[#1B4332]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              {savedAlert}
            </span>
            <button onClick={() => setSavedAlert(null)} className="font-mono underline">
              Tutup
            </button>
          </div>
        )}

        {/* Kartu Identitas */}
        <div className="bg-white rounded-2xl p-6 border border-[#DCD8CE] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-[#141413] flex items-center justify-center text-[#F6F5F0] font-mono text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#141413]">{user.name}</h2>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#1B4332]/20 bg-[#E9F3ED] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#1B4332]">
                  <ShieldCheck className="size-3" /> NIM TERVERIFIKASI
                </span>
              </div>
              <p className="font-mono text-xs text-[#575653] mt-1">
                NIM: {user.nim} • {user.prodi}
              </p>
            </div>
          </div>
        </div>

        {/* Form Edit Informasi Akun */}
        <div className="bg-white rounded-2xl p-6 border border-[#DCD8CE]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
            DATA KONTAK COD
          </span>
          <h3 className="text-base font-bold text-[#141413] mb-4 mt-0.5">
            Informasi Pribadi Mahasiswa
          </h3>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#575653] mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575653] mb-1.5">
                  Nomor Induk Mahasiswa (NIM)
                </label>
                <input
                  type="text"
                  value={user.nim}
                  disabled
                  className="w-full rounded-xl border border-[#EFECE6] bg-[#EFECE6] px-4 py-2.5 font-mono text-sm text-[#78756F] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575653] mb-1.5">
                  Email SSO Kampus
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-xl border border-[#EFECE6] bg-[#EFECE6] px-4 py-2.5 text-sm text-[#78756F] cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575653] mb-1.5">
                  Nomor WhatsApp Aktif (Untuk Janjian COD)
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 font-mono text-sm text-[#141413] focus:bg-white focus:border-[#141413] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#141413] px-5 py-2.5 text-xs font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
            >
              Simpan Perubahan Profil
            </button>
          </form>
        </div>

        {/* Form Ubah Password */}
        <div className="bg-white rounded-2xl p-6 border border-[#DCD8CE]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
            OTENTIKASI
          </span>
          <h3 className="text-base font-bold text-[#141413] mb-4 mt-0.5">
            Perbarui Kata Sandi
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#575653] mb-1.5">
                  Kata Sandi Saat Ini
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm focus:bg-white focus:border-[#141413] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575653] mb-1.5">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm focus:bg-white focus:border-[#141413] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#575653] mb-1.5">
                  Konfirmasi Sandi Baru
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#DCD8CE] bg-[#F6F5F0] px-4 py-2.5 text-sm focus:bg-white focus:border-[#141413] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl border border-[#141413] bg-white px-5 py-2.5 text-xs font-medium text-[#141413] transition hover:bg-[#141413] hover:text-[#F6F5F0]"
            >
              Perbarui Kata Sandi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
