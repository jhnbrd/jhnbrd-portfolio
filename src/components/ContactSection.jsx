import { useState } from 'react'
import { Mail, Github, Linkedin, MapPin, Send, Phone, Facebook } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import { personal } from '../data/portfolio'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jhiannejoseberida@gmail.com',
    href: 'mailto:jhiannejoseberida@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/jhnbrd',
    href: 'https://github.com/jhnbrd',
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/jhianneberida',
    href: 'https://linkedin.com/in/jhianneberida',
    external: true,
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'facebook.com/yanjisama',
    href: 'https://facebook.com/yanjisama',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Davao City, Philippines',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(+63) 915 768 0262',
    href: 'tel:+639157680262',
  },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = form
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:jhiannejoseberida@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section aria-labelledby="contact-heading" className="px-6 sm:px-10 lg:px-12 py-12">
      <SectionHeader command="ping jhianne.berida" title="Contact" />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Contact links */}
        <div className="flex-1 flex flex-col gap-4">
          <Reveal>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mb-2">
              Currently open to backend engineering roles, freelance system architecture, or
              collaboration on infrastructure tooling. Reach out through any of the channels below.
            </p>
          </Reveal>

          <Reveal delay="delay-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                const Tag = item.href ? 'a' : 'div'
                return (
                  <Tag
                    key={item.label}
                    href={item.href ?? undefined}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 border border-border bg-surface rounded-sm px-5 py-4 hover:border-primary/40 hover:bg-accent-dim transition-colors duration-150 focus-ring group"
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    <div className="w-8 h-8 rounded-sm bg-accent-dim border border-border flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <Icon size={15} className="text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-2xs text-muted-foreground">{item.label}</span>
                      <span className="text-sm text-foreground truncate">{item.value}</span>
                    </div>
                  </Tag>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Terminal contact form */}
        <Reveal delay="delay-150" className="lg:w-80 shrink-0">
          <div className="border border-border rounded-sm bg-surface overflow-hidden">
            {/* Terminal titlebar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-muted" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">send_message.sh</span>
            </div>

            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4" noValidate>
              {[
                { name: 'name', label: '$ name', placeholder: 'Your name...', type: 'text' },
                { name: 'email', label: '$ email', placeholder: 'your@email.com', type: 'email' },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label htmlFor={field.name} className="text-xs text-muted-foreground">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="border border-border bg-background rounded-sm px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-xs text-muted-foreground">
                  $ message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write a message..."
                  required
                  rows={4}
                  className="border border-border bg-background rounded-sm px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-sm text-sm font-bold hover:bg-primary/90 active:bg-primary/80 transition-colors focus-ring"
              >
                <Send size={13} aria-hidden="true" />
                {sent ? 'opening mail client...' : 'send --execute'}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
