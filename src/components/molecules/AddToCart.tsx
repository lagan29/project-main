"use client";

import Button from "@/components/atoms/Button";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import React from "react";  

interface AddToCartButtonProps {
  product: Product;
} 

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button variant="primary" size="lg" onClick={() => addToCart(product)}>
      Add to Cart
    </Button>
  );
}
