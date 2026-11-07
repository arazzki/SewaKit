/**
 * DATA KATALOG SEWAKIT (Fitur 5: Katalog dan Pencarian).
 *
 * Dilengkapi kurasi fotografi perangkat keras nyata beresolusi tinggi,
 * kode inventaris teknis (SKU), verifikasi NIM pemilik, dan jadwal kalender
 * ketersediaan untuk simulasi anti-bentrok tanggal.
 */

export type CategorySlug =
  | "iot-elektronika"
  | "komputer-multimedia"
  | "akademik"
  | "acara-kegiatan";

export type Category = {
  slug: CategorySlug;
  name: string;
};

export type ItemSpec = {
  label: string;
  value: string;
};

export type BookedSlot = {
  day: number; // Tanggal di bulan berjalan (1-30 Nov 2026)
  status: "booked" | "hold";
  note?: string;
};

export type CatalogItem = {
  id: string;
  sku: string;
  name: string;
  category: CategorySlug;
  pricePerDay: number;
  deposit: number;
  ownerName: string;
  ownerNim: string;
  ownerProdi: string;
  completedRentals: number;
  codLocation: string;
  condition: "Baru" | "Sangat baik" | "Baik";
  unitsAvailable: number;
  rating: number | null;
  imageUrl: string;
  description: string;
  specs: ItemSpec[];
  bookedSlots: BookedSlot[];
};

export const CATEGORIES: Category[] = [
  { slug: "iot-elektronika", name: "IoT dan Elektronika" },
  { slug: "komputer-multimedia", name: "Komputer dan Multimedia" },
  { slug: "akademik", name: "Perlengkapan Akademik" },
  { slug: "acara-kegiatan", name: "Acara dan Kegiatan" },
];

