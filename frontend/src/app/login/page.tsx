'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  GraduationCap,
  KeyRound,
  ArrowRight,
  Lock,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';
import { useRentalSession } from '@/context/RentalSessionContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsStudent, loginAsModerator } = useRentalSession();
  const [roleTab, setRoleTab] = useState<'mahasiswa' | 'admin'>('mahasiswa');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminOtp, setAdminOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleTab === 'mahasiswa') {
      loginAsStudent(email);
      router.push('/catalog');
    } else {
      loginAsModerator(adminUsername);
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="flex min-h-[82vh] flex-col items-center justify-center bg-canvas px-4 py-12">
      <Card variant="elevated" className="w-full max-w-md p-7 sm:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-surface-muted pb-5">
          <BrandLogo size="lg" theme="light" showTagline />
        </div>

        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight text-ink">
            Masuk ke Akun SewaKit
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Masuk dengan email mahasiswa Telkom University atau akun moderator kampus.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-1.5 rounded-xl border border-hairline bg-canvas p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setRoleTab('mahasiswa')}
            className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              roleTab === 'mahasiswa'
                ? 'bg-ink text-canvas font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <GraduationCap className="size-3.5" />
            <span>Mahasiswa</span>
          </button>
          <button
            type="button"
            onClick={() => setRoleTab('admin')}
            className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2 transition ${
              roleTab === 'admin'
                ? 'bg-ink text-canvas font-semibold'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <ShieldCheck className="size-3.5" />
            <span>Moderator</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {roleTab === 'mahasiswa' ? (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Email Kampus / NIM
              </label>
              <Input
                type="text"
                required
                placeholder="nama@student.telkomuniversity.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface-subtle focus:bg-surface"
              />
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Username Moderator
              </label>
              <Input
                type="text"
                required
                placeholder="admin.sewakit"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="bg-surface-subtle font-mono focus:bg-surface"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink">
              Kata Sandi
            </label>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="size-4" />}
              className="bg-surface-subtle focus:bg-surface"
            />
          </div>

          {roleTab === 'admin' && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Kode OTP (6 Digit)
              </label>
              <Input
                type="text"
                required
                maxLength={6}
                placeholder="849201"
                value={adminOtp}
                onChange={(e) => setAdminOtp(e.target.value)}
                leftIcon={<KeyRound className="size-4 text-accent" />}
                className="bg-surface-subtle font-mono font-bold tracking-[0.25em] focus:bg-surface"
              />
            </div>
          )}

          <Button type="submit" size="lg" className="w-full text-xs font-semibold">
            <span>{roleTab === 'mahasiswa' ? 'Masuk' : 'Verifikasi & Masuk'}</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </form>

        {/* Demo Quick Login (selama backend belum terhubung) */}
        <div className="mt-5 rounded-xl border border-hairline bg-surface-subtle p-3.5">
          <p className="text-xs font-medium text-ink-muted">
            Simulasi cepat tanpa isi form:
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="xs"
              className="text-xs"
              onClick={() => {
                loginAsStudent();
                router.push('/rentals/request');
              }}
            >
              Akun Mahasiswa
            </Button>
            <Button
              variant="outline"
              size="xs"
              className="text-xs"
              onClick={() => {
                loginAsModerator();
                router.push('/admin/dashboard');
              }}
            >
              Akun Moderator
            </Button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-surface-muted pt-4 text-xs text-ink-muted">
          <span>Belum punya akun?</span>
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Daftar sekarang →
          </Link>
        </div>
      </Card>
    </div>
  );
}
