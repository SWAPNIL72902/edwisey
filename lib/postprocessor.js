/**
 * Post-processor: cleans and deduplicates extracted structure
 */

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function cleanText(str) {
  return str
    .replace(/^[\s\-\*\•\·\d]+\.?\s*/,'')
    .replace(/[:\-]+$/, '')
    .trim()
}

function dedupe(arr) {
  const seen = new Set()
  return arr.filter(item => {
    const key = item.toLowerCase().trim()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function postprocess(units) {
  if (!Array.isArray(units)) return []

  return units
    .filter(u => u && u.unit)
    .map(u => ({
      unit: capitalize(cleanText(u.unit || '')),
      topics: Array.isArray(u.topics)
        ? u.topics
            .filter(t => t && t.name)
            .map(t => ({
              name: capitalize(cleanText(t.name || '')),
              subtopics: dedupe(
                Array.isArray(t.subtopics)
                  ? t.subtopics.map(s => capitalize(cleanText(String(s))))
                  : []
              ).filter(Boolean),
            }))
            .filter(t => t.name)
        : [],
    }))
    .filter(u => u.unit)
}
