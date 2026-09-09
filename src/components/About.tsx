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
        <div className="max-w-[1290px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Title, Emoji, Description, Stats */}
            <div id="about-left-content" className="lg:col-span-7 z-20 max-w-[720px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d6f345] shadow-[0_0_10px_#d6f345]" />
                <span className="text-[#838383] text-base sm:text-lg font-medium tracking-wide">
                  {"{04} Who I'm"}
                </span>
              </div>

              {/* Main Heading with Haha-Emoji */}
              <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold leading-[1.14] text-white mb-6 tracking-tight">
                &ldquo;Turning complex <br /> ideas into simple, powerful <span className="text-[#4b515a]">digital </span>experiences.&rdquo;
              </h2>

              {/* Description */}
              <p className="text-[#838383] text-base sm:text-lg leading-relaxed mb-10">
                <span className='text-bold'>Fuad Talukder</span> - a Full-Stack Developer passionate about building scalable, high-performance web applications and transforming ideas into reliable digital products.
              </p>

              {/* 3 Stats Cards with bottom-up lime hover fill */}
              {/* <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {statsData.map((stat, idx) => (
                  <div
                    key={stat.id}
                    className="group relative overflow-hidden rounded-[20px] p-6 text-center transition-all duration-500 cursor-default border border-white/5 bg-gradient-to-b from-[#2d2d2d] to-[#060606]"
                  >
                    <span className="absolute inset-0 bg-[#d6f345] origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.55,0.085,0,0.99)] group-hover:scale-y-100 z-0" />

                    <div className="relative z-10">
                      <h4 className="text-3xl sm:text-4xl font-bold text-[#838383] group-hover:text-black transition-colors duration-500 leading-none mb-3">
                        {counts[idx]}
                        {stat.suffix}
                      </h4>
                      <p className="text-sm font-medium text-[#b5b5b5] group-hover:text-black transition-colors duration-500 leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div> */}

              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-gray-800/80">
                {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Mongoose', 'MongoDB', 'PostgreSQL', 'Prisma', 'Stripe'].map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1 bg-[#191a1f] text-gray-300 rounded-full border border-gray-800"
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
