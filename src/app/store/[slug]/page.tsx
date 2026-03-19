import { notFound } from "next/navigation";
import { getProductBySlugOrId, getProducts } from "@/lib/api";
import ProductDetailView from "@/components/organisms/Shop/ProductDetailView";
import type { CatalogProduct } from "@/components/organisms/Shop/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function toDetailProduct(row: Record<string, unknown> | null): CatalogProduct | null {
  if (
    !row ||
    typeof row.id !== "string" ||
    typeof row.title !== "string" ||
    typeof row.price !== "number"
  ) {
    return null;
  }
  const image =
    (row.image as string) ??
    (row.image_url as string) ??
    (row.product_images as { image_url: string }[] | undefined)?.[0]?.image_url ??
    "";
  const slug =
    typeof row.slug === "string" && row.slug.trim() ? row.slug.trim() : undefined;

  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    image_url: image,
    slug,
  };
}

export default async function StoreProductPage({ params }: PageProps) {
  const { slug: slugParam } = await params;
  const decoded = decodeURIComponent(slugParam);
  const row = await getProductBySlugOrId(decoded);
  const product = toDetailProduct(row as Record<string, unknown>);
  if (!product) notFound();

  const allProducts = await getProducts();
  const moreProducts = (allProducts as Record<string, unknown>[])
    .filter((p) => p.id !== product.id)
    .map((p) => toDetailProduct(p))
    .filter((p): p is CatalogProduct => p !== null)
    .slice(0, 8);

  return <ProductDetailView product={product} moreProducts={moreProducts} />;
}
