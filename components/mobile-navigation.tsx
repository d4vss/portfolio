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

import { Book, Scroll } from "lucide-react";
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
            <Link href="/resume" className="pointer-events-none">
              <Button variant="ghost" size="icon" disabled>
                <Scroll className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about">
              <Button variant="ghost" size="icon">
                <Book className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Link>
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