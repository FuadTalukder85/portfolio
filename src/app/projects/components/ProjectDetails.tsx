'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectData } from '@/lib/projects-data';

import ProjectTopBar from './ProjectTopBar';
import ProjectHero from './ProjectHero';
import ProjectFacts from './ProjectFacts';
import ProjectProblemSolution from './ProjectProblemSolution';
import ProjectSections from './ProjectSections';
import ProjectDeliverables from './ProjectDeliverables';
import ProjectOutcomes from './ProjectOutcomes';
import ProjectCta from './ProjectCta';
import ProjectNav from './ProjectNav';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectDetails({ project }: { project: ProjectData }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.pd-hero-label', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        delay: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.pd-hero-title', {
        opacity: 0,
        y: 32,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.pd-hero-desc', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        delay: 0.35,
        ease: 'power3.out',
      });
      gsap.from('.pd-hero-image', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        delay: 0.45,
        ease: 'power3.out',
      });
      gsap.from('.pd-stats-bar', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        delay: 0.6,
        ease: 'power3.out',
      });

      // Scroll-triggered sections
      const revealSections = pageRef.current!.querySelectorAll('.pd-reveal');
      revealSections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0a0a0c] text-white font-sans overflow-x-hidden">
      <ProjectTopBar liveUrl={project.liveUrl} />
      <ProjectHero project={project} />
      <ProjectFacts project={project} />
      <ProjectProblemSolution
        problem={project.problem}
        solution={project.solution}
        techStack={project.techStack}
      />
      <ProjectSections sections={project.sections} />
      <ProjectDeliverables deliverables={project.deliverables} />
      <ProjectOutcomes outcomes={project.outcomes} />
      <ProjectCta title={project.title} liveUrl={project.liveUrl} />
      <ProjectNav prevSlug={project.prevSlug} nextSlug={project.nextSlug} />
    </div>
  );
}