export const DUMMY_ITEMS: CatalogItem[] = [
  {
    id: "oscilloscope-rigol-ds1054z",
    sku: "LAB-OSC-1054",
    name: "Rigol DS1054Z Digital Oscilloscope (50 MHz, 4 Ch)",
    category: "iot-elektronika",
    pricePerDay: 45000,
    deposit: 150000,
    ownerName: "Triansyah Danishwara",
    ownerNim: "103032400062",
    ownerProdi: "S1 Teknik Elektro",
    completedRentals: 34,
    codLocation: "Gedung Selaru (TULT)",
    condition: "Sangat baik",
    unitsAvailable: 1,
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    description:
      "Oscilloscope digital 4 channel standar laboratorium untuk analisis sinyal gelombang PWM, I2C/SPI debugging, dan praktikum rangkaian elektrik.",
    specs: [
      { label: "Bandwidth Analog", value: "50 MHz (4 Channel Simultan)" },
      { label: "Real-time Sample Rate", value: "1 GSa/s • Memori 24 Mpts" },
      { label: "Layar Instrumen", value: "7.0 inch WVGA TFT LCD (800×480)" },
      { label: "Kelengkapan Paket", value: "4× Probe PVP2150, Kabel AC, Kabel USB, Tas Hardcase" },
    ],
    bookedSlots: [
      { day: 10, status: "hold", note: "Hold 24 Jam" },
      { day: 11, status: "hold", note: "Hold 24 Jam" },
      { day: 18, status: "booked", note: "Disewa" },
      { day: 19, status: "booked", note: "Disewa" },
    ],
  },
  {
    id: "esp32-devkit",
    sku: "IOT-ESP-032",
    name: "ESP32 DevKit V1 + Base Shield IoT",
    category: "iot-elektronika",
    pricePerDay: 5000,
    deposit: 50000,
    ownerName: "Sinta Maharani",
    ownerNim: "103032400041",
    ownerProdi: "S1 Teknologi Informasi",
    completedRentals: 42,
    codLocation: "Gedung Selaru (TULT)",
    condition: "Sangat baik",
    unitsAvailable: 2,
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    description:
      "Mikrokontroler dual-core Xtensa dengan WiFi dan Bluetooth BLE terintegrasi. Siap pakai untuk tugas besar IoT, MQTT telemetry, dan prototipe sensor.",
    specs: [
      { label: "Tegangan Kerja", value: "3,3 V Logic (Input USB 5 V)" },
      { label: "Konektivitas", value: "WiFi 802.11 b/g/n 2,4 GHz + Bluetooth 4.2 BLE" },
      { label: "Antarmuka Pin", value: "30 Pin GPIO (ADC, DAC, I2C, SPI, UART, PWM)" },
      { label: "Kelengkapan", value: "Board ESP32, Kabel Data Micro-USB, Kotak ESD" },
    ],
    bookedSlots: [
      { day: 14, status: "booked", note: "Disewa" },
      { day: 15, status: "booked", note: "Disewa" },
    ],
  },
  {
    id: "kamera-mirrorless",
    sku: "MMD-SNY-6400",
    name: "Kamera Mirrorless Sony Alpha A6400 + Lensa 16-50mm",
    category: "komputer-multimedia",
    pricePerDay: 75000,
    deposit: 1500000,
    ownerName: "Nadia Putri",
    ownerNim: "103012400119",
    ownerProdi: "S1 Desain Komunikasi Visual",
    completedRentals: 29,
    codLocation: "Student Center",
    condition: "Sangat baik",
    unitsAvailable: 1,
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    description:
      "Kamera mirrorless sensor APS-C dengan Real-Time Eye AF untuk dokumentasi kepanitiaan, produksi film pendek, atau video profil riset.",
    specs: [
      { label: "Sensor Gambar", value: "APS-C Exmor CMOS 24.2 MP" },
      { label: "Perekaman Video", value: "4K UHD 30fps / Full HD 120fps S-Log3" },
      { label: "Kelengkapan", value: "Lensa 16-50mm OSS, 2× Baterai NP-FW50, SDXC 64GB, Strap & Tas" },
    ],
    bookedSlots: [
      { day: 9, status: "booked", note: "Disewa" },
      { day: 14, status: "hold", note: "Hold 24 Jam" },
      { day: 15, status: "hold", note: "Hold 24 Jam" },
    ],
  },
  {
    id: "arduino-uno-kit",
    sku: "IOT-ARD-001",
    name: "Arduino Uno R3 Starter Kit Lengkap",
    category: "iot-elektronika",
    pricePerDay: 10000,
    deposit: 100000,
    ownerName: "Budi Santoso",
    ownerNim: "103032400088",
    ownerProdi: "S1 Teknik Komputer",
    completedRentals: 27,
    codLocation: "Gedung Manterawu",
    condition: "Baik",
    unitsAvailable: 1,
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=900&q=80",
    description:
      "Paket praktikum sistem tertanam lengkap dengan breadboard 830 titik, kabel jumper, LED, resistor, sensor DHT11, dan modul ultrasonik.",
    specs: [
      { label: "Mikrokontroler", value: "Arduino Uno R3 (ATmega328P)" },
      { label: "Isi Komponen", value: "Breadboard, 40× Jumper, 10× LED, Sensor DHT11, HC-SR04" },
      { label: "Tegangan Kerja", value: "5 V DC via USB Type-B" },
    ],
    bookedSlots: [{ day: 12, status: "booked", note: "Disewa" }],
  },
  {
    id: "raspberry-pi-4",
    sku: "IOT-RPI-404",
    name: "Raspberry Pi 4 Model B (4 GB RAM)",
    category: "iot-elektronika",
    pricePerDay: 20000,
    deposit: 300000,
    ownerName: "Dimas Pratama",
    ownerNim: "103012400073",
    ownerProdi: "S1 Informatika",
    completedRentals: 31,
    codLocation: "Gedung Selaru (TULT)",
    condition: "Sangat baik",
    unitsAvailable: 1,
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1629739884942-8678d138dd64?auto=format&fit=crop&w=900&q=80",
    description:
      "Single-board computer performa tinggi untuk proyek edge AI, OpenCV computer vision, server Docker lokal, atau gateway jaringan IoT.",
    specs: [
      { label: "Prosesor & RAM", value: "Broadcom BCM2711 Quad-core Cortex-A72 • 4 GB LPDDR4" },
      { label: "Penyimpanan", value: "SanDisk Extreme microSD 32 GB (Raspberry Pi OS 64-bit)" },
      { label: "Kelengkapan", value: "Adaptor Resmi USB-C 5V 3A, Heatsink Aluminium Case, Micro-HDMI" },
    ],
    bookedSlots: [
      { day: 20, status: "booked", note: "Disewa" },
      { day: 21, status: "booked", note: "Disewa" },
    ],
  },
  {
    id: "multimeter-digital",
    sku: "LAB-DMM-117",
    name: "Multimeter Digital True-RMS Auto-Range",
    category: "iot-elektronika",
    pricePerDay: 7000,
    deposit: 75000,
    ownerName: "Budi Santoso",
    ownerNim: "103032400088",
    ownerProdi: "S1 Teknik Komputer",
    completedRentals: 19,
    codLocation: "Gedung Manterawu",
    condition: "Baik",
    unitsAvailable: 3,
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=900&q=80",
    description:
      "Instrumen ukur tegangan AC/DC presisi tinggi, arus, kapasitansi, hambatan, serta uji kontinuitas buzzer cepat untuk debugging PCB.",
    specs: [
      { label: "Mode Pengukuran", value: "Tegangan AC/DC 600V, Arus 10A, Resistansi, Dioda, Kontinuitas" },
      { label: "Fitur Keamanan", value: "CAT III 600V Overload Protection + Backlight LCD" },
      { label: "Kelengkapan", value: "Sepasang Probe Uji Merah/Hitam + Baterai 9V Terpasang" },
    ],
    bookedSlots: [],
  },
  {
    id: "ht-handy-talky",
    sku: "EVT-Buv-05R",
    name: "HT Dual-Band Baofeng UV-5R (Sepasang)",
    category: "acara-kegiatan",
    pricePerDay: 25000,
    deposit: 250000,
    ownerName: "Dimas Pratama",
    ownerNim: "103012400073",
    ownerProdi: "S1 Informatika",
    completedRentals: 24,
    codLocation: "Student Center",
    condition: "Sangat baik",
    unitsAvailable: 2,
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    description:
      "Sepasang radio komunikasi dua arah VHF/UHF jernih lengkap dengan earpiece akustik untuk koordinasi lapangan panitia acara kampus.",
    specs: [
      { label: "Frekuensi & Daya", value: "VHF 136-174 MHz / UHF 400-520 MHz • 5 Watt" },
      { label: "Jangkauan Efektif", value: "Hingga 3 km area terbuka / lintas lantai gedung" },
      { label: "Kelengkapan", value: "2× Unit HT, 2× Earpiece PTT, 2× Desktop Charger Dock" },
    ],
    bookedSlots: [
      { day: 16, status: "booked", note: "Disewa" },
      { day: 17, status: "booked", note: "Disewa" },
    ],
  },
  {
    id: "tripod-aluminium",
    sku: "MMD-TRP-160",
    name: "Tripod Fluid-Head Aluminium 160 cm",
    category: "komputer-multimedia",
    pricePerDay: 10000,
    deposit: 100000,
    ownerName: "Nadia Putri",
    ownerNim: "103012400119",
    ownerProdi: "S1 Desain Komunikasi Visual",
    completedRentals: 16,
    codLocation: "Student Center",
    condition: "Baik",
    unitsAvailable: 2,
    rating: 4.4,
    imageUrl:
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=900&q=80",
    description:
      "Tripod kokoh dengan quick-release plate dan waterpass untuk perekaman presentasi kelas, wawancara riset, dan live streaming.",
    specs: [
      { label: "Tinggi Operasional", value: "55 cm – 160 cm (3-Section Flip Lock)" },
      { label: "Kapasitas Beban", value: "Maksimal 3,5 kg • Termasuk Holder Smartphone & Tas" },
    ],
    bookedSlots: [],
  },
  {
    id: "drawing-tablet",
    sku: "MMD-WAC-106",
    name: "Pen Drawing Tablet Grafis 10×6 Inci",
    category: "komputer-multimedia",
    pricePerDay: 15000,
    deposit: 200000,
    ownerName: "Rizky Ananda",
    ownerNim: "103032400095",
    ownerProdi: "S1 Rekayasa Perangkat Lunak",
    completedRentals: 8,
    codLocation: "Gedung Selaru (TULT)",
    condition: "Sangat baik",
    unitsAvailable: 1,
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=900&q=80",
    description:
      "Pen tablet sensitif tekanan 8192 level tanpa baterai untuk sketsa wireframe UI/UX, anotasi rumus pengajaran, dan ilustrasi digital.",
    specs: [
      { label: "Area Aktif & Pen", value: "10 × 6 inci • Stylus Battery-Free 8192 Pressure Levels" },
      { label: "Konektivitas", value: "USB Type-C (Kompatibel Windows, macOS, Linux)" },
    ],
    bookedSlots: [{ day: 22, status: "hold", note: "Hold 24 Jam" }],
  },
  {
    id: "proyektor-mini",
    sku: "EVT-PRJ-300",
    name: "Proyektor Portabel Full HD 3.000 Lumen",
    category: "acara-kegiatan",
    pricePerDay: 40000,
    deposit: 500000,
    ownerName: "Budi Santoso",
    ownerNim: "103032400088",
    ownerProdi: "S1 Teknik Komputer",
    completedRentals: 14,
    codLocation: "Gedung Manterawu",
    condition: "Baik",
    unitsAvailable: 1,
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    description:
      "Proyektor ringkas untuk sidang latihan kelompok, rapat himpunan mahasiswa, atau demo pameran karya praktikum.",
    specs: [
      { label: "Kecerahan & Resolusi", value: "3.000 ANSI Lumen • Native 1080p Support" },
      { label: "Port Input", value: "HDMI, USB-A, Audio Out 3.5mm" },
      { label: "Kelengkapan", value: "Kabel HDMI 1,5 m, Kabel Power, Remote Control, Tas" },
    ],
    bookedSlots: [{ day: 13, status: "booked", note: "Disewa" }],
  },
  {
    id: "kalkulator-scientific",
    sku: "AKD-CAS-991",
    name: "Kalkulator Scientific Casio ClassWiz 552 Fungsi",
    category: "akademik",
    pricePerDay: 3000,
    deposit: 50000,
    ownerName: "Sinta Maharani",
    ownerNim: "103032400041",
    ownerProdi: "S1 Teknologi Informasi",
    completedRentals: 51,
    codLocation: "Gedung Selaru (TULT)",
    condition: "Baik",
    unitsAvailable: 2,
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=80",
    description:
      "Kalkulator saintifik non-programmable standar ujian UTS/UAS Kalkulus, Aljabar Linear, Metode Numerik, dan Statistika.",
    specs: [
      { label: "Kapasitas Fungsi", value: "552 Fungsi (Matriks 4×4, Integral, Diferensial, Distribusi)" },
      { label: "Sumber Daya", value: "Two-Way Power (Solar + Baterai LR44)" },
    ],
    bookedSlots: [],
  },
  {
    id: "jas-almamater",
    sku: "AKD-LAB-012",
    name: "Jas Laboratorium Lengan Panjang + Kacamata Safety",
    category: "akademik",
    pricePerDay: 5000,
    deposit: 75000,
    ownerName: "Rizky Ananda",
    ownerNim: "103032400095",
    ownerProdi: "S1 Rekayasa Perangkat Lunak",
    completedRentals: 22,
    codLocation: "Student Center",
    condition: "Baik",
    unitsAvailable: 2,
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80",
    description:
      "Jas praktikum katun Oxford bersih sudah di-laundry steril beserta kacamata pelindung polikarbonat untuk sesi lab fisika/elektronika.",
    specs: [
      { label: "Ukuran & Bahan", value: "Ukuran L Универсал • Katun Oxford Tebal" },
      { label: "Kelengkapan", value: "Jas Lab Putih Bersih + Safety Goggles Clear ANSI Z87" },
    ],
    bookedSlots: [],
  },
];

export function getCategoryName(slug: CategorySlug): string {
  return CATEGORIES.find((category) => category.slug === slug)?.name ?? slug;
}

export function getItemById(id: string): CatalogItem | undefined {
  return DUMMY_ITEMS.find((item) => item.id === id);
}
