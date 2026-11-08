"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/utils/cx";

export interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark";
  showTagline?: boolean;
  taglineClassName?: string;
  href?: string | null;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SIZE_MAP = {
  sm: {
    icon: "h-7 w-7",
    wordmark: "text-sm",
    tagline: "text-xs",
    gap: "gap-2.5",
  },
  md: {
    icon: "h-9 w-9",
    wordmark: "text-base",
    tagline: "text-xs",
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
  taglineClassName,
  href = "/",
  className,
  onClick,
}: BrandLogoProps) {
  const pathname = usePathname();
  const s = SIZE_MAP[size];
  const isDark = theme === "dark";

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (href === "/" && pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined") {
        if (window.location.hash) {
          window.history.replaceState(null, "", "/");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.dispatchEvent(new CustomEvent("sewakit:scrolltop"));
      }
    }
  };

  const content = (
    <>
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
              ? "fill-ink-elevated group-hover:fill-ink-border"
              : "fill-ink group-hover:fill-ink-elevated",
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
            "stroke-ink-border group-hover:stroke-accent/60",
          )}
        />
        <path
          d="M 21.8 11.5 H 14 A 2.8 2.8 0 0 0 11.2 14.3 V 17.2 A 2.8 2.8 0 0 0 14 20 H 26 A 2.8 2.8 0 0 1 28.8 22.8 V 25.7 A 2.8 2.8 0 0 1 26 28.5 H 18.2"
          className="stroke-canvas"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="27.5" cy="11.5" r="2.6" className="fill-accent" />
        <circle
          cx="12.5"
          cy="28.5"
          r="2.2"
          className={isDark ? "fill-ink-faint" : "fill-ink-inverse-muted"}
        />
      </svg>

      <div className="min-w-0 leading-none">
        <span
          className={cx(
            "block font-extrabold tracking-tight",
            isDark ? "text-canvas" : "text-ink",
            s.wordmark,
          )}
        >
          SewaKit
        </span>
        {showTagline && (
          <span
            className={cx(
              "mt-1 block truncate",
              isDark ? "text-ink-faint" : "text-ink-subtle",
              s.tagline,
              taglineClassName,
            )}
          >
            Sewa Alat Praktikum &amp; Kegiatan Kampus
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        className={cx(
          "group inline-flex shrink-0 cursor-pointer items-center",
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
