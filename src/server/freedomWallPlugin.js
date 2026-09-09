import { createHash } from 'node:crypto'

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

/**
 * Vite plugin that equips Vite dev server with zero-dependency native WebSocket
 * and view telemetry, eliminating the need to run a secondary background server.
 */
export function freedomWallPlugin() {
  const MAX_HISTORY = 8
  const messageHistory = []
  const clients = new Set()
  let profileViews = 124

  function broadcast(data) {
    const payload = JSON.stringify(data)
    const frame = encodeFrame(payload)
    for (const socket of clients) {
      if (!socket.destroyed) {
        try {
          socket.write(frame)
        } catch (err) {
          clients.delete(socket)
        }
      }
    }
  }

  return {
    name: 'vite-plugin-freedom-wall',
    configureServer(server) {
      // Mock API endpoint for profile views
      server.middlewares.use('/api/views', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        if (req.method === 'POST') {
          profileViews += 1
          res.end(JSON.stringify({ views: profileViews }))
          return
        }
        res.end(JSON.stringify({ views: profileViews }))
      })

      // WebSocket Upgrade handler on /ws
      server.httpServer?.on('upgrade', (req, socket) => {
        const url = req.url ? req.url.split('?')[0] : ''
        if (url !== '/ws') return // Hand off to Vite HMR or other upgrade handlers

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

        try {
          socket.write(responseHeaders.join('\r\n'))
        } catch (e) {
          socket.destroy()
          return
        }

        clients.add(socket)

        // Send initial history and presence to newly connected user
        try {
          socket.write(
            encodeFrame(
              JSON.stringify({
                type: 'INIT',
                history: messageHistory,
                clientsCount: clients.size,
              })
            )
          )
        } catch (e) {}

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
              try {
                socket.write(Buffer.from([0x8a, 0x00]))
              } catch (e) {}
              continue
            }
            if (frame.type === 'text') {
              try {
                const msg = JSON.parse(frame.data)
                if ((msg.type === 'CHAT' || msg.type === 'SEND_CHAT') && msg.text && msg.user) {
                  const cleanMsg = {
                    id: msg.id || `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                    user: String(msg.user).slice(0, 16).trim() || 'anonymous',
                    text: String(msg.text).slice(0, 160).trim(),
                    timestamp: new Date().toTimeString().split(' ')[0],
                    color: msg.color || '#34d399',
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
    },
  }
}
