"use client";

import { CollectionCategoryDetail } from "@/components/CollectionCategoryDetail";
import { PageIntro } from "@/components/PageIntro";
import { PageShell } from "@/components/PageShell";

export default function KeychainsPage() {
  return (
    <PageShell>
      <PageIntro eyebrow="Keychains" title="Small detail, big impression." description="Handcrafted leather keychains that add character to your everyday carry." tone="violet" />
      <CollectionCategoryDetail subcategory="Keychains" category="Leather" />
    </PageShell>
  );
}
