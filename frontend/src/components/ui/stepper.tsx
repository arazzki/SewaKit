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
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] font-bold transition",
                    isDisputeStep
                      ? "border-[#B42318] bg-[#B42318] text-white"
                      : isDone
                        ? "border-[#141413] bg-[#141413] text-[#F6F5F0]"
                        : isActive
                          ? "border-[#C83E2B] bg-[#C83E2B]/10 text-[#C83E2B]"
                          : "border-[#DCD8CE] bg-[#F6F5F0] text-[#78756F]",
                  )}
                >
                  {isDisputeStep ? (
                    <AlertTriangle className="size-3.5" />
                  ) : isDone ? (
                    <Check className="size-3.5" />
                  ) : (
                    step.code ?? `0${index + 1}`
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cx(
                      "mt-1 h-5 w-px",
                      isDone ? "bg-[#141413]" : "bg-[#DCD8CE]",
                    )}
                  />
                )}
              </div>
              <div className="pt-0.5">
                <p
                  className={cx(
                    "text-xs font-semibold",
                    isDisputeStep
                      ? "text-[#B42318]"
                      : isActive
                        ? "text-[#C83E2B]"
                        : isDone
                          ? "text-[#141413]"
                          : "text-[#78756F]",
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-[11px] text-[#78756F]">
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
                ? "border-[#FECDCA] bg-[#FEF3F2]"
                : isActive
                  ? "border-[#C83E2B] bg-[#FBF9F5]"
                  : isDone
                    ? "border-[#141413]/25 bg-white"
                    : "border-[#DCD8CE] bg-[#F6F5F0]/70",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={cx(
                  "font-mono text-[10px] font-bold uppercase tracking-wider",
                  isDisputeStep
                    ? "text-[#B42318]"
                    : isActive
                      ? "text-[#C83E2B]"
                      : isDone
                        ? "text-[#1B4332]"
                        : "text-[#78756F]",
                )}
              >
                {step.code ?? `TAHAP 0${index + 1}`}
              </span>
              <span
                className={cx(
                  "flex h-5 w-5 items-center justify-center rounded-md border text-[10px] font-mono font-bold",
                  isDisputeStep
                    ? "border-[#B42318] bg-[#B42318] text-white"
                    : isDone
                      ? "border-[#1B4332] bg-[#1B4332] text-white"
                      : isActive
                        ? "border-[#C83E2B] bg-[#C83E2B] text-white"
                        : "border-[#DCD8CE] bg-white text-[#78756F]",
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
                  ? "text-[#B42318]"
                  : isActive || isDone
                    ? "text-[#141413]"
                    : "text-[#78756F]",
              )}
            >
              {step.label}
            </p>
            {step.description && (
              <p className="mt-0.5 text-[11px] text-[#78756F] line-clamp-1">
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
