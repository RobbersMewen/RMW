import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import type { Metadata } from "next";

export const revalidate = 60;

async function getProduct(id: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();
  return data;
}

async function getRelated(category: string, excludeId: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("is_active", true)
    .neq("id", excludeId)
    .limit(4);
  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 800, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  const related = await getRelated(product.category, product.id);

  return (
    <PageShell>
      <ProductDetailClient product={product} related={related} />
    </PageShell>
  );
}
