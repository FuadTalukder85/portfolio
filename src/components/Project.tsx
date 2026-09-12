'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, SquareArrowOutUpRightIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PortfolioItem {
  id: string;
  img: string;
  title: string;
  categories: string[];
  slug: string;
  elmClass: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    img: '/img-01.png',
    title: 'Business Automation',
    categories: ['Web design', 'Automation'],
    slug: 'business-automation',
    elmClass: 'p1_ani_trigger_elm_1',
  },
  {
    id: '2',
    img: '/img-02.png',
    title: 'Multi-Vendor E-Commerce Backend',
    categories: ['Backend API', 'E-Commerce'],
    slug: 'ecommerce-backend',
    elmClass: 'p1_ani_trigger_elm_2',
  },
  {
    id: '3',
    img: '/img-03.png',
    title: 'Real Estate Platform',
    categories: ['Full-Stack', 'Real Estate'],
    slug: 'real-estate-platform',
    elmClass: 'p1_ani_trigger_elm_3',
  },
  {
    id: '4',
    img: '/img-04.png',
    title: 'PrivacyGuard Analyzer',
    categories: ['Chrome Ext', 'Security'],
    slug: 'privacyguard',
    elmClass: 'p1_ani_trigger_elm_4',
  },
];

export default function Project() {
  const sectionRef = useRef<HTMLElement>(null);

  // Magnetic button offset for each card
  const [cardMousePos, setCardMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Portfolio Scrub Animation for desktop/laptop screens (>= 992px)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 992px)', () => {
        const triggerEl = document.getElementById('about') || sectionRef.current;
        const targetEl = document.getElementById('about-cards-target');

        // Clear existing transforms before measuring natural grid positions
        gsap.set('.p1_ani_trigger_elm_1, .p1_ani_trigger_elm_2, .p1_ani_trigger_elm_3, .p1_ani_trigger_elm_4', {
          clearProps: 'transform',
        });

        const getOffsets = () => {
          const leftEl = document.getElementById('about-left-content');
          const targetEl = document.getElementById('about-cards-target');

          const leftRect = leftEl ? leftEl.getBoundingClientRect() : null;
          const targetRect = targetEl ? targetEl.getBoundingClientRect() : null;

          // Align the card deck's vertical center directly to the vertical center of the left content block
          const targetCenterY = leftRect
            ? leftRect.top + leftRect.height / 2
            : targetRect
              ? targetRect.top + targetRect.height / 2
              : 480;

          // Align the card deck's horizontal center to the right column
          const targetCenterX = targetRect
            ? targetRect.left + targetRect.width / 2
            : window.innerWidth * 0.75;

          const calcForElm = (selector: string, fanX: number, fanY: number) => {
            const el = document.querySelector(selector);
            if (!el) return { x: 0, y: 0 };
            const rect = el.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            return {
              x: Math.round(targetCenterX - cardCenterX + fanX),
              y: Math.round(targetCenterY - cardCenterY + fanY),
            };
          };

          return {
            elm1: calcForElm('.p1_ani_trigger_elm_1', 12, 6),
            elm2: calcForElm('.p1_ani_trigger_elm_2', -12, -6),
            elm3: calcForElm('.p1_ani_trigger_elm_3', 24, 14),
            elm4: calcForElm('.p1_ani_trigger_elm_4', 0, 0),
          };
        };

        const offsets = getOffsets();

        const portfolioTl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 20%',
            end: 'top -20%',
            toggleActions: 'play none none reverse',
            scrub: 1,
            markers: false,
          },
        });

        portfolioTl
          .from('.p1_ani_trigger_elm_1', {
            x: offsets.elm1.x,
            y: offsets.elm1.y,
            scale: 0.7,
            rotate: 4,
            ease: 'none',
          })
          .from(
            '.p1_ani_trigger_elm_2',
            {
              x: offsets.elm2.x,
              y: offsets.elm2.y,
              scale: 0.7,
              rotate: -4,
              ease: 'none',
            },
            '<='
          )
          .from(
            '.p1_ani_trigger_elm_3',
            {
              x: offsets.elm3.x,
              y: offsets.elm3.y,
              scale: 0.7,
              rotate: -7,
              ease: 'none',
            },
            '<='
          )
          .from(
            '.p1_ani_trigger_elm_4',
            {
              x: offsets.elm4.x,
              y: offsets.elm4.y,
              scale: 0.7,
              rotate: 5,
              ease: 'none',
            },
            '<='
          );
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Magnetic button physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardMousePos((prev) => ({
      ...prev,
      [id]: { x: x * 0.25, y: y * 0.25 },
    }));
  };

  const handleMouseLeave = (id: string) => {
    setCardMousePos((prev) => ({
      ...prev,
      [id]: { x: 0, y: 0 },
    }));
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#0a0a0c] text-white font-['Space_Grotesk',sans-serif]"
    >
      {/* Background shape overlays & glowing particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Right glow shape */}
        <div
          className="absolute top-10 right-0 w-[240px] h-[460px] opacity-40 bg-no-repeat bg-right-top scale-x-[-1]"
          style={{ backgroundImage: "url('/a1-bg-shape-bg-2.webp')", backgroundSize: 'contain' }}
        />

        {/* Ambient firefly glow circles */}
        <div className="absolute top-1/3 right-4 w-72 h-72 rounded-full bg-[#d6f345]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#005aff]/10 blur-[120px]" />

        {/* Floating lime particle dots */}
        <div className="absolute bottom-48 left-[18%] w-1 h-1 rounded-full bg-[#d6f345] opacity-70" />
        <div className="absolute bottom-32 right-[22%] w-2 h-2 rounded-full bg-[#d6f345] opacity-80 animate-ping shadow-[0_0_8px_#d6f345]" />
      </div>

      <div className="relative z-10 max-w-[1290px] mx-auto px-5 sm:px-8">
        {/* Header: Title on Left, Description on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d6f345] shadow-[0_0_10px_#d6f345] animate-pulse" />
              <span className="text-[#d6f345] text-base sm:text-lg font-medium tracking-wide">
                {'Featured Works'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#1e1e1e]">
              Engineering Digital Solutions
            </h2>
          </div>
          <p className="text-[#838383] text-base sm:text-lg max-w-md leading-relaxed md:text-left">
            A showcase of my recent web applications, focusing on clean code, performance, and seamless user experiences.
          </p>
        </div>

        {/* 2x2 Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 relative">
          {portfolioData.map((item, idx) => {
            const mouse = cardMousePos[item.id] || { x: 0, y: 0 };
            // Stacking order: Card 4 is in front when clustered in the fanned deck
            const zIndexStyle =
              idx === 3
                ? 'z-40'
                : idx === 2
                  ? 'z-30'
                  : idx === 1
                    ? 'z-20'
                    : 'z-10';

            return (
              <div
                key={item.id}
                className={`${item.elmClass} ${zIndexStyle} will-change-transform group/item`}
              >
                <div
                  onMouseMove={(e) => handleMouseMove(e, item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                  className="group relative h-[340px] sm:h-[400px] lg:h-[420px] w-full rounded-[20px] overflow-hidden border border-white/10 bg-[#141416] cursor-pointer shadow-2xl transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:border-white/20"
                >
                  {/* Background Project Image */}
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-10" />

                  {/* Pill Category Badges (Top Right) */}
                  <div className="absolute top-5 right-6 z-20 flex items-center gap-2">
                    {item.categories.map((cat, catIdx) => (
                      <span
                        key={catIdx}
                        className="bg-[#323232] text-xs sm:text-[15px] text-white/90 px-4 py-1.5 rounded-full border border-white/20 font-medium tracking-wide transition-colors duration-300 hover:text-[#d6f345] hover:border-[#d6f345]"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Centered Magnetic Action Button (Eye Icon) with Blink */}
                  <Link
                    href={`/projects/${item.slug}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                    style={{
                      transform: `translate(calc(-50% + ${mouse.x}px), calc(-50% + ${mouse.y}px))`,
                      transition: mouse.x === 0 ? 'transform 0.4s ease-out' : 'none',
                    }}
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.55,0.085,0,0.99)] hover:bg-[#d6f345] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <Eye className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Row: Line with Plus and Link */}
        <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative w-full flex-1 flex items-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-white/30" />
            {/* <span className="text-[#d6f345] font-bold text-xl ml-3">+</span> */}
          </div>

          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-8 py-2.5 rounded-full bg-transparent border border-white/20 text-[#d6f345] text-sm font-semibold tracking-wider uppercase hover:border-[#838383] hover:text-white transition-all duration-300 shrink-0 mb-4"
          >
            <span>Explore More</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lucide lucide-move-up-right`}
              >
                <path d="M13 5H19V11" />
                <path d="M19 5L5 19" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
