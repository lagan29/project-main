"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
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

            <Button
              type="button"
              variant="primary"
              size="sm"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300"
              onClick={(e) => e.preventDefault()}
            >
              Add to Cart
            </Button>
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-text-300 font-medium text-lg">{product.title}</h3>
            {product.categories?.[0]?.name && (
              <p className="text-sm text-gray-500 mt-0.5">{product.categories[0].name}</p>
            )}
            <p className="text-pink-200 font-semibold mt-1">₹ {product.price}</p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
