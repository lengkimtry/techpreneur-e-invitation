"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GateAnimation from "./GateAnimation";
import ProgramHeader from "./ProgramHeader";
import EventHero from "./EventHero";
import ProgramAbout from "./ProgramAbout";
import EventAgenda from "./EventAgenda";
import RSVPForm from "./RSVPForm";
import SponsorsSection from "./SponsorsSection";
import BackToTopButton from "./BackToTopButton";

interface Props {
  guestName?: string;
  companyName?: string;
  logoUrl?: string;
}

export default function ClientHome({ guestName, companyName, logoUrl }: Props) {
  const [gateOpen, setGateOpen] = useState(false);
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const handleScroll = () => {
      const btn = document.getElementById("back-to-top");
      if (!btn) return;
      if (window.scrollY > 320) {
        gsap.to(btn, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      } else {
        gsap.to(btn, { opacity: 0, pointerEvents: "none", duration: 0.3 });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!gateOpen) return;
    const main = document.getElementById("main-content");
    if (main) {
      gsap.to(main, { opacity: 1, duration: 0.9, ease: "power2.out" });
    }
    ScrollTrigger.refresh();
  }, [gateOpen]);

  return (
    <>
      {showGate && (
        <GateAnimation
          guestName={guestName}
          companyName={companyName}
          logoUrl={logoUrl}
          onGateOpened={() => {
            setGateOpen(true);
            setTimeout(() => setShowGate(false), 1300);
          }}
        />
      )}
      <main id="main-content" className="opacity-0">
        <ProgramHeader />
        <EventHero guestName={guestName} companyName={companyName} logoUrl={logoUrl} />
        <ProgramAbout />
        <EventAgenda />
        <RSVPForm guestName={guestName} companyName={companyName} />
        <SponsorsSection />
      </main>
      <BackToTopButton />
    </>
  );
}
