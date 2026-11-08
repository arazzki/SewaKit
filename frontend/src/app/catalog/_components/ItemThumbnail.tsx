"use client";

import { useState } from "react";
import { DUMMY_ITEMS, type CategorySlug } from "@/data/dummyItems";
import { cx } from "@/utils/cx";

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "iot-elektronika":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "Perangkat IoT & Elektronika":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "komputer-multimedia":
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  "Perangkat Komputer & Multimedia":
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  akademik:
    "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=80",
  "Perlengkapan Akademik":
    "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=80",
  "acara-kegiatan":
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
  "Perlengkapan Acara & Kegiatan":
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
};

const CATEGORY_LABELS: Record<string, string> = {
  "iot-elektronika": "IOT / HARDWARE",
  "komputer-multimedia": "MULTIMEDIA",
  akademik: "INSTRUMEN LAB",
  "acara-kegiatan": "LOGISTIK ACARA",
};

function getInitials(text: string): string {
  if (!text) return "SK";
  return text
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function ItemThumbnail({
  id,
  name,
  title,
  category,
  imageUrl,
  sku,
  size = "md",
  className,
}: {
  id?: string;
  name?: string;
  title?: string;
  category: CategorySlug | string;
  imageUrl?: string;
  sku?: string;
  accent?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const displayTitle = name || title || "Alat Kampus";

  const matchedItem = DUMMY_ITEMS.find(
    (it) =>
      (id && it.id === id) ||
      it.name.toLowerCase() === displayTitle.toLowerCase(),
  );

  const resolvedImage =
    imageUrl ||
    matchedItem?.imageUrl ||
    CATEGORY_FALLBACK_IMAGES[category] ||
    undefined;

  const resolvedSku = sku || matchedItem?.sku;
  const label = CATEGORY_LABELS[category] ?? "INVENTARIS";

  const sizeClass =
    size === "lg"
      ? "aspect-[16/10] sm:h-80 w-full"
      : size === "sm"
        ? "h-14 w-14 rounded-lg"
        : "aspect-[4/3] w-full";

  return (
    <div
      className={cx(
        "relative flex items-center justify-center overflow-hidden bg-surface-muted",
        sizeClass,
        className,
      )}
    >
      {resolvedImage && !imgFailed ? (
        <>
          <img
            src={resolvedImage}
            alt={displayTitle}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-60" />
          {size !== "sm" && resolvedSku && (
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 rounded bg-ink/80 px-2 py-0.5 font-mono text-xs font-medium tracking-wider text-canvas backdrop-blur-xs">
              {resolvedSku}
            </span>
          )}
        </>
      ) : (
        <div className="bg-tech-grid relative flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink/15 bg-surface font-mono text-sm font-bold text-ink">
            {getInitials(displayTitle)}
          </div>
          {size !== "sm" && (
            <span className="mt-2 text-xs font-semibold text-ink-muted">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
