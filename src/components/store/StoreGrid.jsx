"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import ProductCard from "./ProductCard";

export default function StoreGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        console.error(error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-text-100">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center mt-10 text-text-100">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}