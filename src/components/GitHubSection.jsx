import { useState } from 'react'
import {
  Github,
  GitBranch,
  Star,
  FolderGit2,
  ArrowUpRight,
  ExternalLink,
  Code2,
  CheckCircle2,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const USERNAME = 'jhnbrd'

// Custom-themed URLs — matched to portfolio palette
const BG      = '0a0c10'
const BORDER  = '1e2330'
const PRIMARY = '38bdf8'
const TEXT    = '94a3b8'
const FG      = 'e8eaf0'

const STATS_URL =
  `https://github-readme-stats.vercel.app/api?username=${USERNAME}` +
  `&show_icons=true&bg_color=${BG}&border_color=${BORDER}` +
  `&title_color=${PRIMARY}&icon_color=${PRIMARY}&text_color=${TEXT}` +
  `&rank_icon=github&hide_border=false&include_all_commits=true`

const LANGS_URL =
  `https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}` +
  `&layout=compact&bg_color=${BG}&border_color=${BORDER}` +
  `&title_color=${PRIMARY}&text_color=${TEXT}&langs_count=8`

const GRAPH_URL =
  `https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}` +
  `&bg_color=${BG}&color=${PRIMARY}&line=${PRIMARY}&point=${FG}` +
  `&area=true&area_color=${PRIMARY}&title_color=${PRIMARY}` +
  `&custom_title=Contribution%20Activity&hide_border=false&border_color=${BORDER}`

// Curated active open-source / showcase repositories
const PINNED_REPOS = [
  {
    name: 'BrewTracks',
    desc: 'Multi-tenant café management platform with RBAC, secure REST APIs, inventory tracking, and POS on .NET 8 Web APIs.',
    lang: 'C# / .NET 8',
    url: 'https://github.com/jhnbrd/BrewTracks',
  },
  {
    name: 'jhnbrd-portfolio',
    desc: 'Terminal-themed minimalist portfolio & architecture dashboard built with Vite, React, and Tailwind CSS.',
    lang: 'JavaScript',
    url: 'https://github.com/jhnbrd/jhnbrd-portfolio',
  },
  {
    name: 'PisoNet-Controller',
    desc: 'Automated hardware timer, relay actuator logic, and captive portal telemetry integration for internet kiosks.',
    lang: 'C++ / Embedded',
    url: 'https://github.com/jhnbrd',
  },
]

function StatImg({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className={`p-6 border border-border bg-surface rounded-sm flex flex-col items-center justify-center text-center gap-2 ${className}`}>
        <FolderGit2 size={24} className="text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-mono">GitHub telemetry stream active</span>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xs text-primary font-mono hover:underline"
        >
          View live on GitHub ↗
        </a>
      </div>
    )
  }

  return (
    <div className={`relative rounded-sm overflow-hidden ${className}`}>
      {!loaded && (
        <div
          className="absolute inset-0 bg-surface animate-pulse rounded-sm"
          style={{ minHeight: '120px' }}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`w-full rounded-sm transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

export default function GitHubSection() {
  return (
    <section id="github" aria-labelledby="github-heading" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command={`gh api /users/${USERNAME}/activity`} title="Open Source &amp; Telemetry" />

      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {/* Pinned Repositories Grid */}
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-border">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-2">
                <FolderGit2 size={14} className="text-primary" />
                Featured Repositories
              </span>
              <a
                href={`https://github.com/${USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <span>View all repos</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PINNED_REPOS.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover shimmer-sweep p-4 flex flex-col justify-between gap-3 group border-border hover:border-primary/50 transition-all duration-200"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground font-mono group-hover:text-primary transition-colors flex items-center gap-1.5">
                        <GitBranch size={13} className="text-primary" />
                        {repo.name}
                      </span>
                      <ArrowUpRight size={12} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-2xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{repo.lang}</span>
                    </span>
                    <span>Public</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Dynamic Vercel SVG Stats + Languages */}
        <Reveal delay="delay-100">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center">
            <StatImg
              src={STATS_URL}
              alt="Jhianne's GitHub stats — commits, PRs, issues, and rank"
              className="w-full sm:flex-1"
            />
            <StatImg
              src={LANGS_URL}
              alt="Top programming languages used by Jhianne on GitHub"
              className="w-full sm:w-80"
            />
          </div>
        </Reveal>

        {/* Contribution Activity Graph */}
        <Reveal delay="delay-150">
          <div className="card overflow-hidden border border-border">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background">
              <div className="flex items-center gap-2">
                <div className="flex gap-1" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-1">contribution_graph.svg</span>
              </div>
              <span className="text-2xs font-mono text-success font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live Telemetry
              </span>
            </div>
            <StatImg
              src={GRAPH_URL}
              alt="Jhianne's GitHub contribution activity graph"
            />
          </div>
        </Reveal>

        {/* Direct Profile CTA */}
        <Reveal delay="delay-200" className="self-center">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-surface hover:bg-accent-dim text-xs font-mono text-foreground hover:text-primary transition-all duration-200 border border-border hover:border-primary/50 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <Github size={15} />
            <span>Visit Full GitHub Profile (@{USERNAME})</span>
            <ArrowUpRight size={13} className="text-primary" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
