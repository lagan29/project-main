import { createSupabaseServerClient } from "@/lib/supabase/server";


export async function getHero() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Hero")
    .select("*").maybeSingle();

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

export async function getProducts() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("[getProducts]", error);
    return [];
  }

  return data ?? [];
}

export async function getProductById(id: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getProductById]", error);
    return null;
  }

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


export async function getCategories() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("categories")
    .select("*");

  return data;
}