<div align="center">

  <img src="public/favicon.ico" alt="Logo" width="72" height="72" />

  # ⚡ dev.jhnbrd.com — Personal Developer Portfolio

  <p align="center">
    <strong>A high-performance, terminal & homelab-inspired developer portfolio and engineering showcase.</strong>
  </p>

  <p align="center">
    <a href="https://dev.jhnbrd.com"><img src="https://img.shields.io/badge/Live%20Demo-dev.jhnbrd.com-38bdf8?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live Site" /></a>
    <a href="https://github.com/jhnbrd/portfolio/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License" /></a>
    <a href="https://github.com/jhnbrd/portfolio/stargazers"><img src="https://img.shields.io/github/stars/jhnbrd/portfolio?style=for-the-badge&color=f59e0b&logo=github" alt="Stars" /></a>
    <a href="https://github.com/jhnbrd/portfolio/network/members"><img src="https://img.shields.io/github/forks/jhnbrd/portfolio?style=for-the-badge&color=818cf8&logo=github" alt="Forks" /></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node" />
    <img src="https://img.shields.io/badge/Status-Active%20Production-22c55e?style=flat-square" alt="Status" />
  </p>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-customization">Customization</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-license">License</a>
  </p>

  ---
</div>

## 🌐 Live Production Site

