/**
 * LLM Service: calls Claude API or falls back to mock
 */

const SYSTEM_PROMPT = `You are an expert academic syllabus parser.
Given a section of a syllabus, extract a structured JSON representation.
Identify units, topics, and subtopics. Maintain logical hierarchy.
Remove redundancy. Return ONLY valid JSON, no prose, no markdown fences.

Return format:
{
  "unit": "Unit name here",
  "topics": [
    {
      "name": "Topic name",
      "subtopics": ["subtopic 1", "subtopic 2"]
    }
  ]
}`

export async function extractWithLLM(chunk) {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    return mockExtract(chunk)
  }

  try {
    const userContent = `Extract structured topics from this syllabus section:\n\nHeading: ${chunk.heading}\n\nContent:\n${chunk.content.join('\n')}`

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userContent }],
      }),
    })

    if (!res.ok) throw new Error(`API error ${res.status}`)

    const data = await res.json()
    const text = data.content?.[0]?.text || ''
    const cleaned = text.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    return mockExtract(chunk)
  }
}

function mockExtract(chunk) {
  const content = chunk.content
  const topics = []

  // Group lines into topics (every 3-5 lines = 1 topic)
  let i = 0
  while (i < content.length) {
    const topicLine = content[i]?.trim()
    if (!topicLine) { i++; continue }

    const subtopics = []
    for (let j = i + 1; j < Math.min(i + 4, content.length); j++) {
      const sub = content[j]?.trim()
      if (sub && !sub.match(/^(unit|chapter|module)/i)) {
        subtopics.push(sub)
      }
    }

    topics.push({
      name: topicLine,
      subtopics: subtopics.slice(0, 3),
    })

    i += subtopics.length + 1
  }

  return {
    unit: chunk.heading,
    topics: topics.slice(0, 6),
  }
}
