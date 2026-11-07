import Link from "next/link";
import { cx } from "@/utils/cx";

export interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  showTagline?: boolean;
  href?: string | null;
  className?: string;
}

const SIZE_MAP = {
  sm: {
    box: "h-7 w-7 rounded-lg text-[10px]",
    wordmark: "text-sm",
    badge: "px-1.5 py-0.5 text-[9px]",
    tagline: "text-[10px]",
    gap: "gap-2.5",
  },
  md: {
    box: "h-9 w-9 rounded-xl text-xs",
    wordmark: "text-base",
    badge: "px-1.5 py-0.5 text-[10px]",
    tagline: "text-[11px]",
    gap: "gap-3",
  },
  lg: {
    box: "h-11 w-11 rounded-xl text-sm",
    wordmark: "text-lg",
    badge: "px-2 py-0.5 text-[10px]",
    tagline: "text-xs",
    gap: "gap-3.5",
  },
} as const;

export default function BrandLogo({
  size = "md",
  theme = "light",
  showTagline = true,
  href = "/",
  className,
}: BrandLogoProps) {
  const s = SIZE_MAP[size];
  const isDark = theme === "dark";

  const content = (
    <>
      <div
        className={cx(
          "flex shrink-0 items-center justify-center border font-mono font-black tracking-tighter text-[#F6F5F0] transition-colors duration-200",
          isDark
            ? "border-[#262523] bg-[#141413] group-hover:border-[#C83E2B] group-hover:bg-[#C83E2B]"
            : "border-[#141413] bg-[#141413] group-hover:border-[#C83E2B] group-hover:bg-[#C83E2B]",
          s.box,
        )}
      >
        SK
      </div>
      <div className="min-w-0 leading-none">
        <div className="flex items-center gap-2">
          <span
            className={cx(
              "font-bold tracking-tight",
              isDark ? "text-[#F6F5F0]" : "text-[#141413]",
              s.wordmark,
            )}
          >
            SewaKit
          </span>
          <span
            className={cx(
              "rounded-md border font-mono font-semibold uppercase tracking-wider",
              isDark
                ? "border-[#2A2927] bg-[#1D1D1B] text-[#D5D2CA]"
                : "border-[#DCD8CE] bg-[#EFECE6] text-[#575653]",
              s.badge,
            )}
          >
            TEL-U P2P
          </span>
        </div>
        {showTagline && (
          <span
            className={cx(
              "mt-1 block truncate",
              isDark ? "text-[#8E8B83]" : "text-[#78756F]",
              s.tagline,
            )}
          >
            Bursa Alat Praktikum &amp; Riset Kampus
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cx("group inline-flex items-center shrink-0", s.gap, className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={cx("group inline-flex items-center shrink-0", s.gap, className)}>
      {content}
    </div>
  );
}
