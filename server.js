import { createServer } from 'node:http'
import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const PORT = process.env.WS_PORT || 8008
const MAX_HISTORY = 8
const STATS_FILE = join(process.cwd(), 'stats.json')

// Persistent strictly-real view counter
let profileViews = 0
try {
  if (existsSync(STATS_FILE)) {
    const raw = readFileSync(STATS_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    if (typeof parsed.views === 'number') profileViews = parsed.views
  } else {
    writeFileSync(STATS_FILE, JSON.stringify({ views: 0 }, null, 2))
  }
} catch (e) {
  profileViews = 0
}

function recordView() {
  profileViews += 1
  try {
    writeFileSync(STATS_FILE, JSON.stringify({ views: profileViews }, null, 2))
  } catch (err) {}
  return profileViews
}

// In-memory ring buffer: strictly keeps only the last 8 messages (no-scrollback freedom wall)
let messageHistory = [
  {
    id: 'seed_1',
    user: 'sys_admin',
    text: 'Freedom wall node initialized. Ephemeral mode active.',
    timestamp: new Date().toTimeString().split(' ')[0],
    color: '#38bdf8',
  },
]

const clients = new Set()

function broadcast(data) {
  const payload = JSON.stringify(data)
  const frame = encodeFrame(payload)
  for (const socket of clients) {
    if (!socket.destroyed) {
      socket.write(frame)
    }
  }
}

// Encode raw UTF-8 string into RFC 6455 WebSocket unmasked frame
function encodeFrame(payload) {
  const buf = Buffer.from(payload, 'utf8')
  const len = buf.length
  let header

  if (len < 126) {
    header = Buffer.from([0x81, len])
  } else if (len < 65536) {
    header = Buffer.alloc(4)
    header[0] = 0x81
    header[1] = 126
    header.writeUInt16BE(len, 2)
  } else {
    header = Buffer.alloc(10)
    header[0] = 0x81
    header[1] = 127
    header.writeBigUInt64BE(BigInt(len), 2)
  }

  return Buffer.concat([header, buf])
}

// Decode incoming RFC 6455 WebSocket masked frames
function decodeFrames(buffer) {
  const frames = []
  let offset = 0

  while (offset < buffer.length) {
    if (buffer.length - offset < 2) break

    const firstByte = buffer[offset]
    const secondByte = buffer[offset + 1]
    const opcode = firstByte & 0x0f
    const isMasked = (secondByte & 0x80) !== 0
    let payloadLen = secondByte & 0x7f
    let currentOffset = offset + 2

    if (payloadLen === 126) {
      if (buffer.length - currentOffset < 2) break
      payloadLen = buffer.readUInt16BE(currentOffset)
      currentOffset += 2
    } else if (payloadLen === 127) {
      if (buffer.length - currentOffset < 8) break
      payloadLen = Number(buffer.readBigUInt64BE(currentOffset))
      currentOffset += 8
    }

    let maskKey = null
    if (isMasked) {
      if (buffer.length - currentOffset < 4) break
      maskKey = buffer.slice(currentOffset, currentOffset + 4)
      currentOffset += 4
    }

    if (buffer.length - currentOffset < payloadLen) break

    const payloadData = buffer.slice(currentOffset, currentOffset + payloadLen)
    if (isMasked && maskKey) {
      for (let i = 0; i < payloadData.length; i++) {
        payloadData[i] ^= maskKey[i % 4]
      }
    }

    offset = currentOffset + payloadLen

    if (opcode === 0x08) {
      frames.push({ type: 'close' })
    } else if (opcode === 0x09) {
      frames.push({ type: 'ping', data: payloadData })
    } else if (opcode === 0x01) {
      frames.push({ type: 'text', data: payloadData.toString('utf8') })
    }
  }

  return frames
}

const server = createServer((req, res) => {
  // CORS & Cache headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // 100% Strictly-Real Views API endpoint: GET /api/views or POST /api/views
  if (req.url === '/api/views') {
    if (req.method === 'POST') {
      const count = recordView()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ views: count }))
      return
    }
    // GET current views
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ views: profileViews }))
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Freedom Wall & Real Telemetry Server Active')
})

// Standard RFC 6455 WebSocket Upgrade Handshake
server.on('upgrade', (req, socket) => {
  const key = req.headers['sec-websocket-key']
  if (!key) {
    socket.destroy()
    return
  }

  const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
  const acceptKey = createHash('sha1')
    .update(key + GUID)
    .digest('base64')

  const responseHeaders = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
    '\r\n',
  ]

  socket.write(responseHeaders.join('\r\n'))
  clients.add(socket)

  // Send initial history and presence to newly connected user
  socket.write(
    encodeFrame(
      JSON.stringify({
        type: 'INIT',
        history: messageHistory,
        clientsCount: clients.size,
      })
    )
  )

  // Broadcast updated presence to all users
  broadcast({
    type: 'PRESENCE',
    clientsCount: clients.size,
  })

  let rxBuffer = Buffer.alloc(0)

  socket.on('data', (chunk) => {
    rxBuffer = Buffer.concat([rxBuffer, chunk])
    const frames = decodeFrames(rxBuffer)

    for (const frame of frames) {
      if (frame.type === 'close') {
        socket.destroy()
        return
      }
      if (frame.type === 'ping') {
        socket.write(Buffer.from([0x8a, 0x00])) // pong
        continue
      }
      if (frame.type === 'text') {
        try {
          const msg = JSON.parse(frame.data)
          if (msg.type === 'CHAT' && msg.text && msg.user) {
            const cleanMsg = {
              id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              user: String(msg.user).slice(0, 16).trim() || 'anonymous',
              text: String(msg.text).slice(0, 160).trim(),
              timestamp: new Date().toTimeString().split(' ')[0],
              color: msg.color || '#38bdf8',
            }

            messageHistory.push(cleanMsg)
            if (messageHistory.length > MAX_HISTORY) {
              messageHistory.shift()
            }

            broadcast({
              type: 'NEW_CHAT',
              message: cleanMsg,
            })
          }
        } catch (err) {}
      }
    }
  })

  socket.on('close', () => {
    clients.delete(socket)
    broadcast({
      type: 'PRESENCE',
      clientsCount: clients.size,
    })
  })

  socket.on('error', () => {
    clients.delete(socket)
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Freedom Wall Zero-Dep Server] Listening on ws://0.0.0.0:${PORT}`)
})

// If started as main orchestrator (via npm start), spawn Vite preview natively
if (process.env.SPAWN_PREVIEW !== 'false') {
  const isWindows = process.platform === 'win32'
  const npxCmd = isWindows ? 'npx.cmd' : 'npx'

  console.log('[Web Server] Spawning vite preview on port 8000...')
  const preview = spawn(npxCmd, ['vite', 'preview', '--port', '8000', '--host'], {
    stdio: 'inherit',
    shell: true,
  })

  preview.on('error', (err) => {
    console.error('[Web Server Error]', err)
  })

  process.on('SIGINT', () => {
    preview.kill()
    process.exit()
  })
  process.on('SIGTERM', () => {
    preview.kill()
    process.exit()
  })
}
