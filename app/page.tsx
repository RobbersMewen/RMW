import { PageShell } from "@/components/PageShell";
import { getAllProducts } from "@/store/products";
import { HeroMarquee } from "@/components/ui/HeroMarquee";
import { AdReveal } from "@/components/AdReveal";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  const allProducts = await getAllProducts();

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

      <section className="ad-reveal-section">
        <AdReveal>
          <video
            className="ad-video"
            src="https://videos.pexels.com/video-files/5765206/5765206-uhd_2560_1440_25fps.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="ad-overlay">
            <p className="eyebrow">Coming Soon</p>
            <h2>The Campaign</h2>
          </div>
        </AdReveal>
      </section>
    </PageShell>
  );
}
