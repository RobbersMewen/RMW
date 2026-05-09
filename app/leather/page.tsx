import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";

const categories = [
  { name: "Wallets", href: "/leather/wallets", note: "Handcrafted premium leather" },
  { name: "Belts", href: "/leather/belts", note: "Statement accessories" },
  { name: "Bands", href: "/leather/bands", note: "Watch bands & wrist wraps" },
  { name: "Keychains", href: "/leather/keychains", note: "Refined everyday carry" }
];

export default function LeatherPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Leather"
        title="Crafted to last."
        description="Premium leather goods handmade with precision and timeless character."
        tone="rose"
      />
      <section className="section section-spacing">
        <div className="container">
          <div className="collection-category-grid">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="collection-category-item glass-card">
                <h3>{cat.name}</h3>
                <p>{cat.note}</p>
                <span className="text-button">Shop Now</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
