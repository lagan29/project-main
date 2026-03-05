"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "olive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium transition duration-300 focus:outline-none cursor-pointer";

    const variants: Record<ButtonVariant, string> = {
      primary: "bg-navy-200 text-white hover:bg-navy-100",
      secondary:
        "border border-text-300 text-text-300 hover:bg-text-300 hover:text-white",
      accent: "bg-pink-200 text-white hover:opacity-90",
      olive: "bg-olive-200 text-white hover:opacity-90",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
