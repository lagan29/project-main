import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getHero() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Hero")
    .select("*")
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getStoryBlocks() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.from("story_blocks").select("*");

  return data;
}

export async function getProducts() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from("products").select("*");

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

/** Resolve product for `/store/[slug]` — prefers `slug` column; falls back to id if param looks like a UUID. */
export async function getProductBySlugOrId(slugOrId: string) {
  const supabase = await createSupabaseServerClient();

  const { data: bySlug, error: slugErr } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slugOrId)
    .maybeSingle();

  if (slugErr) {
    console.error("[getProductBySlugOrId] slug", slugErr);
  }
  if (bySlug) return bySlug;

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      slugOrId
    );
  if (isUuid) {
    return getProductById(slugOrId);
  }

  return null;
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
    .select("name, slug, image_url");

  return data ?? [];
}
