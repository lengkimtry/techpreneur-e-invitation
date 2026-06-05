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
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [responses, setResponses] = useState<RSVPRow[]>([]);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [responseError, setResponseError] = useState("");

  const generateUrl = () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams();
    if (guestName.trim()) params.set("name", guestName.trim());
    if (companyName.trim()) params.set("company", companyName.trim());
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
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setResponses(data.rows || []);
    } catch {
      setResponseError("Could not load responses. Check SHEETS_WEBHOOK_URL configuration.");
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
