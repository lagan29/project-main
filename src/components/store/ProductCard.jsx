"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border border-base-200 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-base-50">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="w-full h-48 object-cover rounded-md"
      />

      <h2 className="text-lg font-semibold mt-3 text-text-300">{product.name}</h2>
      <p className="text-text-100 mt-1">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-navy-200 text-white px-4 py-2 rounded hover:bg-navy-100 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}