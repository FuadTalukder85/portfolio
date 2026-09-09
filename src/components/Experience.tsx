'use client';

import React, { useRef, useState, useEffect } from "react";
import { Calendar, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";

interface ExperienceItem {
    id: string;
    stepNumber: string;
    role: string;
    company: string;
    location: string;
    duration: string;
    description: string;
    responsibilities: string[];
    isActive?: boolean;
}

const experiences: ExperienceItem[] = [
    {
        id: "1",
        stepNumber: "01",
        role: "Junior Software Engineer",
        company: "Antopolis",
        location: "Dhaka, Bangladesh",
        duration: "Jan 2026 - Present",
        description:
            "Working in a core full-stack engineering capacity, responsible for architecting and developing dynamic, high-concurrency websites and comprehensive business automation platforms.",
        responsibilities: [
            "Architect and build full-stack web platforms and custom automation workflows.",
            "Design robust backend services, RESTful APIs, and database schemas with PostgreSQL, Prisma, and MongoDB.",
            "Implement automated data pipelines, payment gateways (Stripe), and webhook integrations.",
            "Collaborate cross-functionally to transform complex requirements into intuitive, performant digital solutions."
        ],

        isActive: true,
    },
    {
        id: "2",
        stepNumber: "02",
        role: "Frontend Developer",
        company: "BMS Tech Logistics Ltd.",
        location: "Dhaka, Bangladesh",
        duration: "1 Apr 2025 - 1 Jan 2026",
        description:
            "Led frontend development for enterprise logistics & transport ERP solutions, building modular, responsive user interfaces with real-time operational analytics.",
        responsibilities: [
            "Engineered comprehensive transport management ERP modules (fleet, drivers, inventory, billing).",
            "Implemented interactive data dashboards and operational reports using React and Recharts.",
            "Built scalable, reusable component libraries with Tailwind CSS and TypeScript.",
            "Optimized frontend performance, state management with Context API/Redux, and API client integration."
        ],
        isActive: false,
    },
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const thresholdsRef = useRef<number[]>([0, 0.45]);
    const [activeNodes, setActiveNodes] = useState<boolean[]>([true, false]);

    // Scroll progress linked directly to the timeline container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 70%", "end 65%"],
    });

    // Spring physics for ultra-smooth scrolling feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 260,
        damping: 28,
        restDelta: 0.001,
    });

    // Height of the filled progress line
    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    // Dynamic tip indicators for leading edge glow
    const tipOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0.4]);
    const tipColor = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        ["#d4ff00", "#bef264", "#22c55e"]
    );
    const tipShadow = useTransform(
        smoothProgress,
        [0, 0.5, 1],
        [
            "0 0 10px #d4ff00, 0 0 20px rgba(212,255,0,0.8)",
            "0 0 10px #bef264, 0 0 20px rgba(190,242,100,0.8)",
            "0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.8)"
        ]
    );

    // Compute dynamic row thresholds based on DOM offsets
    useEffect(() => {
        const updateThresholds = () => {
            if (!containerRef.current) return;
            const containerHeight = containerRef.current.offsetHeight;
            if (containerHeight === 0) return;

            const computed = experiences.map((_, i) => {
                if (i === 0) return 0;
                const el = rowRefs.current[i];
                if (!el) return 0.45;
                const rowTop = el.offsetTop;
                return Math.min(Math.max((rowTop + 10) / containerHeight, 0.1), 0.9);
            });
            thresholdsRef.current = computed;
        };

        updateThresholds();
        window.addEventListener("resize", updateThresholds);
        return () => window.removeEventListener("resize", updateThresholds);
    }, []);

    // Sync node active highlights with smooth scroll progress
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        const t = thresholdsRef.current;
        setActiveNodes([
            latest >= (t[0] ?? 0),
            latest >= (t[1] ?? 0.45),
        ]);
    });

    return (
        <section id="experience" className="bg-[#090a0c] text-white py-24 px-4 min-h-screen relative overflow-hidden font-sans border-t border-gray-900">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#d4ff00]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                {/* <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 mb-3 bg-[#141518] px-3.5 py-1.5 rounded-full border border-gray-800 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse"></span>
                    <span>&#123;03&#125; Career Timeline</span>
                </div> */}
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    Work Experience
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                    Almost <span className="text-white font-semibold">1.5 years</span> of hands-on software engineering experience specializing in full-stack web platforms, process automation, and high-performance frontend interfaces.
                </p>
            </div>

            {/* Timeline Grid Container */}
            <div ref={containerRef} className="max-w-6xl xl:max-w-7xl mx-auto relative z-10 px-2 sm:px-4">
                {/* Vertical Timeline Track Line (Mobile: left-5, Desktop: left-1/2) */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-5 bottom-8 w-[2px] md:w-[3px] pointer-events-none z-10">
                    {/* Unfilled default track line */}
                    <div className="absolute inset-0 bg-[#1e2025] rounded-full border border-gray-800/40" />

                    {/* Filled animated line */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 rounded-full origin-top"
                        style={{
                            height: progressHeight,
                            background: "linear-gradient(180deg, #d4ff00 0%, #bef264 35%, #84cc16 70%, #22c55e 100%)",
                            boxShadow: "0 0 12px rgba(212, 255, 0, 0.45), 0 0 24px rgba(212, 255, 0, 0.2)",
                        }}
                    />

                    {/* Glowing leading tip / head */}
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full pointer-events-none"
                        style={{
                            top: progressHeight,
                            opacity: tipOpacity,
                            backgroundColor: tipColor,
                            boxShadow: tipShadow,
                        }}
                    />
                </div>

                <div className="space-y-12 md:space-y-20">
                    {experiences.map((item, index) => {
                        const isRightSide = index % 2 === 0;
                        const isNodeActive = activeNodes[index] ?? false;

                        return (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    rowRefs.current[index] = el;
                                }}
                                className="relative flex flex-col md:flex-row items-start justify-center"
                            >
                                {/* Timeline Circle Node (Mobile: left-5, Desktop: left-1/2, Top-Aligned with Card) */}
                                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center">
                                    <motion.div
                                        animate={{
                                            backgroundColor: isNodeActive ? "#d4ff00" : "#16171a",
                                            color: isNodeActive ? "#000000" : "#9ca3af",
                                            borderColor: isNodeActive ? "#d4ff00" : "#374151",
                                            boxShadow: isNodeActive
                                                ? "0 0 25px rgba(212,255,0,0.6), 0 0 0 4px rgba(212,255,0,0.2)"
                                                : "0 0 0 1px rgba(55,65,81,0.4)",
                                            scale: isNodeActive ? 1.05 : 1.0,
                                        }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base font-mono border select-none transition-colors"
                                    >
                                        {item.stepNumber}
                                    </motion.div>
                                </div>

                                {/* Content Layout */}
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 lg:gap-28 items-start">
                                    {/* Left Column Container */}
                                    <div className={isRightSide ? "hidden md:block" : "pl-14 md:pl-0"}>
                                        {!isRightSide && (
                                            <BookPageCard
                                                item={item}
                                                isRightSide={false}
                                                isSectionActive={isNodeActive}
                                            />
                                        )}
                                    </div>

                                    {/* Right Column Container */}
                                    <div className={!isRightSide ? "hidden md:block" : "pl-14 md:pl-0"}>
                                        {isRightSide && (
                                            <BookPageCard
                                                item={item}
                                                isRightSide={true}
                                                isSectionActive={isNodeActive}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

{/* Book Page Card with Realistic 3D Scroll Page-Flip Effect */ }
function BookPageCard({
    item,
    isRightSide,
    isSectionActive,
}: {
    item: ExperienceItem;
    isRightSide: boolean;
    isSectionActive?: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Track scroll of this card relative to viewport
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    // Spring physics for authentic paper page inertia and tactile resistance
    const smooth = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 22,
        mass: 0.6,
        restDelta: 0.001,
    });

    // Mobile cards always hinge on the left timeline track; Desktop cards hinge toward the center spine
    const isHingedOnLeft = !isDesktop || isRightSide;

    // 3D Rotation Y: Page turns around the central spine
    // 0 = Entering from bottom: tilted open like a turning page
    // 0.42 - 0.58 = In viewport center: flat open for reading (0 deg)
    // 1.0 = Leaving top: turns past to reveal next card
    const rotateY = useTransform(
        smooth,
        [0, 0.42, 0.58, 1],
        isHingedOnLeft ? [-38, 0, 0, 38] : [38, 0, 0, -38]
    );

    // Subtle natural tilt along X axis during turn
    const rotateX = useTransform(smooth, [0, 0.42, 0.58, 1], [5, 0, 0, -5]);

    // Micro skew on Z axis mimicking physical paper flexibility
    const rotateZ = useTransform(
        smooth,
        [0, 0.42, 0.58, 1],
        isHingedOnLeft ? [-1.2, 0, 0, 1.2] : [1.2, 0, 0, -1.2]
    );

    // Subtle scale and 3D translation lifting off the page
    const scale = useTransform(smooth, [0, 0.42, 0.58, 1], [0.94, 1, 1, 0.94]);
    const z = useTransform(smooth, [0, 0.42, 0.58, 1], [-25, 0, 0, -25]);

    // Dynamic light sheen and turning shadow
    const pageShadowOpacity = useTransform(
        smooth,
        [0, 0.32, 0.44, 0.56, 0.68, 1],
        [0.65, 0.28, 0, 0, 0.28, 0.65]
    );

    // Dynamic 3D elevation drop shadow as the page turns
    const boxShadow = useTransform(
        smooth,
        [0, 0.45, 0.55, 1],
        [
            "0 30px 60px -15px rgba(0,0,0,0.92), 0 10px 25px rgba(0,0,0,0.7)",
            isSectionActive
                ? "0 20px 45px -10px rgba(0,0,0,0.85), 0 0 25px rgba(212,255,0,0.08)"
                : "0 15px 35px -5px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03)",
            isSectionActive
                ? "0 20px 45px -10px rgba(0,0,0,0.85), 0 0 25px rgba(212,255,0,0.08)"
                : "0 15px 35px -5px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03)",
            "0 30px 60px -15px rgba(0,0,0,0.92), 0 10px 25px rgba(0,0,0,0.7)",
        ]
    );

    return (
        <div ref={cardRef} className="w-full [perspective:1500px]">
            <motion.div
                style={{
                    transformOrigin: isHingedOnLeft ? "left center" : "right center",
                    rotateY,
                    rotateX,
                    rotateZ,
                    scale,
                    z,
                    boxShadow,
                    transformStyle: "preserve-3d",
                }}
                className={`bg-[#121316] border rounded-2xl p-6 sm:p-7 md:p-8 lg:p-9 relative transition-colors duration-300 group transform-gpu select-none ${isSectionActive
                    ? "border-gray-700/90 hover:border-[#d4ff00]/40"
                    : "border-gray-800/90 hover:border-[#d4ff00]/40"
                    }`}
            >
                {/* Dynamic Page Lighting Sheen / Ambient Turn Shadow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity"
                    style={{
                        opacity: pageShadowOpacity,
                        background: isHingedOnLeft
                            ? "linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(20,20,25,0.2) 35%, rgba(212,255,0,0.04) 60%, rgba(0,0,0,0.7) 100%)"
                            : "linear-gradient(255deg, rgba(0,0,0,0.75) 0%, rgba(20,20,25,0.2) 35%, rgba(212,255,0,0.04) 60%, rgba(0,0,0,0.7) 100%)",
                    }}
                />

                {/* Inner Spine Crease Shadow */}
                <div
                    className={`absolute inset-y-0 ${isHingedOnLeft
                        ? "left-0 bg-gradient-to-r rounded-l-2xl"
                        : "right-0 bg-gradient-to-l rounded-r-2xl"
                        } from-black/75 via-black/25 to-transparent w-8 pointer-events-none z-10`}
                />

                {/* Spine Hinge Accent Indicator */}
                <div
                    className={`absolute inset-y-6 ${isHingedOnLeft ? "left-0 rounded-r-full" : "right-0 rounded-l-full"
                        } w-[3px] bg-gradient-to-b from-transparent via-[#d4ff00]/45 to-transparent pointer-events-none z-20`}
                />

                {/* Top Tag / Status & Duration */}
                <div className="flex flex-wrap justify-between items-center gap-2.5 mb-5 relative z-10">
                    <div className="flex items-center gap-2">
                        <span className="text-[#d4ff00] font-mono text-sm md:text-base font-bold">
                            {item.stepNumber}.
                        </span>
                        {item.isActive && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30 font-mono">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-ping" />
                                Current Role
                            </span>
                        )}
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-[#1c1d22] text-gray-300 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg border border-gray-800">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                        <span>{item.duration}</span>
                    </div>
                </div>

                {/* Role & Company */}
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white mb-2 group-hover:text-[#d4ff00] transition-colors flex items-center justify-between relative z-10">
                    <span>{item.role}</span>
                    <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:text-[#d4ff00] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>

                <div className="flex items-center gap-3 text-sm md:text-base text-gray-400 font-medium mb-5 relative z-10">
                    <span className="text-gray-300 font-semibold">{item.company}</span>
                    <span className="text-gray-600">•</span>
                    <span className="inline-flex items-center gap-1.5 text-xs md:text-sm text-gray-400">
                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
                        {item.location}
                    </span>
                </div>

                {/* Intro Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 relative z-10">
                    {item.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-3 mb-5 border-t border-gray-800/80 pt-5 relative z-10">
                    <p className="text-xs uppercase font-mono tracking-wider text-gray-400 font-semibold">
                        Key Responsibilities:
                    </p>
                    {item.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#d4ff00] shrink-0 mt-0.5" />
                            <span>{resp}</span>
                        </div>
                    ))}
                </div>

                {/* Book Page Footer Marker */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-800/60 text-[11px] font-mono text-gray-500 relative z-10">
                    <span className="flex items-center gap-1.5 text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]/60" />
                        {item.company}
                    </span>
                    <span className="text-gray-400 font-medium tracking-widest uppercase">
                        PAGE {item.stepNumber}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
