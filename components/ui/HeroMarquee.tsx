"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { ProductData } from "@/store/products";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const fallbackImages = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&q=80",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=750&fit=crop&q=80",
];

export function HeroMarquee({ products }: { products?: ProductData[] }) {
  const [images, setImages] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("hero_marquee").select("url").order("sort_order", { ascending: true });
      if (data && data.length > 0) {
        setImages(data.map((r: any) => r.url));
      } else if (products && products.length > 0) {
        setImages(products.slice(0, 5).map(p => p.images[0]).filter(Boolean));
      } else {
        setImages(fallbackImages);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    intervalRef.current = setInterval(() => {
      setActive(i => (i + 1) % images.length);
    }, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images.length]);

  const getPosition = (index: number) => {
    const total = images.length;
    const diff = (index - active + total) % total;
    if (diff === 0) return "center";
    if (diff === 1) return "right1";
    if (diff === 2) return "right2";
    if (diff === total - 1) return "left1";
    if (diff === total - 2) return "left2";
    return "center";
  };

  if (images.length === 0) return <div className="hero-gallery" />;

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
