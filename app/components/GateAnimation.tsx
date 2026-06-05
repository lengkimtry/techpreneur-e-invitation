"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface GateAnimationProps {
  onGateOpened: () => void;
  guestName?: string;
  companyName?: string;
  logoUrl?: string;
}

export default function GateAnimation({ onGateOpened, guestName, companyName, logoUrl }: GateAnimationProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksCanvasRef = useRef<HTMLCanvasElement>(null);
  const sparkleRafRef = useRef<number>(0);
  const fwRafRef = useRef<number>(0);
  const openingRef = useRef(false);

  // ── Sparkle particle system ──
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const canvas = sparkleCanvasRef.current!;
    const fwCanvas = fireworksCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fwCanvas.width = window.innerWidth;
      fwCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type PKind = "circle" | "star" | "diamond";
    type P = {
      x: number; y: number; size: number;
      vx: number; vy: number;
      alpha: number; phase: number; phaseV: number;
      color: string; kind: PKind;
      rot: number; rotV: number;
    };

    const COLORS = ["#ffd85b", "#fff", "#c8a0ff", "#e0c0ff", "#ffe8a0"];
    const particles: P[] = [];

    const make = (): P => ({
      x: Math.random() * canvas.width,
      y: -12,
      size: Math.random() * 5 + 2,
      vx: (Math.random() - 0.5) * 0.8,
      vy: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.65 + 0.3,
      phase: Math.random() * Math.PI * 2,
      phaseV: Math.random() * 0.045 + 0.012,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      kind: (["circle", "star", "diamond"] as PKind[])[Math.floor(Math.random() * 3)],
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 3.5,
    });

    for (let i = 0; i < 70; i++) {
      const p = make();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const drawP = (p: P) => {
      const a = p.alpha * (0.5 + 0.5 * Math.sin(p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      if (p.kind === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.kind === "star") {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const r = i % 2 === 0 ? p.size : p.size * 0.38;
          const angle = (i * Math.PI) / 5 - Math.PI / 2;
          if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
          else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.55, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.55, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.42) particles.push(make());
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.rot += p.rotV; p.phase += p.phaseV;
        drawP(p);
        if (p.y > canvas.height + 20) particles.splice(i, 1);
      }
      sparkleRafRef.current = requestAnimationFrame(tick);
    };
    sparkleRafRef.current = requestAnimationFrame(tick);

    // Curtains fall from above
    const tl = gsap.timeline();
    tl.fromTo(
      [leftRef.current, rightRef.current],
      { yPercent: -100 },
      { yPercent: 0, duration: 1.05, ease: "power3.out", stagger: 0.07 }
    );
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
      "-=0.35"
    );

    // Pulsing glow on button
    const btn = contentRef.current?.querySelector("button");
    if (btn) {
      gsap.to(btn, {
        boxShadow: "0 0 36px rgba(255,216,91,0.55)",
        duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
      });
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(sparkleRafRef.current);
      cancelAnimationFrame(fwRafRef.current);
    };
  }, []);

  // ── Fireworks system ──
  const startFireworks = () => {
    const canvas = fireworksCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    gsap.to(canvas, { opacity: 1, duration: 0.15 });

    const FW_COLORS = [
      "#ffd85b", "#c8a0ff", "#ff6b6b", "#4ecdc4",
      "#ffe66d", "#ffffff", "#ff9f43", "#a29bfe",
      "#fd79a8", "#00cec9", "#6c5ce7", "#e17055",
    ];

    type Shell = {
      x: number; y: number; vy: number; targetY: number;
      color: string; trail: Array<{ x: number; y: number }>;
    };
    type FParticle = {
      x: number; y: number; vx: number; vy: number;
      alpha: number; color: string; size: number; decay: number;
    };

    const shells: Shell[] = [];
    const fps: FParticle[] = [];
    const GRAVITY = 0.13;

    const launch = () => {
      const w = canvas.width;
      const h = canvas.height;
      shells.push({
        x: w * (0.12 + Math.random() * 0.76),
        y: h * 0.98,
        vy: -(h * 0.021 + Math.random() * h * 0.013),
        targetY: h * (0.07 + Math.random() * 0.45),
        color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
        trail: [],
      });
    };

    const explode = (s: Shell) => {
      const count = 70 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const speed = Math.random() * 5 + 1.8;
        fps.push({
          x: s.x, y: s.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.5,
          alpha: 1,
          color: s.color,
          size: Math.random() * 2.8 + 0.8,
          decay: 0.01 + Math.random() * 0.009,
        });
      }
    };

    // First burst: 7 shells staggered
    for (let i = 0; i < 7; i++) {
      setTimeout(() => launch(), i * 90);
    }
    // Second wave after curtains are open
    for (let i = 0; i < 6; i++) {
      setTimeout(() => launch(), 700 + i * 130);
    }
    // Third finale
    for (let i = 0; i < 5; i++) {
      setTimeout(() => launch(), 1600 + i * 100);
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw shells + trails
      for (let i = shells.length - 1; i >= 0; i--) {
        const s = shells[i];
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 9) s.trail.shift();
        s.y += s.vy;
        s.vy += GRAVITY * 0.35;

        for (let j = 0; j < s.trail.length; j++) {
          const frac = j / s.trail.length;
          ctx.save();
          ctx.globalAlpha = frac * 0.85;
          ctx.fillStyle = s.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = s.color;
          ctx.beginPath();
          ctx.arc(s.trail[j].x, s.trail[j].y, 1 + frac * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        if (s.y <= s.targetY) {
          explode(s);
          shells.splice(i, 1);
        }
      }

      // Draw explosion particles
      for (let i = fps.length - 1; i >= 0; i--) {
        const p = fps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += GRAVITY;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) fps.splice(i, 1);
      }

      fwRafRef.current = requestAnimationFrame(tick);
    };
    fwRafRef.current = requestAnimationFrame(tick);
  };

  const handleOpen = () => {
    if (openingRef.current) return;
    openingRef.current = true;

    // Kick off fireworks immediately
    startFireworks();

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(sparkleRafRef.current);
        // Let fireworks run a bit longer before killing them
        setTimeout(() => cancelAnimationFrame(fwRafRef.current), 1200);
      },
    });

    // Fade out content overlay
    tl.to(contentRef.current, { opacity: 0, duration: 0.28, ease: "power2.in" });

    // Phase 1: fabric sway — top of each curtain leans toward exit direction
    gsap.set(leftRef.current, { transformOrigin: "right center" });
    gsap.set(rightRef.current, { transformOrigin: "left center" });
    tl.to(leftRef.current, { skewX: -4, duration: 0.18, ease: "power2.out" }, "-=0.05");
    tl.to(rightRef.current, { skewX: 4, duration: 0.18, ease: "power2.out" }, "<");

    // Phase 2: main wave sweep — slide out while skew relaxes back to 0
    tl.to(leftRef.current, { xPercent: -100, skewX: 0, duration: 0.92, ease: "expo.inOut" }, "+=0.02");
    tl.to(rightRef.current, { xPercent: 100, skewX: 0, duration: 0.92, ease: "expo.inOut" }, "<");

    // Trigger the main content reveal 0.38s into the curtain slide
    // so it starts fading in while curtains are still opening
    tl.add(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
      onGateOpened();
    }, "<+=0.38");

    // Keep gate mounted (and fireworks visible over content) a bit longer
    tl.to({}, { duration: 0.65 });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0d0520]">
      {/* Sparkle canvas — above curtains, below content */}
      <canvas ref={sparkleCanvasRef} className="absolute inset-0 z-30 pointer-events-none" />

      {/* Fireworks canvas — above EVERYTHING, transparent bg, activated on open */}
      <canvas
        ref={fireworksCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: 0, zIndex: 60 }}
      />

      {/* ── Left curtain ── */}
      <div
        ref={leftRef}
        className="absolute left-0 top-0 bottom-0 w-1/2 z-20"
        style={{
          background: "linear-gradient(175deg, #1a0942 0%, #250c58 22%, #340f80 55%, #4c139e 78%, #340f80 92%, #250c58 100%)",
          boxShadow: "inset -14px 0 45px rgba(0,0,0,0.65), 6px 0 24px rgba(0,0,0,0.85)",
        }}
      >
        {/* fabric fold lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 52px, rgba(255,255,255,0.05) 52px, rgba(255,255,255,0.05) 54px, transparent 54px, transparent 78px, rgba(0,0,0,0.12) 78px, rgba(0,0,0,0.12) 80px)",
        }} />
        {/* wavy inner edge — no hard center line */}
        <svg
          className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 30 600"
          style={{ height: "100%" }}
        >
          <path
            d="M 15 0 C 28 30,28 45,15 75 C 2 105,2 120,15 150 C 28 180,28 195,15 225 C 2 255,2 270,15 300 C 28 330,28 345,15 375 C 2 405,2 420,15 450 C 28 480,28 495,15 525 C 2 555,2 570,15 600 L 30 600 L 30 0 Z"
            fill="rgba(13,5,32,0.45)"
          />
          <path
            d="M 15 0 C 28 30,28 45,15 75 C 2 105,2 120,15 150 C 28 180,28 195,15 225 C 2 255,2 270,15 300 C 28 330,28 345,15 375 C 2 405,2 420,15 450 C 28 480,28 495,15 525 C 2 555,2 570,15 600"
            fill="none"
            stroke="rgba(255,216,91,0.18)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ── Right curtain ── */}
      <div
        ref={rightRef}
        className="absolute right-0 top-0 bottom-0 w-1/2 z-20"
        style={{
          background: "linear-gradient(185deg, #250c58 0%, #340f80 18%, #4c139e 48%, #340f80 72%, #250c58 88%, #1a0942 100%)",
          boxShadow: "inset 14px 0 45px rgba(0,0,0,0.65), -6px 0 24px rgba(0,0,0,0.85)",
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 52px, rgba(255,255,255,0.05) 52px, rgba(255,255,255,0.05) 54px, transparent 54px, transparent 78px, rgba(0,0,0,0.12) 78px, rgba(0,0,0,0.12) 80px)",
        }} />
        {/* wavy inner edge — mirrored */}
        <svg
          className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 30 600"
          style={{ height: "100%" }}
        >
          <path
            d="M 15 0 C 2 30,2 45,15 75 C 28 105,28 120,15 150 C 2 180,2 195,15 225 C 28 255,28 270,15 300 C 2 330,2 345,15 375 C 28 405,28 420,15 450 C 2 480,2 495,15 525 C 28 555,28 570,15 600 L 0 600 L 0 0 Z"
            fill="rgba(13,5,32,0.45)"
          />
          <path
            d="M 15 0 C 2 30,2 45,15 75 C 28 105,28 120,15 150 C 2 180,2 195,15 225 C 28 255,28 270,15 300 C 2 330,2 345,15 375 C 28 405,28 420,15 450 C 2 480,2 495,15 525 C 28 555,28 570,15 600"
            fill="none"
            stroke="rgba(255,216,91,0.18)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ── Content overlay ── */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-40 flex flex-col items-center justify-center px-5 text-center opacity-0"
      >
        {/* TechPreneur logo */}
        <div className="mb-5">
          <div
            className="bg-white rounded-2xl px-5 py-3"
            style={{ boxShadow: "0 0 32px rgba(255,216,91,0.2), 0 8px 24px rgba(0,0,0,0.4)" }}
          >
            <Image
              src="/images/logo.png"
              alt="TechPreneur"
              width={220}
              height={80}
              className="h-12 md:h-14 w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5 w-full max-w-[260px]">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd85b]" />
          <span className="text-[#ffd85b]">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd85b]" />
        </div>

        <div className="flex items-center gap-2.5 mb-4 border border-[#ffd85b]/35 px-4 py-1.5 rounded-full">
          <span className="text-[#c8a0ff] text-[11px] uppercase tracking-[0.32em] font-eng">Invitation</span>
          <span className="text-[#ffd85b]/50 text-xs">·</span>
          <span className="text-[#c8a0ff] font-khmer" style={{ fontSize: "14px", lineHeight: "1" }}>សូមគោរពអញ្ជើញ</span>
        </div>

        <h1 className="text-white font-bold text-xl md:text-2xl lg:text-3xl leading-snug mb-1 max-w-xs md:max-w-sm">
          Techpreneur Bootcamp 2026
        </h1>
        <p className="text-[#c8a0ff] text-sm md:text-base mb-6">Launching Ceremony</p>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3.5 mb-7 border border-[#ffd85b]/30 max-w-sm w-full space-y-2.5">
          <div className="flex items-center gap-2.5">
            <svg className="w-4 h-4 text-[#ffd85b] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            <span className="text-[#ffd85b] font-semibold text-xs md:text-sm font-eng">June 25th, 2026 &nbsp;·&nbsp; 09:00 — 12:00</span>
          </div>
          <div className="flex items-start gap-2.5">
            <svg className="w-4 h-4 text-[#f4f1f8] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <div>
              <p className="text-[#f4f1f8] text-xs md:text-sm font-eng">Ministry of Posts and Telecommunications</p>
              <p className="text-[#c8a0ff] text-[11px] mt-0.5 font-eng">Hall on the 3rd Floor · Phnom Penh, Cambodia</p>
            </div>
          </div>
        </div>

        {/* Personalized guest name */}
        {guestName && (
          <div className="mb-6 text-center px-5 py-4 rounded-2xl border border-[#ffd85b]/20 bg-white/5 max-w-sm w-full">
            {logoUrl && (
              <div className="flex justify-center mb-3">
                <div className="bg-white rounded-xl px-4 py-2 flex items-center justify-center" style={{ maxWidth: "130px", maxHeight: "60px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl} alt="Company Logo" className="max-h-10 w-auto object-contain" />
                </div>
              </div>
            )}
            <p className="text-[#c8a0ff]/60 text-[10px] font-eng uppercase tracking-[0.3em] mb-1.5">Cordially Invited</p>
            <p className="text-[#ffd85b] font-bold text-xl md:text-2xl font-eng">{guestName}</p>
            {companyName && <p className="text-white/60 text-xs font-eng mt-1">{companyName}</p>}
          </div>
        )}

        <button
          onClick={handleOpen}
          className="group relative overflow-hidden bg-gradient-to-r from-[#ffd85b] to-[#d4a020] text-[#250c58] font-bold text-sm md:text-base px-9 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ boxShadow: "0 4px 20px rgba(255,216,91,0.35)" }}
        >
          <span className="relative z-10 font-eng">Open Invitation</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}
