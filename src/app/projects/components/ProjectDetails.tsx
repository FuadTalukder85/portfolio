'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectData } from '@/lib/projects-data';

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
    <div ref={pageRef} className="min-h-screen bg-[#0a0a0c] text-white font-sans">
      {/* ────────── TOP BAR (ALIGNED WITH CASE STUDY CONTENT) ────────── */}
      <div className="fixed top-4 sm:top-6 md:top-[max(2.5rem,4vh)] left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[1520px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          <Link
            href="/#projects"
            className="pointer-events-auto inline-flex items-center gap-2 h-10 text-sm text-white/40 hover:text-white transition-colors font-mono tracking-widest uppercase group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Projects
          </Link>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-1.5 h-10 font-mono text-xs tracking-[0.2em] uppercase text-[#d6f345] hover:text-[#e8ff6b] transition-colors mr-20 sm:mr-24 md:mr-28"
            >
              Visit live
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* ────────── HERO SECTION ────────── */}
      <section className="max-w-[1520px] mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28">
        {/* Label */}
        <p className="pd-hero-label font-mono text-xs tracking-[0.32em] uppercase text-white/40">
          <span className="text-[#d6f345]">›</span> Case study — {project.categories[1] || project.categories[0]}
        </p>

        {/* Title */}
        <h1 className="pd-hero-title mt-8 uppercase leading-[0.92]">
          <span className="block font-syne font-thin italic text-white/70 text-[clamp(2.5rem,6vw,6rem)] tracking-tight">
            {project.titleLine1}
          </span>
          <span className="block font-syne font-extrabold text-white text-[clamp(3.25rem,8.5vw,8.75rem)]">
            {project.titleLine2.replace('.', '')}
            <span className="text-[#d6f345]">.</span>
          </span>
        </h1>

        {/* Description */}
        <p className="pd-hero-desc mt-9 text-[#838383] text-base md:text-lg leading-relaxed max-w-xl">
          {project.brief}
        </p>

        {/* Hero Image */}
        <div className="pd-hero-image relative mt-14 border border-white/10 overflow-hidden">
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
        <div className="pd-stats-bar mt-14 flex flex-col sm:flex-row border border-white/[0.12] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.12]">
          {project.stats.map((stat, i) => (
            <div key={i} className="flex-1 px-7 py-6">
              <div className={`font-syne font-extrabold text-3xl ${i === 0 ? 'text-[#d6f345]' : 'text-white'}`}>
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────── PROJECT FACTS (year, role, stack meta) ────────── */}
      <section className="pd-reveal max-w-[1520px] mx-auto px-6 md:px-12 lg:px-20 mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/[0.12]">
          {[
            { label: 'Year', value: project.year },
            { label: 'Role', value: project.role },
            { label: 'Client', value: project.client },
            { label: 'Duration', value: project.duration },
          ].map((fact, i) => (
            <div
              key={i}
              className="px-6 py-5 border-r border-b border-white/[0.12] last:border-r-0"
            >
              <div className="font-mono text-[10px] tracking-[0.24em] text-[#d6f345] uppercase">
                {fact.label}
              </div>
              <div className="mt-2 text-sm text-gray-300 font-medium">{fact.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────── PROBLEM / SOLUTION ────────── */}
      <section className="mt-20 border-y border-white/10 bg-[#070707]">
        <div className="max-w-[1520px] mx-auto px-6 md:px-12 lg:px-20 py-20 grid md:grid-cols-2 gap-12 md:gap-16">
          <div className="pd-reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
              The problem
            </p>
            <p className="mt-8 font-syne italic font-light text-[clamp(1.375rem,2vw,1.875rem)] leading-[1.35] text-gray-200">
              {project.problem}
            </p>
          </div>
          <div className="pd-reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
              The fix
            </p>
            <p className="mt-8 text-[#838383] leading-relaxed text-base md:text-lg">
              {project.solution}
            </p>
            {/* Tech Stack Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 border-t border-l border-white/[0.14]">
              {project.techStack.map((tech, i) => (
                <div
                  key={i}
                  className="border-r border-b border-white/[0.14] px-3.5 py-3 text-[13px] text-gray-300 hover:text-[#d6f345] hover:bg-[#d6f345]/[0.04] transition-colors duration-300 cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────── EDITORIAL SECTIONS (Zigzag) ────────── */}
      <div className="max-w-[1520px] mx-auto px-6 md:px-12 lg:px-20">
        {project.sections.map((section, idx) => {
          const isReversed = idx % 2 === 0;
          return (
            <section
              key={idx}
              className={`pd-reveal grid md:grid-cols-2 gap-10 md:gap-14 items-center py-16 md:py-20 ${
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
                <h3 className="font-syne font-bold text-2xl md:text-4xl mt-4 mb-5 leading-tight">
                  {section.title}
                </h3>
                {section.description.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[#838383] leading-relaxed text-[15px] md:text-base mb-4"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ────────── DELIVERABLES ────────── */}
      <section className="border-t border-white/10 bg-[#070707]">
        <div className="max-w-[1520px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24">
          <div className="pd-reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
              What was shipped
            </p>
            <h3 className="mt-8 font-syne uppercase leading-[0.95] text-[clamp(2rem,3.6vw,3.75rem)]">
              <span className="font-thin italic text-white/70">Project </span>
              <span className="font-extrabold text-white">Deliverables</span>
            </h3>
          </div>

          <div className="pd-reveal mt-14 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
            {project.deliverables.map((item, i) => (
              <div
                key={i}
                className="relative p-8 border-r border-b border-white/10 group hover:bg-[#d6f345]/[0.03] transition-colors duration-500"
              >
                <span
                  aria-hidden="true"
                  style={{
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                  }}
                  className="font-syne font-extrabold text-4xl leading-none select-none group-hover:[&]:[-webkit-text-stroke:1px_rgba(214,243,69,0.4)] transition-all duration-500"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-5 text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── OUTCOMES / NUMBERS ────────── */}
      <section className="border-t border-white/10">
        <div className="max-w-[1520px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24">
          <div className="pd-reveal">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#d6f345] uppercase">
              By the numbers
            </p>
            <h3 className="mt-8 font-syne uppercase leading-[0.95] text-[clamp(2rem,3.6vw,3.75rem)]">
              <span className="font-thin italic text-white/70">Project </span>
              <span className="font-extrabold text-white">Outcomes</span>
            </h3>
          </div>

          <div className="pd-reveal mt-14 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
            {project.outcomes.map((outcome, i) => (
              <div
                key={i}
                className={`p-8 border-r border-b border-white/10 ${
                  i === 0 ? 'bg-[#d6f345]/[0.04]' : ''
                }`}
              >
                <span
                  className={`font-syne font-extrabold text-5xl leading-none ${
                    i === 0 ? 'text-[#d6f345]' : 'text-white'
                  }`}
                >
                  {outcome.value}
                </span>
                <div className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase mt-4">
                  {outcome.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── CTA SECTION ────────── */}
      <section className="pd-reveal border-t border-white/10 text-center px-6 md:px-12 py-24 md:py-32">
        <h3 className="font-syne uppercase leading-[1] text-[clamp(2rem,4.5vw,4.5rem)]">
          <span className="block font-thin italic text-white/70">Want something</span>
          <span className="block font-extrabold text-white">like this?</span>
        </h3>
        <p className="mt-7 text-[#838383] max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          {project.title} was built from the ground up — architecture, design, and deployment. If your
          business needs a platform that&apos;s engineered to scale, let&apos;s talk.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d6f345] text-black font-semibold text-sm hover:bg-[#e8ff6b] transition-colors duration-300 group"
          >
            Let&apos;s talk
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold text-sm hover:border-white hover:bg-white/5 transition-colors duration-300 group"
            >
              Visit the live site
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </section>

      {/* ────────── PREVIOUS / NEXT NAVIGATION ────────── */}
      <section className="border-t border-white/10">
        <div className="max-w-[1520px] mx-auto grid grid-cols-1 sm:grid-cols-2">
          {/* Previous */}
          <div className="border-b sm:border-b-0 sm:border-r border-white/10">
            {project.prevSlug ? (
              <Link
                href={`/projects/${project.prevSlug}`}
                className="group flex flex-col justify-center px-8 md:px-12 py-10 md:py-14 hover:bg-white/[0.02] transition-colors duration-500"
              >
                <span className="font-mono text-[10px] tracking-[0.24em] text-white/30 uppercase">
                  ← Previous case
                </span>
                <span className="mt-3 font-syne font-bold text-xl md:text-2xl text-white group-hover:text-[#d6f345] transition-colors duration-300">
                  {project.prevSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </Link>
            ) : (
              <div className="px-8 md:px-12 py-10 md:py-14 text-white/10 font-mono text-xs tracking-widest uppercase">
                No previous case
              </div>
            )}
          </div>

          {/* Next */}
          <div>
            {project.nextSlug ? (
              <Link
                href={`/projects/${project.nextSlug}`}
                className="group flex flex-col justify-center items-end text-right px-8 md:px-12 py-10 md:py-14 hover:bg-white/[0.02] transition-colors duration-500"
              >
                <span className="font-mono text-[10px] tracking-[0.24em] text-white/30 uppercase">
                  Next case →
                </span>
                <span className="mt-3 font-syne font-bold text-xl md:text-2xl text-white group-hover:text-[#d6f345] transition-colors duration-300">
                  {project.nextSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </Link>
            ) : (
              <div className="px-8 md:px-12 py-10 md:py-14 text-right text-white/10 font-mono text-xs tracking-widest uppercase">
                No next case
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
