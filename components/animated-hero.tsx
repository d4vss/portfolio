"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";

const titles = ["Next.js Developer", "Nuxt3 Developer", "Astro Developer", "Angular 18 Developer"];

export default function AnimatedHero() {
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const shortDescriptionRef = useRef<HTMLParagraphElement | null>(null);
  const readMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    const tlTemp = gsap.timeline();

    const updateText = () => {
      currentIndex.current = (currentIndex.current + 1) % titles.length;
      if (textRef.current) {
        textRef.current!.textContent = titles[currentIndex.current] + ".";
      }
    };


    tlTemp
      .set(heroTextRef.current, { x: -100, opacity: 0 })
      .set(shortDescriptionRef.current, { x: -100, opacity: 0 })
      .set(readMoreButtonRef.current, { x: -100, opacity: 0 })
      .to(heroTextRef.current, {
        x: 0,
        ease: "sine.out",
        delay: 1.75,
        opacity: 1
      })
      .to(shortDescriptionRef.current, {
        x: 0,
        ease: "sine.out",
        opacity: 1
      })
      .to(readMoreButtonRef.current, {
        x: 0,
        ease: "sine.out",
        opacity: 1
      });

    tl
      .to(textRef.current, {
        yPercent: 100,
        duration: 1,
        delay: 1,
        ease: "power2.in",
        onComplete: updateText,
      })
      .set(textRef.current, { yPercent: -100 })
      .to(textRef.current, {
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
      }, "<");
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <div ref={heroTextRef}>
          <div className="flex width-regulator mt-10 max-md:hidden">
            <h1 className="inline-block">I&apos;m a&nbsp;</h1>
            <div className="relative inline">
              <div className="overflow-hidden h-[3.25rem]"> 
                <h1 ref={textRef} className="inline-block">
                  {titles[0]}.
                </h1>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <h1>I&apos;m a Developer.</h1>
          </div>
        </div>
        <p className="muted text-xl" ref={shortDescriptionRef}>Tech Enthusiast and Web Developer from Central Europe.</p>
        <Button className="w-fit font-semibold p-0 underline" variant="link" size="lg" ref={readMoreButtonRef} asChild>
          <Link href="/about">
            Read more about me
          </Link>
        </Button>
      </div>
    </>
  );

}
