import { PageShell } from "@/components/PageShell";
import { getFeaturedProducts, getAllProducts } from "@/store/products";
import { HomeFeatured } from "@/components/HomeFeatured";
import { HeroMarquee } from "@/components/ui/HeroMarquee";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const [featured, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
  ]);

  return (
    <PageShell>
      <section className="brand-home section">
        <div className="container brand-home-shell">
          <p className="eyebrow">Exclusive Fragrance & Leather House</p>
          <h1 className="brand-wordmark">
            ROBBERS
            <span>MEWEN</span>
          </h1>
        </div>
        <HeroMarquee products={allProducts} />
        <div className="container brand-home-shell">
          <p className="brand-home-copy">
            Where scent meets craft. Signature perfumes and handcrafted leather — designed for those who wear their identity.
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
