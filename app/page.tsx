import { PageShell } from "@/components/PageShell";
import { getFeaturedProducts } from "@/store/products";
import { HomeFeatured } from "@/components/HomeFeatured";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <PageShell>
      <section className="brand-home section">
        <div className="container brand-home-shell">
          <p className="eyebrow">Luxury Lifestyle Brand</p>
          <h1 className="brand-wordmark">
            ROBBERS
            <span>MEWEN</span>
          </h1>
          <p className="brand-home-copy">
            A modern lifestyle brand with bold elegance — perfumes and leather goods crafted for those who demand more.
          </p>
          <div className="hero-actions">
            <Link href="/collection" className="primary-button">
              Shop Perfumes
            </Link>
            <Link href="/leather" className="secondary-button">
              Shop Leather
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-spacing">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Bestsellers</p>
            <h2>Most loved by our customers.</h2>
          </div>
          <HomeFeatured products={featured} />
        </div>
      </section>
    </PageShell>
  );
}
