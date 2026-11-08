"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Building2,
  AlertCircle,
  X,
  Package,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge from "@/components/ui/badge";
import SearchInput from "@/components/ui/search-input";
import DataTable, { type DataTableColumn } from "@/components/ui/data-table";
import { formatRupiah } from "@/lib/format";

type StatusTransaksi = "Berhasil" | "Diproses" | "Ditolak";
type TipeTransaksi = "masuk" | "keluar";

type Transaksi = {
  id: number;
  kode: string;
  tanggal: string;
  keterangan: string;
  nominal: number;
  tipe: TipeTransaksi;
  status: StatusTransaksi;
  rekening?: string;
};

const SALDO_AWAL = 425000;

const WEEKLY_REVENUE = [
  { day: "Sen", amount: 45000 },
  { day: "Sel", amount: 90000 },
  { day: "Rab", amount: 35000 },
  { day: "Kam", amount: 120000 },
  { day: "Jum", amount: 150000 },
  { day: "Sab", amount: 75000 },
  { day: "Min", amount: 100000 },
];

const TRANSAKSI_AWAL: Transaksi[] = [
  {
    id: 1,
    kode: "STL-2026-401",
    tanggal: "07 Nov 2026",
    keterangan: "Rilis Escrow sewa Kamera Sony Alpha A6400 (2 Hari)",
    nominal: 150000,
    tipe: "masuk",
    status: "Berhasil",
  },
  {
    id: 2,
    kode: "STL-2026-398",
    tanggal: "05 Nov 2026",
    keterangan: "Rilis Escrow sewa Rigol DS1054Z Oscilloscope",
    nominal: 135000,
    tipe: "masuk",
    status: "Berhasil",
  },
  {
    id: 3,
    kode: "WD-2026-112",
    tanggal: "03 Nov 2026",
    keterangan: "Penarikan dana (Payout) ke Rekening BCA",
    nominal: 75000,
    tipe: "keluar",
    status: "Diproses",
    rekening: "BCA •••• 7890",
  },
  {
    id: 4,
    kode: "STL-2026-380",
    tanggal: "01 Nov 2026",
    keterangan: "Rilis Escrow sewa Proyektor Portabel Full HD",
    nominal: 120000,
    tipe: "masuk",
    status: "Berhasil",
  },
];

const REKENING_TUJUAN = [
  { id: "bca", nama: "BCA", nomor: "1234567890", pemilik: "Triansyah Danishwara" },
  { id: "mandiri", nama: "Mandiri", nomor: "5566778899", pemilik: "Triansyah Danishwara" },
  { id: "bni", nama: "BNI", nomor: "1122334455", pemilik: "Triansyah Danishwara" },
  { id: "jago", nama: "Bank Jago", nomor: "1099887766", pemilik: "Triansyah Danishwara" },
];

function formatNomorRekening(nomor: string) {
  return `•••• ${nomor.slice(-4)}`;
}

