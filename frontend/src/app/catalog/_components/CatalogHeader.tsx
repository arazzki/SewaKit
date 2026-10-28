import Link from "next/link";

export default function CatalogHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-sm">
            SK
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">SewaKit</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/catalog" className="text-indigo-600">
            Katalog Alat
          </Link>
          <Link href="/" className="hover:text-indigo-600 transition">
            Beranda
          </Link>
        </nav>
      </div>
    </header>
  );
}
