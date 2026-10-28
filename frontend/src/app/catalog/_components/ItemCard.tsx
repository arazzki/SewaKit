import Link from "next/link";
import { getCategoryName, type CatalogItem } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import ItemThumbnail from "./ItemThumbnail";

export default function ItemCard({ item }: { item: CatalogItem }) {
  return (
    <Link
      href={`/catalog/${item.id}`}
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
    >
      <ItemThumbnail name={item.name} category={item.category} />

      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-xs font-medium text-indigo-600">{getCategoryName(item.category)}</span>
        <h3 className="mt-1 text-base font-bold text-slate-900">{item.name}</h3>
        <p className="mt-1 text-xs text-slate-500">
          {item.ownerName} · {item.codLocation}
        </p>

        <div className="mt-auto pt-4">
          <p className="text-lg font-bold text-slate-900">
            {formatRupiah(item.pricePerDay)}
            <span className="text-sm font-normal text-slate-500"> / hari</span>
          </p>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>Deposit {formatRupiah(item.deposit)}</span>
            <span>{item.rating !== null ? `★ ${item.rating.toFixed(1)}` : "Belum ada ulasan"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
