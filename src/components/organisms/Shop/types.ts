import type { Product } from "@/types";

/** Normalized product for PDP / grid / cart (slug used in `/store/[slug]`). */
export interface CatalogProduct {
  id: string;
  title: string;
  price: number;
  image_url: string;
  slug?: string;
}

export interface ProductGridProps {
  products?: Product[] | CatalogProduct[];
  className?: string;
}
