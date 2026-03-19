import type { Product } from "@/types";

/** Normalized shape for grid/cart (id, title, price, image_url). */
export interface StoreGridProduct {
  id: string;
  title: string;
  price: number;
  image_url: string;
}

export interface StoreGridProps {
  /** Products from Supabase (api getProducts) or compatible array */
  products?: Product[] | StoreGridProduct[];
}
