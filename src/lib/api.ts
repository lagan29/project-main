import { createSupabaseServerClient } from "@/lib/supabase/server";

/* -----------------------------
   HOME DATA
------------------------------ */

export async function getHero() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Hero")
    .select("*").maybeSingle();
console.log("data", data);
console.log("error", error);
  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getStoryBlocks() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("story_blocks")
    .select("*");

  return data;
}

/* -----------------------------
   PRODUCTS
------------------------------ */

export async function getProducts() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("products")
    .select("*");

  return data;
}

export async function getProductsByCategory(slug: string) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category_slug", slug);

  return data;
}

/* -----------------------------
   CATEGORIES
------------------------------ */

export async function getCategories() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("categories")
    .select("*");

  return data;
}