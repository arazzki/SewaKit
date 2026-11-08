"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import {
  Plus,
  X,
  Wallet,
  Package,
  Layers,
  CheckCircle2,
  Pencil,
  Trash2,
  Camera,
  Power,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import SearchInput from "@/components/ui/search-input";
import DataTable, { type DataTableColumn } from "@/components/ui/data-table";
import ItemThumbnail from "@/app/catalog/_components/ItemThumbnail";
import { formatRupiah } from "@/lib/format";

type Barang = {
  id: number;
  sku: string;
  nama: string;
  kategori: string;
  spesifikasi: string;
  foto: string;
  harga: number;
  deposit: number;
  stok: number;
  aktif: boolean;
};

const DAFTAR_KATEGORI = [
  "Perangkat IoT & Elektronika",
  "Perangkat Komputer & Multimedia",
  "Perlengkapan Akademik",
  "Perlengkapan Acara & Kegiatan",
];

const DATA_AWAL: Barang[] = [
  {
    id: 1,
    sku: "LAB-OSC-1054",
    nama: "Rigol DS1054Z Digital Oscilloscope (50 MHz)",
    kategori: "Perangkat IoT & Elektronika",
    spesifikasi: "4 Channel analog, 1 GSa/s, termasuk 4 probe PVP2150 & hardcase.",
    foto: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
    harga: 45000,
    deposit: 150000,
    stok: 1,
    aktif: true,
  },
  {
    id: 2,
    sku: "MMD-SNY-6400",
    nama: "Kamera Mirrorless Sony Alpha A6400 + Lensa Kit",
    kategori: "Perangkat Komputer & Multimedia",
    spesifikasi: "APS-C 24MP, 4K UHD, 2 baterai NP-FW50, SDXC 64GB.",
    foto: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    harga: 75000,
    deposit: 500000,
    stok: 2,
    aktif: true,
  },
  {
    id: 3,
    sku: "IOT-ESP-032",
    nama: "Paket Praktikum ESP32 DevKit V1 + Sensor Kit",
    kategori: "Perangkat IoT & Elektronika",
    spesifikasi: "Dual-core WiFi/BLE, sensor DHT22, HC-SR04, breadboard 830 titik.",
    foto: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    harga: 15000,
    deposit: 75000,
    stok: 4,
    aktif: true,
  },
  {
    id: 4,
    sku: "EVT-PRJ-300",
    nama: "Proyektor Portabel Full HD 3.000 Lumen",
    kategori: "Perlengkapan Acara & Kegiatan",
    spesifikasi: "HDMI & USB input, remote control, tas jinjing.",
    foto: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    harga: 40000,
    deposit: 300000,
    stok: 0,
    aktif: false,
  },
];

