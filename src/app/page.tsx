import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import FeatureGrid from "@/components/home/FeatureGrid";
import LookbookSection from "@/components/home/LookbookSection";
import StorySection from "@/components/home/StorySection";
import StoreGrid from "@/components/store/StoreGrid";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main
     
    >
      <Hero />
      <FeatureGrid />
      <LookbookSection />
      <StorySection />
      <StoreGrid products={products} />
    </main>
  );
}