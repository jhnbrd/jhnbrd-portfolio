import { useState, useEffect, useRef } from 'react'
import {
  MessageSquare,
  Send,
  Radio,
  Sparkles,
  Shield,
  Terminal,
  User,
  Zap,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

const STORAGE_KEY = 'jb_freedom_wall_feed_v1'
const BROADCAST_CHANNEL = 'jb_portfolio_freedom_wall'

// Initial seeded conversation showing lively recent chatter
const SEED_MESSAGES = [
  {
    id: 'msg_1',
    user: 'sys_admin_dvo',
    text: 'Zero-trust CF tunnel config is slick! Clean latency.',
    timestamp: '14:21:05',
    color: '#38bdf8',
  },
  {
    id: 'msg_2',
    user: 'alex_founder',
    text: 'Saw the DevJunction launch. Looking forward to partnering on the SaaS project!',
    timestamp: '14:22:40',
    color: '#10b981',
  },
  {
    id: 'msg_3',
    user: 'dev_mark',
    text: 'Terminal UI is responsive as hell. Loving the keyboard escape handling.',
    timestamp: '14:24:12',
    color: '#f59e0b',
  },
  {
    id: 'msg_4',
    user: 'guest_882',
    text: 'Greetings from Manila! Great backend portfolio layout.',
    timestamp: '14:25:33',
    color: '#a855f7',
  },
  {
    id: 'msg_5',
    user: 'um_peer',
    text: 'Solid mentoring work at CCE skills clinic bro! Keep grinding 💪',
    timestamp: '14:26:01',
    color: '#ec4899',
  },
]

const USER_COLORS = ['#38bdf8', '#10b981', '#f59e0b', '#a855f7', '#ec4899', '#34d399', '#60a5fa']

export default function FreedomWallSection() {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(-8)
      }
    } catch (e) {}
    return SEED_MESSAGES
  })

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('jb_freedom_wall_username') || `visitor_${Math.floor(100 + Math.random() * 900)}`
  })

  const [inputMessage, setInputMessage] = useState('')
  const [onlineCount, setOnlineCount] = useState(3)
  const channelRef = useRef(null)

  // Sync with BroadcastChannel for simultaneous multi-tab live chat
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL)
        channelRef.current = channel

        channel.onmessage = (event) => {
          if (event.data && event.data.type === 'NEW_CHAT') {
            setMessages((prev) => [...prev.slice(-7), event.data.message])
          }
        }
      }
    } catch (e) {}

    // Fluctuate live user count subtly to feel like a real-time socket room
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1
        return Math.max(2, Math.min(8, prev + delta))
      })
    }, 12000)

    return () => {
      clearInterval(interval)
      if (channelRef.current) channelRef.current.close()
    }
  }, [])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const now = new Date()
    const timestamp = now.toTimeString().split(' ')[0]
    const userColor = USER_COLORS[Math.abs(username.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % USER_COLORS.length]

    const newMsg = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user: username.trim() || 'anonymous',
      text: inputMessage.trim().slice(0, 160), // cap message length to prevent spam
      timestamp,
      color: userColor,
    }

    // Keep only the most recent 8 messages — strict freedom wall policy (no scroll history)
    setMessages((prev) => {
      const updated = [...prev.slice(-7), newMsg]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (err) {}
      return updated
    })

    // Broadcast live to all other tabs
    if (channelRef.current) {
      try {
        channelRef.current.postMessage({ type: 'NEW_CHAT', message: newMsg })
      } catch (err) {}
    }

    // Persist username
    try {
      localStorage.setItem('jb_freedom_wall_username', username)
    } catch (err) {}

    setInputMessage('')
  }

  return (
    <section id="freedom-wall" aria-labelledby="freedom-wall-heading" className="px-6 sm:px-10 lg:px-12 py-12 border-b border-border">
      <SectionHeader command="tail -f /dev/freedom_wall --ephemeral" title="Live Freedom Wall" />

      <Reveal>
        <div className="border border-border rounded-sm bg-surface overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.5)]">
          {/* Console Header */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 py-3 border-b border-border bg-background gap-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-muted-foreground ml-2">
                freedom_stream.sock
              </span>
              <span className="text-2xs font-mono text-muted-foreground bg-surface border border-border px-1.5 py-0.5 rounded-sm ml-1 hidden xs:inline">
                ephemeral / no scrollback
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-mono text-success font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>{onlineCount} peering nodes</span>
              </span>
              <span className="text-2xs font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-sm uppercase tracking-wider font-bold">
                Live Broadcast
              </span>
            </div>
          </div>

          {/* Freedom Wall Feed Display: Fixed viewport, strictly NO scrollbar, only most recent messages */}
          <div
            className="p-4 sm:p-6 bg-background/50 flex flex-col justify-end gap-2.5 select-none relative overflow-hidden"
            style={{ minHeight: '280px', maxHeight: '340px' }}
          >
            {/* Top Fade overlay symbolizing discarded history */}
            <div
              className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background/90 to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-2 relative z-0">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className="flex items-baseline gap-2.5 text-xs font-mono animate-fade-in py-1 border-b border-border/30 last:border-0"
                >
                  <span className="text-2xs text-muted-foreground shrink-0 select-none">
                    [{msg.timestamp}]
                  </span>
                  <span
                    className="font-bold shrink-0"
                    style={{ color: msg.color || '#38bdf8' }}
                  >
                    @{msg.user}:
                  </span>
                  <span className="text-foreground/90 break-words flex-1 leading-relaxed">
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Chat Bar Form */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 border-t border-border bg-surface flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
          >
            {/* Nickname input */}
            <div className="flex items-center gap-1.5 bg-background border border-border px-3 py-2 rounded-sm shrink-0 sm:w-44">
              <span className="text-primary text-xs font-mono font-bold">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/\s+/g, '_').slice(0, 16))}
                placeholder="handle..."
                maxLength={16}
                className="w-full bg-transparent text-xs font-mono text-foreground focus:outline-none placeholder-muted-foreground"
                title="Your display handle"
              />
            </div>

            {/* Message input */}
            <div className="flex-1 flex items-center bg-background border border-border px-3.5 py-2 rounded-sm focus-within:border-primary/60 transition-colors">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Broadcast a note to the freedom wall (visible to visitors)..."
                maxLength={160}
                className="w-full bg-transparent text-xs font-mono text-foreground focus:outline-none placeholder-muted-foreground"
              />
              <span className="text-2xs font-mono text-muted-foreground shrink-0 ml-2">
                {160 - inputMessage.length}
              </span>
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-4 py-2 bg-primary text-background rounded-sm text-xs font-mono font-bold uppercase tracking-wider hover:bg-sky-400 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.25)] disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <span>Transmit</span>
              <Send size={13} />
            </button>
          </form>

          {/* Privacy & Anti-abuse banner */}
          <div className="px-4 py-2 bg-background border-t border-border flex items-center justify-between text-2xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <Shield size={11} className="text-primary" />
              <span>Broadcasts are transient &amp; automatically rotate</span>
            </span>
            <span className="hidden sm:inline">No account required · Zero logs</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
