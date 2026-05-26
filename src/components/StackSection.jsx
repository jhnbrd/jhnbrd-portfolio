import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { stack } from '../data/portfolio'

const TOTAL_BARS = 20

function MobileBars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-4 sm:hidden flex flex-col gap-2">
      {stack.map((row, i) => (
        <div key={row.category} className="flex items-center gap-3">
          <span className="w-24 text-2xs text-muted-foreground uppercase tracking-widest shrink-0">
            {row.category}
          </span>
          <div className="flex-1 bg-border rounded-full h-1 overflow-hidden">
            <div
              className="bg-primary h-1 rounded-full"
              style={{
                width: visible ? `${row.proficiency}%` : '0%',
                transition: `width 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
              }}
            />
          </div>
          <span
            className="text-2xs text-primary w-8 text-right"
            style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 80 + 400}ms` }}
          >
            {row.proficiency}%
          </span>
        </div>
      ))}
    </div>
  )
}

function ProficiencyBar({ proficiency }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const filled = Math.round((proficiency / 100) * TOTAL_BARS)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex items-center gap-0.5 shrink-0" aria-label={`Proficiency: ${proficiency}%`}>
      {Array.from({ length: TOTAL_BARS }).map((_, i) => {
        const isFilled = i < filled
        const targetOpacity = isFilled ? 0.5 + (i / (TOTAL_BARS - 1)) * 0.5 : 1
        return (
          <div
            key={i}
            className="w-1.5 h-3 rounded-sm"
            style={{
              backgroundColor: isFilled ? '#38bdf8' : '#1e2330',
              opacity: isFilled ? (visible ? targetOpacity : 0) : 0.3,
              transition: isFilled ? `opacity 0.18s ease-out ${i * 28}ms, transform 0.18s ease-out ${i * 28}ms` : 'none',
              transform: isFilled ? (visible ? 'scaleY(1)' : 'scaleY(0.3)') : 'scaleY(1)',
              transformOrigin: 'bottom',
            }}
          />
        )
      })}
    </div>
  )
}

export default function StackSection() {
  return (
    <section id="stack" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="cat ./stack.json" title="Tech Stack" />

      <Reveal>
      <div className="border border-border rounded-sm overflow-hidden bg-surface">
        {/* Table Header */}
        <div className="flex items-center gap-4 sm:gap-6 py-3 px-4 sm:px-5 border-b border-border bg-background">
          <div className="w-24 sm:w-32 text-2xs text-muted-foreground tracking-widest uppercase shrink-0">
            Category
          </div>
          <div className="flex-1 text-2xs text-muted-foreground tracking-widest uppercase">
            Technologies
          </div>
          <div className="text-2xs text-muted-foreground tracking-widest uppercase shrink-0 hidden sm:block">
            Proficiency
          </div>
        </div>

        {/* Table Rows */}
        <div className="px-4 sm:px-5">
          {stack.map((row, idx) => (
            <div
              key={row.category}
              className={`flex items-center gap-4 sm:gap-6 py-3.5 row-hover ${
                idx < stack.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="w-24 sm:w-32 text-2xs text-muted-foreground tracking-widest uppercase shrink-0">
                {row.category}
              </div>
              <div className="flex-1 flex flex-wrap gap-x-3 gap-y-1">
                {row.items.map((item) => (
                  <span key={item} className="text-sm text-foreground">
                    {item}
                  </span>
                ))}
              </div>
              <div className="shrink-0 hidden sm:block">
                <ProficiencyBar proficiency={row.proficiency} />
              </div>
            </div>
          ))}
        </div>
      </div>
      </Reveal>

      {/* Mobile proficiency view */}
      <MobileBars />
    </section>
  )
}
