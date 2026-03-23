import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('paddle-signature') || ''

    // Verify signature
    const secret = process.env.PADDLE_WEBHOOK_SECRET
    if (secret) {
      // Parse Paddle signature (ts=timestamp;h1=hash)
      const parts = Object.fromEntries(
        signature.split(';').map((p) => p.split('=') as [string, string])
      )
      const ts = parts['ts']
      const h1 = parts['h1']

      if (ts && h1) {
        const payload = `${ts}:${body}`
        const computed = crypto
          .createHmac('sha256', secret)
          .update(payload)
          .digest('hex')

        if (computed !== h1) {
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }
      }
    }

    const event = JSON.parse(body)

    if (event.event_type === 'transaction.completed') {
      const transactionId = event.data?.id
      const passthrough = event.data?.custom_data?.text_id || event.data?.passthrough

      if (transactionId) {
        // Store that this order is valid
        try {
          const { kv } = await import('@vercel/kv')
          await kv.set(`order:${transactionId}`, JSON.stringify({
            valid: true,
            textId: passthrough,
            email: event.data?.customer?.email,
          }), { ex: 86400 })
        } catch {
          // KV not available in dev
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch {
    // Always return 200 to Paddle to avoid retries
    return NextResponse.json({ received: true })
  }
}
