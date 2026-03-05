"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export default function FeatureGrid() {
  return (
    <section className="py-28 bg-base-50">
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-5xl md:text-6xl font-serif text-text-300 leading-tight">
          Curated Categories
        </h2>
        <p className="mt-6 text-text-200 text-lg max-w-xl">
          A refined selection designed to elevate modern wardrobes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 px-6">
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1520975922203-bdf3d05b0c88"
              alt="Evening Wear"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-12 left-12">
            <h3 className="text-4xl font-serif text-white tracking-wide">
              Evening Wear
            </h3>
          </div>
        </motion.div>

        <div className="flex flex-col gap-12">
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552"
                alt="Minimal"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-8 left-10">
              <h3 className="text-3xl font-serif text-white">Minimal</h3>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                alt="Contemporary"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-8 left-10">
              <h3 className="text-3xl font-serif text-white">Contemporary</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
