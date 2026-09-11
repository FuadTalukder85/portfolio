"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useSmoothScroll } from "@/components/SmoothScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

interface MenuItem {
  title: string;
  href: string;
}

const MENU_DATA: MenuItem[] = [
  { title: "Home", href: "/" },
  { title: "Works", href: "/#projects" },
  { title: "Experience", href: "/#experience" },
  { title: "About", href: "/#about" },
  { title: "Contact", href: "/contact" },
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

function SquareArrowOutUpRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-move-up-right ${className || ""}`}><path d="M13 5H19V11" /><path d="M19 5L5 19" /></svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { lenis, scrollTo } = useSmoothScroll();

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
  const flipRef = useRef<((forwards: boolean) => void) | null>(null);

  const updateCloseBtnPosition = () => {
    if (!hamburgerRef.current || !closeBtnRef.current) return;
    const rect = hamburgerRef.current.getBoundingClientRect();
    closeBtnRef.current.style.top = `${rect.top}px`;
    closeBtnRef.current.style.left = `${rect.left}px`;
    closeBtnRef.current.style.width = `${rect.width}px`;
    closeBtnRef.current.style.height = `${rect.height}px`;
  };

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
    flipItemEl.style.borderRadius = "24px";
    flipItemEl.style.backgroundColor = "#090A0C";
    flipItemEl.style.border = "1px solid rgba(255, 255, 255, 0.2)";
    flipItemEl.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.5)";
    flipItemEl.style.zIndex = "0";
    flipItemEl.style.pointerEvents = "none";
    hamburgerSlot.appendChild(flipItemEl);
    flipItemRef.current = flipItemEl;

    hamburgerEl.style.backgroundColor = "transparent";
    hamburgerEl.style.boxShadow = "none";

    const onEnter = () => {
      if (flipItemRef.current && hamburgerSlot.contains(flipItemRef.current)) {
        flipItemRef.current.style.borderColor = "rgba(255, 255, 255, 0.4)";
      }
    };
    const onLeave = () => {
      if (flipItemRef.current && hamburgerSlot.contains(flipItemRef.current)) {
        flipItemRef.current.style.borderColor = "rgba(255, 255, 255, 0.2)";
      }
    };
    hamburgerEl.addEventListener("mouseenter", onEnter);
    hamburgerEl.addEventListener("mouseleave", onLeave);

    function flip(forwards: boolean) {
      if (!menuSlot || !hamburgerSlot) return;
      const state = Flip.getState(flipItemEl);
      if (forwards) {
        menuSlot.appendChild(flipItemEl);
        flipItemEl.style.borderRadius = "24px";
        Flip.from(state, {
          ease: "power4.inOut",
          duration: 0.8,
          zIndex: 0,
        });
      } else {
        hamburgerSlot.appendChild(flipItemEl);
        flipItemEl.style.borderRadius = "24px";
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

    flipRef.current = flip;

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

    const handleResize = () => {
      updateCloseBtnPosition();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tl.kill();
      flipRef.current = null;
      flipItemEl.remove();
      hamburgerEl.removeEventListener("mouseenter", onEnter);
      hamburgerEl.removeEventListener("mouseleave", onLeave);
      hamburgerEl.style.backgroundColor = "";
      hamburgerEl.style.boxShadow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openMenu = (open: boolean) => {
    const tl = tlRef.current;
    if (!tl || tl.isActive()) return;

    if (flipItemRef.current) {
      flipItemRef.current.style.backgroundColor = "#090A0C";
    }

    if (open) {
      updateCloseBtnPosition();
      tl.play();
      setIsOpen(true);
      lenis?.stop();
      if (hamburgerRef.current) {
        hamburgerRef.current.style.pointerEvents = "none";
      }
      if (hamburgerContentRef.current) {
        gsap.to(hamburgerContentRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.25,
          ease: "power2.inOut",
        });
      }
      if (closeBtnRef.current) {
        closeBtnRef.current.style.pointerEvents = "auto";
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
      setIsOpen(false);
      lenis?.start();
      flipRef.current?.(false);
      tl.reverse();
      if (hamburgerRef.current) {
        hamburgerRef.current.style.pointerEvents = "auto";
      }
      if (closeBtnRef.current) {
        closeBtnRef.current.style.pointerEvents = "none";
        gsap.to(closeBtnRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.25,
          ease: "power2.out",
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
      {/* Fixed Hamburger Trigger Button Container */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-[max(2.5rem,4vh)] md:right-[max(2.5rem,calc((100vw-1800px)/2))] z-[60] pointer-events-auto">
        <button
          ref={hamburgerRef}
          onClick={() => openMenu(!isOpen)}
          className="text-gray-500 hover:text-gray-300 flex items-center justify-center gap-1 px-5 py-2 rounded-full cursor-pointer relative shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <div
            ref={hamburgerSlotRef}
            className="absolute inset-0 rounded-full pointer-events-none"
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
      </div>

      {/* Full-screen menu wrapper */}
      <div
        ref={menuWrapRef}
        className="fixed inset-0 z-[65] items-start justify-end p-3 sm:p-5 lg:p-7 pointer-events-auto"
        style={{ display: "none" }}
      >
        {/* Dark backdrop */}
        <div
          ref={menuBaseRef}
          onClick={() => openMenu(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-[4px] cursor-pointer"
          aria-hidden="true"
        />

        {/* Close button positioned exactly over the Hamburger button position */}
        <div
          ref={closeBtnRef}
          className="fixed z-[70] will-change-transform pointer-events-none"
          style={{ opacity: 0, transform: "scale(0.85)" }}
        >
          <button
            type="button"
            onClick={() => openMenu(false)}
            className="w-full h-full bg-[#14161d] text-gray-300 flex items-center justify-center gap-1.5 rounded-full cursor-pointer hover:bg-[#1f222b] hover:text-white transition-all focus:outline-none shadow-md hover:border-white/40"
            style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
            aria-label="Close menu"
          >
            <span className="uppercase font-bold text-sm select-none">Close</span>
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

        {/* Menu container card */}
        <div
          ref={menuContainRef}
          className="relative w-full h-full flex flex-col justify-between"
        >
          {/* Morph slot */}
          <div
            ref={menuSlotRef}
            className="absolute inset-0 rounded-full pointer-events-none z-0"
          />

          {/* Menu Inner Content */}
          <div
            ref={menuScrollRef}
            data-lenis-prevent
            className="relative z-20 w-full h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden p-6 sm:p-10 lg:p-12 text-white overscroll-contain rounded-full"
            style={{ position: "relative", zIndex: 20, overscrollBehavior: "contain" }}
          >
            {/* Navigation links (direct title with link and star cross icon) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-4">
              <div className="lg:col-span-12 space-y-1">
                {MENU_DATA.map((item, idx) => (
                  <div key={idx} className="main-menu__item border-b"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        openMenu(false);
                        const isHomePage = pathname === "/";
                        if (item.href === "/contact") {
                          if (pathname === "/contact") {
                            e.preventDefault();
                            scrollTo(0, { offset: 0, duration: 1.2 });
                          }
                          return;
                        }
                        if (item.href === "/") {
                          if (isHomePage) {
                            e.preventDefault();
                            scrollTo(0, { offset: 0, duration: 1.2 });
                          }
                          return;
                        }
                        if (item.href.startsWith("/#") || item.href.startsWith("#")) {
                          const targetId = item.href.replace(/^\/?#/, "");
                          if (isHomePage) {
                            e.preventDefault();
                            const target = document.getElementById(targetId);
                            if (target) {
                              scrollTo(target, { offset: 0, duration: 1.4 });
                            }
                          }
                        }
                      }}
                      className="flex items-center justify-between w-full py-1.5 sm:py-2 group focus:outline-none"
                    >
                      <span className="inline-block text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem] font-bold tracking-tight text-gray-500 group-hover:text-white transition-all duration-300 origin-left transform group-hover:scale-110">
                        {item.title}
                      </span>
                      <div className="relative w-7 h-7 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors duration-300 flex-shrink-0 ml-4">
                        <div className="transition-all duration-300 transform group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-45 flex items-center justify-center">
                          <StarCrossIcon />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 transform">
                          <SquareArrowOutUpRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer */}
            <div
              className="menu-fade-in pt-4 mt-2 border-t"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <div className="flex justify-end items-center text-xs text-gray-400">
                <div>© 2026 Fuad Talukder Full-stack Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
