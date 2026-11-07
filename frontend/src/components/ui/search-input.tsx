"use client";

import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cx } from "@/utils/cx";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  shortcut?: string;
  enableSlashFocus?: boolean;
}

export function SearchInput({
  value,
  onChange,
  shortcut = "/",
  enableSlashFocus = false,
  placeholder = "Cari instrumen, tipe board, atau lokasi COD...",
  className,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!enableSlashFocus) return;
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;
      if (!isInput && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableSlashFocus]);

  return (
    <div className={cx("relative flex items-center", className)}>
      <Search className="pointer-events-none absolute left-3.5 size-4 text-[#78756F]" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-[#DCD8CE] bg-white pl-10 pr-20 text-sm text-[#141413] placeholder:text-[#8E8B83] transition focus:border-[#141413] focus:outline-none focus:ring-2 focus:ring-[#141413]/10"
        {...props}
      />
      <div className="absolute right-2.5 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            aria-label="Bersihkan pencarian"
            className="flex h-6 w-6 items-center justify-center rounded-md text-[#78756F] hover:bg-[#EFECE6] hover:text-[#141413] transition"
          >
            <X className="size-3.5" />
          </button>
        ) : (
          shortcut && (
            <kbd className="pointer-events-none rounded border border-[#DCD8CE] bg-[#F6F5F0] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#78756F]">
              {shortcut}
            </kbd>
          )
        )}
      </div>
    </div>
  );
}

export default SearchInput;
