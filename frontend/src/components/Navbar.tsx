"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  User,
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Clock,
  CreditCard,
  ShieldCheck,
  Scale,
  RotateCcw,
  Star,
  Package,
  Wallet,
  Inbox,
  LogOut,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import Button from "@/components/ui/button";
import { useRentalSession } from "@/context/RentalSessionContext";

interface NavMenuItem {
  href: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  badgeCount?: number;
}

const TRANSACTION_MENU_ITEMS: NavMenuItem[] = [
  {
    href: "/rentals/request",
    label: "Ajukan Sewa",
    desc: "Pilih tanggal sewa & pantau pengajuanmu",
    icon: Clock,
  },
  {
    href: "/payments",
    label: "Pembayaran Rekber",
    desc: "Bayar sewa & deposit via QRIS atau Virtual Account",
    icon: CreditCard,
  },
  {
    href: "/handover",
    label: "Serah Terima COD",
    desc: "Cek kondisi fisik barang saat ketemuan di kampus",
    icon: ShieldCheck,
  },
  {
    href: "/disputes",
    label: "Deposit & Klaim",
    desc: "Pengembalian uang jaminan & mediasi kendala",
    icon: Scale,
  },
  {
    href: "/rentals/cancellation",
    label: "Pembatalan Sewa",
    desc: "Aturan refund & laporan jika lawan transaksi tidak hadir",
    icon: RotateCcw,
  },
  {
    href: "/reviews",
    label: "Ulasan Pengguna",
    desc: "Penilaian penyewa & pemilik setelah sewa selesai",
    icon: Star,
  },
];

interface NavDropdownProps {
  label: string;
  heading: string;
  items: NavMenuItem[];
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  badgeCount?: number;
  widthClass?: string;
}

