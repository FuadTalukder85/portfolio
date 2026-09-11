'use client';

import React from 'react';
import Link from 'next/link';

interface ProjectNavProps {
  prevSlug?: string | null;
  nextSlug?: string | null;
}

export default function ProjectNav({ prevSlug, nextSlug }: ProjectNavProps) {
  return (
    <section className="border-t border-white/10">
      <div className="max-w-[1520px] mx-auto grid grid-cols-1 sm:grid-cols-2">
        {/* Previous */}
        <div className="border-b sm:border-b-0 sm:border-r border-white/10">
          {prevSlug ? (
            <Link
              href={`/projects/${prevSlug}`}
              className="group flex flex-col justify-center px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/30 uppercase">
                ← Previous case
              </span>
              <span className="mt-2 sm:mt-3 font-syne font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-[#d6f345] transition-colors duration-300">
                {prevSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            </Link>
          ) : (
            <div className="px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 text-white/10 font-mono text-xs tracking-widest uppercase">
              No previous case
            </div>
          )}
        </div>

        {/* Next */}
        <div>
          {nextSlug ? (
            <Link
              href={`/projects/${nextSlug}`}
              className="group flex flex-col justify-center items-end text-right px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <span className="font-mono text-[10px] tracking-[0.24em] text-white/30 uppercase">
                Next case →
              </span>
              <span className="mt-2 sm:mt-3 font-syne font-bold text-lg sm:text-xl md:text-2xl text-white group-hover:text-[#d6f345] transition-colors duration-300">
                {nextSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            </Link>
          ) : (
            <div className="px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 text-right text-white/10 font-mono text-xs tracking-widest uppercase">
              No next case
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
