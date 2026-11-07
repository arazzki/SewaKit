"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Package,
  Activity,
  Wallet,
  ArrowUpRight,
  MapPin,
  Scale,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Badge, { type BadgeVariant } from "@/components/ui/badge";
import DataTable, { type DataTableColumn } from "@/components/ui/data-table";
import { formatRupiah } from "@/lib/format";

interface AuditTransaction {
  id: string;
  renter: string;
  nim: string;
  item: string;
  codPoint: string;
  escrowValue: number;
  date: string;
  status: "Selesai" | "Masa Sewa" | "Hold 24J" | "Sengketa";
}

const AUDIT_TRANSACTIONS: AuditTransaction[] = [
  {
    id: "TRX-2026-904",
    renter: "Muhamad Alwan Suryadi",
    nim: "103032400104",
    item: "Rigol DS1054Z Digital Oscilloscope",
    codPoint: "Lobi Gedung TULT",
    escrowValue: 240000,
    date: "08 Nov 2026 • 10:15",
    status: "Hold 24J",
  },
  {
    id: "TRX-2026-903",
    renter: "Muhammad Ariq Azzaki",
    nim: "103032400138",
    item: "Kamera Mirrorless Sony Alpha A6400",
    codPoint: "Selasar GKU",
    escrowValue: 420000,
    date: "07 Nov 2026 • 15:30",
    status: "Masa Sewa",
  },
  {
    id: "TRX-2026-902",
    renter: "Muhammad Fiqri Habibi",
    nim: "103032400056",
    item: "Paket Praktikum ESP32 + Sensor Kit",
    codPoint: "Open Library Lt. 5",
    escrowValue: 135000,
    date: "06 Nov 2026 • 10:00",
    status: "Masa Sewa",
  },
  {
    id: "TRX-2026-901",
    renter: "Fathurrahman Alfarizi",
    nim: "103032400019",
    item: "Arduino Uno R3 Starter Kit",
    codPoint: "Gedung Manterawu",
    escrowValue: 120000,
    date: "05 Nov 2026 • 13:45",
    status: "Selesai",
  },
  {
    id: "TRX-2026-899",
    renter: "Rayvan Alifarlo",
    nim: "103032400087",
    item: "HT Dual-Band Baofeng UV-5R (Sepasang)",
    codPoint: "Student Center",
    escrowValue: 300000,
    date: "03 Nov 2026 • 16:10",
    status: "Selesai",
  },
];

const COD_ZONE_METRICS = [
  { zone: "Lobi Gedung TULT", share: 42, count: "19 Serah Terima" },
  { zone: "Selasar GKU", share: 26, count: "12 Serah Terima" },
  { zone: "Open Library Lt. 5", share: 19, count: "9 Serah Terima" },
  { zone: "Student Center", share: 13, count: "5 Serah Terima" },
];

const STATUS_BADGE_MAP: Record<AuditTransaction["status"], BadgeVariant> = {
  Selesai: "available",
  "Masa Sewa": "dark",
  "Hold 24J": "hold",
  Sengketa: "danger",
};

