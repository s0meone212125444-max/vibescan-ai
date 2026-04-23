import { NextResponse } from 'next/server'
import { renderUnlockEmail } from '@/lib/email/vibeUnlockTemplate'

type UnlockBody = {
  email?: string
  first_name?: string
  vibe_score?: number
  diagnosis?: string
  better_reply_1?: string
  better_reply_2?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UnlockBody
    const email = body.email?.trim()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const payload = {
      first_name: body.first_name,
      vibe_score: body.vibe_score ?? 0,
      diagnosis: body.diagnosis || 'Mixed energy. Your next reply needs more clarity and warmth.',
      better_reply_1:
        body.better_reply_1 || 'I liked talking with you. Want to lock in a time this week?',
      better_reply_2:
        body.better_reply_2 || 'No rush, but I am interested. What day works best for you?',
    }

    const emailContent = renderUnlockEmail(payload)

    // Replace with your email provider call.
    console.log('Unlock email payload', {
      to: email,
      subject: emailContent.subject,
      htmlPreviewLength: emailContent.html.length,
      textPreviewLength: emailContent.text.length,
    })

    return NextResponse.json({ ok: true, queued: true })
  } catch (error) {
    console.error('unlock-email error', error)
    return NextResponse.json({ error: 'Could not send email' }, { status: 500 })
  }
}
