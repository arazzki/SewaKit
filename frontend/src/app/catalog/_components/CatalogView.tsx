"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, getCategoryName, type CatalogItem, type CategorySlug } from "@/data/dummyItems";
import ItemCard from "./ItemCard";

type PriceRange = "semua" | "murah" | "sedang" | "tinggi";
type SortOption = "rekomendasi" | "harga-terendah" | "harga-tertinggi" | "nama";

const PRICE_RANGES: { value: PriceRange; label: string }[] = [
  { value: "semua", label: "Semua harga" },
  { value: "murah", label: "Di bawah Rp10.000 / hari" },
  { value: "sedang", label: "Rp10.000 – Rp25.000 / hari" },
  { value: "tinggi", label: "Di atas Rp25.000 / hari" },
];

function matchesPrice(price: number, range: PriceRange): boolean {
  switch (range) {
    case "murah":
      return price < 10000;
    case "sedang":
      return price >= 10000 && price <= 25000;
    case "tinggi":
      return price > 25000;
    default:
      return true;
  }
}

export default function CatalogView({ items }: { items: CatalogItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "semua">("semua");
  const [priceRange, setPriceRange] = useState<PriceRange>("semua");
  const [sort, setSort] = useState<SortOption>("rekomendasi");

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    const result = items.filter((item) => {
      const matchesKeyword =
        keyword === "" ||
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        getCategoryName(item.category).toLowerCase().includes(keyword);
      const matchesCategory = category === "semua" || item.category === category;
      return matchesKeyword && matchesCategory && matchesPrice(item.pricePerDay, priceRange);
    });

    if (sort === "harga-terendah") return [...result].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "harga-tertinggi") return [...result].sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === "nama") return [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [items, query, category, priceRange, sort]);

  const isFiltered = query !== "" || category !== "semua" || priceRange !== "semua";

  function resetFilters() {
    setQuery("");
    setCategory("semua");
    setPriceRange("semua");
  }

  return (
    <div>
      {/* Pencarian dan filter */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label htmlFor="search" className="sr-only">
          Cari barang
        </label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari barang, misalnya ESP32, kamera, atau HT"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-600">
              Kategori
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value as CategorySlug | "semua")}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="semua">Semua kategori</option>
              {CATEGORIES.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block text-xs font-medium text-slate-600">
              Harga sewa
            </label>
            <select
              id="price"
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value as PriceRange)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {PRICE_RANGES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort" className="mb-1 block text-xs font-medium text-slate-600">
              Urutkan
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="rekomendasi">Rekomendasi</option>
              <option value="harga-terendah">Harga terendah</option>
              <option value="harga-tertinggi">Harga tertinggi</option>
              <option value="nama">Nama (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jumlah hasil */}
      <div className="mt-6 mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Menampilkan <span className="font-semibold text-slate-900">{filteredItems.length}</span> dari{" "}
          {items.length} barang
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Daftar barang */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-slate-900">Barang tidak ditemukan</p>
          <p className="mt-1 text-sm text-slate-600">Coba kata kunci lain atau ubah filter yang dipilih.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  );
}
