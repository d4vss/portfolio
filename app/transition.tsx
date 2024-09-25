"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Transition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 20, opacity: 0, scale: 0.992 },
        { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
