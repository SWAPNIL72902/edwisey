/**
 * Parser: extracts raw text from syllabus input
 * Handles both plain text and PDF (buffer)
 */

export function parseText(raw) {
  // Normalize line endings and trim excessive whitespace
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function parsePDF(buffer) {
  try {
    const pdfParse = (await import('pdf-parse')).default
    const data = await pdfParse(buffer)
    return parseText(data.text)
  } catch {
    throw new Error('Failed to parse PDF. Please try pasting text instead.')
  }
}
