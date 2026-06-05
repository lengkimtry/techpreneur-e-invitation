import ClientHome from "./components/ClientHome";

interface PageProps {
  searchParams: Promise<{ name?: string; company?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const guestName = params.name ? decodeURIComponent(params.name) : undefined;
  const companyName = params.company ? decodeURIComponent(params.company) : undefined;
  return <ClientHome guestName={guestName} companyName={companyName} />;
}
