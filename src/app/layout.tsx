import type { Metadata } from "next";
import { Manrope, Geist_Mono, Syne, Newsreader, Inter } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fuad Talukder | Full-Stack Developer",
    template: "%s | Fuad Talukder",
  },
  description:
    "Fuad Talukder is a Full-Stack Developer & Software Engineer specializing in Next.js, React, Node.js, TypeScript, PostgreSQL, Prisma ORM, MongoDB, and scalable web platforms.",
  keywords: [
    "Fuad Talukder",
    "Full-Stack Developer",
    "Software Engineer",
    "Software Developer",
    "Next.js Developer",
    "React Developer",
    "React.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Express.js",
    "NestJS",
    "PostgreSQL",
    "Prisma ORM",
    "MongoDB",
    "Tailwind CSS",
    "RESTful API Development",
    "Full Stack Web Development",
    "Workflow Automation",
    "Stripe Integration",
    "Frontend Engineer",
    "Backend Engineer",
    "JavaScript Developer",
    "Dhaka Bangladesh Developer",
    "Web Application Architecture",
    "Automation Engineer",
    "CRM and ERP Developer",
    "Vibe Coder",
  ],
  authors: [{ name: "Fuad Talukder" }],
  creator: "Fuad Talukder",
  publisher: "Fuad Talukder",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  other: {
    "contact:email": "fuadtalukder25@gmail.com",
    "contact:phone_number": "+8801756-867585",
  },
  metadataBase: new URL("https://fuadtalukder.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fuad Talukder | Full-Stack Developer & Software Engineer",
    description:
      "Fuad Talukder is a Full-Stack Developer & Software Engineer specializing in Next.js, React, Node.js, TypeScript, PostgreSQL, and scalable web architectures.",
    url: "https://fuadtalukder.vercel.app",
    siteName: "Fuad Talukder Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/bg.jpg",
        width: 1200,
        height: 630,
        alt: "Fuad Talukder - Full-Stack Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fuad Talukder | Full-Stack Developer & Software Engineer",
    description:
      "Full-Stack Developer specializing in Next.js, TypeScript, Node.js, PostgreSQL, and modern web applications.",
    images: ["/bg.jpg"],
    creator: "@fuadtalukder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fuad Talukder",
  jobTitle: "Full-Stack Developer",
  url: "https://fuadtalukder.vercel.app",
  email: "mailto:fuadtalukder25@gmail.com",
  telephone: "+8801756-867585",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh",
  },
  description:
    "Full-Stack Developer specializing in Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma ORM, MongoDB, and scalable web architectures.",
  knowsAbout: [
    "Full-Stack Web Development",
    "Software Developer",
    "Next.js",
    "React",
    "React.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "NestJS",
    "PostgreSQL",
    "Prisma ORM",
    "MongoDB",
    "Tailwind CSS",
    "RESTful APIs",
    "Stripe Payment Gateway",
    "Workflow Automation",
    "Software Architecture",
    "CRM and ERP Developer",
    "Automation Engineer",
    "Vibe Coder",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${newsreader.variable} ${syne.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <PageLoader />
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
