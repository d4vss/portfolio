import AnimatedHero from "@/components/animated-hero";
import AnimatedPreloader from "@/components/animated-preloader";

export default function Home() { 
  return (
    <>
      <AnimatedPreloader />
      <AnimatedHero />
    </>
  );
}