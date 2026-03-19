"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { useCartStore } from "@/store/cart";
import { STORE_SIZES } from "@/lib/storeProducts";
import type { CatalogProduct } from "./types";

type ProductDetailViewProps = {
  product: CatalogProduct;
  moreProducts: CatalogProduct[];
};

export default function ProductDetailView({ product, moreProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  const inCartQty = cart
    .filter((item) => item.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = inCartQty > 0;

  return (
    <div className="mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-neutral-100">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="flex flex-row text-3xl md:text-4xl font-serif text-text-300 justify-center!important items-center!important">{product.title}</h1>
          <p className="mt-4 text-2xl text-text-200">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="mt-8">
            <p className="text-sm font-medium text-text-300 mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {STORE_SIZES.map((size) => (
                <Button
                  key={size}
                  type="button"
                  variant={selectedSize === size ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className="w-12 h-12 min-w-12 min-h-12 p-0"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            {sizeError && !selectedSize && (
              <p
                id="pdp-size-hint"
                className="text-sm text-pink-200 font-medium"
                role="alert"
              >
                Please select size
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={sizeError && !selectedSize}
                aria-describedby={
                  sizeError && !selectedSize ? "pdp-size-hint" : undefined
                }
                onClick={() => {
                  if (!selectedSize) {
                    setSizeError(true);
                    return;
                  }
                  addToCart({ ...product, size: selectedSize });
                }}
              >
                Add to Cart
              </Button>
              {isInCart && (
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  onClick={() => router.push("/cart")}
                >
                  View cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {moreProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif text-text-300 mb-8">More products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moreProducts.map((p) => (
              <Link
                key={p.id}
                href={
                  p.slug?.trim()
                    ? `/store/${encodeURIComponent(p.slug.trim())}`
                    : `/store/${encodeURIComponent(p.id)}`
                }
                className="group bg-base-100 rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative aspect-3/4">
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-text-300 group-hover:text-text-200">{p.title}</h3>
                  <p className="text-text-200 text-sm mt-1">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
