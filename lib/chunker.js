/**
 * Chunker: splits parsed text into semantic chunks
 * Detects unit/chapter/module headings
 */

const HEADING_PATTERNS = [
  /^(unit|chapter|module|section|part)\s*[\d\w]+[:\-.\s]/i,
  /^[\d]+[.\)]\s+[A-Z]/,
  /^[A-Z][A-Z\s]{5,}$/, // ALL CAPS headings
]

function isHeading(line) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.length < 3) return false
  return HEADING_PATTERNS.some(p => p.test(trimmed))
}

export function chunkSyllabus(text) {
  const lines = text.split('\n')
  const chunks = []
  let current = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (isHeading(trimmed)) {
      if (current) chunks.push(current)
      current = { heading: trimmed, content: [] }
    } else {
      if (!current) {
        current = { heading: 'General', content: [] }
      }
      current.content.push(trimmed)
    }
  }

  if (current) chunks.push(current)

  // If no chunks detected, treat entire text as one chunk
  if (chunks.length === 0) {
    chunks.push({ heading: 'Syllabus', content: lines.filter(l => l.trim()) })
  }

  return chunks
}
