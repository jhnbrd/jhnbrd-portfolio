export const personal = {
  avatar: '/images/avatar.jpg',      // drop your headshot here: public/images/avatar.jpg
  name: 'Jhianne Berida',
  fullName: 'Jhianne Jose Cañete Berida',
  title: 'Backend Developer',
  subtitle: 'Co-Founder @ DevJunction · Systems & Infrastructure · Davao City, PH',
  tagline: 'Backend Architect · Cloud Systems · Co-Founder @ DevJunction',
  location: 'Davao City, Philippines',
  email: 'dev@jhnbrd.com',
  phone: '(+63) 915 768 0262',
  github: 'github.com/jhnbrd',
  githubUrl: 'https://github.com/jhnbrd',
  linkedin: 'linkedin.com/in/jhianneberida',
  linkedinUrl: 'https://linkedin.com/in/jhianneberida',
  facebook: 'facebook.com/yanjisama',
  facebookUrl: 'https://facebook.com/yanjisama',
  devjunctionUrl: 'https://facebook.com/DevJunctionInc',
  website: 'dev.jhnbrd.com',
  available: true,
  bio: [
    "I am a Backend Developer, Systems Architect, and Co-Founder of DevJunction, specializing in building high-reliability backends, RESTful APIs, and scalable infrastructure.",
    "With strong foundations in enterprise backend engineering (Laravel, .NET 8, FastAPI, Python) and systems administration, I approach software from data propagation down to network ports — ensuring resilience, security, and performance at scale.",
    "Through DevJunction and enterprise solutions, I help clients and businesses turn architectural requirements into production-ready platforms, managing database schemas, secure authentication, and cloud deployment pipelines.",
  ],
  quote: '"Programming isn\'t about what you know; it\'s about what you can figure out."',
  quoteAuthor: 'Chris Pine',
  tags: [
    'DevJunction Co-Founder',
    'Backend Architecture',
    'Laravel · .NET 8 · FastAPI',
    'IT Specialist',
    'Multi-machine Staging',
  ],
}

export const stats = {
  projects: '18+',
  languages: '8',
  stack: '15+',
  machines: '4',
}

export const machines = [
  {
    name: 'Workstation (Primary)',
    specs: 'Ryzen 5 7535HS · 16GB DDR5 · Windows 10 Pro',
    role: 'Primary Development & Build Station',
    status: 'online',
  },
  {
    name: 'Staging Server (Host)',
    specs: 'Intel Core · 8GB RAM · Windows Server/Pro',
    role: 'Local Staging & Reverse Proxy Host',
    status: 'online',
  },
]

export const homelab = {
  isp: 'PLDT HOME Fiber',
  captiveRouter: {
    device: 'Xiaomi Mi Router 4C',
    os: 'OpenWrt + nodogsplash',
    role: 'Captive WiFi Portal Router',
  },
  server: {
    ip: '192.168.1.10',
    hostname: 'lenovo-g70',
    machine: 'Lenovo G70 (Repurposed)',
  },
  localServices: [
    { name: 'JHNBRD Portfolio', port: 8000, runtime: 'Vite / React', status: 'running' },
    { name: 'BrewTracks v7 API', port: 8200, runtime: '.NET 8 Web API', status: 'running' },
    { name: 'BrewTracks v7 React', port: 8201, runtime: 'Vite / React', status: 'running' },
    { name: 'RapidResponse v2', port: 8110, runtime: 'Uvicorn / FastAPI', status: 'running' },
    { name: "Brews n' Blooms WiFi", port: 8080, runtime: 'Laravel / OpenWrt', status: 'running' },
  ],
  tunnels: [
    { subdomain: 'dev.jhnbrd.com', port: 8000 },
    { subdomain: 'rr.jhnbrd.com', port: 8110 },
    { subdomain: 'cafeapi.jhnbrd.com', port: 8200 },
    { subdomain: 'cafe.jhnbrd.com', port: 8201 },
  ],
}

