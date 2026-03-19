"use client";

import { motion } from "framer-motion";
import type { StoryBlock } from "./types";

const blocks: StoryBlock[] = [
  { title: "Refined Silhouettes", text: "Each piece is designed with balance, proportion and intention." },
  { title: "Premium Fabrics", text: "We source textiles that elevate both comfort and structure." },
  { title: "Modern Craftsmanship", text: "Where minimal design meets detailed construction." },
];

export default function StorySection() {
  return (
    <section className="bg-base-50 py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div className="md:sticky md:top-32 h-fit">
          <h2 className="text-5xl md:text-6xl font-serif text-text-300 leading-tight">
            The Essence<br />of Femora
          </h2>
          <p className="mt-6 text-text-200 max-w-md">
            Designed for those who understand that elegance is subtle, not loud.
          </p>
        </div>
        <div className="space-y-32">
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif text-text-300">{block.title}</h3>
              <p className="mt-4 text-text-200 text-lg">{block.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
