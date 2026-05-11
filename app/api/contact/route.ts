import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("inquiries")
      .insert({ name, email, phone: phone || null, message });

    if (error) {
      return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
