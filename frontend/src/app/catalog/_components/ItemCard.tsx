import Link from "next/link";
import { MapPin, Star, ShieldCheck, ArrowUpRight } from "lucide-react";
import { getCategoryName, type CatalogItem } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import Badge from "@/components/ui/badge";
import ItemThumbnail from "./ItemThumbnail";

export default function ItemCard({ item }: { item: CatalogItem }) {
  const isAvailable = item.unitsAvailable > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white transition-all duration-200 hover:border-[#141413] hover:shadow-[0_10px_28px_-14px_rgba(20,20,19,0.14)]">
      {/* Photo Frame */}
      <Link
        href={`/catalog/${item.id}`}
        className="relative block border-b border-[#EFECE6]"
      >
        <ItemThumbnail
          id={item.id}
          name={item.name}
          category={item.category}
          imageUrl={item.imageUrl}
          sku={item.sku}
        />

        {/* Top-left Status Badge */}
        <div className="absolute left-3 top-3 z-10">
          <Badge variant={isAvailable ? "available" : "rented"} dot>
            {isAvailable ? `Tersedia (${item.unitsAvailable})` : "Disewa"}
          </Badge>
        </div>

        {/* Top-right Rating Chip */}
        {item.rating !== null && (
          <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md border border-[#DCD8CE] bg-white/95 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#141413] backdrop-blur-xs">
            <Star className="size-3 fill-[#C83E2B] text-[#C83E2B]" />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-1.5 flex items-center justify-between gap-2 font-mono text-[11px] text-[#78756F]">
          <span className="truncate font-medium text-[#C83E2B]">
            {getCategoryName(item.category)}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[#575653]">
            <MapPin className="size-3 text-[#78756F]" />
            {item.codLocation}
          </span>
        </div>

        <Link
          href={`/catalog/${item.id}`}
          className="line-clamp-1 text-base font-bold tracking-tight text-[#141413] transition group-hover:text-[#C83E2B]"
        >
          {item.name}
        </Link>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#575653]">
          {item.description}
        </p>

        {/* Owner & Condition Strip */}
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-[#EFECE6] bg-[#FBF9F5] px-3 py-2 text-xs">
          <div className="min-w-0 truncate">
            <span className="font-semibold text-[#141413]">{item.ownerName}</span>
            <span className="text-[#78756F]"> • {item.condition}</span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1B4332]">
            <ShieldCheck className="size-3" />
            NIM
          </span>
        </div>

        {/* Footer Price & CTA */}
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#EFECE6] pt-3.5">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-[#78756F]">
              Tarif Sewa / Hari
            </span>
            <span className="font-mono text-lg font-bold text-[#141413]">
              {formatRupiah(item.pricePerDay)}
            </span>
            <span className="block font-mono text-[10px] text-[#575653]">
              Deposit Escrow: {formatRupiah(item.deposit)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/catalog/${item.id}`}
              className="inline-flex h-8.5 items-center rounded-lg border border-[#DCD8CE] bg-white px-2.5 text-xs font-medium text-[#141413] transition hover:border-[#141413]"
            >
              Spesifikasi
            </Link>
            <Link
              href={`/rentals/request?item=${item.id}`}
              className="inline-flex h-8.5 items-center gap-1 rounded-lg bg-[#141413] px-3 text-xs font-medium text-[#F6F5F0] transition hover:bg-[#C83E2B]"
            >
              <span>Sewa</span>
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
