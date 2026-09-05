import { WebSocketServer, WebSocket } from 'ws'

const PORT = process.env.WS_PORT || 8080
const wss = new WebSocketServer({ port: PORT })

// In-memory ring buffer: strictly keeps only the last 8 messages (no-scrollback freedom wall)
const MAX_HISTORY = 8
let messageHistory = [
  {
    id: 'seed_1',
    user: 'sys_admin',
    text: 'Freedom wall node initialized. Ephemeral mode active.',
    timestamp: new Date().toTimeString().split(' ')[0],
    color: '#38bdf8',
  },
]

function broadcast(payload) {
  const data = JSON.stringify(payload)
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', (ws) => {
  // Send current active clients count & latest history to the newly connected visitor
  ws.send(
    JSON.stringify({
      type: 'INIT',
      history: messageHistory,
      clientsCount: wss.clients.size,
    })
  )

  // Broadcast updated client count to all peers
  broadcast({
    type: 'PRESENCE',
    clientsCount: wss.clients.size,
  })

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString())
      if (msg.type === 'CHAT' && msg.text && msg.user) {
        const cleanMsg = {
          id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          user: String(msg.user).slice(0, 16).trim() || 'anonymous',
          text: String(msg.text).slice(0, 160).trim(),
          timestamp: new Date().toTimeString().split(' ')[0],
          color: msg.color || '#38bdf8',
        }

        // Push new message and drop the oldest beyond 8
        messageHistory.push(cleanMsg)
        if (messageHistory.length > MAX_HISTORY) {
          messageHistory.shift()
        }

        // Broadcast immediately to everyone connected across the internet
        broadcast({
          type: 'NEW_CHAT',
          message: cleanMsg,
        })
      }
    } catch (e) {
      // Ignore malformed payloads
    }
  })

  ws.on('close', () => {
    broadcast({
      type: 'PRESENCE',
      clientsCount: wss.clients.size,
    })
  })
})

console.log(`[Freedom Wall WebSocket Server] Listening on ws://0.0.0.0:${PORT}`)
