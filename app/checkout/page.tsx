"use client";

import { useCartStore, getCartTotal, getCartCount } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const PROMO_CODES: Record<string, number> = {
  "WELCOME10": 10,
  "ROBBERS20": 20,
  "MEWEN15": 15,
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const loadCart = useCartStore((s) => s.loadCart);
  const { user, init } = useAuthStore();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [savedAddress, setSavedAddress] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCart();
    init();
    try { setSavedAddress(JSON.parse(localStorage.getItem("rm-address") || "{}")); } catch {}
  }, [loadCart, init]);

  const subtotal = getCartTotal(items);
  const itemCount = getCartCount(items);
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const shipping = afterDiscount >= 10000 ? 0 : 200;
  const total = afterDiscount + shipping;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const orderData = {
      customer_name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      customer_email: formData.get("email"),
      customer_phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      zip: formData.get("zip"),
      payment_method: formData.get("payment_method"),
      discount_percent: discount,
      promo_code: promoApplied ? promoCode.trim().toUpperCase() : null,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    };

    localStorage.setItem("rm-address", JSON.stringify({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      zip: formData.get("zip"),
    }));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setOrderNumber(data.order.order_number);
      setPlaced(true);
      clearCart();
    } catch {
      setError("Failed to place order. Please try again.");
    }

    setLoading(false);
  };

  if (placed) {
    return (
      <PageShell>
        <section className="section cart-section">
          <div className="container">
            <div className="order-success glass-card">
              <div className="success-icon">✓</div>
              <h1>Order Placed!</h1>
              <p className="order-id">Order #: <strong>{orderNumber}</strong></p>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "0.5rem" }}>
                📌 Save your order number — you'll need it to track your order.
              </p>
              <p>Thank you for shopping with Robbers Mewen. Your order is being processed and you'll receive a confirmation shortly.</p>
              <Link href={`/track-order`} className="secondary-button" style={{ marginBottom: "0.5rem" }}>
                Track Order
              </Link>
              <Link href="/" className="primary-button">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  if (items.length === 0) {
    return (
      <PageShell>
        <section className="section cart-section">
          <div className="container">
            <div className="cart-empty">
              <p>Nothing to checkout. Your cart is empty.</p>
              <Link href="/collection" className="primary-button">Shop Now</Link>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <h1 className="cart-title">Checkout</h1>

          <form className="checkout-layout" onSubmit={handleSubmit}>
            <div className="checkout-form glass-card">
              <h2>Shipping Details</h2>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" name="firstName" type="text" required placeholder="John" defaultValue={savedAddress.firstName || ""} />
                </div>
                <div className="form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" name="lastName" type="text" required placeholder="Doe" defaultValue={savedAddress.lastName || ""} />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="john@example.com" defaultValue={user?.email || ""} />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" required placeholder="03001234567" defaultValue={savedAddress.phone || ""} />
              </div>

              <div className="form-field">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" required placeholder="123 Main Street" defaultValue={savedAddress.address || ""} />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" type="text" required placeholder="Lahore" defaultValue={savedAddress.city || ""} />
                </div>
                <div className="form-field">
                  <label htmlFor="zip">ZIP Code</label>
                  <input id="zip" name="zip" type="text" required placeholder="54000" defaultValue={savedAddress.zip || ""} />
                </div>
              </div>

              <h2 className="payment-heading">Payment Method</h2>
              <div className="form-field">
                <label>
                  <input type="radio" name="payment_method" value="cod" defaultChecked /> Cash on Delivery (COD)
                </label>
              </div>
              <div className="form-field">
                <label>
                  <input type="radio" name="payment_method" value="bank_transfer" /> Bank Transfer
                </label>
              </div>

              {error && <p className="promo-error">{error}</p>}

              <button type="submit" className="primary-button place-order-btn" disabled={loading}>
                {loading ? "Placing Order..." : `Place Order — Rs ${total.toLocaleString()}`}
              </button>
            </div>

            <div className="cart-summary glass-card">
              <h2>Order Summary</h2>
              <div className="checkout-items">
                {items.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider" />

              <div className="promo-section">
                <div className="promo-row">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <button type="button" className="promo-btn" onClick={applyPromo}>
                    Apply
                  </button>
                </div>
                {promoError && <p className="promo-error">{promoError}</p>}
                {promoApplied && <p className="promo-success">✓ {discount}% off applied</p>}
              </div>

              <div className="summary-divider" />
              <div className="summary-row">
                <span>Subtotal ({itemCount} items)</span>
                <span>Rs {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row summary-discount">
                  <span>Discount ({discount}%)</span>
                  <span>-Rs {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `Rs ${shipping}`}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