// Featured projects — live first, then in-dev
export const featuredProjects = [
  {
    id: 'serverdeck',
    name: 'ServerDeck',
    subtitle: 'Infrastructure Utility · Dev Dashboard',
    description:
      'Lightweight open-source control panel for managing local dev servers on Windows. Fixed 680×450 dashboard with per-project start/stop, port conflict detection, recursive process tree teardown, and network config via netsh.',
    tags: ['Python', 'CustomTkinter', 'SQLite', 'Windows API', 'psutil'],
    status: 'live',
    year: '2026',
    role: 'Solo Developer',
    github: 'https://github.com/jhnbrd/ServerDeck',
    image: '/images/projects/ServerDeck.png',
  },
  {
    id: 'rapidresponse',
    name: 'RapidResponse',
    subtitle: 'AI Platform · Feedback Triage',
    description:
      "Open-source AI feedback routing system. Automatically assigns star ratings to text reviews via Multinomial Naive Bayes, instantly directing submissions. Features three simulated frontend portals (NexuSphere, Brews n' Blooms, Barangay Ula) demonstrating real-world utility across different business contexts.",
    tags: ['FastAPI', 'React 19', 'scikit-learn', 'Python'],
    status: 'live',
    year: '2026',
    role: 'Solo Developer',
    liveUrl: 'https://rr.jhnbrd.com',
    github: 'https://github.com/jhnbrd/RapidResponse',
    image: '/images/projects/rapidresponse.jpg',
  },
  {
    id: 'captiveportal',
    name: "Brews n' Blooms Captive Portal",
    subtitle: 'Networking · WiFi Auth System',
    description:
      'Custom captive portal for cafes using OpenWrt (nodogsplash) on a Xiaomi Mi Router 4C with a Laravel backend. Voucher-based WiFi auth, MAC address session binding, admin dashboard, and thermal receipt print view.',
    tags: ['Laravel', 'OpenWrt', 'PHP', 'nodogsplash', 'SSH'],
    status: 'live',
    year: '2026',
    role: 'Solo Developer',
    private: true,
    github: 'https://github.com/jhnbrd/CaptivePortalPeter',
    image: '/images/projects/captiveportal.jpg',
  },
  {
    id: 'ipharm',
    name: 'iPharmaMart',
    subtitle: 'Management System · Healthcare',
    description:
      'Comprehensive pharmacy management system built to streamline pharmaceutical inventory tracking, prescription records, and daily administrative workflows with a focus on data integrity.',
    tags: ['PHP', 'MySQL', 'JavaScript'],
    status: 'turned-over',
    year: '2025',
    role: 'Backend Developer',
    github: 'https://github.com/jhnbrd/iPharmaMart-ManagementSystem',
    image: '/images/projects/ipharm.jpg',
  },
  {
    id: 'arduino',
    name: 'Arduino Intruder Alert',
    subtitle: 'Physical Computing · Embedded Systems',
    description:
      'Arduino-driven home security system integrating PIR motion sensors, magnetic door/window triggers, and automated buzzer/relay alert mechanisms using hardware interrupts. Physical hardware build — no hosted repo.',
    tags: ['Arduino', 'C++', 'Embedded', 'Sensors'],
    status: 'academic',
    year: '2025',
    role: 'Developer',
    github: null,
    image: '/images/projects/arduino.jpg',
  },
  {
    id: 'ghost',
    name: 'Operation G.H.O.S.T.',
    subtitle: 'Research Paper · Business Analytics 1',
    description:
      'Unsupervised learning research paper applying K-Means and hierarchical clustering to Geographic, Human, and Operational Sources of Time-delay and cost failures across DPWH flood control projects. Submitted for Business Analytics 1.',
    tags: ['Python', 'scikit-learn', 'K-Means', 'pandas', 'Data Analysis'],
    status: 'academic',
    year: '2025',
    role: 'Lead Researcher',
    github: null,
    type: 'research',
    image: '/images/projects/ghost.jpg',
  },
  {
    id: 'nexusphere',
    name: 'NexuSphere',
    subtitle: 'Event Management SaaS · Capstone',
    description:
      'Data-driven event management ecosystem with live crowd heatmaps, sentiment classification via TensorFlow.js, geospatial attendance verification using PostGIS ray-casting, and a digital credit economy with PayMongo API.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TensorFlow.js', 'PostGIS'],
    status: 'in-dev',
    year: '2026',
    role: 'Chief Technology Officer',
    private: true,
    github: 'https://github.com/jhnbrd/NexuSphere',
    image: '/images/projects/nexusphere.jpg',
  },
  {
    id: 'brewtracks',
    name: 'BrewTracks SaaS',
    subtitle: 'Enterprise SaaS · Café Management',
    description:
      'Multi-tenant café management platform with RBAC, secure RESTful APIs, real-time inventory, point-of-sale transactions, and payroll subsystems built on C# .NET 8 Web APIs.',
    tags: ['C# .NET 8', 'React.js', 'MS SQL Server', 'REST APIs'],
    status: 'in-dev',
    year: '2026',
    role: 'Full-Stack Developer',
    liveUrl: 'https://cafe.jhnbrd.com',
    github: 'https://github.com/jhnbrd/BrewTracks',
    image: '/images/projects/brewtracks.jpg',
  },
]

