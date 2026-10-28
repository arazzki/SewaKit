/**
 * DATA DUMMY SEMENTARA untuk Fitur 6 (Serah Terima dan Pengembalian).
 *
 * Melanjutkan alur Fitur 7 (Pengajuan dan Persetujuan Sewa): serah terima
 * dimulai saat status sewa sudah "SIAP_COD" (disetujui dan sudah dibayar).
 * Nanti diganti dengan data dari API Laravel setelah tabel rentals tersedia.
 */

export type HandoverStatus =
  | "SIAP_COD"
  | "DISEWA"
  | "MENUNGGU_KONFIRMASI_PENGEMBALIAN"
  | "SELESAI"
  | "SENGKETA";

export type ItemCondition = "BAIK" | "RUSAK" | "HILANG";

export type ChecklistEntry = {
  componentId: string;
  condition: ItemCondition;
  note: string;
};

export type ChecklistRecord = {
  filledBy: "PENYEWA" | "PEMILIK";
  entries: ChecklistEntry[];
  photoNames: string[];
  generalNote: string;
};

export type RentalComponent = {
  id: string;
  name: string;
};

export type HandoverRental = {
  id: string;
  itemName: string;
  renterName: string;
  renterNim: string;
  ownerName: string;
  ownerNim: string;
  startDate: string;
  endDate: string;
  codLocation: string;
  codTime: string;
  depositAmount: number;
  handoverCode: string;
  components: RentalComponent[];
  status: HandoverStatus;
  pickupChecklist?: ChecklistRecord;
  returnChecklist?: ChecklistRecord;
  /** Jumlah hari terlambat, dicatat saat Pemilik mengisi checklist pengembalian. */
  returnLateDays?: number;
  disputeReason?: string;
};

/**
 * Tanggal "hari ini" untuk simulasi. Sengaja ditulis tetap (bukan new Date())
 * supaya hasil render server dan browser sama, dan keterlambatan bisa dicoba.
 */
export const DEMO_TODAY = "2026-11-08";

