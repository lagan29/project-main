import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      title,
      slug,
      price,
      categories (
        name
      ),
      product_images (
        image_url
      )
    `);

  if (error) {
    console.error(error);
    return [];
  }

  return (data as Product[]) ?? [];
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      title,
      slug,
      price,
      description,
      categories (
        name
      ),
      product_images (
        image_url
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Product;
}