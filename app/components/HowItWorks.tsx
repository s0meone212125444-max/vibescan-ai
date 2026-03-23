'use client'
import { motion } from 'framer-motion'

const CHECKOUT_URL = 'https://whop.com/checkout/plan_6ER2P6s6XzTty'

const steps = [
  {
    num: '01',
    title: 'Copy & Paste Your Conversation',
    body: 'No screenshots. No app downloads. Just copy the last 10-15 messages and paste them in.',
    micro: 'Takes 8 seconds ⏱️',
    visual: (
      <div className="bg-bg-dark rounded-xl p-4 border border-white/5 text-sm">
        <div className="flex items-center gap-2 mb-2 text-text-muted text-xs">
          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px] font-medium">PASTE</span>
          Messages
        </div>
        <div className="space-y-1.5 text-text-gray text-xs">
          <p>Hey! How was your day? 💕</p>
          <p className="text-text-muted">good</p>
          <p>Want to hang out this weekend?</p>
          <p className="text-text-muted">maybe idk</p>
        </div>
      </div>
    ),
  },
  {
    num: '02',
    title: 'AI Analyzes 47 Hidden Signals',
    body: "While you see words, AI sees PATTERNS. Response cadence. Engagement depth. Reciprocity ratios. The same signals therapists charge $200/hour to explain.",
    micro: null,
    visual: (
      <div className="bg-bg-dark rounded-xl p-4 border border-white/5 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-text-gray">Response time</span>
          <span className="text-accent-red font-mono">Avg 6.5h ⚠️</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-gray">Question ratio</span>
          <span className="text-accent-red font-mono">3:0 (one-sided)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-gray">Emoji reciprocity</span>
          <span className="text-accent-yellow font-mono">89% from you</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-gray">Pattern</span>
          <span className="text-accent-red font-mono">Breadcrumbing</span>
        </div>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Get Your Brutally Honest Score + Next Steps',
    body: "No sugarcoating. No vague 'maybe they're just busy.' Just truth + actionable advice. In 30 seconds, you'll know if you should shoot your shot or move on.",
    micro: 'Results look like this ↓',
    visual: (
      <div className="bg-bg-dark rounded-xl p-4 border border-white/5 text-center">
        <div className="text-4xl font-black text-accent-red">23<span className="text-lg text-text-muted">/100</span></div>
        <div className="text-accent-red text-xs font-bold mt-1">❌ Low Interest</div>
        <div className="text-[10px] text-text-gray mt-2">Stop texting. Here&apos;s why →</div>
      </div>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-5 bg-bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-[2.5rem] font-extrabold text-center mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get The Answer You&apos;ve Been Losing Sleep Over
        </motion.h2>
        <p className="text-text-gray text-center mb-14 text-lg">3 steps. 30 seconds. Total clarity.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-bg-card border border-white/5 rounded-2xl p-7 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="text-primary font-black text-sm mb-3 tracking-widest">{step.num}</div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{step.title}</h3>
              <p className="text-text-gray text-sm leading-relaxed mb-4 flex-1">{step.body}</p>
              {step.micro && <p className="text-xs text-text-muted mb-3">{step.micro}</p>}
              {step.visual}
            </motion.div>
          ))}
        </div>

        {/* CTA #2 */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-primary/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            I Need To Know — $2.99 →
          </motion.a>
          <p className="text-text-muted text-sm mt-3">⚡ 2,847 analyses in the last 24 hours</p>
        </motion.div>
      </div>
    </section>
  )
}
