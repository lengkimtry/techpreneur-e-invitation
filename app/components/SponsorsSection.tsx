"use client";

import Image from "next/image";

export default function SponsorsSection() {
  return (
    <section className="py-12 md:py-16 px-4" style={{ background: "#f4f1f8" }}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-7">
          <span className="inline-block text-[#4c139e] text-[11px] uppercase tracking-[0.35em] font-eng font-semibold mb-1">
            Our
          </span>
          <h3 className="text-[#250c58] font-bold text-xl md:text-3xl font-eng mt-0.5">
            Partners
          </h3>
          <div className="w-14 h-1 bg-[#ffd85b] mx-auto mt-3 rounded-full" />
        </div>

        {/* Sponsor image */}
        <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-[#e8e0f0]">
          <Image
            src="/images/sponser_and_partner.png"
            alt="Technology Partner, Strategic Partner, Industry Partner, Venue Partner, Media Partner"
            width={1200}
            height={220}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-10 pt-6 border-t border-[#e0d8f0]">
          <p className="text-[#250c58]/40 text-xs font-eng">
            © 2026 Techpreneur Bootcamp &nbsp;·&nbsp; DICHI Academy &amp; ELIX Organization
          </p>
        </div>
      </div>
    </section>
  );
}
