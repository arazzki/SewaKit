"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  User,
  Menu,
  X,
  ArrowUpRight,
  Search,
  Cpu,
  CornerDownLeft,
  ChevronDown,
  Clock,
  CreditCard,
  ShieldCheck,
  Scale,
  RotateCcw,
  Star,
  Package,
  Wallet,
  Compass,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { DUMMY_ITEMS, getCategoryName } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";

const TRANSACTION_MENU_ITEMS = [
  {
    href: "/rentals/request",
    label: "Pengajuan & Hold 24 Jam",
    desc: "Booking kalender anti-bentrok & persetujuan sewa",
    icon: Clock,
  },
  {
    href: "/payments",
    label: "Pembayaran Escrow Xendit",
    desc: "Checkout QRIS & Virtual Account rekber kampus",
    icon: CreditCard,
  },
  {
    href: "/handover",
    label: "Serah Terima & OTP COD",
    desc: "Checklist inspeksi fisik 2 arah & token 6-digit",
    icon: ShieldCheck,
  },
  {
    href: "/disputes",
    label: "Manajemen Deposit & Klaim",
    desc: "Pengembalian jaminan & resolusi sengketa",
    icon: Scale,
  },
  {
    href: "/rentals/cancellation",
    label: "Pembatalan & No-Show",
    desc: "Kalkulator refund & kompensasi ketidakhadiran",
    icon: RotateCcw,
  },
  {
    href: "/reviews",
    label: "Rating & Ulasan Dua Arah",
    desc: "Evaluasi reputasi penyewa & pemilik alat",
    icon: Star,
  },
];

const OWNER_MENU_ITEMS = [
  {
    href: "/owner/items",
    label: "Inventaris Alat Saya",
    desc: "Kelola unit SKU, ketersediaan, & tarif harian",
    icon: Package,
  },
  {
    href: "/owner/wallet",
    label: "Dompet & Pencairan Dana",
    desc: "Saldo escrow pemilik & penarikan ke rekening",
    icon: Wallet,
  },
];

