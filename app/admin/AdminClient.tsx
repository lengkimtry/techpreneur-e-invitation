"use client";

import { useState, useEffect, useCallback } from "react";

interface RSVPRow {
  timestamp: string;
  attending: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  reason: string;
}

interface Props {
  adminKey: string;
}

export default function AdminClient({ adminKey }: Props) {
  const [guestName, setGuestName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [responses, setResponses] = useState<RSVPRow[]>([]);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [responseError, setResponseError] = useState("");

  const handleLogoUpload = async (file: File) => {
    setLogoUploading(true);
    setLogoUploadError("");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Upload failed");
      }
      const data = (await res.json()) as { url: string };
      setLogoUrl(data.url);
    } catch (e: unknown) {
      setLogoUploadError(e instanceof Error ? e.message : "Upload failed");
    }
    setLogoUploading(false);
  };

  const generateUrl = () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams();
    if (guestName.trim()) params.set("name", guestName.trim());
    if (companyName.trim()) params.set("company", companyName.trim());
    if (logoUrl.trim()) params.set("logo", logoUrl.trim());
    setGeneratedUrl(`${base}/?${params.toString()}`);
    setCopied(false);
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchResponses = useCallback(async () => {
    setLoadingResponses(true);
    setResponseError("");
    try {
      const res = await fetch(`/api/rsvp?key=${encodeURIComponent(adminKey)}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`HTTP ${res.status}: ${err.error || "unknown error"}`);
      }
      const data = await res.json();
      setResponses(data.rows || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setResponseError(`Could not load responses: ${msg}`);
    }
    setLoadingResponses(false);
  }, [adminKey]);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  const attending = responses.filter((r) => r.attending === "yes").length;
  const notAttending = responses.filter((r) => r.attending === "no").length;

  return (
    <div className="min-h-screen bg-[#f4f1f8] pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#250c58] to-[#4c139e] px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#ffd85b] text-[11px] font-semibold uppercase tracking-widest mb-1">Admin Dashboard</p>
          <h1 className="text-white font-bold text-2xl">Techpreneur Bootcamp 2026</h1>
          <p className="text-[#c8a0ff] text-sm mt-1">Invitation Manager &amp; RSVP Responses</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Responses", value: responses.length },
            { label: "Attending", value: attending },
            { label: "Not Attending", value: notAttending },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-[#e8e0f0] text-center shadow-sm">
              <p className="text-[#4c139e] font-bold text-3xl">{value}</p>
              <p className="text-[#340f80]/60 text-xs font-semibold uppercase tracking-wide mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Link Generator */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e0f0] shadow-sm">
          <h2 className="text-[#250c58] font-bold text-lg mb-5">Generate Personalized Link</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#340f80] text-xs font-semibold uppercase tracking-wide mb-1.5">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full border border-[#e8e0f0] rounded-xl px-4 py-2.5 text-sm text-[#250c58] focus:outline-none focus:border-[#4c139e]"
              />
            </div>
            <div>
              <label className="block text-[#340f80] text-xs font-semibold uppercase tracking-wide mb-1.5">Company / Organization</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Ministry of Education"
                className="w-full border border-[#e8e0f0] rounded-xl px-4 py-2.5 text-sm text-[#250c58] focus:outline-none focus:border-[#4c139e]"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[#340f80] text-xs font-semibold uppercase tracking-wide mb-1.5">
              Company Logo <span className="text-[#4c139e]/40 normal-case font-normal">(optional)</span>
            </label>
            <div className="flex items-center gap-3">
              {/* Upload button */}
              <label className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${logoUploading ? "opacity-50 cursor-not-allowed border-[#e8e0f0] bg-[#f4f1f8]" : "border-[#4c139e]/30 bg-[#f4f1f8] hover:border-[#4c139e] hover:bg-[#ede8f5]"}`}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={logoUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLogoUpload(file);
                    e.target.value = "";
                  }}
                />
                {logoUploading ? (
                  <svg className="w-4 h-4 text-[#4c139e] animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-[#4c139e]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                )}
                <span className="text-[#4c139e] text-xs font-semibold">{logoUploading ? "Uploading…" : "Upload Image"}</span>
              </label>

              {/* URL input fallback */}
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="or paste image URL…"
                className="flex-1 border border-[#e8e0f0] rounded-xl px-4 py-2.5 text-sm text-[#250c58] focus:outline-none focus:border-[#4c139e] font-mono min-w-0"
              />
            </div>

            {logoUploadError && (
              <p className="text-red-500 text-xs mt-1.5">{logoUploadError}</p>
            )}

            {logoUrl.trim() && (
              <div className="mt-2.5 flex items-center gap-3">
                <div className="bg-white border border-[#e8e0f0] rounded-xl px-4 py-2 flex items-center justify-center shadow-sm" style={{ minWidth: "80px", minHeight: "48px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl} alt="Logo preview" className="max-h-9 max-w-[120px] object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <div>
                  <p className="text-[#4c139e] text-xs font-semibold">Logo uploaded</p>
                  <button onClick={() => setLogoUrl("")} className="text-red-400 text-xs hover:text-red-600">Remove</button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={generateUrl}
            disabled={!guestName.trim()}
            className="bg-gradient-to-r from-[#4c139e] to-[#340f80] text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Generate Link
          </button>

          {generatedUrl && (
            <div className="mt-4 p-4 bg-[#f4f1f8] rounded-xl border border-[#e8e0f0]">
              <p className="text-[#4c139e] text-xs font-semibold uppercase tracking-wide mb-2">Shareable URL</p>
              <div className="flex items-center gap-2">
                <p className="flex-1 text-sm text-[#340f80] break-all font-mono bg-white rounded-lg px-3 py-2 border border-[#e8e0f0]">
                  {generatedUrl}
                </p>
                <button
                  onClick={copyUrl}
                  className="flex-shrink-0 bg-[#ffd85b] text-[#250c58] font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#f0c830] transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RSVP Responses */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e0f0] shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[#250c58] font-bold text-lg">RSVP Responses</h2>
            <button
              onClick={fetchResponses}
              disabled={loadingResponses}
              className="text-[#4c139e] text-sm font-semibold hover:underline disabled:opacity-50"
            >
              {loadingResponses ? "Loading…" : "Refresh"}
            </button>
          </div>

          {responseError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm mb-4">
              {responseError}
            </div>
          )}

          {!responseError && responses.length === 0 && !loadingResponses && (
            <p className="text-[#4c139e]/40 text-sm text-center py-8">No responses yet.</p>
          )}

          {responses.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#4c139e] text-white text-xs uppercase tracking-wide">
                    {["Time", "Status", "Name", "Company", "Position", "Phone", "Reason"].map((h) => (
                      <th key={h} className="px-3 py-2.5 text-left font-semibold whitespace-nowrap first:rounded-l-lg last:rounded-r-lg">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {responses.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f4f1f8]"}>
                      <td className="px-3 py-2.5 text-[#340f80]/60 whitespace-nowrap text-xs">
                        {new Date(row.timestamp).toLocaleString()}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${row.attending === "yes" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {row.attending === "yes" ? "Attending" : "Not Attending"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-semibold text-[#250c58]">{row.name}</td>
                      <td className="px-3 py-2.5 text-[#340f80]">{row.company}</td>
                      <td className="px-3 py-2.5 text-[#340f80]/70">{row.position}</td>
                      <td className="px-3 py-2.5 text-[#340f80]">{row.phone}</td>
                      <td className="px-3 py-2.5 text-[#340f80]/60 max-w-[160px] truncate">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
