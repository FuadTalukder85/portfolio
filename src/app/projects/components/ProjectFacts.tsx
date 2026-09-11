'use client';

import React from 'react';
import type { ProjectData } from '@/lib/projects-data';

interface ProjectFactsProps {
  project: ProjectData;
}

export default function ProjectFacts({ project }: ProjectFactsProps) {
  return (
    <section className="pd-reveal max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mt-12 sm:mt-16">
      <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/[0.12]">
        {[
          { label: 'Year', value: project.year },
          { label: 'Role', value: project.role },
          { label: 'Client', value: project.client },
          { label: 'Duration', value: project.duration },
        ].map((fact, i) => (
          <div
            key={i}
            className="px-4 sm:px-6 py-4 sm:py-5 border-r border-b border-white/[0.12] last:border-r-0"
          >
            <div className="font-mono text-[10px] tracking-[0.24em] text-[#d6f345] uppercase">
              {fact.label}
            </div>
            <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-300 font-medium">{fact.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
