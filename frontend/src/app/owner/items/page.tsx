
"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Barang = {
  id: number;
  nama: string;
  kategori: string;
  spesifikasi: string;
  foto: string;
  harga: number;
  deposit: number;
  stok: number;
};

const daftarKategori = [
  "Perangkat IoT dan Elektronika",
  "Perangkat Komputer dan Multimedia",
  "Perlengkapan Akademik",
  "Perlengkapan Acara dan Kegiatan",
];

const dataAwal: Barang[] = [
  {
    id: 1,
    nama: "Kamera Canon EOS",
    kategori: "Perangkat Komputer dan Multimedia",
    spesifikasi: "Kamera DSLR untuk dokumentasi kegiatan dan praktikum.",
    foto: "",
    harga: 150000,
    deposit: 500000,
    stok: 3,
  },
  {
    id: 2,
    nama: "Tripod Kamera",
    kategori: "Perlengkapan Acara dan Kegiatan",
    spesifikasi: "Tripod kamera untuk membantu pengambilan gambar.",
    foto: "",
    harga: 25000,
    deposit: 50000,
    stok: 5,
  },
  {
    id: 3,
    nama: "Proyektor Epson",
    kategori: "Perangkat Komputer dan Multimedia",
    spesifikasi: "Proyektor untuk presentasi tugas dan kegiatan kampus.",
    foto: "",
    harga: 100000,
    deposit: 200000,
    stok: 2,
  },
];

