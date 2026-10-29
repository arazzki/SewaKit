
"use client";

import { useState } from "react";

type StatusTransaksi = "Berhasil" | "Diproses" | "Ditolak";
type TipeTransaksi = "masuk" | "keluar";

type Transaksi = {
  id: number;
  tanggal: string;
  keterangan: string;
  nominal: number;
  tipe: TipeTransaksi;
  status: StatusTransaksi;
  rekening?: string;
};

const saldoAwal = 425000;

const transaksiAwal: Transaksi[] = [
  {
    id: 1,
    tanggal: "28 Okt 2026",
    keterangan: "Pendapatan sewa Kamera Canon EOS",
    nominal: 150000,
    tipe: "masuk",
    status: "Berhasil",
  },
  {
    id: 2,
    tanggal: "26 Okt 2026",
    keterangan: "Pendapatan sewa Proyektor Epson",
    nominal: 100000,
    tipe: "masuk",
    status: "Berhasil",
  },
  {
    id: 3,
    tanggal: "25 Okt 2026",
    keterangan: "Penarikan dana ke BCA",
    nominal: 75000,
    tipe: "keluar",
    status: "Diproses",
    rekening: "BCA •••• 1234",
  },
];

const rekeningContoh = [
  { id: "bca", nama: "BCA", nomor: "1234567890", pemilik: "Pemilik Akun" },
  { id: "bri", nama: "BRI", nomor: "0987654321", pemilik: "Pemilik Akun" },
  { id: "bni", nama: "BNI", nomor: "1122334455", pemilik: "Pemilik Akun" },
  {
    id: "mandiri",
    nama: "Mandiri",
    nomor: "5566778899",
    pemilik: "Pemilik Akun",
  },
];

