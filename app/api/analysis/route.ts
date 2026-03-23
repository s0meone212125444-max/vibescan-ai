import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('order_id')

  if (!orderId) {
    return NextResponse.json({ error: 'Missing order_id' }, { status: 400 })
  }

  try {
    const { kv } = await import('@vercel/kv')
    const result = await kv.get(`analysis:${orderId}`)

    if (!result) {
      return NextResponse.json({ status: 'pending' }, { status: 202 })
    }

    const analysis = typeof result === 'string' ? JSON.parse(result) : result
    return NextResponse.json({ status: 'complete', analysis })
  } catch {
    // KV not available — return pending
    return NextResponse.json({ status: 'pending' }, { status: 202 })
  }
}
