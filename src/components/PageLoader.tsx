'use client';

import React, { useEffect, useRef, useState } from 'react';

// ExpoInOut easing function (identical to Lusion's easing curve)
function easeExpoInOut(t: number): number {
  if (t === 0) return 0;
  if (t === 1) return 1;
  if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
  return 0.5 * (-Math.pow(2, -10 * --t) + 2);
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export default function PageLoader() {
  const [mounted, setMounted] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Digits DOM elements
  const digit0Ref = useRef<HTMLDivElement | null>(null);
  const digit1Ref = useRef<HTMLDivElement | null>(null);
  const digit2Ref = useRef<HTMLDivElement | null>(null);

  // State refs for continuous animation loop
  const animState = useRef({
    percentTarget: 0,
    currentPercent: 0,
    easedValues: [0, 0, 0], // for hundreds, tens, units
    lineTransformTime: 0,
    lineTransformRatio: 0,
    contentShowRatio: 0,
    isActive: true,
    hasReached100: false,
    startTime: 0,
    minDuration: 1400, // minimum duration for silky smooth experience
  });

  useEffect(() => {
    // 1. Immediately force manual scroll restoration and reset window scroll to top (0, 0)
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // Prevent wheel, touchmove, and scroll keys during initial load
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    const handleResize = () => {
      if (!canvasRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvasRef.current.width = (w + 2) * dpr;
      canvasRef.current.height = (h + 2) * dpr;
      canvasRef.current.style.width = `${w}px`;
      canvasRef.current.style.height = `${h}px`;
    };

    const handleWindowLoad = () => {
      animState.current.percentTarget = 1;
    };

    let isCleanedUp = false;
    const unlockScroll = () => {
      if (isCleanedUp) return;
      isCleanedUp = true;

      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScrollKeys);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleWindowLoad);

      document.documentElement.classList.remove('is-loading');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      unlockScroll();
      setMounted(false);
      return;
    }

    // Add is-loading and lock scroll during preloading
    document.documentElement.classList.add('is-loading');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScrollKeys);
    window.addEventListener('beforeunload', handleBeforeUnload);

    animState.current.startTime = performance.now();

    // Canvas setup
    const canvas = canvasRef.current;
    if (!canvas) {
      unlockScroll();
      setMounted(false);
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      unlockScroll();
      setMounted(false);
      return;
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    handleResize();
    window.addEventListener('resize', handleResize);

    if (document.readyState === 'complete') {
      animState.current.percentTarget = 1;
    } else {
      window.addEventListener('load', handleWindowLoad);
      // Fallback target in case window load event was missed or delayed
      setTimeout(() => {
        animState.current.percentTarget = 1;
      }, 1000);
    }

    // Hard safety watchdog: guarantees scroll unlock after 3.2s under any circumstance
    const safetyWatchdog = setTimeout(() => {
      if (animState.current.isActive) {
        animState.current.isActive = false;
        unlockScroll();
        setMounted(false);
      }
    }, 3200);

    // Animation Loop
    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // clamp dt in seconds
      lastTime = now;

      const state = animState.current;
      const elapsed = now - state.startTime;

      // Natural loading curve simulation up to 95%
      if (state.percentTarget < 1) {
        const simulated = Math.min(0.95, (elapsed / state.minDuration) * 0.95);
        state.currentPercent = Math.max(state.currentPercent, simulated);
      } else {
        // Enforce minDuration before snapping to 100%
        if (elapsed >= state.minDuration) {
          state.currentPercent = Math.min(1, state.currentPercent + dt * 2.5);
        } else {
          state.currentPercent = Math.min(0.98, elapsed / state.minDuration);
        }
      }

      const t = state.currentPercent;
      const isComplete = t >= 0.999;

      if (isComplete && !state.hasReached100) {
        state.hasReached100 = true;
      }

      // If at 100%, advance center line morph & reveal
      if (state.hasReached100) {
        // Line transform from progress bar to geometric monogram
        state.lineTransformTime += dt * 1.8;
        state.lineTransformRatio = easeExpoInOut(clamp(state.lineTransformTime, 0, 1));

        // After morph begins, initiate viewport curtain aperture reveal
        if (state.lineTransformTime > 0.45) {
          if (!state.contentShowRatio) {
            setIsRevealing(true);
          }
          state.contentShowRatio = clamp(state.contentShowRatio + dt * 1.4, 0, 1);
        }
      }

      // --- DIGIT COLUMN ROLLING CALCULATIONS ---
      const totalVal = Math.floor(t * 100); // 0 to 100
      const digits = [digit0Ref.current, digit1Ref.current, digit2Ref.current];

      digits.forEach((digitEl, idx) => {
        if (!digitEl) return;
        const placeMultiplier = Math.pow(10, digits.length - idx - 1);
        const targetDigitVal = Math.floor(totalVal / placeMultiplier);

        // Exponential smoothing: mix(easedVal, target, 1 - exp(-12 * dt))
        state.easedValues[idx] = lerp(
          state.easedValues[idx],
          targetDigitVal,
          1 - Math.exp(-12 * dt)
        );

        if (Math.abs(targetDigitVal - state.easedValues[idx]) < 0.005) {
          state.easedValues[idx] = targetDigitVal;
        }

        const u = state.easedValues[idx];
        const f = Math.floor(u) % 10;
        const p = Math.ceil(u) % 10;
        const g = u - Math.floor(u);

        const nums = digitEl.children;
        if (nums[0]) nums[0].textContent = String(f);
        if (nums[1]) nums[1].textContent = String(p);

        // Staggered lift-off reveal animation when contentShowRatio kicks in
        const staggerOffset = clamp(state.contentShowRatio * 1.3 - (0.15 * idx) / 2, 0, 1);
        const exitOffset = easeExpoInOut(staggerOffset) * 2.2;

        const totalTranslateY = -(g + exitOffset) * 50;
        digitEl.style.transform = `translateY(${totalTranslateY}%)`;
      });

      // --- CANVAS RENDERING ---
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const revealProgress = easeExpoInOut(state.contentShowRatio);

      if (revealProgress < 1) {
        // Base curtain background
        ctx.fillStyle = '#06070b';
        ctx.fillRect(0, 0, w, h);

        const l = state.lineTransformRatio;
        const centerX = w * 0.5;
        const centerY = h * 0.5;

        // Aperture / Zoom Curtain Reveal:
        // As revealProgress increases, cut out an expanding aperture using 'destination-out'
        if (revealProgress > 0) {
          ctx.save();
          ctx.globalCompositeOperation = 'destination-out';
          ctx.translate(centerX, centerY);
          ctx.rotate(revealProgress * -0.08); // subtle cinematic tilt
          const maxDim = Math.hypot(w, h);
          const apertureRadius = revealProgress * maxDim * 1.25;

          ctx.beginPath();
          ctx.rect(
            -apertureRadius * 0.5,
            -apertureRadius * 0.5,
            apertureRadius,
            apertureRadius
          );
          ctx.fill();
          ctx.restore();
        }

        // Draw Minimalist Center Indicator & Morphing Monogram
        ctx.save();
        ctx.translate(centerX, centerY);

        const fadeOutOverlay = Math.max(0, 1 - revealProgress * 2.5);
        ctx.globalAlpha = fadeOutOverlay;

        const barWidth = Math.min(160, w * 0.35);
        const barHeight = 2;

        if (l === 0) {
          // 1. Initial State: Minimalist progress bar
          // Subtle track
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.fillRect(-barWidth * 0.5, -barHeight * 0.5, barWidth, barHeight);

          // Active filled line with subtle glow
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-barWidth * 0.5, -barHeight * 0.5, barWidth * t, barHeight);
        } else {
          // 2. Morphing State: Line condenses and splits into geometric monogram
          const condensedWidth = lerp(barWidth, 40, clamp(l * 2, 0, 1));
          const rotateAngle = l * Math.PI * 0.5;

          ctx.save();
          // Horizontal bar morph
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-condensedWidth * 0.5, -1, condensedWidth, 2);

          // Vertical intersecting bar with rotation
          ctx.rotate(rotateAngle);
          const vertHeight = lerp(2, 40, l);
          ctx.fillRect(-1, -vertHeight * 0.5, 2, vertHeight);
          ctx.restore();
          // Subtle core pulse
          const pulse = Math.sin(l * Math.PI) * 12;
          ctx.beginPath();
          ctx.arc(0, 0, 2 + pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();

      // Check if finished
      if (state.contentShowRatio >= 0.999) {
        state.isActive = false;
        clearTimeout(safetyWatchdog);
        unlockScroll();
        setMounted(false);
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(safetyWatchdog);
      unlockScroll();
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="preloader-root"
      role="status"
      aria-label="Loading portfolio experience"
      aria-live="polite"
      className={`fixed inset-0 z-[99999] select-none overflow-hidden ${
        isRevealing ? 'is-revealing pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* Canvas rendering the curtain and morphing transition */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Bottom Left: Signature Lusion Giant Mechanical Odometer Digits */}
      <div className="absolute bottom-4 left-6 md:bottom-8 md:left-12 pointer-events-none z-20">
        <div className="preloader-percent-digits text-[clamp(4.5rem,11.5vw,14rem)] font-bold text-white tracking-[-0.04em]">
          {/* Hundreds Column */}
          <div className="preloader-percent-digit">
            <div ref={digit0Ref} className="flex flex-col">
              <div className="preloader-percent-digit-num">0</div>
              <div className="preloader-percent-digit-num">0</div>
            </div>
          </div>

          {/* Tens Column */}
          <div className="preloader-percent-digit">
            <div ref={digit1Ref} className="flex flex-col">
              <div className="preloader-percent-digit-num">0</div>
              <div className="preloader-percent-digit-num">0</div>
            </div>
          </div>

          {/* Units Column */}
          <div className="preloader-percent-digit">
            <div ref={digit2Ref} className="flex flex-col">
              <div className="preloader-percent-digit-num">0</div>
              <div className="preloader-percent-digit-num">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
