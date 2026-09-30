import React, { useState, useEffect, useRef } from 'react'
import { X, Send, Radio, MessageSquare } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const STORAGE_KEY = 'jb_freedom_wall_feed_v2'
const USERNAME_KEY = 'jb_freedom_wall_username'
const MEME_HANDLES = [
  'pwede_nang_mangarap',
  'fox_silica',
  'fox_silic_wait',
  'yoohoo_dito_tingin',
  'hello_po_team_ryzza',
  'sino_kalaban_team_ryzza',
  'kain_po_team_ryzza',
  'oh_cmon_naman',
  'one_two_three_go',
  'kanya_kanya_na',
  'depende_kung_tatlo',
  'suntukan_right_neow',
  'ay_nakatulog',
  'na_para_bang',
  'ba_is_liw',
  'wala_naman_akong_script',
  'pwede_na_mangawat',
]
const OUTDATED_AUTO_HANDLES = [
  'nasan_ang_kanin_bossing',
  'bigla_kang_sumakses',
  'over_naman_sa_wifi',
  'trentahin_na_bossing',
  'kuya_natanggal',
  'thank_you_so_mu',
  'ipa_notaryo_na',
  'sharmaine_nasan_ka',
  'vanessa_online',
  'melanie_nagchat',
  'bakit_kasalanan_ko',
  'sana_all_may_wifi',
  'charot_lang_boss',
  'hawak_mo_ang_wifi',
  'hot_maria_clara',
  'limang_daan_lang',
  'soafer_online',
  'bossing_gising_pa',
]

function createMemeUsername() {
  let randomValue
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const values = new Uint32Array(1)
    crypto.getRandomValues(values)
    randomValue = values[0]
  } else {
    randomValue = Math.floor(Math.random() * 0xffffffff)
  }

  const handle = MEME_HANDLES[randomValue % MEME_HANDLES.length]
  const suffix = String((randomValue >>> 8) % 100000).padStart(5, '0')
  return `${handle}_${suffix}`
}

