"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/store?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
    } else {
      router.push("/store");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-6 bg-base-50 border-b border-neutral-100">
      <Link href="/" className="text-2xl font-serif text-text-300">
        FEMORA
      </Link>

      <form
        onSubmit={handleSearch}
        className="flex-1 max-w-md mx-8 flex items-center"
      >
        <input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-base-100 text-text-300 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-navy-200/30 focus:border-navy-200"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2.5 rounded-lg bg-navy-200 text-white text-sm font-medium hover:bg-navy-300 transition-colors"
        >
          Search
        </button>
      </form>

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
