"use client";

import { useEffect } from "react";
import { useCartToastStore } from "@/store/cartToast";

const AUTO_HIDE_MS = 3500;

export default function CartAddedToast() {
  const visible = useCartToastStore((s) => s.visible);
  const productTitle = useCartToastStore((s) => s.productTitle);
  const nonce = useCartToastStore((s) => s.nonce);
  const hide = useCartToastStore((s) => s.hide);

  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(hide, AUTO_HIDE_MS);
    return () => window.clearTimeout(t);
  }, [visible, nonce, hide]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-200 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-center px-2 sm:px-0"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto cart-toast-pop flex items-start gap-3 rounded-2xl border border-pink-100/80 bg-[#fff9f5] px-4 py-3 shadow-lg shadow-navy-200/10">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-200/25 text-lg"
          aria-hidden
        >
          ✓
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-navy-200">Added to cart</p>
          <p className="mt-0.5 truncate text-sm text-text-200" title={productTitle}>
            <span className="font-medium text-text-300">{productTitle}</span>
            <span className="text-text-200"> is waiting in your bag</span>
          </p>
        </div>
      </div>
    </div>
  );
}
