"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, User, Menu, X, ArrowUpRight, Compass, Package, Wallet, Shield } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/catalog", label: "Katalog Alat" },
  { href: "/rentals/request", label: "Pengajuan Sewa" },
  { href: "/owner/items", label: "Inventaris Pemilik" },
  { href: "/admin/dashboard", label: "Moderasi" },
];

const SUB_FLOW_LINKS = [
  { href: "/catalog", label: "01. Cari Alat" },
  { href: "/rentals/request", label: "02. Booking & Hold 24J" },
  { href: "/payments", label: "03. Escrow Xendit" },
  { href: "/handover", label: "04. Serah Terima COD" },
  { href: "/disputes", label: "05. Deposit & Klaim" },
  { href: "/rentals/cancellation", label: "06. Pembatalan" },
  { href: "/reviews", label: "07. Ulasan" },
  { href: "/owner/wallet", label: "Dompet Pemilik" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#DCD8CE] bg-[#F6F5F0]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#141413] bg-[#141413] font-mono text-xs font-bold tracking-tighter text-[#F6F5F0] transition group-hover:bg-[#C83E2B] group-hover:border-[#C83E2B]">
            SK
          </div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-[#141413]">
                SewaKit
              </span>
              <span className="rounded border border-[#DCD8CE] bg-[#EFECE6] px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#575653]">
                TEL-U P2P
              </span>
            </div>
            <span className="mt-0.5 block text-[11px] text-[#78756F]">
               Bursa Alat Praktikum & Riset Kampus
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[#DCD8CE] bg-[#EFECE6]/70 p-1">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-[#141413] text-[#F6F5F0] shadow-xs"
                    : "text-[#575653] hover:text-[#141413]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/notifications"
            title="Notifikasi Transaksi"
            className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              pathname.startsWith("/notifications")
                ? "border-[#141413] bg-[#141413] text-[#F6F5F0]"
                : "border-[#DCD8CE] bg-white text-[#141413] hover:border-[#141413]"
            }`}
          >
            <Bell className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#C83E2B]" />
          </Link>

          <Link
            href="/profile"
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition ${
              pathname.startsWith("/profile")
                ? "border-[#141413] bg-[#141413] text-[#F6F5F0]"
                : "border-[#DCD8CE] bg-white text-[#141413] hover:border-[#141413]"
            }`}
          >
            <User className="size-3.5" />
            <span>Profil</span>
          </Link>

          <Link
            href="/auth/login"
            className="rounded-xl border border-[#DCD8CE] bg-white px-3.5 py-2 text-xs font-medium text-[#141413] hover:border-[#141413] transition"
          >
            Masuk
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-1 rounded-xl bg-[#C83E2B] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#AE3221] transition"
          >
            <span>Daftar</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-[#DCD8CE] bg-white text-[#141413]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Sub-bar Alur Transaksi */}
      <div className="border-t border-[#E6E3DA] bg-[#EFECE6]/60">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto px-4 py-1.5 sm:px-6 text-[11px] whitespace-nowrap">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#78756F] mr-1">
            Alur Sistem:
          </span>
          {SUB_FLOW_LINKS.map((step) => {
            const active = pathname === step.href;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`rounded-md px-2 py-0.5 font-mono transition ${
                  active
                    ? "bg-[#141413] text-[#F6F5F0] font-semibold"
                    : "text-[#575653] hover:bg-[#E2DFD7]/60 hover:text-[#141413]"
                }`}
              >
                {step.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCD8CE] bg-[#F6F5F0] px-4 py-4 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-[#141413] text-[#F6F5F0]"
                    : "text-[#141413] hover:bg-[#EFECE6]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-[#DCD8CE] pt-3">
            <Link
              href="/notifications"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-[#DCD8CE] bg-white px-3 py-2 text-xs font-medium text-[#141413]"
            >
              Notifikasi
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-[#DCD8CE] bg-white px-3 py-2 text-xs font-medium text-[#141413]"
            >
              Profil
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border border-[#DCD8CE] bg-white px-3 py-2 text-xs font-medium text-[#141413]"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl bg-[#C83E2B] px-3 py-2 text-xs font-medium text-white"
            >
              Daftar Akun
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
