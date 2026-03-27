import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getHero() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from("Hero").select("*").maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

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
      slugOrId,
    );
  if (isUuid) {
    return getProductById(slugOrId);
  }

  return null;
}
export async function getProductsByCategorySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  const normalized = slug.trim().toLowerCase();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", normalized); 

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}
export async function getCategories() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("categories")
    .select("name, slug, image_url");

  return data ?? [];
}
export async function getUser() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("[getUser]", error);
    return null;
  }

  return data;
}

export async function getCoupons() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("active", true);

  if (error) {
    console.error("[getCoupons]", error);
    return [];
  }

  return data ?? [];
}