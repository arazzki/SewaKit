"import Link from 'next/link';";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
              Fitur #11
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">Rating dan Ulasan</h1>
            <p className="text-sm text-slate-600 mt-1">
              Ulasan dan rating dua arah antara Pemilik dan Penyewa pasca-transaksi.
            </p>
          </div>
        </div>

        {/* Form / Daftar Ulasan */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2">Beri Ulasan Transaksi</h3>
            <p className="text-xs text-slate-500 mb-4">Bagikan pengalaman sewa alat praktikum/kuliah Anda.</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Rating (1-5 Bintang)</label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="5">⭐⭐⭐⭐⭐ - Luar biasa</option>
                  <option value="4">⭐⭐⭐⭐ - Baik</option>
                  <option value="3">⭐⭐⭐ - Cukup</option>
                  <option value="2">⭐⭐ - Kurang</option>
                  <option value="1">⭐ - Buruk</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Komentar / Ulasan</label>
                <textarea 
                  rows={3} 
                  placeholder="Tuliskan kondisi barang atau pengalaman bertransaksi..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition">
                Kirim Ulasan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}