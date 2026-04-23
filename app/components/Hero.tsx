'use client'
import { motion } from 'framer-motion'

const TRY_URL = '/try'

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 bg-text-gray rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </span>
  )
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] md:w-[320px]">
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border-2 border-white/10 bg-black p-3 shadow-2xl shadow-primary/20">
        {/* Screen */}
        <div className="rounded-[2rem] bg-bg-dark overflow-hidden">
          {/* Status bar */}
          <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[10px] text-text-gray">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-2 border border-text-gray rounded-sm relative">
                <div className="absolute inset-0.5 bg-accent-green rounded-sm" style={{ width: '60%' }} />
              </div>
            </div>
          </div>
          {/* Chat header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">J</div>
            <div>
              <div className="text-sm font-semibold text-text-white">Jordan</div>
              <div className="text-[10px] text-text-gray">Active 6h ago</div>
            </div>
          </div>
          {/* Messages */}
          <div className="p-3 space-y-2 min-h-[220px]">
            {/* Sent messages */}
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white text-xs rounded-2xl rounded-br-md px-3 py-1.5 max-w-[75%]">
                Hey! How was your weekend? 😊
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white text-xs rounded-2xl rounded-br-md px-3 py-1.5 max-w-[75%]">
                Did you end up going to that concert?
              </div>
            </div>
            {/* Reply - delayed, short */}
            <div className="flex justify-start pt-4">
              <div className="bg-bg-elevated text-text-white text-xs rounded-2xl rounded-bl-md px-3 py-1.5">
                K
              </div>
            </div>
            {/* Timestamp */}
            <div className="text-center text-[9px] text-text-muted">Seen 6 hours ago</div>
            {/* AI overlay */}
            <motion.div
              className="mt-2 border border-accent-red/40 bg-accent-red/10 rounded-xl p-2.5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                <span className="text-accent-red text-[10px] font-bold uppercase tracking-wider">Low Interest Detected</span>
              </div>
              <div className="text-[9px] text-text-gray">
                AI analyzing<TypingDots />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-bg-dark to-bg-dark" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 md:py-28 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              <span className="text-xs text-primary font-medium">487 people analyzing right now</span>
            </div>

            <h1 className="text-4xl md:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-6">
              Stop Wasting Months on Someone Who&apos;s{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                &apos;Just Being Nice&apos;
              </span>
            </h1>

            <p className="text-lg md:text-xl text-text-gray leading-relaxed mb-8 max-w-lg">
              AI analyzes your text messages in 30 seconds and tells you—with brutal honesty—if they&apos;re texting you back... or just being polite.
            </p>

            {/* CTA */}
            <motion.a
              href={TRY_URL}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: ['0 10px 40px rgba(139,92,246,0.3)', '0 10px 40px rgba(139,92,246,0.5)', '0 10px 40px rgba(139,92,246,0.3)'] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            >
              Try for Free in 30 Seconds
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>

            {/* Hover social proof */}
            <p className="mt-4 text-sm text-text-muted italic">
              You&apos;ve already spent 3 hours overthinking this. Try one scan free and decide after.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-6 text-xs text-text-gray">
              <span className="flex items-center gap-1">🔒 100% Anonymous</span>
              <span className="flex items-center gap-1">⚡ 30-Second Results</span>
              <span className="flex items-center gap-1">💳 One-Time Payment</span>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
