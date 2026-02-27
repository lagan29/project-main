"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-text-300 leading-tight">
            Curated Fashion
            <br />
            <span className="text-pink-400">For Modern Women</span>
          </h1>

          <p className="mt-6 text-text-100 text-lg max-w-md">
            Discover timeless silhouettes, premium fabrics, and thoughtfully
            crafted pieces designed for confidence.
          </p>

          <div className="mt-8 flex gap-4">
            <Button variant="primary" size="md">
              Shop Now
            </Button>

            <Button variant="secondary" size="md">
              Explore Collection
            </Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/hero.jpg"
              alt="Mora Collection"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -left-6 bg-navy-100 p-6 rounded-2xl shadow-lg">
            <p className="text-white font-medium">New Season Arrivals</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
