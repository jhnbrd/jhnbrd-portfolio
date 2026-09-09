import React, { useState, useEffect, useRef } from 'react'
import { X, Send, Radio, MessageSquare, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'jb_freedom_wall_feed_v1'
const BROADCAST_CHANNEL = 'jb_portfolio_freedom_wall'

const SEED_MESSAGES = [
  {
    id: 'msg_1',
    user: 'sys_admin_dvo',
    text: 'Zero-trust CF tunnel config is slick! Clean latency.',
    timestamp: '14:21:05',
    color: '#34d399',
  },
  {
    id: 'msg_2',
    user: 'alex_founder',
    text: 'Saw the DevJunction launch. Looking forward to partnering on the SaaS project!',
    timestamp: '14:22:40',
    color: '#22c55e',
  },
  {
    id: 'msg_3',
    user: 'dev_mark',
    text: 'Editorial redesign is razor sharp. Loving the interaction response.',
    timestamp: '14:24:12',
    color: '#38bdf8',
  },
]

export default function MinimalistFreedomWallModal({ isOpen, onClose }) {
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
  const [onlineCount, setOnlineCount] = useState(1)
  const [socketStatus, setSocketStatus] = useState('connecting')
  const socketRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    let ws = null
    let reconnectTimeout = null

    function connectWs() {
      try {
        const isSecure = window.location.protocol === 'https:'
        const protocol = isSecure ? 'wss:' : 'ws:'
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        const wsUrl = isLocalhost
          ? `${protocol}//${window.location.hostname}:8008`
          : `${protocol}//${window.location.host}/ws`

        ws = new WebSocket(wsUrl)
        socketRef.current = ws

        ws.onopen = () => setSocketStatus('connected')
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.type === 'INIT' && Array.isArray(data.history)) {
              if (data.history.length > 0) setMessages(data.history.slice(-8))
              if (data.clientsCount) setOnlineCount(data.clientsCount)
            } else if (data.type === 'NEW_CHAT' && data.message) {
              setMessages((prev) => [...prev.slice(-7), data.message])
            } else if (data.type === 'PRESENCE' && data.clientsCount) {
              setOnlineCount(data.clientsCount)
            }
          } catch (err) {}
        }
        ws.onclose = () => {
          setSocketStatus('offline')
          reconnectTimeout = setTimeout(connectWs, 5000)
        }
      } catch (e) {
        setSocketStatus('offline')
      }
    }

    connectWs()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (reconnectTimeout) clearTimeout(reconnectTimeout)
      if (ws) ws.close()
    }
  }, [isOpen, onClose])

  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = inputMessage.trim()
    if (!trimmed) return

    const newEntry = {
      id: `client_${Date.now()}`,
      user: username.trim() || 'guest',
      text: trimmed,
      timestamp: new Date().toTimeString().split(' ')[0],
      color: '#34d399',
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'SEND_CHAT',
        user: newEntry.user,
        text: newEntry.text,
        color: newEntry.color,
      }))
    }

    setMessages((prev) => [...prev.slice(-7), newEntry])
    setInputMessage('')
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#0d0e12] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
            <Radio size={13} className={socketStatus === 'connected' ? 'text-accent-neon' : 'text-neutral-500'} />
            <span className="font-semibold text-white">Live Freedom Wall</span>
            <span className="text-neutral-500">({onlineCount} live)</span>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        {/* In-Memory Ring Feed */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {messages.map((msg, i) => (
            <div key={msg.id || i} className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="font-bold text-neutral-300" style={{ color: msg.color }}>{msg.user}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="text-neutral-200 text-sm font-sans font-normal">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                localStorage.setItem('jb_freedom_wall_username', e.target.value)
              }}
              placeholder="Username" 
              className="w-1/3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-accent-neon"
            />
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Say something nice..." 
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-neon"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Broadcast Message</span>
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  )
}
