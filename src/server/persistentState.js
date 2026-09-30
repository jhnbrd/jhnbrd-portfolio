import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export const MAX_CHAT_MESSAGES = 20

const STATE_FILE = join(process.cwd(), 'stats.json')

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return []

  return messages
    .filter((message) => (
      message
      && typeof message.id === 'string'
      && typeof message.user === 'string'
      && typeof message.text === 'string'
    ))
    .slice(-MAX_CHAT_MESSAGES)
}

export function loadPersistentState() {
  try {
    if (!existsSync(STATE_FILE)) {
      return { views: 0, messages: [] }
    }

    const parsed = JSON.parse(readFileSync(STATE_FILE, 'utf8'))
    return {
      views: Number.isFinite(parsed.views) ? Math.max(0, Math.floor(parsed.views)) : 0,
      messages: normalizeMessages(parsed.messages),
    }
  } catch (error) {
    console.error('[Persistent State] Failed to load stats.json:', error.message)
    return { views: 0, messages: [] }
  }
}

export function savePersistentState({ views, messages }) {
  const state = {
    views: Number.isFinite(views) ? Math.max(0, Math.floor(views)) : 0,
    messages: normalizeMessages(messages),
  }

  try {
    writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  } catch (error) {
    console.error('[Persistent State] Failed to save stats.json:', error.message)
  }

  return state
}
