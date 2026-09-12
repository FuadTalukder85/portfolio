'use client';

import React from 'react';
import type { ProjectData } from '@/lib/projects-data';

interface ProjectOutcomesProps {
  outcomes: ProjectData['outcomes'];
}

export default function ProjectOutcomes({ outcomes }: ProjectOutcomesProps) {
  return (
    <section className="border-t border-white/10">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-14 sm:py-20 md:py-24">
        <div className="pd-reveal">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
            By the numbers
          </p>
          <h3 className="mt-6 sm:mt-8 font-syne uppercase leading-[0.95] text-[clamp(1.5rem,4vw,3.75rem)]">
            <span className="font-thin italic text-white/70">Project </span>
            <span className="font-extrabold text-white">Outcomes</span>
          </h3>
        </div>

        <div className="pd-reveal mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {outcomes.map((outcome, i) => (
            <div
              key={i}
              className={`p-5 sm:p-8 border-r border-b border-white/10 ${
                i === 0 ? 'bg-[#d6f345]/[0.04]' : ''
              }`}
            >
              <span
                className={`font-syne font-extrabold ${
                  outcome.value.length > 6
                    ? 'text-xl sm:text-2xl lg:text-3xl'
                    : outcome.value.length > 4
                      ? 'text-2xl sm:text-3xl lg:text-4xl'
                      : 'text-3xl sm:text-4xl lg:text-5xl'
                } leading-none ${
                  i === 0 ? 'text-[#d6f345]' : 'text-white'
                }`}
              >
                {outcome.value}
              </span>
              <div className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase mt-3 sm:mt-4">
                {outcome.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