const QUICK_NAV_SHORTCUTS = [
  { href: "/catalog", label: "Katalog & Filter Alat", tag: "KATALOG" },
  { href: "/rentals/request", label: "Pengajuan Sewa & Hold 24J", tag: "BOOKING" },
  { href: "/payments", label: "Checkout Escrow Xendit", tag: "ESCROW" },
  { href: "/handover", label: "Serah Terima & Pengembalian COD", tag: "COD" },
  { href: "/disputes", label: "Pusat Deposit & Klaim Sengketa", tag: "DEPOSIT" },
  { href: "/owner/items", label: "Konsol Inventaris Pemilik", tag: "OWNER" },
  { href: "/owner/wallet", label: "Dompet & Payout Pemilik", tag: "WALLET" },
  { href: "/reviews", label: "Rating & Ulasan Komunitas", tag: "REVIEW" },
  { href: "/admin/dashboard", label: "Monitor Operasi Moderator", tag: "ADMIN" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"transaksi" | "owner" | null>(
    null,
  );
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setOpenDropdown(null);
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const quickResults = useMemo(() => {
    const q = cmdQuery.trim().toLowerCase();
    if (!q) return DUMMY_ITEMS.slice(0, 4);
    return DUMMY_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.codLocation.toLowerCase().includes(q) ||
        getCategoryName(item.category).toLowerCase().includes(q),
    ).slice(0, 5);
  }, [cmdQuery]);

  const quickPages = useMemo(() => {
    const q = cmdQuery.trim().toLowerCase();
    if (!q) return QUICK_NAV_SHORTCUTS.slice(0, 4);
    return QUICK_NAV_SHORTCUTS.filter(
      (p) =>
        p.label.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q),
    );
  }, [cmdQuery]);

  const isTransactionActive = TRANSACTION_MENU_ITEMS.some((i) =>
    pathname.startsWith(i.href),
  );
  const isOwnerActive = OWNER_MENU_ITEMS.some((i) =>
    pathname.startsWith(i.href),
  );
  const isAdminActive = pathname.startsWith("/admin");

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#DCD8CE] bg-[#F6F5F0]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {/* Standardized Brand Identity (Vector Emblem, No 'TEL-U P2P' Chip) */}
          <BrandLogo size="md" theme="light" showTagline />

          {/* Single-Row Clean Desktop Navigation Pill */}
          <nav
            ref={navRef}
            className="hidden xl:flex items-center gap-1 rounded-xl border border-[#DCD8CE] bg-[#EFECE6]/80 p-1"
          >
            <Link
              href="/"
              onClick={() => setOpenDropdown(null)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                pathname === "/"
                  ? "bg-[#141413] text-[#F6F5F0] shadow-2xs"
                  : "text-[#575653] hover:text-[#141413]"
              }`}
            >
              Beranda
            </Link>

            <Link
              href="/catalog"
              onClick={() => setOpenDropdown(null)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                pathname.startsWith("/catalog")
                  ? "bg-[#141413] text-[#F6F5F0] shadow-2xs"
                  : "text-[#575653] hover:text-[#141413]"
              }`}
            >
              Katalog Alat
            </Link>

            {/* Transaksi & COD Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === "transaksi" ? null : "transaksi",
                  )
                }
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                  isTransactionActive || openDropdown === "transaksi"
                    ? "bg-[#141413] text-[#F6F5F0] shadow-2xs"
                    : "text-[#575653] hover:text-[#141413]"
                }`}
              >
                <span>Transaksi &amp; COD</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-150 ${
                    openDropdown === "transaksi" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "transaksi" && (
                <div className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-[#DCD8CE] bg-white p-2 shadow-[0_14px_34px_-12px_rgba(20,20,19,0.16)]">
                  <div className="px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                    Siklus Sewa &amp; Proteksi Escrow
                  </div>
                  <div className="space-y-0.5">
                    {TRANSACTION_MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`flex items-start gap-2.5 rounded-xl p-2.5 transition ${
                            active
                              ? "bg-[#F6F5F0] text-[#141413]"
                              : "text-[#575653] hover:bg-[#FBF9F5] hover:text-[#141413]"
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                              active
                                ? "border-[#141413] bg-[#141413] text-[#F6F5F0]"
                                : "border-[#DCD8CE] bg-[#F6F5F0] text-[#141413]"
                            }`}
                          >
                            <Icon className="size-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#141413]">
                              {item.label}
                            </p>
                            <p className="mt-0.5 text-[11px] leading-snug text-[#78756F]">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Panel Pemilik Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((prev) => (prev === "owner" ? null : "owner"))
                }
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                  isOwnerActive || openDropdown === "owner"
                    ? "bg-[#141413] text-[#F6F5F0] shadow-2xs"
                    : "text-[#575653] hover:text-[#141413]"
                }`}
              >
                <span>Panel Pemilik</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-150 ${
                    openDropdown === "owner" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "owner" && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-[#DCD8CE] bg-white p-2 shadow-[0_14px_34px_-12px_rgba(20,20,19,0.16)]">
                  <div className="px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                    Konsol Penyedia Alat
                  </div>
                  <div className="space-y-0.5">
                    {OWNER_MENU_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenDropdown(null)}
                          className={`flex items-start gap-2.5 rounded-xl p-2.5 transition ${
                            active
                              ? "bg-[#F6F5F0] text-[#141413]"
                              : "text-[#575653] hover:bg-[#FBF9F5] hover:text-[#141413]"
                          }`}
                        >
                          <div
                            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                              active
                                ? "border-[#141413] bg-[#141413] text-[#F6F5F0]"
                                : "border-[#DCD8CE] bg-[#F6F5F0] text-[#141413]"
                            }`}
                          >
                            <Icon className="size-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#141413]">
                              {item.label}
                            </p>
                            <p className="mt-0.5 text-[11px] leading-snug text-[#78756F]">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/admin/dashboard"
              onClick={() => setOpenDropdown(null)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                isAdminActive
                  ? "bg-[#141413] text-[#F6F5F0] shadow-2xs"
                  : "text-[#575653] hover:text-[#141413]"
              }`}
            >
              Moderasi
            </Link>
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
              <span className="hidden whitespace-nowrap md:inline">Cari alat...</span>
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

        {/* Mobile / Tablet Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#DCD8CE] bg-[#F6F5F0] px-4 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                  pathname === "/"
                    ? "bg-[#141413] text-[#F6F5F0]"
                    : "border border-[#DCD8CE] bg-white text-[#141413]"
                }`}
              >
                Beranda
              </Link>
              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                  pathname.startsWith("/catalog")
                    ? "bg-[#141413] text-[#F6F5F0]"
                    : "border border-[#DCD8CE] bg-white text-[#141413]"
                }`}
              >
                Katalog Alat
              </Link>
            </div>

            <div>
              <span className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                Transaksi &amp; COD
              </span>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {TRANSACTION_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-3 py-2 text-xs font-medium ${
                      pathname.startsWith(item.href)
                        ? "bg-[#141413] text-[#F6F5F0]"
                        : "bg-white/80 text-[#141413] hover:bg-[#EFECE6]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                Panel Pemilik &amp; Moderasi
              </span>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                {OWNER_MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-3 py-2 text-xs font-medium ${
                      pathname.startsWith(item.href)
                        ? "bg-[#141413] text-[#F6F5F0]"
                        : "bg-white/80 text-[#141413] hover:bg-[#EFECE6]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 text-xs font-medium ${
                    isAdminActive
                      ? "bg-[#141413] text-[#F6F5F0]"
                      : "bg-white/80 text-[#141413] hover:bg-[#EFECE6]"
                  }`}
                >
                  Dashboard Moderasi
                </Link>
              </div>
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

      {/* Command Palette / Quick Equipment & Module Search Modal */}
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
                placeholder="Cari alat praktikum (ESP32, Rigol, Sony) atau halaman (COD, Escrow, Dompet)..."
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

            <div className="max-h-96 overflow-y-auto p-2 space-y-2">
              <div>
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
                      className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-[#F6F5F0]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
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
                  <div className="px-4 py-3 text-xs text-[#78756F]">
                    Tidak ditemukan instrumen dengan kata kunci &ldquo;{cmdQuery}&rdquo;.
                  </div>
                )}
              </div>

              {quickPages.length > 0 && (
                <div className="border-t border-[#EFECE6] pt-2">
                  <div className="px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                    Pintasan Modul Aplikasi
                  </div>
                  {quickPages.map((page) => (
                    <button
                      key={page.href}
                      type="button"
                      onClick={() => {
                        setCmdOpen(false);
                        setCmdQuery("");
                        router.push(page.href);
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-[#F6F5F0]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Compass className="size-3.5 text-[#C83E2B]" />
                        <span className="text-xs font-medium text-[#141413]">
                          {page.label}
                        </span>
                      </div>
                      <span className="rounded bg-[#EFECE6] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#575653]">
                        {page.tag}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#EFECE6] bg-[#FBF9F5] px-4 py-2.5 text-[11px] text-[#78756F]">
              <span>Pilih instrumen atau modul untuk berpindah halaman</span>
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
