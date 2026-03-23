import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('whop-signature') || ''

    // Verify signature if secret is set
    const secret = process.env.WHOP_WEBHOOK_SECRET
    if (secret && signature) {
      // Whop signature format: "t=timestamp,v1=signature"
      const parts: Record<string, string> = {}
      signature.split(',').forEach((p) => {
        const [key, val] = p.split('=')
        if (key && val) parts[key] = val
      })

      const timestamp = parts['t']
      const sig = parts['v1']

      if (timestamp && sig) {
        const payload = `${timestamp}.${body}`
        const expected = crypto
          .createHmac('sha256', secret)
          .update(payload)
          .digest('hex')

        const sigBuffer = Buffer.from(sig, 'hex')
        const expectedBuffer = Buffer.from(expected, 'hex')

        if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
          console.error('Whop webhook: Invalid signature')
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }
      }
    }

    const event = JSON.parse(body)

    if (event.action === 'payment.succeeded') {
      const paymentId = event.data?.id
      const textId = event.data?.metadata?.text_id

      if (paymentId) {
        // Store verified payment in KV
        try {
          const { kv } = await import('@vercel/kv')
          await kv.set(`payment:${paymentId}`, 'verified', { ex: 86400 }) // 24h TTL
          console.log(`Payment verified: ${paymentId}, textId: ${textId}`)
        } catch {
          console.warn('KV not available — payment stored in logs only')
        }
      }
    }

    // Always return 200 to prevent Whop retries
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Whop webhook error:', error)
    // Still return 200 to prevent retries
    return NextResponse.json({ received: true })
  }
}
