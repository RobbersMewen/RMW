import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function BeltsPage() {
  const products = await getProductsBySubcategory("Belts");

  return (
    <PageShell>
      <PageIntro eyebrow="Belts" title="The finishing touch." description="Premium leather belts that elevate any outfit with subtle authority." tone="gold" />
      <CollectionCategoryDetail products={products} category="Leather" />
    </PageShell>
  );
}
