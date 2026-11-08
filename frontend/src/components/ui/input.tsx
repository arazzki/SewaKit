import React from "react";
import { cx } from "@/utils/cx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightSlot, className, ...props }, ref) => {
    if (!leftIcon && !rightSlot) {
      return (
        <input
          ref={ref}
          className={cx(
            "h-10 w-full rounded-xl border border-hairline bg-surface px-3.5 py-2 text-sm text-ink placeholder:text-ink-faint transition focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-subtle",
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3.5 flex items-center text-ink-subtle">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cx(
            "h-10 w-full rounded-xl border border-hairline bg-surface py-2 text-sm text-ink placeholder:text-ink-faint transition focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-subtle",
            leftIcon ? "pl-10" : "px-3.5",
            rightSlot ? "pr-16" : "pr-3.5",
            className,
          )}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-2.5 flex items-center gap-1">{rightSlot}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
