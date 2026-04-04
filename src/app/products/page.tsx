import ProductGrid from "@/components/organisms/Shop/ProductGrid";
import { getProducts } from "@/lib/api";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <h1 className="text-4xl sm:text-5xl font-serif text-text-300 mb-3 text-center">
        Shop
      </h1>
      <p className="text-center text-text-200 mb-12 max-w-xl mx-auto text-sm sm:text-base">
        Browse the full collection.
      </p>

      {products.length === 0 ? (
        <p className="text-center text-text-200">No products yet.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}
