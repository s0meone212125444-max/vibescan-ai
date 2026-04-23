import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const GROQ_MODEL_CANDIDATES = [
  process.env.GROQ_MODEL,
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
].filter((model): model is string => Boolean(model && model.trim()))

const SYSTEM_PROMPT = `You are a brutally honest relationship psychologist with 20 years of experience analyzing text-based communication patterns.

Analyze this text conversation and determine if Person B is romantically interested in Person A.

Analyze for these specific signals:

POSITIVE SIGNALS (interest):
- Asks questions back (shows curiosity about Person A)
- Uses exclamation marks, emojis, playful language
- Responds quickly (within 1-2 hours during waking hours)
- Initiates conversations sometimes
- Shares personal details unprompted
- Uses "we" or makes future plans
- Mirrors Person A's texting style
- Sends long responses (effort indicator)
- Laughs at Person A's jokes (even bad ones)
- Remembers small details from previous conversations

NEGATIVE SIGNALS (not interested):
- One-word responses ("K", "Cool", "Yeah")
- Takes 6+ hours to respond consistently
- Never initiates conversation
- Doesn't ask questions back
- Mentions other romantic interests
- Uses sibling language ("like a brother/sister")
- Keeps conversation surface-level only
- Ends conversations quickly
- Doesn't laugh at jokes or engage with humor
- Forgets things Person A mentioned

RED FLAGS:
- Breadcrumbing (occasional interest to keep Person A hooked)
- Only responds late at night
- Conversation only happens when they need something
- Explicitly mentions being busy when asked to hang out
- Talks about other people they're interested in

Provide your analysis in this EXACT JSON format:
{
  "score": 0-100 (0 = definitely not interested, 100 = definitely interested),
  "verdict": "One brutally honest sentence summary",
  "positive_signals": ["signal 1", "signal 2", ...],
  "negative_signals": ["signal 1", "signal 2", ...],
  "red_flags": ["flag 1", "flag 2", ...] or [],
  "advice": "Specific actionable advice - either a suggested next text message, or clear advice to move on with reasoning"
}

Be BRUTALLY honest. If it's bad, say it clearly. People need truth, not false hope.
If the score is below 40, your verdict and advice should be direct about moving on.
If the score is 70+, give encouragement and specific next steps.

RESPOND ONLY WITH VALID JSON. No other text.`

type AnalyzePayload = {
  texts: string
  mode: 'partial' | 'full'
}

function toStringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

type RawAnalysis = {
  score?: number
  vibeScore?: number
  verdict?: string
  diagnosis?: string
  advice?: string
  positive_signals?: unknown[]
  negative_signals?: unknown[]
}

function normalizePartialAnalysis(raw: RawAnalysis) {
  const score = Math.max(0, Math.min(100, Number(raw?.score ?? raw?.vibeScore ?? 0)))
  const diagnosis = toStringValue(raw?.verdict || raw?.diagnosis) || 'Mixed signals. Tighten your tone and be clear.'
  const advice = toStringValue(raw?.advice) || 'Send one clear message with intent and stop overexplaining.'
  const positives = Array.isArray(raw?.positive_signals)
    ? raw.positive_signals.filter((item): item is string => typeof item === 'string')
    : []
  const negatives = Array.isArray(raw?.negative_signals)
    ? raw.negative_signals.filter((item): item is string => typeof item === 'string')
    : []

  const whatYouSent = positives.length
    ? `Strongest signal: ${String(positives[0])}.`
    : 'Your message carries some effort, but the intention is not fully clear.'
  const howItReads = negatives.length
    ? `It can read as ${String(negatives[0]).toLowerCase()}.`
    : diagnosis

  return {
    vibeScore: score,
    diagnosis,
    details: {
      whatYouSent,
      howItReads,
      whatToSendInstead: advice,
      betterReply1: 'Hey, I had fun talking with you. You free this week to hang out?',
      betterReply2: 'No pressure, but I am interested. Want to pick a time that works for both of us?',
    },
  }
}

async function parseRequestPayload(request: Request): Promise<AnalyzePayload> {
  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const textValue = toStringValue(formData.get('texts') ?? formData.get('text'))
    const screenshot = formData.get('screenshot')
    const mode = (toStringValue(formData.get('mode')) === 'full' ? 'full' : 'partial') as 'partial' | 'full'

    if (textValue.trim()) return { texts: textValue.trim(), mode }
    if (screenshot instanceof File) {
      const screenshotPrompt = `A user uploaded a screenshot of a text conversation named "${screenshot.name}". Provide a best-effort emotional analysis from likely texting behavior with transparent uncertainty.`
      return { texts: screenshotPrompt, mode }
    }

    return { texts: '', mode }
  }

  const body = await request.json().catch(() => ({}))
  const texts = toStringValue(body?.texts || body?.text).trim()
  const mode = body?.mode === 'full' ? 'full' : 'partial'
  return { texts, mode }
}

export async function POST(request: Request) {
  try {
    const { texts, mode } = await parseRequestPayload(request)

    if (!texts) {
      return NextResponse.json({ error: 'No conversation provided' }, { status: 400 })
    }

    if (texts.length < 100 || texts.length > 5000) {
      return NextResponse.json({ error: 'Text must be 100-5000 characters' }, { status: 400 })
    }

    // TODO: Add Whop payment verification here when WHOP_API_KEY is available
    // const whopApiKey = process.env.WHOP_API_KEY
    // if (whopApiKey && payment_id) {
    //   const res = await fetch(`https://api.whop.com/api/v2/payments/${payment_id}`, {
    //     headers: { Authorization: `Bearer ${whopApiKey}` }
    //   })
    //   const payment = await res.json()
    //   if (payment.status !== 'succeeded') return NextResponse.json({ error: 'Payment not verified' }, { status: 401 })
    // }

    let completion: Awaited<ReturnType<typeof groq.chat.completions.create>> | null = null
    let lastError: unknown = null

    for (const model of GROQ_MODEL_CANDIDATES) {
      try {
        completion = await groq.chat.completions.create({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `TEXT CONVERSATION:\n${texts}` },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        })
        break
      } catch (error) {
        lastError = error
        const code = typeof error === 'object' && error && 'code' in error ? String((error as { code?: string }).code) : ''
        const message = typeof error === 'object' && error && 'message' in error ? String((error as { message?: string }).message) : ''
        const shouldTryNextModel = code === 'model_decommissioned' || message.toLowerCase().includes('decommissioned')
        if (!shouldTryNextModel) throw error
      }
    }

    if (!completion) {
      throw lastError || new Error('No available Groq model')
    }

    const content = completion.choices[0]?.message?.content
    if (!content) {
      return NextResponse.json({ error: 'AI analysis failed. Please try again.' }, { status: 500 })
    }

    const analysis = JSON.parse(content)

    // TODO: Store in Vercel KV when available
    // const { kv } = await import('@vercel/kv')
    // await kv.set(`analysis:${payment_id}`, JSON.stringify(analysis), { ex: 86400 })

    if (mode === 'partial') {
      return NextResponse.json(normalizePartialAnalysis(analysis))
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis temporarily unavailable. Please try again in a moment.' },
      { status: 500 }
    )
  }
}
