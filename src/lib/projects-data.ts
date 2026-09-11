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
    slug: 'altalk-platform',
    title: 'AlTalk Platform',
    titleLine1: 'AlTalk',
    titleLine2: 'Platform.',
    heroImage: '/img-01.png',
    categories: ['Web Design', 'SaaS Platform'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2026',
    role: 'Full-Stack Developer',
    client: 'AlTalk Inc.',
    duration: '3 months',
    brief:
      'A next-generation AI-powered communication platform that needed a robust, scalable web interface capable of handling real-time conversations, user management, and seamless integrations across multiple channels.',
    stats: [
      { value: '12K+', label: 'Active users on the platform at launch' },
      { value: '3', label: 'Integration channels — web, mobile, API' },
      { value: '<200ms', label: 'Average API response time under load' },
      { value: '99.9%', label: 'Uptime since deployment' },
    ],
    problem:
      'The client needed a unified communication hub but was running fragmented tools — separate apps for messaging, scheduling, and analytics. The experience was disjointed, data was siloed, and onboarding new team members took days instead of minutes.',
    solution:
      'A single-platform approach: one codebase powering real-time messaging, scheduling, and analytics dashboards. Built with Next.js for the frontend and Node.js microservices on the backend, with WebSocket connections for instant message delivery and PostgreSQL for transactional integrity.',
    techStack: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Prisma ORM',
      'WebSocket',
      'Redis',
      'Tailwind CSS',
      'Vercel',
    ],
    sections: [
      {
        number: '01',
        label: 'Real-time messaging engine',
        title: 'Conversations that never miss a beat',
        description: [
          'The messaging layer uses WebSocket connections with automatic reconnection and message queueing. When a user sends a message, it hits the server, gets persisted to PostgreSQL, and fans out to all connected participants — all in under 50ms.',
          'Offline messages queue locally and sync on reconnect, so no conversation context is ever lost even on unreliable networks.',
        ],
        image: '/img-01.png',
      },
      {
        number: '02',
        label: 'Dashboard & analytics',
        title: 'Data that tells the story teams need',
        description: [
          'The analytics dashboard aggregates conversation metrics, response times, and user engagement into interactive charts built with Recharts. Managers see team performance at a glance — no spreadsheets required.',
          'Every metric is computed server-side and cached in Redis with a 5-minute TTL, keeping dashboard loads instant even as data volumes grow.',
        ],
        image: '/img-01.png',
      },
      {
        number: '03',
        label: 'User management & onboarding',
        title: 'From sign-up to productive in under two minutes',
        description: [
          'A guided onboarding flow walks new users through workspace setup, channel creation, and integration configuration. Role-based access control ensures team members see exactly what they need — nothing more, nothing less.',
          'Admins manage seats, permissions, and billing from a single settings panel with real-time updates reflected across all connected sessions.',
        ],
        image: '/img-01.png',
      },
    ],
    deliverables: [
      'Real-time messaging engine with WebSocket + offline sync',
      'Analytics dashboard with server-computed metrics and Redis caching',
      'Role-based user management with guided onboarding flow',
      'Multi-channel integration system (API, webhook, embedded widget)',
      'Stripe billing integration with seat-based pricing',
      'Comprehensive API documentation with OpenAPI spec',
    ],
    outcomes: [
      { value: '< 50ms', label: 'Message delivery latency' },
      { value: '2 min', label: 'Average onboarding time' },
      { value: '12K+', label: 'Active users at launch' },
      { value: '99.9%', label: 'Platform uptime' },
    ],
    prevSlug: null,
    nextSlug: 'finchat-terminal',
  },
  {
    slug: 'finchat-terminal',
    title: 'FinChat Terminal',
    titleLine1: 'FinChat',
    titleLine2: 'Terminal.',
    heroImage: '/img-02.png',
    categories: ['Web Design', 'FinTech'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2025',
    role: 'Full-Stack Developer',
    client: 'FinChat',
    duration: '4 months',
    brief:
      'A Bloomberg-inspired financial data terminal for retail investors — real-time market feeds, portfolio tracking, and AI-powered research summaries in a single keyboard-driven interface.',
    stats: [
      { value: '50+', label: 'Data sources aggregated in real-time' },
      { value: '<1s', label: 'Time to first meaningful paint' },
      { value: '8', label: 'Keyboard shortcuts for power users' },
      { value: '∞', label: 'Watchlists — no arbitrary limits' },
    ],
    problem:
      'Retail investors were switching between 5-6 tabs — news feeds, stock screeners, portfolio trackers, and chat forums — losing context with every alt-tab. Professional terminals like Bloomberg cost $24K/year. There was no middle ground.',
    solution:
      'A single-pane terminal interface that aggregates real-time market data, news, portfolio analytics, and AI-generated research briefs. Designed for keyboard-first navigation so power users never touch the mouse, with a command palette inspired by VS Code.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Redis',
      'WebSocket',
      'TradingView Widget',
      'OpenAI API',
      'Tailwind CSS',
    ],
    sections: [
      {
        number: '01',
        label: 'Terminal-grade data density',
        title: 'Every pixel earns its place',
        description: [
          'The layout borrows from Bloomberg\'s information density philosophy: resizable panels, tabbed workspaces, and a fixed ticker bar that scrolls live prices. Color coding follows financial conventions — green for gains, red for losses, amber for alerts.',
          'Data streams through WebSocket connections with graceful degradation to Server-Sent Events when WebSocket connections are blocked by corporate firewalls.',
        ],
        image: '/img-02.png',
      },
      {
        number: '02',
        label: 'AI-powered research briefs',
        title: 'Read the market in 30 seconds, not 30 minutes',
        description: [
          'The AI research engine ingests earnings calls, SEC filings, and news articles, then generates concise briefs with key metrics highlighted. Users can drill down into source documents or ask follow-up questions in a chat interface.',
          'Summaries are generated via OpenAI\'s API with custom prompts tuned for financial accuracy, and cached aggressively so the same report isn\'t regenerated for every viewer.',
        ],
        image: '/img-02.png',
      },
      {
        number: '03',
        label: 'Command palette & keyboard navigation',
        title: 'The mouse is optional',
        description: [
          'A VS Code-style command palette (Cmd+K) lets users search tickers, switch workspaces, toggle panels, and execute trades without ever reaching for the mouse. Every action has a keyboard shortcut displayed in the palette.',
          'Navigation state persists across sessions — reopen the terminal and you\'re exactly where you left off, down to panel sizes and active tabs.',
        ],
        image: '/img-02.png',
      },
    ],
    deliverables: [
      'Real-time market data terminal with resizable panel layout',
      'AI research brief generator with source attribution',
      'Command palette with full keyboard navigation system',
      'Portfolio tracker with performance analytics and alerts',
      'Multi-workspace system with session persistence',
      'Mobile companion app (read-only watchlist + alerts)',
    ],
    outcomes: [
      { value: '< 1s', label: 'Time to first paint' },
      { value: '50+', label: 'Data sources aggregated' },
      { value: '30s', label: 'Average research brief read' },
      { value: '87%', label: 'Daily active retention' },
    ],
    prevSlug: 'altalk-platform',
    nextSlug: 'nexchain-financial',
  },
  {
    slug: 'nexchain-financial',
    title: 'NexChain Financial',
    titleLine1: 'NexChain',
    titleLine2: 'Financial.',
    heroImage: '/img-03.png',
    categories: ['Web Design', 'Blockchain'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2025',
    role: 'Full-Stack Developer',
    client: 'NexChain',
    duration: '5 months',
    brief:
      'A decentralized finance dashboard that bridges traditional banking interfaces with blockchain transparency — portfolio management, transaction history, and smart contract interactions in a UI that non-crypto-native users can actually understand.',
    stats: [
      { value: '6', label: 'Blockchain networks supported' },
      { value: '$2M+', label: 'Total value tracked at peak' },
      { value: '0', label: 'Smart contract vulnerabilities found in audit' },
      { value: '< 3s', label: 'Average transaction confirmation display' },
    ],
    problem:
      'DeFi dashboards were built by developers for developers — raw hex addresses, gas prices in gwei, and transaction hashes that meant nothing to the average user. The client wanted to bring DeFi to people who use banking apps, not block explorers.',
    solution:
      'A banking-grade interface layer over blockchain infrastructure. Wallets show balances in local currency, transactions display as human-readable summaries ("Sent $500 to Alice"), and smart contract interactions are wrapped in guided flows with plain-English confirmations.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma ORM',
      'ethers.js',
      'Web3Modal',
      'Chart.js',
      'Tailwind CSS',
    ],
    sections: [
      {
        number: '01',
        label: 'Human-readable blockchain',
        title: 'Making the invisible ledger visible',
        description: [
          'Every on-chain event is translated into plain language: "Received 0.5 ETH from 0x7a3…" becomes "Received $1,247.50 from Alex M." by cross-referencing the address book and real-time price feeds. Users see their finances, not the plumbing.',
          'The translation layer runs on the server, indexing events from 6 chains into a unified PostgreSQL schema. The client never needs to know which chain a transaction lives on.',
        ],
        image: '/img-03.png',
      },
      {
        number: '02',
        label: 'Multi-chain portfolio view',
        title: 'Six chains, one balance sheet',
        description: [
          'The portfolio view aggregates holdings across Ethereum, Polygon, Arbitrum, Optimism, Base, and Avalanche into a single net-worth chart. Asset allocation, historical performance, and yield farming returns are all computed server-side and presented as familiar banking metrics.',
          'Price feeds update every 15 seconds via WebSocket, and historical data is cached in Redis for instant chart rendering on page load.',
        ],
        image: '/img-03.png',
      },
      {
        number: '03',
        label: 'Guided smart contract flows',
        title: 'Sign with confidence, not confusion',
        description: [
          'Every smart contract interaction — swaps, staking, bridging — is wrapped in a step-by-step wizard that explains what\'s happening in plain English. Gas estimates show actual dollar costs. Risk levels are color-coded. Confirmation screens show exactly what will change.',
          'The system simulates transactions before submission using eth_call, so users see the expected outcome before signing anything.',
        ],
        image: '/img-03.png',
      },
    ],
    deliverables: [
      'Multi-chain portfolio dashboard with unified net-worth tracking',
      'Human-readable transaction history with address book integration',
      'Guided smart contract interaction wizards with simulation preview',
      'Real-time price feeds with 15-second WebSocket updates',
      'Fiat on/off-ramp integration via third-party provider',
      'Security audit report with zero critical findings',
    ],
    outcomes: [
      { value: '0', label: 'Vulnerabilities in audit' },
      { value: '6', label: 'Chains supported' },
      { value: '$2M+', label: 'Peak value tracked' },
      { value: '< 3s', label: 'Tx confirmation display' },
    ],
    prevSlug: 'finchat-terminal',
    nextSlug: 'onoma-comfort',
  },
  {
    slug: 'onoma-comfort',
    title: 'ONOMA Comfort',
    titleLine1: 'ONOMA',
    titleLine2: 'Comfort.',
    heroImage: '/img-04.png',
    categories: ['Web Design', 'E-commerce'],
    liveUrl: '#',
    githubUrl: '#',
    year: '2025',
    role: 'Full-Stack Developer',
    client: 'ONOMA',
    duration: '3 months',
    brief:
      'A premium e-commerce platform for a boutique furniture brand — product showcases with cinematic imagery, a frictionless checkout flow, and an inventory system that keeps the warehouse and the website perfectly in sync.',
    stats: [
      { value: '140+', label: 'Products catalogued with rich media' },
      { value: '2.4s', label: 'Average page load with image optimization' },
      { value: '1', label: 'Checkout flow — no multi-page cart' },
      { value: '0', label: 'Oversells since launch — inventory stays truthful' },
    ],
    problem:
      'The brand was selling through Instagram DMs and a basic Shopify store that didn\'t reflect the premium quality of their products. Product photography existed but was buried in social feeds. The checkout was generic and the inventory was managed in a spreadsheet.',
    solution:
      'A bespoke e-commerce platform with a gallery-first product experience: full-bleed imagery, 360° product views, and a single-page checkout that cuts abandoned carts. The backend syncs inventory in real-time between the warehouse management system and the storefront.',
    techStack: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Prisma ORM',
      'Stripe',
      'Cloudinary',
      'Resend',
      'Tailwind CSS',
    ],
    sections: [
      {
        number: '01',
        label: 'Gallery-first product experience',
        title: 'Products that sell themselves through imagery',
        description: [
          'Every product page opens with a cinematic full-bleed hero image. A horizontal scroll gallery shows the piece from every angle, with a 360° interactive view for flagship items. Dimensions, materials, and care instructions live in expandable panels below.',
          'Images are served through Cloudinary with automatic format selection (AVIF → WebP → JPEG) and responsive sizing, keeping the visual fidelity high without bloating page loads.',
        ],
        image: '/img-04.png',
      },
      {
        number: '02',
        label: 'Single-page checkout',
        title: 'From cart to confirmation without friction',
        description: [
          'The checkout is a single scrollable page — shipping address, delivery method, and payment in one flow. Stripe Elements handles card input with real-time validation. Address autocomplete reduces keystrokes by 60%.',
          'Guest checkout is the default — no forced account creation. Order confirmation emails go out within 5 seconds via Resend, with a branded template matching the storefront design.',
        ],
        image: '/img-04.png',
      },
      {
        number: '03',
        label: 'Real-time inventory sync',
        title: 'The website knows what the warehouse knows',
        description: [
          'Inventory levels sync bidirectionally between the warehouse system and the storefront via webhook events. When a unit ships, the count drops. When a return is processed, it increments. The website never shows "in stock" for something that isn\'t.',
          'Low-stock warnings trigger automatically at configurable thresholds, and out-of-stock products shift to a "notify me" mode rather than disappearing from the catalog.',
        ],
        image: '/img-04.png',
      },
    ],
    deliverables: [
      'Gallery-first product pages with Cloudinary-optimized imagery',
      'Single-page checkout with Stripe Elements and guest checkout',
      'Real-time inventory sync with webhook-based warehouse integration',
      'Order management dashboard for the operations team',
      'Transactional email system with branded templates via Resend',
      'SEO-optimized category and collection pages with structured data',
    ],
    outcomes: [
      { value: '0', label: 'Oversells since launch' },
      { value: '2.4s', label: 'Average page load' },
      { value: '140+', label: 'Products catalogued' },
      { value: '< 5s', label: 'Order confirmation email' },
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
