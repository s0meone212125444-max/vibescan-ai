'use client'
import { motion } from 'framer-motion'

const cards = [
  {
    icon: '😰',
    headline: "You've Read It 47 Times. Still No Idea.",
    body: "Every message feels like a riddle. Does '😊' mean they like you, or are they just polite? You screenshot it. Send it to 5 friends. Everyone has a different opinion. You're MORE confused now.",
    trigger: 'UNCERTAINTY',
  },
  {
    icon: '⏰',
    headline: "3 Weeks. 247 Messages. Still 'Talking.'",
    body: "How long have you been texting? When does 'talking' become dating? Meanwhile, someone who ACTUALLY likes you is passing by because you're stuck in this limbo.",
    trigger: 'TIME WASTE',
  },
  {
    icon: '🤦',
    headline: "What If You're the 'Backup Plan'?",
    body: "They reply when THEY'RE bored. They cancel when something 'better' comes up. You're afraid to ask directly because you don't want to 'ruin it.' But what if it was never real to begin with?",
    trigger: 'EMBARRASSMENT',
  },
]

export default function PainPoints() {
  return (
    <section className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-[2.5rem] font-extrabold text-center mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          You Know Exactly What I&apos;m Talking About...
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-bg-card border border-white/5 rounded-2xl p-7 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="text-4xl">{card.icon}</span>
              <h3 className="text-xl font-bold mt-4 mb-3 tracking-tight">{card.headline}</h3>
              <p className="text-text-gray leading-relaxed text-[0.95rem]">{card.body}</p>
              <div className="mt-4 inline-block text-[10px] font-bold tracking-widest uppercase text-accent-red/70 bg-accent-red/10 px-2 py-1 rounded">
                {card.trigger}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition text */}
        <motion.p
          className="text-center text-text-gray italic mt-14 text-lg max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          There&apos;s a reason you&apos;re here. You already know something&apos;s wrong. You just need confirmation.
        </motion.p>
      </div>
    </section>
  )
}
