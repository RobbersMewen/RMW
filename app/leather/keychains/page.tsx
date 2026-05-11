import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";
import { getProductsBySubcategory } from "@/store/products";

export const revalidate = 60;

export default async function KeychainsPage() {
  const products = await getProductsBySubcategory("Keychains");

  return (
    <PageShell>
      <PageIntro eyebrow="Keychains" title="Small detail, big impression." description="Handcrafted leather keychains that add character to your everyday carry." tone="violet" />
      <CollectionCategoryDetail products={products} category="Leather" />
    </PageShell>
  );
}
