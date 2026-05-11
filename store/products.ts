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
    .select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getProductsByCategory(category: string): Promise<ProductData[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getProductsBySubcategory(subcategory: string): Promise<ProductData[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('subcategory', subcategory);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getFeaturedProducts(): Promise<ProductData[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .in('id', ['perfume-crown-of-amber', 'leather-bifold-classic', 'perfume-noir-petale', 'leather-classic-formal']);

  if (error) {
    console.error('Error fetching featured:', error);
    return [];
  }

  return data || [];
}
