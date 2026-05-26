export const personal = {
  avatar: '/images/avatar.jpg',      // drop your headshot here: public/images/avatar.jpg
  name: 'Jhianne Berida',
  fullName: 'Jhianne Jose Cañete Berida',
  title: 'Aspiring Backend Developer',
  subtitle: 'Infrastructure-First · Full-Stack · Davao City, PH',
  tagline: 'Network Engineer · Systems Architect · Davao City, PH',
  email: 'dev@jhnbrd.com',
  github: 'github.com/jhnbrd',
  githubUrl: 'https://github.com/jhnbrd',
  linkedin: 'linkedin.com/in/jhianneberida',
  linkedinUrl: 'https://linkedin.com/in/jhianneberida',
  facebook: 'facebook.com/yanjisama',
  facebookUrl: 'https://facebook.com/yanjisama',
  website: 'dev.jhnbrd.com',
  available: true,
  bio: [
    "I'm a 3rd-year Information Technology student specializing in Business Analytics with a strong foundation in full-stack web development, network administration, and hardware integration.",
    "Armed with TESDA COC 1 (Computer Hardware Servicing) and IT Specialist designations, I view applications through the lens of data propagation — I don't launch apps blindly; I audit ports first.",
    "My current stack bridges Laravel, React, .NET 8, Firebase, and Flutter — connecting structured enterprise systems with dynamic, real-time consumer apps. I treat backend development as an orchestration challenge: managing database schemas, REST APIs, and scalable architectures with precision.",
  ],
  quote: '"Programming isn\'t about what you know; it\'s about what you can figure out."',
  quoteAuthor: 'Chris Pine',
  tags: [
    'IT Specialist',
    'TESDA COC 1',
    'Laravel · React · .NET',
    'Arduino · Embedded',
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
    name: 'MSI Thin A15',
    specs: 'Ryzen 5 7535HS · RTX 4050 6GB · 16GB 4800MT/s',
    role: 'Main Gaming Laptop / Dev Machine',
    os: 'Windows 10 Pro',
    status: 'online',
  },
  {
    name: 'Lenovo G70',
    specs: 'Intel i3-5020U · Intel HD · 8GB 1600MHz',
    role: 'Repurposed Home Server',
    os: 'Windows 10 Pro',
    ip: '192.168.1.10',
    status: 'online',
  },
  {
    name: 'Ryzen 3 1200 (Previous PC)',
    specs: 'RX 580 8GB · 16GB 2666MHz',
    role: 'Secondary Dev / Build Machine',
    os: 'ReviOS Windows 10',
    status: 'idle',
  },
  {
    name: 'MacBook Air 2017',
    specs: 'i5-5350U · Intel HD 6000 · 8GB 1600MHz',
    role: 'Cross-platform Testing',
    os: 'Hackintosh Sonoma',
    status: 'idle',
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
    { name: 'JHNBRD Portfolio',     port: 8000, runtime: 'Vite / React',     status: 'running' },
    { name: 'BrewTracks v7 API',    port: 8200, runtime: '.NET 8 Web API',   status: 'running' },
    { name: 'BrewTracks v7 React',  port: 8201, runtime: 'Vite / React',     status: 'running' },
    { name: 'RapidResponse v2',     port: 8110, runtime: 'Uvicorn / FastAPI', status: 'running' },
    { name: "Brews n' Blooms WiFi", port: 8080, runtime: 'Laravel / OpenWrt', status: 'running' },
  ],
  tunnels: [
    { subdomain: 'dev.jhnbrd.com',    port: 8000 },
    { subdomain: 'rr.jhnbrd.com',     port: 8110 },
    { subdomain: 'cafeapi.jhnbrd.com', port: 8200 },
    { subdomain: 'cafe.jhnbrd.com',   port: 8201 },
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
    category: 'Languages',
    items: ['PHP', 'Python', 'JavaScript', 'C#', 'C++', 'Dart', 'Java'],
    proficiency: 88,
  },
  {
    category: 'Frameworks',
    items: ['Laravel', 'React', '.NET 8', 'Flutter', 'Firebase'],
    proficiency: 80,
  },
  {
    category: 'Backend',
    items: ['Node.js', 'REST APIs', 'MySQL', 'PostgreSQL', 'MS SQL', 'SQLite'],
    proficiency: 82,
  },
  {
    category: 'Infrastructure',
    items: ['Windows Server', 'Linux', 'macOS'],
    proficiency: 85,
  },
  {
    category: 'Networking',
    items: ['TCP/IP', 'Subnetting', 'LAN Config', 'Cisco IOS'],
    proficiency: 90,
  },
  {
    category: 'Embedded',
    items: ['Arduino', 'C++ MCU', 'Hw Interrupts', 'Sensors'],
    proficiency: 72,
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
    location: 'Davao City, Davao del Sur',
    honors: "Dean's Lister",
    courses: [
      'Integrative Programming & Technologies',
      'Data Analysis & Quantitative Methods',
      'Database Management Systems',
      'Network Administration',
    ],
  },
  {
    id: 2,
    school: 'Los Amigos National High School',
    degree: 'TVL — Information & Communications Technology',
    period: 'Aug 2021 — Jul 2023',
    location: 'Davao City, Davao del Sur',
    honors: 'With High Honors',
    courses: ['Computer Systems Servicing', 'Web Development', 'LAN Configuration'],
  },
  {
    id: 3,
    school: 'Holy Cross of Mintal, Inc.',
    degree: 'Senior High School — ABM Strand (1 year)',
    period: 'Jul 2020 — Apr 2021',
    location: 'Mintal, Davao City',
    note: 'Shifted to TVL-ICT after 1 year — foundational business & entrepreneurship insights',
    courses: ['Business Mathematics', 'Organization & Management', 'Business Ethics'],
  },
  {
    id: 4,
    school: 'Holy Cross of Mintal, Inc.',
    degree: 'Junior High School (Grade 7–10)',
    period: 'Aug 2016 — Apr 2020',
    location: 'Mintal, Davao City',
    courses: [],
  },
]

export const experience = [
  {
    id: 1,
    org: 'UM CCE Skills Clinic',
    role: 'Mentor',
    period: 'Oct 2025 — Present',
    type: 'Academic',
    bullets: [
      'Mentor junior IT students in programming and web development through hands-on sessions.',
      'Provide code reviews and project troubleshooting to reinforce industry best practices.',
    ],
  },
  {
    id: 2,
    org: 'ArtikULA Barangay Ula Media Team',
    role: 'Executive Committee',
    period: 'Jun 2024 — Present',
    type: 'Community',
    bullets: [
      'Direct live broadcasting setups and technical operations for local community events.',
      'Manage IT infrastructure and digital media assets as a core committee member.',
    ],
  },
  {
    id: 3,
    org: 'Department of Labor and Employment Region XI',
    role: 'Government Intern (Contractual)',
    period: 'Aug 2023 — Dec 2023',
    type: 'Government',
    bullets: [
      'Provided administrative and technical assistance at the Barangay Ula barangay hall.',
      'Supported officials with data encoding, digital records management, and office workflows.',
    ],
  },
  {
    id: 4,
    org: 'TRUMPH Motorcycle Corporation',
    role: 'IT Support Intern',
    period: 'Mar 2023 — May 2023',
    type: 'Industry',
    bullets: [
      'Provided technical assistance resolving hardware, software, and basic network issues.',
      'Assisted in deployment, configuration, and maintenance of local IT infrastructure.',
    ],
  },
]
