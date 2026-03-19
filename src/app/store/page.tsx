import StoreGrid from "@/components/organisms/StoreGrid";
import { getProducts } from "@/lib/api";

export default async function StorePage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8 text-text-300">
        Store
      </h1>
      <StoreGrid products={products ?? []} />
    </div>
  );
}
