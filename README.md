<div align="center">

  <img src="public/favicon.ico" alt="Logo" width="72" height="72" />

  # ⚡ dev.jhnbrd.com — Personal Developer Portfolio

  <p align="center">
    <strong>A high-impact, interaction-first editorial developer portfolio and backend engineering showcase inspired by the architecture and UI/UX psychology of bencodes.de.</strong>
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

Engineered by **Jhianne Jose Berida** — Backend Architect, Systems Specialist & Co-Founder at DevJunction.

---

## 🎨 Design Philosophy & UI/UX Psychology

This portfolio departs from generic developer templates and dense card grids in favor of **progressive disclosure, typographic authority, and intentional negative space** inspired by `bencodes.de`:

- **Hick’s Law & Cognitive Load:** The primary portfolio canvas is uncluttered. Projects are presented as a clean numbered index with zero visual noise until interacted with.
- **Curiosity & Hover Loop:** Hovering over any project row dynamically summons a floating preview card with the project's visual artifact.
- **Von Restorff (Isolation) Effect:** High-contrast focal anchors (luminous mint accents on void black `#070707`, crisp editorial white `#ffffff`, and bold CTA conversion pills) intuitively guide visitor attention.
- **Fitts’s Law & Context Preservation:** Deep architectural case studies open in a focused drawer/modal rather than forcing full page navigation, preserving the user’s scroll position and mental state.

---

## ✨ Features

- 🌑 **Void Black Hero Canvas (`#070707`)** — Delicate wireframe architectural grid lines (`.bg-grid-void`), large display typography, and a single mint accent token (`#34d399`).
- 📄 **Pure Editorial White Body (`#ffffff`)** — Extreme whitespace, hairline dividers (`#e5e7eb`), and a two-column manifesto layout.
- 🎯 **Interactive Project Hover List** — Monospace index numbers (`01`, `02`), large typography titles, disciplinary tags, and an animated floating cursor-following preview card.
- 🗂️ **Architectural Case Study Drawer** — Obsidian modal featuring a two-column technical breakdown (Problem & Outcome narrative on the left, explicitly separated **Backend/Infrastructure** vs. **Client/Interface** stack on the right, and framed UI screenshot on the bottom).
- 📡 **Native Low-Noise Telemetry & Freedom Wall** — Ambient header status badges (availability ping, profile views counter) and an on-demand modal connected to a native Node.js RFC 6455 WebSocket server.
- 🌸 **Ambient Pastel Footer** — Soft ambient glow gradient (`.bg-ambient-pastel`) paired with high-contrast conversion pill buttons.

---

## 🛠️ Tech Stack

| Domain | Technology / Tool | Architectural Role |
| :--- | :--- | :--- |
| **Core Framework** | React 18.3 | Component composition, custom hooks, and dynamic modal state |
| **Build Tooling** | Vite 5.4 | Ultra-fast HMR and optimized production build |
| **Styling Engine** | Tailwind CSS 3.4 | Custom editorial color tokens (`void`, `editorial`, `hairline`, `accent-neon`), fine-tuned typography |
| **Typography** | Plus Jakarta Sans & Inter | Geometric display headings, with IBM Plex Mono strictly for indices and telemetry |
| **Icons** | Lucide React | Minimalist line iconography |
| **Telemetry Backend** | Node.js (`server.js`) | Native RFC 6455 WebSocket server, atomic view count persistence (`stats.json`), and latency telemetry |
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

Launches Vite with Hot Module Replacement at: `http://localhost:5173`

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server |
| `npm run build` | Compiles and optimizes assets into production-ready `/dist` |
| `npm run preview` | Runs local preview of the production build (`dist/`) |
| `npm run ws` | Starts the native WebSocket companion telemetry service |
| `npm run start` | Builds production bundle and starts companion server |

---

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── favicon.ico                   # Brand icon
│   └── images/
│       ├── avatar.jpg                # Profile headshot
│       ├── og/                       # OpenGraph social share previews
│       └── projects/                 # Featured project preview assets
├── src/
│   ├── components/
│   │   ├── EditorialHeader.jsx       # Minimalist nav bar with status indicator & telemetry
│   │   ├── EditorialHero.jsx         # Void black hero, wireframe grid, display typography
│   │   ├── EditorialBio.jsx          # Manifesto statement, two-column split, homelab mesh
│   │   ├── EditorialProjectsList.jsx # Interactive hover-list with floating preview card
│   │   ├── EditorialProjectDrawer.jsx# Detailed case study drawer with separated stack
│   │   ├── EditorialFooter.jsx       # Ambient pastel footer with high-contrast conversion CTA
│   │   ├── MinimalistFreedomWallModal.jsx # Live WebSocket ephemeral chat modal
│   │   └── ProfileViewsCounter.jsx   # Atomic profile view counter badge
│   ├── data/
│   │   └── portfolio.js              # Central source of truth for all content
│   ├── App.jsx                       # Main application layout orchestrator
│   ├── index.css                     # Editorial styling, void grid & ambient pastel gradient
│   └── main.jsx                      # React application mount point
├── _old_portfolio/                   # Archived previous terminal components (gitignored)
├── server.js                         # Native Node.js WebSocket & telemetry server
├── tailwind.config.js                # Custom editorial color tokens & fonts
├── vite.config.js                    # Vite configuration
├── LICENSE                           # MIT License
└── package.json                      # Dependencies and scripts
```

---

## ⚙️ Customization Guide

All portfolio content is decoupled from layout components and centralized in one file:

👉 **[`src/data/portfolio.js`](src/data/portfolio.js)**

- `personal` — Name, roles, social links, and bio text.
- `featuredProjects` — Project title, subtitle/category, problem & outcome description, tech tags, and screenshots.
- `homelab` & `machines` — Multi-machine staging mesh, hardware specs, and network setup.
- `stats` — Telemetry metrics displayed in the hero section.

---

## 👤 Author

**Jhianne Jose Berida**  
*Backend Architect · Systems Specialist · Co-Founder @ DevJunction*

- 🌐 **Portfolio:** [dev.jhnbrd.com](https://dev.jhnbrd.com)
- 🐙 **GitHub:** [@jhnbrd](https://github.com/jhnbrd)
- 💼 **LinkedIn:** [jhianneberida](https://linkedin.com/in/jhianneberida)
- ✉️ **Email:** [dev@jhnbrd.com](mailto:dev@jhnbrd.com) / [jhiannejoseberida@gmail.com](mailto:jhiannejoseberida@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
