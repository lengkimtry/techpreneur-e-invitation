"use client";

import { useState } from "react";

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
            className="rounded-2xl p-10 border border-[#e8e0f0]"
            style={{ background: "linear-gradient(135deg, #340f80 0%, #4c139e 100%)" }}
          >
            <div className="text-4xl mb-4">{attending === "yes" ? "✅" : "🙏"}</div>
            <h3 className="text-white font-bold text-xl font-eng mb-2">
              {attending === "yes" ? "See you there!" : "Thank you for letting us know"}
            </h3>
            <p className="text-[#c8a0ff] text-sm font-eng">
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
              Responding as <span className="font-semibold text-[#4c139e]">{guestName}</span>
            </p>
          )}
        </div>

        {/* Yes / No selector */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          <button
            onClick={() => setAttending("yes")}
            className={`rounded-2xl p-5 border-2 transition-all duration-200 text-left ${
              attending === "yes"
                ? "border-[#4c139e] bg-[#4c139e] shadow-lg"
                : "border-[#e8e0f0] bg-white hover:border-[#4c139e]/40"
            }`}
          >
            <div className="text-2xl mb-2">✅</div>
            <p className={`font-bold text-sm font-eng ${attending === "yes" ? "text-white" : "text-[#250c58]"}`}>
              Yes, I will attend
            </p>
            <p className={`text-xs mt-0.5 font-eng ${attending === "yes" ? "text-white/70" : "text-[#4c139e]/50"}`}>
              Count me in!
            </p>
          </button>
          <button
            onClick={() => setAttending("no")}
            className={`rounded-2xl p-5 border-2 transition-all duration-200 text-left ${
              attending === "no"
                ? "border-[#340f80] bg-[#340f80] shadow-lg"
                : "border-[#e8e0f0] bg-white hover:border-[#340f80]/40"
            }`}
          >
            <div className="text-2xl mb-2">❌</div>
            <p className={`font-bold text-sm font-eng ${attending === "no" ? "text-white" : "text-[#250c58]"}`}>
              Unable to attend
            </p>
            <p className={`text-xs mt-0.5 font-eng ${attending === "no" ? "text-white/70" : "text-[#4c139e]/50"}`}>
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

            {error && <p className="text-red-500 text-xs font-eng">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4c139e] to-[#340f80] text-white font-bold py-3 rounded-xl font-eng text-sm tracking-wide shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Submitting…" : "Submit Response"}
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
        className="w-full border border-[#e8e0f0] rounded-xl px-4 py-3 text-sm text-[#250c58] placeholder-[#c8a0ff]/60 focus:outline-none focus:border-[#4c139e] font-eng"
      />
    </div>
  );
}
