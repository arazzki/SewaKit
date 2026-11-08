import React from "react";
import Link from "next/link";
import { cx } from "@/utils/cx";

export type ButtonVariant =
  | "default"
  | "primary"
  | "accent"
  | "forest"
  | "outline"
  | "secondary"
  | "ghost"
  | "danger"
  | "danger-solid";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
};

export type ButtonAsButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

export type ButtonAsLinkProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default:
    "border border-ink bg-ink text-canvas hover:bg-accent hover:border-accent shadow-2xs",
  primary:
    "border border-ink bg-ink text-canvas hover:bg-accent hover:border-accent shadow-2xs",
  accent:
    "border border-accent bg-accent text-white hover:bg-accent-hover hover:border-accent-hover shadow-2xs",
  forest:
    "border border-forest bg-forest text-white hover:bg-forest-hover hover:border-forest-hover shadow-2xs",
  outline:
    "border border-hairline bg-surface text-ink hover:border-ink hover:bg-surface-subtle",
  secondary:
    "border border-hairline bg-surface-muted text-ink hover:bg-surface-strong",
  ghost:
    "border border-transparent bg-transparent text-ink-muted hover:bg-surface-muted hover:text-ink",
  danger:
    "border border-danger-border bg-danger-subtle text-danger hover:bg-danger hover:border-danger hover:text-white",
  "danger-solid":
    "border border-danger bg-danger text-white hover:bg-danger-hover hover:border-danger-hover shadow-2xs",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-7 rounded-lg px-2.5 text-xs gap-1",
  sm: "h-9 rounded-xl px-3 py-1.5 text-xs gap-1.5",
  md: "h-10 rounded-xl px-4 py-2 text-xs gap-2",
  lg: "h-11 rounded-xl px-5 py-2.5 text-sm gap-2",
  icon: "h-9 w-9 rounded-xl p-0",
};

export function buttonClasses({
  variant = "default",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cx(
    "inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-150 active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 select-none",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant = "default", size = "md", className } = props;
  const classes = buttonClasses({ variant, size, className });

  if ("href" in props && typeof props.href === "string") {
    const {
      href,
      variant: _v,
      size: _s,
      className: _c,
      children,
      ...linkRest
    } = props;
    void _v;
    void _s;
    void _c;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    variant: _v,
    size: _s,
    className: _c,
    ...buttonRest
  } = props as ButtonAsButtonProps;
  void _v;
  void _s;
  void _c;

  return <button type={type} className={classes} {...buttonRest} />;
}

export default Button;
