# jhnbrd-portfolio

Personal developer portfolio for [dev.jhnbrd.com](https://dev.jhnbrd.com) — a terminal-themed site showcasing projects, stack, credentials, and GitHub activity.

Built with **React**, **Vite**, and **Tailwind CSS**, with a homelab-inspired dark UI, boot screen intro, and scroll-snap section navigation.

---

## Live site

**https://dev.jhnbrd.com**

---

## Features

- **Boot screen** — animated terminal-style loading sequence on first visit
- **Hero** — network topology background with terminal prompt and section navigation
- **About** — bio, education, experience, homelab setup, and machine inventory
- **Projects** — featured project cards with thumbnails, status badges, and compact project list
- **Stack** — skills grouped by category with proficiency indicators
- **Credentials** — certifications and competition highlights
- **GitHub** — themed GitHub stats, top languages, and contribution graph
- **Contact** — reach-out form and social links
- **Responsive layout** — fixed sidebar on desktop, sticky mobile nav, scroll-snap sections

---

## Tech stack

| Layer | Tools |
|---|---|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3, custom CSS components |
| Icons | Lucide React |
| Font | IBM Plex Mono |
| Data | Static content in `src/data/portfolio.js` |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm

### Install

```bash
git clone https://github.com/jhnbrd/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (default: `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

The build output is written to `dist/`.

---

## Project structure

```
portfolio/
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── avatar.jpg              # Profile photo
│       ├── og/og-card.jpg          # Social preview (1200×630, optional)
│       └── projects/               # Project thumbnails (1200×600 recommended)
├── src/
│   ├── components/                 # UI sections and shared components
│   ├── data/
│   │   └── portfolio.js            # All portfolio content lives here
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Tailwind + custom component styles
├── ui-prot/                        # Static HTML design prototype (reference)
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

## Customization

Most content is driven from a single data file:

**`src/data/portfolio.js`**

Update exports such as `personal`, `featuredProjects`, `stack`, `credentials`, `education`, `experience`, and `homelab` to change site content without touching component logic.

### Assets

| Asset | Path | Recommended size |
|---|---|---|
| Favicon | `public/favicon.ico` | 32×32 / multi-size `.ico` |
| Avatar | `public/images/avatar.jpg` | Square, ≥400×400 |
| OG card | `public/images/og/og-card.jpg` | 1200×630 |
| Project thumbnails | `public/images/projects/*` | 1200×600 (2:1 landscape) |

Project cards render thumbnails at a fixed **160px height** with `object-cover`, so keep important content centered in landscape images.

### GitHub section

Update the username constant in `src/components/GitHubSection.jsx` if forking this repo:

```js
const USERNAME = 'jhnbrd'
```

### Theme colors

Palette tokens are defined in `tailwind.config.js`:

| Token | Hex |
|---|---|
| Background | `#0a0c10` |
| Foreground | `#e8eaf0` |
| Primary | `#38bdf8` |
| Border | `#1e2330` |
| Surface | `#0e1118` |

---

## Deployment

This is a static Vite app. Build with `npm run build` and deploy the `dist/` folder to any static host (Cloudflare Pages, Netlify, Vercel, nginx, etc.).

For subdomain routing (e.g. `dev.jhnbrd.com`), point DNS to your host and serve the built `dist/` directory.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Author

**Jhianne Berida** — Aspiring Backend Developer · Davao City, PH

- GitHub: [@jhnbrd](https://github.com/jhnbrd)
- LinkedIn: [jhianneberida](https://linkedin.com/in/jhianneberida)
- Email: jhiannejoseberida@gmail.com

---

## License

This project is personal portfolio source code. All rights reserved unless a license file is added separately.
