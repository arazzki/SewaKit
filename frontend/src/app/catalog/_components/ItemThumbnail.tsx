import type { CategorySlug } from "@/data/dummyItems";

const CATEGORY_STYLES: Record<CategorySlug, string> = {
  "iot-elektronika": "bg-indigo-100 text-indigo-700",
  "komputer-multimedia": "bg-sky-100 text-sky-700",
  akademik: "bg-amber-100 text-amber-700",
  "acara-kegiatan": "bg-emerald-100 text-emerald-700",
};

function getInitials(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

/**
 * Placeholder gambar barang. Nanti diganti dengan foto asli
 * yang diunggah Pemilik Barang (Fitur 3).
 */
export default function ItemThumbnail({
  name,
  category,
  size = "md",
}: {
  name: string;
  category: CategorySlug;
  size?: "md" | "lg";
}) {
  const sizeClass = size === "lg" ? "h-64 text-5xl" : "h-36 text-3xl";
  return (
    <div
      className={`flex w-full items-center justify-center rounded-lg font-bold ${sizeClass} ${CATEGORY_STYLES[category]}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
