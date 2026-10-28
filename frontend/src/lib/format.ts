/**
 * Format angka menjadi Rupiah, contoh: 15000 -> "Rp15.000".
 * Ditulis manual (tanpa Intl) supaya hasilnya selalu sama di server dan browser.
 */
export function formatRupiah(value: number): string {
  const rounded = Math.round(value);
  const withDots = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp${withDots}`;
}
