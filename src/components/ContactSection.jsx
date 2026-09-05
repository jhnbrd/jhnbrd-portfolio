import { useState } from 'react'
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Facebook,
  Building2,
  Copy,
  Check,
  Terminal,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { personal } from '../data/portfolio'

const CONTACT_ITEMS = [
  {
    icon: Building2,
    label: 'DevJunction Inc.',
    sub: 'Startup Inquiries & Client Solutions',
    value: 'facebook.com/DevJunctionInc',
    href: personal.devjunctionUrl || 'https://facebook.com/DevJunctionInc',
    copyable: false,
    external: true,
  },
  {
    icon: Mail,
    label: 'Direct Email',
    sub: 'Contracts & Employment',
    value: personal.email,
    copyValue: personal.email,
    href: `mailto:${personal.email}`,
    copyable: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    sub: 'Repositories & Code Reviews',
    value: 'github.com/jhnbrd',
    href: 'https://github.com/jhnbrd',
    copyable: false,
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Professional Network',
    value: 'linkedin.com/in/jhianneberida',
    href: 'https://linkedin.com/in/jhianneberida',
    copyable: false,
    external: true,
  },
  {
    icon: Facebook,
    label: 'Personal Facebook',
    sub: 'Direct Chat',
    value: 'facebook.com/yanjisama',
    href: 'https://facebook.com/yanjisama',
    copyable: false,
    external: true,
  },
]

const INQUIRY_PRESETS = [
  { id: 'devjunction', label: 'DevJunction Client Project', subject: '[DevJunction Inquiry] Web / Backend Platform Development' },
  { id: 'backend', label: 'Backend Contract / Role', subject: '[Hiring / Contract] Backend Engineering Opportunity' },
  { id: 'consulting', label: 'Infrastructure & APIs', subject: '[Consultation] Database & Infrastructure Architecture' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [selectedPreset, setSelectedPreset] = useState('devjunction')
  const [copiedKey, setCopiedKey] = useState(null)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleCopy = (e, text, key) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2200)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = form
    const preset = INQUIRY_PRESETS.find((p) => p.id === selectedPreset)
    const baseSubject = preset ? preset.subject : `Portfolio contact from ${name}`
    const subject = encodeURIComponent(`${baseSubject} - ${name || 'Inquiry'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPreset: ${preset?.label}\n\nMessage:\n${message}`)
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-6 sm:px-10 lg:px-12 py-12">
      <SectionHeader command="ping jhianne.berida --interactive" title="Get in Touch" />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Left Column: Direct Communication Channels */}
        <div className="flex-1 flex flex-col gap-5">
          <Reveal>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-mono text-success font-bold uppercase tracking-wider">
                  Channels Open for Q1–Q2 2026
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Whether you need custom software built from scratch through <strong className="text-foreground font-semibold">DevJunction</strong>, want to discuss a high-throughput backend contract, or require zero-trust infrastructure staging — reach out through any channel below.
              </p>
            </div>
          </Reveal>

          <Reveal delay="delay-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                const isCopied = copiedKey === item.label

                return (
                  <div
                    key={item.label}
                    className="card card-hover shimmer-sweep p-4 flex flex-col justify-between gap-3 group border-border hover:border-primary/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-9 h-9 rounded-sm bg-background border border-border flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.2)] transition-all text-primary">
                        <Icon size={16} />
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.copyable && (
                          <button
                            type="button"
                            onClick={(e) => handleCopy(e, item.copyValue, item.label)}
                            className="p-1.5 rounded-sm bg-surface hover:bg-background border border-border hover:border-primary/40 text-muted-foreground hover:text-foreground text-xs font-mono transition-colors flex items-center gap-1"
                            title="Copy email to clipboard"
                          >
                            {isCopied ? (
                              <>
                                <Check size={12} className="text-success" />
                                <span className="text-2xs text-success font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span className="text-2xs">Copy</span>
                              </>
                            )}
                          </button>
                        )}
                        {item.href && (
                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                            className="p-1.5 rounded-sm bg-surface hover:bg-background border border-border hover:border-primary/40 text-muted-foreground hover:text-primary text-xs transition-colors"
                            aria-label={`Open ${item.label}`}
                          >
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="text-2xs font-mono text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {item.value}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.sub}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Right Column: Interactive Terminal Contact Form */}
        <Reveal delay="delay-150" className="lg:w-96 shrink-0">
          <div className="card overflow-hidden border border-border shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Terminal Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-2">dispatch_inquiry.sh</span>
              </div>
              <span className="text-2xs font-mono text-primary font-bold">READY</span>
            </div>

            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 font-mono" noValidate>
              {/* Preset Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground flex items-center justify-between">
                  <span>$ inquiry_scope</span>
                  <span className="text-2xs text-primary font-bold">presets</span>
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {INQUIRY_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPreset(p.id)}
                      className={`text-left px-3 py-2 rounded-sm text-xs transition-all border ${
                        selectedPreset === p.id
                          ? 'bg-primary/10 border-primary text-primary font-semibold shadow-[0_0_8px_rgba(56,189,248,0.2)]'
                          : 'bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                      }`}
                    >
                      <span className="text-primary mr-1.5">›</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs text-muted-foreground">
                  $ name / organization
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex (CEO / Lead)"
                  required
                  className="border border-border bg-background rounded-sm px-3.5 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/70 transition-colors"
                />
              </div>

              {/* Email input */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs text-muted-foreground">
                  $ return_email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@company.com"
                  required
                  className="border border-border bg-background rounded-sm px-3.5 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/70 transition-colors"
                />
              </div>

              {/* Message text */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-xs text-muted-foreground">
                  $ payload_message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe timeline, technical requirements, or project scope..."
                  required
                  rows={4}
                  className="border border-border bg-background rounded-sm px-3.5 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/70 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-background py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-sky-400 active:scale-[0.99] transition-all shadow-[0_0_14px_rgba(56,189,248,0.25)] focus-ring"
              >
                <Send size={13} aria-hidden="true" />
                <span>{sent ? 'Dispatched to Mail Client!' : 'execute mailto://'}</span>
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
