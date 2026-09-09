'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const statsData = [
  { id: 'stat-1', target: 95, suffix: '%', label: 'Customer satisfaction' },
  { id: 'stat-2', target: 12, suffix: '+', label: 'Years of experience' },
  { id: 'stat-3', target: 22, suffix: '+', label: 'Projects completed' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Counter state
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [hasCounted, setHasCounted] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Stat Counter trigger
      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 85%',
          onEnter: () => {
            if (!hasCounted) {
              setHasCounted(true);
              statsData.forEach((stat, index) => {
                const duration = 1800;
                const steps = 60;
                const stepTime = duration / steps;
                let current = 0;
                const increment = stat.target / steps;

                const timer = setInterval(() => {
                  current += increment;
                  if (current >= stat.target) {
                    current = stat.target;
                    clearInterval(timer);
                  }
                  setCounts((prev) => {
                    const next = [...prev];
                    next[index] = Math.floor(current);
                    return next;
                  });
                }, stepTime);
              });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [hasCounted]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0c] text-white pt-20 pb-16 font-['Space_Grotesk',sans-serif]"
    >
      {/* Background shape overlays & glowing particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Left glow shape */}
        <div
          className="absolute top-10 left-0 w-[240px] h-[460px] opacity-40 bg-no-repeat bg-left-top"
          style={{ backgroundImage: "url('/a1-bg-shape-bg-2.webp')", backgroundSize: 'contain' }}
        />

        {/* Ambient firefly glow circles */}
        <div className="absolute top-1/4 left-4 w-72 h-72 rounded-full bg-[#d6f345]/10 blur-[100px]" />
        <div className="absolute top-1/2 right-4 w-72 h-72 rounded-full bg-[#d6f345]/10 blur-[100px]" />

        {/* Floating lime particle dots */}
        <div className="absolute top-24 left-[8%] w-2 h-2 rounded-full bg-[#d6f345] opacity-75 animate-pulse shadow-[0_0_8px_#d6f345]" />
        <div className="absolute top-44 left-[12%] w-1.5 h-1.5 rounded-full bg-[#d6f345] opacity-50 shadow-[0_0_6px_#d6f345]" />
        <div className="absolute top-36 right-[10%] w-2 h-2 rounded-full bg-[#d6f345] opacity-80 animate-pulse shadow-[0_0_8px_#d6f345]" />
        <div className="absolute top-64 right-[6%] w-1.5 h-1.5 rounded-full bg-[#d6f345] opacity-60 shadow-[0_0_6px_#d6f345]" />
      </div>

      {/* Main content container */}
      <div
        className="relative z-10 w-full pb-12 bg-no-repeat bg-right-top"
        style={{
          backgroundImage: "url('/p1-bg-shape-1.webp')",
          backgroundSize: 'contain',
        }}
      >
        <div className="max-w-[1390px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Title, Emoji, Description, Stats */}
            <div id="about-left-content" className="lg:col-span-7 z-20 max-w-[820px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d6f345] shadow-[0_0_10px_#d6f345] animate-pulse" />
                <span className="text-[#838383] text-base sm:text-lg font-medium tracking-wide">
                  {"Who I'm"}
                </span>
              </div>

              {/* Main Heading with Haha-Emoji */}
              <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold leading-[1.14] text-white mb-6 tracking-tight">
                <span className='text-xl text-[#838383] font-normal'>Fuad Talukder,</span> A Full-Stack Developer building, scalable, high-performance <span className="text-[#4b515a]">web </span>applications
              </h2>
              {/* Main Heading with Haha-Emoji */}
              {/* <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold leading-[1.14] text-white mb-6 tracking-tight">
                A Full-Stack Developer building<br />scalable, high-performance<br /><span className="text-[#4b515a]">web </span>applications
              </h2> */}

              {/* Description */}
              <p className="text-[#838383] text-base sm:text-lg leading-relaxed mb-10">
                while turning complex ideas into simple, impactful digital experiences, from modern web platforms to intelligent AI-powered products.
              </p>
              {/* <p className="text-[#838383] text-base sm:text-lg leading-relaxed mb-10">
                Passionate about turning complex ideas into simple, impactful digital experiences<br /> from modern web applications to intelligent AI-powered products.
              </p> */}

              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-gray-800/80">
                {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Mongoose', 'MongoDB', 'PostgreSQL', 'Prisma', 'Stripe'].map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1 bg-[#191a1f] text-gray-300 rounded-[12px] border border-[#838383]"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Spatial area where cards cluster in fanned formation */}
            <div
              id="about-cards-target"
              className="hidden lg:flex lg:col-span-5 h-[460px] items-center justify-center pointer-events-none relative"
            />
          </div>

        </div>

        {/* Divider Line with Plus Center */}
        <div className="relative mt-20 sm:mt-24 w-full">
          <div className="w-[90%] mx-auto h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0a0a0c] border border-white/10 flex items-center justify-center text-[#d6f345] text-lg font-bold">
            +
          </div>
        </div>
      </div>
    </section>
  );
}
