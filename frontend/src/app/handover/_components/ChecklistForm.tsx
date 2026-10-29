"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChecklistRecord, ItemCondition, RentalComponent } from "@/data/dummyHandovers";

type Draft = Record<string, { condition: ItemCondition | ""; note: string }>;

const CONDITION_OPTIONS: { value: ItemCondition; label: string }[] = [
  { value: "BAIK", label: "Baik" },
  { value: "RUSAK", label: "Rusak" },
  { value: "HILANG", label: "Hilang" },
];

/**
 * Form checklist kondisi barang. Dipakai saat pengambilan (diisi Penyewa)
 * dan saat pengembalian (diisi Pemilik).
 *
 * Catatan: foto sementara hanya ditampilkan sebagai pratinjau di browser.
 * Penyimpanan ke server dilakukan setelah API upload tersedia.
 */
export default function ChecklistForm({
  components,
  filledBy,
  submitLabel,
  onSubmit,
}: {
  components: RentalComponent[];
  filledBy: ChecklistRecord["filledBy"];
  submitLabel: string;
  onSubmit: (record: ChecklistRecord) => void;
}) {
  const [draft, setDraft] = useState<Draft>(() =>
    Object.fromEntries(components.map((component) => [component.id, { condition: "", note: "" }])),
  );
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);
  const [generalNote, setGeneralNote] = useState("");
  const [error, setError] = useState("");

  function updateEntry(componentId: string, changes: Partial<Draft[string]>) {
    setDraft((current) => ({ ...current, [componentId]: { ...current[componentId], ...changes } }));
    setError("");
  }

  function handlePhotos(files: FileList | null) {
    if (!files) return;
    const added = Array.from(files).map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setPhotos((current) => [...current, ...added]);
    setError("");
  }

  function removePhoto(url: string) {
    URL.revokeObjectURL(url);
    setPhotos((current) => current.filter((photo) => photo.url !== url));
  }

  function handleSubmit() {
    const missingCondition = components.find((component) => draft[component.id].condition === "");
    if (missingCondition) {
      setError(`Pilih kondisi untuk "${missingCondition.name}".`);
      return;
    }
    const missingNote = components.find(
      (component) => draft[component.id].condition !== "BAIK" && draft[component.id].note.trim() === "",
    );
    if (missingNote) {
      setError(`Tulis keterangan untuk "${missingNote.name}" karena kondisinya tidak baik.`);
      return;
    }
    if (photos.length === 0) {
      setError("Unggah minimal 1 foto kondisi barang sebagai bukti.");
      return;
    }

    onSubmit({
      filledBy,
      entries: components.map((component) => ({
        componentId: component.id,
        condition: draft[component.id].condition as ItemCondition,
        note: draft[component.id].note.trim(),
      })),
      photoNames: photos.map((photo) => photo.name),
      generalNote: generalNote.trim(),
    });
  }

  return (
    <div className="space-y-4">
      <div className="divide-y divide-[#EFECE6] rounded-xl border border-[#DCD8CE] bg-white">
        {components.map((component) => {
          const entry = draft[component.id];
          return (
            <div key={component.id} className="p-4">
              <p className="text-sm font-medium text-[#141413]">{component.name}</p>
              <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={`Kondisi ${component.name}`}>
                {CONDITION_OPTIONS.map((option) => {
                  const selected = entry.condition === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => updateEntry(component.id, { condition: option.value })}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                        selected
                          ? "border-[#141413] bg-[#141413] text-white"
                          : "border-[#DCD8CE] bg-white text-[#575653] hover:border-indigo-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {entry.condition !== "" && entry.condition !== "BAIK" && (
                <input
                  type="text"
                  value={entry.note}
                  onChange={(event) => updateEntry(component.id, { note: event.target.value })}
                  placeholder="Jelaskan kerusakan atau kekurangannya"
                  className="mt-2 w-full rounded-lg border border-[#DCD8CE] px-3 py-2 text-sm focus:border-[#141413] focus:outline-none focus:ring-2 focus:ring-[#141413]/15"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-[#DCD8CE] bg-white p-4">
        <p className="text-sm font-medium text-[#141413]">Foto kondisi barang</p>
        <p className="mt-0.5 text-xs text-[#575653]">Minimal 1 foto. Foto ini menjadi bukti jika terjadi sengketa.</p>
        <label className="mt-3 inline-block cursor-pointer rounded-lg border border-[#DCD8CE] px-3 py-2 text-xs font-semibold text-[#575653] hover:border-indigo-400">
          Pilih foto
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => {
              handlePhotos(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
        {photos.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {photos.map((photo) => (
              <div key={photo.url} className="relative">
                <Image
                  src={photo.url}
                  alt={photo.name}
                  width={96}
                  height={96}
                  unoptimized
                  className="h-24 w-24 rounded-lg border border-[#DCD8CE] object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.url)}
                  aria-label={`Hapus foto ${photo.name}`}
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-slate-900 text-xs font-bold text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor={`note-${filledBy}`} className="text-sm font-medium text-[#141413]">
          Catatan tambahan (opsional)
        </label>
        <textarea
          id={`note-${filledBy}`}
          value={generalNote}
          onChange={(event) => setGeneralNote(event.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-[#DCD8CE] px-3 py-2 text-sm focus:border-[#141413] focus:outline-none focus:ring-2 focus:ring-[#141413]/15"
        />
      </div>

      {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-lg bg-[#141413] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#141413]"
      >
        {submitLabel}
      </button>
    </div>
  );
}