function formatRupiah(nilai: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function formatTanggal() {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

function formatNomorRekening(nomor: string) {
  return `•••• ${nomor.slice(-4)}`;
}

export default function WalletPage() {
  const [saldo, setSaldo] = useState(saldoAwal);
  const [nominal, setNominal] = useState("");
  const [rekeningId, setRekeningId] = useState("bca");
  const [transaksi, setTransaksi] = useState<Transaksi[]>(transaksiAwal);
  const [pesan, setPesan] = useState("");
  const [jenisPesan, setJenisPesan] = useState<"sukses" | "error">("sukses");
  const [filter, setFilter] = useState("semua");
  const [kataKunci, setKataKunci] = useState("");
  const [konfirmasi, setKonfirmasi] = useState(false);

  const rekeningTerpilih = rekeningContoh.find(
    (rekening) => rekening.id === rekeningId
  );

  const totalPendapatan = transaksi
    .filter((item) => item.tipe === "masuk" && item.status === "Berhasil")
    .reduce((total, item) => total + item.nominal, 0);

  const totalPenarikanBerhasil = transaksi
    .filter(
      (item) => item.tipe === "keluar" && item.status === "Berhasil"
    )
    .reduce((total, item) => total + item.nominal, 0);

  const totalDiproses = transaksi
    .filter(
      (item) => item.tipe === "keluar" && item.status === "Diproses"
    )
    .reduce((total, item) => total + item.nominal, 0);

  const transaksiTampil = transaksi.filter((item) => {
    const cocokFilter =
      filter === "semua" ||
      (filter === "masuk" && item.tipe === "masuk") ||
      (filter === "keluar" && item.tipe === "keluar");

    const cocokKataKunci =
      item.keterangan.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.status.toLowerCase().includes(kataKunci.toLowerCase());

    return cocokFilter && cocokKataKunci;
  });

  function tampilkanPesan(
    teks: string,
    jenis: "sukses" | "error"
  ) {
    setPesan(teks);
    setJenisPesan(jenis);
  }

  function ajukanPenarikan(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPesan("");

    const jumlah = Number(nominal);

    if (!Number.isFinite(jumlah) || jumlah <= 0) {
      tampilkanPesan("Masukkan nominal penarikan yang valid.", "error");
      return;
    }

    if (!Number.isInteger(jumlah)) {
      tampilkanPesan("Nominal penarikan harus berupa angka bulat.", "error");
      return;
    }

    if (jumlah < 10000) {
      tampilkanPesan("Minimal penarikan adalah Rp10.000.", "error");
      return;
    }

    if (jumlah > saldo) {
      tampilkanPesan("Saldo tidak mencukupi untuk penarikan tersebut.", "error");
      return;
    }

    if (!rekeningTerpilih) {
      tampilkanPesan("Pilih rekening tujuan terlebih dahulu.", "error");
      return;
    }

    setKonfirmasi(true);
  }

  function konfirmasiPenarikan() {
    const jumlah = Number(nominal);

    if (
      !rekeningTerpilih ||
      !Number.isInteger(jumlah) ||
      jumlah < 10000 ||
      jumlah > saldo
    ) {
      setKonfirmasi(false);
      tampilkanPesan("Penarikan tidak dapat diproses. Periksa saldo dan nominal.", "error");
      return;
    }

    const transaksiBaru: Transaksi = {
      id: Date.now(),
      tanggal: formatTanggal(),
      keterangan: `Penarikan dana ke ${rekeningTerpilih.nama}`,
      nominal: jumlah,
      tipe: "keluar",
      status: "Diproses",
      rekening: `${rekeningTerpilih.nama} ${formatNomorRekening(
        rekeningTerpilih.nomor
      )}`,
    };

    setSaldo((saldoSekarang) => saldoSekarang - jumlah);
    setTransaksi((daftar) => [transaksiBaru, ...daftar]);
    setNominal("");
    setKonfirmasi(false);
    tampilkanPesan(
      "Pengajuan penarikan berhasil dibuat dan berstatus Diproses. Ini hanya simulasi.",
      "sukses"
    );
  }

  function isiSemuaSaldo() {
    setNominal(String(saldo));
    setPesan("");
  }

  return (
    <main className="min-h-screen bg-[#F6F5F0] px-4 py-8 text-[#141413] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#C83E2B]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFECE6]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18M7 15h3" />
                </svg>
              </span>
              <span>Area Pemilik</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Saldo dan Penarikan Dana
            </h1>
            <p className="mt-2 text-sm text-[#575653] sm:text-base">
              Kelola pendapatan sewa dan pantau pengajuan penarikan dana kamu.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Mode Simulasi
          </span>
        </header>

        <section
          aria-label="Ringkasan saldo"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <div className="rounded-2xl bg-[#141413] p-5 text-white shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#A09D95]">Saldo Tersedia</p>
              <span className="rounded-lg bg-white/15 p-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18M16 14h2" />
                </svg>
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold sm:text-3xl">
              {formatRupiah(saldo)}
            </p>
            <p className="mt-2 text-xs text-[#A09D95]">
              Dana yang dapat diajukan untuk penarikan
            </p>
          </div>

          <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#575653]">Total Pendapatan</p>
              <span className="rounded-lg bg-[#E9F3ED] p-2 text-[#1B4332]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M3 17l6-6 4 3 8-8" />
                  <path d="M15 6h6v6" />
                </svg>
              </span>
            </div>
            <p className="mt-4 text-xl font-bold sm:text-2xl">
              {formatRupiah(totalPendapatan)}
            </p>
            <p className="mt-2 text-xs text-[#575653]">
              Pendapatan masuk berstatus berhasil
            </p>
          </div>

          <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#575653]">Penarikan Diproses</p>
              <span className="rounded-lg bg-amber-50 p-2 text-amber-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
            </div>
            <p className="mt-4 text-xl font-bold sm:text-2xl">
              {formatRupiah(totalDiproses)}
            </p>
            <p className="mt-2 text-xs text-[#575653]">
              Pengajuan yang belum selesai
            </p>
          </div>

          <div className="rounded-2xl border border-[#DCD8CE] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#575653]">Penarikan Berhasil</p>
              <span className="rounded-lg bg-violet-50 p-2 text-violet-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M5 12l4 4L19 6" />
                </svg>
              </span>
            </div>
            <p className="mt-4 text-xl font-bold sm:text-2xl">
              {formatRupiah(totalPenarikanBerhasil)}
            </p>
            <p className="mt-2 text-xs text-[#575653]">
              Total penarikan yang berhasil
            </p>
          </div>
        </section>

        {pesan && (
          <div
            role="status"
            className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
              jenisPesan === "sukses"
                ? "border-[#1B4332]/25 bg-[#E9F3ED] text-[#1B4332]"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            <span className="font-bold">
              {jenisPesan === "sukses" ? "✓" : "!"}
            </span>
            <p>{pesan}</p>
            <button
              type="button"
              onClick={() => setPesan("")}
              className="ml-auto font-bold"
              aria-label="Tutup pesan"
            >
              ×
            </button>
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <section className="rounded-2xl border border-[#DCD8CE] bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-lg font-bold">Ajukan Penarikan Dana</h2>
              <p className="mt-1 text-sm text-[#575653]">
                Masukkan nominal dan pilih rekening tujuan.
              </p>
            </div>

            <form onSubmit={ajukanPenarikan} className="space-y-5">
              <div>
                <label
                  htmlFor="nominal"
                  className="mb-2 block text-sm font-medium"
                >
                  Nominal Penarikan
                </label>

                <div className="flex overflow-hidden rounded-xl border border-[#DCD8CE] focus-within:border-[#141413] focus-within:ring-2 focus-within:ring-blue-100">
                  <span className="flex items-center border-r border-[#DCD8CE] bg-[#F6F5F0] px-4 text-sm font-semibold text-[#575653]">
                    Rp
                  </span>
                  <input
                    id="nominal"
                    type="number"
                    min="10000"
                    max={saldo}
                    step="1"
                    inputMode="numeric"
                    placeholder="Contoh: 100000"
                    value={nominal}
                    onChange={(event) => {
                      setNominal(event.target.value);
                      setPesan("");
                    }}
                    className="min-w-0 flex-1 px-4 py-3 outline-none"
                    required
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#575653]">
                  <span>Minimal penarikan Rp10.000</span>
                  <button
                    type="button"
                    onClick={isiSemuaSaldo}
                    className="font-semibold text-[#C83E2B] hover:text-blue-800"
                  >
                    Gunakan semua saldo
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="rekening"
                  className="mb-2 block text-sm font-medium"
                >
                  Rekening Tujuan
                </label>
                <select
                  id="rekening"
                  value={rekeningId}
                  onChange={(event) => setRekeningId(event.target.value)}
                  className="w-full rounded-xl border border-[#DCD8CE] bg-white px-4 py-3 outline-none focus:border-[#141413] focus:ring-2 focus:ring-blue-100"
                >
                  {rekeningContoh.map((rekening) => (
                    <option key={rekening.id} value={rekening.id}>
                      {rekening.nama} — {formatNomorRekening(rekening.nomor)}
                    </option>
                  ))}
                </select>

                {rekeningTerpilih && (
                  <div className="mt-3 rounded-xl bg-[#F6F5F0] p-4">
                    <p className="text-xs text-[#575653]">Nama pemilik</p>
                    <p className="mt-1 text-sm font-semibold">
                      {rekeningTerpilih.pemilik}
                    </p>
                    <p className="mt-2 text-xs text-[#575653]">
                      Nomor rekening
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {rekeningTerpilih.nomor}
                    </p>
                    <p className="mt-2 text-xs text-amber-700">
                      Data rekening di atas hanya contoh simulasi.
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-[#DCD8CE] bg-[#EFECE6] p-4">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-[#C83E2B]">i</span>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Informasi penarikan
                    </p>
                    <p className="mt-1 text-xs leading-5 text-blue-800">
                      Saat pengajuan dikonfirmasi, saldo simulasi akan
                      berkurang dan transaksi tercatat dengan status
                      Diproses. Tidak ada uang sungguhan yang dikirim.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#141413] px-5 py-3 font-semibold text-white transition hover:bg-[#141413] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              >
                Ajukan Penarikan
              </button>
            </form>
          </section>

          <aside className="rounded-2xl border border-[#DCD8CE] bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <h2 className="text-lg font-bold">Informasi Saldo</h2>
            <p className="mt-1 text-sm text-[#575653]">
              Ringkasan akun pemilik.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#575653]">Saldo saat ini</span>
                <span className="text-right text-sm font-semibold">
                  {formatRupiah(saldo)}
                </span>
              </div>
              <div className="h-px bg-[#EFECE6]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#575653]">
                  Total pendapatan
                </span>
                <span className="text-right text-sm font-semibold">
                  {formatRupiah(totalPendapatan)}
                </span>
              </div>
              <div className="h-px bg-[#EFECE6]" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#575653]">
                  Penarikan diproses
                </span>
                <span className="text-right text-sm font-semibold text-amber-600">
                  {formatRupiah(totalDiproses)}
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-[#F6F5F0] p-4">
              <p className="text-sm font-semibold">Perlu diketahui</p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-[#575653]">
                <li>• Minimal penarikan adalah Rp10.000.</li>
                <li>• Nominal tidak boleh melebihi saldo tersedia.</li>
                <li>• Pengajuan baru akan berstatus Diproses.</li>
                <li>• Data belum disimpan ke database.</li>
              </ul>
            </div>
          </aside>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#DCD8CE] p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-bold">Riwayat Transaksi</h2>
              <p className="mt-1 text-sm text-[#575653]">
                Pantau pendapatan dan pengajuan penarikan dana.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="search"
                value={kataKunci}
                onChange={(event) => setKataKunci(event.target.value)}
                placeholder="Cari transaksi atau status..."
                aria-label="Cari transaksi"
                className="w-full rounded-xl border border-[#DCD8CE] px-4 py-2.5 text-sm outline-none focus:border-[#141413] focus:ring-2 focus:ring-blue-100"
              />

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter transaksi"
                className="w-full rounded-xl border border-[#DCD8CE] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#141413] focus:ring-2 focus:ring-blue-100"
              >
                <option value="semua">Semua transaksi</option>
                <option value="masuk">Pendapatan masuk</option>
                <option value="keluar">Penarikan dana</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-[#F6F5F0] text-xs uppercase tracking-wide text-[#575653]">
                <tr>
                  <th className="px-5 py-4 font-semibold">Tanggal</th>
                  <th className="px-5 py-4 font-semibold">Keterangan</th>
                  <th className="px-5 py-4 font-semibold">Nominal</th>
                  <th className="px-5 py-4 font-semibold">Rekening</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#EFECE6]">
                {transaksiTampil.map((item) => (
                  <tr key={item.id} className="transition hover:bg-[#F6F5F0]">
                    <td className="whitespace-nowrap px-5 py-4 text-[#575653]">
                      {item.tanggal}
                    </td>

                    <td className="px-5 py-4 font-medium text-[#141413]">
                      {item.keterangan}
                    </td>

                    <td
                      className={`whitespace-nowrap px-5 py-4 font-semibold ${
                        item.tipe === "masuk"
                          ? "text-[#1B4332]"
                          : "text-[#141413]"
                      }`}
                    >
                      {item.tipe === "masuk" ? "+" : "-"}
                      {formatRupiah(item.nominal)}
                    </td>

                    <td className="px-5 py-4 text-[#575653]">
                      {item.rekening || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "Berhasil"
                            ? "bg-[#E9F3ED] text-[#1B4332]"
                            : item.status === "Diproses"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {transaksiTampil.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-sm text-[#575653]"
                    >
                      Tidak ada transaksi yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#DCD8CE] px-5 py-4 text-xs text-[#575653]">
            Menampilkan {transaksiTampil.length} dari {transaksi.length} transaksi.
            Semua data pada halaman ini merupakan simulasi frontend.
          </div>
        </section>

        <footer className="mt-6 text-center text-xs leading-5 text-[#78756F]">
          SewaKit · Saldo dan Penarikan Dana · Mode Simulasi
        </footer>
      </div>

      {konfirmasi && rekeningTerpilih && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setKonfirmasi(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="judul-konfirmasi"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EFECE6] text-[#C83E2B]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </div>

            <h2 id="judul-konfirmasi" className="text-xl font-bold">
              Konfirmasi Penarikan
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#575653]">
              Periksa kembali detail pengajuan penarikan dana simulasi kamu.
            </p>

            <div className="my-5 space-y-4 rounded-xl bg-[#F6F5F0] p-4">
              <div>
                <p className="text-xs text-[#575653]">Nominal penarikan</p>
                <p className="mt-1 text-xl font-bold text-[#C83E2B]">
                  {formatRupiah(Number(nominal))}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#575653]">Bank tujuan</p>
                <p className="mt-1 text-sm font-semibold">
                  {rekeningTerpilih.nama}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#575653]">Nomor rekening</p>
                <p className="mt-1 text-sm font-semibold">
                  {rekeningTerpilih.nomor}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#575653]">Sisa saldo setelah pengajuan</p>
                <p className="mt-1 text-sm font-semibold">
                  {formatRupiah(saldo - Number(nominal))}
                </p>
              </div>
            </div>

            <p className="mb-5 text-xs leading-5 text-[#575653]">
              Dengan melanjutkan, saldo simulasi akan langsung dikurangi.
              Status transaksi baru adalah Diproses, bukan transfer sungguhan.
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setKonfirmasi(false)}
                className="rounded-xl border border-[#DCD8CE] px-4 py-3 text-sm font-semibold hover:bg-[#F6F5F0]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={konfirmasiPenarikan}
                className="rounded-xl bg-[#141413] px-4 py-3 text-sm font-semibold text-white hover:bg-[#141413]"
              >
                Konfirmasi Penarikan
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
