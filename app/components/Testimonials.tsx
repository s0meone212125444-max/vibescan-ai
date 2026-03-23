'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Marcus T.',
    age: 22,
    role: 'College Student',
    initials: 'MT',
    score: 31,
    scoreColor: 'text-accent-red',
    text: "I was 100% CONVINCED she liked me. Ready to confess. VibeScan gave her a 31/100. I was devastated reading why... but it saved me from the most humiliating moment of my life. Two weeks later, she mentioned her boyfriend. Best $2.99 I ever spent.",
    highlight: null,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Sarah K.',
    age: 25,
    role: 'Marketing Manager',
    initials: 'SK',
    score: null,
    scoreColor: '',
    text: "The AI saw what I refused to see. He only replied when HE was bored. Never asked about my day. The analysis said: 'You're an option, not a priority.' I wasted 4 months. Never. Again. This should be mandatory before you catch feelings.",
    highlight: "You're an option, not a priority",
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'James P.',
    age: 20,
    role: 'Developer',
    initials: 'JP',
    score: 89,
    scoreColor: 'text-accent-green',
    text: "89/100. The AI said: 'She's interested. Ask her out THIS WEEK, not next month.' I sent the exact text VibeScan suggested. We went on a date 2 days later. We've been dating for 3 months now. I would've waited weeks and missed my window. $2.99 changed my life.",
    highlight: null,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Priya M.',
    age: 24,
    role: 'Designer',
    initials: 'PM',
    score: null,
    scoreColor: '',
    text: "All my friends said 'he's just shy, give him more time, guys are bad at texting.' VibeScan said 'He's not interested. His message frequency dropped 60% over 3 weeks. That's not shyness, that's loss of interest.' They were right. I stopped chasing. Met someone who ACTUALLY texts me first now.",
    highlight: '60% drop in frequency',
    gradient: 'from-purple-500 to-violet-500',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 px-5 bg-bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-[2.5rem] font-extrabold text-center mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          12,847 People Stopped Overthinking.
          <br className="hidden md:block" />
          <span className="text-text-gray"> Here&apos;s What They Discovered.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-bg-card border border-white/5 rounded-2xl p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Stars */}
              <div className="text-yellow-400 text-sm mb-3">⭐⭐⭐⭐⭐</div>

              {/* Score badge */}
              {t.score && (
                <div className={`inline-flex items-center gap-1.5 ${t.scoreColor} text-sm font-bold mb-3 bg-white/5 px-3 py-1 rounded-full`}>
                  {t.score}/100 {t.score >= 70 ? '✅' : '❌'}
                </div>
              )}

              <p className="text-text-gray text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>

              {t.highlight && (
                <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-lg px-3 py-2 text-xs text-accent-yellow font-medium mb-4">
                  ⚠️ &ldquo;{t.highlight}&rdquo;
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}, {t.age}</div>
                  <div className="text-xs text-text-muted">{t.role} • Verified Purchase ✓</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
