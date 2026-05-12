"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  { type: "text" as const, src: "", label: "" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop&q=80", label: "Premium Perfumes" },
  { type: "text" as const, src: "", label: "" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop&q=80", label: "Handcrafted Leather" },
  { type: "text" as const, src: "", label: "" },
  { type: "image" as const, src: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=400&fit=crop&q=80", label: "Arabic Oud Collection" },
];

export function HeroTextSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-text-slider">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-crossfade-item ${i === index ? "active" : ""}`}
        >
          {slide.type === "text" ? (
            <h1 className="brand-wordmark">
              ROBBERS
              <span>MEWEN</span>
            </h1>
          ) : (
            <div className="hero-product-slide">
              <Image
                src={slide.src}
                alt={slide.label}
                width={600}
                height={400}
                className="hero-product-img"
                sizes="(max-width: 760px) 90vw, 600px"
              />
              <p className="hero-product-label">{slide.label}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
