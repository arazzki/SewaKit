"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, X, CheckCircle2 } from "lucide-react";
import type {
  ChecklistRecord,
  ItemCondition,
  RentalComponent,
} from "@/data/dummyHandovers";

type Draft = Record<string, { condition: ItemCondition | ""; note: string }>;

const CONDITION_OPTIONS: { value: ItemCondition; label: string }[] = [
  { value: "BAIK", label: "Baik / Normal" },
  { value: "RUSAK", label: "Rusak / Cacat" },
  { value: "HILANG", label: "Hilang" },
];

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
    Object.fromEntries(
      components.map((component) => [
        component.id,
        { condition: "", note: "" },
      ]),
    ),
  );
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);
  const [generalNote, setGeneralNote] = useState("");
  const [error, setError] = useState("");

  function updateEntry(componentId: string, changes: Partial<Draft[string]>) {
    setDraft((current) => ({
      ...current,
      [componentId]: { ...current[componentId], ...changes },
    }));
    setError("");
  }

  function markAllGood() {
    setDraft(
      Object.fromEntries(
        components.map((component) => [
          component.id,
          { condition: "BAIK" as ItemCondition, note: "" },
        ]),
      ),
    );
    setError("");
  }

  function handlePhotos(files: FileList | null) {
    if (!files) return;
    const added = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPhotos((current) => [...current, ...added]);
    setError("");
  }

  function removePhoto(url: string) {
    URL.revokeObjectURL(url);
    setPhotos((current) => current.filter((photo) => photo.url !== url));
  }

  function handleSubmit() {
    const missingCondition = components.find(
      (component) => draft[component.id].condition === "",
    );
    if (missingCondition) {
      setError(`Pilih status kondisi untuk "${missingCondition.name}".`);
      return;
    }
    const missingNote = components.find(
      (component) =>
        draft[component.id].condition !== "BAIK" &&
        draft[component.id].note.trim() === "",
    );
    if (missingNote) {
      setError(
        `Tulis catatan detail untuk "${missingNote.name}" karena tidak berstatus Baik.`,
      );
      return;
    }
    if (photos.length === 0) {
      setError("Unggah minimal 1 foto dokumentasi kondisi fisik barang.");
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
      <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
        <div className="flex items-center justify-between border-b border-surface-muted bg-surface-subtle px-4 py-2.5">
          <span className="text-xs font-semibold text-ink-subtle">
            DAFTAR PEMERIKSAAN KOMPONEN ({components.length})
          </span>
          <button
            type="button"
            onClick={markAllGood}
            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-forest hover:underline"
          >
            <CheckCircle2 className="size-3.5" />
            <span>Tandai Semua Baik</span>
          </button>
        </div>

        <div className="divide-y divide-surface-muted">
          {components.map((component) => {
            const entry = draft[component.id];
            return (
              <div key={component.id} className="p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <p className="text-xs font-semibold text-ink sm:text-sm">
                    {component.name}
                  </p>
                  <div
                    className="flex flex-wrap gap-1.5"
                    role="radiogroup"
                    aria-label={`Kondisi ${component.name}`}
                  >
                    {CONDITION_OPTIONS.map((option) => {
                      const selected = entry.condition === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() =>
                            updateEntry(component.id, {
                              condition: option.value,
                            })
                          }
                          className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                            selected
                              ? "border-ink bg-ink text-canvas"
                              : "border-hairline bg-surface text-ink-muted hover:border-ink"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {entry.condition !== "" && entry.condition !== "BAIK" && (
                  <input
                    type="text"
                    value={entry.note}
                    onChange={(event) =>
                      updateEntry(component.id, { note: event.target.value })
                    }
                    placeholder="Jelaskan detail goresan, kerusakan, atau kekurangan komponen..."
                    className="mt-2.5 w-full rounded-lg border border-hairline bg-surface-subtle px-3 py-2 text-xs text-ink focus:border-ink focus:bg-surface focus:outline-none"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Origin UI-Style Dropzone for Inspection Photos */}
      <div className="rounded-xl border border-dashed border-hairline bg-surface-subtle p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-ink">
              Dokumentasi Foto Inspeksi Fisik (Wajib)
            </p>
            <p className="mt-0.5 text-xs text-ink-muted">
              Ambil foto kondisi unit dan kelengkapan kabel di titik temu COD kampus.
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-hairline bg-surface px-3.5 py-2 text-xs font-medium text-ink transition hover:border-ink">
            <Camera className="size-3.5 text-accent" />
            <span>Unggah Foto Bukti</span>
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
        </div>

        {photos.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-3 border-t border-surface-muted pt-3.5">
            {photos.map((photo) => (
              <div key={photo.url} className="relative">
                <Image
                  src={photo.url}
                  alt={photo.name}
                  width={88}
                  height={88}
                  unoptimized
                  className="h-22 w-22 rounded-xl border border-hairline object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.url)}
                  aria-label={`Hapus foto ${photo.name}`}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white hover:bg-accent"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor={`note-${filledBy}`}
          className="block text-xs font-medium text-ink-muted"
        >
          Catatan Tambahan Serah Terima (Opsional)
        </label>
        <textarea
          id={`note-${filledBy}`}
          value={generalNote}
          onChange={(event) => setGeneralNote(event.target.value)}
          rows={2}
          placeholder="Contoh: Unit dites menyala normal bersama pemilik di meja Lobi TULT."
          className="mt-1.5 w-full rounded-xl border border-hairline bg-surface px-3.5 py-2 text-xs text-ink focus:border-ink focus:outline-none"
        />
      </div>

      {error && (
        <p className="text-xs font-semibold text-danger">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-canvas transition hover:bg-accent"
      >
        {submitLabel}
      </button>
    </div>
  );
}
