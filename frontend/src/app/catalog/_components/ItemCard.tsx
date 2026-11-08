import Link from "next/link";
import { MapPin, Star, ShieldCheck, ArrowUpRight } from "lucide-react";
import { getCategoryName, type CatalogItem } from "@/data/dummyItems";
import { formatRupiah } from "@/lib/format";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import ItemThumbnail from "./ItemThumbnail";

export default function ItemCard({ item }: { item: CatalogItem }) {
  const isAvailable = item.unitsAvailable > 0;

  return (
    <Card
      as="article"
      variant="interactive"
      className="group flex flex-col overflow-hidden"
    >
      <Link
        href={`/catalog/${item.id}`}
        className="relative block border-b border-surface-muted"
      >
        <ItemThumbnail
          id={item.id}
          name={item.name}
          category={item.category}
          imageUrl={item.imageUrl}
          sku={item.sku}
        />

        <div className="absolute left-3 top-3 z-10">
          <Badge variant={isAvailable ? "available" : "rented"} dot>
            {isAvailable ? `Tersedia (${item.unitsAvailable})` : "Disewa"}
          </Badge>
        </div>

        {item.rating !== null && (
          <div className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-md border border-hairline bg-surface/95 px-2 py-0.5 font-mono text-xs font-semibold text-ink backdrop-blur-xs">
            <Star className="size-3 fill-accent text-accent" />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-1.5 flex items-center justify-between gap-2 text-xs text-ink-subtle">
          <span className="truncate font-medium text-accent">
            {getCategoryName(item.category)}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-ink-muted">
            <MapPin className="size-3 text-ink-subtle" />
            {item.codLocation}
          </span>
        </div>

        <Link
          href={`/catalog/${item.id}`}
          className="line-clamp-1 text-base font-bold tracking-tight text-ink transition group-hover:text-accent"
        >
          {item.name}
        </Link>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-muted">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-surface-muted bg-surface-subtle px-3 py-2 text-xs">
          <div className="min-w-0 truncate">
            <span className="font-semibold text-ink">{item.ownerName}</span>
            <span className="text-ink-subtle"> • {item.condition}</span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-forest">
            <ShieldCheck className="size-3.5" />
            Tel-U
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-surface-muted pt-3.5">
          <div>
            <span className="block text-xs text-ink-subtle">
              Harga sewa / hari
            </span>
            <span className="font-mono text-lg font-bold text-ink">
              {formatRupiah(item.pricePerDay)}
            </span>
            <span className="block text-xs text-ink-muted">
              Deposit:{" "}
              <span className="font-mono font-medium">
                {formatRupiah(item.deposit)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              href={`/catalog/${item.id}`}
              variant="outline"
              size="sm"
              className="rounded-lg px-2.5"
            >
              Detail
            </Button>
            <Button
              href={`/rentals/request?item=${item.id}`}
              size="sm"
              className="rounded-lg px-3"
            >
              <span>Sewa</span>
              <ArrowUpRight className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
