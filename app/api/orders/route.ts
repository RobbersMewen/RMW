import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const VALID_PROMOS: Record<string, number> = {
  WELCOME10: 10,
  ROBBERS20: 20,
  MEWEN15: 15,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateOrderNumber() {
  const prefix = "RM";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

function sanitize(input: unknown, maxLength: number): string {
  return String(input || "").trim().slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, payment_method, promo_code } = body;

    const customer_name = sanitize(body.customer_name, 100);
    const customer_email = sanitize(body.customer_email, 150);
    const customer_phone = sanitize(body.customer_phone, 20);
    const address = sanitize(body.address, 300);
    const city = sanitize(body.city, 50);
    const zip = sanitize(body.zip, 10);

    if (!customer_name || !customer_email || !customer_phone || !address || !city || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(customer_email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const PHONE_REGEX = /^(\+92|0092|0)?3[0-9]{9}$/;
    if (!PHONE_REGEX.test(customer_phone.replace(/[\s-]/g, ""))) {
      return NextResponse.json({ error: "Invalid phone number. Use Pakistani format e.g. 03001234567" }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length > 50) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    // Validate stock for each item
    const productIds = items.map((i: any) => i.id).filter(Boolean);
    if (productIds.length > 0) {
      const { data: products } = await supabase
        .from("products")
        .select("id, name, stock")
        .in("id", productIds);

      if (products) {
        for (const item of items) {
          const product = products.find((p: any) => p.id === item.id);
          if (product && product.stock !== null && product.stock !== undefined) {
            const qty = Math.min(Math.max(Math.floor(Number(item.quantity) || 1), 1), 10);
            if (product.stock < qty) {
              return NextResponse.json({ error: `"${product.name}" only has ${product.stock} unit${product.stock === 1 ? "" : "s"} left in stock.` }, { status: 400 });
            }
          }
        }
      }
    }

    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => {
      const price = Number(item.price) || 0;
      const quantity = Math.min(Math.max(Math.floor(Number(item.quantity) || 0), 1), 100);
      return sum + price * quantity;
    }, 0);

    // Server-side promo validation — ignore client-sent discount_percent
    const code = typeof promo_code === "string" ? promo_code.trim().toUpperCase() : "";
    const discountPct = VALID_PROMOS[code] || 0;
    const discountAmount = (subtotal * discountPct) / 100;
    const afterDiscount = subtotal - discountAmount;
    const shipping = afterDiscount >= 10000 ? 0 : 200;
    const total = afterDiscount + shipping;

    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: generateOrderNumber(),
        customer_name,
        customer_email,
        customer_phone,
        address,
        city,
        zip: zip || null,
        items,
        subtotal,
        discount: discountAmount,
        promo_code: discountPct > 0 ? code : null,
        shipping,
        total,
        payment_method: payment_method === "bank_transfer" ? "bank_transfer" : "cod",
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // Deduct stock for each item
    for (const item of items) {
      if (!item.id) continue;
      const qty = Math.min(Math.max(Math.floor(Number(item.quantity) || 1), 1), 10);
      await supabase.rpc("decrement_stock", { product_id: item.id, amount: qty });
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
