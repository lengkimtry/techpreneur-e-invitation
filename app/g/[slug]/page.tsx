import { notFound } from "next/navigation";
import ClientHome from "../../components/ClientHome";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getGuest(slug: string) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SECRET || "";
  if (!webhookUrl) return null;

  try {
    const res = await fetch(
      `${webhookUrl}?secret=${encodeURIComponent(secret)}&action=get_guest&slug=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.found ? data : null;
  } catch {
    return null;
  }
}

export default async function GuestPage({ params }: PageProps) {
  const { slug } = await params;
  const guest = await getGuest(slug);

  if (!guest) notFound();

  return (
    <ClientHome
      guestName={guest.name || undefined}
      companyName={guest.company || undefined}
      logoUrl={guest.logo_url || undefined}
    />
  );
}
