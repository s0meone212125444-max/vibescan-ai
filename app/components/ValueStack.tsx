'use client'
import { motion } from 'framer-motion'

const benefits = [
  {
    title: 'Interest Score (0-100)',
    body: 'A clear, unambiguous number. No more guessing.',
    alt: 'Relationship coach: $150-300/session ❌',
    vibe: '$2.99 ✅',
    save: 'Save $147',
  },
  {
    title: 'Every Signal Decoded',
    body: '✓ Response time patterns\n✓ Message length ratios\n✓ Question reciprocity\n✓ Emoji usage psychology\n✓ 43 more signals humans miss',
    alt: 'Dating book: $19.99 (+ 6 hours reading) ❌',
    vibe: '$2.99 ✅',
    save: 'Save $17',
  },
  {
    title: 'Red Flag Detection',
    body: 'Spot breadcrumbing, ghosting patterns, one-sided effort BEFORE you waste more time.',
    alt: 'Learning from painful experience: Priceless ❌',
    vibe: '$2.99 ✅',
    save: 'Save your heart',
  },
  {
    title: 'Exact Next Steps',
    body: "Not just diagnosis. We tell you EXACTLY what to text next. Or when to stop texting entirely.",
    alt: 'Therapy: $200/session ❌',
    vibe: '$2.99 ✅',
    save: 'Save $197',
  },
]

export default function ValueStack() {
  return (
    <section className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-[2.5rem] font-extrabold text-center mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What You Get For Less Than A Coffee
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              className="bg-bg-card border border-white/5 rounded-2xl p-7 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-lg font-bold mb-2">{b.title}</h3>
              <p className="text-text-gray text-sm leading-relaxed whitespace-pre-line mb-4">{b.body}</p>
              <div className="space-y-1 text-xs">
                <div className="text-text-muted line-through">{b.alt}</div>
                <div className="text-accent-green font-bold">VibeScan: {b.vibe}</div>
              </div>
              <div className="mt-3 inline-block text-[10px] font-bold tracking-widest uppercase text-accent-green bg-accent-green/10 px-2 py-1 rounded">
                {b.save}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value stack summary */}
        <motion.div
          className="max-w-md mx-auto mt-14 bg-bg-card border border-primary/30 rounded-2xl p-7 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-text-gray mb-3 font-medium">Total Value Breakdown</p>
          <div className="space-y-1 text-sm text-text-gray">
            <div className="flex justify-between"><span>Relationship Coach</span><span>$250</span></div>
            <div className="flex justify-between"><span>Dating Course</span><span>$99</span></div>
            <div className="flex justify-between"><span>Your Time (5 hours)</span><span>$75</span></div>
            <div className="flex justify-between"><span>Potential Heartbreak</span><span className="italic">Priceless</span></div>
          </div>
          <div className="border-t border-white/10 my-4" />
          <div className="flex justify-between font-bold text-text-white">
            <span>Total Value</span><span>$424+</span>
          </div>
          <motion.a
            href="https://whop.com/checkout/plan_6ER2P6s6XzTty"
            className="block mt-4 bg-gradient-to-r from-primary to-secondary rounded-xl py-4 px-4 hover:brightness-110 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl font-black">Get All This — $2.99</div>
            <div className="text-xs opacity-80">You save $421.01 (99.3%) →</div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
