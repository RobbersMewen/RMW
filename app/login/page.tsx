"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, init, signIn, signUp } = useAuthStore();
  const router = useRouter();

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    if (user) router.push("/account");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (mode === "login") {
      const err = await signIn(email.trim().toLowerCase(), password);
      if (err) setError(err);
    } else {
      const err = await signUp(email.trim().toLowerCase(), password);
      if (err) {
        setError(err);
      } else {
        setSuccess("Account created! Check your email to confirm, then sign in.");
        setMode("login");
      }
    }

    setLoading(false);
  };

  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <div className="checkout-form glass-card" style={{ maxWidth: 420, margin: "2rem auto" }}>
            <h1 style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
              {mode === "login" ? "Sign In" : "Create Account"}
            </h1>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
              {mode === "login"
                ? "Sign in to view your orders and manage your account."
                : "Create an account to track orders and save your details."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min 6 characters"
                  minLength={6}
                />
              </div>

              {error && <p className="promo-error">{error}</p>}
              {success && <p className="promo-success">{success}</p>}

              <button type="submit" className="primary-button place-order-btn" disabled={loading}>
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: "0.85rem", marginTop: "1.2rem", color: "var(--muted)" }}>
              {mode === "login" ? (
                <>Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => { setMode("signup"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: "#1a1a1a", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                    Sign Up
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button type="button" onClick={() => { setMode("login"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: "#1a1a1a", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                    Sign In
                  </button>
                </>
              )}
            </p>

            <Link href="/" className="text-button" style={{ display: "block", textAlign: "center", marginTop: "0.8rem", fontSize: "0.82rem" }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