function NavDropdown({
  label,
  heading,
  items,
  pathname,
  isOpen,
  onToggle,
  onClose,
  badgeCount,
  widthClass = "w-80",
}: NavDropdownProps) {
  const isActive = items.some((i) => pathname.startsWith(i.href));

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
          isActive || isOpen
            ? "bg-ink text-canvas shadow-2xs"
            : "text-ink-muted hover:text-ink"
        }`}
      >
        <span>{label}</span>
        {typeof badgeCount === "number" && badgeCount > 0 && (
          <span className="rounded-full bg-accent px-1.5 py-0.2 font-mono text-[10px] font-bold text-white">
            {badgeCount}
          </span>
        )}
        <ChevronDown
          className={`size-3.5 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 top-full mt-2 ${widthClass} rounded-2xl border border-hairline bg-surface p-2 shadow-popover`}
        >
          <div className="px-2.5 py-1.5 text-xs font-semibold text-ink-subtle">
            {heading}
          </div>
          <div className="space-y-0.5">
            {items.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-start gap-2.5 rounded-xl p-2.5 transition ${
                    active
                      ? "bg-canvas text-ink"
                      : "text-ink-muted hover:bg-surface-subtle hover:text-ink"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                      active
                        ? "border-ink bg-ink text-canvas"
                        : "border-hairline bg-canvas text-ink"
                    }`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-ink">
                        {item.label}
                      </p>
                      {typeof item.badgeCount === "number" &&
                        item.badgeCount > 0 && (
                          <span className="rounded-md bg-warning-subtle px-1.5 py-0.5 font-mono text-xs font-bold text-warning-ink">
                            {item.badgeCount} baru
                          </span>
                        )}
                    </div>
                    <p className="mt-0.5 text-xs leading-snug text-ink-subtle">
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
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout, requests } = useRentalSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"transaksi" | "owner" | null>(
    null,
  );
  const navRef = useRef<HTMLElement>(null);

  const pendingOwnerCount = requests.filter(
    (r) => r.status === "MENUNGGU_PERSETUJUAN",
  ).length;

  const ownerMenuItems: NavMenuItem[] = [
    {
      href: "/owner/requests",
      label: "Permohonan Sewa Masuk",
      desc: "Setujui atau tolak pengajuan sewa dari penyewa",
      icon: Inbox,
      badgeCount: pendingOwnerCount,
    },
    {
      href: "/owner/items",
      label: "Barang Sewaan Saya",
      desc: "Atur stok alat, harga harian, & kelengkapan",
      icon: Package,
    },
    {
      href: "/owner/wallet",
      label: "Dompet & Penarikan",
      desc: "Cek pendapatan sewa & cairkan ke rekening bank",
      icon: Wallet,
    },
  ];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
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

  const isAdminActive = pathname.startsWith("/admin");
  const isStudent = session.role === "mahasiswa";
  const isModerator = session.role === "moderator";
  const isGuest = session.role === "guest";

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <BrandLogo size="md" theme="light" showTagline />

        <nav
          ref={navRef}
          className="hidden xl:flex items-center gap-1 rounded-xl border border-hairline bg-surface-muted/80 p-1"
        >
          <Link
            href="/"
            onClick={() => setOpenDropdown(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              pathname === "/"
                ? "bg-ink text-canvas shadow-2xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Beranda
          </Link>

          <Link
            href="/catalog"
            onClick={() => setOpenDropdown(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              pathname.startsWith("/catalog")
                ? "bg-ink text-canvas shadow-2xs"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            Katalog Alat
          </Link>

          {isStudent && (
            <>
              <NavDropdown
                label="Sewaan Saya"
                heading="Menu Penyewa"
                items={TRANSACTION_MENU_ITEMS}
                pathname={pathname}
                isOpen={openDropdown === "transaksi"}
                onToggle={() =>
                  setOpenDropdown((prev) =>
                    prev === "transaksi" ? null : "transaksi",
                  )
                }
                onClose={() => setOpenDropdown(null)}
                widthClass="w-80"
              />

              <NavDropdown
                label="Panel Pemilik"
                heading="Menu Pemilik Alat"
                items={ownerMenuItems}
                pathname={pathname}
                isOpen={openDropdown === "owner"}
                onToggle={() =>
                  setOpenDropdown((prev) => (prev === "owner" ? null : "owner"))
                }
                onClose={() => setOpenDropdown(null)}
                badgeCount={pendingOwnerCount}
                widthClass="w-80"
              />
            </>
          )}

          {isModerator && (
            <>
              <Link
                href="/admin/dashboard"
                onClick={() => setOpenDropdown(null)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  pathname === "/admin/dashboard"
                    ? "bg-ink text-canvas shadow-2xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Dashboard Moderasi
              </Link>
              <Link
                href="/admin/categories"
                onClick={() => setOpenDropdown(null)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  pathname === "/admin/categories"
                    ? "bg-ink text-canvas shadow-2xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Kategori Alat
              </Link>
              <Link
                href="/disputes"
                onClick={() => setOpenDropdown(null)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  pathname === "/disputes"
                    ? "bg-ink text-canvas shadow-2xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Mediasi Sengketa
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions — Strictly separated by Auth State */}
        <div className="hidden sm:flex items-center gap-2">
          {isGuest ? (
            <>
              <Button href="/login" variant="outline" size="sm">
                Masuk
              </Button>
              <Button href="/register" variant="accent" size="sm">
                <span>Daftar</span>
                <ArrowUpRight className="size-3.5" />
              </Button>
            </>
          ) : (
            <>
              {isStudent && (
                <>
                  <Button
                    href="/notifications"
                    variant={
                      pathname.startsWith("/notifications")
                        ? "primary"
                        : "outline"
                    }
                    size="icon"
                    title="Notifikasi"
                    className="relative"
                  >
                    <Bell className="size-4" />
                    {pendingOwnerCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" />
                    )}
                  </Button>

                  <Button
                    href="/profile"
                    variant={
                      pathname.startsWith("/profile") ? "primary" : "outline"
                    }
                    size="sm"
                  >
                    <User className="size-3.5" />
                    <span className="max-w-28 truncate">
                      {session.name.split(" ")[0]}
                    </span>
                  </Button>
                </>
              )}

              {isModerator && (
                <Button
                  href="/admin/dashboard"
                  variant={isAdminActive ? "primary" : "outline"}
                  size="sm"
                >
                  <ShieldCheck className="size-3.5 text-forest" />
                  <span>{session.name}</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                title="Keluar dari sesi"
              >
                <LogOut className="size-3.5" />
                <span>Keluar</span>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-hairline bg-canvas px-4 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                pathname === "/"
                  ? "bg-ink text-canvas"
                  : "border border-hairline bg-surface text-ink"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                pathname.startsWith("/catalog")
                  ? "bg-ink text-canvas"
                  : "border border-hairline bg-surface text-ink"
              }`}
            >
              Katalog Alat
            </Link>
          </div>

          {isStudent && (
            <>
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-ink-subtle">
                  Sewaan Saya (Penyewa)
                </span>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {TRANSACTION_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-xl px-3 py-2 text-xs font-medium ${
                        pathname.startsWith(item.href)
                          ? "bg-ink text-canvas"
                          : "bg-surface/80 text-ink hover:bg-surface-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-semibold text-ink-subtle">
                  Panel Pemilik Alat
                </span>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                  {ownerMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium ${
                        pathname.startsWith(item.href)
                          ? "bg-ink text-canvas"
                          : "bg-surface/80 text-ink hover:bg-surface-muted"
                      }`}
                    >
                      <span>{item.label}</span>
                      {typeof item.badgeCount === "number" &&
                        item.badgeCount > 0 && (
                          <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-xs font-bold text-white">
                            {item.badgeCount}
                          </span>
                        )}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {isModerator && (
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-ink-subtle">
                Menu Moderator
              </span>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-surface/80 px-3 py-2 text-xs font-medium text-ink"
                >
                  Dashboard Moderasi
                </Link>
                <Link
                  href="/admin/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-surface/80 px-3 py-2 text-xs font-medium text-ink"
                >
                  Kategori Alat
                </Link>
                <Link
                  href="/disputes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-surface/80 px-3 py-2 text-xs font-medium text-ink"
                >
                  Mediasi Sengketa
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 border-t border-hairline pt-3 sm:hidden">
            {isGuest ? (
              <>
                <Button
                  href="/login"
                  variant="outline"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Masuk
                </Button>
                <Button
                  href="/register"
                  variant="accent"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daftar Akun
                </Button>
              </>
            ) : (
              <>
                {isStudent && (
                  <>
                    <Button
                      href="/notifications"
                      variant="outline"
                      size="sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Notifikasi
                    </Button>
                    <Button
                      href="/profile"
                      variant="outline"
                      size="sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profil
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Keluar
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
