import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateMap = new Map<string, { count: number; ts: number }>();

const LIMITS: Record<string, { window: number; max: number }> = {
  "/api/orders": { window: 60000, max: 5 },
  "/api/contact": { window: 60000, max: 3 },
  "/api/newsletter": { window: 60000, max: 3 },
  "/api/products": { window: 10000, max: 30 },
};

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Only rate-limit API routes (skip admin routes — they have their own auth)
  if (!path.startsWith("/api/") || path.startsWith("/api/admin")) return NextResponse.next();

  const matchedPath = Object.keys(LIMITS).find((p) => path.startsWith(p));
  if (!matchedPath) return NextResponse.next();

  const { window, max } = LIMITS[matchedPath];
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${ip}:${matchedPath}`;
  const now = Date.now();

  const entry = rateMap.get(key);
  if (entry && now - entry.ts < window) {
    if (entry.count >= max) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    entry.count++;
  } else {
    rateMap.set(key, { count: 1, ts: now });
  }

  // Cleanup old entries periodically
  if (rateMap.size > 1000) {
    for (const [k, v] of rateMap) {
      if (now - v.ts > 120000) rateMap.delete(k);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
