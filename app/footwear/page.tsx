import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import Link from "next/link";

const categories = [
  { name: "Slippers", href: "/footwear/slippers", note: "Comfort meets luxury" },
  { name: "Sneakers", href: "/footwear/sneakers", note: "Modern street-ready styles" },
  { name: "Crocs", href: "/footwear/crocs", note: "Casual everyday ease" }
];

export default function FootwearPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Footwear"
        title="Step into confidence."
        description="From casual comfort to street-ready style, find your perfect pair."
        tone="emerald"
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
