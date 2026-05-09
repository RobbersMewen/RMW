import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="section cart-section">
        <div className="container">
          <div className="order-success glass-card">
            <div className="success-icon" style={{ borderColor: "#4fc3f7", color: "#4fc3f7" }}>?</div>
            <h1>Page Not Found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <Link href="/" className="primary-button">Back to Home</Link>
              <Link href="/search" className="secondary-button">Search Products</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
