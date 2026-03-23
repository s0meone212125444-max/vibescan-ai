'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MessageSquare, Sparkles, BarChart3, Shield, Zap, Clock,
  ChevronDown, ChevronUp, Star, Heart, Brain
} from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="text-primary" size={24} fill="#8B5CF6" />
          <span className="text-xl font-bold text-text-white">VibeScan</span>
        </div>
        <Link href="/analyze"
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          Try It – $2.99
        </Link>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 px-6 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-sm text-primary mb-8">
            <Sparkles size={14} /> 12,847 people got clarity
          </div>
        </motion.div>

        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-text-white leading-tight">
          Find Out If They&apos;re{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Actually Into You
          </span>
        </motion.h1>

        <motion.p initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-gray text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
          AI analyzes your texts with brutal honesty. No more guessing.
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10">
          <Link href="/analyze"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg px-10 py-5 rounded-full transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95">
            <MessageSquare size={22} />
            Analyze My Texts – $2.99
          </Link>
          <p className="text-text-muted text-sm mt-4">Instant results • 100% anonymous</p>
        </motion.div>

        {/* Phone mockup */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 mx-auto max-w-sm">
          <div className="bg-bg-card rounded-3xl border border-white/10 p-6 shadow-2xl shadow-primary/10">
            <div className="space-y-3 text-sm">
              <div className="flex justify-end"><span className="bg-primary/20 text-primary px-3 py-2 rounded-2xl rounded-br-sm max-w-[200px]">Hey! How was your weekend? 😊</span></div>
              <div className="flex"><span className="bg-bg-elevated text-text-gray px-3 py-2 rounded-2xl rounded-bl-sm">Good</span></div>
              <div className="flex justify-end"><span className="bg-primary/20 text-primary px-3 py-2 rounded-2xl rounded-br-sm max-w-[200px]">Did you do anything fun?</span></div>
              <div className="flex"><span className="bg-bg-elevated text-text-gray px-3 py-2 rounded-2xl rounded-bl-sm">Not really</span></div>
            </div>
            <div className="mt-4 bg-accent-red/10 border border-accent-red/30 rounded-xl p-3 text-center">
              <p className="text-accent-red font-bold text-2xl">22/100</p>
              <p className="text-accent-red/70 text-xs mt-1">😬 Not Looking Good</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { icon: MessageSquare, title: 'Paste your texts', desc: 'Copy your conversation and paste it in. Names are anonymized.' },
    { icon: Brain, title: 'AI analyzes patterns', desc: 'We detect interest signals, red flags, response patterns, and more.' },
    { icon: BarChart3, title: 'Get your score', desc: 'Brutally honest 0-100 score + specific advice on what to do next.' },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-black text-center text-text-white">Three steps. Total clarity.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.15 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-8 text-center hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                <s.icon className="text-primary" size={28} />
              </div>
              <div className="text-text-muted text-xs font-semibold mt-4">STEP {i + 1}</div>
              <h3 className="text-xl font-bold text-text-white mt-2">{s.title}</h3>
              <p className="text-text-gray mt-3 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  const testimonials = [
    { name: 'Sarah', age: 24, quote: 'I was texting this guy for 3 weeks. VibeScan gave him a 22/100. Saved me from wasting more time. Worth every penny.', score: 22 },
    { name: 'Marcus', age: 21, quote: 'The AI picked up on things I missed. She was just being polite, not interested. Brutal but I needed to hear it.', score: 35 },
    { name: 'Dev', age: 26, quote: "I used it before asking her out. 89/100. We're dating now.", score: 89 },
  ]

  return (
    <section className="py-24 px-6 bg-bg-card/50">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase text-center mb-3">Real Results</p>
          <h2 className="text-3xl md:text-5xl font-black text-center text-text-white">People got answers</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.15 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-accent-yellow" fill="#EAB308" />)}
              </div>
              <p className="text-text-gray leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-text-white font-semibold">{t.name}, {t.age}</p>
                </div>
                <span className={`font-mono font-bold text-sm px-2 py-1 rounded ${
                  t.score >= 70 ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'
                }`}>
                  {t.score}/100
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustBuilders() {
  const items = [
    { icon: Shield, title: '100% Anonymous', desc: "We don't store your messages" },
    { icon: Sparkles, title: 'GPT-4 Level AI', desc: 'Advanced pattern recognition' },
    { icon: Zap, title: 'Instant Results', desc: 'Under 30 seconds' },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-text-white mt-3">{item.title}</h3>
              <p className="text-text-gray text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: 'How accurate is this?', a: 'VibeScan uses advanced AI trained on millions of conversations. It catches patterns humans miss—like response times, emoji usage, question ratios, and more.' },
    { q: 'Will they know I analyzed our texts?', a: "No. It's completely anonymous. We don't contact anyone or store messages." },
    { q: "What if I don't like the answer?", a: 'Truth hurts, but it saves time. All sales final (digital product), but we guarantee honest analysis.' },
    { q: 'How long does it take?', a: '20-30 seconds after payment.' },
  ]

  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-bg-card/50">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-black text-center text-text-white mb-12">FAQ</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ delay: i * 0.1 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full bg-bg-card border border-white/5 rounded-xl p-5 text-left hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-text-white font-semibold">{faq.q}</span>
                  {open === i ? <ChevronUp className="text-primary" size={20} /> : <ChevronDown className="text-text-muted" size={20} />}
                </div>
                {open === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="text-text-gray mt-3 leading-relaxed">{faq.a}</motion.p>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-4xl md:text-6xl font-black text-text-white">
            Stop Wondering.<br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get Your Answer.
            </span>
          </h2>
          <Link href="/analyze"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg px-10 py-5 rounded-full mt-10 transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95">
            Analyze Now – $2.99
          </Link>
          <p className="text-text-muted text-sm mt-4">One-time payment • Instant results • 100% anonymous</p>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Heart className="text-primary" size={18} fill="#8B5CF6" />
          <span className="font-bold text-text-white">VibeScan</span>
        </div>
        <p className="text-text-muted text-sm">© {new Date().getFullYear()} VibeScan. All rights reserved.</p>
        <div className="flex gap-6 text-text-muted text-sm">
          <a href="#" className="hover:text-text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark">
      <Navbar />
      <Hero />
      <HowItWorks />
      <SocialProof />
      <TrustBuilders />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
