import { motion } from "framer-motion";
import Hero from "@/components/organisms/Hero";
import FeatureGrid from "@/components/organisms/FeatureGrid";
import LookbookSection from "@/components/organisms/LookbookSection";
import StorySection from "@/components/organisms/StorySection";
import StoreGrid from "@/components/organisms/StoreGrid";
import { getProducts } from "@/lib/api";
import { getHero } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();
  const hero = await getHero();

  console.log("hero", hero);
  return (
    <main>
      <Hero hero={hero} />
      <FeatureGrid />
      <LookbookSection />
      <StorySection />
      <StoreGrid products={products || [] } />
    </main>
  );
}