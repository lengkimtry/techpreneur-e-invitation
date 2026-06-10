"use client";

const agenda = [
  { time: "9:00 – 9:30", activity: "Arrival, Registration & Networking" },
  { time: "9:30 – 9:35", activity: "National Anthem" },
  {
    time: "9:35 – 9:40",
    activity: "Welcome Remarks by Mr. Chanda Pen, CEO of ELIX Organization",
  },
  {
    time: "9:40 – 9:45",
    activity: "Key Remarks by Dr. Matthias Bickel, Country Director of GIZ Cambodia",
  },
  {
    time: "9:45 – 9:55",
    activity:
      "Program Overview & Expectation by Mrs. Lay Sivhuang, Managing Director of DICHI Academy",
  },
  { time: "9:55 – 10:00", activity: "Alumni Impression" },
  { time: "10:00 – 10:10", activity: "Student Representative Impressions" },
  { time: "10:10 – 10:15", activity: "Program Partners' Highlight" },
  { time: "10:15 – 10:20", activity: "Remarks by a Representative from Grab" },
  {
    time: "10:20 – 10:25",
    activity:
      "Remarks by H.E. Dr. Chhieng Vanmunin, Delegate of the Royal Government of Cambodia, in charge as CEO of Khmer Enterprise",
  },
  {
    time: "10:25 – 10:30",
    activity:
      "Opening Remarks by H.E. Dr. So Visothy, Secretary of State of the Ministry of Post and Telecommunications",
  },
  { time: "10:30 – 10:35", activity: "Official Program Launch Countdown", highlight: true },
  { time: "10:35 – 10:40", activity: "Group Photo Session" },
  { time: "10:40 – 11:30", activity: "Closing & Networking" },
];

export default function EventAgenda() {
  return (
    <section id="agenda" className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block text-[#4c139e] text-[11px] uppercase tracking-[0.35em] font-eng font-semibold mb-2">
            Program
          </span>
          <h2 className="text-[#250c58] font-bold text-2xl md:text-3xl mt-1">
            <span className="font-khmer-display-1" style={{ lineHeight: "2" }}>
              កម្មវិធី
            </span>
            &nbsp;|&nbsp;
            <span className="font-eng">Event Agenda</span>
          </h2>
          <div className="w-14 h-1 bg-[#ffd85b] mx-auto mt-4 rounded-full" />
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-[#e8e0f0] shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] bg-[#4c139e] text-white">
            <div className="px-2 sm:px-3 md:px-4 py-3 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide text-center font-eng">
              Time
            </div>
            <div className="px-2 sm:px-3 md:px-4 py-3 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide border-l border-white/20 font-eng">
              Activity
            </div>
          </div>

          {/* Agenda rows */}
          {agenda.map((row, i) => {
            const isHighlight = (row as { highlight?: boolean }).highlight;
            return (
              <div
                key={i}
                className={`grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] border-b border-[#e8e0f0] last:border-0 ${
                  isHighlight
                    ? "bg-[#ffd85b]/15"
                    : i % 2 === 0
                    ? "bg-white"
                    : "bg-[#f4f1f8]"
                }`}
              >
                <div
                  className={`px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold text-center border-r border-[#e8e0f0] flex items-center justify-center font-eng leading-tight ${
                    isHighlight ? "text-[#340f80]" : "text-[#4c139e]"
                  }`}
                >
                  {row.time}
                </div>
                <div
                  className={`px-2 sm:px-3 md:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs md:text-sm leading-relaxed ${
                    isHighlight ? "text-[#250c58] font-semibold" : "text-[#340f80]"
                  }`}
                >
                  {isHighlight && (
                    <span className="inline-block text-[#4c139e] mr-1">✦</span>
                  )}
                  {row.activity}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-[#250c58]/40 text-[11px] mt-5 italic text-center font-eng">
          * The event is conducted in Khmer. The organizer reserves the right to make
          changes to the agenda as necessary.
        </p>
      </div>
    </section>
  );
}
