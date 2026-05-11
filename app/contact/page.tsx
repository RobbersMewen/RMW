"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) {
        setError("Failed to send. Please try again.");
      } else {
        setSent(true);
        form.reset();
      }
    } catch {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container" style={{ maxWidth: 600 }}>
          <h1 className="cart-title">Contact Us</h1>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
            Have a question, custom order request, or feedback? We'd love to hear from you.
          </p>

          {sent ? (
            <div className="order-success glass-card">
              <div className="success-icon">✓</div>
              <h2>Message Sent!</h2>
              <p>We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="checkout-form glass-card">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input id="phone" name="phone" type="tel" placeholder="+92 300 1234567" />
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can we help you?"
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.8rem",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(6,13,20,0.8)",
                    color: "#f0f7ff",
                    fontSize: "0.9rem",
                    resize: "vertical",
                  }}
                />
              </div>

              {error && <p className="promo-error">{error}</p>}

              <button type="submit" className="primary-button place-order-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