export default function AdminDashboardPage() {
  const [statusFilter, setStatusFilter] = useState<
    "Semua" | AuditTransaction["status"]
  >("Semua");

  const stats = [
    {
      name: "Civitas NIM Terverifikasi",
      value: "124",
      delta: "+12 minggu ini",
      code: "OPS-USR",
      icon: Users,
    },
    {
      name: "Instrumen Terdaftar",
      value: "45 SKU",
      delta: "93% tingkat siap COD",
      code: "OPS-INV",
      icon: Package,
    },
    {
      name: "Siklus Sewa Aktif",
      value: "18",
      delta: "0 keterlambatan kritis",
      code: "OPS-TRX",
      icon: Activity,
    },
    {
      name: "Dana Ditahan di Escrow",
      value: "Rp 4.250.000",
      delta: "100% terproteksi Xendit",
      code: "OPS-ESC",
      icon: Wallet,
    },
  ];

  const filteredTransactions =
    statusFilter === "Semua"
      ? AUDIT_TRANSACTIONS
      : AUDIT_TRANSACTIONS.filter((t) => t.status === statusFilter);

  const columns: DataTableColumn<AuditTransaction>[] = [
    {
      key: "id",
      header: "ID Audit",
      render: (trx) => (
        <span className="font-mono font-bold text-[#141413]">{trx.id}</span>
      ),
    },
    {
      key: "renter",
      header: "Mahasiswa Penyewa",
      render: (trx) => (
        <div>
          <p className="font-semibold text-[#141413]">{trx.renter}</p>
          <span className="font-mono text-[10px] text-[#78756F]">
            NIM {trx.nim}
          </span>
        </div>
      ),
    },
    {
      key: "item",
      header: "Instrumen Praktikum",
      render: (trx) => <span className="text-[#141413]">{trx.item}</span>,
    },
    {
      key: "cod",
      header: "Titik COD",
      render: (trx) => (
        <span className="inline-flex items-center gap-1 text-[#575653]">
          <MapPin className="size-3 text-[#C83E2B]" />
          {trx.codPoint}
        </span>
      ),
    },
    {
      key: "escrow",
      header: "Nilai Escrow",
      align: "right",
      render: (trx) => (
        <span className="font-mono font-semibold text-[#141413]">
          {formatRupiah(trx.escrowValue)}
        </span>
      ),
    },
    {
      key: "date",
      header: "Timestamp",
      render: (trx) => (
        <span className="font-mono text-[11px] text-[#575653]">{trx.date}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (trx) => (
        <Badge variant={STATUS_BADGE_MAP[trx.status]} dot>
          {trx.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      <PageHeader
        eyebrow="PLATFORM OPERATIONS MONITOR"
        title="Pusat Moderasi & Audit Ekosistem SewaKit"
        description="Pemantauan real-time volume rekening bersama (escrow), kepadatan titik COD kampus, dan audit transaksi civitas."
        actions={
          <>
            <Link
              href="/disputes"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCD8CE] bg-white px-3.5 py-2.5 text-xs font-medium text-[#141413] transition hover:border-[#141413]"
            >
              <Scale className="size-3.5 text-[#C83E2B]" />
              <span>Mediasi Sengketa</span>
            </Link>
            <Link
              href="/admin/categories"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#141413] px-4 py-2.5 text-xs font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
            >
              <span>Master Kategori Alat</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </>
        }
      />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
        {/* High-Density KPI Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.code}
                className="flex flex-col justify-between rounded-2xl border border-[#DCD8CE] bg-white p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#78756F]">
                    {stat.code}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EFECE6] bg-[#F6F5F0] text-[#141413]">
                    <IconComponent className="size-4" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-[#141413]">
                    {stat.value}
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-2 text-xs">
                    <span className="text-[#575653]">{stat.name}</span>
                    <span className="font-mono text-[10px] text-[#1B4332]">
                      {stat.delta}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campus COD Distribution Strip */}
        <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#C83E2B]">
                DISTRIBUSI TITIK PERTEMUAN KAMPUS
              </span>
              <h2 className="text-sm font-bold text-[#141413] sm:text-base">
                Kepadatan Aktivitas Serah Terima COD per Gedung
              </h2>
            </div>
            <Badge variant="available" dot>
              CCTV Aktif Terpantau
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COD_ZONE_METRICS.map((z) => (
              <div
                key={z.zone}
                className="rounded-xl border border-[#EFECE6] bg-[#FBF9F5] p-3.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#141413]">{z.zone}</span>
                  <span className="font-mono font-bold text-[#C83E2B]">
                    {z.share}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EFECE6]">
                  <div
                    style={{ width: `${z.share}%` }}
                    className="h-full rounded-full bg-[#141413]"
                  />
                </div>
                <span className="mt-1.5 block font-mono text-[10px] text-[#78756F]">
                  {z.count} minggu ini
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Trail DataTable */}
        <DataTable
          columns={columns}
          data={filteredTransactions}
          rowKey={(trx) => trx.id}
          toolbar={
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#78756F]">
                  REAL-TIME AUDIT LOG
                </span>
                <h2 className="text-base font-bold text-[#141413]">
                  Jejak Aktivitas Transaksi &amp; Escrow Kampus
                </h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  ["Semua", "Hold 24J", "Masa Sewa", "Selesai"] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStatusFilter(tab)}
                    className={`rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold transition ${
                      statusFilter === tab
                        ? "bg-[#141413] text-[#F6F5F0]"
                        : "border border-[#DCD8CE] bg-[#FBF9F5] text-[#575653] hover:border-[#141413] hover:text-[#141413]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          }
          footer={`Menampilkan ${filteredTransactions.length} log transaksi terverifikasi sistem.`}
        />
      </main>
    </div>
  );
}
