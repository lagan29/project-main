"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import React from "react";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center px-6 py-6 bg-base-50 border-b border-neutral-100">
      <Link href="/" className="text-2xl font-serif text-text-300">
        FEMORA
      </Link>

      <div className="flex items-center gap-8">
        <Link href="/products" className="text-text-200 hover:text-text-300">
          Shop
        </Link>

        <Link
          href="/cart"
          className="relative text-text-300 hover:text-text-200"
        >
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-4 bg-navy-200 text-white text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
