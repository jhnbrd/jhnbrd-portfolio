<div align="center">

  <img src="public/favicon.svg" alt="jb Logo" width="76" height="76" />

  # ⚡ dev.jhnbrd.com — Personal Developer Portfolio

  <p align="center">
    <strong>A high-impact, interaction-first editorial developer portfolio and backend engineering showcase inspired by modern typography, physics-based cursor interactions, and progressive disclosure UI/UX psychology.</strong>
  </p>

  <p align="center">
    <a href="https://dev.jhnbrd.com"><img src="https://img.shields.io/badge/Live%20Site-dev.jhnbrd.com-22c55e?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live Site" /></a>
    <a href="https://github.com/jhnbrd/portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-black?style=for-the-badge" alt="License" /></a>
    <a href="https://github.com/jhnbrd/portfolio/stargazers"><img src="https://img.shields.io/github/stars/jhnbrd/portfolio?style=for-the-badge&color=f59e0b&logo=github" alt="Stars" /></a>
    <a href="https://github.com/jhnbrd/portfolio/network/members"><img src="https://img.shields.io/github/forks/jhnbrd/portfolio?style=for-the-badge&color=818cf8&logo=github" alt="Forks" /></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-13.2-black?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Architecture-Editorial_Minimalism-111113?style=flat-square" alt="Style" />
    <img src="https://img.shields.io/badge/Status-Active%20Production-22c55e?style=flat-square" alt="Status" />
  </p>

  <p align="center">
    <a href="#-design-philosophy--uiux-psychology">Design Philosophy</a> •
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-customization">Customization</a> •
    <a href="#-license">License</a>
  </p>

  ---
</div>

## 🌐 Live Production Site

