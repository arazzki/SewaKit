import type { CategorySlug } from "@/data/dummyItems";

const CATEGORY_STYLES: Record<string, { bg: string; badge: string; label: string }> = {
  "iot-elektronika": {
    bg: "bg-[#EFECE6] text-[#141413]",
    badge: "border-[#C83E2B]/30 bg-[#C83E2B]/10 text-[#C83E2B]",
    label: "IOT / ELEKTRONIKA",
  },
  "Perangkat IoT & Elektronika": {
    bg: "bg-[#EFECE6] text-[#141413]",
    badge: "border-[#C83E2B]/30 bg-[#C83E2B]/10 text-[#C83E2B]",
    label: "IOT / ELEKTRONIKA",
  },
  "komputer-multimedia": {
    bg: "bg-[#EAE8E1] text-[#141413]",
    badge: "border-[#141413]/20 bg-[#141413]/5 text-[#141413]",
    label: "MULTIMEDIA",
  },
  "Perangkat Komputer & Multimedia": {
    bg: "bg-[#EAE8E1] text-[#141413]",
    badge: "border-[#141413]/20 bg-[#141413]/5 text-[#141413]",
    label: "MULTIMEDIA",
  },
  akademik: {
    bg: "bg-[#E9EFEA] text-[#1B4332]",
    badge: "border-[#1B4332]/25 bg-[#1B4332]/10 text-[#1B4332]",
    label: "INSTRUMEN LAB",
  },
  "Perlengkapan Akademik": {
    bg: "bg-[#E9EFEA] text-[#1B4332]",
    badge: "border-[#1B4332]/25 bg-[#1B4332]/10 text-[#1B4332]",
    label: "INSTRUMEN LAB",
  },
  "acara-kegiatan": {
    bg: "bg-[#F2ECE4] text-[#5C3A21]",
    badge: "border-[#5C3A21]/25 bg-[#5C3A21]/10 text-[#5C3A21]",
    label: "LOGISTIK ACARA",
  },
  "Perlengkapan Acara & Kegiatan": {
    bg: "bg-[#F2ECE4] text-[#5C3A21]",
    badge: "border-[#5C3A21]/25 bg-[#5C3A21]/10 text-[#5C3A21]",
    label: "LOGISTIK ACARA",
  },
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
  name,
  title,
  category,
  size = "md",
}: {
  name?: string;
  title?: string;
  category: CategorySlug | string;
  accent?: string;
  size?: "md" | "lg";
}) {
  const displayTitle = name || title || "Alat Kampus";
  const style = CATEGORY_STYLES[category] ?? {
    bg: "bg-[#EFECE6] text-[#141413]",
    badge: "border-[#DCD8CE] bg-white text-[#575653]",
    label: "INVENTARIS",
  };
  const sizeClass = size === "lg" ? "h-64 text-5xl" : "h-40 text-3xl";

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden font-mono font-bold tracking-tight ${sizeClass} ${style.bg}`}
      aria-hidden="true"
    >
      {/* Subtle architectural grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(to right, #DCD8CE 1px, transparent 1px), linear-gradient(to bottom, #DCD8CE 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#141413]/15 bg-white/90 text-xl font-bold text-[#141413] shadow-xs">
        {getInitials(displayTitle)}
      </div>
      <span className="relative z-10 mt-2.5 font-mono text-[10px] font-medium uppercase tracking-widest text-[#575653]">
        {style.label}
      </span>
    </div>
  );
}
