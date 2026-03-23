import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { textId, texts } = await request.json()

    if (!textId || !texts) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    // Save to KV as backup (in case sessionStorage is lost)
    try {
      const { kv } = await import('@vercel/kv')
      await kv.set(`texts:${textId}`, texts, { ex: 3600 }) // 1h TTL
    } catch {
      // KV not available locally — that's fine
    }

    return NextResponse.json({ saved: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
