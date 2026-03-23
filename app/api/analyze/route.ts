import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

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

export async function POST(request: Request) {
  try {
    const { texts } = await request.json()

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

    // Call Groq AI
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `TEXT CONVERSATION:\n${texts}` },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      return NextResponse.json({ error: 'AI analysis failed. Please try again.' }, { status: 500 })
    }

    const analysis = JSON.parse(content)

    // TODO: Store in Vercel KV when available
    // const { kv } = await import('@vercel/kv')
    // await kv.set(`analysis:${payment_id}`, JSON.stringify(analysis), { ex: 86400 })

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis temporarily unavailable. Please try again in a moment.' },
      { status: 500 }
    )
  }
}
