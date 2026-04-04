"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import Button from "@/components/atoms/Button";
import { useSession } from "@/hooks/useSession";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const loginHref =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")
      ? "/auth/login"
      : `/auth/login?redirect=${encodeURIComponent(pathname || "/")}`;

  const { user } = useSession();
  const supabase = createSupabaseClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

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
    <nav className="w-full border-b border-neutral-100 bg-base-50">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-serif text-text-300">
          FEMORA
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 mx-8 items-center"
        >
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-base-100 text-text-300 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-navy-200/30"
          />

          <Button type="submit" variant="primary" size="md" className="ml-2">
            Search
          </Button>
        </form>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/products" className="text-text-200 hover:text-text-300">
            Shop
          </Link>

          {/* Cart */}
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

          {/* Auth */}
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center justify-center rounded-full p-2 text-text-300 hover:bg-neutral-100 hover:text-navy-200 transition-colors"
                aria-label="Account"
              >
                <User className="w-6 h-6" strokeWidth={1.75} />
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="text-sm px-3 py-1 border border-neutral-200 rounded-lg hover:bg-neutral-100"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href={loginHref}>
              <Button
                variant="secondary"
                size="sm"
                className="text-sm px-4 py-2 border rounded-lg"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="secondary" size="sm" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 border-t">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <Button type="submit">Go</Button>
          </form>

          <Link href="/products">Shop</Link>
          <Link href="/cart">Cart ({totalItems})</Link>

          {/* Auth Mobile */}
          {user ? (
            <>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-full p-2 text-text-300 hover:bg-neutral-100 w-fit"
                aria-label="Account"
              >
                <User className="w-6 h-6 shrink-0" strokeWidth={1.75} />
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="border border-neutral-200 px-3 py-2 rounded-lg text-left hover:bg-neutral-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href={loginHref} className="inline-flex">
              <Button
                variant="secondary"
                size="sm"
                className="text-sm px-4 py-2 border rounded-lg w-full justify-center"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
