"use client";

import { useState } from "react";
import { PageShell } from "@/components/PageShell";

type Order = {
  order_number: string;
  customer_name: string;
  status: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shipping: number;
  payment_method: string;
  created_at: string;
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${orderNumber.trim()}`);
      const data = await res.json();

      if (!res.ok) {
        setError("Order not found. Please check your order number.");
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending: "⏳ Pending",
      confirmed: "✓ Confirmed",
      shipped: "🚚 Shipped",
      delivered: "✅ Delivered",
      cancelled: "✕ Cancelled",
    };
    return map[status] || status;
  };

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <h1 className="cart-title">Track Your Order</h1>

          <form onSubmit={handleTrack} className="search-bar" style={{ maxWidth: 500 }}>
            <input
              type="text"
              placeholder="Enter order number (e.g. RM-ABC123-XY4Z)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "..." : "Track"}
            </button>
          </form>

          {error && (
            <div className="cart-empty glass-card" style={{ marginTop: "1.5rem" }}>
              <div className="empty-icon">🔍</div>
              <h2>Not Found</h2>
              <p>{error}</p>
            </div>
          )}

          {order && (
            <div className="glass-card" style={{ padding: "1.5rem", marginTop: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <p className="cart-item-category">Order #{order.order_number}</p>
                  <h2 style={{ fontSize: "1.1rem", margin: 0 }}>{order.customer_name}</h2>
                </div>
                <span className="pill-button">{statusLabel(order.status)}</span>
              </div>

              <div className="summary-divider" />

              <div className="checkout-items" style={{ margin: "1rem 0" }}>
                {order.items.map((item, i) => (
                  <div key={i} className="checkout-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "Free" : `$${order.shipping}`}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${order.total}</span>
              </div>

              <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--muted)" }}>
                <p style={{ margin: 0 }}>Payment: {order.payment_method === "cod" ? "Cash on Delivery" : "Bank Transfer"}</p>
                <p style={{ margin: "0.2rem 0 0" }}>Placed: {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
