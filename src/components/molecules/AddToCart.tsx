"use client";

import Button from "@/components/atoms/Button";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";
import React from "react";  

interface AddToCartButtonProps {
  product: Product;
} 

function getProductImageUrl(product: Product): string {
  return (
    product.image_url ??
    product.product_images?.[0]?.image_url ??
    ""
  );
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={() =>
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image_url: getProductImageUrl(product),
          ...(product.slug?.trim() ? { slug: product.slug.trim() } : {}),
        })
      }
    >
      Add to Cart
    </Button>
  );
}
