"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { LookbookImage } from "./types";

const images: LookbookImage[] = [
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
    alt: "Femora lookbook style one",
  },
  {
    src: "https://images.unsplash.com/photo-1520975922203-bdf3d05b0c88?w=1200&q=80",
    alt: "Femora lookbook style two",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    alt: "Femora lookbook style three",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80",
    alt: "Femora lookbook style four",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80",
    alt: "Femora lookbook style four",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80",
    alt: "Femora lookbook style four",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80",
    alt: "Femora lookbook style four",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80",
    alt: "Femora lookbook style four",
  },
];

export default function LookbookSection() {
  const autoplay = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full py-24 bg-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl text-text-300">
              The Lookbook
            </h2>
            <p className="mt-3 text-text-100 text-lg">
              Explore the essence of Femora.
            </p>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {images.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_35%] lg:flex-[0_0_28%] relative aspect-[3/4] overflow-hidden rounded-3xl"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width:640px) 80vw, (max-width:768px) 50vw, (max-width:1024px) 35vw, 28vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                selectedIndex === index
                  ? "w-6 bg-navy-200"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
