'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type AnalyzeResult = {
  vibeScore: number
  diagnosis: string
  details: {
    whatYouSent: string
    howItReads: string
    whatToSendInstead: string
    betterReply1: string
    betterReply2: string
  }
}

const testimonials = [
  { name: 'Maya, 22', quote: 'I stopped spiraling and sent a better reply in two minutes.' },
  { name: 'Jordan, 19', quote: 'It called out the exact tone issue I could not see on my own.' },
  { name: 'Ari, 24', quote: 'Honestly feels like having a smart friend proofread every text.' },
]

const INITIAL_DETAILS: AnalyzeResult['details'] = {
  whatYouSent: 'We will break down your exact message once you paste or upload.',
  howItReads: 'You will get plain-English feedback with no fluff.',
  whatToSendInstead: 'You will get two better replies you can copy and send.',
  betterReply1: 'Hey, I had fun talking. You free later this week to catch up?',
  betterReply2: 'No stress if busy, but I would like to see you again. What day works best?',
}

export default function FrictionlessLanding() {
  const [input, setInput] = useState('')
  const [screenshotName, setScreenshotName] = useState('')
  const [analysis, setAnalysis] = useState<AnalyzeResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailError, setEmailError] = useState('')
  const CHECKOUT_URL = 'https://whop.com/checkout/plan_6ER2P6s6XzTty'
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const canAnalyze = useMemo(() => input.trim().length > 0 || screenshotName.length > 0, [input, screenshotName])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [])

  const runAnalysis = async (nextText: string, file?: File | null) => {
    if (!nextText.trim() && !file) return

    setError('')
    setIsLoading(true)

    try {
      const formData = new FormData()
      if (nextText.trim()) formData.append('texts', nextText.trim())
      if (file) formData.append('screenshot', file)
      formData.append('mode', 'partial')

      const response = await fetch('/api/analyze', { method: 'POST', body: formData })
      const data = await response.json()

      if (!response.ok) {
        setError(data?.error || 'Could not analyze right now. Try again.')
        return
      }

      setAnalysis({
        vibeScore: Number(data.vibeScore) || 0,
        diagnosis: data.diagnosis || 'Mixed energy. You need a clearer and warmer next message.',
        details: data.details || INITIAL_DETAILS,
      })
    } catch {
      setError('Could not analyze right now. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const onUpload: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setScreenshotName(file.name)
    await runAnalysis(input, file)
  }

  const onPaste: React.ClipboardEventHandler<HTMLTextAreaElement> = async (event) => {
    const clipboardItems = event.clipboardData?.items
    if (!clipboardItems) return

    for (const item of Array.from(clipboardItems)) {
      if (item.type.startsWith('image/')) {
        const pastedFile = item.getAsFile()
        if (pastedFile) {
          const file = new File([pastedFile], 'chat-screenshot.png', { type: pastedFile.type })
          setScreenshotName(file.name)
          await runAnalysis(input, file)
        }
        return
      }
    }
  }

  const onEmailUnlock: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setEmailError('Add your email to unlock your full breakdown.')
      return
    }

    setIsSendingEmail(true)
    setEmailError('')
    setIsUnlocked(true)

    try {
      await fetch('/api/unlock-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          vibe_score: analysis?.vibeScore || 0,
          diagnosis: analysis?.diagnosis || '',
          better_reply_1: details.betterReply1,
          better_reply_2: details.betterReply2,
        }),
      })
      setShowEmailModal(false)
    } catch {
      setEmailError('Unlocked already. Email send failed, try again in a minute.')
    } finally {
      setIsSendingEmail(false)
    }
  }

  const details = analysis?.details || INITIAL_DETAILS
  const stage = isUnlocked ? 'Full analysis unlocked' : analysis ? 'Preview ready' : isLoading ? 'Analyzing message' : 'Waiting for your message'

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-100px] h-80 w-80 rounded-full bg-[#7C5CFF]/35 blur-3xl" />
        <div className="absolute right-[-140px] top-[220px] h-[24rem] w-[24rem] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-[-150px] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-md px-4 pb-14 pt-6">
        <section className="space-y-4 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
          <div className="mb-3">
            <svg className="h-9 w-[170px]" viewBox="0 0 320 80" role="img" aria-label="VibeScan logo">
              <use href="/vibescan-logo-system.svg#logo-full" />
            </svg>
          </div>

          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85">
            Step: {stage}
          </p>

          <h1 className="text-3xl font-extrabold leading-tight text-white">
            Paste your text. See how it actually lands.
          </h1>
          <p className="text-sm text-white/80">
            This is your free preview. You get score + diagnosis first. Then choose to unlock full strategy for $3 or send it to your email.
          </p>

          <div className="rounded-2xl border border-white/20 bg-[#0A1228]/85 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
            <label htmlFor="vibe-input" className="mb-2 block text-sm font-semibold text-white">
              Paste your last message or screenshot
            </label>
            <textarea
              id="vibe-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onPaste={onPaste}
              placeholder="Paste your last message or screenshot"
              className="h-28 w-full resize-none rounded-xl border border-white/20 bg-[#070B16] px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#7C5CFF]"
            />

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-sm font-semibold text-white backdrop-blur-xl"
              >
                Upload screenshot
              </button>
              <button
                type="button"
                disabled={!canAnalyze || isLoading}
                onClick={() => runAnalysis(input)}
                className="rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#A18BFF] px-3 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(124,92,255,0.4)] disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : 'Run free preview'}
              </button>
            </div>

            {screenshotName ? <p className="mt-2 text-xs text-white/55">Attached: {screenshotName}</p> : null}
            {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
          </div>
        </section>

        <section className="mt-5 space-y-3">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-white/55">Vibe Score</p>
            <div className="mt-1 flex items-end gap-2">
              <p className="text-4xl font-black text-[#CFC3FF]">{analysis ? analysis.vibeScore : '--'}</p>
              <p className="pb-1 text-sm text-white/55">/100</p>
            </div>
            <p className="mt-2 text-sm text-white/80">
              {analysis ? analysis.diagnosis : 'Your score and plain-English diagnosis show up here in seconds.'}
            </p>
          </div>

          {[
            { title: 'What you sent', content: details.whatYouSent },
            { title: 'How it reads', content: details.howItReads },
            { title: 'What to send instead', content: details.whatToSendInstead },
          ].map((section) => (
            <div key={section.title} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-sm font-semibold text-white">{section.title}</p>
              <p className={`mt-2 text-sm text-white/80 ${isUnlocked ? '' : 'blur-sm select-none'}`}>
                {section.content}
              </p>
            </div>
          ))}

          {analysis ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={CHECKOUT_URL}
                  className="rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#A18BFF] px-3 py-3 text-center text-sm font-bold text-white shadow-[0_12px_30px_rgba(124,92,255,0.45)]"
                >
                  Unlock full analysis for $3
                </a>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(true)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-sm font-bold text-white backdrop-blur-xl"
                >
                  Send full breakdown to my email free
                </button>
              </div>
              <p className="text-center text-xs text-white/55">4,681 people checked their vibe this week</p>
            </>
          ) : null}
        </section>

        <section className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-wider text-white/55">People like you</p>
          <p className="mt-3 text-sm leading-relaxed text-white/85">&ldquo;{testimonials[testimonialIndex].quote}&rdquo;</p>
          <p className="mt-2 text-xs text-white/55">{testimonials[testimonialIndex].name}</p>
          <div className="mt-3 flex gap-1">
            {testimonials.map((entry) => (
              <span
                key={entry.name}
                className={`h-1.5 w-6 rounded-full ${entry.name === testimonials[testimonialIndex].name ? 'bg-[#A18BFF]' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </section>

        {showEmailModal ? (
          <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/65 p-4 sm:items-center">
            <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-[#0B1224] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.5)]">
              <h2 className="text-lg font-bold text-white">Send my full breakdown</h2>
              <p className="mt-1 text-sm text-white/75">
                Enter your email. We unlock this page right now and send your full analysis too.
              </p>
              <form onSubmit={onEmailUnlock} className="mt-4 space-y-3">
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/20 bg-[#070B16] px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#7C5CFF]"
                />
                {emailError ? <p className="text-xs text-red-400">{emailError}</p> : null}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="rounded-xl border border-white/20 bg-white/10 py-3 text-sm font-semibold text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#A18BFF] py-3 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {isSendingEmail ? 'Sending...' : 'Unlock now'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}
