"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    alt: "Femora lookbook style one",
  },
  {
    src: "https://images.unsplash.com/photo-1520975922203-bdf3d05b0c88?w=800&q=80",
    alt: "Femora lookbook style two",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Femora lookbook style three",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    alt: "Femora lookbook style four",
  },
];

export default function LookbookSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("init", onSelect).on("select", onSelect);
    return () => {
      emblaApi.off("init", onSelect).off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="w-full py-16 md:py-24 lg:py-32 bg-neutral-100 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="The Lookbook"
    >
      <div className="w-full px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 md:mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-300 tracking-tight">
              The Lookbook
            </h2>
            <p className="mt-2 sm:mt-3 text-text-100 text-base md:text-lg max-w-md">
              Explore the essence of Femora.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex gap-2" role="group" aria-label="Carousel navigation">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous slide"
                className="w-11 h-11 rounded-full border-2 border-text-200 text-text-300 flex items-center justify-center transition-colors hover:bg-navy-200 hover:border-navy-200 hover:text-white disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-navy-200 focus:ring-offset-2"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next slide"
                className="w-11 h-11 rounded-full border-2 border-text-200 text-text-300 flex items-center justify-center transition-colors hover:bg-navy-200 hover:border-navy-200 hover:text-white disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-navy-200 focus:ring-offset-2"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
            <div className="flex gap-2" role="tablist" aria-label="Slide indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-200 focus:ring-offset-2 ${
                    selectedIndex === index
                      ? "bg-navy-200 w-6"
                      : "bg-base-200 hover:bg-text-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 sm:-mx-6">
          <div className="overflow-hidden px-4 sm:px-6" ref={emblaRef}>
            <div className="flex touch-pan-y gap-4 sm:gap-5 md:gap-6">
              {images.map((item, index) => (
                <div
                  key={index}
                  className="flex-[0_0_82%] sm:flex-[0_0_55%] md:flex-[0_0_42%] lg:flex-[0_0_32%] min-w-0 relative aspect-3/4 overflow-hidden rounded-2xl md:rounded-3xl bg-base-200 shadow-md"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 768px) 55vw, (max-width: 1024px) 42vw, 32vw"
                    className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

