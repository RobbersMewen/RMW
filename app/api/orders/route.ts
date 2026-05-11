import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateOrderNumber() {
  const prefix = "RM";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer_name, customer_email, customer_phone, address, city, items, payment_method } = body;

    if (!customer_name || !customer_email || !customer_phone || !address || !city || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 100 ? 0 : 12;
    const total = subtotal + shipping;

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: generateOrderNumber(),
        customer_name,
        customer_email,
        customer_phone,
        address,
        city,
        items,
        subtotal,
        shipping,
        total,
        payment_method: payment_method || "cod",
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
