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
        "overflow-hidden rounded-2xl border border-hairline bg-surface",
        className,
      )}
    >
      {toolbar && (
        <div className="border-b border-surface-muted px-5 py-4">{toolbar}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-hairline bg-canvas text-xs font-semibold text-ink-subtle">
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
          <tbody className="divide-y divide-surface-muted">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={rowKey(row, index)}
                  className="transition-colors hover:bg-surface-subtle"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cx(
                        "px-5 py-3.5 align-middle text-xs text-ink",
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
                  <p className="text-sm font-semibold text-ink">
                    {emptyTitle}
                  </p>
                  <p className="mt-1 text-xs text-ink-subtle">
                    {emptyDescription}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {footer && (
        <div className="border-t border-surface-muted bg-surface-subtle px-5 py-3 text-xs text-ink-subtle">
          {footer}
        </div>
      )}
    </div>
  );
}

export default DataTable;
