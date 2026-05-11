"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export function ImageCarousel({ images, alt }: Props) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    }
    
    if (distance < -minSwipeDistance) {
      setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div 
      className="carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
