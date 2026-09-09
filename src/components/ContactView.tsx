"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface ServiceItem {
  name: string;
}

const SERVICES: ServiceItem[] = [
  { name: "Web Design" },
  { name: "UI/UX" },
  { name: "Logo & Branding" },
  { name: "Webflow" },
  { name: "Framer" },
  { name: "WebGL" },
  { name: "AI Integration" },
  { name: "Other" },
];

const BUDGET_OPTIONS = [
  "< $5k",
  "$5k — $15k",
  "$15k — $30k",
  "$30k+",
];

const ELSEWHERE_LINKS = [
  { name: "GITHUB", href: "https://github.com/fuadtalukder" },
  { name: "LINKEDIN", href: "https://www.linkedin.com/in/fuadtalukder" },
  { name: "TWITTER", href: "https://twitter.com/fuadtalukder" },
  { name: "INSTAGRAM", href: "https://www.instagram.com/fuadtalukder" },
  { name: "FACEBOOK", href: "https://www.facebook.com/fuadtalukder" },
  { name: "READ.CV", href: "https://read.cv/fuadtalukder" },
];

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Particle nodes
    const count = Math.min(Math.floor((width * height) / 18000), 70);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227, 191, 180, ${p.alpha * 0.6})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(239, 236, 233, ${(1 - dist / 110) * 0.08})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}

