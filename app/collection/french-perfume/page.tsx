import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function FrenchPerfumePage() {
  const products = await getProductsBySubcategory("French Perfume");

  return (
    <PageShell>
      <PageIntro eyebrow="French Perfume" title="Parisian elegance in every note." description="Floral, powdery, and citrus-forward creations inspired by modern French perfumery." tone="gold" />
      <CollectionCategoryDetail products={products} category="Perfume" />
    </PageShell>
  );
}
