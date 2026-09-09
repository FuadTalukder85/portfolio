"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

interface MenuItem {
  title: string;
  href: string;
}

const MENU_DATA: MenuItem[] = [
  { title: "Home", href: "/" },
  { title: "Works", href: "#projects" },
  { title: "Experience", href: "#experience" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

function StarCrossIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={className}
      fill="currentColor"
    >
      <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const hamburgerSlotRef = useRef<HTMLDivElement>(null);
  const hamburgerContentRef = useRef<HTMLDivElement>(null);

  const menuWrapRef = useRef<HTMLDivElement>(null);
  const menuBaseRef = useRef<HTMLDivElement>(null);
  const menuContainRef = useRef<HTMLDivElement>(null);
  const menuSlotRef = useRef<HTMLDivElement>(null);
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const flipItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hamburgerEl = hamburgerRef.current;
    const menuWrapEl = menuWrapRef.current;
    const menuBaseEl = menuBaseRef.current;
    const menuContainEl = menuContainRef.current;
    const hamburgerSlot = hamburgerSlotRef.current;
    const menuSlot = menuSlotRef.current;

    if (
      !hamburgerEl ||
      !menuWrapEl ||
      !menuBaseEl ||
      !menuContainEl ||
      !hamburgerSlot ||
      !menuSlot
    ) {
      return;
    }

    // Morphing background element
    const flipItemEl = document.createElement("div");
    flipItemEl.className = "hamburger__base";
    flipItemEl.style.position = "absolute";
    flipItemEl.style.inset = "0";
    flipItemEl.style.borderRadius = "15px";
    flipItemEl.style.backgroundColor = "#ffffff";
    flipItemEl.style.boxShadow = "0 4px 25px rgba(0,0,0,0.15)";
    flipItemEl.style.zIndex = "0";
    flipItemEl.style.pointerEvents = "none";
    hamburgerSlot.appendChild(flipItemEl);
    flipItemRef.current = flipItemEl;

    hamburgerEl.style.backgroundColor = "transparent";
    hamburgerEl.style.boxShadow = "none";

    const onEnter = () => {
      if (flipItemRef.current && hamburgerSlot.contains(flipItemRef.current)) {
        flipItemRef.current.style.backgroundColor = "#f9fafb";
      }
    };
    const onLeave = () => {
      if (flipItemRef.current && hamburgerSlot.contains(flipItemRef.current)) {
        flipItemRef.current.style.backgroundColor = "#ffffff";
      }
    };
    hamburgerEl.addEventListener("mouseenter", onEnter);
    hamburgerEl.addEventListener("mouseleave", onLeave);

    function flip(forwards: boolean) {
      if (!menuSlot || !hamburgerSlot) return;
      const state = Flip.getState(flipItemEl);
      if (forwards) {
        menuSlot.appendChild(flipItemEl);
        Flip.from(state, {
          ease: "power4.inOut",
          duration: 0.8,
          zIndex: 0,
        });
      } else {
        hamburgerSlot.appendChild(flipItemEl);
        Flip.from(state, {
          ease: "power4.inOut",
          duration: 0.6,
          zIndex: 0,
        });
        if (hamburgerContentRef.current) {
          gsap.fromTo(
            hamburgerContentRef.current,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              delay: 0.15,
              ease: "power2.out",
            }
          );
        }
      }
    }

    const menuItems = menuContainEl.querySelectorAll(".main-menu__item");
    const fadeInEls = menuContainEl.querySelectorAll(".menu-fade-in");

    const tl = gsap.timeline({ paused: true });

    tl.set(menuWrapEl, { display: "flex" });

    tl.from(menuBaseEl, {
      opacity: 0,
      duration: 0.6,
      ease: "none",
      onStart: () => {
        flip(true);
      },
    });

    tl.add("fade-in-up", 0.35)
      .fromTo(
        menuItems,
        { opacity: 0, yPercent: 50 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.35,
          stagger: { amount: 0.2 },
          ease: "power3.out",
          onReverseComplete: () => {
            flip(false);
          },
        },
        "fade-in-up"
      )
      .fromTo(
        fadeInEls,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        "fade-in-up"
      );

    tlRef.current = tl;

    return () => {
      tl.kill();
      flipItemEl.remove();
      hamburgerEl.removeEventListener("mouseenter", onEnter);
      hamburgerEl.removeEventListener("mouseleave", onLeave);
      hamburgerEl.style.backgroundColor = "";
      hamburgerEl.style.boxShadow = "";
    };
  }, []);

  const openMenu = (open: boolean) => {
    const tl = tlRef.current;
    if (!tl || tl.isActive()) return;

    if (open) {
      tl.play();
      setIsOpen(true);
      if (hamburgerRef.current) hamburgerRef.current.style.pointerEvents = "none";
      if (hamburgerContentRef.current) {
        gsap.to(hamburgerContentRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.25,
          ease: "power2.inOut",
        });
      }
      if (closeBtnRef.current) {
        gsap.fromTo(
          closeBtnRef.current,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            delay: 0.35,
            ease: "power2.out",
          }
        );
      }
    } else {
      tl.reverse();
      setIsOpen(false);
      if (hamburgerRef.current) hamburgerRef.current.style.pointerEvents = "auto";
      if (closeBtnRef.current) {
        gsap.to(closeBtnRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.25,
          delay: 0.35,
          ease: "power2.inOut",
        });
      }
    }
  };

  // Lock background scrolling while menu modal is open
  useEffect(() => {
    if (!isOpen) return;

    const scrollContainer = menuScrollRef.current;
    const initialScrollY = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainer) {
        e.preventDefault();
        return;
      }

      const isInside = scrollContainer.contains(e.target as Node);
      if (!isInside) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      if (
        (isScrollingUp && scrollTop <= 0) ||
        (isScrollingDown && scrollTop + clientHeight >= scrollHeight)
      ) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollContainer) {
        e.preventDefault();
        return;
      }

      const isInside = scrollContainer.contains(e.target as Node);
      if (!isInside) {
        e.preventDefault();
      }
    };

    const handleScroll = () => {
      if (window.scrollY !== initialScrollY) {
        window.scrollTo(0, initialScrollY);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        openMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <nav aria-label="Main Navigation" className="font-sans">
      {/* Hamburger Trigger Button */}
      <button
        ref={hamburgerRef}
        onClick={() => openMenu(!isOpen)}
        className="bg-white text-gray-900 flex items-center justify-center gap-1 px-3 py-2 rounded-[15px] border-none cursor-pointer relative z-[60] shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <div
          ref={hamburgerSlotRef}
          className="absolute inset-0 rounded-[15px] pointer-events-none"
        />

        <div
          ref={hamburgerContentRef}
          className="flex items-center justify-center gap-1 relative z-10 will-change-transform"
        >
          <span className="uppercase font-bold text-sm select-none">Menu</span>
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
          >
            <line x1="5" x2="19" y1="9" y2="9" />
            <line x1="5" x2="19" y1="15" y2="15" />
          </svg>
        </div>
      </button>

      {/* Full-screen menu wrapper */}
      <div
        ref={menuWrapRef}
        className="fixed inset-0 z-50 items-start justify-end p-3 sm:p-5 lg:p-7"
        style={{ display: "none" }}
      >
        {/* Dark backdrop */}
        <div
          ref={menuBaseRef}
          onClick={() => openMenu(false)}
          className="absolute inset-0 bg-black/45 backdrop-blur-[3px] cursor-pointer"
          aria-hidden="true"
        />

        {/* Menu container card */}
        <div
          ref={menuContainRef}
          className="relative w-full h-full flex flex-col justify-between overflow-hidden"
        >
          {/* Morph slot */}
          <div
            ref={menuSlotRef}
            className="absolute inset-0 rounded-[24px] pointer-events-none z-0"
          />

          {/* Menu Inner Content */}
          <div
            ref={menuScrollRef}
            className="relative z-20 w-full h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden p-6 sm:p-10 lg:p-12 text-black overscroll-contain"
            style={{ position: "relative", zIndex: 20, overscrollBehavior: "contain" }}
          >
            {/* Close button inside open menu */}
            <div
              ref={closeBtnRef}
              className="absolute top-4 right-4 z-30 will-change-transform"
              style={{ opacity: 0, transform: "scale(0.85)" }}
            >
              <button
                type="button"
                onClick={() => openMenu(false)}
                className="bg-neutral-100 border border-white text-neutral-800 flex items-center justify-center gap-1.5 px-3 py-2 rounded-[15px] cursor-pointer hover:bg-neutral-200 transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <span className="uppercase font-bold text-sm">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation links (direct title with link and star cross icon) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-4">
              <div className="lg:col-span-7 space-y-1">
                {MENU_DATA.map((item, idx) => (
                  <div key={idx} className="main-menu__item">
                    <Link
                      href={item.href}
                      onClick={() => openMenu(false)}
                      className="flex items-center justify-between w-full py-1.5 sm:py-2 group focus:outline-none"
                    >
                      <span className="text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem] font-bold tracking-tight text-neutral-900 group-hover:text-neutral-500 transition-colors duration-300">
                        {item.title}
                      </span>
                      <div className="text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0 ml-4">
                        <StarCrossIcon />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="menu-fade-in pt-4 mt-2">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <div>© 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
