/**
 * DATA DUMMY SEMENTARA untuk Fitur 5 (Katalog dan Pencarian).
 *
 * File ini akan diganti dengan data dari API Laravel (GET /api/catalog/items)
 * setelah tabel items, units, dan categories (Fitur 1-4) selesai dibuat.
 * Nama field sebaiknya disesuaikan dengan struktur tabel yang disepakati tim.
 */

export type CategorySlug = "iot-elektronika" | "komputer-multimedia" | "akademik" | "acara-kegiatan";

export type Category = {
  slug: CategorySlug;
  name: string;
};

export type ItemSpec = {
  label: string;
  value: string;
};

export type CatalogItem = {
  id: string;
  name: string;
  category: CategorySlug;
  pricePerDay: number;
  deposit: number;
  ownerName: string;
  codLocation: string;
  condition: "Baru" | "Sangat baik" | "Baik";
  unitsAvailable: number;
  rating: number | null;
  description: string;
  specs: ItemSpec[];
};

export const CATEGORIES: Category[] = [
  { slug: "iot-elektronika", name: "IoT dan Elektronika" },
  { slug: "komputer-multimedia", name: "Komputer dan Multimedia" },
  { slug: "akademik", name: "Perlengkapan Akademik" },
  { slug: "acara-kegiatan", name: "Acara dan Kegiatan" },
];

