'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import { CheckCircle2 } from 'lucide-react';

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
    setSavedAlert('Data profil berhasil diperbarui.');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAlert('Kata sandi akun berhasil diperbarui.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-canvas">
      <PageHeader
        eyebrow="Pengaturan Akun"
        title="Profil & Keamanan"
        description="Kelola data identitas mahasiswa dan nomor WhatsApp aktif untuk koordinasi serah terima COD."
      />

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {savedAlert && (
          <div className="flex items-center justify-between rounded-xl border border-forest/25 bg-forest-subtle px-4 py-3 text-xs font-medium text-forest">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              {savedAlert}
            </span>
            <button onClick={() => setSavedAlert(null)} className="font-semibold underline">
              Tutup
            </button>
          </div>
        )}

        <Card className="p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-ink flex items-center justify-center text-canvas font-mono text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-ink">{user.name}</h2>
                <Badge variant="available" dot>
                  Mahasiswa Aktif
                </Badge>
              </div>
              <p className="text-xs text-ink-muted mt-1">
                NIM <span className="font-mono font-medium text-ink">{user.nim}</span> • {user.prodi}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-ink mb-4">
            Informasi Pribadi &amp; Kontak COD
          </h3>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">
                  Nama Lengkap
                </label>
                <Input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="bg-canvas focus:bg-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">
                  NIM
                </label>
                <Input type="text" value={user.nim} disabled className="font-mono" />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">
                  Email Kampus
                </label>
                <Input type="email" value={user.email} disabled />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">
                  Nomor WhatsApp (untuk COD)
                </label>
                <Input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="bg-canvas font-mono focus:bg-surface"
                />
              </div>
            </div>

            <Button type="submit">Simpan Perubahan</Button>
          </form>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-ink mb-4">
            Ubah Kata Sandi
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">
                  Kata Sandi Saat Ini
                </label>
                <Input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="bg-canvas focus:bg-surface"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">
                  Kata Sandi Baru
                </label>
                <Input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="bg-canvas focus:bg-surface"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">
                  Ulangi Sandi Baru
                </label>
                <Input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="bg-canvas focus:bg-surface"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="outline"
              className="border-ink hover:bg-ink hover:text-canvas"
            >
              Perbarui Kata Sandi
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
