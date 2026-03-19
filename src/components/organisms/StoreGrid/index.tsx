"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { useCartStore } from "@/store/cartStore";
import type { StoreGridProps } from "./types";

type ProductItem = NonNullable<StoreGridProps["products"]>[number];

function getProductImageUrl(product: ProductItem): string {
  const p = product as {
    image?: string;
    image_url?: string;
    product_images?: { image_url: string }[];
  };
  return p.image ?? p.image_url ?? p.product_images?.[0]?.image_url ?? "";
}

export default function StoreGrid({ products: productsProp = [] }: StoreGridProps) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const products = productsProp;

  const getCartQuantity = (productId: string) => {
    return cart
      .filter((i) => i.id === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  return (
    <section className="py-16 px-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const imageUrl = getProductImageUrl(product);
          const inCartQty = getCartQuantity(product.id);
          const isInCart = inCartQty > 0;
          const cartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            image_url: imageUrl,
          };

          return (
            <div
              key={product.id}
              className="bg-base-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition border border-neutral-100"
            >
              <Link href={`/store/${product.id}`} className="block">
                <div className="relative w-full aspect-3/4">
                  <Image
                    src={imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23e5e5e5' width='400' height='400'/%3E%3C/svg%3E"}
                    alt={product.title}
                    fill
                    sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 pt-3">
                  <h3 className="text-lg font-medium text-text-300 hover:text-text-200">
                    {product.title}
                  </h3>
                  <p className="text-text-200 mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>

              <div className="px-4 pb-4">
                {isInCart ? (
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full"
                    onClick={() => router.push("/cart")}
                  >
                    {inCartQty} move to cart
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => addToCart(cartProduct)}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
