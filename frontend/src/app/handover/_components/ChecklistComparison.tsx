import type { ChecklistRecord, ItemCondition, RentalComponent } from "@/data/dummyHandovers";
import { ConditionBadge } from "./Badges";

const SEVERITY: Record<ItemCondition, number> = { BAIK: 0, RUSAK: 1, HILANG: 2 };

/**
 * Tabel kondisi setiap komponen saat diambil dan (jika ada) saat dikembalikan.
 * Baris yang kondisinya memburuk ditandai, karena itulah dasar perhitungan denda.
 */
export default function ChecklistComparison({
  components,
  pickup,
  returned,
}: {
  components: RentalComponent[];
  pickup?: ChecklistRecord;
  returned?: ChecklistRecord;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-4 py-2.5 font-medium">Komponen</th>
            <th className="px-4 py-2.5 font-medium">Saat diambil</th>
            {returned && <th className="px-4 py-2.5 font-medium">Saat dikembalikan</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {components.map((component) => {
            const before = pickup?.entries.find((entry) => entry.componentId === component.id);
            const after = returned?.entries.find((entry) => entry.componentId === component.id);
            const worsened =
              before !== undefined && after !== undefined && SEVERITY[after.condition] > SEVERITY[before.condition];

            return (
              <tr key={component.id} className={worsened ? "bg-rose-50/60" : undefined}>
                <td className="px-4 py-3 align-top font-medium text-slate-900">
                  {component.name}
                  {worsened && <span className="mt-1 block text-xs font-semibold text-rose-700">Kondisi berubah</span>}
                </td>
                <td className="px-4 py-3 align-top">
                  {before ? (
                    <>
                      <ConditionBadge condition={before.condition} />
                      {before.note && <p className="mt-1 text-xs text-slate-500">{before.note}</p>}
                    </>
                  ) : (
                    <span className="text-xs text-slate-400">Belum diisi</span>
                  )}
                </td>
                {returned && (
                  <td className="px-4 py-3 align-top">
                    {after ? (
                      <>
                        <ConditionBadge condition={after.condition} />
                        {after.note && <p className="mt-1 text-xs text-slate-500">{after.note}</p>}
                      </>
                    ) : (
                      <span className="text-xs text-slate-400">Belum diisi</span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Jumlah komponen yang kondisinya memburuk antara pengambilan dan pengembalian. */
export function countWorsened(pickup?: ChecklistRecord, returned?: ChecklistRecord): number {
  if (!pickup || !returned) return 0;
  return returned.entries.filter((after) => {
    const before = pickup.entries.find((entry) => entry.componentId === after.componentId);
    return before !== undefined && SEVERITY[after.condition] > SEVERITY[before.condition];
  }).length;
}
