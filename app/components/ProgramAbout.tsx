"use client";

const CodeBracketIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const CpuChipIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
  </svg>
);

const RocketLaunchIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-7 h-7 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg className="w-7 h-7 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

const UserGroupIcon = () => (
  <svg className="w-7 h-7 mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const skills = [
  { Icon: CodeBracketIcon, label: "Full-Stack Development" },
  { Icon: CpuChipIcon, label: "AI & Data Science" },
  { Icon: RocketLaunchIcon, label: "Entrepreneurship" },
];

const highlights = [
  { Icon: ClockIcon, num: "7-Month", label: "Intensive Program" },
  { Icon: AcademicCapIcon, num: "60", label: "Finalists Selected" },
  { Icon: UserGroupIcon, num: "1,100+", label: "Total Applicants" },
];

export default function ProgramAbout() {
  return (
    <section id="about" className="py-16 md:py-20 px-4" style={{ background: "#f4f1f8" }}>
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[#4c139e] text-[11px] uppercase tracking-[0.35em] font-eng font-semibold mb-2">
            About the Program
          </span>
          <h2 className="text-[#250c58] font-bold text-2xl md:text-3xl font-eng mt-1">
            The Techpreneur Bootcamp
          </h2>
          <div className="w-14 h-1 bg-[#ffd85b] mx-auto mt-4 rounded-full" />
        </div>

        {/* Description card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8e0f0] mb-7">
          <p className="text-[#340f80] text-sm md:text-base leading-loose mb-4">
            <strong>DICHI Academy</strong> and <strong>ELIX Organization</strong> are pleased to
            invite you to the Techpreneur Bootcamp 2026 Launching Ceremony — an intensive,
            hands-on 7-month-long program aimed at equipping students with full-stack
            development, AI &amp; Data Science, and entrepreneurship skills.
          </p>
          <p className="text-[#4c139e]/75 text-sm leading-loose">
            The Bootcamp addresses the global shortage of tech talent by building a highly
            specialized talent pool, connecting graduates with career opportunities through
            17 respected industry partners and supporters. This ceremony celebrates 60
            exceptional finalists chosen from over 1,100 applicants for the 2026 cohort.
          </p>
        </div>

        {/* Skills — Heroicon SVGs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-7">
          {skills.map(({ Icon, label }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-3 sm:p-4 md:p-5 text-center shadow-sm border border-[#e8e0f0] flex flex-col items-center gap-1.5 sm:gap-2"
            >
              <span className="text-[#4c139e] scale-75 sm:scale-100 origin-center">
                <Icon />
              </span>
              <span className="text-[#340f80] text-[10px] sm:text-[11px] md:text-xs font-semibold leading-tight text-center">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats — Heroicon SVGs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-10">
          {highlights.map(({ Icon, num, label }) => (
            <div
              key={num}
              className="bg-gradient-to-br from-[#340f80] to-[#4c139e] rounded-xl p-3 sm:p-4 md:p-5 text-center shadow-md"
            >
              <div className="text-[#ffd85b] mb-1 scale-75 sm:scale-100 origin-center">
                <Icon />
              </div>
              <div className="text-[#ffd85b] font-bold text-base sm:text-lg md:text-2xl font-eng">{num}</div>
              <div className="text-white/70 text-[10px] sm:text-[11px] md:text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll nudge → Agenda */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 text-[#4c139e]/50 hover:text-[#4c139e] transition-colors duration-300 group"
          >
            <span className="text-[11px] uppercase tracking-widest font-eng font-semibold group-hover:text-[#4c139e]">
              View Agenda
            </span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
