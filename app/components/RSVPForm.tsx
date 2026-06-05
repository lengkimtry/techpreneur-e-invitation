"use client";

import { useState } from "react";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12L10.2426 16.2426L18.727 7.75732" />
  </svg>
);

const CrossIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" />
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
          <div className="rounded-2xl p-10"
            style={{ background: "linear-gradient(135deg, #340f80 0%, #4c139e 100%)" }}>
            <div className="flex justify-center mb-5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${attending === "yes" ? "bg-[#ffd85b]/20" : "bg-white/10"}`}>
                {attending === "yes"
                  ? <CheckIcon className="w-8 h-8 text-[#ffd85b]" />
                  : <CrossIcon className="w-7 h-7 text-[#c8a0ff]" />}
              </div>
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
            className={`relative rounded-2xl p-5 border-2 text-left transition-all duration-250 overflow-hidden group ${
              attending === "yes"
                ? "border-transparent shadow-xl shadow-[#4c139e]/25"
                : "border-[#e8e0f0] bg-white hover:border-[#4c139e]/40 hover:shadow-lg"
            }`}
            style={attending === "yes"
              ? { background: "linear-gradient(145deg, #2d0e70 0%, #4c139e 60%, #5a18b8 100%)" }
              : {}}
          >
            {/* glow blob */}
            {attending === "yes" && (
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,216,91,0.18) 0%, transparent 70%)" }} />
            )}

            {/* icon badge */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200 ${
              attending === "yes"
                ? "bg-[#ffd85b]/15 shadow-inner"
                : "bg-emerald-50 group-hover:bg-emerald-100"
            }`}>
              <CheckIcon className={`w-6 h-6 transition-colors duration-200 ${
                attending === "yes" ? "text-[#ffd85b]" : "text-emerald-500"
              }`} />
            </div>

            <p className={`font-bold text-sm font-eng leading-tight ${attending === "yes" ? "text-white" : "text-[#250c58]"}`}>
              Yes, I will attend
            </p>
            <p className={`text-[11px] mt-1 font-eng ${attending === "yes" ? "text-white/50" : "text-[#4c139e]/35"}`}>
              Count me in!
            </p>

            {/* selected tick */}
            {attending === "yes" && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#ffd85b]/20 flex items-center justify-center">
                <CheckIcon className="w-3 h-3 text-[#ffd85b]" />
              </div>
            )}
          </button>

          {/* No card */}
          <button
            onClick={() => setAttending("no")}
            className={`relative rounded-2xl p-5 border-2 text-left transition-all duration-250 overflow-hidden group ${
              attending === "no"
                ? "border-transparent shadow-xl shadow-[#340f80]/25"
                : "border-[#e8e0f0] bg-white hover:border-red-200 hover:shadow-lg"
            }`}
            style={attending === "no"
              ? { background: "linear-gradient(145deg, #130836 0%, #250c58 55%, #340f80 100%)" }
              : {}}
          >
            {/* icon badge */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-200 ${
              attending === "no"
                ? "bg-white/8 shadow-inner"
                : "bg-red-50 group-hover:bg-red-100"
            }`}>
              <CrossIcon className={`w-5 h-5 transition-colors duration-200 ${
                attending === "no" ? "text-red-300" : "text-red-400"
              }`} />
            </div>

            <p className={`font-bold text-sm font-eng leading-tight ${attending === "no" ? "text-white" : "text-[#250c58]"}`}>
              Unable to attend
            </p>
            <p className={`text-[11px] mt-1 font-eng ${attending === "no" ? "text-white/50" : "text-[#4c139e]/35"}`}>
              I&apos;ll miss this one
            </p>

            {/* selected tick */}
            {attending === "no" && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <CrossIcon className="w-2.5 h-2.5 text-red-300" />
              </div>
            )}
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
