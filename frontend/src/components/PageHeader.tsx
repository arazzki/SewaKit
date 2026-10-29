import React from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="border-b border-[#DCD8CE] bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6 py-7">
        <div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#C83E2B]">
            {eyebrow}
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#141413] sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 max-w-2xl text-sm text-[#575653]">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
      </div>
    </div>
  );
}
