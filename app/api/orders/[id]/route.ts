import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const email = req.nextUrl.searchParams.get("email");
  const phone = req.nextUrl.searchParams.get("phone");

  if (!email && !phone) {
    return NextResponse.json({ error: "Email or phone is required to track order" }, { status: 400 });
  }

  let query = supabase
    .from("orders")
    .select("order_number, status, items, subtotal, discount, shipping, total, payment_method, created_at, courier, tracking_number, estimated_delivery")
    .eq("order_number", id);

  if (email) query = query.eq("customer_email", email.trim().toLowerCase());
  else if (phone) query = query.eq("customer_phone", phone.trim());

  const { data, error } = await query.single();

  if (error || !data) {
    return NextResponse.json({ error: "Order not found. Check your order number and details." }, { status: 404 });
  }

  return NextResponse.json({ order: data });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const action = String(body.action || "");

    if ((!email && !phone) || action !== "cancel") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    let query = supabase.from("orders").select("status").eq("order_number", id);
    if (email) query = query.eq("customer_email", email);
    else query = query.eq("customer_phone", phone);

    const { data: order, error: fetchError } = await query.single();

    if (fetchError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status !== "pending") {
      return NextResponse.json({ error: `Cannot cancel order. Current status: ${order.status}` }, { status: 400 });
    }

    let updateQuery = supabase.from("orders").update({ status: "cancelled", cancelled_at: new Date().toISOString(), cancel_reason: "Customer requested" }).eq("order_number", id);
    if (email) updateQuery = updateQuery.eq("customer_email", email);
    else updateQuery = updateQuery.eq("customer_phone", phone);

    const { error: updateError } = await updateQuery;

    if (updateError) {
      return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 });
    }

    return NextResponse.json({ message: "Order cancelled successfully" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
