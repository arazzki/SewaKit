import React from "react";
import { cx } from "@/utils/cx";

export type CardVariant =
  | "default"
  | "subtle"
  | "muted"
  | "elevated"
  | "interactive";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "section" | "aside";
  variant?: CardVariant;
}

const CARD_VARIANTS: Record<CardVariant, string> = {
  default: "border-hairline bg-surface",
  subtle: "border-hairline bg-surface-subtle",
  muted: "border-hairline bg-surface-muted/70",
  elevated: "border-hairline bg-surface shadow-card",
  interactive:
    "border-hairline bg-surface transition-all duration-200 hover:border-ink hover:shadow-card",
};

export function Card({
  as: Component = "div",
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={cx("rounded-2xl border", CARD_VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
