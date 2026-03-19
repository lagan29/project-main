"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import Button from "@/components/atoms/Button";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e5e5' width='400' height='400'/%3E%3C/svg%3E";

function getProductStoreHref(item: { slug?: string; id: string }) {
  const slug = item.slug?.trim();
  if (slug) return `/store/${encodeURIComponent(slug)}`;
  return `/store/${encodeURIComponent(item.id)}`;
}

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-neutral-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-text-300 mb-2">
            Your cart is empty
          </h2>
          <p className="text-text-200 mb-8">
            Add something you like from the store.
          </p>
          <Link href="/store">
            <Button variant="primary" size="lg">
              Continue shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif text-text-300">
            Shopping Cart
          </h1>
          <p className="mt-1 text-text-200 text-sm sm:text-base">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <Link
          href="/store"
          className="text-navy-200 font-medium hover:text-navy-100 transition-colors text-sm sm:text-base"
        >
          ← Continue shopping
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
        {/* Cart items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <article
              key={`${item.id}-${item.size ?? ""}`}
              className="flex gap-4 sm:gap-6 p-4 sm:p-5 bg-base-100 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                href={getProductStoreHref(item)}
                className="w-24 h-28 sm:w-28 sm:h-32 relative rounded-xl overflow-hidden bg-neutral-100 shrink-0 ring-offset-2 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-200"
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.image_url || PLACEHOLDER_IMAGE}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </Link>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-text-300">
                      <Link
                        href={getProductStoreHref(item)}
                        className="hover:text-navy-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-200 rounded-sm"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    {item.size && (
                      <p className="text-text-200 text-sm mt-0.5">
                        Size: {item.size}
                      </p>
                    )}
                  </div>
                  <p className="text-text-300 font-medium shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>

                <p className="text-text-200 text-sm mt-0.5">
                  ₹{item.price.toLocaleString("en-IN")} each
                </p>

                <div className="mt-auto pt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-base-50 p-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id, item.size)}
                      className="w-8 h-8 min-w-8 min-h-8 p-0 shrink-0 rounded-full"
                    >
                      −
                    </Button>
                    <span className="text-text-300 font-medium min-w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => increaseQuantity(item.id, item.size)}
                      className="w-8 h-8 min-w-8 min-h-8 p-0 shrink-0 rounded-full"
                    >
                      +
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-sm text-pink-200 hover:text-pink-300 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Order summary - sticky on large screens */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-base-100 border border-neutral-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-serif text-text-300 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-text-200">
                <span>Subtotal</span>
                <span className="font-medium text-text-300">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-neutral-200 text-sm">
                Shipping and taxes calculated at checkout.
              </p>
            </div>

            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
