"use client";

import { useState } from "react";

const CheckCircleIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

interface RSVPFormProps {
  guestName?: string;
  companyName?: string;
}

export default function RSVPForm({ guestName, companyName }: RSVPFormProps) {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: guestName || "",
    company: companyName || "",
    position: "",
    phone: "",
    reason: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (attending === "yes" && (!form.name.trim() || !form.phone.trim())) {
      setError("Please fill in your name and phone number.");
      return;
    }
    if (attending === "no" && !form.reason.trim()) {
      setError("Please provide a reason.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attending, ...form }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-16 px-4" style={{ background: "#f4f1f8" }}>
        <div className="max-w-md mx-auto text-center">
          <div
            className="rounded-2xl p-10"
            style={{ background: "linear-gradient(135deg, #340f80 0%, #4c139e 100%)" }}
          >
            <div className="flex justify-center mb-4">
              {attending === "yes" ? (
                <div className="w-16 h-16 rounded-full bg-[#ffd85b]/20 flex items-center justify-center">
                  <CheckBadgeIcon />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#c8a0ff]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className="text-white font-bold text-xl font-eng mb-2">
              {attending === "yes" ? "See you there!" : "Thank you for letting us know"}
            </h3>
            <p className="text-[#c8a0ff] text-sm font-eng leading-relaxed">
              {attending === "yes"
                ? "Your attendance has been recorded. We look forward to seeing you on June 25th, 2026."
                : "We appreciate your response and hope to see you at future events."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-16 md:py-20 px-4" style={{ background: "#f4f1f8" }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[#4c139e] text-[11px] uppercase tracking-[0.35em] font-eng font-semibold mb-2">
            RSVP
          </span>
          <h2 className="text-[#250c58] font-bold text-2xl md:text-3xl font-eng mt-1">
            Will you attend?
          </h2>
          <div className="w-14 h-1 bg-[#ffd85b] mx-auto mt-4 rounded-full" />
          {guestName && (
            <p className="text-[#4c139e]/70 text-sm font-eng mt-3">
              Responding as{" "}
              <span className="font-semibold text-[#4c139e]">{guestName}</span>
            </p>
          )}
        </div>

        {/* Yes / No cards */}
        <div className="grid grid-cols-2 gap-4 mb-7">
          {/* Yes card */}
          <button
            onClick={() => setAttending("yes")}
            className={`relative rounded-2xl p-5 border-2 text-left transition-all duration-200 overflow-hidden ${
              attending === "yes"
                ? "border-[#4c139e] shadow-lg shadow-[#4c139e]/20"
                : "border-[#e8e0f0] bg-white hover:border-[#4c139e]/30 hover:shadow-md"
            }`}
            style={
              attending === "yes"
                ? { background: "linear-gradient(135deg, #340f80 0%, #4c139e 100%)" }
                : {}
            }
          >
            {attending === "yes" && (
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #ffd85b 0%, transparent 60%)" }} />
            )}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
              attending === "yes" ? "bg-[#ffd85b]/20" : "bg-emerald-50"
            }`}>
              <span className={attending === "yes" ? "text-[#ffd85b]" : "text-emerald-500"}>
                <CheckCircleIcon />
              </span>
            </div>
            <p className={`font-bold text-sm font-eng ${attending === "yes" ? "text-white" : "text-[#250c58]"}`}>
              Yes, I will attend
            </p>
            <p className={`text-xs mt-0.5 font-eng ${attending === "yes" ? "text-white/60" : "text-[#4c139e]/40"}`}>
              Count me in!
            </p>
          </button>

          {/* No card */}
          <button
            onClick={() => setAttending("no")}
            className={`relative rounded-2xl p-5 border-2 text-left transition-all duration-200 overflow-hidden ${
              attending === "no"
                ? "border-[#340f80] shadow-lg shadow-[#340f80]/20"
                : "border-[#e8e0f0] bg-white hover:border-[#340f80]/30 hover:shadow-md"
            }`}
            style={
              attending === "no"
                ? { background: "linear-gradient(135deg, #1a0942 0%, #340f80 100%)" }
                : {}
            }
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
              attending === "no" ? "bg-white/10" : "bg-red-50"
            }`}>
              <span className={attending === "no" ? "text-red-300" : "text-red-400"}>
                <XCircleIcon />
              </span>
            </div>
            <p className={`font-bold text-sm font-eng ${attending === "no" ? "text-white" : "text-[#250c58]"}`}>
              Unable to attend
            </p>
            <p className={`text-xs mt-0.5 font-eng ${attending === "no" ? "text-white/60" : "text-[#4c139e]/40"}`}>
              I&apos;ll miss this one
            </p>
          </button>
        </div>

        {/* Form fields */}
        {attending && (
          <div className="bg-white rounded-2xl p-6 border border-[#e8e0f0] shadow-sm space-y-4">
            {attending === "yes" ? (
              <>
                <Field label="Full Name *" value={form.name} onChange={(v) => set("name", v)} placeholder="Your full name" />
                <Field label="Company / Organization" value={form.company} onChange={(v) => set("company", v)} placeholder="Your organization" />
                <Field label="Position / Title" value={form.position} onChange={(v) => set("position", v)} placeholder="e.g. CEO, Director" />
                <Field label="Phone Number *" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+855 xx xxx xxx" type="tel" />
              </>
            ) : (
              <div>
                <label className="block text-[#340f80] text-xs font-semibold font-eng uppercase tracking-wide mb-1.5">
                  Reason for not attending
                </label>
                <textarea
                  rows={3}
                  value={form.reason}
                  onChange={(e) => set("reason", e.target.value)}
                  placeholder="Please let us know why you can't make it..."
                  className="w-full border border-[#e8e0f0] rounded-xl px-4 py-3 text-sm text-[#250c58] placeholder-[#c8a0ff]/60 focus:outline-none focus:border-[#4c139e] font-eng resize-none"
                />
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-eng bg-red-50 rounded-lg px-3 py-2">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full text-white font-bold py-3 rounded-xl font-eng text-sm tracking-wide shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #4c139e 0%, #340f80 100%)" }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                "Submit Response"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-[#340f80] text-xs font-semibold font-eng uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e8e0f0] rounded-xl px-4 py-3 text-sm text-[#250c58] placeholder-[#c8a0ff]/60 focus:outline-none focus:border-[#4c139e] font-eng transition-colors"
      />
    </div>
  );
}
