"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface GateAnimationProps {
  onGateOpened: () => void;
}

export default function GateAnimation({ onGateOpened }: GateAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const namesRef = useRef<HTMLParagraphElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const eventInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling on page load
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Initialize GSAP timeline for entrance animations
    const entranceTimeline = gsap.timeline({
      onComplete: () => {
        // Add continuous animations after entrance completes
        if (titleRef.current) {
          gsap.to(titleRef.current, {
            textShadow:
              "0 4px 20px rgba(0, 0, 0, 0.9), 0 0 80px rgba(255, 215, 0, 1), 0 2px 4px rgba(0, 0, 0, 1)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (monogramRef.current && monogramRef.current.querySelector("img")) {
          gsap.to(monogramRef.current.querySelector("img"), {
            filter: "drop-shadow(0 0 50px rgba(212, 175, 55, 0.8))",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (buttonRef.current) {
          gsap.to(buttonRef.current, {
            scale: 1.05,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      },
    });

    // Fade in content
    entranceTimeline.to(
      contentRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "+=0.3",
    );

    // Animate title
    entranceTimeline.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );

    // Animate names
    entranceTimeline.fromTo(
      namesRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.7",
    );

    // Animate monogram with rotation
    entranceTimeline.fromTo(
      monogramRef.current,
      { opacity: 0, scale: 0.5, rotation: -180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "back.out(1.7)",
      },
      "-=0.8",
    );

    // Animate button
    entranceTimeline.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    );

    // Animate event info
    entranceTimeline.fromTo(
      eventInfoRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.7",
    );
  }, []);

  const handleOpenGate = () => {
    const container = containerRef.current;
    if (!container) return;

    console.log("Opening gate animation started");

    // Animate gate opening
    const openTimeline = gsap.timeline({
      onComplete: () => {
        console.log("Gate animation complete, triggering callback");
        // Re-enable scrolling
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.style.position = "";

        // Ensure we start at the top
        window.scrollTo(0, 0);

        // Trigger callback (parent will handle unmounting)
        onGateOpened();
      },
    });

    // Fade out content
    openTimeline.to(contentRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
    });

    // Zoom out background
    openTimeline.to(
      backgroundRef.current,
      {
        scale: 1.5,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=0.5",
    );
  };

  return (
    <div
      ref={containerRef}
      id="gate-container"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
    >
      <div
        ref={backgroundRef}
        id="gate-background"
        className="absolute inset-0 flex items-center justify-center pointer-events-none w-full h-full"
      >
        <Image
          src="/photos/gate_background_1.jpg"
          alt="Gate Background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
          onLoad={() => console.log("Gate background loaded successfully")}
        />
      </div>

      {/* Main Content Overlay */}
      <div
        ref={contentRef}
        id="gate-content"
        className="relative z-10 flex flex-col items-center justify-between h-full w-full px-4 py-2 md:py-4 lg:py-8 pointer-events-auto opacity-0"
      >
        {/* Top Section: Title, Couple Names, and Monogram */}
        <div className="flex-shrink-0 text-center w-full">
          <h1
            ref={titleRef}
            id="gate-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-khmer-display text-[#FFD700] opacity-0"
            style={{
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 1)",
              WebkitTextStroke: "1px rgba(139, 0, 0, 0.3)",
              lineHeight: "1.8",
              padding: "0.5rem 0",
            }}
          >
            សិរីសួស្តីអាពាហ៍ពិពាហ៍
          </h1>
          <p
            ref={namesRef}
            id="gate-names"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-khmer-display text-white opacity-0"
            style={{
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.95), 0 2px 10px rgba(0, 51, 102, 0.8), 0 0 30px rgba(0, 51, 102, 0.6), 2px 2px 4px rgba(0, 0, 0, 1)",
              WebkitTextStroke: "0.5px rgba(0, 51, 102, 0.5)",
              lineHeight: "1.8",
              padding: "0.5rem 0",
            }}
          >
            ល្មុត ភក្តី & ស្រន់ ឌីនីន
          </p>

          {/* Monogram Image */}
          <div
            ref={monogramRef}
            id="gate-monogram"
            className="mt-4 md:mt-6 lg:mt-8 mb-4 md:mb-6 lg:mb-8 flex justify-center items-center w-full opacity-0"
          >
            <Image
              src="/photos/initial_text_with_frame.png"
              alt="Couple Monogram"
              width={320}
              height={320}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 object-contain drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))",
              }}
              priority
              quality={85}
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Bottom Section: Button and Event Details */}
        <div className="flex justify-between flex-col text-center">
          {/* Open Button */}
          <div className="flex justify-center">
            <button
              ref={buttonRef}
              id="open-gate-btn"
              onClick={handleOpenGate}
              className="group relative bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#B8860B] hover:from-[#D4AF37] hover:to-[#8B6914] text-white font-khmer font-bold text-lg md:text-xl px-4 py-2 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl border-2 border-white/50 opacity-0"
              style={{ lineHeight: "1.2" }}
            >
              <span className="relative z-10">បើកធៀបការ</span>
              <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Event Information */}
          <div
            ref={eventInfoRef}
            id="gate-event-info"
            className="bg-black/40 backdrop-blur-md rounded-2xl px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 lg:py-8 border-2 border-[#D4AF37]/50 shadow-2xl max-w-4xl mx-auto opacity-0 mt-2 md:mt-4 lg:mt-6"
          >
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-khmer text-[#FFD700] mb-3 sm:mb-4 md:mb-5"
              style={{
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                lineHeight: "1.8",
                padding: "0.25rem 0",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            >
              ថ្ងៃសុក្រ ទី២៧ ខែកុម្ភៈ ឆ្នាំ២០២៦ វេលាម៉ោង ៥:០០នាទីល្ងាច
            </p>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-khmer text-[#FFF8DC] leading-relaxed"
              style={{
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                lineHeight: "1.9",
                padding: "0.25rem 0",
              }}
            >
              នៅ គេហដ្ឋានខាងស្រី ស្ថិតនៅ ភូមិកោះដាច់ សង្កាត់កោះដាច់
            </p>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-khmer text-[#FFF8DC] leading-relaxed"
              style={{
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                lineHeight: "1.9",
                padding: "0.25rem 0",
              }}
            >
              ខណ្ឌជ្រោយចង្វារ រាជធានីភ្នំពេញ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
