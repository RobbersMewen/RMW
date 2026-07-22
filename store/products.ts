import { supabase } from '@/lib/supabase';

export type ProductData = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
};

export async function getAllProducts(): Promise<ProductData[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true);

  if (error) return [];
  return data || [];
}

export async function getProductsByCategory(category: string): Promise<ProductData[]> {
  const safe = String(category).replace(/[\r\n]/g, '');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', safe)
    .eq('is_active', true);

  if (error) return [];
  return data || [];
}

export async function getProductsBySubcategory(subcategory: string): Promise<ProductData[]> {
  const safe = String(subcategory).replace(/[\r\n]/g, '');
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('subcategory', safe)
    .eq('is_active', true);

  if (error) return [];
  return data || [];
}

export async function getFeaturedProducts(): Promise<ProductData[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .limit(4);

  if (error) return [];
  return data || [];
}
