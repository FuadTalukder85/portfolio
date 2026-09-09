"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

function getBannerPath(w: number, h: number) {
  if (w <= 0 || h <= 0) return "";

  const isMobile = w < 640;
  const isTablet = w < 1024;

  const r = isMobile ? 24 : 38;
  const notchH = isMobile ? 44 : isTablet ? 54 : 64;
  const shelfW = isMobile ? 70 : isTablet ? 100 : 130;
  const transW = isMobile ? 50 : isTablet ? 70 : 85;
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
        className="relative min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden"
      >
        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] pointer-events-none" />

        {/* Inner Frame Box with Custom Curved Corners */}
        <div
          ref={containerRef}
          className="relative z-10 w-full max-w-[1800px] min-h-[80vh] md:h-[92vh] px-6 sm:px-10 md:px-14 lg:px-20 pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-20 md:pb-24 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
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

          {/* Top-Right Cutout: Menu Button aligned top & right with curve border */}
          <div className="absolute top-0 right-0 z-30 pointer-events-auto">
            <Navbar />
          </div>

          <div className="absolute bottom-2.5 sm:bottom-3.5 md:bottom-4 left-5 sm:left-8 md:left-10 flex gap-1.5 sm:gap-2 pointer-events-none z-20">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="w-1 sm:w-1.5 h-6 sm:h-7 md:h-8 bg-white/70 rounded-full -skew-x-[28deg]"
              />
            ))}
          </div>

          {/* Hero Title */}
          <div className="relative z-10 mx-auto my-auto py-6 font-syne uppercase leading-[0.88] select-none">
            {/* Line 1: Solid Bold FULL-STACK */}
            <h1 className="text-[clamp(2.5rem,6.9vw,7.8rem)] font-extrabold tracking-tight text-white whitespace-nowrap mb-1 md:mb-2">
              FULL-STACK
            </h1>

            {/* Line 2: Stroked Outline DEVELOPER */}
            <div className="flex items-baseline gap-1.5 md:gap-2 text-[clamp(2.5rem,6.9vw,7.8rem)] font-extrabold tracking-tight whitespace-nowrap">
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
          </div>

          {/* Bottom Row: Bio & Call-to-action */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
            <p className="max-w-md text-sm sm:text-base text-gray-300/90 leading-relaxed font-sans">
              Fuad Talukder — I build web apps &amp; AI tools that make
              problems disappear. Solo, end to end, Dhaka to worldwide.
            </p>

            <a
              href="#projects"
              className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-white uppercase hover:text-emerald-400 transition-colors"
            >
              <span className="border-b border-white/40 pb-1 group-hover:border-emerald-400 transition-colors">
                See the work
              </span>
              <span className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-400/10 transition-all">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
