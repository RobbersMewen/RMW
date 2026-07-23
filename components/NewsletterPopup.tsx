"use client";

import { useEffect, useState } from "react";

export function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem("rm-newsletter-shown");
    const today = new Date().toDateString();
    if (last !== today) {
      setShow(true);
      localStorage.setItem("rm-newsletter-shown", today);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setDone(true);
    } catch {}
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="newsletter-overlay" onClick={dismiss}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-close" onClick={dismiss}>✕</button>
        {done ? (
          <>
            <div className="success-icon" style={{ margin: "0 auto 1rem" }}>✓</div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>You're in!</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Use code <strong>WELCOME10</strong> for 10% off your first order.</p>
          </>
        ) : (
          <>
            <p className="eyebrow" style={{ textAlign: "center" }}>Exclusive Offer</p>
            <h2 style={{ fontSize: "1.4rem", textAlign: "center", marginBottom: "0.5rem" }}>Get 10% Off</h2>
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", textAlign: "center", marginBottom: "1.2rem" }}>
              Subscribe to our newsletter and get <strong>WELCOME10</strong> — 10% off your first order.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="search-input"
                style={{ flex: "none" }}
              />
              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? "Subscribing..." : "Claim My 10% Off"}
              </button>
            </form>
            <button onClick={dismiss} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: "0.78rem", cursor: "pointer", marginTop: "0.8rem", width: "100%", textAlign: "center" }}>
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
