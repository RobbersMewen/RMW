"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";

type Order = {
  order_number: string;
  status: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shipping: number;
  discount?: number;
  payment_method: string;
  created_at: string;
  courier?: string;
  tracking_number?: string;
  estimated_delivery?: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "⏳ Pending",
  confirmed: "✓ Confirmed",
  processing: "⚙ Processing",
  shipped: "🚚 Shipped",
  "in-transit": "📍 In Transit",
  delivered: "✅ Delivered",
  cancelled: "✕ Cancelled",
  refunded: "💰 Refunded",
};

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<PageShell><section className="section cart-section"><div className="container"><p>Loading...</p></div></section></PageShell>}>
      <TrackOrderContent />
    </Suspense>
  );
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") || "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lookupBy, setLookupBy] = useState<"email" | "phone">("email");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = lookupBy === "email" ? email.trim() : phone.trim();
    if (!orderNumber.trim() || !identifier) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const param = lookupBy === "email" ? `email=${encodeURIComponent(identifier)}` : `phone=${encodeURIComponent(identifier)}`;
      const res = await fetch(`/api/orders/${orderNumber.trim()}?${param}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Order not found. Please check your details.");
      } else {
        setOrder(data.order);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <h1 className="cart-title">Track Your Order</h1>

          <form onSubmit={handleTrack} style={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <input
              type="text"
              placeholder="Order number (e.g. RM-ABC123-XY4Z)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="search-input"
              required
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button type="button" onClick={() => setLookupBy("email")} className={lookupBy === "email" ? "primary-button" : "secondary-button"} style={{ flex: 1, fontSize: "0.85rem", padding: "0.5rem" }}>Use Email</button>
              <button type="button" onClick={() => setLookupBy("phone")} className={lookupBy === "phone" ? "primary-button" : "secondary-button"} style={{ flex: 1, fontSize: "0.85rem", padding: "0.5rem" }}>Use Phone</button>
            </div>
            {lookupBy === "email" ? (
              <input
                type="email"
                placeholder="Email used during checkout"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="search-input"
                required
              />
            ) : (
              <input
                type="tel"
                placeholder="Phone number (e.g. 03001234567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="search-input"
                required
              />
            )}
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Tracking..." : "Track Order"}
            </button>
          </form>

          {error && (
            <div className="cart-empty glass-card" style={{ marginTop: "1.5rem" }}>
              <div className="empty-icon">🔍</div>
              <h2>Not Found</h2>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="order-success glass-card" style={{ marginTop: "1.5rem" }}>
              <div className="success-icon">✓</div>
              <p>{success}</p>
            </div>
          )}

          {order && (
            <div className="glass-card" style={{ padding: "1.5rem", marginTop: "1.5rem", border: "1px solid var(--line)", borderRadius: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <p className="cart-item-category">Order #{order.order_number}</p>
                </div>
                <span className="pill-button">{STATUS_LABELS[order.status] || order.status}</span>
              </div>

              <div className="summary-divider" />

              <div className="checkout-items" style={{ margin: "1rem 0" }}>
                {order.items.map((item, i) => (
                  <div key={i} className="checkout-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="summary-divider" />

              {order.discount && order.discount > 0 && (
                <div className="summary-row summary-discount">
                  <span>Discount</span>
                  <span>-Rs {order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "Free" : `Rs ${order.shipping.toLocaleString()}`}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>Rs {order.total.toLocaleString()}</span>
              </div>

              {(order.courier || order.tracking_number) && (
                <div style={{ margin: "1rem 0", padding: "0.8rem", background: "#f0fdf4", borderRadius: 10, fontSize: "0.85rem" }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>📦 Shipment Info</p>
                  {order.courier && <p style={{ margin: "0.3rem 0 0" }}>Courier: {order.courier}</p>}
                  {order.tracking_number && <p style={{ margin: "0.2rem 0 0" }}>Tracking #: {order.tracking_number}</p>}
                  {order.estimated_delivery && <p style={{ margin: "0.2rem 0 0" }}>Est. Delivery: {order.estimated_delivery}</p>}
                </div>
              )}

              <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--muted)" }}>
                <p style={{ margin: 0 }}>Payment: {order.payment_method === "cod" ? "Cash on Delivery" : "Bank Transfer"}</p>
                <p style={{ margin: "0.2rem 0 0" }}>Placed: {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>

              {order.status === "pending" && (
                <button
                  type="button"
                  className="cart-clear-btn"
                  style={{ marginTop: "1rem", color: "#ef5350", fontSize: "0.88rem" }}
                  disabled={cancelling}
                  onClick={async () => {
                    if (!confirm("Are you sure you want to cancel this order?")) return;
                    setCancelling(true);
                    try {
                      const res = await fetch(`/api/orders/${order.order_number}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: lookupBy === "email" ? email.trim() : "", phone: lookupBy === "phone" ? phone.trim() : "", action: "cancel" }),
                      });
                      const data = await res.json();
                      if (res.ok) {
                        setOrder({ ...order, status: "cancelled" });
                        setSuccess("Order cancelled successfully.");
                      } else {
                        setError(data.error || "Failed to cancel");
                      }
                    } catch {
                      setError("Something went wrong.");
                    }
                    setCancelling(false);
                  }}
                >
                  {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
