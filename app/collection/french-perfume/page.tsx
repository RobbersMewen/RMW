"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function FrenchPerfumePage() {
  return (
    <PageShell>
      <PageIntro eyebrow="French Perfume" title="Parisian elegance in every note." description="Floral, powdery, and citrus-forward creations inspired by modern French perfumery." tone="gold" />
      <CollectionCategoryDetail subcategory="French Perfume" category="Perfume" />
    </PageShell>
  );
}
