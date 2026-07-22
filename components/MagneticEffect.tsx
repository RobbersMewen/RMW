"use client";

import { useEffect } from "react";

const SELECTORS = "a, button, .glass-card, .featured-card, input, .nav-link";
const STRENGTH = 0.3; // how strongly elements pull toward cursor (0-1)
const RADIUS = 100; // pixel distance to start attracting

export function MagneticEffect() {
  useEffect(() => {
    let rafId: number;
    let mouseX = 0, mouseY = 0;

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mouseX - cx;
          const dy = mouseY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < RADIUS) {
            const pull = (1 - dist / RADIUS) * STRENGTH;
            el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
            el.style.transition = "transform 0.2s ease-out";
          } else if (el.style.transform) {
            el.style.transform = "";
            el.style.transition = "transform 0.4s ease-out";
          }
        });
      });
    }

    function handleMouseLeave() {
      cancelAnimationFrame(rafId);
      document.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
        el.style.transform = "";
        el.style.transition = "transform 0.4s ease-out";
      });
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return null;
}
