export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
              Fitur #12
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">Notifikasi dan Pengingat</h1>
            <p className="text-sm text-slate-600 mt-1">
              Pusat pemberitahuan status pengajuan, pembayaran, dan pengingat jatuh tempo.
            </p>
          </div>
        </div>

        {/* List Notifikasi */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-bold">
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Pengingat Jatuh Tempo Sewa</h4>
                <span className="text-[11px] text-slate-400">Baru saja</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Masa sewa Multimeter Digital Anda akan berakhir besok (H-1). Mohon bersiap untuk proses pengembalian.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold">
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">Pembayaran Dikonfirmasi</h4>
                <span className="text-[11px] text-slate-400">2 jam lalu</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Pembayaran via Xendit untuk pemesanan ESP32 Development Board telah berhasil diverifikasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}