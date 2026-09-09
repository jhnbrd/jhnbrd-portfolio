import React, { useState, useEffect, useRef } from 'react'
import { X, Send, Radio, MessageSquare } from 'lucide-react'

const STORAGE_KEY = 'jb_freedom_wall_feed_v2'

export default function MinimalistFreedomWallModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) return parsed.slice(-8)
      }
    } catch (e) {}
    return []
  })

  const [username, setUsername] = useState(() => {
    return localStorage.getItem('jb_freedom_wall_username') || `visitor_${Math.floor(100 + Math.random() * 900)}`
  })
  const [inputMessage, setInputMessage] = useState('')
  const [onlineCount, setOnlineCount] = useState(1)
  const [socketStatus, setSocketStatus] = useState('connecting')
  const socketRef = useRef(null)
  const channelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

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
              const next = [...prev.slice(-7), event.data.message]
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
                setMessages(data.history.slice(-8))
              }
              if (data.clientsCount) setOnlineCount(data.clientsCount)
            } else if (data.type === 'NEW_CHAT' && data.message) {
              setMessages((prev) => {
                if (prev.some((m) => m.id === data.message.id)) return prev
                const next = [...prev.slice(-7), data.message]
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
      document.body.style.overflow = ''
      if (reconnectTimeout) clearTimeout(reconnectTimeout)
      if (ws) {
        try { ws.close() } catch (e) {}
      }
      if (channel) {
        try { channel.close() } catch (e) {}
      }
    }
  }, [isOpen, onClose])

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
      const next = [...prev.slice(-7), newEntry]
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

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#0d0e12] border border-neutral-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl flex flex-col space-y-5 sm:space-y-6 max-h-[90dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 sm:pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
            <Radio size={13} className={socketStatus === 'connected' ? 'text-emerald-400' : 'text-neutral-500'} />
            <span className="font-semibold text-white">Live Freedom Wall</span>
            <span className="text-neutral-500">({onlineCount} live)</span>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* In-Memory Ring Feed / Human Only Messages */}
        <div className="space-y-2.5 sm:space-y-3 max-h-60 sm:max-h-64 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="py-10 sm:py-12 flex flex-col items-center justify-center text-center text-neutral-500 space-y-2 select-none">
              <MessageSquare size={24} className="text-neutral-700 mb-1" />
              <p className="text-xs font-mono text-neutral-300">No messages on the wall yet.</p>
              <p className="text-[11px] text-neutral-500 max-w-xs px-2">
                Be the first visitor to broadcast a message to anyone online!
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={msg.id || i} className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 font-mono text-xs">
                <div className="flex items-center justify-between text-neutral-500 mb-1">
                  <span className="font-bold text-neutral-300" style={{ color: msg.color || '#38bdf8' }}>{msg.user}</span>
                  <span className="text-[10px]">{msg.timestamp}</span>
                </div>
                <p className="text-neutral-200 text-xs sm:text-sm font-sans font-normal leading-relaxed">{msg.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="space-y-2.5 sm:space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                localStorage.setItem('jb_freedom_wall_username', e.target.value)
              }}
              placeholder="Username" 
              className="sm:w-1/3 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Say something nice..." 
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Broadcast Message</span>
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  )
}
