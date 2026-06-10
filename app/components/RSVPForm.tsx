"use client";

import { useState } from "react";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12L10.2426 16.2426L18.727 7.75732" />
  </svg>
);


interface RSVPFormProps {
  guestName?: string;
  companyName?: string;
}

export default function RSVPForm({ guestName, companyName }: RSVPFormProps) {
  const [attending] = useState<"yes" | "no" | null>("yes");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: guestName || "",
    company: companyName || "",
    position: "",
    phone: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please fill in your name and phone number.");
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
        <div className="max-w-md mx-auto">
          {attending === "yes" ? (
            <div className="relative rounded-3xl overflow-hidden text-center"
              style={{ background: "linear-gradient(155deg, #1a0942 0%, #2d0e70 35%, #4c139e 75%, #340f80 100%)" }}>

              {/* Circuit pattern */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="circuit-success" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M10 40 L30 40 M30 40 L30 20 M30 20 L55 20 M55 20 L55 40 M55 40 L70 40" stroke="#ffd85b" strokeWidth="0.8" fill="none" />
                      <circle cx="30" cy="40" r="2.5" fill="#ffd85b" />
                      <circle cx="55" cy="20" r="2.5" fill="#ffd85b" />
                      <circle cx="55" cy="40" r="1.5" fill="#c8a0ff" />
                      <path d="M15 65 L15 55 M15 55 L40 55 M40 55 L40 65 M40 65 L60 65" stroke="#c8a0ff" strokeWidth="0.5" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="400" height="500" fill="url(#circuit-success)" />
                </svg>
              </div>

              {/* Top scattered decorations */}
              <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "130px" }}>
                <svg viewBox="0 0 360 130" className="w-full h-full" fill="none">
                  <path d="M38 28 L40.5 35 L48 37.5 L40.5 40 L38 47 L35.5 40 L28 37.5 L35.5 35 Z" fill="#ffd85b" opacity="0.8"/>
                  <path d="M130 16 L131.5 21 L136 23 L131.5 25 L130 30 L128.5 25 L124 23 L128.5 21 Z" fill="#ffd85b" opacity="0.55"/>
                  <path d="M322 32 L324.5 39 L332 41.5 L324.5 44 L322 51 L319.5 44 L312 41.5 L319.5 39 Z" fill="#ffd85b" opacity="0.75"/>
                  <path d="M65 55 L68 62 L65 69 L62 62 Z" fill="#c8a0ff" opacity="0.6"/>
                  <path d="M295 58 L298 65 L295 72 L292 65 Z" fill="#ffd85b" opacity="0.5"/>
                  <circle cx="180" cy="20" r="4" fill="#c8a0ff" opacity="0.4"/>
                  <circle cx="90" cy="28" r="2.5" fill="#ffd85b" opacity="0.35"/>
                  <circle cx="250" cy="42" r="2" fill="#c8a0ff" opacity="0.4"/>
                  <circle cx="165" cy="48" r="1.5" fill="#ffd85b" opacity="0.3"/>
                  <path d="M280 18 L281.2 21.5 L284 22.5 L281.2 23.5 L280 27 L278.8 23.5 L276 22.5 L278.8 21.5 Z" fill="#ffd85b" opacity="0.5"/>
                  <line x1="22" y1="60" x2="22" y2="70" stroke="#ffd85b" strokeWidth="1.2" opacity="0.45"/>
                  <line x1="17" y1="65" x2="27" y2="65" stroke="#ffd85b" strokeWidth="1.2" opacity="0.45"/>
                  <line x1="340" y1="18" x2="340" y2="28" stroke="#c8a0ff" strokeWidth="1.2" opacity="0.4"/>
                  <line x1="335" y1="23" x2="345" y2="23" stroke="#c8a0ff" strokeWidth="1.2" opacity="0.4"/>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 px-8 py-12 pt-14">
                {/* Success illustration */}
                <div className="flex justify-center mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/success.svg" alt="Success" className="w-48 h-auto drop-shadow-lg" />
                </div>

                {/* Glowing checkmark */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute w-28 h-28 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,216,91,0.28) 0%, transparent 70%)" }} />
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 border-[#ffd85b]/60 bg-[#ffd85b]/10">
                    <CheckIcon className="w-10 h-10 text-[#ffd85b]" />
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5 mx-auto max-w-[160px]">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd85b]/70" />
                  <span className="text-[#ffd85b] text-xs">✦</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd85b]/70" />
                </div>

                <h3 className="text-white font-bold text-2xl font-eng mb-3">See You There!</h3>
                <p className="text-[#c8a0ff] text-sm font-eng leading-relaxed mb-7">
                  Your attendance has been recorded. We look forward to seeing you on{" "}
                  <span className="text-[#ffd85b] font-semibold">June 25th, 2026</span>.
                </p>

                {/* Event details */}
                <div className="space-y-2.5 mb-8">
                  <div className="flex items-center justify-center gap-2.5 bg-white/10 rounded-full px-5 py-2 border border-white/10">
                    <svg className="w-3.5 h-3.5 text-[#ffd85b] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                    </svg>
                    <span className="text-white/85 text-xs font-eng font-semibold">June 25th, 2026 · 09:00 AM</span>
                  </div>
                  <div className="flex items-center justify-center gap-2.5 bg-white/10 rounded-full px-5 py-2 border border-white/10">
                    <svg className="w-3.5 h-3.5 text-[#ffd85b] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-white/80 text-xs font-eng">Ministry of Posts &amp; Telecom · 3rd Floor</span>
                  </div>
                </div>

                {/* Bottom ornament */}
                <div className="flex items-center gap-2 mx-auto max-w-[200px]">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd85b]/40" />
                  <span className="text-[#ffd85b]/50 text-[9px] tracking-widest font-eng">✦ ✦ ✦</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd85b]/40" />
                </div>
              </div>

              {/* Bottom scattered decorations */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "70px" }}>
                <svg viewBox="0 0 360 70" className="w-full h-full" fill="none">
                  <path d="M25 22 L27 28 L33 30.5 L27 33 L25 39 L23 33 L17 30.5 L23 28 Z" fill="#c8a0ff" opacity="0.4"/>
                  <path d="M335 15 L337 21 L343 23.5 L337 26 L335 32 L333 26 L327 23.5 L333 21 Z" fill="#ffd85b" opacity="0.4"/>
                  <circle cx="130" cy="50" r="3" fill="#ffd85b" opacity="0.25"/>
                  <circle cx="230" cy="45" r="2" fill="#c8a0ff" opacity="0.3"/>
                  <path d="M180 38 L182 44 L180 50 L178 44 Z" fill="#ffd85b" opacity="0.35"/>
                </svg>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-10 text-center"
              style={{ background: "linear-gradient(135deg, #340f80 0%, #4c139e 100%)" }}>
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10">
                  <CrossIcon className="w-7 h-7 text-[#c8a0ff]" />
                </div>
              </div>
              <h3 className="text-white font-bold text-xl font-eng mb-2">Thank you for letting us know</h3>
              <p className="text-[#c8a0ff] text-sm font-eng leading-relaxed">
                We appreciate your response and hope to see you at future events.
              </p>
            </div>
          )}
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

        {/* Attending confirmation */}
        <div className="mb-7">
          <div
            className="rounded-2xl pt-7 pb-6 px-4 border-transparent shadow-xl shadow-[#4c139e]/30 text-center"
            style={{ background: "linear-gradient(150deg, #2d0e70 0%, #4c139e 100%)" }}
          >
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 bg-[#ffd85b]/20">
              <CheckIcon className="w-8 h-8 text-[#ffd85b]" />
            </div>
            <p className="font-bold text-sm font-eng text-white">Yes, I will attend</p>
            <p className="text-[11px] mt-1 font-eng text-[#ffd85b]/70">Count me in!</p>
          </div>
        </div>

        {/* Form fields */}
        <div className="bg-white rounded-2xl p-6 border border-[#e8e0f0] shadow-sm space-y-4">
          <Field label="Full Name *" value={form.name} onChange={(v) => set("name", v)} placeholder="Your full name" />
          <Field label="School / University" value={form.company} onChange={(v) => set("company", v)} placeholder="Your school or university" />
          <Field label="Major / Year of Study" value={form.position} onChange={(v) => set("position", v)} placeholder="e.g. Computer Science, Year 3" />
          <Field label="Phone Number *" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+855 xx xxx xxx" type="tel" />

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