🔗 **[https://dev.jhnbrd.com](https://dev.jhnbrd.com)**

Engineered by **Jhianne Jose Berida** — Backend Developer & Systems Architect from Davao City, Philippines.

---

## 🎨 Design Philosophy & UI/UX Psychology

This portfolio departs from generic developer templates and dense card grids in favor of **progressive disclosure, typographic authority, and intentional negative space**:

- **Hick’s Law & Cognitive Load:** The primary canvas is clean and uncluttered. Projects are presented as a minimal numbered index with zero visual noise until interacted with.
- **Curiosity & Hover Loop:** Hovering over any project row dynamically summons a floating preview card with the project's visual artifact.
- **Magnetic Proximity:** Project titles slightly pull toward cursor coordinates using spring physics, providing a tactile, organic interaction.
- **Von Restorff (Isolation) Effect:** High-contrast focal anchors (neon accents on pitch black `#050505`, crisp editorial white `#ffffff`, and bold CTA conversion pills) intuitively guide visitor attention.
- **Fitts’s Law & Context Preservation:** Deep architectural case studies open in a focused drawer/modal rather than forcing full page navigation, preserving the user’s scroll position and mental state.

---

## ✨ Features

- 🌑 **Binary Shard Cloud Hero (`#050505`)** — Monospace code glyphs and binary shards with real-time cursor repulsion physics and organic spring restoration.
- 🌓 **Sleek Dark / Light Mode** — Fully themed with fluid color transitions, persistent via `localStorage`, and toggled from the top navigation bar.
- 📜 **Centered Viewport-Triggered Reveals** — Calibrated scroll triggers with 1.8s relaxed transitions that only animate once a section reaches the central focal zone of the screen.
- 💡 **Personalized Editorial Bio** — Authentic engineering manifesto, a single high-impact narrative paragraph, and dynamic age calculation derived from an epoch timestamp.
- 🚀 **DevJunction Startup Spotlight** — Official brand showcase featuring the `/images/devjunction.png` logo, interactive competency cards, and direct Facebook CTA.
- 🎯 **Magnetic Project List with Smart Delay** — Numbered project index with half-second (500ms) hover delay on initial entry and instant switching across active rows.
- 🗂️ **Architectural Case Study Drawer** — Two-column technical spec breakdown (Problem/Outcome narrative on the left, separated Frontend & Backend stack on the right, high-res UI preview).
- 💬 **Cute Floating Freedom Wall Button** — Discreet bottom-right floating pill that pops into view only on reaching the final section, connected to an ephemeral RFC 6455 WebSocket chat server.
- 📬 **True Bottom-Pinned Footer** — Centered collaboration invitation with paired pill buttons (**Email**, **LinkedIn**, **Facebook Messenger**) and pinned bottom copyright bar.

---

## 🛠️ Tech Stack

| Domain | Technology / Tool | Architectural Role |
| :--- | :--- | :--- |
| **Core Framework** | React 18.3 | Component composition, custom hooks, and dynamic modal state |
| **Build Tooling** | Vite 5.4 | Ultra-fast HMR and optimized production build |
| **Animation Engine** | Framer Motion 13.2 | Spring physics, magnetic hover, and viewport scroll reveals |
| **Styling Engine** | Tailwind CSS 3.4 | Custom editorial color tokens, dark mode classes, fine-tuned typography |
| **Typography** | Inter & IBM Plex Mono | Geometric display headings with monospace accents for code shards |
| **Icons** | Lucide React | Minimalist line iconography |
| **Telemetry Backend** | Node.js (`server.js`) | Native RFC 6455 WebSocket server, atomic view count persistence (`stats.json`) |
| **Edge Infrastructure** | Cloudflare Edge | Zero-Trust WAF, SSL/TLS, and global CDN delivery |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 18.0.0` (v20+ LTS recommended)
- `npm` (or `pnpm` / `yarn`)
- `git`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jhnbrd/portfolio.git

# 2. Enter project directory
cd portfolio

# 3. Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Launches Vite with Hot Module Replacement at: `http://localhost:8000`

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server on port 8000 |
| `npm run build` | Compiles and optimizes assets into production-ready `/dist` |
| `npm run preview` | Runs local preview of the production build (`dist/`) |
| `npm run ws` | Starts the native WebSocket companion telemetry service |
| `npm run start` | Builds production bundle and starts companion server |

---

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── favicon.svg                   # Official jb brand SVG icon
│   └── images/
│       ├── avatar.jpg                # Profile headshot
│       ├── devjunction.png           # Official DevJunction brand logo
│       ├── og/                       # OpenGraph social share previews
│       └── projects/                 # Featured project preview assets
├── src/
│   ├── components/
│   │   ├── EditorialHeader.jsx       # Fixed header with jb mark, dark mode toggle, & drawer
│   │   ├── EditorialHero.jsx         # Hero section with binary shard physics repulsion cloud
│   │   ├── EditorialBio.jsx          # Manifesto, single-paragraph bio, & dynamic age
│   │   ├── DevJunctionSection.jsx    # DevJunction spotlight with interactive competency cards
│   │   ├── EditorialProjectsList.jsx # Magnetic hover project list with 500ms preview delay
│   │   ├── EditorialProjectDrawer.jsx# Detailed case study drawer with separated tech stack
│   │   ├── EditorialFooter.jsx       # Bottom-pinned footer with Email, LinkedIn, & Messenger
│   │   ├── FloatingFreedomWallButton.jsx # Cute floating button active only on last section
│   │   └── MinimalistFreedomWallModal.jsx # 100% human-only live WebSocket chat modal
│   ├── data/
│   │   └── portfolio.js              # Central source of truth for all content & projects
│   ├── hooks/
│   │   └── useTheme.jsx              # Dark/light mode theme provider & localStorage hook
│   ├── App.jsx                       # Main application layout orchestrator
│   ├── index.css                     # Editorial typography, scrollbar, & animation keyframes
│   └── main.jsx                      # React application mount point
├── server.js                         # Native Node.js WebSocket & telemetry server
├── tailwind.config.js                # Tailwind configuration
├── vite.config.js                    # Vite configuration
├── LICENSE                           # MIT License
└── package.json                      # Dependencies and scripts
```

---

## ⚙️ Customization Guide

All portfolio content is decoupled from layout components and centralized in one file:

👉 **[`src/data/portfolio.js`](src/data/portfolio.js)**

- `personal` — Name, roles, location, social links, and contact information.
- `featuredProjects` — Project title, subtitle/category, problem & outcome description, tech tags, and screenshots.
- `experience` — Professional roles, timelines, and competencies.
- `stats` — Telemetry metrics displayed across the site.

---

## 👤 Author

**Jhianne Jose Berida**  
*Backend Developer & Systems Architect*

- 🌐 **Portfolio:** [dev.jhnbrd.com](https://dev.jhnbrd.com)
- 🐙 **GitHub:** [@jhnbrd](https://github.com/jhnbrd)
- 💼 **LinkedIn:** [jhianneberida](https://linkedin.com/in/jhianneberida)
- ✉️ **Email:** [dev@jhnbrd.com](mailto:dev@jhnbrd.com) / [jhiannejoseberida@gmail.com](mailto:jhiannejoseberida@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
