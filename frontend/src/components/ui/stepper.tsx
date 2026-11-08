import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { cx } from "@/utils/cx";

export interface StepItem {
  key: string;
  code?: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: readonly StepItem[];
  currentIndex: number;
  status?: "normal" | "completed" | "dispute";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Stepper({
  steps,
  currentIndex,
  status = "normal",
  orientation = "horizontal",
  className,
}: StepperProps) {
  if (orientation === "vertical") {
    return (
      <ol className={cx("space-y-3", className)}>
        {steps.map((step, index) => {
          const isDone =
            status === "completed" ? true : index < currentIndex;
          const isDisputeStep =
            status === "dispute" && index === steps.length - 1;
          const isActive =
            status === "normal" && index === currentIndex;

          return (
            <li key={step.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cx(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold transition",
                    isDisputeStep
                      ? "border-danger bg-danger text-white"
                      : isDone
                        ? "border-ink bg-ink text-canvas"
                        : isActive
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-hairline bg-canvas text-ink-subtle",
                  )}
                >
                  {isDisputeStep ? (
                    <AlertTriangle className="size-3.5" />
                  ) : isDone ? (
                    <Check className="size-3.5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cx(
                      "mt-1 h-5 w-px",
                      isDone ? "bg-ink" : "bg-hairline",
                    )}
                  />
                )}
              </div>
              <div className="pt-0.5">
                <p
                  className={cx(
                    "text-xs font-semibold",
                    isDisputeStep
                      ? "text-danger"
                      : isActive
                        ? "text-accent"
                        : isDone
                          ? "text-ink"
                          : "text-ink-subtle",
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-ink-subtle">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol
      className={cx(
        "grid grid-cols-2 gap-2.5 sm:grid-cols-4",
        className,
      )}
    >
      {steps.map((step, index) => {
        const isDone =
          status === "completed" ? true : index < currentIndex;
        const isDisputeStep =
          status === "dispute" && index === steps.length - 1;
        const isActive =
          status === "normal" && index === currentIndex;

        return (
          <li
            key={step.key}
            className={cx(
              "rounded-xl border p-3 transition",
              isDisputeStep
                ? "border-danger-border bg-danger-subtle"
                : isActive
                  ? "border-accent bg-surface-subtle"
                  : isDone
                    ? "border-ink/25 bg-surface"
                    : "border-hairline bg-canvas/70",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={cx(
                  "text-xs font-semibold",
                  isDisputeStep
                    ? "text-danger"
                    : isActive
                      ? "text-accent"
                      : isDone
                        ? "text-forest"
                        : "text-ink-subtle",
                )}
              >
                {step.code ?? `Tahap ${index + 1}`}
              </span>
              <span
                className={cx(
                  "flex h-5 w-5 items-center justify-center rounded-md border font-mono text-xs font-bold",
                  isDisputeStep
                    ? "border-danger bg-danger text-white"
                    : isDone
                      ? "border-forest bg-forest text-white"
                      : isActive
                        ? "border-accent bg-accent text-white"
                        : "border-hairline bg-surface text-ink-subtle",
                )}
              >
                {isDisputeStep ? (
                  <AlertTriangle className="size-3" />
                ) : isDone ? (
                  <Check className="size-3" />
                ) : (
                  index + 1
                )}
              </span>
            </div>
            <p
              className={cx(
                "mt-1.5 text-xs font-semibold leading-snug",
                isDisputeStep
                  ? "text-danger"
                  : isActive || isDone
                    ? "text-ink"
                    : "text-ink-subtle",
              )}
            >
              {step.label}
            </p>
            {step.description && (
              <p className="mt-0.5 text-xs text-ink-subtle line-clamp-1">
                {step.description}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default Stepper;
