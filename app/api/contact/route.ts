import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(input: unknown, maxLength: number): string {
  return String(input || "").trim().slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 150).toLowerCase();
    const phone = sanitize(body.phone, 20) || null;
    const message = sanitize(body.message, 1000);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { error } = await supabase
      .from("inquiries")
      .insert({ name, email, phone, message });

    if (error) {
      return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
