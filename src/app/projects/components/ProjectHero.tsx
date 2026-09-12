'use client';

import React from 'react';
import Image from 'next/image';
import type { ProjectData } from '@/lib/projects-data';

interface ProjectHeroProps {
  project: ProjectData;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pt-20 md:pt-28">
      {/* Label */}
      <p className="pd-hero-label font-mono text-xs tracking-[0.32em] uppercase text-white/40">
        <span className="text-[#d6f345]">›</span> Case study — {project.categories[1] || project.categories[0]}
      </p>

      {/* Title */}
      <h1 className="pd-hero-title mt-6 sm:mt-8 uppercase leading-[0.95]">
        <span className="block font-syne font-thin italic text-white/70 text-[clamp(1.5rem,4vw,4.75rem)] tracking-tight">
          {project.titleLine1}
        </span>
        <span className="block font-syne font-extrabold text-white text-[clamp(1.8rem,5.5vw,6.25rem)] break-normal leading-[0.95] tracking-tight">
          {project.titleLine2.replace('.', '')}
          <span className="text-[#d6f345]">.</span>
        </span>
      </h1>

      {/* Description */}
      <p className="pd-hero-desc mt-6 sm:mt-9 text-[#838383] text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
        {project.brief}
      </p>

      {/* Hero Image */}
      <div className="pd-hero-image relative mt-10 sm:mt-14 border border-white/10 overflow-hidden">
        <div className="relative aspect-[16/10] md:aspect-[16/8]">
          <Image
            src={project.heroImage}
            alt={`${project.title} hero`}
            fill
            sizes="(max-width: 1520px) 100vw, 1520px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="pd-stats-bar mt-10 sm:mt-14 flex flex-col sm:flex-row border border-white/[0.12] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.12]">
        {project.stats.map((stat, i) => (
          <div key={i} className="flex-1 px-5 sm:px-7 py-5 sm:py-6">
            <div className={`font-syne font-extrabold text-2xl sm:text-3xl ${i === 0 ? 'text-[#d6f345]' : 'text-white'}`}>
              {stat.value}
            </div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
