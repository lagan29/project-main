"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/atoms/Button";

interface HeroProps {
  title?: string | null;
  description?: string | null;
  primary_label?: string | null;
  secondary_label?: string | null;
  image_url?: string | null;
  highlight?: string | null;
}

export default function Hero({ hero }: { hero: HeroProps }) {
  return (
    <section className="relative bg-base-100 overflow-hidden">
      <div className="mx-auto px-6 py-24 grid md:grid-cols-2 items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-text-300 leading-tight">
            {hero?.title}
            {/* <br /> */}
            <span className="text-pink-200">{hero?.highlight}</span>
          </h1>

          <p className="mt-6 text-text-100 text-lg max-w-md">
              {hero?.description}
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/store">
              <Button variant="primary" size="md">
                {hero?.primary_label}
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="secondary" size="md">
              {hero?.secondary_label}
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={hero?.image_url || ""}
              alt="feMora Collection"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -left-6 bg-navy-100 p-6 rounded-2xl shadow-lg">
            <p className="text-white font-medium">{hero?.highlight}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
