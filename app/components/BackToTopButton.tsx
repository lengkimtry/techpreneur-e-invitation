"use client";

export default function BackToTopButton() {
  return (
    <button
      id="back-to-top"
      className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-[#4c139e] to-[#340f80] text-white rounded-full shadow-2xl opacity-0 pointer-events-none transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center border-2 border-[#ffd85b]/40"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ boxShadow: "0 4px 20px rgba(76,19,158,0.4)" }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