export const DUMMY_ITEMS: CatalogItem[] = [
  {
    id: "esp32-devkit",
    name: "ESP32 DevKit V1",
    category: "iot-elektronika",
    pricePerDay: 5000,
    deposit: 50000,
    ownerName: "Sinta Maharani",
    codLocation: "Gedung Selaru (TULT)",
    condition: "Sangat baik",
    unitsAvailable: 2,
    rating: 4.8,
    description:
      "Mikrokontroler dengan WiFi dan Bluetooth bawaan. Cocok untuk tugas besar IoT, sistem tertanam, dan prototipe sensor.",
    specs: [
      { label: "Tegangan kerja", value: "3,3 V" },
      { label: "Konektivitas", value: "WiFi 2,4 GHz, Bluetooth 4.2" },
      { label: "Jumlah pin GPIO", value: "30" },
      { label: "Kelengkapan", value: "Kabel micro-USB" },
    ],
  },
  {
    id: "arduino-uno-kit",
    name: "Arduino Uno Starter Kit",
    category: "iot-elektronika",
    pricePerDay: 10000,
    deposit: 100000,
    ownerName: "Budi Santoso",
    codLocation: "Gedung Manterawu",
    condition: "Baik",
    unitsAvailable: 1,
    rating: 4.6,
    description:
      "Paket Arduino Uno lengkap dengan breadboard, kabel jumper, LED, resistor, dan beberapa sensor dasar untuk praktikum.",
    specs: [
      { label: "Board", value: "Arduino Uno R3" },
      { label: "Isi paket", value: "Breadboard, 40 kabel jumper, 10 LED, sensor DHT11, sensor ultrasonik" },
      { label: "Tegangan kerja", value: "5 V" },
    ],
  },
  {
    id: "raspberry-pi-4",
    name: "Raspberry Pi 4 Model B (4 GB)",
    category: "iot-elektronika",
    pricePerDay: 20000,
    deposit: 300000,
    ownerName: "Dimas Pratama",
    codLocation: "Gedung Selaru (TULT)",
    condition: "Sangat baik",
    unitsAvailable: 1,
    rating: 4.9,
    description:
      "Komputer papan tunggal untuk proyek server mini, edge computing, atau pengolahan citra sederhana.",
    specs: [
      { label: "RAM", value: "4 GB" },
      { label: "Penyimpanan", value: "microSD 32 GB (sudah terpasang Raspberry Pi OS)" },
      { label: "Kelengkapan", value: "Adaptor 5 V 3 A, casing, kabel micro-HDMI" },
    ],
  },
  {
    id: "multimeter-digital",
    name: "Multimeter Digital",
    category: "iot-elektronika",
    pricePerDay: 7000,
    deposit: 75000,
    ownerName: "Budi Santoso",
    codLocation: "Gedung Manterawu",
    condition: "Baik",
    unitsAvailable: 3,
    rating: 4.5,
    description: "Alat ukur tegangan, arus, dan hambatan untuk praktikum elektronika dasar.",
    specs: [
      { label: "Pengukuran", value: "Tegangan AC/DC, arus DC, hambatan, kontinuitas" },
      { label: "Baterai", value: "9 V (sudah terpasang)" },
    ],
  },
  {
    id: "kamera-mirrorless",
    name: "Kamera Mirrorless + Lensa Kit",
    category: "komputer-multimedia",
    pricePerDay: 75000,
    deposit: 1500000,
    ownerName: "Nadia Putri",
    codLocation: "Student Center",
    condition: "Sangat baik",
    unitsAvailable: 1,
    rating: 4.9,
    description:
      "Kamera untuk dokumentasi acara, produksi video tugas, atau sesi foto. Sudah termasuk lensa kit dan dua baterai.",
    specs: [
      { label: "Sensor", value: "APS-C 24 MP" },
      { label: "Video", value: "4K 30 fps" },
      { label: "Kelengkapan", value: "Lensa 15-45 mm, 2 baterai, charger, memori 64 GB" },
    ],
  },
  {
    id: "tripod-aluminium",
    name: "Tripod Aluminium 160 cm",
    category: "komputer-multimedia",
    pricePerDay: 10000,
    deposit: 100000,
    ownerName: "Nadia Putri",
    codLocation: "Student Center",
    condition: "Baik",
    unitsAvailable: 2,
    rating: 4.4,
    description: "Tripod ringan untuk kamera dan HP, dilengkapi holder smartphone.",
    specs: [
      { label: "Tinggi maksimal", value: "160 cm" },
      { label: "Beban maksimal", value: "3 kg" },
    ],
  },
  {
    id: "drawing-tablet",
    name: "Drawing Tablet",
    category: "komputer-multimedia",
    pricePerDay: 15000,
    deposit: 200000,
    ownerName: "Rizky Ananda",
    codLocation: "Gedung Selaru (TULT)",
    condition: "Sangat baik",
    unitsAvailable: 1,
    rating: null,
    description: "Pen tablet untuk tugas desain UI/UX, ilustrasi, dan editing foto.",
    specs: [
      { label: "Area aktif", value: "10 x 6 inci" },
      { label: "Koneksi", value: "USB" },
    ],
  },
  {
    id: "kalkulator-scientific",
    name: "Kalkulator Scientific",
    category: "akademik",
    pricePerDay: 3000,
    deposit: 50000,
    ownerName: "Sinta Maharani",
    codLocation: "Gedung Selaru (TULT)",
    condition: "Baik",
    unitsAvailable: 2,
    rating: 4.7,
    description: "Kalkulator scientific yang umum diizinkan saat ujian kalkulus dan statistika.",
    specs: [{ label: "Jumlah fungsi", value: "417 fungsi" }],
  },
  {
    id: "jas-almamater",
    name: "Jas Almamater (Ukuran M)",
    category: "akademik",
    pricePerDay: 5000,
    deposit: 75000,
    ownerName: "Rizky Ananda",
    codLocation: "Student Center",
    condition: "Baik",
    unitsAvailable: 1,
    rating: 4.3,
    description: "Jas almamater untuk acara resmi kampus, presentasi lomba, atau sidang.",
    specs: [{ label: "Ukuran", value: "M" }],
  },
  {
    id: "ht-handy-talky",
    name: "HT (Handy Talky) Sepasang",
    category: "acara-kegiatan",
    pricePerDay: 25000,
    deposit: 250000,
    ownerName: "Dimas Pratama",
    codLocation: "Student Center",
    condition: "Sangat baik",
    unitsAvailable: 2,
    rating: 4.6,
    description: "Sepasang HT untuk koordinasi panitia saat acara, lengkap dengan charger.",
    specs: [
      { label: "Jangkauan", value: "Hingga 3 km (area terbuka)" },
      { label: "Kelengkapan", value: "2 unit HT, 2 charger" },
    ],
  },
  {
    id: "proyektor-mini",
    name: "Proyektor Mini",
    category: "acara-kegiatan",
    pricePerDay: 40000,
    deposit: 500000,
    ownerName: "Budi Santoso",
    codLocation: "Gedung Manterawu",
    condition: "Baik",
    unitsAvailable: 1,
    rating: 4.2,
    description: "Proyektor portabel untuk presentasi kelompok, rapat organisasi, atau nonton bareng.",
    specs: [
      { label: "Kecerahan", value: "3.000 lumen" },
      { label: "Input", value: "HDMI, USB" },
      { label: "Kelengkapan", value: "Kabel HDMI 1,5 m, remote" },
    ],
  },
];

export function getCategoryName(slug: CategorySlug): string {
  return CATEGORIES.find((category) => category.slug === slug)?.name ?? slug;
}

export function getItemById(id: string): CatalogItem | undefined {
  return DUMMY_ITEMS.find((item) => item.id === id);
}
