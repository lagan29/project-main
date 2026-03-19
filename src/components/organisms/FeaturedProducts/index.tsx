"use client";

import ProductCard from "@/components/molecules/ProductCard";
import type { FeaturedProductsProps } from "./types";

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 bg-base-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-text-300 mb-10">
          Our Collection
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