export const DUMMY_HANDOVERS: HandoverRental[] = [
  {
    id: "REQ-2026-085",
    itemName: "Paket Praktikum IoT Lengkap (ESP32 + Sensor Suhu, Ultrasonik, Relay, Breadboard)",
    renterName: "Muhammad Fiqri Habibi",
    renterNim: "103032400056",
    ownerName: "Rayvan Alifarlo",
    ownerNim: "103032400087",
    startDate: "2026-11-08",
    endDate: "2026-11-10",
    codLocation: "Perpustakaan Open Library (Gedung Manterawu Lt. 5)",
    codTime: "10:00 WIB",
    depositAmount: 75000,
    handoverCode: "482915",
    components: [
      { id: "esp32", name: "ESP32 DevKit V1" },
      { id: "dht22", name: "Sensor suhu DHT22" },
      { id: "hcsr04", name: "Sensor ultrasonik HC-SR04" },
      { id: "relay", name: "Modul relay 1 channel" },
      { id: "breadboard", name: "Breadboard 830 titik" },
      { id: "jumper", name: "Kabel jumper (20 buah)" },
    ],
    status: "SIAP_COD",
  },
  {
    id: "REQ-2026-079",
    itemName: "Kamera Mirrorless Sony Alpha A6400 + Lensa 16-50mm + Tripod",
    renterName: "Muhammad Ariq Azzaki",
    renterNim: "103032400138",
    ownerName: "Azriel Raihan",
    ownerNim: "103032400010",
    startDate: "2026-11-04",
    endDate: "2026-11-06",
    codLocation: "Selasar Gedung Kuliah Umum (GKU / Tokong Nanas)",
    codTime: "15:30 WIB",
    depositAmount: 250000,
    handoverCode: "731604",
    components: [
      { id: "body", name: "Body kamera Sony A6400" },
      { id: "lens", name: "Lensa 16-50mm" },
      { id: "battery", name: "Baterai (2 buah) dan charger" },
      { id: "sdcard", name: "Kartu memori 64 GB" },
      { id: "tripod", name: "Tripod" },
    ],
    status: "DISEWA",
    pickupChecklist: {
      filledBy: "PENYEWA",
      entries: [
        { componentId: "body", condition: "BAIK", note: "" },
        { componentId: "lens", condition: "BAIK", note: "" },
        { componentId: "battery", condition: "BAIK", note: "" },
        { componentId: "sdcard", condition: "BAIK", note: "" },
        { componentId: "tripod", condition: "RUSAK", note: "Kunci kaki tripod kiri agak longgar sejak awal" },
      ],
      photoNames: ["kamera-depan.jpg", "tripod.jpg"],
      generalNote: "",
    },
  },
  {
    id: "REQ-2026-071",
    itemName: "Oscilloscope Digital Rigol DS1054Z (4 Channel 50MHz)",
    renterName: "Muhamad Alwan Suryadi",
    renterNim: "103032400104",
    ownerName: "Triansyah Danishwara",
    ownerNim: "103032400062",
    startDate: "2026-11-02",
    endDate: "2026-11-04",
    codLocation: "Lobi Gedung TULT (Telkom University Landmark Tower)",
    codTime: "13:00 WIB",
    depositAmount: 150000,
    handoverCode: "905218",
    components: [
      { id: "unit", name: "Unit oscilloscope" },
      { id: "probe", name: "Probe (4 buah)" },
      { id: "power", name: "Kabel power" },
      { id: "usb", name: "Kabel USB" },
    ],
    status: "MENUNGGU_KONFIRMASI_PENGEMBALIAN",
    pickupChecklist: {
      filledBy: "PENYEWA",
      entries: [
        { componentId: "unit", condition: "BAIK", note: "" },
        { componentId: "probe", condition: "BAIK", note: "" },
        { componentId: "power", condition: "BAIK", note: "" },
        { componentId: "usb", condition: "BAIK", note: "" },
      ],
      photoNames: ["osiloskop.jpg", "probe.jpg"],
      generalNote: "",
    },
    returnChecklist: {
      filledBy: "PEMILIK",
      entries: [
        { componentId: "unit", condition: "BAIK", note: "" },
        { componentId: "probe", condition: "HILANG", note: "Hanya kembali 3 dari 4 probe" },
        { componentId: "power", condition: "BAIK", note: "" },
        { componentId: "usb", condition: "BAIK", note: "" },
      ],
      photoNames: ["pengembalian-probe.jpg"],
      generalNote: "Dikembalikan tepat waktu.",
    },
    returnLateDays: 0,
  },
  {
    id: "REQ-2026-064",
    itemName: "Proyektor Mini 3.000 Lumen",
    renterName: "Triansyah Danishwara",
    renterNim: "103032400062",
    ownerName: "Rayvan Alifarlo",
    ownerNim: "103032400087",
    startDate: "2026-10-28",
    endDate: "2026-10-29",
    codLocation: "Student Center / Taman Danau Galau",
    codTime: "16:00 WIB",
    depositAmount: 200000,
    handoverCode: "316470",
    components: [
      { id: "projector", name: "Unit proyektor" },
      { id: "hdmi", name: "Kabel HDMI 1,5 m" },
      { id: "remote", name: "Remote" },
    ],
    status: "SELESAI",
    pickupChecklist: {
      filledBy: "PENYEWA",
      entries: [
        { componentId: "projector", condition: "BAIK", note: "" },
        { componentId: "hdmi", condition: "BAIK", note: "" },
        { componentId: "remote", condition: "BAIK", note: "" },
      ],
      photoNames: ["proyektor.jpg"],
      generalNote: "",
    },
    returnChecklist: {
      filledBy: "PEMILIK",
      entries: [
        { componentId: "projector", condition: "BAIK", note: "" },
        { componentId: "hdmi", condition: "BAIK", note: "" },
        { componentId: "remote", condition: "BAIK", note: "" },
      ],
      photoNames: ["proyektor-kembali.jpg"],
      generalNote: "",
    },
    returnLateDays: 0,
  },
];

/** Selisih hari antara dua tanggal format "YYYY-MM-DD" (b - a). */
export function daysBetween(a: string, b: string): number {
  const toUtc = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}

/** Jumlah hari keterlambatan berdasarkan DEMO_TODAY (0 jika belum lewat jatuh tempo). */
export function getLateDays(endDate: string): number {
  return Math.max(0, daysBetween(endDate, DEMO_TODAY));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/** "2026-11-08" -> "8 Nov 2026" (tanpa Intl supaya server dan browser sama). */
export function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}
