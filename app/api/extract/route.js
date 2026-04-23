import { NextResponse } from 'next/server'
import { runPipeline } from '@/services/pipeline'

export const maxDuration = 30 // Vercel max for hobby plan

export async function POST(req) {
  try {
    const contentType = req.headers.get('content-type') || ''

    let text = null
    let pdfBuffer = null

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file')
      const textInput = formData.get('text')

      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer()
        pdfBuffer = Buffer.from(arrayBuffer)
      }
      if (textInput) text = textInput
    } else {
      const body = await req.json()
      text = body.text
    }

    const units = await runPipeline({ text, pdfBuffer })

    return NextResponse.json({ success: true, units })
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || 'Processing failed' },
      { status: 400 }
    )
  }
}
