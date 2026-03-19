"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { ShoppingBag } from "lucide-react";
import Button from "@/components/atoms/Button";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // optimized Zustand selector
  const totalItems = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

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
        />

        <Button type="submit" variant="primary" size="md" className="ml-2">
          Search
        </Button>
      </form>

      <div className="flex items-center gap-8">
        
        <Link href="/products" className="text-text-200 hover:text-text-300">
          Shop
        </Link>

        <Link
          href="/cart"
          className="relative flex items-center text-text-300 hover:text-text-200"
        >
          <ShoppingBag className="w-6 h-6" />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-navy-200 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}