🔗 **[https://dev.jhnbrd.com](https://dev.jhnbrd.com)**

Engineered by **Jhianne Berida** — Backend Architect, Systems Specialist & Co-Founder at DevJunction.

---

## ✨ Features

- 🖥️ **Interactive Boot Sequence** — Retro terminal BIOS-style boot animation with skip option.
- 📡 **Homelab & Network Overview** — Dynamic machine inventory, reverse proxy topology, and staging monitor.
- 📂 **Featured Projects Showcase** — Interactive modal view, direct live links, repository references, and tech tags.
- 🛠️ **Categorized Tech Matrix** — Organized skills matrix (Backend, Frontend, Databases, DevOps & Cloud, Systems).
- 🏆 **Credentials & Accomplishments** — Certifications, competitions, and formal education highlights.
- 📊 **Dynamic GitHub Activity** — Real-time GitHub stats, language distribution, and commit heatmap integration.
- 📱 **Adaptive Responsive Design** — Split workstation view on desktop with fluid mobile drawer navigation.
- ⌨️ **Terminal Aesthetics** — Curated dark palette (`#0a0c10`), IBM Plex Mono typography, and glowing telemetry indicators.

---

## 🛠️ Tech Stack

| Domain | Technology / Tool | Highlights |
| :--- | :--- | :--- |
| **Core Framework** | React 18 | Functional components, modular hooks, state-driven UI |
| **Build Engine** | Vite 5 | Fast HMR, optimized production rollup bundle |
| **Styling** | Tailwind CSS 3 | Custom terminal theme tokens, responsive layouts, glassmorphism |
| **Icons** | Lucide React | Minimalist crisp iconography |
| **Typography** | IBM Plex Mono | Monospace developer aesthetic |
| **Networking / Host** | Cloudflare Edge / Zero-Trust | Global CDN delivery, WAF & SSL/TLS protection |
| **Telemetry / Sockets** | Node.js (`server.js`) | WebSocket server for telemetry and health status |

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed on your workstation:

- [Node.js](https://nodejs.org/) `>= 18.0.0` (v20+ LTS recommended)
- `npm` (bundled with Node) or `pnpm` / `yarn`
- `git`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jhnbrd/portfolio.git

# 2. Navigate to project root
cd portfolio

# 3. Install dependencies
npm install
```

### Development Server

Start Vite with Hot Module Replacement (HMR):

```bash
npm run dev
```

The development server will launch at:
`http://localhost:5173`

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server |
| `npm run build` | Compiles and optimizes assets into production-ready `/dist` |
| `npm run preview` | Runs a local preview server of the production build (`dist/`) |
| `npm run ws` | Starts the optional telemetry / WebSocket companion service |
| `npm run start` | Builds the frontend bundle and launches the companion server |

---

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── favicon.ico             # Site favicon / branding
│   └── images/
│       ├── avatar.jpg          # Profile headshot
│       ├── og/                 # OpenGraph social share previews (1200x630)
│       └── projects/           # Featured project preview thumbnails (2:1 aspect ratio)
├── src/
│   ├── components/             # Reusable UI sections and modular components
│   │   ├── BootScreen.jsx      # Initial BIOS terminal boot sequence
│   │   ├── HeroSection.jsx     # Terminal prompt, stats, and headline
│   │   ├── AboutSection.jsx    # Bio, education, and credentials
│   │   ├── HomelabSection.jsx  # Machine specs, network topology, and staging nodes
│   │   ├── ProjectsSection.jsx # Grid of featured projects and project details modal
│   │   ├── StackSection.jsx    # Categorized skill pills and proficiency
│   │   ├── GitHubSection.jsx   # Live GitHub stats and telemetry
│   │   └── ContactSection.jsx  # Contact form, socials, and contact endpoints
│   ├── data/
│   │   └── portfolio.js        # Centralized single source of truth for all data
│   ├── hooks/                  # Custom React utility hooks
│   ├── App.jsx                 # Main layout and view orchestration
│   ├── index.css               # Tailwind directives and custom animation classes
│   └── main.jsx                # Application root entry point
├── server.js                   # Companion Node.js telemetry/WebSocket server
├── tailwind.config.js          # Color palette, font definitions, and extensions
├── vite.config.js              # Vite bundler plugins and server options
├── LICENSE                     # MIT License
└── package.json                # Project dependencies and script declarations
```

---

## ⚙️ Customization Guide

All portfolio content is decoupled from layout components and centralized in one file:

👉 **[`src/data/portfolio.js`](src/data/portfolio.js)**

### Updating Content

Modify any exported constant to re-render site information:

- `personal` — Name, job titles, social profiles, email, and bio description
- `stats` — Quick telemetry counter metrics (projects, languages, machines)
- `machines` — Homelab inventory, physical hardware specs, and OS details
- `homelab` — Network architecture, security rules, and active staging endpoints
- `featuredProjects` — Titles, descriptions, live demo links, repository URLs, and tags
- `stack` — Tech stack categorized by domain (Backend, Frontend, DBs, Cloud, etc.)
- `credentials` — Certifications, competition achievements, and education history

### Asset Specifications

| Asset | Location | Recommended Specs |
| :--- | :--- | :--- |
| **Favicon** | `public/favicon.ico` | Multi-size ICO (16x16, 32x32, 48x48) |
| **Profile Photo** | `public/images/avatar.jpg` | 1:1 Aspect ratio, min `500x500px` |
| **OG Image** | `public/images/og/og-card.jpg` | `1200x630px` (High-res social share) |
| **Project Thumbnails** | `public/images/projects/*` | `1200x600px` (2:1 landscape, centered) |

### Theme Colors

Customize the UI palette in `tailwind.config.js`:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      background: '#0a0c10', // Deep terminal background
      surface:    '#0e1118', // Card and container surface
      border:     '#1e2330', // Subtle cybernetic border
      primary:    '#38bdf8', // Accent cyan / telemetry blue
      foreground: '#e8eaf0', // High-contrast text
    }
  }
}
```

---

## 🚢 Deployment

### Static Hosting (Cloudflare Pages, Vercel, Netlify)

This project compiles to a pure, static Single Page Application (SPA).

1. Build the production files:
   ```bash
   npm run build
   ```
2. Set your deployment configuration:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Node Version:** `>= 18`

### Custom Subdomain / Reverse Proxy (e.g. `dev.jhnbrd.com`)

When deploying behind NGINX, Caddy, or Cloudflare Tunnels:
- Serve `/dist` as the web root.
- Ensure fallback routing points to `index.html` for client-side navigation.

---

## 👤 Author

**Jhianne Jose Berida**  
*Backend Architect · Cloud & Systems Specialist · Co-Founder @ DevJunction*

- 🌐 **Portfolio:** [dev.jhnbrd.com](https://dev.jhnbrd.com)
- 🐙 **GitHub:** [@jhnbrd](https://github.com/jhnbrd)
- 💼 **LinkedIn:** [jhianneberida](https://linkedin.com/in/jhianneberida)
- ✉️ **Email:** [dev@jhnbrd.com](mailto:dev@jhnbrd.com) / [jhiannejoseberida@gmail.com](mailto:jhiannejoseberida@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
