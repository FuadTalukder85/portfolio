'use client';

import React from 'react';

interface ProjectProblemSolutionProps {
  problem: string;
  solution: string;
  techStack: string[];
}

export default function ProjectProblemSolution({
  problem,
  solution,
  techStack,
}: ProjectProblemSolutionProps) {
  return (
    <section className="mt-14 sm:mt-20 border-y border-white/10 bg-[#070707]">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-14 sm:py-20 grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="pd-reveal">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
            The problem
          </p>
          <p className="mt-6 sm:mt-8 font-syne italic font-light text-[clamp(1.25rem,2vw,1.875rem)] leading-[1.35] text-gray-200">
            {problem}
          </p>
        </div>
        <div className="pd-reveal">
          <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
            The fix
          </p>
          <p className="mt-6 sm:mt-8 text-[#838383] leading-relaxed text-sm sm:text-base md:text-lg">
            {solution}
          </p>
          {/* Tech Stack Grid */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-5 border-t border-l border-white/[0.14]">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="border-r border-b border-white/[0.14] px-3 py-2.5 sm:px-3.5 sm:py-3 text-xs sm:text-[13px] text-gray-300 hover:text-[#d6f345] hover:bg-[#d6f345]/[0.04] transition-colors duration-300 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
