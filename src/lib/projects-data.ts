export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectSection {
  number: string;
  label: string;
  title: string;
  description: string[];
  image: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  titleLine1: string;
  titleLine2: string;
  heroImage: string;
  categories: string[];
  liveUrl: string;
  githubUrl: string;
  year: string;
  role: string;
  client: string;
  duration: string;
  brief: string;
  stats: ProjectStat[];
  problem: string;
  solution: string;
  techStack: string[];
  sections: ProjectSection[];
  deliverables: string[];
  outcomes: ProjectStat[];
  prevSlug: string | null;
  nextSlug: string | null;
}

export const projectsData: ProjectData[] = [
  {
    slug: 'business-automation',
    title: 'Business Automation',
    titleLine1: 'Business',
    titleLine2: 'Automation.',
    heroImage: '/img-01.png',
    categories: ['Web Design', 'Automation'],
    liveUrl: 'https://clientbffb-automation.vercel.app/login',
    githubUrl: '#',
    year: '2026',
    role: 'Full-Stack Developer',
    client: 'Banga Flavour & Fragrance',
    duration: '3 months',
    brief:
      'Developed and maintained a production business automation platform that digitizes and streamlines recipe development, application lab operations, sensory testing, product development, approval workflows and other critical processes for a food manufacturing business.',
    stats: [
      { value: '100%', label: 'Digitized lab & production R&D workflows' },
      { value: '12+', label: 'Integrated operational modules automated' },
      { value: '0', label: 'Paper-based logs required in R&D' },
      { value: '99.9%', label: 'System uptime across operations' },
    ],
    problem:
      'The client needed a unified platform to streamline R&D and laboratory operations, but teams were relying on disconnected tools — manually managing recipes, shelf-life tests, sensory evaluations, sample preparation, cleaning routines, and approval workflows across spreadsheets and paper-based processes. This created data silos, slowed recipe iterations, increased human error, and made batch traceability and cross-team collaboration difficult.',
    solution:
      'A centralized digitised workflow engine that standardises food formulation R&D from lab trial to dispatch. It automates recipe versioning, sensory & shelf-life tracking schedules, and maintenance compliance using an intuitive React dashboard powered by Node.js micro-services, Socket.IO real-time alerts, and automated task notifications.',
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Socket.IO',
      'PostgreSQL',
      'Lucide React',
      'Vercel',
    ],
    sections: [
      {
        number: '01',
        label: 'Lab & Recipe Management',
        title: 'Digitized R&D & Application Lab Workflows',
        description: [
          'Centralized management of master application recipes, sensory testing evaluations, and shelf-life monitoring schedules in a single unified interface.',
          'Eliminates paper logs and spreadsheets, offering real-time batch traceability and automated trial data tracking for food technology teams.',
        ],
        image: '/img-01.png',
      },
      {
        number: '02',
        label: 'Sensory & Shelf-Life Testing',
        title: 'Standardized Testing & Quality Analytics',
        description: [
          'Automated scoring systems for flavor profiles, sensory panels, and shelf-life degradation tracking with interactive performance summary dashboards.',
          'Empowers decision-makers with clear sensory performance metrics, product adoption rates, and approval status indicators.',
        ],
        image: '/img-01-sensory.png',
      },
      {
        number: '03',
        label: 'Task & Team Coordination',
        title: 'Automated Sample Dispatch & Maintenance Compliance',
        description: [
          'Streamlined team task assignments, equipment maintenance logs, hygiene/cleaning routines, and client sample dispatch tracking.',
          'Real-time status updates ensure seamless cross-departmental coordination between laboratory technicians and operations managers.',
        ],
        image: '/img-01-dispatch.png',
      },
    ],
    deliverables: [
      'Centralized Application Lab & Recipe Management Module',
      'Sensory Testing & Panel Evaluation Scoring System',
      'Shelf-Life Degradation & Compliance Tracking',
      'Client Sample Dispatch & Logistics Monitoring System',
      'Equipment Maintenance & Hygiene/Cleaning Routine Tracker',
      'Interactive Executive Overview & Real-time Analytics Dashboard',
    ],
    outcomes: [
      { value: '100%', label: 'Traceability across R&D trials' },
      { value: '60%', label: 'Reduction in recipe development cycle time' },
      { value: '12+', label: 'Integrated lab & operational modules' },
      { value: '99.9%', label: 'Platform availability' },
    ],
    prevSlug: null,
    nextSlug: 'ecommerce-backend',
  },
  {
    slug: 'ecommerce-backend',
    title: 'Multi-Vendor E-Commerce Backend',
    titleLine1: 'Multi-Vendor E-Commerce',
    titleLine2: 'Backend Engine.',
    heroImage: '/img-02.png',
    categories: ['Backend API', 'E-Commerce'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2026',
    role: 'Backend Developer',
    client: 'E-Commerce Platform',
    duration: 'Under Construction',
    brief:
      'A production-grade, multi-vendor e-commerce backend REST API engineered with Node.js, Express 5, TypeScript, Prisma ORM, PostgreSQL, and Better Auth. Built for high performance, dynamic multi-tenant RBAC (custom admin roles & vendor store-scoped permissions), dynamic query filtering, transactional reliability, and seamless vendor payout management.',
    stats: [
      { value: 'RBAC', label: 'Dynamic Custom Roles & Store-Scoped Permissions (Admin & Vendor)' },
      { value: '100%', label: 'Type-Safe Schema Validation with Zod & Prisma' },
      { value: '<100ms', label: 'Average API Latency with QueryBuilder Optimizations' },
      { value: '10+', label: 'Core Modular Micro-Domains' },
    ],
    problem:
      'Building scalable multi-vendor marketplaces requires handling dynamic RBAC permissions where admins can create custom platform roles and vendors can assign store-scoped permissions to staff members, alongside managing order/payout transactional integrity, multi-vendor product inventories, and complex query filtering across categories, reviews, wishlists, and coupons without sacrificing performance or maintainability.',
    solution:
      'Architected a modular Express + TypeScript backend utilizing the Controller-Service-Repository pattern. Features a multi-tenant dynamic RBAC engine (AppRole, Permission, RolePermission, UserRole, UserPermission with tenantId scoping), Better Auth cookie/session authentication, Prisma Pg adapter for PostgreSQL, Zod validation, Cloudinary asset pipelines, Nodemailer EJS notification services, and a custom QueryBuilder for server-side pagination, sorting, and dynamic filtering.',
    techStack: [
      'Node.js',
      'Express.js 5',
      'TypeScript',
      'PostgreSQL',
      'Prisma ORM',
      'Better Auth',
      'Zod',
      'Cloudinary',
      'Nodemailer',
      'Redis',
      'pnpm',
    ],
    sections: [
      {
        number: '01',
        label: 'Dynamic RBAC & Vendor Multi-Tenancy',
        title: 'Custom Roles, Store-Scoped Permissions & Multi-Vendor Management',
        description: [
          'Engineered a dynamic, multi-tenant RBAC system where Admins can create custom platform roles with tailored permission sets, and Vendors can create and assign store-scoped permissions to staff members using tenant-isolated scoping.',
          'Supports system roles (Customer, Vendor, Admin, Super Admin) plus dynamic custom roles and granular route protection across all platform modules.',
        ],
        image: '/img-02.png',
      },
      {
        number: '02',
        label: 'Order Lifecycle & Financial Systems',
        title: 'Transactional Checkout, Coupons & Vendor Payouts',
        description: [
          'Engineered atomic database transactions for order creation, coupon validation, dynamic tax calculations, and vendor earnings breakdowns.',
          'Supports multi-item checkout flows across multiple vendors with real-time stock deduction and transactional email receipt generation via Nodemailer & EJS.',
        ],
        image: '/img-02.png',
      },
      {
        number: '03',
        label: 'High-Performance Query Engine',
        title: 'Custom QueryBuilder & Media Pipeline',
        description: [
          'Built a reusable QueryBuilder utility enabling dynamic multi-field search, nested category filtering, range queries, and pagination across all endpoints.',
          'Integrated Multer & Cloudinary for secure file upload processing, optimizing product media storage and transformation.',
        ],
        image: '/img-02.png',
      },
    ],
    deliverables: [
      'Multi-Vendor RESTful API with Express 5 & TypeScript',
      'Dynamic Multi-Tenant RBAC Engine (Custom Admin Roles & Vendor Store-Scoped Permissions)',
      'Session & Cookie-based Authentication Engine (Better Auth)',
      'Prisma ORM Schema & PostgreSQL Migration Architecture',
      'Dynamic Search, Filter, Sort & Paginate QueryBuilder',
      'Vendor Payout & Earnings Management Subsystem',
      'Cloudinary Media Upload & Nodemailer EJS Email Pipeline',
    ],
    outcomes: [
      { value: '< 100ms', label: 'Average API Endpoint Latency' },
      { value: '100%', label: 'Strict TypeScript & Zod Schema Validation' },
      { value: 'RBAC', label: 'Dynamic Custom Roles & Store-Scoped Access Control' },
      { value: '0', label: 'Data Inconsistencies during Checkout Transactions' },
    ],
    prevSlug: 'business-automation',
    nextSlug: 'real-estate-platform',
  },
  {
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    titleLine1: 'Real Estate',
    titleLine2: 'Platform.',
    heroImage: '/img-03.png',
    categories: ['Full-Stack', 'Real Estate'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2026',
    role: 'Full-Stack Developer',
    client: 'Real Estate Ecosystem',
    duration: 'Under Construction',
    brief:
      'A modern full-stack real estate platform built with Next.js 16, React 19, Redux Toolkit, Tailwind CSS, and a NestJS + MongoDB Mongoose REST API. Features interactive property search, dynamic filter engines, agent directories, property inquiry management, JWT role-based security, and smooth GSAP UI animations.',
    stats: [
      { value: 'Full-Stack', label: 'Next.js 16 Frontend + NestJS REST API' },
      { value: '100%', label: 'State Management with Redux Toolkit' },
      { value: 'MongoDB', label: 'Mongoose ODM & Schemas' },
      { value: 'JWT', label: 'Secure Auth & Role Access' },
    ],
    problem:
      'Property search platforms often struggle with sluggish filtering across complex property attributes, fragmented agent-client communications, disjointed state management across search pages, and weak backend performance during peak search queries.',
    solution:
      'Engineered a high-performance full-stack real estate solution combining Next.js 16 for SSR page rendering with NestJS for modular backend micro-services. Utilizes Redux Toolkit for global search/favorites state, Mongoose schema indexing for fast MongoDB spatial and attribute queries, Firebase Auth integration, and GSAP + Keen Slider for smooth property showcases.',
    techStack: [
      'Next.js 16',
      'React 19',
      'NestJS',
      'TypeScript',
      'MongoDB',
      'Mongoose',
      'Redux Toolkit',
      'Tailwind CSS',
      'GSAP',
      'JWT',
      'Firebase',
    ],
    sections: [
      {
        number: '01',
        label: 'Property Discovery & Filtering',
        title: 'Interactive Property Search & Dynamic Filtering',
        description: [
          'Integrated multi-parameter property filtering (price ranges, bed/bath counts, location hotspots, property types) with instant client-side Redux store updates.',
          'Features responsive Keen Slider & React Slick carousels for full-bleed property image galleries and interactive floorplan viewports.',
        ],
        image: '/img-03.png',
      },
      {
        number: '02',
        label: 'NestJS Micro-Service Backend',
        title: 'Modular NestJS Controller & Mongoose Database Schema',
        description: [
          'Built a clean NestJS modular architecture with TypeScript DTOs, Class Validators, and JWT authentication guards protecting admin and agent endpoints.',
          'Optimized MongoDB database collections via Mongoose indexing for high-speed location and price range queries.',
        ],
        image: '/img-03.png',
      },
      {
        number: '03',
        label: 'Agent & Inquiry Management',
        title: 'Agent Profiles, Client Inquiries & Favorites',
        description: [
          'Empowers clients to save favorite properties to persistent lists, schedule virtual site visits, and directly message assigned real estate agents.',
          'Provides real estate agents and administrators with a centralized property management portal to manage active listings and client lead pipelines.',
        ],
        image: '/img-03.png',
      },
    ],
    deliverables: [
      'Next.js 16 + React 19 Frontend Web Application',
      'NestJS Modular Backend REST API with Class Validators',
      'MongoDB Database Models & Mongoose ODM Schemas',
      'Redux Toolkit Global State Management Pipeline',
      'JWT Authentication Guard & Role-Based Access Control',
      'GSAP & Keen Slider Interactive Property Showcase',
    ],
    outcomes: [
      { value: '< 150ms', label: 'Average Property Query Latency' },
      { value: '100%', label: 'TypeScript & Class-Validator Type Safety' },
      { value: 'Redux', label: 'Centralized Global Search & Favorites State' },
      { value: '0', label: 'Data Inconsistencies across Frontend & API' },
    ],
    prevSlug: 'ecommerce-backend',
    nextSlug: 'privacyguard',
  },
  {
    slug: 'privacyguard',
    title: 'PrivacyGuard Analyzer',
    titleLine1: 'PrivacyGuard',
    titleLine2: 'Analyzer.',
    heroImage: '/img-04.png',
    categories: ['Chrome Extension', 'Security & Privacy'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2026',
    role: 'Extension Developer',
    client: 'Open Source Privacy Tool',
    duration: '1 month',
    brief:
      'A high-performance Chrome Manifest V3 extension that analyzes website privacy risks in real-time. Computes a dynamic Privacy Risk Score (0–100) using empirical weighted scoring across network trackers, cookie inspections, browser fingerprinting defense, and sensitive API permissions with 100% local client-side execution.',
    stats: [
      { value: '100%', label: 'Client-Side Local Analysis — 0 Cloud Telemetry' },
      { value: '140+', label: 'Known Tracker Domains Intercepted' },
      { value: 'MV3', label: 'Manifest V3 Extension Architecture' },
      { value: '0-100', label: 'Real-Time Privacy Risk Score' },
    ],
    problem:
      'Modern websites deploy stealthy third-party trackers, cross-site cookies, canvas/audio/WebGL fingerprinting scripts, and sensitive browser permissions without user transparency, exposing users to cross-site tracking and data profiling.',
    solution:
      'Engineered a privacy risk analyzer Chrome Extension using React 19, TypeScript, and Manifest V3 APIs. Intercepts web requests via chrome.webRequest, audits first/third-party cookies via chrome.cookies, blocks canvas/audio/WebGL fingerprinting with MAIN-world content scripts, and generates comprehensive audit reports with zero cloud dependencies.',
    techStack: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Chrome Extension MV3',
      'Vite',
      'chrome.webRequest',
      'chrome.cookies',
      'chrome.permissions',
      'chrome.scripting',
    ],
    sections: [
      {
        number: '01',
        label: 'Tracker & Cookie Inspection',
        title: 'Real-Time Network Interception & Cookie Auditing',
        description: [
          'Intercepts third-party network requests in real-time and cross-references them against an embedded database of over 140 known tracking domains.',
          'Inspects first-party vs. third-party cookies using chrome.cookies API with value masking to safeguard sensitive user session tokens during security audits.',
        ],
        image: '/img-04.png',
      },
      {
        number: '02',
        label: 'Fingerprinting & Permission Defense',
        title: 'MAIN-World Script Interception & Permission Audits',
        description: [
          'Deploys MAIN-world content scripts to intercept stealthy device fingerprinting attempts targeting Canvas (toDataURL, getImageData), AudioContext, and WebGL APIs.',
          'Audits granted browser permissions (Geolocation, Camera, Microphone) to flag unauthorized or excessive device access.',
        ],
        image: '/img-04.png',
      },
      {
        number: '03',
        label: 'Risk Scoring & Audit Reports',
        title: 'Logarithmic Risk Engine & Interactive Extension Popup',
        description: [
          'Computes empirical privacy scores (0-100) using a logarithmic penalty algorithm and categorizes risk into Low (70-100), Moderate (40-69), and High (0-39) risk bands.',
          'Includes an interactive extension popup gauge alongside a full-screen detailed audit dashboard with JSON report export capabilities.',
        ],
        image: '/img-04.png',
      },
    ],
    deliverables: [
      'Chrome Manifest V3 Extension Package (Unpacked Dist)',
      'Real-Time Network Tracker Interceptor (~140 Domain Database)',
      'MAIN-World Fingerprinting Defense System (Canvas, Audio, WebGL)',
      'Logarithmic Weighted Privacy Risk Scoring Engine',
      'Interactive Glassmorphic Popup Dashboard with SVG Risk Gauge',
      'Full Audit Report Page with Cookie Inspection & JSON Export',
    ],
    outcomes: [
      { value: '100%', label: 'Local Client-Side Privacy Protection' },
      { value: '140+', label: 'Tracker Domains Blocked & Identified' },
      { value: 'MV3', label: 'Chrome Extension Specification' },
      { value: '0', label: 'Data Sent to External Cloud Servers' },
    ],
    prevSlug: 'nexchain-financial',
    nextSlug: null,
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}
