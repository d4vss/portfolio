import ContactForm from "@/components/contact-form";
import { ChevronsLeftRightIcon } from "@/components/icons/chevrons-left-right-icon";
import { CursorClickIcon } from "@/components/icons/cursor-click-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { ModeToggle } from "@/components/toggle-mode-button";
import { Badge } from "@/components/ui/badge";

import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BookIcon } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface TechnologyType {
  name: string;
  iconUrl: string;
  invertOnDarkMode?: boolean;
  filledBackground?: boolean;
}

interface ProjectType {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

const technologies: TechnologyType[] = [
  { name: "Next.js", iconUrl: "/icons/nextjs.svg", invertOnDarkMode: true },
  { name: "React", iconUrl: "/icons/react.svg" },
  { name: "Tailwind CSS", iconUrl: "/icons/tailwind.svg" },
  { name: "TypeScript", iconUrl: "/icons/typescript.svg" },
  { name: "PostgreSQL", iconUrl: "/icons/postgresql.svg" },
  { name: "SQLite", iconUrl: "/icons/sqlite.svg", invertOnDarkMode: true },
  { name: "Prisma", iconUrl: "/icons/prisma.svg", invertOnDarkMode: true },
  { name: "Git", iconUrl: "/icons/git.svg" },
  { name: "Shadcn UI", iconUrl: "/icons/shadcnui.svg", invertOnDarkMode: true, filledBackground: true },
  { name: "Park UI", iconUrl: "/icons/parkui.svg" },
  { name: "GSAP", iconUrl: "/icons/gsap.svg" },
  { name: "Framer Motion", iconUrl: "/icons/framermotion.svg" },
  { name: "Auth.js", iconUrl: "/icons/authjs.svg" },
  { name: "Vue.js", iconUrl: "/icons/vuejs.svg" },
  { name: "C#", iconUrl: "/icons/csharp.svg" },
  { name: "Python", iconUrl: "/icons/python.svg" },
];


const projects: ProjectType[] = [
  {
    title: "Solven",
    description:
      "Solven is a modern file sharing platform built with Next.js and HeroUI. It provides a simple and efficient way to upload, store, and share files with others.",
    technologies: ["Typescript", "Next.js", "Hero UI", "Auth.js", "Cloudflare R2", "Neon DB", "Drizzle ORM"],
    imageUrl: "/assets/solven.png",
    githubUrl: "https://github.com/d4vss/solven",
    liveDemoUrl: "https://solven.d4vss.net/",
  },
  {
    title: "Forza Mods Website",
    description:
      "Open source for the official Forza Mods website. Built with Next.js, Park UI and framer-motion.",
    technologies: ["Typescript", "Next.js", "Park UI", "Framer Motion"],
    imageUrl: "/assets/forzamods.png",
    githubUrl: "https://github.com/ForzaMods/Website",
    liveDemoUrl: "https://www.forzamods.dev/",
  },
  {
    title: "Discord Giveaway Bot",
    description: "A folder-based Python Discord Giveaway Bot built with Disnake and Aiosqlite. It features support for slash commands and utility functions.",
    technologies: ["Python", "SQLite"],
    githubUrl: "https://github.com/d4vss/discord-giveawaybot"
  }
];

export default function Home() {
  return (
    <>
    <Head>
      {technologies.map((technology, index) => 
        <link rel="preload" href={technology.iconUrl} as="image" key={index} />
      )}
    </Head>
    <div className="max-w-7xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
      <BlurFade yOffset={2} duration={0.3}>
        <div className="max-lg:flex justify-between gap-2">
          <div className="border w-fit bg-background">
            <Image
              priority
              className="w-56 h-56 aspect-square object-cover p-2"
              src="/cat-eating-shrimp.webp"
              alt="a cat eating a shrimp"
              width={224}
              height={224}
            />
          </div>
          <div className="lg:hidden">
            <ModeToggle />
          </div>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">d4vss</h1>
        <p className="muted font-normal text-lg mb-2">
          Full Stack Developer
        </p>
        <div className="flex gap-2 items-center">
          <TooltipProvider delayDuration={290}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://github.com/d4vss" target="_blank">
                  <Button size="icon">
                  <GithubIcon />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                GitHub
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ContactForm />
        </div> 
        <p className="mt-5 font-semibold text-xl">About</p>
        <p className="max-w-xs text-muted-foreground">
          I have been developing web applications since 2021,
          specializing in both frontend and backend development while staying
          current with emerging technologies.
        </p>
        <h3 className="mt-5 mb-2">Technologies</h3>
        <div className="md:max-w-sm flex flex-wrap max-md:grid grid-cols-3 max-md:justify-between gap-2">
          {technologies.map((technology: TechnologyType, index: number) => (
            <div
              key={index}
              className="w-[6.5rem] max-md:w-full flex flex-col items-center text-center gap-4 relative transition-all overflow-hidden rounded-md border p-2 border-border bg-stone-300/[.1]dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
            >
              <Image
                priority
                className={cn(
                  "w-6 h-6 md:w-8 md:h-8",
                  technology.invertOnDarkMode ? "dark:invert" : null,
                  technology.filledBackground
                    ? "dark:bg-foreground p-2 rounded"
                    : null
                )}
                src={technology.iconUrl}
                alt="Technology Logo"
                width={32}
                height={32}
              />
              <p className="small text-muted-foreground">{technology.name}</p>
            </div>
          ))}
        </div>
      </BlurFade>
      <BlurFade yOffset={2} duration={0.3}>
        <div className="max-lg:hidden flex justify-end items-start">
          <ModeToggle />
        </div>
        <h2 className="font-semibold">Projects</h2>
        <div className="mt-5 space-y-5">
          {projects.map((project, index) => (
            <div key={index} className="w-full group rounded-sm border p-4 transition-all border-border bg-stone-300/[.1] dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
            >
              <div className="flex gap-2 items-center justify-between">
                <p className="flex items-center text-inherit bg-transparent font-semibold">
                  <BookIcon className="inline mr-2 w-4 h-4 flex-shrink-0" /> {project.title}
                </p>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Link target="_blank" href={project.githubUrl}>
                      <Button size="icon">
                        <ChevronsLeftRightIcon />
                      </Button>
                    </Link>
                  )}
                  {project.liveDemoUrl && (
                    <Link target="_blank" href={project.liveDemoUrl}>
                      <Button size="icon">
                        <CursorClickIcon />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground my-3">
                {project.description}
              </p>
              <div className="flex gap-2 items-center flex-wrap">
                {project.technologies.map((tech, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="rounded font-medium border bg-stone-300/[.1] hover:bg-stone-300/[.50] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              {project.imageUrl && <div>
                <Link href={project.liveDemoUrl || project.githubUrl || ''} target="_blank">
                  <Image src={project.imageUrl} alt={`${project.title} Image`} width={430} height={240} quality={75} priority className="rounded w-full object-cover mt-5 border border-white/25" />
                </Link>
              </div>}
            </div>
          ))}
        </div>
      </BlurFade>
    </div></>
  );
}
