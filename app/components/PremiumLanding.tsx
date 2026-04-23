'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PremiumLanding() {
  const CHECKOUT_URL = 'https://whop.com/checkout/plan_6ER2P6s6XzTty'
  const storyCards = [
    {
      label: 'Story 01',
      title: 'You send a text and instantly overthink it',
      body: 'You replay tone, punctuation, and timing in your head. VibeScan gives you a read in seconds so your brain can calm down.',
    },
    {
      label: 'Story 02',
      title: 'You get a score and a diagnosis fast',
      body: 'Not vague feedback. You get a clear score, a one-line diagnosis, and where your message is helping or hurting.',
    },
    {
      label: 'Story 03',
      title: 'You choose your next move with confidence',
      body: 'Unlock full strategy for $3 or drop your email and get your full breakdown sent instantly. No pressure.',
    },
  ]

  const testimonials = [
    {
      quote: 'I was seconds from sending a needy follow-up. VibeScan stopped me and gave me a calmer message.',
      name: 'Nora, 21',
      result: 'Avoided a double text spiral',
    },
    {
      quote: 'It felt like my smart friend grabbed my phone and fixed my tone before I embarrassed myself.',
      name: 'Leah, 19',
      result: 'Confidence went up immediately',
    },
    {
      quote: 'I paid the $3 after the free preview because the diagnosis was scary accurate.',
      name: 'Imani, 23',
      result: 'Got clarity in under 2 minutes',
    },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-white">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-[-80px] h-80 w-80 rounded-full bg-[#7C5CFF]/35 blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-120px] top-[180px] h-[22rem] w-[22rem] rounded-full bg-cyan-400/20 blur-3xl"
          animate={{ y: [0, -18, 0], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-120px] left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-5">
              <svg className="h-10 w-[180px]" viewBox="0 0 320 80" role="img" aria-label="VibeScan logo">
                <use href="/vibescan-logo-system.svg#logo-full" />
              </svg>
            </div>

            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
              4,681 people checked their vibe this week
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              You are not crazy.
              <span className="block bg-gradient-to-r from-[#BDA9FF] to-cyan-200 bg-clip-text text-transparent">
                Your text tone does matter.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-base text-white/80 sm:text-lg">
              VibeScan reads your message like the person on the other side sees it. Try one scan free. Upgrade only if you want the full playbook.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/try"
                className="rounded-2xl bg-gradient-to-r from-[#7C5CFF] to-[#A18BFF] px-6 py-4 text-center text-base font-bold text-white shadow-[0_14px_40px_rgba(124,92,255,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Try for Free in 30 Seconds
              </Link>
              <a
                href={CHECKOUT_URL}
                className="rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-center text-base font-semibold text-white backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5"
              >
                Unlock full analysis for $3
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/75">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Anonymous by default</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Preview in under 2 seconds</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">One-time $3 unlock</span>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <motion.div
              className="rounded-[2rem] border border-white/15 bg-[#0B1224]/85 p-4 shadow-inner shadow-white/5"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-4 flex items-center justify-between text-xs text-white/70">
                <span>9:41</span>
                <span>VibeScan Live</span>
              </div>
              <div className="space-y-3">
                <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-sm bg-[#7C5CFF] px-3 py-2 text-sm">
                  You free this week? I want to see you.
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-sm text-white/85">
                  maybe. this week is packed rn.
                </div>
                <motion.div
                  className="rounded-2xl border border-[#7C5CFF]/35 bg-[#7C5CFF]/15 p-3"
                  animate={{ boxShadow: ['0 0 0 rgba(124,92,255,0)', '0 0 36px rgba(124,92,255,0.35)', '0 0 0 rgba(124,92,255,0)'] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  <p className="text-xs uppercase tracking-wider text-[#CFC3FF]">Vibe score</p>
                  <p className="mt-1 text-3xl font-black text-[#DCD3FF]">43 / 100</p>
                  <p className="mt-1 text-sm text-white/85">
                    They are open, but your next message needs calmer confidence and one clear ask.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            <p className="mt-4 text-sm text-white/70">
              First preview is free. Full strategy unlock comes only after value is shown.
            </p>
          </motion.div>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {storyCards.map((card) => (
            <motion.article
              key={card.label}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#CFC3FF]">{card.label}</p>
              <h2 className="mt-2 text-lg font-bold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{card.body}</p>
            </motion.article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl sm:p-7">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#CFC3FF]">Social proof</p>
              <h3 className="text-2xl font-black text-white">What users say after one scan</h3>
            </div>
            <p className="text-sm text-white/70">Real outcomes. Fast decisions. Better texts.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((entry) => (
              <motion.article
                key={entry.name}
                className="rounded-2xl border border-white/15 bg-[#0B1224]/70 p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <p className="text-sm leading-relaxed text-white/85">&ldquo;{entry.quote}&rdquo;</p>
                <p className="mt-3 text-xs font-semibold text-[#CFC3FF]">{entry.result}</p>
                <p className="mt-1 text-xs text-white/65">{entry.name}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/20 bg-gradient-to-r from-[#7C5CFF]/25 to-cyan-400/20 p-6 text-center backdrop-blur-xl">
          <h4 className="text-2xl font-black text-white sm:text-3xl">
            Get the free preview first.
            <span className="block text-[#DED5FF]">Then choose your next move.</span>
          </h4>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            If the preview helps, unlock the full strategy for $3. If not, leave your email and get your breakdown to revisit later.
          </p>
          <div className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
            <Link href="/try" className="flex-1 rounded-2xl bg-white px-5 py-3 text-center font-bold text-[#111827]">
              Start free scan
            </Link>
            <a href={CHECKOUT_URL} className="flex-1 rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-center font-semibold text-white">
              Unlock now for $3
            </a>
          </div>
        </section>
      </section>
    </main>
  )
}
