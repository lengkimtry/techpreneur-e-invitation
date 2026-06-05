import AdminClient from "./AdminClient";

interface PageProps {
  searchParams: Promise<{ key?: string }>;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const adminKey = process.env.ADMIN_KEY;
  const isAuthed = adminKey && params.key === adminKey;

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0520] px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/15 max-w-sm w-full text-center">
          <h1 className="text-white font-bold text-xl mb-2">Admin Access</h1>
          <p className="text-[#c8a0ff] text-sm mb-6">
            Add <code className="bg-white/10 px-1.5 py-0.5 rounded text-[#ffd85b]">?key=YOUR_ADMIN_KEY</code> to the URL
          </p>
          <p className="text-white/40 text-xs">
            Set <code>ADMIN_KEY</code> in your Cloudflare environment variables.
          </p>
        </div>
      </div>
    );
  }

  return <AdminClient adminKey={params.key!} />;
}
