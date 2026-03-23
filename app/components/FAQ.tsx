'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What if the AI is wrong about my situation?',
    a: "Here's the brutal truth: If you're unsure enough to use VibeScan, the answer is probably what you don't want to hear. Our AI has analyzed 10M+ conversations with 87% accuracy based on 6-month follow-ups. But here's what matters more—people who are TRULY interested make it OBVIOUS. If you're analyzing texts, they're already not trying hard enough. The AI just confirms what your gut already knows.",
  },
  {
    q: 'Will they find out I analyzed our messages?',
    a: "Never. We don't store your messages. We don't require accounts. We don't send emails to anyone. Analysis happens, results appear, data deletes. It's like it never happened. 100% anonymous. Even we don't know who you're texting about.\n\n🔒 Zero Data Retention Policy",
  },
  {
    q: 'Why not just ask my friends for free?',
    a: "You already did. They said:\n• 'They're definitely into you!' (your optimistic friend)\n• 'Idk, hard to say...' (your realistic friend)\n• 'They're playing games, ghost them' (your cynical friend)\n\nNow you're MORE confused. Friends are biased. AI has no emotional stake. It analyzes patterns from 10M conversations. For $2.99.",
  },
  {
    q: 'What if I want to analyze multiple conversations?',
    a: "This is $2.99 per analysis—ONE TIME. No subscription. No recurring charges. Get your answer, use the insights, move on with your life. Most people only need 1-2 analyses to learn what signals to watch for.",
  },
  {
    q: 'Does this work for Instagram DMs / Snapchat / etc?',
    a: "Yes. Any text-based conversation:\n✓ iMessage\n✓ WhatsApp\n✓ Instagram DMs\n✓ Facebook Messenger\n✓ Snapchat\n✓ Tinder / Bumble / Hinge\n✓ Even old-school SMS\n\nJust copy-paste the text. We analyze words, patterns, timing—platform doesn't matter.",
  },
  {
    q: "This sounds too good to be true. What's the catch?",
    a: "No catch. Here's why it's $2.99 and not $99:\n1. It's automated AI—no human labor costs\n2. We make money on VOLUME\n3. We'd rather have 10,000 people pay $3 than 100 pay $300\n4. Word-of-mouth marketing (you'll tell your friends)\n\nThe 'catch' is we're brutally honest. Some people hate us for that. But most thank us.\n\n⭐ 4.9/5 stars (2,847 reviews) • 'Honest AF'",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28 px-5">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-[2.5rem] font-extrabold text-center mb-12 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Questions You&apos;re Probably Asking
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-bg-card border border-white/5 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-semibold text-sm md:text-base pr-4">{faq.q}</span>
                <span className="text-text-muted text-xl shrink-0">{open === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-text-gray text-sm leading-relaxed whitespace-pre-line">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
