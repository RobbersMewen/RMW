"use client";

import { useEffect } from "react";

const SELECTORS = "a, button, .glass-card, .featured-card, input, .nav-link";
const STRENGTH = 0.3; // how strongly elements pull toward cursor (0-1)
const RADIUS = 100; // pixel distance to start attracting

export function MagneticEffect() {
  useEffect(() => {
    const elements = new Set<HTMLElement>();

    function handleMouseMove(e: MouseEvent) {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const pull = (1 - dist / RADIUS) * STRENGTH;
          el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
          el.style.transition = "transform 0.2s ease-out";
        } else {
          el.style.transform = "";
          el.style.transition = "transform 0.4s ease-out";
        }
      });
    }

    function handleMouseLeave() {
      elements.forEach((el) => {
        el.style.transform = "";
        el.style.transition = "transform 0.4s ease-out";
      });
    }

    function collectElements() {
      elements.clear();
      document.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
        elements.add(el);
      });
    }

    collectElements();
    const observer = new MutationObserver(collectElements);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      elements.forEach((el) => {
        el.style.transform = "";
        el.style.transition = "";
      });
    };
  }, []);

  return null;
}
