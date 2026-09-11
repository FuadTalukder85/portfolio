'use client';

import React from 'react';

interface ProjectDeliverablesProps {
  deliverables: string[];
}

export default function ProjectDeliverables({ deliverables }: ProjectDeliverablesProps) {
  return (
    <section className="border-t border-white/10 bg-[#070707]">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-14 sm:py-20 md:py-24">
        <div className="pd-reveal">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
            What was shipped
          </p>
          <h3 className="mt-6 sm:mt-8 font-syne uppercase leading-[0.95] text-[clamp(1.5rem,4vw,3.75rem)]">
            <span className="font-thin italic text-white/70">Project </span>
            <span className="font-extrabold text-white">Deliverables</span>
          </h3>
        </div>

        <div className="pd-reveal mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {deliverables.map((item, i) => (
            <div
              key={i}
              className="relative p-5 sm:p-8 border-r border-b border-white/10 group hover:bg-[#d6f345]/[0.03] transition-colors duration-500"
            >
              <span
                aria-hidden="true"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                }}
                className="font-syne font-extrabold text-3xl sm:text-4xl leading-none select-none group-hover:[&]:[-webkit-text-stroke:1px_rgba(214,243,69,0.4)] transition-all duration-500"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
