import { useState } from 'react'
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

function StatImg({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  if (errored) return null

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
      <SectionHeader command={`gh api /users/${USERNAME}/stats`} title="GitHub" />

      <div className="flex flex-col gap-5 items-center">

        {/* Stats + Languages — centered, capped width */}
        <Reveal className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-4 items-start justify-center">
            <StatImg
              src={STATS_URL}
              alt="Jhianne's GitHub stats — commits, PRs, issues, and rank"
              className="w-full sm:max-w-[380px]"
            />
            <StatImg
              src={LANGS_URL}
              alt="Top programming languages used by Jhianne on GitHub"
              className="w-full sm:max-w-[260px]"
            />
          </div>
        </Reveal>

        {/* Contribution graph — centered, capped width */}
        <Reveal delay="delay-100" className="w-full max-w-2xl">
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background">
              <div className="flex gap-1" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-muted" />
                <span className="w-2 h-2 rounded-full bg-muted" />
                <span className="w-2 h-2 rounded-full bg-muted" />
              </div>
              <span className="text-2xs text-muted-foreground ml-1">contribution-graph.svg</span>
            </div>
            <StatImg
              src={GRAPH_URL}
              alt="Jhianne's GitHub contribution activity graph"
            />
          </div>
        </Reveal>

      </div>
    </section>
  )
}
