"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedPreloader() {
  const preloaderBackground = useRef<HTMLDivElement | null>(null);
  const preloaderText = useRef<HTMLDivElement | null>(null);

  const setInitialStates = () => {
    gsap.set(preloaderText.current, {
      yPercent: 115,
      opacity: 1
    });
  }

  const preloaderAnimation = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out"
      }
    });

    tl
      .to(preloaderText.current, {
        yPercent: 0,
        delay: 0.25
      })
      .to(preloaderText.current, {
        yPercent: -115,
        delay: .75
      })
      .to(preloaderBackground.current, {
        yPercent: -100,
        duration: .75,
        ease: "power4.inOut"
      }, "<")


    return tl;
  }

  const master = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setInitialStates();
    
    
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
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] overflow-hidden leading-[1] z-[52]">
          <h2 ref={preloaderText} className="block opacity-0 text-background max-md:!text-xl">Say 👋 to Davs &#x30C4;</h2>
        </div>
        <div className="fixed inset-0 z-[51] flex justify-center items-center h-screen bg-foreground" ref={preloaderBackground}></div>
      </div>
    </>
  );
}
