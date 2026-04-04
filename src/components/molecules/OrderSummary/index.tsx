"use client";

import Image from "next/image";
import type { OrderSummaryProps } from "./types";
import Button from "@/components/atoms/Button";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect fill='%23e5e5e5' width='80' height='80'/%3E%3C/svg%3E";

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  buttonText,
  onButtonClick,
  isLoading = false,
}: OrderSummaryProps) {
  const total = subtotal + shipping;

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-3xl text-text-300">Order Summary</h2>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item) => {
            const img = (item.image_url ?? item.image)?.trim();
            return (
              <div
                key={`${item.id}-${item.size ?? ""}`}
                className="flex items-start gap-4 border-b border-black/10 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={img || PLACEHOLDER}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized={
                      !img ||
                      (!img.startsWith("http") && !img.startsWith("/"))
                    }
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium text-text-300">
                    {item.title}
                  </h3>

                  {item.size ? (
                    <p className="mt-1 text-sm text-text-200">
                      Size: {item.size}
                    </p>
                  ) : null}

                  <p className="mt-1 text-sm text-text-200">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 text-sm font-medium text-text-300">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 space-y-3 border-t border-black/10 pt-4">
        <div className="flex items-center justify-between text-sm text-text-200">
          <span>Subtotal</span>
          <span className="font-medium text-text-300">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-text-200">
          <span>Shipping</span>
          <span className="font-medium text-text-300">
            ₹{shipping.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-black/10 pt-3 text-lg font-semibold text-text-300">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={onButtonClick}
        disabled={isLoading || items.length === 0}
        className="mt-6 w-full rounded-xl bg-text-300 px-5 py-3 text-white transition disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Processing..." : buttonText}
      </Button>
    </div>
  );
}
