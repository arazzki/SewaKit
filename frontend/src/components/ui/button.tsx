import React from "react";
import { cx } from "@/utils/cx";

export type ButtonVariant =
  | "default"
  | "accent"
  | "forest"
  | "outline"
  | "secondary"
  | "ghost"
  | "danger";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default:
    "border border-[#141413] bg-[#141413] text-[#F6F5F0] hover:bg-[#C83E2B] hover:border-[#C83E2B] shadow-2xs",
  accent:
    "border border-[#C83E2B] bg-[#C83E2B] text-white hover:bg-[#AE3221] hover:border-[#AE3221] shadow-2xs",
  forest:
    "border border-[#1B4332] bg-[#1B4332] text-white hover:bg-[#143326] hover:border-[#143326] shadow-2xs",
  outline:
    "border border-[#DCD8CE] bg-white text-[#141413] hover:border-[#141413] hover:bg-[#FBF9F5]",
  secondary:
    "border border-[#DCD8CE] bg-[#EFECE6] text-[#141413] hover:bg-[#E4E0D6]",
  ghost:
    "border border-transparent bg-transparent text-[#575653] hover:bg-[#EFECE6] hover:text-[#141413]",
  danger:
    "border border-[#FECDCA] bg-[#FEF3F2] text-[#B42318] hover:bg-[#B42318] hover:border-[#B42318] hover:text-white",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-7 rounded-lg px-2.5 text-[11px] gap-1",
  sm: "h-8.5 rounded-lg px-3 py-1.5 text-xs gap-1.5",
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses({ variant, size, className })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export default Button;
