"use client";

import React, { useEffect, useRef, useState } from "react";
import HeroCanvas from "./HeroCanvas";

function getBannerPath(w: number, h: number) {
  if (w <= 0 || h <= 0) return "";

  const isMobile = w < 640;
  const isTablet = w < 1024;

  const r = isMobile ? 18 : 38;
  const notchH = isMobile ? 38 : isTablet ? 54 : 64;
  const shelfW = isMobile ? 60 : isTablet ? 100 : 130;
  const transW = isMobile ? 40 : isTablet ? 70 : 85;
  const notchW = shelfW + transW;

  return [
    `M 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    `L ${w - notchW} 0`,
    `C ${w - notchW + transW * 0.5} 0, ${w - shelfW - transW * 0.5} ${notchH}, ${w - shelfW} ${notchH}`,
    `L ${w - r} ${notchH}`,
    `A ${r} ${r} 0 0 1 ${w} ${notchH + r}`,
    `L ${w} ${h - r}`,
    `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
    `L ${notchW} ${h}`,
    `C ${notchW - transW * 0.5} ${h}, ${shelfW + transW * 0.5} ${h - notchH}, ${shelfW} ${h - notchH}`,
    `L ${r} ${h - notchH}`,
    `A ${r} ${r} 0 0 1 0 ${h - notchH - r}`,
    "Z",
  ].join(" ");
}

function SquareArrowOutUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-move-up-right ${className || ""}`}
    >
      <path d="M13 5H19V11" />
      <path d="M19 5L5 19" />
    </svg>
  );
}

export default function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 1200, h: 650 });

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setSize({ w: Math.round(width), h: Math.round(height) });
        }
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const pathD = getBannerPath(size.w, size.h);

  return (
    <section>
      <div
        id="home"
        className="relative min-h-screen bg-[#0a0a0c] bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-[1px] pointer-events-none" />

        {/* Ambient background matching About section */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Subtle grid pattern matching About section */}
          <div
            className="absolute inset-0 opacity-25 bg-right-top bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: "url('/p1-bg-shape-1.webp')",
              backgroundSize: 'contain',
            }}
          />
          {/* Left ambient shape glow matching About section */}
          <div
            className="absolute top-0 left-0 w-[240px] h-[460px] opacity-30 bg-no-repeat bg-left-top pointer-events-none"
            style={{ backgroundImage: "url('/a1-bg-shape-bg-2.webp')", backgroundSize: 'contain' }}
          />

          {/* Subtle ambient firefly glow circles matching About section */}
          <div className="absolute top-1/4 left-4 w-72 h-72 rounded-full bg-[#d6f345]/8 blur-[100px]" />
          <div className="absolute top-1/2 right-4 w-72 h-72 rounded-full bg-[#d6f345]/8 blur-[100px]" />

          {/* Floating lime particle dots */}
          <div className="absolute top-24 left-[8%] w-2 h-2 rounded-full bg-[#d6f345] opacity-75 animate-pulse shadow-[0_0_8px_#d6f345]" />
          <div className="absolute top-44 left-[12%] w-1.5 h-1.5 rounded-full bg-[#d6f345] opacity-50 shadow-[0_0_6px_#d6f345]" />
          <div className="absolute top-36 right-[10%] w-2 h-2 rounded-full bg-[#d6f345] opacity-80 animate-pulse shadow-[0_0_8px_#d6f345]" />
          <div className="absolute top-64 right-[6%] w-1.5 h-1.5 rounded-full bg-[#d6f345] opacity-60 shadow-[0_0_6px_#d6f345]" />
        </div>

        {/* Inner Frame Box with Custom Curved Corners */}
        <div
          ref={containerRef}
          className="relative z-10 w-full max-w-[1800px] min-h-[85vh] md:h-[92vh] px-4 sm:px-10 md:px-14 lg:px-20 pt-12 sm:pt-14 md:pt-16 pb-14 sm:pb-20 md:pb-24 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          {/* SVG Definitions, Background Fill & Crisp Vector Border */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox={`0 0 ${size.w} ${size.h}`}
          >
            <defs>
              <clipPath id="banner-corner-clip">
                <path d={pathD} />
              </clipPath>
            </defs>
            <path
              d={pathD}
              fill="rgba(0, 0, 0, 0.25)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Blurred Backdrop clipped to exact curve */}
          <div
            className="absolute inset-0 backdrop-blur-sm pointer-events-none z-0"
            style={{
              clipPath: "url(#banner-corner-clip)",
              WebkitClipPath: "url(#banner-corner-clip)",
            }}
          />

          {/* Top-Right Cutout shelf for globally fixed Menu Button */}

          <div className="absolute bottom-2 sm:bottom-3.5 md:bottom-4 left-3.5 sm:left-8 md:left-10 flex gap-1 sm:gap-2 pointer-events-none z-20">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-1 sm:w-1.5 h-5 sm:h-7 md:h-8 bg-white/70 rounded-full -skew-x-[28deg]"
              />
            ))}
          </div>

          {/* Hero Title */}
          <div className="relative z-10 mx-auto my-auto py-4 sm:py-6 font-syne uppercase leading-[0.9] sm:leading-[0.88] select-none text-center w-full flex flex-col items-center justify-center">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
              <HeroCanvas />
            </div>
            {/* Line 1: Solid Bold FULL-STACK */}
            <h1 className="text-center text-[clamp(1.1rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#d6f345] mb-1 md:mb-4 w-full">
              FUAD TALUKDER
            </h1>
            <h1 className="text-center text-[clamp(1.4rem,7.2vw,7.8rem)] font-extrabold tracking-tight text-white mb-1 md:mb-2 w-full">
              FULL-STACK
            </h1>

            {/* Line 2: Stroked Outline DEVELOPER */}
            <div className="w-full flex items-center justify-center text-[clamp(1.4rem,7.2vw,7.8rem)] font-extrabold tracking-tight mb-3 md:mb-4">
              <span
                className="inline-block transition-all duration-300 hover:text-white/90"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.75)",
                }}
              >
                DEVELOPER
              </span>
            </div>
            <p className="max-w-[700px] text-center mx-auto text-xs sm:text-sm md:text-base text-[#838383] leading-relaxed font-sans px-2">
              Specializing in: Full-Stack Development, Workflow Automation, PostgreSQL & Prisma, Stripe Payments, Next.js App Router, Zod Validation
            </p>

          </div>

          {/* Bottom Row: Bio & Call-to-action */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-end gap-6 pt-4 sm:pt-6 border-t border-white/10 w-full">
            <div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d6f345] hover:text-white flex items-center justify-center gap-1.5 px-5 py-2 rounded-full cursor-pointer relative bg-[#090A0C] border border-white/20 hover:border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white group"
              >
                <span className="uppercase font-bold text-xs sm:text-sm select-none">Resume</span>
                <SquareArrowOutUpRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