export default function WalletPage() {
  const [saldo, setSaldo] = useState(SALDO_AWAL);
  const [nominal, setNominal] = useState("");
  const [rekeningId, setRekeningId] = useState("bca");
  const [transaksi, setTransaksi] = useState<Transaksi[]>(TRANSAKSI_AWAL);
  const [pesan, setPesan] = useState("");
  const [jenisPesan, setJenisPesan] = useState<"sukses" | "error">("sukses");
  const [filter, setFilter] = useState("semua");
  const [kataKunci, setKataKunci] = useState("");
  const [konfirmasi, setKonfirmasi] = useState(false);

  const rekeningTerpilih = REKENING_TUJUAN.find((r) => r.id === rekeningId);

  const totalPendapatan = transaksi
    .filter((item) => item.tipe === "masuk" && item.status === "Berhasil")
    .reduce((total, item) => total + item.nominal, 0);

  const totalPenarikanBerhasil = transaksi
    .filter((item) => item.tipe === "keluar" && item.status === "Berhasil")
    .reduce((total, item) => total + item.nominal, 0);

  const totalDiproses = transaksi
    .filter((item) => item.tipe === "keluar" && item.status === "Diproses")
    .reduce((total, item) => total + item.nominal, 0);

  const transaksiTampil = transaksi.filter((item) => {
    const cocokFilter =
      filter === "semua" ||
      (filter === "masuk" && item.tipe === "masuk") ||
      (filter === "keluar" && item.tipe === "keluar");
    const q = kataKunci.toLowerCase();
    const cocokKataKunci =
      item.keterangan.toLowerCase().includes(q) ||
      item.kode.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q);
    return cocokFilter && cocokKataKunci;
  });

  function ajukanPenarikan(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPesan("");
    const jumlah = Number(nominal);

    if (!Number.isFinite(jumlah) || !Number.isInteger(jumlah) || jumlah <= 0) {
      setJenisPesan("error");
      setPesan("Masukkan angka bulat nominal penarikan yang valid.");
      return;
    }
    if (jumlah < 10000) {
      setJenisPesan("error");
      setPesan("Batas minimal penarikan dana adalah Rp10.000.");
      return;
    }
    if (jumlah > saldo) {
      setJenisPesan("error");
      setPesan("Nominal melebihi saldo Escrow tersedia Anda.");
      return;
    }
    setKonfirmasi(true);
  }

  function konfirmasiPenarikan() {
    const jumlah = Number(nominal);
    if (!rekeningTerpilih || jumlah < 10000 || jumlah > saldo) {
      setKonfirmasi(false);
      return;
    }

    const transaksiBaru: Transaksi = {
      id: Date.now(),
      kode: `WD-2026-${Math.floor(120 + (Date.now() % 800))}`,
      tanggal: "08 Nov 2026",
      keterangan: `Penarikan dana (Payout) ke ${rekeningTerpilih.nama}`,
      nominal: jumlah,
      tipe: "keluar",
      status: "Diproses",
      rekening: `${rekeningTerpilih.nama} ${formatNomorRekening(
        rekeningTerpilih.nomor,
      )}`,
    };

    setSaldo((prev) => prev - jumlah);
    setTransaksi((prev) => [transaksiBaru, ...prev]);
    setNominal("");
    setKonfirmasi(false);
    setJenisPesan("sukses");
    setPesan(
      `Instruksi pencairan ${transaksiBaru.kode} sebesar ${formatRupiah(
        jumlah,
      )} berhasil diteruskan ke antrean kliring bank.`,
    );
  }

  const maxWeekly = Math.max(...WEEKLY_REVENUE.map((d) => d.amount));

  const columns: DataTableColumn<Transaksi>[] = [
    {
      key: "kode",
      header: "ID Referensi",
      render: (item) => (
        <span className="font-mono font-semibold text-ink">
          {item.kode}
        </span>
      ),
    },
    {
      key: "tanggal",
      header: "Tanggal",
      render: (item) => (
        <span className="font-mono text-ink-muted">{item.tanggal}</span>
      ),
    },
    {
      key: "keterangan",
      header: "Rincian Mutasi",
      render: (item) => (
        <span className="font-medium text-ink">{item.keterangan}</span>
      ),
    },
    {
      key: "rekening",
      header: "Rekening Tujuan",
      render: (item) => (
        <span className="font-mono text-ink-muted">
          {item.rekening || "Escrow Internal"}
        </span>
      ),
    },
    {
      key: "nominal",
      header: "Nominal",
      align: "right",
      render: (item) => (
        <span
          className={`font-mono font-bold ${
            item.tipe === "masuk" ? "text-forest" : "text-ink"
          }`}
        >
          {item.tipe === "masuk" ? "+" : "-"}
          {formatRupiah(item.nominal)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (item) => (
        <Badge
          variant={
            item.status === "Berhasil"
              ? "available"
              : item.status === "Diproses"
                ? "hold"
                : "danger"
          }
          dot
        >
          {item.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <PageHeader
        eyebrow="Panel Pemilik"
        title="Dompet Pendapatan & Penarikan Dana"
        description="Pantau pemasukan dari transaksi sewa yang sudah selesai dan tarik saldo ke rekening bankmu."
        actions={
          <Link
            href="/owner/items"
            className="inline-flex items-center gap-1.5 rounded-xl border border-ink bg-surface px-4 py-2.5 text-xs font-medium text-ink transition hover:bg-surface-muted"
          >
            <Package className="size-3.5" />
            <span>Inventaris Barang</span>
          </Link>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        {/* 4 Metric Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-ink bg-ink p-5 text-canvas">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-inverse-subtle">
                SALDO SIAP CAIR
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/10">
                <Wallet className="size-4 text-canvas" />
              </div>
            </div>
            <p className="mt-3 font-mono text-2xl font-bold sm:text-3xl">
              {formatRupiah(saldo)}
            </p>
            <p className="mt-1.5 text-xs text-ink-inverse-subtle">
              Bebas ditarik kapan saja (Min. Rp10.000)
            </p>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-subtle">
                AKUMULASI PENDAPATAN
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-forest/20 bg-forest-subtle text-forest">
                <TrendingUp className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-mono text-2xl font-bold text-ink">
              {formatRupiah(totalPendapatan)}
            </p>
            <p className="mt-1.5 text-xs text-ink-muted">
              Settlement sewa berstatus selesai
            </p>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-subtle">
                KLIRING DIPROSES
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-warning-border bg-warning-subtle text-warning-ink">
                <Clock className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-mono text-2xl font-bold text-warning-ink">
              {formatRupiah(totalDiproses)}
            </p>
            <p className="mt-1.5 text-xs text-ink-muted">
              Estimasi masuk rekening 1×24 jam
            </p>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-subtle">
                TOTAL TELAH DITARIK
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink">
                <CheckCircle2 className="size-4" />
              </div>
            </div>
            <p className="mt-3 font-mono text-2xl font-bold text-ink">
              {formatRupiah(totalPenarikanBerhasil)}
            </p>
            <p className="mt-1.5 text-xs text-ink-muted">
              Pencairan terkonfirmasi bank
            </p>
          </div>
        </section>

        {pesan && (
          <div
            role="status"
            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-xs font-medium ${
              jenisPesan === "sukses"
                ? "border-forest/25 bg-forest-subtle text-forest"
                : "border-danger-border bg-danger-subtle text-danger"
            }`}
          >
            <span className="flex items-center gap-2">
              {jenisPesan === "sukses" ? (
                <CheckCircle2 className="size-4 shrink-0" />
              ) : (
                <AlertCircle className="size-4 shrink-0" />
              )}
              <span>{pesan}</span>
            </span>
            <button
              type="button"
              onClick={() => setPesan("")}
              aria-label="Tutup pesan"
              className="rounded p-1 hover:bg-black/5"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}

        {/* Payout Form + Weekly Revenue Chart */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Payout Form (7 Cols) */}
          <section className="rounded-2xl border border-hairline bg-surface p-6 lg:col-span-7">
            <div className="mb-5 border-b border-surface-muted pb-3.5">
              <span className="block text-xs font-semibold text-accent">
                DISBURSEMENT REQUEST
              </span>
              <h2 className="mt-0.5 text-base font-bold text-ink">
                Instruksi Penarikan Dana ke Rekening Bank
              </h2>
            </div>

            <form onSubmit={ajukanPenarikan} className="space-y-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <label htmlFor="nominal" className="font-semibold text-ink">
                    Nominal Penarikan
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setNominal(String(saldo));
                      setPesan("");
                    }}
                    className="font-mono text-xs font-semibold text-accent hover:underline"
                  >
                    Tarik Seluruh Saldo ({formatRupiah(saldo)})
                  </button>
                </div>

                <div className="flex h-11 overflow-hidden rounded-xl border border-hairline bg-surface focus-within:border-ink">
                  <span className="flex items-center border-r border-hairline bg-canvas px-3.5 font-mono text-xs font-bold text-ink-muted">
                    IDR
                  </span>
                  <input
                    id="nominal"
                    type="number"
                    min="10000"
                    max={saldo}
                    step="1"
                    inputMode="numeric"
                    placeholder="100000"
                    value={nominal}
                    onChange={(event) => {
                      setNominal(event.target.value);
                      setPesan("");
                    }}
                    className="min-w-0 flex-1 px-3.5 font-mono text-sm font-semibold text-ink outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="rekening"
                  className="mb-1.5 block text-xs font-semibold text-ink"
                >
                  Rekening Bank Terverifikasi
                </label>
                <div className="relative flex items-center">
                  <Building2 className="pointer-events-none absolute left-3.5 size-4 text-ink-subtle" />
                  <select
                    id="rekening"
                    value={rekeningId}
                    onChange={(event) => setRekeningId(event.target.value)}
                    className="h-11 w-full rounded-xl border border-hairline bg-surface pl-10 pr-4 text-xs font-semibold text-ink focus:border-ink focus:outline-none"
                  >
                    {REKENING_TUJUAN.map((rekening) => (
                      <option key={rekening.id} value={rekening.id}>
                        {rekening.nama} — {formatNomorRekening(rekening.nomor)} a.n.{" "}
                        {rekening.pemilik}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 text-xs font-semibold text-canvas transition hover:bg-accent"
              >
                <span>Ajukan Pencairan Saldo</span>
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </section>

          {/* 7-Day Weekly Revenue Sparkline Bar Chart (5 Cols) */}
          <aside className="flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-6 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-subtle">
                  RINGKASAN PENDAPATAN 7 HARI
                </span>
                <Badge variant="available">+18.4% Mingguan</Badge>
              </div>
              <h2 className="mt-1 text-base font-bold text-ink">
                Performa Sewa Instrumen
              </h2>

              <div className="mt-6 flex h-36 items-end justify-between gap-2 border-b border-surface-muted pb-3">
                {WEEKLY_REVENUE.map((item) => {
                  const pct = Math.max(12, Math.round((item.amount / maxWeekly) * 100));
                  const isPeak = item.amount === maxWeekly;
                  return (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                    >
                      <span className="font-mono text-xs text-ink-subtle">
                        {Math.round(item.amount / 1000)}k
                      </span>
                      <div
                        style={{ height: `${pct}%` }}
                        className={`w-full max-w-[28px] rounded-t-md transition-all ${
                          isPeak ? "bg-accent" : "bg-ink"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 flex justify-between font-mono text-xs text-ink-subtle">
                {WEEKLY_REVENUE.map((item) => (
                  <span key={item.day} className="flex-1 text-center">
                    {item.day}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-surface-muted bg-surface-subtle p-3 text-xs leading-relaxed text-ink-muted">
              Pendapatan masuk ke dompet pemilik secara instan begitu penyewa menyetujui checklist pengembalian barang.
            </div>
          </aside>
        </div>

        {/* Transaction History Ledger DataTable */}
        <DataTable
          columns={columns}
          data={transaksiTampil}
          rowKey={(item) => item.id}
          toolbar={
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-sm font-bold text-ink">
                  Buku Besar Mutasi Dompet Pemilik
                </h2>
                <p className="text-xs text-ink-muted">
                  Catatan rilis Escrow sewa masuk dan penarikan dana keluar
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <SearchInput
                  value={kataKunci}
                  onChange={setKataKunci}
                  placeholder="Cari kode referensi atau mutasi..."
                  className="sm:w-64"
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter tipe mutasi"
                  className="h-10 rounded-xl border border-hairline bg-surface px-3 text-xs font-medium text-ink focus:border-ink focus:outline-none"
                >
                  <option value="semua">Semua Mutasi</option>
                  <option value="masuk">Rilis Sewa Masuk</option>
                  <option value="keluar">Penarikan Keluar</option>
                </select>
              </div>
            </div>
          }
          footer={`Menampilkan ${transaksiTampil.length} dari ${transaksi.length} catatan mutasi.`}
        />
      </main>

      {/* Payout Confirmation Modal */}
      {konfirmasi && rekeningTerpilih && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setKonfirmasi(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-hairline bg-surface shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-surface-muted bg-surface-subtle px-5 py-3.5">
              <h2 className="text-sm font-bold text-ink">
                Otorisasi Pencairan Saldo Pemilik
              </h2>
              <button
                type="button"
                onClick={() => setKonfirmasi(false)}
                className="rounded-lg p-1 text-ink-subtle hover:bg-surface-muted hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4 p-5 text-xs">
              <dl className="space-y-2.5 rounded-xl border border-hairline bg-canvas p-4">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Nominal Pencairan</dt>
                  <dd className="font-mono text-base font-bold text-accent">
                    {formatRupiah(Number(nominal))}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Bank &amp; Nomor Rekening</dt>
                  <dd className="font-mono font-semibold text-ink">
                    {rekeningTerpilih.nama} • {rekeningTerpilih.nomor}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-hairline pt-2">
                  <dt className="text-ink-muted">Sisa Saldo Dompet</dt>
                  <dd className="font-mono font-semibold text-ink">
                    {formatRupiah(saldo - Number(nominal))}
                  </dd>
                </div>
              </dl>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={konfirmasiPenarikan}
                  className="flex-1 rounded-xl bg-ink py-2.5 font-semibold text-canvas transition hover:bg-forest"
                >
                  Konfirmasi &amp; Cairkan Sekarang
                </button>
                <button
                  type="button"
                  onClick={() => setKonfirmasi(false)}
                  className="rounded-xl border border-hairline bg-surface px-4 py-2.5 font-medium text-ink-muted hover:bg-canvas"
                >
                  Batal
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
