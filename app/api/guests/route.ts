import { NextRequest, NextResponse } from "next/server";

function generateSlug(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const adminKey = process.env.ADMIN_KEY;

  const body = await req.json();
  if (!adminKey || body.key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!webhookUrl) {
    return NextResponse.json({ error: "SHEETS_WEBHOOK_URL not configured" }, { status: 500 });
  }

  const slug = generateSlug();

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.SHEETS_SECRET || "",
      action: "create_guest",
      slug,
      name: body.name || "",
      company: body.company || "",
      logo_url: body.logo_url || "",
      created_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to create guest link" }, { status: 502 });
  }

  return NextResponse.json({ slug });
}

export async function GET(req: NextRequest) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  if (!webhookUrl) return NextResponse.json({ error: "Not configured" }, { status: 500 });

  const res = await fetch(
    `${webhookUrl}?secret=${encodeURIComponent(process.env.SHEETS_SECRET || "")}&action=get_guest&slug=${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (!res.ok) return NextResponse.json({ error: "Failed to fetch guest" }, { status: 502 });

  const data = await res.json();
  return NextResponse.json(data);
}
