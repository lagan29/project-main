import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProductGrid from "@/components/organisms/Shop/ProductGrid";
import type { Product } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      title,
      slug,
      price,
      product_images (image_url),
      categories!inner (slug)
    `)
    .eq("categories.slug", slug);

  if (error) {
    console.error("[CategoryPage]", error);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-semibold mb-10 capitalize flex justify-center items-center">
        {slug.replace(/-/g, " ")}
      </h1>

      <ProductGrid products={(data ?? []) as unknown as Product[]} />
    </main>
  );
}