export default function KelolaBarangPage() {
  const [barang, setBarang] = useState<Barang[]>(dataAwal);
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
    const cocokNama =
      item.nama.toLowerCase().includes(pencarian.toLowerCase()) ||
      item.spesifikasi.toLowerCase().includes(pencarian.toLowerCase());

    const cocokKategori =
      filterKategori === "" || item.kategori === filterKategori;

    return cocokNama && cocokKategori;
  });

  function formatRupiah(nilai: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(nilai);
  }

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

    if (!nama.trim() || !kategori || !spesifikasi.trim()) {
      alert("Nama, kategori, dan spesifikasi wajib diisi.");
      return;
    }

    if (harga.trim() === "" || deposit.trim() === "" || stok.trim() === "") {
      alert("Harga, deposit, dan stok wajib diisi.");
      return;
    }

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
      alert("Harga, deposit, dan stok harus berupa angka yang valid.");
      return;
    }

    const barangBaru: Barang = {
      id: idEdit ?? Date.now(),
      nama: nama.trim(),
      kategori,
      spesifikasi: spesifikasi.trim(),
      foto,
      harga: hargaAngka,
      deposit: depositAngka,
      stok: stokAngka,
    };

    if (idEdit !== null) {
      setBarang((daftar) =>
        daftar.map((item) => (item.id === idEdit ? barangBaru : item))
      );
    } else {
      setBarang((daftar) => [...daftar, barangBaru]);
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

  function hapusBarang(id: number) {
    if (!window.confirm("Apakah kamu yakin ingin menghapus barang ini?")) {
      return;
    }

    setBarang((daftar) => daftar.filter((item) => item.id !== id));

    if (idEdit === id) {
      resetForm();
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 text-gray-800 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Kelola Barang dan Paket
          </h1>
          <p className="mt-2 text-gray-600">
            Kelola barang yang tersedia untuk disewakan di lingkungan kampus.
          </p>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Jenis Barang</p>
            <p className="mt-2 text-2xl font-bold">{barang.length}</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Stok</p>
            <p className="mt-2 text-2xl font-bold">
              {barang.reduce((total, item) => total + item.stok, 0)}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Kategori Barang</p>
            <p className="mt-2 text-2xl font-bold">
              {new Set(barang.map((item) => item.kategori)).size}
            </p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold">Daftar Barang</h2>
              <p className="mt-1 text-sm text-gray-500">
                Tambah, ubah, cari, dan kelola barang sewaan.
              </p>
            </div>

            <button
              type="button"
              onClick={tampilForm ? resetForm : bukaFormTambah}
              className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              {tampilForm ? "Tutup Form" : "+ Tambah Barang"}
            </button>
          </div>

          {tampilForm && (
            <form
              onSubmit={simpanBarang}
              className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6"
            >
              <h3 className="mb-5 text-lg font-semibold">
                {idEdit !== null ? "Edit Barang" : "Tambah Barang Baru"}
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="nama" className="mb-1.5 block text-sm font-medium">
                    Nama Barang *
                  </label>
                  <input
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Sensor suhu DHT22"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="kategori" className="mb-1.5 block text-sm font-medium">
                    Kategori *
                  </label>
                  <select
                    id="kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
                  >
                    <option value="">Pilih kategori</option>
                    {daftarKategori.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="spesifikasi" className="mb-1.5 block text-sm font-medium">
                    Spesifikasi / Deskripsi *
                  </label>
                  <textarea
                    id="spesifikasi"
                    value={spesifikasi}
                    onChange={(e) => setSpesifikasi(e.target.value)}
                    placeholder="Jelaskan kondisi, fungsi, atau spesifikasi barang."
                    rows={3}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="foto" className="mb-1.5 block text-sm font-medium">
                    Foto Barang
                  </label>
                  <input
                    ref={inputFotoRef}
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={pilihFoto}
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Format gambar yang didukung mengikuti browser. Maksimal 2 MB.
                  </p>

                  {foto && (
                    <div className="mt-3">
                      <p className="mb-2 text-sm font-medium">Pratinjau foto</p>
                      <img
                        src={foto}
                        alt="Pratinjau barang"
                        className="h-40 w-40 rounded-lg border border-gray-200 bg-white object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFoto("");
                          if (inputFotoRef.current) {
                            inputFotoRef.current.value = "";
                          }
                        }}
                        className="mt-2 block text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Hapus foto
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="harga" className="mb-1.5 block text-sm font-medium">
                    Harga Sewa per Hari (Rp) *
                  </label>
                  <input
                    id="harga"
                    type="number"
                    min="0"
                    step="1"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    required
                    placeholder="150000"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="deposit" className="mb-1.5 block text-sm font-medium">
                    Deposit (Rp) *
                  </label>
                  <input
                    id="deposit"
                    type="number"
                    min="0"
                    step="1"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    required
                    placeholder="500000"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="stok" className="mb-1.5 block text-sm font-medium">
                    Jumlah Stok *
                  </label>
                  <input
                    id="stok"
                    type="number"
                    min="0"
                    step="1"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    required
                    placeholder="3"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                  {idEdit !== null ? "Simpan Perubahan" : "Simpan Barang"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium hover:bg-gray-100"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              value={pencarian}
              onChange={(e) => setPencarian(e.target.value)}
              placeholder="Cari nama atau spesifikasi barang..."
              aria-label="Cari barang"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              aria-label="Filter kategori barang"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">Semua kategori</option>
              {daftarKategori.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="border-b bg-gray-50 text-sm text-gray-600">
                  <th className="px-4 py-3 font-semibold">No.</th>
                  <th className="px-4 py-3 font-semibold">Foto</th>
                  <th className="px-4 py-3 font-semibold">Nama Barang</th>
                  <th className="px-4 py-3 font-semibold">Kategori</th>
                  <th className="px-4 py-3 font-semibold">Harga/Hari</th>
                  <th className="px-4 py-3 font-semibold">Deposit</th>
                  <th className="px-4 py-3 font-semibold">Stok</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {daftarBarang.map((item, index) => (
                  <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">
                      {item.foto ? (
                        <img
                          src={item.foto}
                          alt={item.nama}
                          className="h-14 w-14 rounded-lg border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          No foto
                        </div>
                      )}
                    </td>
                    <td className="max-w-[220px] px-4 py-4">
                      <p className="font-medium text-gray-900">{item.nama}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                        {item.spesifikasi}
                      </p>
                    </td>
                    <td className="max-w-[200px] px-4 py-4 text-sm">
                      {item.kategori}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {formatRupiah(item.harga)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {formatRupiah(item.deposit)}
                    </td>
                    <td className="px-4 py-4">{item.stok}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                          item.stok > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.stok > 0 ? "Tersedia" : "Stok Habis"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => editBarang(item)}
                          className="font-medium text-indigo-600 hover:text-indigo-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => hapusBarang(item.id)}
                          className="font-medium text-red-600 hover:text-red-800"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {daftarBarang.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-10 text-center text-gray-500">
                      Tidak ada barang yang cocok dengan pencarian atau kategori.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Menampilkan {daftarBarang.length} dari {barang.length} jenis barang.
          </p>
        </section>
      </div>
    </main>
  );
}
