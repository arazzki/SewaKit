"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
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
  Search,
  Cpu,
  Camera,
  FlaskConical,
  Radio,
  HelpCircle,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import Button from "@/components/ui/button";
import { useRentalSession } from "@/context/RentalSessionContext";
import { DUMMY_ITEMS, type CategorySlug } from "@/data/dummyItems";

interface NavMenuItem {
  href: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  badgeCount?: number;
}

interface CatalogNavCategory {
  slug: CategorySlug;
  name: string;
  desc: string;
  icon: LucideIcon;
}

const CATALOG_MEGA_CATEGORIES: CatalogNavCategory[] = [
  {
    slug: "iot-elektronika",
    name: "IoT & Elektronika",
    desc: "Oscilloscope, ESP32, Arduino, & sensor lab",
    icon: Cpu,
  },
  {
    slug: "komputer-multimedia",
    name: "Kamera & Multimedia",
    desc: "Mirrorless Sony, tripod video, & pen tablet",
    icon: Camera,
  },
  {
    slug: "akademik",
    name: "Praktikum & Akademik",
    desc: "Kalkulator saintifik, jas lab, & kacamata APD",
    icon: FlaskConical,
  },
  {
    slug: "acara-kegiatan",
    name: "Acara & Kepanitiaan",
    desc: "HT sepasang, proyektor HD, & alat himpunan",
    icon: Radio,
  },
];

const TRANSACTION_MENU_ITEMS: NavMenuItem[] = [
  {
    href: "/rentals/request",
    label: "Ajukan Sewa",
    desc: "Pilih tanggal sewa & pantau status pengajuanmu",
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
    desc: "Aturan refund & laporan jika lawan transaksi absen",
    icon: RotateCcw,
  },
];

type DropdownKey = "katalog" | "transaksi" | "owner" | "akun" | null;

const PILL_SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 38,
};

