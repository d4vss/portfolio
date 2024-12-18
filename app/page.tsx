"use client"

import ContactForm from "@/components/contact-form";
import { ChevronsLeftRightIcon } from "@/components/icons/chevrons-left-right-icon";
import { CoffeeIcon } from "@/components/icons/coffee-icon";
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
import Image from "next/image";
import Link from "next/link";

import "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "@/components/switch-language-button";

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

export default function Home() {
  const { t } = useTranslation(); 

  const projects: ProjectType[] = [
    {
      title: t("projects.forzaModsWebsite.title"),
      description: t("projects.forzaModsWebsite.description"),
      technologies: ["Typescript", "Next.js", "Park UI", "Framer Motion"],
      imageUrl: "/assets/forzamods.png",
      githubUrl: "https://github.com/ForzaMods/Website",
      liveDemoUrl: "https://www.forzamods.dev/",
    },
    {
      title: t("projects.discordGiveawayBot.title"),
      description: t("projects.discordGiveawayBot.description"),
      technologies: ["Python", "SQLite"],
      githubUrl: "https://github.com/d4vss/discord-giveawaybot"
    }
  ];  

  return (
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
            <div className="flex gap-2">
              <LanguageSwitch />
              <ModeToggle />
            </div>
          </div>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">d4vss</h1>
        <p className="muted font-normal text-lg mb-2">
          {t("role")}
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
          <TooltipProvider delayDuration={290}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://ko-fi.com/d4vss" target="_blank">
                  <Button size="icon">
                    <CoffeeIcon />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Ko-Fi
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ContactForm />
        </div>
        <p className="mt-5 font-semibold text-xl">{t("about.title")}</p>
        <p className="max-w-xs text-muted-foreground">{t("about.description")}</p>
        <h3 className="mt-5 mb-2">{t("technologies.title")}</h3>
        <div className="md:max-w-sm flex flex-wrap gap-2">
          {technologies.map((technology: TechnologyType, index: number) => (
            <div
              key={index}
              className="w-fit relative transition-all overflow-hidden rounded-md border p-4 border-border bg-stone-300/[.1] hover:bg-stone-300/[.50] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            >
              <TooltipProvider delayDuration={290}>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
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
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {technology.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      </BlurFade>
      <BlurFade yOffset={2} duration={0.3}>
        <div className="max-lg:hidden flex justify-end items-start">
          <div className="flex gap-2">
            <LanguageSwitch />
            <ModeToggle />
          </div>
        </div>
        <h2 className="font-semibold">Projects</h2>
        <div className="mt-5 space-y-5">
          {projects.map((project, index) => (
            <div key={index} className="w-full group rounded-sm border p-4 transition-all border-border bg-stone-300/[.1] dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
            >
              <div className="flex gap-2 items-center justify-between">
                <p className="flex items-center text-inherit bg-transparent font-semibold">
                  <BookIcon className="inline mr-2 w-4 h-4" /> {project.title}
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
              {project.imageUrl && <Image src={project.imageUrl} alt={`${project.title} Image`} width={430} height={240} quality={75} priority className="rounded w-full object-cover mt-5 border border-white/25" />}
            </div>
          ))}
        </div>
      </BlurFade>
    </div>
  );
}
