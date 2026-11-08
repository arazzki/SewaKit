import { DUMMY_ITEMS } from "@/data/dummyItems";

export interface BookableItem {
  id: string;
  sku: string;
  name: string;
  pricePerDay: number;
  deposit: number;
  ownerName: string;
  ownerNim: string;
  ownerPhone: string;
  ownerProdi: string;
  bookedRanges: { start: string; end: string; reason: string }[];
}

export type RentalRequestStatus =
  | "MENUNGGU_PERSETUJUAN"
  | "DISETUJUI_MENUNGGU_BAYAR"
  | "SIAP_COD"
  | "DITOLAK";

export interface RentalRequest {
  id: string;
  itemId: string;
  itemSku: string;
  itemName: string;
  renterName: string;
  renterNim: string;
  renterProdi: string;
  renterPhone: string;
  ownerName: string;
  ownerNim: string;
  ownerPhone: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  rentalCost: number;
  depositAmount: number;
  codLocation: string;
  codTime: string;
  purposeNote: string;
  status: RentalRequestStatus;
  holdExpiresIn: string;
  paymentExpiresIn?: string;
  rejectReason?: string;
  createdAt: string;
}

const OWNER_PHONES = [
  "0812-3456-7890",
  "0813-9876-5432",
  "0857-1122-3344",
  "0821-5566-7788",
];

export const BOOKABLE_ITEMS: BookableItem[] = DUMMY_ITEMS.map((item, idx) => {
  const sorted = [...item.bookedSlots].sort((a, b) => a.day - b.day);
  const ranges: { start: string; end: string; reason: string }[] = [];

  for (const slot of sorted) {
    const dateStr = `2026-11-${String(slot.day).padStart(2, "0")}`;
    const label =
      slot.note ??
      (slot.status === "hold" ? "Ditahan sementara (24 jam)" : "Sedang disewa");
    const prev = ranges[ranges.length - 1];
    const prevDay = prev ? Number(prev.end.slice(-2)) : -99;
    if (prev && slot.day === prevDay + 1 && prev.reason === label) {
      prev.end = dateStr;
    } else {
      ranges.push({ start: dateStr, end: dateStr, reason: label });
    }
  }

  return {
    id: item.id,
    sku: item.sku,
    name: item.name,
    pricePerDay: item.pricePerDay,
    deposit: item.deposit,
    ownerName: item.ownerName,
    ownerNim: item.ownerNim,
    ownerPhone: OWNER_PHONES[idx % OWNER_PHONES.length],
    ownerProdi: item.ownerProdi,
    bookedRanges: ranges,
  };
});

export const COD_LOCATIONS = [
  "Lobi Gedung TULT (Telkom University Landmark Tower)",
  "Perpustakaan Open Library (Gedung Manterawu Lt. 5)",
  "Selasar Gedung Kuliah Umum (GKU / Tokong Nanas)",
  "Student Center / Area Sekre UKM",
];

export const INITIAL_REQUESTS: RentalRequest[] = [
  {
    id: "REQ-2026-089",
    itemId: "oscilloscope-rigol-ds1054z",
    itemSku: "LAB-OSC-1054",
    itemName: "Rigol DS1054Z Digital Oscilloscope (50 MHz, 4 Ch)",
    renterName: "Muhamad Alwan Suryadi",
    renterNim: "103032400104",
    renterProdi: "S1 Teknologi Informasi",
    renterPhone: "0821-8899-7766",
    ownerName: "Triansyah Danishwara",
    ownerNim: "103032400062",
    ownerPhone: "0812-3456-7890",
    startDate: "2026-11-10",
    endDate: "2026-11-11",
    totalDays: 2,
    rentalCost: 90000,
    depositAmount: 150000,
    codLocation: "Lobi Gedung TULT (Telkom University Landmark Tower)",
    codTime: "13:00 WIB",
    purposeNote:
      "Untuk praktikum modul rangkaian listrik & pengukuran sinyal gelombang PWM.",
    status: "MENUNGGU_PERSETUJUAN",
    holdExpiresIn: "18:42:10",
    createdAt: "Hari ini, 10:15 WIB",
  },
  {
    id: "REQ-2026-088",
    itemId: "sony-a6400-kit",
    itemSku: "CAM-SNY-6400",
    itemName: "Kamera Mirrorless Sony Alpha A6400 + Kit 16-50mm",
    renterName: "Muhammad Ariq Azzaki",
    renterNim: "103032400138",
    renterProdi: "S1 Teknologi Informasi",
    renterPhone: "0812-9988-1122",
    ownerName: "Azriel Raihan",
    ownerNim: "103032400010",
    ownerPhone: "0857-1122-3344",
    startDate: "2026-11-14",
    endDate: "2026-11-15",
    totalDays: 2,
    rentalCost: 190000,
    depositAmount: 300000,
    codLocation: "Selasar Gedung Kuliah Umum (GKU / Tokong Nanas)",
    codTime: "15:30 WIB",
    purposeNote: "Dokumentasi kegiatan himpunan & video presentasi tugas akhir.",
    status: "DISETUJUI_MENUNGGU_BAYAR",
    holdExpiresIn: "Disetujui pemilik",
    paymentExpiresIn: "01:48:00",
    createdAt: "Hari ini, 11:20 WIB",
  },
  {
    id: "REQ-2026-085",
    itemId: "esp32-devkit",
    itemSku: "IOT-ESP-0032",
    itemName: "Kit Praktikum ESP32 WiFi + BLE + Paket Sensor IoT",
    renterName: "Muhammad Ariq Azzaki",
    renterNim: "103032400138",
    renterProdi: "S1 Teknologi Informasi",
    renterPhone: "0812-9988-1122",
    ownerName: "Rayvan Alifarlo",
    ownerNim: "103032400087",
    ownerPhone: "0813-9876-5432",
    startDate: "2026-11-05",
    endDate: "2026-11-07",
    totalDays: 3,
    rentalCost: 45000,
    depositAmount: 75000,
    codLocation: "Perpustakaan Open Library (Gedung Manterawu Lt. 5)",
    codTime: "10:00 WIB",
    purposeNote: "Pengujian telemetri sensor suhu dan kelembaban ke MQTT broker.",
    status: "SIAP_COD",
    holdExpiresIn: "Lunas rekber",
    createdAt: "Kemarin, 16:40 WIB",
  },
];

export function isDateOverlapping(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): boolean {
  return startA <= endB && endA >= startB;
}
