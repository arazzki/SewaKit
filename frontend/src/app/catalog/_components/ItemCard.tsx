import Link from "next/link";
import { MapPin, Star, BadgeCheck } from "lucide-react";
import { getCategoryName, type CatalogItem } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import ItemThumbnail from "./ItemThumbnail";

export default function ItemCard({ item }: { item: CatalogItem }) {
  const isAvailable = item.unitsAvailable > 0;

  return (
    <article className="group flex flex-col rounded-2xl border border-line bg-white p-2 transition-[border-color,box-shadow] duration-200 hover:border-ink/40 hover:shadow-[0_12px_32px_-18px_rgba(20,20,19,0.25)]">
      {/* Foto */}
      <Link
        href={`/catalog/${item.id}`}
        className="relative block overflow-hidden rounded-xl"
        aria-label={`Lihat detail ${item.name}`}
      >
        <ItemThumbnail
          id={item.id}
          name={item.name}
          category={item.category}
          imageUrl={item.imageUrl}
          sku={item.sku}
        />

        <span
          className={
            "absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm " +
            (isAvailable
              ? "bg-white/90 text-forest"
              : "bg-ink/80 text-paper")
          }
        >
          <span
            className={
              "size-1.5 rounded-full " + (isAvailable ? "bg-forest" : "bg-paper/70")
            }
          />
          {isAvailable ? `${item.unitsAvailable} unit tersedia` : "Sedang disewa"}
        </span>
      </Link>

      {/* Isi */}
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-3.5">
        <div className="flex items-center justify-between gap-3 text-xs text-muted">
          <span className="truncate">{getCategoryName(item.category)}</span>
          {item.rating !== null ? (
            <span className="inline-flex shrink-0 items-center gap-1 font-medium text-ink">
              <Star className="size-3.5 fill-clay text-clay" aria-hidden />
              <span className="tabular">{item.rating.toFixed(1)}</span>
              <span className="font-normal text-muted">
                ({item.completedRentals})
              </span>
            </span>
          ) : (
            <span className="shrink-0 text-muted">Belum ada ulasan</span>
          )}
        </div>

        <h3 className="mt-1 text-[15px] font-semibold leading-snug tracking-tight text-ink">
          <Link
            href={`/catalog/${item.id}`}
            className="line-clamp-1 transition-colors hover:text-clay"
          >
            {item.name}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden />
            {item.codLocation}
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="size-3.5 text-forest" aria-hidden />
            {item.ownerName}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-ink">
              <span className="tabular text-lg font-semibold tracking-tight">
                {formatRupiah(item.pricePerDay)}
              </span>
              <span className="text-xs text-muted"> / hari</span>
            </p>
            <p className="tabular text-[11px] text-muted">
              Deposit {formatRupiah(item.deposit)}
            </p>
          </div>

          <Link
            href={`/rentals/request?item=${item.id}`}
            className="inline-flex h-9 shrink-0 items-center rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-clay"
          >
            Sewa
          </Link>
        </div>
      </div>
    </article>
  );
}
