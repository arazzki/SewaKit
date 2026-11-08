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
    badge: "border-forest/25 bg-forest-subtle text-forest",
    dot: "bg-forest",
  },
  rented: {
    badge: "border-hairline bg-surface-muted text-ink-muted",
    dot: "bg-ink-subtle",
  },
  hold: {
    badge: "border-warning-border bg-warning-subtle text-warning-ink",
    dot: "bg-warning",
  },
  accent: {
    badge: "border-accent/25 bg-accent/10 text-accent",
    dot: "bg-accent",
  },
  danger: {
    badge: "border-danger-border bg-danger-subtle text-danger",
    dot: "bg-danger",
  },
  neutral: {
    badge: "border-hairline bg-canvas text-ink-muted",
    dot: "bg-ink-subtle",
  },
  outline: {
    badge: "border-hairline bg-surface text-ink",
    dot: "bg-ink",
  },
  dark: {
    badge: "border-ink bg-ink text-canvas",
    dot: "bg-accent",
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
