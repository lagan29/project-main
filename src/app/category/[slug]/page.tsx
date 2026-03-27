import type { Metadata } from "next";
import ProductGrid from "@/components/organisms/Shop/ProductGrid";
import { getProductsByCategorySlug } from "@/lib/api";
import type { Product } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Human-readable title when the category row is missing in DB. */
function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProductsByCategorySlug(slug);
  const label = products?.[0]?.category ?? titleFromSlug(slug);
  return {
    title: `${label} | Femora`,
    description: `Shop ${label} at Femora.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const products = await getProductsByCategorySlug(slug);

  const heading = products?.[0]?.category ?? titleFromSlug(slug);

  return (
    <main className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      <h1 className="text-4xl sm:text-5xl font-serif text-text-300 mb-4 text-center">
        {heading}
      </h1>
      <p className="text-center text-text-200 text-sm sm:text-base mb-12 max-w-xl mx-auto">
        Browse pieces in this collection.
      </p>

      {products.length === 0 ? (
        <p className="text-center text-text-200">
          No products in this category yet.
        </p>
      ) : (
        <ProductGrid products={products as Product[]} />
      )}
    </main>
  );
}
