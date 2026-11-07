import React from "react";
import { cx } from "@/utils/cx";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  className?: string;
  render: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  emptyTitle?: string;
  emptyDescription?: string;
  toolbar?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyTitle = "Tidak ada data yang cocok",
  emptyDescription = "Ubah kata kunci pencarian atau filter yang aktif.",
  toolbar,
  footer,
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-2xl border border-[#DCD8CE] bg-white",
        className,
      )}
    >
      {toolbar && (
        <div className="border-b border-[#EFECE6] px-5 py-4">{toolbar}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#DCD8CE] bg-[#F6F5F0] font-mono text-[11px] uppercase tracking-wider text-[#78756F]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cx(
                    "px-5 py-3 font-semibold whitespace-nowrap",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE6]">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={rowKey(row, index)}
                  className="transition-colors hover:bg-[#FBF9F5]"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cx(
                        "px-5 py-3.5 align-middle text-xs text-[#141413]",
                        col.align === "right" && "text-right",
                        col.align === "center" && "text-center",
                        col.className,
                      )}
                    >
                      {col.render(row, index)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center"
                >
                  <p className="text-sm font-semibold text-[#141413]">
                    {emptyTitle}
                  </p>
                  <p className="mt-1 text-xs text-[#78756F]">
                    {emptyDescription}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {footer && (
        <div className="border-t border-[#EFECE6] bg-[#FBF9F5] px-5 py-3 text-xs text-[#78756F]">
          {footer}
        </div>
      )}
    </div>
  );
}

export default DataTable;
