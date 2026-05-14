"use client";

import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let raf: number;

    function onMouseMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      dot!.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      raf = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: -10,
        left: -10,
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "2px solid rgba(0,0,0,0.6)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        backgroundColor: "rgba(255,255,255,0.8)",
      }}
    />
  );
}
