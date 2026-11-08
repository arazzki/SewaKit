import React from "react";
import { cx } from "@/utils/cx";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <span className="text-xs font-semibold text-accent">
            {eyebrow}
          </span>
        )}
        <h2
          className={cx(
            "text-2xl font-bold tracking-tight text-ink sm:text-3xl",
            eyebrow && "mt-1",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeading;
