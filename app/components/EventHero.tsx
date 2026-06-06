"use client";

const CalendarIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

interface EventHeroProps {
  guestName?: string;
  companyName?: string;
  logoUrl?: string;
}

export default function EventHero({ guestName, companyName, logoUrl }: EventHeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(158deg, #0d0520 0%, #250c58 28%, #340f80 58%, #4c139e 82%, #340f80 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Circuit / tech background pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 900 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M15 60 L45 60 M45 60 L45 30 M45 30 L80 30 M80 30 L80 60 M80 60 L105 60" stroke="#ffd85b" strokeWidth="1.2" fill="none" />
              <circle cx="45" cy="60" r="3.5" fill="#ffd85b" />
              <circle cx="80" cy="30" r="3.5" fill="#ffd85b" />
              <circle cx="80" cy="60" r="2" fill="#c8a0ff" />
              <path d="M20 95 L20 80 M20 80 L55 80 M55 80 L55 95 M55 95 L90 95" stroke="#c8a0ff" strokeWidth="0.8" fill="none" />
              <rect x="10" y="10" width="10" height="10" rx="2" fill="none" stroke="#ffd85b" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="900" height="700" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-16 left-8 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,216,91,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-16 right-8 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,160,255,0.1) 0%, transparent 70%)" }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-10 sm:py-16 px-4 text-center">
        {/* Personalized guest block */}
        {guestName && (
          <div className="mb-8 w-full max-w-md">
            {/* Photo/logo */}
            {logoUrl && (
              <div className="mb-5 relative">
                {/* Glow halo */}
                <div
                  className="absolute -inset-3 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, rgba(255,216,91,0.2) 0%, transparent 70%)", filter: "blur(12px)" }}
                />
                {/* Photo card — full width, natural height (no crop) */}
                <div
                  className="relative rounded-2xl overflow-hidden w-full"
                  style={{
                    boxShadow: "0 0 0 2px rgba(255,216,91,0.5), 0 16px 48px rgba(0,0,0,0.55)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl}
                    alt="Guest"
                    className="w-full h-auto block"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(13,5,32,0.5) 100%)" }} />
                </div>
                {/* Corner dots */}
                <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[#ffd85b] opacity-80" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ffd85b] opacity-80" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#ffd85b] opacity-80" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#ffd85b] opacity-80" />
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 mb-3 mx-auto max-w-[200px]">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd85b]/60" />
              <span className="text-[#ffd85b] text-xs">✦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd85b]/60" />
            </div>

            <p className="text-[#c8a0ff]/60 text-xs font-eng uppercase tracking-[0.4em] mb-2">Cordially Invited</p>
            <p className="text-white font-bold text-3xl sm:text-4xl md:text-5xl font-eng leading-tight">{guestName}</p>
            {companyName && (
              <div className="mt-3 inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 border border-[#ffd85b]/25">
                <p className="text-[#ffd85b] text-base font-eng font-semibold">{companyName}</p>
              </div>
            )}
          </div>
        )}

        {/* Invitation badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2.5 border border-[#ffd85b]/40 px-5 py-2 rounded-full">
            <span className="text-[#ffd85b] text-sm uppercase tracking-[0.38em] font-eng font-semibold">
              Invitation
            </span>
            <span className="text-[#ffd85b]/50 text-sm">·</span>
            <span className="text-[#ffd85b] font-khmer" style={{ fontSize: "16px", lineHeight: "1" }}>
              សូមគោរពអញ្ជើញ
            </span>
          </div>
        </div>

        {/* Event name */}
        <div className="mb-2">
          <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl leading-tight font-eng inline">
            Techpreneur Bootcamp{" "}
          </h1>
          <span className="text-[#ffd85b] font-bold text-3xl md:text-4xl lg:text-5xl font-eng">
            2026
          </span>
        </div>

        {/* Khmer + English subtitle */}
        <div className="flex flex-col items-center gap-0.5 mb-8">
          <p className="text-[#c8a0ff] font-khmer" style={{ fontSize: "17px", lineHeight: "1.5", fontWeight: 300 }}>
            ពិធីបើកដំណើរការ
          </p>
          <p className="text-[#f4f1f8]/60 text-sm font-eng tracking-[0.22em] uppercase">
            Launching Ceremony
          </p>
        </div>

        {/* Gold divider */}
        <div className="flex items-center gap-3 mb-9 w-full max-w-[240px]">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd85b]" />
          <span className="text-[#ffd85b] text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd85b]" />
        </div>

        {/* Details card — SVG icons */}
        <div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/15 max-w-sm w-full mb-9 text-left space-y-3 sm:space-y-4 shadow-xl"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-start gap-4">
            <span className="text-[#ffd85b]"><CalendarIcon /></span>
            <div>
              <p className="text-white font-semibold text-base font-eng">June 25th, 2026</p>
              <p className="text-[#c8a0ff] text-sm mt-0.5">09:00 AM — 12:00 PM</p>
            </div>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-start gap-4">
            <span className="text-[#ffd85b]"><MapPinIcon /></span>
            <div>
              <p className="text-white font-semibold text-base font-eng">Ministry of Posts and Telecommunications</p>
              <p className="text-[#c8a0ff] text-sm mt-0.5">Hall on the 3rd Floor · Phnom Penh, Cambodia</p>
            </div>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex items-start gap-4">
            <span className="text-[#ffd85b]"><BuildingIcon /></span>
            <div>
              <p className="text-white font-semibold text-base font-eng">Organized by</p>
              <p className="text-[#c8a0ff] text-sm mt-0.5">DICHI Academy &amp; ELIX Organization</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-2 text-[#f4f1f8]/50 hover:text-[#ffd85b] transition-colors duration-300"
        >
          <span className="text-xs uppercase tracking-widest font-eng">View Program</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