export default function KelolaBarangPage() {
  const [barang, setBarang] = useState<Barang[]>(DATA_AWAL);
  const [pencarian, setPencarian] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [tampilForm, setTampilForm] = useState(false);
  const [idEdit, setIdEdit] = useState<number | null>(null);

  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [spesifikasi, setSpesifikasi] = useState("");
  const [foto, setFoto] = useState("");
  const [harga, setHarga] = useState("");
  const [deposit, setDeposit] = useState("");
  const [stok, setStok] = useState("");

  const inputFotoRef = useRef<HTMLInputElement>(null);

  const daftarBarang = barang.filter((item) => {
    const q = pencarian.toLowerCase();
    const cocokNama =
      item.nama.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.spesifikasi.toLowerCase().includes(q);
    const cocokKategori =
      filterKategori === "" || item.kategori === filterKategori;
    return cocokNama && cocokKategori;
  });

  const totalStok = barang.reduce((total, item) => total + item.stok, 0);
  const unitAktif = barang.filter((i) => i.aktif && i.stok > 0).length;

  function resetForm() {
    setIdEdit(null);
    setNama("");
    setKategori("");
    setSpesifikasi("");
    setFoto("");
    setHarga("");
    setDeposit("");
    setStok("");
    setTampilForm(false);
    if (inputFotoRef.current) {
      inputFotoRef.current.value = "";
    }
  }

  function bukaFormTambah() {
    resetForm();
    setTampilForm(true);
  }

  function pilihFoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Pilih file gambar, seperti JPG, PNG, atau WebP.");
      e.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function simpanBarang(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nama.trim() || !kategori || !spesifikasi.trim()) return;

    const hargaAngka = Number(harga);
    const depositAngka = Number(deposit);
    const stokAngka = Number(stok);
    if (
      !Number.isFinite(hargaAngka) ||
      !Number.isFinite(depositAngka) ||
      !Number.isInteger(stokAngka) ||
      hargaAngka < 0 ||
      depositAngka < 0 ||
      stokAngka < 0
    ) {
      return;
    }

    const existing = barang.find((b) => b.id === idEdit);
    const barangBaru: Barang = {
      id: idEdit ?? Date.now(),
      sku:
        existing?.sku ??
        `INV-${Math.floor(100 + (Date.now() % 900))}`,
      nama: nama.trim(),
      kategori,
      spesifikasi: spesifikasi.trim(),
      foto,
      harga: hargaAngka,
      deposit: depositAngka,
      stok: stokAngka,
      aktif: stokAngka > 0,
    };

    if (idEdit !== null) {
      setBarang((daftar) =>
        daftar.map((item) => (item.id === idEdit ? barangBaru : item)),
      );
    } else {
      setBarang((daftar) => [barangBaru, ...daftar]);
    }
    resetForm();
  }

  function editBarang(item: Barang) {
    setIdEdit(item.id);
    setNama(item.nama);
    setKategori(item.kategori);
    setSpesifikasi(item.spesifikasi);
    setFoto(item.foto);
    setHarga(String(item.harga));
    setDeposit(String(item.deposit));
    setStok(String(item.stok));
    setTampilForm(true);
  }

  function toggleStatus(id: number) {
    setBarang((daftar) =>
      daftar.map((item) =>
        item.id === id ? { ...item, aktif: !item.aktif } : item,
      ),
    );
  }

  function hapusBarang(id: number) {
    if (!window.confirm("Hapus unit ini dari inventaris sewaan?")) return;
    setBarang((daftar) => daftar.filter((item) => item.id !== id));
    if (idEdit === id) resetForm();
  }

  const columns: DataTableColumn<Barang>[] = [
    {
      key: "unit",
      header: "Instrumen & SKU",
      render: (item) => (
        <div className="flex items-center gap-3.5 min-w-[260px]">
          <ItemThumbnail
            name={item.nama}
            category={item.kategori}
            imageUrl={item.foto || undefined}
            size="sm"
            className="shrink-0 border border-hairline"
          />
          <div className="min-w-0">
            <span className="font-mono text-xs font-semibold text-ink-subtle">
              {item.sku}
            </span>
            <p className="truncate text-xs font-bold text-ink">
              {item.nama}
            </p>
            <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">
              {item.spesifikasi}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "kategori",
      header: "Kategori",
      render: (item) => <Badge variant="neutral">{item.kategori}</Badge>,
    },
    {
      key: "harga",
      header: "Tarif / Hari",
      align: "right",
      render: (item) => (
        <span className="font-mono font-bold text-ink">
          {formatRupiah(item.harga)}
        </span>
      ),
    },
    {
      key: "deposit",
      header: "Deposit Escrow",
      align: "right",
      render: (item) => (
        <span className="font-mono text-ink-muted">
          {formatRupiah(item.deposit)}
        </span>
      ),
    },
    {
      key: "stok",
      header: "Unit",
      align: "center",
      render: (item) => (
        <span className="font-mono font-bold text-ink">
          {item.stok}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status Katalog",
      render: (item) => {
        const ready = item.aktif && item.stok > 0;
        return (
          <Badge variant={ready ? "available" : "rented"} dot>
            {ready ? "Tayang Aktif" : item.stok === 0 ? "Stok 0" : "Nonaktif"}
          </Badge>
        );
      },
    },
    {
      key: "aksi",
      header: "Tindakan Cepat",
      align: "right",
      render: (item) => (
        <div className="inline-flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => toggleStatus(item.id)}
            title="Ubah status tayang"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-surface text-ink-muted transition hover:border-ink hover:text-ink"
          >
            <Power className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editBarang(item)}
            title="Edit spesifikasi & tarif"
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-hairline bg-surface px-2.5 text-xs font-medium text-ink transition hover:border-ink"
          >
            <Pencil className="size-3" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => hapusBarang(item.id)}
            title="Hapus unit"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-danger-border bg-danger-subtle text-danger transition hover:bg-danger hover:text-white"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <PageHeader
        eyebrow="Panel Pemilik"
        title="Kelola Barang Sewaan Saya"
        description="Atur stok alat, tarif sewa harian, besaran deposit, dan daftar kelengkapan barang untuk COD."
        actions={
          <>
            <Link
              href="/owner/wallet"
              className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-3.5 py-2.5 text-xs font-medium text-ink transition hover:border-ink"
            >
              <Wallet className="size-3.5 text-forest" />
              <span>Dompet Pendapatan</span>
            </Link>
            <button
              type="button"
              onClick={tampilForm ? resetForm : bukaFormTambah}
              className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-xs font-medium text-canvas transition hover:bg-accent"
            >
              {tampilForm ? (
                <>
                  <X className="size-3.5" />
                  <span>Tutup Form</span>
                </>
              ) : (
                <>
                  <Plus className="size-3.5" />
                  <span>Tambah Unit Sewaan</span>
                </>
              )}
            </button>
          </>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        {/* High-Density Console Metrics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-2xl border border-hairline bg-surface p-5">
            <div>
              <span className="text-xs font-semibold text-ink-subtle">
                INV-01 • JENIS SKU
              </span>
              <p className="mt-1 font-mono text-2xl font-bold text-ink">
                {barang.length} SKU
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-muted bg-canvas text-ink">
              <Layers className="size-4.5" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-hairline bg-surface p-5">
            <div>
              <span className="text-xs font-semibold text-ink-subtle">
                INV-02 • TOTAL STOK UNIT
              </span>
              <p className="mt-1 font-mono text-2xl font-bold text-ink">
                {totalStok} Unit
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-muted bg-canvas text-ink">
              <Package className="size-4.5" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-hairline bg-surface p-5">
            <div>
              <span className="text-xs font-semibold text-ink-subtle">
                INV-03 • TAYANG DI KATALOG
              </span>
              <p className="mt-1 font-mono text-2xl font-bold text-forest">
                {unitAktif} Aktif
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-forest/20 bg-forest-subtle text-forest">
              <CheckCircle2 className="size-4.5" />
            </div>
          </div>
        </section>

        {/* Collapsible Add/Edit Form */}
        {tampilForm && (
          <form
            onSubmit={simpanBarang}
            className="rounded-2xl border border-ink bg-surface p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between border-b border-surface-muted pb-3.5">
              <div>
                <span className="block text-xs font-semibold text-accent">
                  {idEdit !== null ? "MODIFIKASI SKU" : "REGISTRASI UNIT BARU"}
                </span>
                <h2 className="text-base font-bold text-ink">
                  {idEdit !== null
                    ? "Perbarui Spesifikasi & Tarif Alat"
                    : "Daftarkan Instrumen Sewaan Baru"}
                </h2>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg p-1.5 text-ink-subtle hover:bg-canvas hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <label
                  htmlFor="nama"
                  className="mb-1.5 block text-xs font-medium text-ink-muted"
                >
                  Nama Instrumen / Paket Praktikum *
                </label>
                <input
                  id="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Logic Analyzer 8-Channel 24MHz + Klip Uji"
                  required
                  className="h-10 w-full rounded-xl border border-hairline bg-surface-subtle px-3.5 text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="kategori"
                  className="mb-1.5 block text-xs font-medium text-ink-muted"
                >
                  Klasifikasi Kategori *
                </label>
                <select
                  id="kategori"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  required
                  className="h-10 w-full rounded-xl border border-hairline bg-surface-subtle px-3 text-xs font-medium text-ink focus:border-ink focus:bg-surface focus:outline-none"
                >
                  <option value="">Pilih kategori</option>
                  {DAFTAR_KATEGORI.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="harga"
                  className="mb-1.5 block text-xs font-medium text-ink-muted"
                >
                  Tarif Sewa / Hari (Rp) *
                </label>
                <input
                  id="harga"
                  type="number"
                  min="0"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  required
                  placeholder="25000"
                  className="h-10 w-full rounded-xl border border-hairline bg-surface-subtle px-3.5 font-mono text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="deposit"
                  className="mb-1.5 block text-xs font-medium text-ink-muted"
                >
                  Jaminan Deposit Escrow (Rp) *
                </label>
                <input
                  id="deposit"
                  type="number"
                  min="0"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  required
                  placeholder="100000"
                  className="h-10 w-full rounded-xl border border-hairline bg-surface-subtle px-3.5 font-mono text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="stok"
                  className="mb-1.5 block text-xs font-medium text-ink-muted"
                >
                  Kuantitas Unit Tersedia *
                </label>
                <input
                  id="stok"
                  type="number"
                  min="0"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  required
                  placeholder="2"
                  className="h-10 w-full rounded-xl border border-hairline bg-surface-subtle px-3.5 font-mono text-sm text-ink focus:border-ink focus:bg-surface focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="spesifikasi"
                  className="mb-1.5 block text-xs font-medium text-ink-muted"
                >
                  Spesifikasi Teknis &amp; Kelengkapan *
                </label>
                <textarea
                  id="spesifikasi"
                  value={spesifikasi}
                  onChange={(e) => setSpesifikasi(e.target.value)}
                  placeholder="Rincikan voltase, sensor bawaan, jumlah kabel probe, dan kondisi fisik..."
                  rows={2}
                  required
                  className="w-full rounded-xl border border-hairline bg-surface-subtle px-3.5 py-2.5 text-xs text-ink focus:border-ink focus:bg-surface focus:outline-none"
                />
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-ink-muted">
                  Foto Produk (Maks 2 MB)
                </span>
                <label className="flex h-[68px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-hairline bg-surface-subtle px-3 text-xs font-medium text-ink-muted transition hover:border-ink hover:text-ink">
                  <Camera className="size-4 text-accent" />
                  <span>{foto ? "Ganti Foto Produk" : "Unggah Foto Alat"}</span>
                  <input
                    ref={inputFotoRef}
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={pilihFoto}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2.5 border-t border-surface-muted pt-4">
              <button
                type="submit"
                className="rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-canvas transition hover:bg-accent"
              >
                {idEdit !== null ? "Simpan Perubahan SKU" : "Terbitkan ke Katalog"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-hairline bg-surface px-4 py-2.5 text-xs font-medium text-ink-muted hover:bg-canvas"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {/* Inventory DataTable */}
        <DataTable
          columns={columns}
          data={daftarBarang}
          rowKey={(item) => item.id}
          toolbar={
            <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-8">
                <SearchInput
                  value={pencarian}
                  onChange={setPencarian}
                  placeholder="Cari kode SKU, nama instrumen, atau spesifikasi..."
                />
              </div>
              <div className="md:col-span-4">
                <select
                  value={filterKategori}
                  onChange={(e) => setFilterKategori(e.target.value)}
                  aria-label="Filter kategori barang"
                  className="h-10 w-full rounded-xl border border-hairline bg-surface px-3.5 text-xs font-medium text-ink focus:border-ink focus:outline-none"
                >
                  <option value="">Semua Kategori Inventaris</option>
                  {DAFTAR_KATEGORI.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
          footer={`Menampilkan ${daftarBarang.length} dari ${barang.length} SKU milik akun Anda.`}
        />
      </main>
    </div>
  );
}
