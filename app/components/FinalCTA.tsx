'use client'
import { motion } from 'framer-motion'

const CHECKOUT_URL = 'https://whop.com/checkout/plan_6ER2P6s6XzTty'

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 px-5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-primary/5 to-bg-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-[2.5rem] font-extrabold mb-10 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          You&apos;ve Scrolled This Far.
          <br />
          <span className="text-text-gray">You Already Know You Need This.</span>
        </motion.h2>

        {/* Negative future pacing */}
        <motion.div
          className="bg-bg-card border border-accent-red/20 rounded-2xl p-7 mb-6 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-text-gray text-sm mb-3 font-medium">You can close this page. Go back to:</p>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>• Asking your friends (again)</li>
            <li>• Reading their messages for the 48th time</li>
            <li>• Wondering if that emoji meant something</li>
            <li>• Wasting another week in limbo</li>
            <li>• Googling &ldquo;does taking 6 hours to reply mean they&apos;re not interested?&rdquo;</li>
            <li>• Staying up until 2am overthinking</li>
          </ul>
        </motion.div>

        {/* Positive future pacing */}
        <motion.div
          className="bg-bg-card border border-accent-green/20 rounded-2xl p-7 mb-10 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-accent-green text-sm mb-3 font-bold">OR... spend $2.99 and in 30 seconds:</p>
          <ul className="space-y-2 text-sm text-text-gray">
            <li>✓ Know EXACTLY where you stand</li>
            <li>✓ Get the closure you&apos;ve been craving</li>
            <li>✓ Either shoot your shot with confidence, or move on in peace</li>
            <li>✓ Stop checking your phone every 5 minutes</li>
            <li>✓ Sleep tonight without wondering</li>
            <li>✓ Reclaim your mental energy</li>
          </ul>
          <p className="text-text-muted text-sm italic mt-4">
            What&apos;s 30 more seconds of uncertainty worth to you?
          </p>
        </motion.div>

        {/* Massive CTA */}
        <motion.a
          href={CHECKOUT_URL}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-xl md:text-2xl px-10 py-5 rounded-2xl shadow-2xl shadow-primary/40"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          animate={{
            boxShadow: [
              '0 20px 60px rgba(139,92,246,0.3)',
              '0 20px 60px rgba(139,92,246,0.6)',
              '0 20px 60px rgba(139,92,246,0.3)',
            ],
          }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          Get My Answer Now — $2.99
          <span className="text-2xl">→</span>
        </motion.a>

        {/* Below CTA trust */}
        <div className="mt-6 space-y-2 text-sm text-text-muted">
          <p>⚡ 2,847 people got clarity in the last 24 hours</p>
          <p>💳 One-time payment • No subscription • Results in 30 seconds</p>
          <p>🔒 100% anonymous • No data stored</p>
        </div>

        {/* Guarantee */}
        <div className="mt-8 inline-block bg-bg-card border border-white/10 rounded-xl px-6 py-4">
          <p className="text-sm font-bold mb-1">30-Second Money-Back Guarantee</p>
          <p className="text-xs text-text-muted">
            If your analysis doesn&apos;t load in 30 seconds, email us. Instant refund. No questions.
          </p>
        </div>

        {/* Live counter */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-text-gray">
          <span className="w-2.5 h-2.5 bg-accent-red rounded-full animate-pulse" />
          487 people analyzing right now
        </div>
      </div>
    </section>
  )
}
