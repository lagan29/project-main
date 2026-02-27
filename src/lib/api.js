import { createSupabaseServerClient } from "./supabase/server";

export async function getProducts() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(8);

  if (error) {
    console.log("Error fetching products:", error);
    return [];
  }

  return data;
}

export async function getProductBySlug(slug) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}