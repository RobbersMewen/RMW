"use client";

import { useEffect, useRef } from "react";

export function AdReveal({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.parentElement as HTMLElement;
    sectionRef.current = section;

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height * 0.5), 0), 1);

      const scale = 0.8 + 0.2 * progress;
      const translateY = 100 * (1 - progress);

      section.style.transform = `translateY(${translateY}px) scale(${scale})`;
      section.style.opacity = `1`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="ad-reveal-inner">
      {children}
    </div>
  );
}
