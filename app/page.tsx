import { PageShell } from "@/components/PageShell";
import { getAllProducts } from "@/store/products";
import { HeroMarquee } from "@/components/ui/HeroMarquee";
import { AdReveal } from "@/components/AdReveal";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const revalidate = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const [allProducts, campaignRes] = await Promise.all([
    getAllProducts(),
    supabase.from("campaign").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
  ]);

  const slides = (campaignRes.data || []).map((c: any) => ({ type: c.type, url: c.url, mobile_url: c.mobile_url || "", title: c.title, subtitle: c.subtitle }));

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
        <AdReveal slides={slides.length > 0 ? slides : [{ type: "video", url: "https://videos.pexels.com/video-files/5765206/5765206-uhd_2560_1440_25fps.mp4", title: "The Campaign", subtitle: "Coming Soon" }]} duration={5000} />
      </section>
    </PageShell>
  );
}
