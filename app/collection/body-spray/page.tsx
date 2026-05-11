import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function BodySprayPage() {
  const products = await getProductsBySubcategory("Body Spray");

  return (
    <PageShell>
      <PageIntro eyebrow="Body Spray" title="Fresh luxury for every day." description="Lightweight modern sprays with clean profiles, ideal for daily refresh and layering." tone="violet" />
      <CollectionCategoryDetail products={products} category="Perfume" />
    </PageShell>
  );
}
