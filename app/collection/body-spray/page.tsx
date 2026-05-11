"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function BodySprayPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Body Spray" title="Fresh luxury for every day." description="Lightweight modern sprays with clean profiles, ideal for daily refresh and layering." tone="violet" />
      <CollectionCategoryDetail subcategory="Body Spray" category="Perfume" />
    </PageShell>
  );
}
