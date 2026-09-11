"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";

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
  { name: "INSTAGRAM", href: "https://www.instagram.com/fuadtalukder" },
  { name: "FACEBOOK", href: "https://www.facebook.com/fuadtalukder" },
  { name: "READ.CV", href: "https://read.cv/fuadtalukder" },
];


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
      {/* Hero Section (identical to reference) */}
      <section className="relative isolate overflow-hidden border-b border-warmwhite/15">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <HeroCanvas />
        </div>
        <div className="vignette absolute inset-0 -z-10" />

        <div className="mx-auto flex max-w-[1640px] flex-col px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
            § Contact
          </p>

          <h1 className="mt-8 break-words font-serif text-[clamp(2.6rem,9vw,8.5rem)] leading-[0.92] tracking-tightest">
            <span className="mr-[0.25em]">Start</span>
            <span className="mr-[0.25em]">a</span>
            <span className="block italic text-warmwhite/65">Project.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-warmwhite/15 pt-8 md:grid-cols-12">
            <p className="md:col-span-6 max-w-2xl text-balance font-sans text-base leading-relaxed text-warmwhite/70 md:text-lg">
              The fastest way is the form below — or write directly. I read everything and reply within 1 hours, weekdays.
            </p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-6 md:grid-cols-3">
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
                  Whatsapp
                </p>
                <p className="mt-2 break-words font-serif text-base leading-snug tracking-tight text-warmwhite md:text-lg">
                  +88 01756-867585
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
              Briefs, retainers, collaborations — or just a hello. I read every line and reply within 1 hours, weekdays.
            </p>
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
                        placeholder="Full Name"
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
                  </div>
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

                  <div className="flex justify-end gap-4 pt-6 sm:flex-row sm:items-center">
                    {/* <p className="max-w-xs font-sans text-[10px] uppercase tracking-widest text-warmwhite/55">
                      By sending you agree to our minimal{" "}
                      <a href="#" className="text-warmwhite underline-offset-4 hover:underline">
                        privacy policy
                      </a>
                      .
                    </p> */}
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
              Quieter rooms
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
