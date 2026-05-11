"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function BandsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Bands" title="Wrist-worthy leather." description="Watch bands and wrist wraps crafted for comfort and character." tone="emerald" />
      <CollectionCategoryDetail subcategory="Bands" category="Leather" />
    </PageShell>
  );
}
