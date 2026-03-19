import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/api";
import ProductDetailView from "@/components/organisms/StoreGrid/ProductDetailView";
import type { StoreGridProduct } from "@/components/organisms/StoreGrid/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

function toDetailProduct(row: Record<string, unknown> | null): StoreGridProduct | null {
  if (!row || typeof row.id !== "string" || typeof row.title !== "string" || typeof row.price !== "number") return null;
  const image = (row.image as string) ?? (row.image_url as string) ?? "";
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    image_url: image,
  };
}

export default async function StoreProductPage({ params }: PageProps) {
  const { id } = await params;
  const row = await getProductById(id);
  const product = toDetailProduct(row as Record<string, unknown>);
  if (!product) notFound();

  const allProducts = await getProducts();
  const moreProducts = (allProducts as Record<string, unknown>[])
    .filter((p) => p.id !== id)
    .map((p) => toDetailProduct(p))
    .filter((p): p is StoreGridProduct => p !== null);

  return <ProductDetailView product={product} moreProducts={moreProducts} />;
}
