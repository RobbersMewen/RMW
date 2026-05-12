"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ProductData } from "@/store/products";

const fallbackImages = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=750&fit=crop&q=80",
];

export function HeroMarquee({ products }: { products?: ProductData[] }) {
  const images = products && products.length > 0
    ? products.slice(0, 5).map((p) => p.images[0])
    : fallbackImages;

  const [active, setActive] = useState(0);
  const total = images.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [total]);

  const getPosition = (index: number) => {
    const diff = (index - active + total) % total;
    if (diff === 0) return "center";
    if (diff === 1) return "right1";
    if (diff === 2) return "right2";
    if (diff === total - 1) return "left1";
    if (diff === total - 2) return "left2";
    return "center";
  };

  return (
    <div className="hero-gallery">
      <div className="hero-gallery-stage">
        {images.map((src, i) => (
          <div key={i} className={`hero-gallery-card ${getPosition(i)}`}>
            <Image
              src={src}
              alt=""
              width={320}
              height={420}
              className="hero-gallery-img"
              sizes="320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
