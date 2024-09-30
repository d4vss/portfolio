"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedPreloaderAbout() {
  const preloaderBackground = useRef<HTMLDivElement | null>(null);

  const preloaderAnimation = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out"
      }
    });

    tl
      .to(preloaderBackground.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      }, "<")


    return tl;
  }

  const master = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {    
    if (!master.current) {
      master.current = gsap.timeline();
      master.current.add(preloaderAnimation());
      
      master.current.eventCallback("onComplete", () => {
        master.current?.kill();
      });
    }
  });


  return (
    <>
      <div className="overflow-hidden">
        <div className="fixed inset-0 z-[51] flex justify-center items-center h-screen bg-foreground" ref={preloaderBackground}></div>
      </div>
    </>
  );
}
