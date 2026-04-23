/**
 * Pipeline: parse → chunk → extract → postprocess
 */

import { parseText, parsePDF } from '@/lib/parser'
import { chunkSyllabus } from '@/lib/chunker'
import { extractWithLLM } from '@/services/llm'
import { postprocess } from '@/lib/postprocessor'

export async function runPipeline({ text, pdfBuffer }) {
  // Step 1: Parse
  let rawText = ''
  if (pdfBuffer) {
    rawText = await parsePDF(pdfBuffer)
  } else if (text) {
    rawText = parseText(text)
  } else {
    throw new Error('No input provided')
  }

  if (rawText.length < 20) {
    throw new Error('Input too short to process')
  }

  // Step 2: Chunk
  const chunks = chunkSyllabus(rawText)

  // Step 3: LLM Extract (parallel for speed)
  const rawUnits = await Promise.all(
    chunks.map(chunk => extractWithLLM(chunk))
  )

  // Step 4: Postprocess
  const units = postprocess(rawUnits)

  return units
}
