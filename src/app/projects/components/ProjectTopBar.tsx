'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

interface ProjectTopBarProps {
  liveUrl?: string | null;
}

export default function ProjectTopBar({ liveUrl }: ProjectTopBarProps) {
  return (
    <div className="fixed top-4 sm:top-6 md:top-[max(2.5rem,4vh)] left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between">
        <Link
          href="/#projects"
          className="pointer-events-auto inline-flex items-center gap-2 h-10 text-xs sm:text-sm text-white/40 hover:text-white transition-colors font-mono tracking-widest uppercase group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Projects
        </Link>
        {liveUrl && liveUrl !== '#' && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hidden sm:inline-flex items-center gap-1.5 h-10 font-mono text-xs tracking-[0.2em] uppercase text-[#d6f345] hover:text-[#e8ff6b] transition-colors mr-20 sm:mr-24 md:mr-28"
          >
            Visit live
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
