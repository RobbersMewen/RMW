"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  images: string[];
  alt: string;
  priority?: boolean;
};

export function ImageCarousel({ images, alt, priority = false }: Props) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Preload adjacent images — cleanup on unmount
  useEffect(() => {
    if (images.length <= 1) return;
    const links: HTMLLinkElement[] = [];
    const nextIdx = (index + 1) % images.length;
    const prevIdx = index === 0 ? images.length - 1 : index - 1;
    [nextIdx, prevIdx].forEach((i) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = images[i];
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((l) => l.parentNode?.removeChild(l));
  }, [index, images]);

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
        quality={90}
        className="product-img"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes="(max-width: 760px) 100vw, (max-width: 920px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgwIiBoZWlnaHQ9IjQyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMGIxYTI2Ii8+PC9zdmc+"
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
