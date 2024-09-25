import AnimatedHero from "@/components/animated-hero";
import AnimatedPreloader from "@/components/animated-preloader";
import GitHubRepositories from "@/components/github-repositories";

export default function Home() { 
  return (
    <>
      <AnimatedPreloader />
      <div className="flex flex-col md:gap-20 xl:gap-40">
        <div className="width-regulator">
          <AnimatedHero />
        </div>
        <GitHubRepositories />
      </div>
    </>
  );
}