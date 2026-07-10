"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Order = {
  order_number: string;
  status: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  created_at: string;
};

export default function AccountPage() {
  const { user, loading, init, signOut } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const router = useRouter();

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    setLoadingOrders(true);
    supabase
      .from("orders")
      .select("order_number, status, total, items, created_at")
      .eq("customer_email", user.email)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders(data || []);
        setLoadingOrders(false);
      });
  }, [user]);

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

  if (loading) {
    return (
      <PageShell>
        <section className="section cart-section">
          <div className="container">
            <p style={{ textAlign: "center", padding: "3rem 0" }}>Loading...</p>
          </div>
        </section>
      </PageShell>
    );
  }

  if (!user) return null;

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h1 className="cart-title" style={{ marginBottom: 0 }}>My Account</h1>
            <button
              type="button"
              onClick={async () => { await signOut(); router.push("/"); }}
              className="cart-clear-btn"
              style={{ fontSize: "0.85rem" }}
            >
              Sign Out
            </button>
          </div>

          <div className="glass-card" style={{ padding: "1.2rem", border: "1px solid var(--line)", borderRadius: "16px", marginBottom: "2rem" }}>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>Signed in as</p>
            <p style={{ margin: "0.2rem 0 0", fontWeight: 600 }}>{user.email}</p>
          </div>

          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Order History</h2>

          {loadingOrders ? (
            <p style={{ color: "var(--muted)" }}>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="cart-empty">
              <p>No orders yet.</p>
              <Link href="/collection" className="primary-button">Start Shopping</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {orders.map((order) => (
                <div key={order.order_number} className="glass-card" style={{ padding: "1.2rem", border: "1px solid var(--line)", borderRadius: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <div>
                      <p className="cart-item-category" style={{ margin: 0 }}>#{order.order_number}</p>
                      <p style={{ margin: "0.2rem 0 0", fontSize: "0.8rem", color: "var(--muted)" }}>
                        {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <span className="pill-button" style={{ fontSize: "0.75rem" }}>{statusLabel(order.status)}</span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
                    {order.items.map((item, i) => (
                      <span key={i}>{item.name} ×{item.quantity}{i < order.items.length - 1 ? ", " : ""}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="product-price" style={{ fontSize: "0.95rem" }}>Rs {order.total.toLocaleString()}</span>
                    <Link href="/track-order" style={{ fontSize: "0.8rem", color: "var(--muted)", textDecoration: "underline" }}>
                      Track
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