function HeaderSearchInput({
  defaultQuery,
  onNavigate,
  mobile = false,
}: {
  defaultQuery: string;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const router = useRouter();
  const [text, setText] = useState(defaultQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    router.push(
      trimmed ? `/catalog?q=${encodeURIComponent(trimmed)}` : "/catalog",
    );
    onNavigate?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={mobile ? "relative w-full" : "relative w-40 lg:w-44 xl:w-56"}
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-subtle" />
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Cari alat, SKU..."
        aria-label="Cari alat di katalog"
        className="h-9 w-full rounded-xl border border-hairline bg-surface pl-8 pr-7 text-xs text-ink placeholder:text-ink-subtle transition focus:border-ink focus:outline-none"
      />
      {text.length > 0 && (
        <button
          type="button"
          onClick={() => setText("")}
          aria-label="Bersihkan pencarian"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded p-0.5 text-ink-subtle hover:text-ink"
        >
          <X className="size-3" />
        </button>
      )}
    </form>
  );
}

function HeaderSearchWithParams({
  onNavigate,
  mobile = false,
}: {
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = pathname.startsWith("/catalog")
    ? (searchParams.get("q") ?? "")
    : "";

  return (
    <HeaderSearchInput
      key={`${pathname === "/catalog" ? "cat" : "other"}:${urlQuery}`}
      defaultQuery={urlQuery}
      onNavigate={onNavigate}
      mobile={mobile}
    />
  );
}

function HeaderSearch({
  onNavigate,
  mobile = false,
}: {
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <HeaderSearchInput
          defaultQuery=""
          onNavigate={onNavigate}
          mobile={mobile}
        />
      }
    >
      <HeaderSearchWithParams onNavigate={onNavigate} mobile={mobile} />
    </Suspense>
  );
}

function NavPillSurface({
  isActive,
  isHovered,
}: {
  isActive: boolean;
  isHovered: boolean;
}) {
  return (
    <>
      {isActive && (
        <motion.span
          layoutId="navbar-active-pill"
          transition={PILL_SPRING}
          className="pointer-events-none absolute inset-0 rounded-lg bg-ink shadow-2xs"
        />
      )}
      {!isActive && isHovered && (
        <motion.span
          layoutId="navbar-hover-pill"
          transition={PILL_SPRING}
          className="pointer-events-none absolute inset-0 rounded-lg border border-hairline/80 bg-surface shadow-2xs"
        />
      )}
    </>
  );
}

interface NavDropdownProps {
  navKey: string;
  label: string;
  heading: string;
  items: NavMenuItem[];
  pathname: string;
  isOpen: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
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
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onToggle,
  onClose,
  badgeCount,
  widthClass = "w-80",
}: NavDropdownProps) {
  const isActive = items.some((i) => pathname.startsWith(i.href));

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
          isActive
            ? "text-canvas"
            : isOpen || isHovered
              ? "text-ink"
              : "text-ink-muted hover:text-ink"
        }`}
      >
        <NavPillSurface isActive={isActive} isHovered={isHovered || isOpen} />
        <span className="relative z-10">{label}</span>
        {typeof badgeCount === "number" && badgeCount > 0 && (
          <span className="relative z-10 rounded-full bg-accent px-1.5 py-0.2 font-mono text-xs font-bold text-white">
            {badgeCount}
          </span>
        )}
        <ChevronDown
          className={`relative z-10 size-3.5 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 top-full z-50 pt-2 ${widthClass}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="rounded-2xl border border-hairline bg-surface p-2 shadow-popover">
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
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [homeSection, setHomeSection] = useState<"beranda" | "cara-kerja">(
    "beranda",
  );
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pendingOwnerCount = requests.filter(
    (r) => r.status === "MENUNGGU_PERSETUJUAN",
  ).length;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATALOG_MEGA_CATEGORIES) {
      counts[cat.slug] = DUMMY_ITEMS.filter(
        (item) => item.category === cat.slug,
      ).length;
    }
    return counts;
  }, []);

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

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleCloseNavDropdown = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown((prev) => (prev === "akun" ? prev : null));
    }, 140);
  };

  const closeAllMenus = () => {
    clearCloseTimer();
    setOpenDropdown(null);
    setHoveredNav(null);
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const syncHomeSection = () => {
      const el = document.getElementById("cara-kerja");
      if (!el) {
        setHomeSection("beranda");
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom > 180) {
        setHomeSection("cara-kerja");
      } else if (window.scrollY < 240 || rect.top > 260) {
        setHomeSection("beranda");
      }
    };

    const handleForceTop = () => setHomeSection("beranda");

    syncHomeSection();
    window.addEventListener("scroll", syncHomeSection, { passive: true });
    window.addEventListener("hashchange", syncHomeSection);
    window.addEventListener("sewakit:scrolltop", handleForceTop);

    return () => {
      window.removeEventListener("scroll", syncHomeSection);
      window.removeEventListener("hashchange", syncHomeSection);
      window.removeEventListener("sewakit:scrolltop", handleForceTop);
    };
  }, [pathname]);

  const isStudent = session.role === "mahasiswa";
  const isModerator = session.role === "moderator";
  const isGuest = session.role === "guest";

  const isBerandaActive =
    pathname === "/" && (isGuest ? homeSection === "beranda" : true);
  const isCaraKerjaActive = pathname === "/" && homeSection === "cara-kerja";
  const isCatalogActive = pathname.startsWith("/catalog");
  const isBantuanActive = pathname.startsWith("/bantuan");
  const isUserMenuActive =
    pathname.startsWith("/profile") || pathname.startsWith("/reviews");

  const handleBerandaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeAllMenus();
    setMobileMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }
      setHomeSection("beranda");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCaraKerjaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeAllMenus();
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const target = document.getElementById("cara-kerja");
      if (target) {
        e.preventDefault();
        window.history.replaceState(null, "", "/#cara-kerja");
        setHomeSection("cara-kerja");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
    setMobileMenuOpen(false);
    router.push("/");
  };

  const sewakanHref = isStudent
    ? "/owner/items"
    : "/login?redirect=/owner/items";

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <BrandLogo
          size="md"
          theme="light"
          showTagline
          taglineClassName="hidden 2xl:block"
          onClick={() => {
            closeAllMenus();
            setMobileMenuOpen(false);
          }}
        />

        {/* Center Desktop Navigation */}
        <nav
          aria-label="Navigasi Utama"
          onMouseLeave={() => {
            setHoveredNav(null);
            scheduleCloseNavDropdown();
          }}
          className="hidden lg:flex items-center gap-0.5 rounded-xl border border-hairline bg-surface-muted/80 p-1"
        >
          {/* 1. Beranda */}
          <Link
            href="/"
            onClick={handleBerandaClick}
            onMouseEnter={() => {
              clearCloseTimer();
              setHoveredNav("beranda");
              setOpenDropdown((prev) => (prev === "akun" ? prev : null));
            }}
            className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isBerandaActive
                ? "text-canvas"
                : hoveredNav === "beranda"
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
            }`}
          >
            <NavPillSurface
              isActive={isBerandaActive}
              isHovered={hoveredNav === "beranda"}
            />
            <span className="relative z-10">Beranda</span>
          </Link>

          {/* 2. Katalog Mega-Menu (Guest & Mahasiswa) */}
          {!isModerator && (
            <div
              className="relative"
              onMouseEnter={() => {
                clearCloseTimer();
                setHoveredNav("katalog");
                setOpenDropdown("katalog");
              }}
              onMouseLeave={scheduleCloseNavDropdown}
            >
              <Link
                href="/catalog"
                onClick={closeAllMenus}
                aria-expanded={openDropdown === "katalog"}
                className={`relative inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isCatalogActive
                    ? "text-canvas"
                    : hoveredNav === "katalog" || openDropdown === "katalog"
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                }`}
              >
                <NavPillSurface
                  isActive={isCatalogActive}
                  isHovered={
                    hoveredNav === "katalog" || openDropdown === "katalog"
                  }
                />
                <span className="relative z-10">Katalog</span>
                <ChevronDown
                  className={`relative z-10 size-3.5 transition-transform duration-150 ${
                    openDropdown === "katalog" ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {openDropdown === "katalog" && (
                <div
                  className="absolute left-0 top-full z-50 w-[30rem] pt-2"
                  onMouseEnter={() => {
                    clearCloseTimer();
                    setHoveredNav("katalog");
                    setOpenDropdown("katalog");
                  }}
                  onMouseLeave={scheduleCloseNavDropdown}
                >
                  <div className="rounded-2xl border border-hairline bg-surface p-3 shadow-popover">
                    <div className="mb-2 flex items-center justify-between px-1.5">
                      <span className="text-xs font-semibold text-ink-subtle">
                        Kategori Peralatan Kampus
                      </span>
                      <span className="text-xs text-ink-subtle">
                        <span className="font-mono font-semibold text-ink">
                          {DUMMY_ITEMS.length}
                        </span>{" "}
                        unit terdaftar
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {CATALOG_MEGA_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const count = categoryCounts[cat.slug] ?? 0;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/catalog?category=${cat.slug}`}
                            onClick={closeAllMenus}
                            className="group flex items-start gap-2.5 rounded-xl border border-transparent p-2.5 transition hover:border-hairline hover:bg-surface-subtle"
                          >
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink transition group-hover:border-ink group-hover:bg-ink group-hover:text-canvas">
                              <Icon className="size-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="truncate text-xs font-semibold text-ink group-hover:text-accent">
                                  {cat.name}
                                </span>
                                <span className="shrink-0 rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-ink-muted">
                                  {count}
                                </span>
                              </div>
                              <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-subtle">
                                {cat.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-surface-muted px-1.5 pt-2.5">
                      <span className="text-xs text-ink-muted">
                        Semua pemilik terverifikasi NIM Tel-U
                      </span>
                      <Link
                        href="/catalog"
                        onClick={closeAllMenus}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>Lihat semua katalog</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Guest Links: Cara Kerja & Sewakan Alat */}
          {isGuest && (
            <>
              <Link
                href="/#cara-kerja"
                onClick={handleCaraKerjaClick}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setHoveredNav("cara-kerja");
                  setOpenDropdown((prev) => (prev === "akun" ? prev : null));
                }}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isCaraKerjaActive
                    ? "text-canvas"
                    : hoveredNav === "cara-kerja"
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                }`}
              >
                <NavPillSurface
                  isActive={isCaraKerjaActive}
                  isHovered={hoveredNav === "cara-kerja"}
                />
                <span className="relative z-10">Cara Kerja</span>
              </Link>

              <Link
                href={sewakanHref}
                onClick={closeAllMenus}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setHoveredNav("sewakan");
                  setOpenDropdown((prev) => (prev === "akun" ? prev : null));
                }}
                className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  hoveredNav === "sewakan"
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <NavPillSurface
                  isActive={false}
                  isHovered={hoveredNav === "sewakan"}
                />
                <span className="relative z-10">Sewakan Alat</span>
              </Link>
            </>
          )}

          {/* Student Dropdowns: Sewaan Saya & Panel Pemilik */}
          {isStudent && (
            <>
              <NavDropdown
                navKey="transaksi"
                label="Sewaan Saya"
                heading="Alur Transaksi Penyewa"
                items={TRANSACTION_MENU_ITEMS}
                pathname={pathname}
                isOpen={openDropdown === "transaksi"}
                isHovered={hoveredNav === "transaksi"}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setHoveredNav("transaksi");
                  setOpenDropdown("transaksi");
                }}
                onMouseLeave={scheduleCloseNavDropdown}
                onToggle={() =>
                  setOpenDropdown((prev) =>
                    prev === "transaksi" ? null : "transaksi",
                  )
                }
                onClose={closeAllMenus}
                widthClass="w-80"
              />

              <NavDropdown
                navKey="owner"
                label="Panel Pemilik"
                heading="Menu Pemilik Alat"
                items={ownerMenuItems}
                pathname={pathname}
                isOpen={openDropdown === "owner"}
                isHovered={hoveredNav === "owner"}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setHoveredNav("owner");
                  setOpenDropdown("owner");
                }}
                onMouseLeave={scheduleCloseNavDropdown}
                onToggle={() =>
                  setOpenDropdown((prev) => (prev === "owner" ? null : "owner"))
                }
                onClose={closeAllMenus}
                badgeCount={pendingOwnerCount}
                widthClass="w-80"
              />
            </>
          )}

          {/* Bantuan (Guest & Mahasiswa) */}
          {!isModerator && (
            <Link
              href="/bantuan"
              onClick={closeAllMenus}
              onMouseEnter={() => {
                clearCloseTimer();
                setHoveredNav("bantuan");
                setOpenDropdown((prev) => (prev === "akun" ? prev : null));
              }}
              className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                isBantuanActive
                  ? "text-canvas"
                  : hoveredNav === "bantuan"
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
              }`}
            >
              <NavPillSurface
                isActive={isBantuanActive}
                isHovered={hoveredNav === "bantuan"}
              />
              <span className="relative z-10">Bantuan</span>
            </Link>
          )}

          {/* Moderator Links */}
          {isModerator && (
            <>
              {[
                {
                  key: "mod-dashboard",
                  href: "/admin/dashboard",
                  label: "Dashboard",
                },
                {
                  key: "mod-categories",
                  href: "/admin/categories",
                  label: "Kategori Alat",
                },
                {
                  key: "mod-disputes",
                  href: "/disputes",
                  label: "Mediasi Sengketa",
                },
                {
                  key: "mod-catalog",
                  href: "/catalog",
                  label: "Katalog",
                },
              ].map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={closeAllMenus}
                    onMouseEnter={() => setHoveredNav(item.key)}
                    className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "text-canvas"
                        : hoveredNav === item.key
                          ? "text-ink"
                          : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <NavPillSurface
                      isActive={active}
                      isHovered={hoveredNav === item.key}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* Right Group: Header Search + Role Auth Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <HeaderSearch onNavigate={closeAllMenus} />
          </div>

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
                )}

                {/* Account Menu Dropdown (Student & Moderator) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "akun" ? null : "akun",
                      )
                    }
                    aria-expanded={openDropdown === "akun"}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border px-3 text-xs font-semibold transition ${
                      isUserMenuActive || openDropdown === "akun"
                        ? "border-ink bg-ink text-canvas"
                        : "border-hairline bg-surface text-ink hover:border-ink"
                    }`}
                  >
                    {isModerator ? (
                      <ShieldCheck className="size-3.5 text-accent" />
                    ) : (
                      <User className="size-3.5" />
                    )}
                    <span className="max-w-24 truncate">
                      {session.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-150 ${
                        openDropdown === "akun" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === "akun" && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-hairline bg-surface p-2 shadow-popover">
                      <div className="border-b border-surface-muted px-3 py-2.5">
                        <p className="truncate text-xs font-bold text-ink">
                          {session.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-ink-subtle">
                          {session.nim
                            ? `NIM ${session.nim}`
                            : (session.email ?? "Moderator Kampus")}
                        </p>
                      </div>

                      <div className="mt-1 space-y-0.5">
                        {isStudent ? (
                          <>
                            <Link
                              href="/profile"
                              onClick={closeAllMenus}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink transition hover:bg-surface-subtle"
                            >
                              <User className="size-3.5 text-ink-muted" />
                              <span>Profil &amp; Identitas NIM</span>
                            </Link>
                            <Link
                              href="/reviews"
                              onClick={closeAllMenus}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink transition hover:bg-surface-subtle"
                            >
                              <Star className="size-3.5 text-accent" />
                              <span>Ulasan Pengguna</span>
                            </Link>
                            <Link
                              href="/bantuan"
                              onClick={closeAllMenus}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink transition hover:bg-surface-subtle"
                            >
                              <HelpCircle className="size-3.5 text-ink-muted" />
                              <span>Pusat Bantuan</span>
                            </Link>
                          </>
                        ) : (
                          <Link
                            href="/admin/dashboard"
                            onClick={closeAllMenus}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink transition hover:bg-surface-subtle"
                          >
                            <ShieldCheck className="size-3.5 text-forest" />
                            <span>Dashboard Moderasi</span>
                          </Link>
                        )}
                      </div>

                      <div className="mt-1 border-t border-surface-muted pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-danger transition hover:bg-danger-subtle"
                        >
                          <LogOut className="size-3.5" />
                          <span>Keluar dari Sesi</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-hairline bg-canvas px-4 py-4 space-y-4">
          <div className="md:hidden">
            <HeaderSearch
              mobile
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <Link
              href="/"
              onClick={handleBerandaClick}
              className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                isBerandaActive
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
                isCatalogActive
                  ? "bg-ink text-canvas"
                  : "border border-hairline bg-surface text-ink"
              }`}
            >
              Semua Katalog ({DUMMY_ITEMS.length})
            </Link>
          </div>

          {!isModerator && (
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-ink-subtle">
                Kategori Alat
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {CATALOG_MEGA_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/catalog?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-hairline bg-surface px-3 py-2 text-xs font-medium text-ink"
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="ml-1.5 font-mono text-xs text-ink-subtle">
                      {categoryCounts[cat.slug] ?? 0}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {isGuest && (
            <div className="grid grid-cols-3 gap-1.5">
              <Link
                href="/#cara-kerja"
                onClick={handleCaraKerjaClick}
                className="rounded-xl border border-hairline bg-surface px-3 py-2 text-center text-xs font-medium text-ink"
              >
                Cara Kerja
              </Link>
              <Link
                href={sewakanHref}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-hairline bg-surface px-3 py-2 text-center text-xs font-medium text-ink"
              >
                Sewakan Alat
              </Link>
              <Link
                href="/bantuan"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-xl px-3 py-2 text-center text-xs font-medium ${
                  isBantuanActive
                    ? "bg-ink text-canvas"
                    : "border border-hairline bg-surface text-ink"
                }`}
              >
                Bantuan
              </Link>
            </div>
          )}

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

              <div className="grid grid-cols-2 gap-1.5">
                <Link
                  href="/reviews"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-hairline bg-surface px-3 py-2 text-xs font-medium text-ink"
                >
                  Ulasan Pengguna
                </Link>
                <Link
                  href="/bantuan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-hairline bg-surface px-3 py-2 text-xs font-medium text-ink"
                >
                  Pusat Bantuan
                </Link>
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