export default function ContactView() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("$5k — $15k");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="bg-ink-900 text-warmwhite font-sans antialiased selection:bg-peach selection:text-ink-900 min-h-screen">
      {/* Top Header Navigation (exact structure to reference) */}
      {/* <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <nav
          aria-label="Primary"
          className="pointer-events-auto mx-auto flex w-full max-w-[1640px] items-center justify-between px-6 py-5 transition-[background,backdrop-filter,box-shadow] duration-500 md:px-10"
        >
          <Link
            aria-label="Fuad Talukder — home"
            className="group inline-flex items-baseline gap-2 font-serif text-xl tracking-tight text-warmwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            href="/"
          >
            <span className="relative whitespace-nowrap">
              <span className="italic">F</span>uad{" "}
              <span className="italic text-warmwhite/85">Talukder</span>
            </span>
          </Link>


        </nav>
      </header> */}

      {/* Hero Section (identical to reference) */}
      <section className="relative isolate overflow-hidden border-b border-warmwhite/15">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <HeroCanvas />
        </div>
        <div className="vignette absolute inset-0 -z-10" />

        <div className="mx-auto flex max-w-[1640px] flex-col px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            § Contact &amp; Colophon
          </p>

          <h1 className="mt-8 break-words font-serif text-[clamp(2.6rem,9vw,8.5rem)] leading-[0.92] tracking-tightest">
            <span className="mr-[0.25em]">Start</span>
            <span className="mr-[0.25em]">a</span>
            <span className="block italic text-warmwhite/65">Project.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-warmwhite/15 pt-8 md:grid-cols-12">
            <p className="md:col-span-6 max-w-2xl text-balance font-sans text-base leading-relaxed text-warmwhite/70 md:text-lg">
              The fastest way is the form below — or write directly. I read everything and reply within 48 hours, weekdays.
            </p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-6 md:grid-cols-4">
              <li className="min-w-0">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  Email
                </p>
                <p className="mt-2 break-words font-serif text-base leading-snug tracking-tight text-warmwhite md:text-lg">
                  fuadtalukder25@gmail.com
                </p>
              </li>
              <li className="min-w-0">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  Booking
                </p>
                <p className="mt-2 break-words font-serif text-base leading-snug tracking-tight text-warmwhite md:text-lg">
                  Q1 — Q4 / 2026
                </p>
              </li>
              <li className="min-w-0">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  Time zone
                </p>
                <p className="mt-2 break-words font-serif text-base leading-snug tracking-tight text-warmwhite md:text-lg">
                  GMT+6
                </p>
              </li>
              <li className="min-w-0">
                <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                  Location
                </p>
                <p className="mt-2 break-words font-serif text-base leading-snug tracking-tight text-warmwhite md:text-lg">
                  Dhaka, Bangladesh
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 01 & 02: Direct Inquiry + The Brief */}
      <section className="bg-ink-900 py-24 md:py-32">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
          {/* Left Column: 01 — Direct Inquiry */}
          <div className="md:col-span-5">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ §01 — Direct Inquiry
            </p>

            <a
              href="mailto:fuadtalukder25@gmail.com"
              className="mt-5 inline-flex max-w-full items-baseline gap-3 break-all font-serif text-[clamp(1.15rem,1.8vw,1.65rem)] leading-tight tracking-tight text-warmwhite underline-offset-4 transition-colors hover:text-peach hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
            >
              <span aria-hidden="true" className="font-sans text-[10px] uppercase tracking-widest text-peach">
                ↗
              </span>
              <span>fuadtalukder25@gmail.com</span>
            </a>

            <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-warmwhite/65">
              Briefs, retainers, collaborations — or just a hello. I read every line and reply within 48 hours, weekdays.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-warmwhite/12 pt-10">
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  Location
                </dt>
                <dd className="mt-2 font-sans text-base leading-snug text-warmwhite">
                  Dhaka, Bangladesh
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  Studio
                </dt>
                <dd className="mt-2 font-sans text-base leading-snug text-warmwhite">
                  The Compiled Thought
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  Hours
                </dt>
                <dd className="mt-2 font-sans text-base leading-snug text-warmwhite">
                  Mon — Fri · 09:00 → 18:00
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  Time zone
                </dt>
                <dd className="mt-2 font-sans text-base leading-snug text-warmwhite">
                  GMT+6
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  Booking
                </dt>
                <dd className="mt-2 font-sans text-base leading-snug text-warmwhite">
                  Open · Q1 — Q4 / 2026
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                  Reply
                </dt>
                <dd className="mt-2 font-sans text-base leading-snug text-warmwhite">
                  ≤ 48 hours, weekdays
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: 02 — The Brief */}
          <div className="md:col-span-7">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ §02 — The Brief
            </p>

            <div className="mt-5">
              {submitted ? (
                <div className="py-12 border-t border-warmwhite/15">
                  <p className="font-serif text-2xl text-warmwhite">
                    Thank you. Your inquiry has been received.
                  </p>
                  <p className="mt-3 font-sans text-sm text-warmwhite/65">
                    I will review your message and get back to you within 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="mt-6 rounded-full border border-warmwhite/30 px-5 py-2 font-sans text-[10px] uppercase tracking-widest text-warmwhite hover:border-warmwhite hover:text-peach transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" />
                  <input type="hidden" name="services" value={selectedServices.join(", ")} />
                  <input type="hidden" name="budget" value={selectedBudget} />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    <label className="block">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                        Your name<span aria-hidden="true" className="ml-1 text-peach">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Fuad Talukder"
                        required
                        aria-required="true"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full border-b border-warmwhite/15 bg-transparent py-2.5 font-serif text-lg leading-snug text-warmwhite placeholder:text-warmwhite/55 transition-colors focus:border-warmwhite focus:outline-none focus-visible:border-peach"
                        name="name"
                      />
                    </label>

                    <label className="block">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                        Email address<span aria-hidden="true" className="ml-1 text-peach">*</span>
                      </span>
                      <input
                        type="email"
                        placeholder="hello@studio.com"
                        required
                        aria-required="true"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full border-b border-warmwhite/15 bg-transparent py-2.5 font-serif text-lg leading-snug text-warmwhite placeholder:text-warmwhite/55 transition-colors focus:border-warmwhite focus:outline-none focus-visible:border-peach"
                        name="email"
                      />
                    </label>

                    <label className="block">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                        Company / Studio
                      </span>
                      <input
                        type="text"
                        placeholder="The Compiled Thought"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-2 w-full border-b border-warmwhite/15 bg-transparent py-2.5 font-serif text-lg leading-snug text-warmwhite placeholder:text-warmwhite/55 transition-colors focus:border-warmwhite focus:outline-none focus-visible:border-peach"
                        name="company"
                      />
                    </label>

                    <label className="block">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                        Project URL or brief
                      </span>
                      <input
                        type="text"
                        placeholder="https://…"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-2 w-full border-b border-warmwhite/15 bg-transparent py-2.5 font-serif text-lg leading-snug text-warmwhite placeholder:text-warmwhite/55 transition-colors focus:border-warmwhite focus:outline-none focus-visible:border-peach"
                        name="url"
                      />
                    </label>
                  </div>

                  <fieldset>
                    <legend className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                      ◊ What do you need
                    </legend>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {SERVICES.map((s) => {
                        const isSelected = selectedServices.includes(s.name);
                        return (
                          <li key={s.name}>
                            <button
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => toggleService(s.name)}
                              className={`rounded-full border px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${isSelected
                                ? "border-peach bg-peach/15 text-peach"
                                : "border-warmwhite/20 text-warmwhite/80 hover:border-warmwhite"
                                }`}
                            >
                              {s.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>

                  <fieldset>
                    <legend className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/65">
                      ◊ Budget range
                    </legend>
                    <div
                      className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4"
                      role="radiogroup"
                      aria-label="Budget range"
                    >
                      {BUDGET_OPTIONS.map((opt) => {
                        const isSelected = selectedBudget === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setSelectedBudget(opt)}
                            className={`w-full rounded-md border px-4 py-2.5 font-sans text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach ${isSelected
                              ? "border-warmwhite bg-warmwhite/15 text-warmwhite"
                              : "border-warmwhite/15 text-warmwhite/65 hover:border-warmwhite"
                              }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-sans text-[10px] uppercase tracking-widest text-warmwhite/65"
                    >
                      ◊ Project details
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me what you’re building, the audience, the vibe, the rough timeline…"
                      className="mt-3 w-full resize-none rounded-md border border-warmwhite/15 bg-transparent px-4 py-3 font-sans text-base leading-relaxed text-warmwhite placeholder:text-warmwhite/55 transition-colors focus:border-warmwhite focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach"
                      maxLength={3000}
                    />
                    <p className="mt-2 text-right font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                      {message.length} / 3000
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-4 border-t border-warmwhite/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                      By sending you agree to our minimal{" "}
                      <a href="#" className="text-warmwhite underline-offset-4 hover:underline">
                        privacy policy
                      </a>
                      .
                    </p>
                    <div className="inline-block">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full bg-warmwhite px-6 py-3.5 font-sans text-[11px] uppercase tracking-widest text-ink-900 transition-colors hover:bg-peach disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach font-medium cursor-pointer"
                      >
                        {isSubmitting ? "Sending…" : "Send Inquiry"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Elsewhere (Exact match) */}
      <section className="border-t border-warmwhite/12 bg-ink-900 py-20 md:py-24">
        <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
              ◊ §03 — Elsewhere
            </p>
            <p className="mt-3 max-w-xs font-serif text-xl leading-snug tracking-tight text-warmwhite">
              Quieter rooms — process notes, reels, and code.
            </p>
          </div>

          <div className="md:col-span-9">
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {ELSEWHERE_LINKS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.name} in a new tab`}
                    className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-warmwhite/15 px-4 py-2.5 font-sans text-[11px] uppercase tracking-widest text-warmwhite/80 transition-colors hover:border-peach hover:text-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-peach"
                  >
                    <span>{item.name}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* STRICT STOP POINT: Page ends after Section 03 per instructions */}
    </div>
  );
}