// All other projects in compact list format
export const otherProjects = [
  { name: 'BMP Car Rental System', period: 'Jan – May 2025', tags: ['PHP', 'MySQL', 'JS'], team: 'Partoza, Magcalas' },
  { name: 'Crisis Mapper', period: 'Oct – Dec 2025', tags: ['Python', 'GIS'] },
  { name: 'Community Management System', period: 'Aug – Oct 2025', tags: ['PHP', 'MySQL'], team: 'Mendoza, Equibal, Baclot' },
  { name: 'Steam Wishlist Simulator', period: 'Jan – Feb 2025', tags: ['JavaScript', 'CSS'] },
  { name: 'LTO eTicket Prototype', period: 'Oct – Dec 2024', tags: ['HTML', 'CSS', 'JS'] },
  { name: 'JL Pisonet Game Menu', period: 'Oct – Nov 2024', tags: ['HTML', 'CSS', 'JS'] },
  { name: 'GradeSort Pro', period: 'Aug – Oct 2024', tags: ['Python', 'Tkinter'], team: 'Partoza, Escurzon' },
  { name: 'Math Dungeons', period: 'Mar – May 2024', tags: ['HTML', 'CSS', 'JS'], description: 'Mathematics Gamification Prototype' },
  { name: 'Stealth Computer Café Game Menu', period: 'Jan – Apr 2024', tags: ['HTML', 'CSS', 'JS'] },
  { name: 'LANHS Lab Login System Prototype', period: 'Mar – Jun 2023', tags: ['HTML', 'CSS', 'JS'] },
  { name: 'C.O.G.M.O. (Research Paper)', period: 'May 2023', tags: ['Research'], description: 'Genetically Modified Onions via Recombinant DNA & Aeroponic System' },
  { name: 'WiFi IoT Evaluation (Research)', period: 'May 2023', tags: ['Research', 'IoT'], description: 'WiFi Connectivity for IoT — LANHS Senior High Teachers' },
]

export const stack = [
  {
    category: 'Backend & APIs',
    level: 'Production / Core',
    items: ['Laravel (PHP)', '.NET 8 / C#', 'FastAPI (Python)', 'Node.js', 'RESTful APIs', 'Microservices'],
  },
  {
    category: 'Databases & Storage',
    level: 'Production / Core',
    items: ['MySQL', 'PostgreSQL', 'MS SQL Server', 'SQLite', 'Database Normalization', 'Redis Caching'],
  },
  {
    category: 'Frontend & Mobile',
    level: 'Proficient',
    items: ['React.js', 'Vite', 'Tailwind CSS', 'Flutter (Dart)', 'JavaScript (ES6+)', 'Blade'],
  },
  {
    category: 'Systems & Infrastructure',
    level: 'Proficient',
    items: ['Windows Server', 'Ubuntu / Linux', 'Cloudflare Tunnels', 'Nginx / Uvicorn', 'Git / GitHub CI'],
  },
  {
    category: 'Networking & Security',
    level: 'Specialized',
    items: ['TCP/IP', 'Subnetting & Routing', 'Cisco IOS', 'OpenWrt (nodogsplash)', 'Port Auditing', 'Firewall Rules'],
  },
  {
    category: 'Hardware & Embedded',
    level: 'Specialized',
    items: ['Arduino', 'C++ Embedded', 'Hardware Interrupts', 'Sensor Integration', 'Relay Controllers'],
  },
]

