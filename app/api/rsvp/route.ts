import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "SHEETS_WEBHOOK_URL not configured" }, { status: 500 });
  }

  const body = await req.json();

  const payload = {
    secret: process.env.SHEETS_SECRET || "",
    timestamp: new Date().toISOString(),
    attending: body.attending,
    name: body.name || "",
    company: body.company || "",
    position: body.position || "",
    phone: body.phone || "",
    reason: body.reason || "",
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to store response" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const adminKey = process.env.ADMIN_KEY;

  const key = req.nextUrl.searchParams.get("key");
  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!webhookUrl) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const res = await fetch(
    `${webhookUrl}?secret=${encodeURIComponent(process.env.SHEETS_SECRET || "")}&action=list`
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch responses" }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
