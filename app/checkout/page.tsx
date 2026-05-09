"use client";

import { useCartStore, getCartTotal, getCartCount } from "@/store/cart";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

function generateOrderId() {
  return "RM-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}

const PROMO_CODES: Record<string, number> = {
  "WELCOME10": 10,
  "ROBBERS20": 20,
  "MEWEN15": 15,
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const loadCart = useCartStore((s) => s.loadCart);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => { loadCart(); }, [loadCart]);

  const subtotal = getCartTotal(items);
  const itemCount = getCartCount(items);
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const shipping = afterDiscount >= 100 ? 0 : 12;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = generateOrderId();
    setOrderId(id);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <PageShell>
        <section className="section cart-section">
          <div className="container">
            <div className="order-success glass-card">
              <div className="success-icon">✓</div>
              <h1>Order Placed!</h1>
              <p className="order-id">Order ID: <strong>{orderId}</strong></p>
              <p>Thank you for shopping with Robbers Mewen. Your order is being processed and you'll receive a confirmation email shortly.</p>
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
                  <input id="firstName" type="text" required placeholder="John" />
                </div>
                <div className="form-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" required placeholder="Doe" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required placeholder="john@example.com" />
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" required placeholder="+92 300 1234567" />
              </div>

              <div className="form-field">
                <label htmlFor="address">Address</label>
                <input id="address" type="text" required placeholder="123 Main Street" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="city">City</label>
                  <input id="city" type="text" required placeholder="Lahore" />
                </div>
                <div className="form-field">
                  <label htmlFor="zip">ZIP Code</label>
                  <input id="zip" type="text" required placeholder="54000" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="country">Country</label>
                <select id="country" required defaultValue="">
                  <option value="" disabled>Select country</option>
                  <option value="PK">Pakistan</option>
                  <option value="AE">UAE</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <h2 className="payment-heading">Payment</h2>
              <div className="form-field">
                <label htmlFor="card">Card Number</label>
                <input id="card" type="text" placeholder="4242 4242 4242 4242" required maxLength={19} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="expiry">Expiry</label>
                  <input id="expiry" type="text" placeholder="MM/YY" required maxLength={5} />
                </div>
                <div className="form-field">
                  <label htmlFor="cvv">CVV</label>
                  <input id="cvv" type="text" placeholder="•••" required maxLength={4} />
                </div>
              </div>

              <button type="submit" className="primary-button place-order-btn">
                Place Order — ${total.toFixed(2)}
              </button>
            </div>

            <div className="cart-summary glass-card">
              <h2>Order Summary</h2>
              <div className="checkout-items">
                {items.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row summary-discount">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
