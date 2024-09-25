"use client"

import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";

import { Scroll } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function MobileNavigation() {

  return (
    <div className="flex justify-between items-center my-4 px-8 md:hidden">
      <Link href="/" className="font-medium">
        <span className="!mb-0 flex items-center gap-3">
          <Image src="/favicon-32x32.png" alt="Saturn Logo" width={24} height={24} className="inline" />
          <p className="font-semibold">d4vss/portfolio</p>
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-2">
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}