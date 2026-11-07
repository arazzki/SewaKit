"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  User,
  Menu,
  X,
  ArrowUpRight,
  Search,
  Cpu,
  CornerDownLeft,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { DUMMY_ITEMS, getCategoryName } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";

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
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const quickResults = useMemo(() => {
    const q = cmdQuery.trim().toLowerCase();
    if (!q) return DUMMY_ITEMS.slice(0, 5);
    return DUMMY_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.codLocation.toLowerCase().includes(q) ||
        getCategoryName(item.category).toLowerCase().includes(q),
    ).slice(0, 6);
  }, [cmdQuery]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#DCD8CE] bg-[#F6F5F0]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Standardized Brand Identity */}
          <BrandLogo size="md" theme="light" showTagline />

          {/* Desktop Navigation Pill */}
          <nav className="hidden xl:flex items-center gap-1 rounded-xl border border-[#DCD8CE] bg-[#EFECE6]/80 p-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? "bg-[#141413] text-[#F6F5F0] shadow-2xs"
                      : "text-[#575653] hover:text-[#141413]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Functional Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="inline-flex h-9 items-center gap-2.5 rounded-xl border border-[#DCD8CE] bg-white px-3 text-xs text-[#78756F] transition hover:border-[#141413] hover:text-[#141413]"
              aria-label="Pencarian cepat katalog"
            >
              <Search className="size-3.5 text-[#575653]" />
              <span className="hidden md:inline">Cari alat...</span>
              <kbd className="rounded border border-[#DCD8CE] bg-[#F6F5F0] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#575653]">
                ⌘K
              </kbd>
            </button>

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
              className={`flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-medium transition ${
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
              className="flex h-9 items-center rounded-xl border border-[#DCD8CE] bg-white px-3.5 text-xs font-medium text-[#141413] transition hover:border-[#141413]"
            >
              Masuk
            </Link>

            <Link
              href="/register"
              className="inline-flex h-9 items-center gap-1 rounded-xl bg-[#C83E2B] px-3.5 text-xs font-medium text-white transition hover:bg-[#AE3221]"
            >
              <span>Daftar</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCD8CE] bg-white text-[#141413]"
              aria-label="Cari Alat"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCD8CE] bg-white text-[#141413]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          {/* Tablet Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hidden sm:flex xl:hidden h-9 w-9 items-center justify-center rounded-xl border border-[#DCD8CE] bg-white text-[#141413]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Sub-bar Alur Transaksi */}
        <div className="border-t border-[#E6E3DA] bg-[#EFECE6]/60">
          <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto px-4 py-1.5 sm:px-6 text-[11px] whitespace-nowrap">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
              Protokol Sistem:
            </span>
            {SUB_FLOW_LINKS.map((step) => {
              const active = pathname === step.href;
              return (
                <Link
                  key={step.href}
                  href={step.href}
                  className={`rounded-md px-2 py-0.5 font-mono transition ${
                    active
                      ? "bg-[#141413] font-semibold text-[#F6F5F0]"
                      : "text-[#575653] hover:bg-[#E2DFD7]/70 hover:text-[#141413]"
                  }`}
                >
                  {step.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#DCD8CE] bg-[#F6F5F0] px-4 py-4 space-y-3">
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
            <div className="flex flex-wrap gap-2 border-t border-[#DCD8CE] pt-3 sm:hidden">
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

      {/* Command Palette / Quick Equipment Search Modal */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-[#141413]/45 px-4 pt-20 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setCmdOpen(false);
          }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white shadow-xl">
            <div className="flex items-center gap-3 border-b border-[#EFECE6] px-4 py-3">
              <Search className="size-4 text-[#78756F]" />
              <input
                type="text"
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Cari oscilloscope, ESP32, Sony A6400, atau titik COD TULT..."
                className="flex-1 bg-transparent text-sm text-[#141413] placeholder:text-[#8E8B83] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setCmdOpen(false)}
                className="rounded border border-[#DCD8CE] bg-[#F6F5F0] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#575653] hover:text-[#141413]"
              >
                ESC
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              <div className="px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                Inventaris Peralatan Kampus
              </div>
              {quickResults.length > 0 ? (
                quickResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCmdOpen(false);
                      setCmdQuery("");
                      router.push(`/catalog/${item.id}`);
                    }}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#F6F5F0]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#DCD8CE] bg-[#FBF9F5] text-[#141413]">
                        <Cpu className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-[#141413]">
                          {item.name}
                        </p>
                        <p className="truncate font-mono text-[11px] text-[#78756F]">
                          {getCategoryName(item.category)} • {item.codLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#141413]">
                        {formatRupiah(item.pricePerDay)}/hr
                      </span>
                      <CornerDownLeft className="size-3.5 text-[#78756F]" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-xs text-[#78756F]">
                  Tidak ditemukan instrumen dengan kata kunci &ldquo;{cmdQuery}&rdquo;.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#EFECE6] bg-[#FBF9F5] px-4 py-2.5 text-[11px] text-[#78756F]">
              <span>Tekan klik pada item untuk membuka lembar spesifikasi</span>
              <Link
                href="/catalog"
                onClick={() => setCmdOpen(false)}
                className="font-mono font-semibold text-[#C83E2B] hover:underline"
              >
                Lihat Semua Katalog →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
