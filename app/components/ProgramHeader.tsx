"use client";

import Image from "next/image";

export default function ProgramHeader() {
  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm py-3 px-4">
      <div className="max-w-5xl mx-auto">
        <Image
          src="/images/program_guidline.png"
          alt="TechPreneur — Supported By and Implemented By"
          width={1200}
          height={90}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
