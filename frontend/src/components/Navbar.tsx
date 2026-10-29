"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RENTER_FLOW_LINKS = [
  { href: "/catalog", label: "Katalog Alat" },
  { href: "/rentals/request", label: "Pengajuan & Jadwal" },
  { href: "/payments", label: "Pembayaran" },
  { href: "/handover", label: "Serah Terima COD" },
  { href: "/rentals/cancellation", label: "Pembatalan & No-Show" },
  { href: "/disputes", label: "Deposit & Sengketa" },
  { href: "/reviews", label: "Ulasan" },
];

const OWNER_LINKS = [
  { href: "/owner/items", label: "Kelola Barang & Paket" },
  { href: "/owner/wallet", label: "Saldo & Penarikan Dana" },
];

const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard Statistik" },
  { href: "/admin/categories", label: "Manajemen Kategori" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* Main Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-extrabold text-white shadow-xs group-hover:bg-indigo-500 transition">
              SK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  SewaKit
                </span>
                <span className="hidden sm:inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 border border-indigo-100">
                  Kampus P2P
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Sewa Alat Praktikum & Kuliah Antar-Mahasiswa
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Primary Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              isActive("/")
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/catalog"
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              isActive("/catalog")
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Katalog Alat
          </Link>
          <Link
            href="/rentals/request"
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              isActive("/rentals") || isActive("/payments") || isActive("/handover") || isActive("/disputes")
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Pesanan & Sewa
          </Link>
          <Link
            href="/owner/items"
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              isActive("/owner")
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Panel Pemilik
          </Link>
          <Link
            href="/admin/dashboard"
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              isActive("/admin")
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Admin
          </Link>
        </nav>

        {/* Right User Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifikasi */}
          <Link
            href="/notifications"
            title="Notifikasi & Pengingat"
            className={`relative flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              isActive("/notifications")
                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>🔔</span>
            <span className="hidden md:inline">Notifikasi</span>
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </Link>

          {/* Profil */}
          <Link
            href="/profile"
            className={`hidden sm:flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              isActive("/profile")
                ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>👤</span>
            <span>Profil</span>
          </Link>

          {/* Masuk / Daftar */}
          <Link
            href="/auth/login"
            className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-indigo-500 transition"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="hidden xl:inline-flex rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs sm:text-sm font-bold text-indigo-700 hover:bg-indigo-100 transition"
          >
            Daftar
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Sub-Navigation Bar (Quick Access to All Marketplace Flows) */}
      <div className="border-t border-slate-100 bg-slate-50/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-x-auto px-4 sm:px-6 py-2 text-xs no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mr-1">
              Alur Penyewa:
            </span>
            {RENTER_FLOW_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2.5 py-1 font-medium whitespace-nowrap transition ${
                  isActive(item.href)
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-1.5 shrink-0 border-l border-slate-200 pl-4">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mr-1">
              Pemilik:
            </span>
            {OWNER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-2.5 py-1 font-medium whitespace-nowrap transition ${
                  isActive(item.href)
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
          <div className="space-y-1">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              MenuPenyewa
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {RENTER_FLOW_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    isActive(item.href)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-1 border-t border-slate-100 pt-3">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Panel Pemilik & Admin
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {[...OWNER_LINKS, ...ADMIN_LINKS].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                    isActive(item.href)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-2 border-t border-slate-100 pt-3">
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-xs font-semibold text-slate-700"
            >
              Profil Saya
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-lg bg-indigo-50 py-2 text-center text-xs font-semibold text-indigo-700"
            >
              Daftar Akun
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
