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
        className="absolute inset-0 z-40 flex items-center justify-center px-4 py-4 opacity-0"
      >
        {/* ── Invitation Card ── */}
        <div
          className="relative w-full max-w-sm overflow-y-auto"
          style={{
            maxHeight: "94vh",
            background: "linear-gradient(160deg, #0c0420 0%, #1a0942 45%, #2d0e70 100%)",
            border: "1.5px solid rgba(255,216,91,0.55)",
            borderRadius: "20px",
            boxShadow: "0 0 70px rgba(255,216,91,0.18), 0 0 140px rgba(76,19,158,0.45), inset 0 1px 0 rgba(255,216,91,0.12)",
          }}
        >
          {/* Inner border */}
          <div className="absolute inset-[7px] rounded-[14px] border border-[#ffd85b]/12 pointer-events-none z-10" />

          {/* Circuit background pattern */}
          <div className="absolute inset-0 rounded-[20px] overflow-hidden opacity-[0.05] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 380 700" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="inv-circuit" x="0" y="0" width="95" height="95" patternUnits="userSpaceOnUse">
                  <path d="M12 48 L36 48 M36 48 L36 24 M36 24 L66 24 M66 24 L66 48 M66 48 L84 48" stroke="#ffd85b" strokeWidth="0.9" fill="none"/>
                  <circle cx="36" cy="48" r="3" fill="#ffd85b"/>
                  <circle cx="66" cy="24" r="3" fill="#ffd85b"/>
                  <path d="M18 78 L18 60 M18 60 L48 60 M48 60 L48 78" stroke="#c8a0ff" strokeWidth="0.6" fill="none"/>
                  <rect x="8" y="8" width="10" height="10" rx="2" fill="none" stroke="#ffd85b" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="380" height="700" fill="url(#inv-circuit)"/>
            </svg>
          </div>

          {/* ── Corner ornaments ── */}
          {/* Top-left */}
          <svg className="absolute top-0 left-0 w-20 h-20 pointer-events-none z-20" viewBox="0 0 80 80" fill="none">
            <path d="M6 40 L6 10 Q6 6 10 6 L40 6" stroke="#ffd85b" strokeWidth="1.5" opacity="0.7"/>
            <path d="M6 24 L18 24" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="6" cy="24" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="18" cy="24" r="2" fill="#ffd85b" opacity="0.45"/>
            <path d="M24 6 L24 18" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="24" cy="6" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="24" cy="18" r="2" fill="#ffd85b" opacity="0.45"/>
            <circle cx="6" cy="6" r="4" fill="none" stroke="#ffd85b" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="6" cy="6" r="1.5" fill="#ffd85b" opacity="0.8"/>
          </svg>
          {/* Top-right */}
          <svg className="absolute top-0 right-0 w-20 h-20 pointer-events-none z-20" viewBox="0 0 80 80" fill="none">
            <path d="M74 40 L74 10 Q74 6 70 6 L40 6" stroke="#ffd85b" strokeWidth="1.5" opacity="0.7"/>
            <path d="M74 24 L62 24" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="74" cy="24" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="62" cy="24" r="2" fill="#ffd85b" opacity="0.45"/>
            <path d="M56 6 L56 18" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="56" cy="6" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="56" cy="18" r="2" fill="#ffd85b" opacity="0.45"/>
            <circle cx="74" cy="6" r="4" fill="none" stroke="#ffd85b" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="74" cy="6" r="1.5" fill="#ffd85b" opacity="0.8"/>
          </svg>
          {/* Bottom-left */}
          <svg className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none z-20" viewBox="0 0 80 80" fill="none">
            <path d="M6 40 L6 70 Q6 74 10 74 L40 74" stroke="#ffd85b" strokeWidth="1.5" opacity="0.7"/>
            <path d="M6 56 L18 56" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="6" cy="56" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="18" cy="56" r="2" fill="#ffd85b" opacity="0.45"/>
            <path d="M24 74 L24 62" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="24" cy="74" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="24" cy="62" r="2" fill="#ffd85b" opacity="0.45"/>
            <circle cx="6" cy="74" r="4" fill="none" stroke="#ffd85b" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="6" cy="74" r="1.5" fill="#ffd85b" opacity="0.8"/>
          </svg>
          {/* Bottom-right */}
          <svg className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none z-20" viewBox="0 0 80 80" fill="none">
            <path d="M74 40 L74 70 Q74 74 70 74 L40 74" stroke="#ffd85b" strokeWidth="1.5" opacity="0.7"/>
            <path d="M74 56 L62 56" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="74" cy="56" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="62" cy="56" r="2" fill="#ffd85b" opacity="0.45"/>
            <path d="M56 74 L56 62" stroke="#ffd85b" strokeWidth="1" opacity="0.5"/>
            <circle cx="56" cy="74" r="2.5" fill="#ffd85b" opacity="0.7"/>
            <circle cx="56" cy="62" r="2" fill="#ffd85b" opacity="0.45"/>
            <circle cx="74" cy="74" r="4" fill="none" stroke="#ffd85b" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="74" cy="74" r="1.5" fill="#ffd85b" opacity="0.8"/>
          </svg>

          {/* ── Card content ── */}
          <div className="relative z-10 px-8 py-10 text-center">

            {/* Logo */}
            <div className="flex justify-center mb-5">
              <div
                className="bg-white rounded-2xl px-5 py-2.5"
                style={{ boxShadow: "0 0 28px rgba(255,216,91,0.22), 0 6px 20px rgba(0,0,0,0.5)" }}
              >
                <Image
                  src="/images/logo.png"
                  alt="TechPreneur"
                  width={200}
                  height={72}
                  className="h-10 md:h-12 w-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Gold ornament divider */}
            <div className="flex items-center gap-2 mb-5 mx-auto max-w-[220px]">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffd85b]/80" />
              <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="#ffd85b">
                <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"/>
              </svg>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffd85b]/80" />
            </div>

            {/* Invitation badge */}
            <div className="inline-flex items-center gap-2.5 border border-[#ffd85b]/40 px-4 py-1.5 rounded-full mb-4">
              <span className="text-[#ffd85b] text-[10px] uppercase tracking-[0.38em] font-eng font-semibold">Invitation</span>
              <span className="text-[#ffd85b]/40">·</span>
              <span className="text-[#c8a0ff] font-khmer" style={{ fontSize: "13px", lineHeight: "1" }}>សូមគោរពអញ្ជើញ</span>
            </div>

            {/* Event title */}
            <h1 className="text-white font-bold text-2xl md:text-3xl leading-tight mb-1 font-eng">
              Techpreneur<br />Bootcamp 2026
            </h1>
            <p className="text-[#c8a0ff] text-xs tracking-widest uppercase font-eng mb-1">Launching Ceremony</p>
            <p className="text-[#c8a0ff]/60 font-khmer mb-5" style={{ fontSize: "13px" }}>ពិធីបើកដំណើរការ</p>

            {/* Section divider */}
            <div className="flex items-center gap-2 mb-5 mx-auto max-w-[200px]">
              <div className="flex-1 h-px bg-[#ffd85b]/30" />
              <span className="text-[#ffd85b]/50 text-[9px] tracking-widest">✦ ✦ ✦</span>
              <div className="flex-1 h-px bg-[#ffd85b]/30" />
            </div>

            {/* Event details */}
            <div className="space-y-3 mb-5 text-left">
              <div className="flex items-center gap-3 bg-white/8 rounded-xl px-4 py-3 border border-[#ffd85b]/15">
                <div className="w-8 h-8 rounded-lg bg-[#ffd85b]/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#ffd85b]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#ffd85b] font-bold text-sm font-eng leading-none">June 25th, 2026</p>
                  <p className="text-[#c8a0ff] text-xs mt-0.5 font-eng">09:00 — 12:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/8 rounded-xl px-4 py-3 border border-[#ffd85b]/15">
                <div className="w-8 h-8 rounded-lg bg-[#ffd85b]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#ffd85b]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm font-eng leading-snug">Ministry of Posts &amp; Telecom</p>
                  <p className="text-[#c8a0ff] text-xs mt-0.5 font-eng">Hall on the 3rd Floor · Phnom Penh</p>
                </div>
              </div>
            </div>

            {/* Guest section */}
            {guestName ? (
              <>
                {/* Section divider */}
                <div className="flex items-center gap-2 mb-5 mx-auto max-w-[200px]">
                  <div className="flex-1 h-px bg-[#ffd85b]/30" />
                  <span className="text-[#ffd85b]/50 text-[9px] tracking-widest">✦ ✦ ✦</span>
                  <div className="flex-1 h-px bg-[#ffd85b]/30" />
                </div>

                {/* Guest card */}
                <div
                  className="rounded-2xl px-5 py-5 mb-6 text-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,216,91,0.08) 0%, rgba(76,19,158,0.3) 100%)",
                    border: "1px solid rgba(255,216,91,0.3)",
                  }}
                >
                  {logoUrl && (
                    <div className="flex justify-center mb-4">
                      <div className="bg-white rounded-xl px-5 py-2.5 flex items-center justify-center shadow-lg" style={{ maxWidth: "150px", minHeight: "56px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logoUrl} alt="Company Logo" className="max-h-10 w-auto object-contain" />
                      </div>
                    </div>
                  )}
                  <p className="text-[#ffd85b]/70 text-[10px] font-eng uppercase tracking-[0.4em] mb-2">Cordially Invited</p>
                  <p className="text-white font-bold text-2xl md:text-3xl font-eng leading-tight mb-1">{guestName}</p>
                  {companyName && (
                    <p className="text-[#c8a0ff] text-sm font-eng mt-1.5 font-semibold">{companyName}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="mb-6" />
            )}

            {/* CTA button */}
            <button
              onClick={handleOpen}
              className="group relative overflow-hidden w-full bg-gradient-to-r from-[#ffd85b] to-[#d4a020] text-[#250c58] font-bold text-sm md:text-base py-3.5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              style={{ boxShadow: "0 4px 24px rgba(255,216,91,0.4)" }}
            >
              <span className="relative z-10 font-eng tracking-wide">Open Invitation</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
