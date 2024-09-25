"use client";

import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { Scroll } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function DesktopNavigation() {
  const pathname = usePathname();
  const header = useRef<HTMLDivElement | null>(null);
  const icons = useRef<HTMLUListElement | null>(null);
  const master = useRef<gsap.core.Timeline | null>(null);

  const setInitialStates = () => {
    gsap.set(header.current, { yPercent: -150, opacity: 1 });
    if (icons.current?.children) {
      gsap.set(icons.current.children, { x: 50, opacity: 0 });
    }
  };

  const afterLoadAnimation = () => {
    const tl = gsap.timeline();

    tl.to(header.current, {
      yPercent: 0,
      duration: 1.75,
      delay: 1.25,
      ease: "expo.inOut",
    });

    if (icons.current?.children) {
      tl.to(
        Array.from(icons.current.children),
        {
          delay: 0.1,
          x: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "expo.out",
        },
        "-=1"
      );
    }

    return tl;
  };

  useEffect(() => {
    if (pathname != "/") return;
    setInitialStates();

    if (!master.current) {
      master.current = gsap.timeline();
      master.current.add(afterLoadAnimation());

      master.current.eventCallback("onComplete", () => {
        master.current?.kill();
      });
    } else {
      master.current.restart();
    }

    return () => {
      master.current?.kill();
      master.current = null;
    };
  }, [pathname]);

  return (
    <div className="flex justify-between items-center my-4 px-8 max-md:hidden" ref={header}>
      <Link href="/" className="font-medium">
        <span className="!mb-0 flex items-center gap-2">
          <Image src="/favicon-32x32.png" alt="Saturn Logo" width={24} height={24} className="inline" />
          <p className="font-semibold">d4vss/portfolio</p>
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-2" ref={icons}>
          <NavigationMenuItem>
            <NavigationMenuLink href="/resume" asChild>
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pointer-events-none opacity-50 text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 w-9">
                <Scroll className="h-[1.2rem] w-[1.2rem]" />
              </div>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="https://github.com/d4vss" target="_blank">
              <Button variant="ghost" size="icon">
                <SiGithub className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
