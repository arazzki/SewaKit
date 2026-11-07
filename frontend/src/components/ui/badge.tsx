import React from "react";
import { cx } from "@/utils/cx";

export type BadgeVariant =
  | "available"
  | "rented"
  | "hold"
  | "accent"
  | "danger"
  | "neutral"
  | "outline"
  | "dark";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const VARIANT_MAP: Record<BadgeVariant, { badge: string; dot: string }> = {
  available: {
    badge: "border-[#1B4332]/25 bg-[#E9F3ED] text-[#1B4332]",
    dot: "bg-[#1B4332]",
  },
  rented: {
    badge: "border-[#DCD8CE] bg-[#EFECE6] text-[#575653]",
    dot: "bg-[#78756F]",
  },
  hold: {
    badge: "border-[#E9C893] bg-[#FEF7EC] text-[#9A5B13]",
    dot: "bg-[#D97706]",
  },
  accent: {
    badge: "border-[#C83E2B]/25 bg-[#C83E2B]/10 text-[#C83E2B]",
    dot: "bg-[#C83E2B]",
  },
  danger: {
    badge: "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]",
    dot: "bg-[#B42318]",
  },
  neutral: {
    badge: "border-[#DCD8CE] bg-[#F6F5F0] text-[#575653]",
    dot: "bg-[#78756F]",
  },
  outline: {
    badge: "border-[#DCD8CE] bg-white text-[#141413]",
    dot: "bg-[#141413]",
  },
  dark: {
    badge: "border-[#141413] bg-[#141413] text-[#F6F5F0]",
    dot: "bg-[#C83E2B]",
  },
};

export function Badge({
  variant = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const style = VARIANT_MAP[variant];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap",
        style.badge,
        className,
      )}
      {...props}
    >
      {dot && <span className={cx("h-1.5 w-1.5 shrink-0 rounded-full", style.dot)} />}
      {children}
    </span>
  );
}

export default Badge;
