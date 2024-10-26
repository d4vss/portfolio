"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";
import { FadeText } from "@/components/ui/fade-text";

interface TechnologyType {
  name: string;
  description: string;
  iconUrl: string;
  invertOnDarkMode?: boolean;
  filledBackground?: boolean
}

export default function Technologies() {
  const topTechnologies: TechnologyType[] = [
    {
      name: "Next.js",
      description: "React Framework",
      iconUrl: "/svgs/nextjs.svg",
      invertOnDarkMode: true
    },
    {
      name: "React",
      description: "JavaScript Library",
      iconUrl: "/svgs/react.svg"
    },
    {
      name: "Tailwind CSS",
      description: "CSS Framework",
      iconUrl: "/svgs/tailwind.svg"
    },
    {
      name: "TypeScript",
      description: "Typed JavaScript",
      iconUrl: "/svgs/typescript.svg"
    },
    {
      name: "Postgres",
      description: "Relational Database",
      iconUrl: "/svgs/postgresql.svg"
    },
    {
      name: "Prisma",
      description: "Database Client",
      iconUrl: "/svgs/prisma.svg",
      invertOnDarkMode: true
    },
    {
      name: "Git",
      description: "Version Control",
      iconUrl: "/svgs/git.svg"
    },
    {
      name: "shadcn/ui",
      description: "Component Library",
      iconUrl: "/svgs/shadcnui.svg",
      invertOnDarkMode: true,
      filledBackground: true
    },
    {
      name: "GSAP",
      description: "Animation Library",
      iconUrl: "/svgs/gsap.svg"
    },
    {
      name: "Auth.js",
      description: "Web Authentication",
      iconUrl: "/svgs/authjs.svg"
    }
  ];

  return (
    <>
      <h2>
        <FadeText text="My Top Technologies" />
      </h2>
      <div className="muted text-lg">
        <FadeText text="I&apos;m skilled in diverse, cutting-edge technologies that enable me to create powerful, high-performing solutions. Here are some of my core tools." />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
        {topTechnologies.map((technology: TechnologyType, index: number) => 
          <BlurFade key={index} inView delay={0.05 * index}>
            <div className="relative flex items-center gap-4 min-w-64 transition-all overflow-hidden rounded-md border p-4 border-border dark:border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]">
              <Image className={cn("w-12 h-12", technology.invertOnDarkMode ? "dark:invert" : null, technology.filledBackground ? "dark:bg-foreground p-2 rounded" : null)} src={technology.iconUrl} alt={`${technology.name} Logo`} width={48} height={48} />
              <div>
                <p className="text-xl">{technology.name}</p>
                <p className="muted">{technology.description}</p>
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </>
  );
}