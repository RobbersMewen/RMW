import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsByCategory } from "@/store/products";
import { ProductGrid } from "@/components/ProductGrid";

export const revalidate = 60;

export default async function CollectionPage() {
  const products = await getProductsByCategory("Perfume");

  return (
    <PageShell>
      <PageIntro
        eyebrow="Curated Collection"
        title="The Robbers Mewen Library"
        description="A refined line of modern compositions with glossy depth, clean projection, and long-wear elegance."
        tone="gold"
      />
      <section id="collection" className="section section-spacing">
        <div className="container">
          <ProductGrid products={products} category="Perfume" />
        </div>
      </section>
    </PageShell>
  );
}