export default function MinimalistFreedomWallModal({ isOpen, onClose }) {
  const { isDark } = useTheme()
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) return parsed.slice(-20)
      }
    } catch (e) {}
    return []
  })

  const [username, setUsername] = useState(() => {
    const generated = createMemeUsername()
    try {
      const stored = localStorage.getItem(USERNAME_KEY)
      const isLegacyVisitor = /^visitor_\d+$/i.test(stored || '')
      const isOutdatedAutoName = OUTDATED_AUTO_HANDLES.some((handle) => (
        stored?.startsWith(`${handle}_`) && /_\d{5}$/.test(stored)
      ))
      if (stored && !isLegacyVisitor && !isOutdatedAutoName) return stored
      localStorage.setItem(USERNAME_KEY, generated)
    } catch (e) {}
    return generated
  })
  const [inputMessage, setInputMessage] = useState('')
  const [onlineCount, setOnlineCount] = useState(1)
  const [socketStatus, setSocketStatus] = useState('connecting')
  const socketRef = useRef(null)
  const channelRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    // Multi-tab synchronization fallback
    let channel = null
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('jb_freedom_wall')
        channelRef.current = channel
        channel.onmessage = (event) => {
          if (event.data?.type === 'NEW_CHAT' && event.data.message) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === event.data.message.id)) return prev
              const next = [...prev.slice(-19), event.data.message]
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
              } catch (e) {}
              return next
            })
          }
        }
      }
    } catch (e) {}

    let ws = null
    let reconnectTimeout = null
    let isDestroyed = false

    function connectWs() {
      if (isDestroyed) return
      try {
        const isSecure = window.location.protocol === 'https:'
        const protocol = isSecure ? 'wss:' : 'ws:'
        // Connect to unified /ws endpoint on the current host (works across localhost, LAN mobile, and production)
        const wsUrl = `${protocol}//${window.location.host}/ws`

        ws = new WebSocket(wsUrl)
        socketRef.current = ws

        ws.onopen = () => {
          if (isDestroyed) return
          setSocketStatus('connected')
        }

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.type === 'INIT' && Array.isArray(data.history)) {
              if (data.history.length > 0) {
                setMessages(data.history.slice(-20))
              }
              if (data.clientsCount) setOnlineCount(data.clientsCount)
            } else if (data.type === 'NEW_CHAT' && data.message) {
              setMessages((prev) => {
                if (prev.some((m) => m.id === data.message.id)) return prev
                const next = [...prev.slice(-19), data.message]
                try {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
                } catch (e) {}
                return next
              })
              if (channel) {
                try {
                  channel.postMessage({ type: 'NEW_CHAT', message: data.message })
                } catch (e) {}
              }
            } else if (data.type === 'PRESENCE' && data.clientsCount) {
              setOnlineCount(data.clientsCount)
            }
          } catch (err) {}
        }

        ws.onclose = () => {
          if (isDestroyed) return
          setSocketStatus('offline')
          reconnectTimeout = setTimeout(connectWs, 3500)
        }

        ws.onerror = () => {
          if (isDestroyed) return
          setSocketStatus('offline')
        }
      } catch (e) {
        setSocketStatus('offline')
      }
    }

    connectWs()

    return () => {
      isDestroyed = true
      document.removeEventListener('keydown', handleKeyDown)
      if (reconnectTimeout) clearTimeout(reconnectTimeout)
      if (ws) {
        try { ws.close() } catch (e) {}
      }
      if (channel) {
        try { channel.close() } catch (e) {}
      }
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isOpen, messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = inputMessage.trim()
    if (!trimmed) return

    const newEntry = {
      id: `client_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user: username.trim() || 'guest',
      text: trimmed,
      timestamp: new Date().toTimeString().split(' ')[0],
      color: '#34d399',
    }

    // Optimistically add to local feed and broadcast to other tabs
    setMessages((prev) => {
      if (prev.some((m) => m.id === newEntry.id)) return prev
      const next = [...prev.slice(-19), newEntry]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (e) {}
      return next
    })

    if (channelRef.current) {
      try {
        channelRef.current.postMessage({ type: 'NEW_CHAT', message: newEntry })
      } catch (e) {}
    }

    // Send over WebSocket if connected
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'CHAT',
          id: newEntry.id,
          user: newEntry.user,
          text: newEntry.text,
          color: newEntry.color,
        })
      )
    }

    setInputMessage('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 430, damping: 34 }}
          role="dialog"
          aria-label="Live visitor chat"
          className={`fixed inset-x-3 bottom-24 sm:inset-x-auto sm:right-10 sm:bottom-28 z-50 sm:w-[360px] max-h-[calc(100dvh-8rem)] overflow-hidden rounded-2xl border shadow-[0_24px_70px_rgba(0,0,0,0.28)] ${
            isDark
              ? 'bg-neutral-950 text-white border-neutral-800'
              : 'bg-white text-neutral-950 border-neutral-200'
          }`}
        >
          <header className={`flex items-center justify-between px-4 py-3.5 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <div>
              <div className="flex items-center gap-2">
                <Radio size={12} className={socketStatus === 'connected' ? 'text-emerald-500' : 'text-neutral-400'} />
                <h2 className="text-sm font-semibold tracking-tight">Live chat</h2>
              </div>
              <p className={`mt-0.5 ml-5 text-[10px] font-mono uppercase tracking-[0.14em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                {onlineCount} online &middot; visitor channel
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`grid h-7 w-7 place-items-center rounded-full transition-colors ${
                isDark ? 'text-neutral-500 hover:bg-neutral-900 hover:text-white' : 'text-neutral-400 hover:bg-neutral-100 hover:text-black'
              }`}
              aria-label="Close live chat"
            >
              <X size={14} />
            </button>
          </header>

          <div className="flex max-h-72 min-h-52 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 ? (
              <div className={`m-auto flex max-w-[230px] flex-col items-center text-center ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                <MessageSquare size={20} strokeWidth={1.5} />
                <p className={`mt-3 text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Start the conversation.</p>
                <p className="mt-1 text-[11px] leading-relaxed">Leave a note for this page's visitors. Messages update live.</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <article key={msg.id || i} className={`border-l-2 pl-3 ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="truncate text-[11px] font-semibold" style={{ color: msg.color || '#00e5ff' }}>{msg.user}</span>
                    <time className={`shrink-0 font-mono text-[9px] ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>{msg.timestamp}</time>
                  </div>
                  <p className={`break-words text-[13px] leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{msg.text}</p>
                </article>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className={`border-t p-3 ${isDark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-neutral-50/70'}`}>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                localStorage.setItem(USERNAME_KEY, e.target.value)
              }}
              placeholder="Your name"
              aria-label="Chat display name"
              className={`mb-2 w-full bg-transparent px-1 text-[10px] font-mono outline-none ${isDark ? 'text-neutral-400 placeholder:text-neutral-600' : 'text-neutral-500 placeholder:text-neutral-400'}`}
            />
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-colors focus-within:border-[#00e5ff] ${
              isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'
            }`}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Write a message..."
                aria-label="Message"
                className={`min-w-0 flex-1 bg-transparent py-1.5 text-xs outline-none ${isDark ? 'text-white placeholder:text-neutral-600' : 'text-black placeholder:text-neutral-400'}`}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#00e5ff] text-[#020608] transition-all hover:bg-[#67e8f9] disabled:cursor-default disabled:opacity-35"
                aria-label="Send message"
              >
                <Send size={13} />
              </button>
            </div>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
