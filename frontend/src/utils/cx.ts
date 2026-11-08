import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            color: [
                "canvas",
                "surface",
                "surface-subtle",
                "surface-muted",
                "surface-strong",
                "hairline",
                "ink",
                "ink-elevated",
                "ink-border",
                "ink-muted",
                "ink-subtle",
                "ink-faint",
                "ink-inverse-muted",
                "ink-inverse-subtle",
                "accent",
                "accent-hover",
                "accent-subtle",
                "accent-ink",
                "forest",
                "forest-hover",
                "forest-subtle",
                "warning",
                "warning-ink",
                "warning-subtle",
                "warning-border",
                "danger",
                "danger-hover",
                "danger-subtle",
                "danger-border",
            ],
            shadow: ["card", "popover"],
            text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"],
        },
    },
});

/**
 * This function is a wrapper around the twMerge function.
 * It is used to merge the classes inside style objects.
 */
export const cx = twMerge;

/**
 * This function does nothing besides helping us to be able to
 * sort the classes inside style objects which is not supported
 * by the Tailwind IntelliSense by default.
 */
export function sortCx<T extends Record<string, string | number | Record<string, string | number | Record<string, string | number>>>>(classes: T): T {
    return classes;
}
