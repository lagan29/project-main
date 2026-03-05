import Image from "next/image";
import type { Product } from "@/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const image = product.product_images?.[0]?.image_url;

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-4/5 overflow-hidden rounded-xl">
        <Image
          src={image ?? ""}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <h3 className="text-lg font-medium">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500">
          {product.categories?.[0]?.name}
        </p>

        <p className="mt-1 font-semibold">
          ₹{product.price}
        </p>
      </div>

    </div>
  );
}