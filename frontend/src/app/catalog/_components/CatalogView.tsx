"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  ArrowUpDown,
  PackageSearch,
} from "lucide-react";
import {
  CATEGORIES,
  getCategoryName,
  type CatalogItem,
  type CategorySlug,
} from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import SearchInput from "@/components/ui/search-input";
import ItemCard from "./ItemCard";

type SortOption =
  | "rekomendasi"
  | "harga-terendah"
  | "harga-tertinggi"
  | "rating-tertinggi"
  | "nama";

const COD_FILTER_OPTIONS = [
  "Semua titik COD",
  "Gedung Selaru (TULT)",
  "Gedung Manterawu",
  "Student Center",
];

export default function CatalogView({ items }: { items: CatalogItem[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as CategorySlug | null;

  const validInitialCategory: CategorySlug | "semua" =
    initialCategory && CATEGORIES.some((c) => c.slug === initialCategory)
      ? initialCategory
      : "semua";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "semua">(
    validInitialCategory,
  );
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [codPoint, setCodPoint] = useState<string>("Semua titik COD");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [sort, setSort] = useState<SortOption>("rekomendasi");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { semua: items.length };
    for (const cat of CATEGORIES) {
      counts[cat.slug] = items.filter((i) => i.category === cat.slug).length;
    }
    return counts;
  }, [items]);

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    const result = items.filter((item) => {
      const matchesKeyword =
        keyword === "" ||
        item.name.toLowerCase().includes(keyword) ||
        item.sku.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.ownerName.toLowerCase().includes(keyword) ||
        getCategoryName(item.category).toLowerCase().includes(keyword);

      const matchesCategory = category === "semua" || item.category === category;
      const matchesPrice = item.pricePerDay <= maxPrice;
      const matchesCod =
        codPoint === "Semua titik COD" || item.codLocation === codPoint;
      const matchesAvail = !onlyAvailable || item.unitsAvailable > 0;

      return (
        matchesKeyword &&
        matchesCategory &&
        matchesPrice &&
        matchesCod &&
        matchesAvail
      );
    });

    if (sort === "harga-terendah") {
      return [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    }
    if (sort === "harga-tertinggi") {
      return [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    if (sort === "rating-tertinggi") {
      return [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    if (sort === "nama") {
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [items, query, category, maxPrice, codPoint, onlyAvailable, sort]);

  const isFiltered =
    query !== "" ||
    category !== "semua" ||
    maxPrice < 100000 ||
    codPoint !== "Semua titik COD" ||
    onlyAvailable;

  function resetFilters() {
    setQuery("");
    setCategory("semua");
    setMaxPrice(100000);
    setCodPoint("Semua titik COD");
    setOnlyAvailable(false);
    setSort("rekomendasi");
  }

  return (
    <div className="space-y-6">
      {/* Modern Origin-UI Filter Console */}
      <div className="rounded-2xl border border-hairline bg-surface p-4 sm:p-5">
        {/* Top Row: Search + Sort + Availability Toggle */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SearchInput
              value={query}
              onChange={setQuery}
              enableSlashFocus
              shortcut="/"
              placeholder="Cari nama instrumen, kode SKU (LAB-OSC), pemilik, atau modul..."
            />
          </div>

          <div className="lg:col-span-3">
            <div className="relative flex items-center">
              <MapPin className="pointer-events-none absolute left-3.5 size-4 text-ink-subtle" />
              <select
                aria-label="Filter Titik COD"
                value={codPoint}
                onChange={(e) => setCodPoint(e.target.value)}
                className="h-10 w-full rounded-xl border border-hairline bg-surface pl-9 pr-3 text-xs font-medium text-ink focus:border-ink focus:outline-none"
              >
                {COD_FILTER_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="relative flex items-center">
              <ArrowUpDown className="pointer-events-none absolute left-3.5 size-4 text-ink-subtle" />
              <select
                aria-label="Urutkan Katalog"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-10 w-full rounded-xl border border-hairline bg-surface pl-9 pr-3 text-xs font-medium text-ink focus:border-ink focus:outline-none"
              >
                <option value="rekomendasi">Urutan: Rekomendasi Lab</option>
                <option value="harga-terendah">Tarif: Terendah ke Tinggi</option>
                <option value="harga-tertinggi">Tarif: Tertinggi ke Rendah</option>
                <option value="rating-tertinggi">Reputasi: Rating Tertinggi</option>
                <option value="nama">Alfabetis: A – Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Middle Row: Category Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-surface-muted pt-4">
          <button
            type="button"
            onClick={() => setCategory("semua")}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              category === "semua"
                ? "border-ink bg-ink text-canvas"
                : "border-hairline bg-surface-subtle text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            <span>Semua Kategori</span>
            <span
              className={`rounded px-1.5 py-0.2 font-mono text-xs ${
                category === "semua"
                  ? "bg-surface/15 text-canvas"
                  : "bg-surface-muted text-ink-muted"
              }`}
            >
              {categoryCounts.semua}
            </span>
          </button>

          {CATEGORIES.map((option) => {
            const active = category === option.slug;
            return (
              <button
                key={option.slug}
                type="button"
                onClick={() => setCategory(option.slug)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-ink bg-ink text-canvas"
                    : "border-hairline bg-surface-subtle text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                <span>{option.name}</span>
                <span
                  className={`rounded px-1.5 py-0.2 font-mono text-xs ${
                    active
                      ? "bg-surface/15 text-canvas"
                      : "bg-surface-muted text-ink-muted"
                  }`}
                >
                  {categoryCounts[option.slug] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Row: Price Ceiling Slider + Ready COD Switch */}
        <div className="mt-4 flex flex-col justify-between gap-4 border-t border-surface-muted pt-3.5 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-wrap items-center gap-3 sm:max-w-md">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-ink-muted">
              <SlidersHorizontal className="size-3.5 text-accent" />
              Batas Tarif/Hari:
            </span>
            <input
              type="range"
              min={5000}
              max={100000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer accent-accent"
              aria-label="Rentang tarif maksimal per hari"
            />
            <span className="rounded-md border border-hairline bg-canvas px-2 py-0.5 font-mono text-xs font-bold text-ink">
              ≤ {formatRupiah(maxPrice)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-ink select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="h-4 w-4 rounded border-hairline accent-forest"
              />
              <span>Hanya unit siap COD hari ini</span>
            </label>

            {isFiltered && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent transition hover:bg-accent hover:text-white"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Meta Bar */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-ink-muted">
          Menampilkan{" "}
          <span className="font-mono font-bold text-ink">
            {filteredItems.length}
          </span>{" "}
          dari <span className="font-mono">{items.length}</span> instrumen terdaftar
        </p>
        <span className="hidden sm:inline font-mono text-xs text-ink-subtle">
          Tekan tombol [ / ] untuk fokus pencarian cepat
        </span>
      </div>

      {/* Equipment Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-hairline bg-surface p-12 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-canvas text-ink-muted">
            <PackageSearch className="size-5" />
          </div>
          <p className="text-sm font-bold text-ink">
            Tidak ditemukan instrumen yang sesuai
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Ubah kata kunci pencarian, naikkan batas harga sewa, atau pilih semua titik COD.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-medium text-canvas transition hover:bg-accent"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset Seluruh Filter</span>
          </button>
        </div>
      )}
    </div>
  );
}
