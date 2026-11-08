'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import Input from '@/components/ui/input';

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
    <div className="flex min-h-[82vh] items-center justify-center bg-canvas px-4 py-12">
      <Card variant="elevated" className="w-full max-w-lg p-7 sm:p-8">
        <div className="mb-6 flex items-center justify-between border-b border-surface-muted pb-5">
          <BrandLogo size="lg" theme="light" showTagline />
        </div>

        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight text-ink">
            Daftar Akun SewaKit
          </h1>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Gunakan NIM dan email kampus Telkom University untuk mulai menyewa atau menyewakan alat.
          </p>
        </div>

        {registered && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-forest/25 bg-forest-subtle p-3.5 text-xs font-medium text-forest">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <span>
              Pendaftaran berhasil untuk <strong>{formData.name}</strong> (NIM:{' '}
              <span className="font-mono">{formData.nim}</span>).
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Nama Lengkap
              </label>
              <Input
                type="text"
                name="name"
                required
                placeholder="Azriel Raihan"
                value={formData.name}
                onChange={handleChange}
                className="bg-surface-subtle focus:bg-surface"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                NIM
              </label>
              <Input
                type="text"
                name="nim"
                required
                placeholder="103032400010"
                value={formData.nim}
                onChange={handleChange}
                className="bg-surface-subtle font-mono focus:bg-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Email Kampus
              </label>
              <Input
                type="email"
                name="email"
                required
                placeholder="nama@student.telkomuniversity.ac.id"
                value={formData.email}
                onChange={handleChange}
                className="bg-surface-subtle focus:bg-surface"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Nomor WhatsApp (untuk COD)
              </label>
              <Input
                type="tel"
                name="phone"
                required
                placeholder="081234567890"
                value={formData.phone}
                onChange={handleChange}
                className="bg-surface-subtle font-mono focus:bg-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Kata Sandi
              </label>
              <Input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-surface-subtle focus:bg-surface"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">
                Ulangi Kata Sandi
              </label>
              <Input
                type="password"
                name="password_confirmation"
                required
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="bg-surface-subtle focus:bg-surface"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full text-xs font-semibold">
            <span>Daftar Akun</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-surface-muted pt-4 text-xs text-ink-muted">
          <span>Sudah punya akun?</span>
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Masuk di sini →
          </Link>
        </div>
      </Card>
    </div>
  );
}
