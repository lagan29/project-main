/** Product shape from API (Supabase) */
export interface Product {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  price: number;
  categories?: { name: string }[];
  product_images?: { image_url: string }[];
}

/** Cart item: flattened for store (name, image_url from product) */
export interface CartItem {
  id: string;
  name: string;
  slug?: string;
  price: number;
  image_url?: string;
  image?: string;
  quantity: number;
}
