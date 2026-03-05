"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import React from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.product_images?.[0]?.image_url ?? product.image_url ?? "";

  return (
    <Link href={`/products/${product.slug ?? product.id}`}>
      <div className="group relative cursor-pointer">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="group relative cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl bg-base-200">
            <Image
              src={imageUrl}
              alt={product.title}
              width={500}
              height={600}
              className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-text-300/10 opacity-0 group-hover:opacity-100 transition duration-300" />

            <button className="absolute bottom-4 -left-5 -translate-x-1/2 bg-navy-200 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-navy-100">
              Add to Cart
            </button>
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-text-300 font-medium text-lg">{product.title}</h3>
            <p className="text-pink-200 font-semibold mt-1">₹ {product.price}</p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
