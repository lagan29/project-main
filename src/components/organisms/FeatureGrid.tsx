"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Signature Dresses",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80",
  },
  {
    title: "Elevated Tops",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  },
  {
    title: "Modern Denim",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80",
  },

  
];

export default function FeatureGrid() {
  return (
    <section className="py-24 bg-base-50">
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl text-text-300">
          Curated Categories
        </h2>

        <p className="mt-4 text-text-200 text-lg max-w-xl mx-auto">
          A refined selection designed to elevate modern wardrobes.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative group overflow-hidden rounded-2xl"
          >
           
            <div className="relative w-full aspect-4/5">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

           
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl md:text-3xl font-serif text-white">
                {category.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}