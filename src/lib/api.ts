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
    .select(`
      *,
      product_images (
        image_url,
        display_order
      )
    `)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getProductById]", error);
    return null;
  }

  return data;
}
export async function getProductImageUrl(path: string) {
  const supabase = await createSupabaseServerClient();
  
  const { data } = await supabase
    .storage
    .from('femora_assets/dresses')
    .createSignedUrl(path, 60 * 60); // 1 hour expiry
  
  return data?.signedUrl || null;
}
export async function getProductBySlugOrId(slugOrId: string) {
  const supabase = await createSupabaseServerClient();

  const { data: bySlug, error: slugErr } = await supabase
    .from("products")
    .select(`
      *,
      product_images (
        image_url,
        display_order
      )
    `)
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

export async function getUserAddresses() {
  const supabase = await createSupabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.error("[getUserAddresses] user", userError);
    return [];
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getUserAddresses]", error);
    return [];
  }

  return data ?? [];
}