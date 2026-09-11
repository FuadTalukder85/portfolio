'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface ProjectCtaProps {
  title: string;
  liveUrl?: string | null;
}

export default function ProjectCta({ title, liveUrl }: ProjectCtaProps) {
  return (
    <section className="pd-reveal border-t border-white/10 text-center px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
      <h3 className="font-syne uppercase leading-[1] text-[clamp(1.75rem,4.5vw,4.5rem)]">
        <span className="block font-thin italic text-white/70">Want something</span>
        <span className="block font-extrabold text-white">like this?</span>
      </h3>
      <p className="mt-6 sm:mt-7 text-[#838383] max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
        {title} was built from the ground up — architecture, design, and deployment. If your
        business needs a platform that&apos;s engineered to scale, let&apos;s talk.
      </p>
      <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#d6f345] text-black font-semibold text-xs sm:text-sm hover:bg-[#e8ff6b] transition-colors duration-300 group"
        >
          Let&apos;s talk
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        {liveUrl && liveUrl !== '#' && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 border border-white/25 text-white font-semibold text-xs sm:text-sm hover:border-white hover:bg-white/5 transition-colors duration-300 group"
          >
            Visit the live site
            <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>
    </section>
  );
}
