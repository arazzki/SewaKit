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
    icon: "h-7 w-7",
    wordmark: "text-sm",
    tagline: "text-[10px]",
    gap: "gap-2.5",
  },
  md: {
    icon: "h-9 w-9",
    wordmark: "text-base",
    tagline: "text-[11px]",
    gap: "gap-3",
  },
  lg: {
    icon: "h-11 w-11",
    wordmark: "text-lg",
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
      {/* Official SewaKit Vector Emblem (Modular P2P S-Trace) */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={cx(
          "shrink-0 transition-transform duration-200 group-hover:scale-[1.03]",
          s.icon,
        )}
      >
        <rect
          width="40"
          height="40"
          rx="10"
          className={cx(
            "transition-colors duration-200",
            isDark
              ? "fill-[#1D1D1B] group-hover:fill-[#262523]"
              : "fill-[#141413] group-hover:fill-[#1F1E1C]",
          )}
        />
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="9"
          strokeWidth="1"
          className={cx(
            "transition-colors duration-200",
            isDark
              ? "stroke-[#33312E] group-hover:stroke-[#C83E2B]/60"
              : "stroke-[#2C2B28] group-hover:stroke-[#C83E2B]/60",
          )}
        />
        <path
          d="M 21.8 11.5 H 14 A 2.8 2.8 0 0 0 11.2 14.3 V 17.2 A 2.8 2.8 0 0 0 14 20 H 26 A 2.8 2.8 0 0 1 28.8 22.8 V 25.7 A 2.8 2.8 0 0 1 26 28.5 H 18.2"
          stroke="#F6F5F0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="27.5" cy="11.5" r="2.6" fill="#C83E2B" />
        <circle
          cx="12.5"
          cy="28.5"
          r="2.2"
          fill={isDark ? "#8E8B83" : "#D5D2CA"}
        />
      </svg>

      <div className="min-w-0 leading-none">
        <span
          className={cx(
            "block font-extrabold tracking-tight",
            isDark ? "text-[#F6F5F0]" : "text-[#141413]",
            s.wordmark,
          )}
        >
          SewaKit
        </span>
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
        className={cx(
          "group inline-flex shrink-0 items-center",
          s.gap,
          className,
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={cx("group inline-flex shrink-0 items-center", s.gap, className)}
    >
      {content}
    </div>
  );
}
