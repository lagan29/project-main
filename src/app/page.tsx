import Hero from "@/components/organisms/Hero";
import FeatureGrid from "@/components/organisms/FeatureGrid";
import LookbookSection from "@/components/organisms/LookbookSection";
import StorySection from "@/components/organisms/StorySection";
import { getHero } from "@/lib/api";

export default async function Home() {
  const hero = await getHero();

  return (
    <main>
      <Hero hero={hero} />
      <FeatureGrid />
      <LookbookSection />
      <StorySection />
    </main>
  );
}