export const credentials = [
  {
    id: 1,
    name: 'IT Specialist in Networking',
    issuer: 'Certiport / Pearson VUE',
    year: 'Oct 2025',
    icon: 'network',
    description:
      'Industry credential covering network configuration, TCP/IP protocols, subnetting, and network troubleshooting methodologies.',
  },
  {
    id: 2,
    name: 'Microsoft Office Specialist: Word Associate',
    issuer: 'Microsoft',
    year: 'Mar 2025',
    icon: 'file-text',
    description:
      'Certified competency in Microsoft Word document creation, professional formatting, and collaborative workflows (Word 2019).',
  },
  {
    id: 3,
    name: 'IT Specialist in HTML & CSS',
    issuer: 'Certiport / Pearson VUE',
    year: 'May 2025',
    icon: 'code',
    description:
      'Validated expertise in semantic HTML5, CSS3, responsive design, and web accessibility standards.',
  },
  {
    id: 4,
    name: 'IT Specialist in Databases',
    issuer: 'Certiport / Pearson VUE',
    year: 'Apr 2025',
    icon: 'database',
    description:
      'Credential covering relational database design, SQL queries, normalization, and database administration fundamentals.',
  },
  {
    id: 5,
    name: 'Legacy JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    year: 'Jun 2024',
    icon: 'code-2',
    description:
      'Comprehensive JavaScript covering algorithms, data structures, functional programming, and OOP paradigms.',
  },
  {
    id: 6,
    name: 'IT Specialist in Java',
    issuer: 'Certiport / Pearson VUE',
    year: 'Mar 2024',
    icon: 'coffee',
    description:
      'Industry credential validating Java programming, OOP principles, data types, and application development fundamentals.',
  },
  {
    id: 7,
    name: 'CHS NC II — COC 1 (Certificate of Competency)',
    issuer: 'TESDA Philippines',
    year: 'Aug 2023',
    icon: 'cpu',
    description:
      'Completed COC 1 of Computer Hardware Servicing NC II covering hardware assembly, OS installation, and BIOS configuration. Full NC II assessment was not completed due to testing site issues.',
  },
]

export const competitions = [
  { name: 'Arduino Day Mindanao 2026 — Rapid Build Challenge', result: '1st Runner Up', year: 'Mar 2026', highlight: true },
  { name: 'MOS Philippines Championship — Word 2019', result: 'Champion', year: 'Mar 2026', highlight: true },
  { name: 'CodeChum National Programming Challenge S2', result: 'Group Stage', year: 'Nov 2025', highlight: false },
  { name: 'UM Intramurals 2025 — Archimedes Quiz Bee Finals', result: 'Qualified', year: 'Oct 2025', highlight: false },
  { name: 'LISK Pitching Day Davao — Blockchain Pitching', result: 'Participant', year: 'Oct 2025', highlight: false },
  { name: '2023 Division Sci-Tech Expo — Research Competition', result: '4th Placer', year: 'May 2023', highlight: false },
]

export const education = [
  {
    id: 1,
    school: 'University of Mindanao',
    degree: 'BS Information Technology — Business Analytics',
    period: 'Aug 2023 — Expected Mar 2027',
    location: 'Davao City, PH',
    honors: "Dean's Lister",
    courses: [
      'Integrative Programming & Technologies',
      'Database Management Systems',
      'Network Administration',
      'Data Analysis & Quantitative Methods',
    ],
  },
  {
    id: 2,
    school: 'Los Amigos National High School',
    degree: 'TVL — Information & Communications Technology',
    period: '2021 — 2023',
    location: 'Davao City, PH',
    honors: 'With High Honors',
    courses: ['Computer Systems Servicing', 'Web Development', 'LAN Configuration'],
  },
]

export const experience = [
  {
    id: 'devjunction',
    org: 'DevJunction',
    role: 'Co-Founder & Backend Developer',
    period: '2025 — Present',
    type: 'Startup / Agency',
    url: 'https://facebook.com/DevJunctionInc',
    bullets: [
      'Co-founded tech startup delivering custom web platforms, backend systems, and client software solutions.',
      'Lead backend architectural design, API development, database schema modeling, and infrastructure deployments.',
      'Collaborate with founders and clients to transform operational requirements into reliable software deliverables.',
    ],
  },
  {
    id: 1,
    org: 'UM CCE Skills Clinic',
    role: 'Technical Mentor',
    period: 'Oct 2025 — Present',
    type: 'Academic',
    bullets: [
      'Mentor junior IT students in programming, API integration, and web development through hands-on clinics.',
      'Provide architectural code reviews and troubleshooting to reinforce industry-standard practices.',
    ],
  },
  {
    id: 2,
    org: 'ArtikULA Media & Tech Operations',
    role: 'Executive Committee (Infrastructure)',
    period: 'Jun 2024 — Present',
    type: 'Community',
    bullets: [
      'Manage live broadcasting systems, digital infrastructure, and network streaming setups for community events.',
    ],
  },
]
