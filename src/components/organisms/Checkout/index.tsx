"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import Button from "@/components/atoms/Button";
import Loader from "@/components/atoms/Loader";
import { toast, Toaster } from "react-hot-toast";

export default function Checkout() {
  const router = useRouter();
  const cart = useCartStore((s) => s.cart);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      router.push("/cart");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            title: item.size ? `${item.title} (${item.size})` : item.title,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) {
        toast.error(data.error ?? "Payment could not be started.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      toast.error("No redirect URL returned.");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-serif text-2xl text-charcoal-300">Checkout</h1>
        <p className="mt-4 text-charcoal-100">Your cart is empty.</p>
        <Link
          href="/cart"
          className="mt-6 inline-block text-sm font-medium text-navy-200 hover:underline"
        >
          Return to cart
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg py-12 sm:py-16">
      <Toaster position="top-center" />

      <h1 className="font-serif text-3xl text-charcoal-300">Payment</h1>
      <p className="mt-2 text-sm text-charcoal-100">
        You’ll complete card details on Stripe’s secure page. Totals match your
        cart.
      </p>

      <div className="mt-10 rounded-2xl border border-neutral-100 bg-base-100 p-6 shadow-sm">
        <div className="flex flex-col gap-1 border-b border-neutral-100 pb-4">
          <span className="text-sm text-charcoal-100">Amount due</span>
          <span className="font-serif text-3xl text-charcoal-300">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="mt-4 text-xs text-neutral-200">
          Shipping and taxes (if any) are handled on the next step. Currency:
          INR.
        </p>

        <Button
          type="button"
          variant="primary"
          size="lg"
          className="mt-8 w-full gap-2"
          disabled={loading}
          onClick={pay}
        >
          {loading ? (
            <>
              <Loader variant="bare" label="Redirecting to payment" />
              Redirecting…
            </>
          ) : (
            "Pay with card"
          )}
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-charcoal-100">
        <Link href="/cart" className="text-navy-200 hover:underline">
          ← Back to cart
        </Link>
      </p>
    </div>
  );
}
