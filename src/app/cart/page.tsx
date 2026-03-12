"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Button from "@/components/atoms/Button";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-serif text-text-300">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-serif text-text-300 mb-12">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 border-b border-neutral-100 pb-8"
            >
              <div className="w-32 h-40 relative rounded-lg overflow-hidden bg-neutral-100">
                <Image
                  src={item.image_url ?? item.image ?? ""}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-medium text-text-300">
                    {item.name}
                  </h3>

                  <p className="text-text-200 mt-2">₹ {item.price}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 border border-neutral-200 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>

                    <span className="text-text-300 font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 border border-neutral-200 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-pink-200 hover:text-pink-100 mt-4 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-100 p-8 rounded-2xl h-fit">
          <h2 className="text-xl font-medium text-text-300 mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between text-text-200 mb-4">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className="border-t border-neutral-200 pt-4 mt-4">
            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
