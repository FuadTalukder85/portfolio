'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: Parameters<Lenis['scrollTo']>[1]
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Respect user accessibility preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with subtle, natural easing curve
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // signature exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize Lenis RAF with GSAP's central ticker for buttery smooth frame alignment
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // If preloader is currently active, pause lenis until it completes
    if (document.documentElement.classList.contains('is-loading')) {
      lenis.stop();
    }

    // Observe loading state changes on <html>
    const observer = new MutationObserver(() => {
      const isLoading = document.documentElement.classList.contains('is-loading');
      if (isLoading) {
        lenis.stop();
      } else {
        lenis.start();
        lenis.resize();
        ScrollTrigger.refresh();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Global interceptor for in-page anchor links (e.g. #projects, #experience, #about)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            offset: 0,
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Recalculate dimensions once layout and fonts settle
    const refreshTimer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: Parameters<Lenis['scrollTo']>[1]
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
