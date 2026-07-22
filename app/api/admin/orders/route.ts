import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const VALID_STATUSES = ["pending", "confirmed", "processing", "shipped", "in-transit", "delivered", "cancelled", "refunded"];

export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { order_number, status } = body;

    if (!order_number || !status) {
      return NextResponse.json({ error: "order_number and status are required" }, { status: 400 });
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_number", order_number)
      .select("order_number, status")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order: data });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = req.nextUrl.searchParams.get("status");

  let query = supabase
    .from("orders")
    .select("order_number, customer_name, customer_email, customer_phone, address, city, items, subtotal, discount, shipping, total, payment_method, promo_code, status, created_at")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
}
