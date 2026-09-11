'use client';

import React from 'react';
import Image from 'next/image';
import type { ProjectData } from '@/lib/projects-data';

interface ProjectSectionsProps {
  sections: ProjectData['sections'];
}

export default function ProjectSections({ sections }: ProjectSectionsProps) {
  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
      {sections.map((section, idx) => {
        const isReversed = idx % 2 === 0;
        return (
          <section
            key={idx}
            className={`pd-reveal grid md:grid-cols-2 gap-8 md:gap-14 items-center py-12 md:py-20 ${
              idx > 0 ? 'border-t border-white/10' : ''
            }`}
          >
            {/* Image */}
            <div className={isReversed ? 'md:order-2' : ''}>
              <div className="relative border border-white/10 overflow-hidden group">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className={isReversed ? 'md:order-1' : ''}>
              <p className="font-mono text-[11px] tracking-[0.24em] uppercase">
                <span className="text-[#d6f345]">/{section.number}</span>{' '}
                <span className="text-white/40">— {section.label}</span>
              </p>
              <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-4xl mt-3 mb-4 leading-tight">
                {section.title}
              </h3>
              {section.description.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-[#838383] leading-relaxed text-sm md:text-base mb-4"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
