"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative cursor-pointer">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="group relative cursor-pointer"
        >
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-2xl bg-base-200">
            <Image
              src={product.image_url}
              alt={product.name}
              width={500}
              height={600}
              className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-text-300/10 opacity-0 group-hover:opacity-100 transition duration-300" />

            {/* Add to Cart Button */}
            <button className="absolute bottom-4 -left-5 -translate-x-1/2 bg-navy-200 text-white px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-navy-100">
              Add to Cart
            </button>
          </div>

          {/* Product Info */}
          <div className="mt-4 text-center">
            <h3 className="text-text-300 font-medium text-lg">
              {product.name}
            </h3>

            <p className="text-pink-200 font-semibold mt-1">
              ₹ {product.price}
            </p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
