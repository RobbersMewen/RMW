"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export function ImageCarousel({ images, alt }: Props) {
  const [index, setIndex] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="carousel">
      <Image
        src={images[index]}
        alt={`${alt} - view ${index + 1}`}
        width={380}
        height={420}
        className="product-img"
        loading="lazy"
        sizes="(max-width: 920px) 100vw, 33vw"
      />
      {images.length > 1 && (
        <>
          <button type="button" className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous image">‹</button>
          <button type="button" className="carousel-btn carousel-next" onClick={next} aria-label="Next image">›</button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <span key={i} className={`carousel-dot ${i === index ? "active" : ""}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
