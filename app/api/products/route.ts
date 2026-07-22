import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const search = searchParams.get("search");

  let query = supabase.from("products").select("*").eq("is_active", true);

  if (category) query = query.eq("category", category);
  if (subcategory) query = query.eq("subcategory", subcategory);
  if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}
