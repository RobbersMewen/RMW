import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";

const categories = [
  { name: "Stitched", href: "/clothes/stitched", note: "Ready-to-wear premium fits" },
  { name: "Unstitched", href: "/clothes/unstitched", note: "Fine fabrics for custom tailoring" }
];

export default function ClothesPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Clothes"
        title="Wear the statement."
        description="Premium fabrics and tailored silhouettes for the modern individual."
        tone="violet"
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
