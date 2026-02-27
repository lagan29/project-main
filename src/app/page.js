'use client';
import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import FeatureGrid from "@/components/home/FeatureGrid";
import LookbookSection from "@/components/home/LookbookSection";
import StorySection from "@/components/home/StorySection";
export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center flex-col gap-12"
    >
     
      <Hero/>
      <FeatureGrid/>
      <LookbookSection/>
      <StorySection/>
    </motion.main>
    
   
  );
}
