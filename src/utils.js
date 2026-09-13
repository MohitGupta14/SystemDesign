export function bestFreeIndex(resources) {
  let idx = resources.findIndex(r => r.status === 'free' && r.conf === 'verified')
  if (idx === -1) idx = resources.findIndex(r => r.status === 'free')
  return idx
}

export function pillLabel(status) {
  return status === 'free' ? 'FREE' : status === 'paid' ? 'PAID' : '?'
}

export const COVER_KEY = 'system-design-atlas-cover-v1'

export function loadCovered() {
  try {
    const raw = localStorage.getItem(COVER_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

export function saveCovered(names) {
  try {
    localStorage.setItem(COVER_KEY, JSON.stringify(names))
  } catch (e) {
    /* private mode / quota — ignore */
  }
}