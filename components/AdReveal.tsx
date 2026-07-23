"use client";

import { useEffect, useRef, useState } from "react";

type SlideItem = {
  type: "image" | "video";
  url: string;
  mobile_url?: string;
  title?: string;
  subtitle?: string;
};

export function AdReveal({ slides, duration = 5000 }: { slides: SlideItem[]; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  // Scroll reveal
  useEffect(() => {
    const inner = ref.current;
    if (!inner) return;
    const section = inner.parentElement as HTMLElement;

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height * 0.5), 0), 1);
      section.style.transform = `translateY(${100 * (1 - progress)}px) scale(${0.8 + 0.2 * progress})`;
      section.style.opacity = `${Math.min(progress * 2, 1)}`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % slides.length;
        setPrev(c);
        setTimeout(() => setPrev(null), 800);
        return next;
      });
      setShowOverlay(true);
    }, duration);
    return () => clearInterval(timer);
  }, [slides.length, duration]);

  // Hide overlay after 2s on mount and on slide change
  useEffect(() => {
    setShowOverlay(true);
    const t = setTimeout(() => setShowOverlay(false), 2000);
    return () => clearTimeout(t);
  }, [current]);

  // Sync mute state to active video
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, current]);

  function toggleMute() {
    setMuted(m => !m);
  }

  const activeSlide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;
  const hasVideo = slides.some(s => s.type === "video");

  return (
    <div ref={ref} className="ad-reveal-inner">
      {/* Previous slide fading out */}
      {prevSlide && (
        <div key={`prev-${prev}`} className="ad-slide ad-slide-out">
          {prevSlide.type === "video"
            ? <video className="ad-video" src={prevSlide.url} autoPlay muted loop playsInline />
            : <img className="ad-video" src={prevSlide.url} alt={prevSlide.title || ""} />}
        </div>
      )}

      {/* Current slide fading in */}
      {activeSlide && (
        <div key={`cur-${current}`} className="ad-slide ad-slide-in">
          {activeSlide.type === "video" ? (
            <>
              <video ref={videoRef} className="ad-video ad-desktop" src={activeSlide.url} autoPlay muted loop playsInline />
              {activeSlide.mobile_url && <video className="ad-video ad-mobile" src={activeSlide.mobile_url} autoPlay muted={muted} loop playsInline />}
              {!activeSlide.mobile_url && <video className="ad-video ad-mobile" src={activeSlide.url} autoPlay muted={muted} loop playsInline />}
            </>
          ) : (
            <>
              <img className="ad-video ad-desktop" src={activeSlide.url} alt={activeSlide.title || ""} />
              <img className="ad-video ad-mobile" src={activeSlide.mobile_url || activeSlide.url} alt={activeSlide.title || ""} />
            </>
          )}
        </div>
      )}

      {/* Overlay text */}
      <div className="ad-overlay" style={{ opacity: showOverlay ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <p className="eyebrow">{activeSlide?.subtitle || "Coming Soon"}</p>
        <h2>{activeSlide?.title || "The Campaign"}</h2>
      </div>

      {/* Mute toggle — only shown when current slide is a video */}
      {activeSlide?.type === "video" && (
        <button className="ad-mute-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? "🔇" : "🔊"}
        </button>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="ad-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`ad-dot${i === current ? " ad-dot-active" : ""}`}
              onClick={() => { setPrev(current); setCurrent(i); setTimeout(() => setPrev(null), 800); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
