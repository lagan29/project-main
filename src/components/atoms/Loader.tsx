"use client";

import { Loader2 } from "lucide-react";
import clsx from "clsx";

export type LoaderProps = {
  className?: string;
  /** Accessible name (screen readers) */
  label?: string;
  /**
   * fullscreen — fixed overlay (use for blocking operations)
   * page — default for route Suspense / full-width main area
   * inline — compact block for cards, sections
   * bare — spinning icon only; pass className for spacing/size overrides
   */
  variant?: "fullscreen" | "page" | "inline" | "bare";
  /** When false, show optional message below the icon */
  showText?: boolean;
};

export default function Loader({
  className,
  label = "Loading",
  variant = "page",
  showText = true,
}: LoaderProps) {
  const sizeClass =
    variant === "bare"
      ? "h-6 w-6"
      : variant === "inline"
        ? "h-9 w-9"
        : "h-11 w-11";

  const icon = (
    <Loader2
      className={clsx("animate-spin shrink-0 text-navy-200", sizeClass)}
      strokeWidth={2}
      aria-hidden
    />
  );

  if (variant === "bare") {
    return (
      <span
        className={clsx("inline-flex items-center justify-center", className)}
        role="status"
        aria-label={label}
      >
        {icon}
      </span>
    );
  }

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-4 text-center",
        variant === "fullscreen" &&
          "fixed inset-0 z-200 bg-base-50/90 backdrop-blur-sm",
        variant === "page" && "min-h-[50vh] w-full py-20",
        variant === "inline" && "w-full py-10",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {icon}
      {showText && (
        <span className="text-sm tracking-wide text-charcoal-100">Loading…</span>
      )}
    </div>
  );
}
