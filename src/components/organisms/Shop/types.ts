import type { Product } from "@/types";
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
