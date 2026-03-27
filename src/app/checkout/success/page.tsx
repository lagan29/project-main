"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <h1 className="font-serif text-3xl text-text-300">Thank you</h1>
      <p className="mt-4 text-text-200">
        Your payment was successful. A confirmation email may follow from Stripe.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-medium text-navy-200 hover:underline"
      >
        Continue shopping
      </Link>
    </div>
  );
}
