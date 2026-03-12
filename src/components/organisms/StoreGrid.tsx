import ProductCard from "@/components/molecules/ProductCard";
import type { Product } from "@/types";

type Props = {
  products: Product[];
};

export default function StoreGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}