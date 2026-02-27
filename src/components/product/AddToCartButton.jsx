"use client";

import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button
      variant="primary"
      size="lg"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </Button>
  );
}