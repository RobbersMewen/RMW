import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase().slice(0, 150);

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from("subscribers")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 });
    }

    const { error } = await supabase
      .from("subscribers")
      .insert({ email });

    if (error) {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
