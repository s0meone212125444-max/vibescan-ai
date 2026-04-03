'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Brain } from 'lucide-react'
import Link from 'next/link'

interface Analysis {
  score: number
  verdict: string
  positive_signals: string[]
  negative_signals: string[]
  red_flags: string[]
  advice: string
}

function ScoreCircle({ score }: { score: number }) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 71 ? '#22C55E' : score >= 41 ? '#EAB308' : '#EF4444'
  const label = score >= 71 ? "They're Into You" : score >= 41 ? 'Mixed Signals' : 'Not Looking Good'

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 132 132">
          <circle cx="66" cy="66" r={radius} stroke="#1E293B" strokeWidth="7" fill="none" />
          <motion.circle
            cx="66" cy="66" r={radius}
            stroke={color} strokeWidth="7" fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black" style={{ color }}>{score}</span>
          <span className="text-text-muted text-xs">/100</span>
        </div>
      </div>
      <p className="text-sm font-bold mt-2" style={{ color }}>{label}</p>
    </div>
  )
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const isPurchased = searchParams.get('purchased') === 'true'
  const [analysis, setAnalysis] = useState<Analysis | null>(null)

  useEffect(() => {
    // Load analysis from sessionStorage
    const keys = ['analysisResult', 'vibescanResult', 'analysis']
    for (const key of keys) {
      const raw = sessionStorage.getItem(key)
      if (raw) {
        try {
          setAnalysis(JSON.parse(raw))
          break
        } catch { /* try next */ }
      }
    }
  }, [])

  if (!isPurchased) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-text-gray mb-4">Invalid page access.</p>
          <Link href="/" className="text-primary hover:underline">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-dark py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl font-black text-text-white mb-2">VibeScan Analysis Complete!</h1>
          <p className="text-text-gray">Your purchase was successful. Here are your results.</p>
        </motion.div>

        {/* Score */}
        {analysis && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <ScoreCircle score={analysis.score} />
            </motion.div>

            {/* Verdict */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-6 text-center"
            >
              <p className="text-text-white text-lg font-bold leading-relaxed">
                &ldquo;{analysis.verdict}&rdquo;
              </p>
            </motion.div>

            {/* Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {analysis.positive_signals.length > 0 && (
                <div className="bg-bg-card border border-white/5 rounded-2xl p-5">
                  <h3 className="text-accent-green font-bold text-sm mb-2">Positive Signals</h3>
                  <ul className="space-y-1.5">
                    {analysis.positive_signals.map((s, i) => (
                      <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                        <CheckCircle className="text-accent-green shrink-0 mt-0.5" size={14} /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.negative_signals.length > 0 && (
                <div className="bg-bg-card border border-white/5 rounded-2xl p-5">
                  <h3 className="text-accent-red font-bold text-sm mb-2">Warning Signs</h3>
                  <ul className="space-y-1.5">
                    {analysis.negative_signals.map((s, i) => (
                      <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                        <span className="text-accent-red shrink-0">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Advice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-6"
            >
              <h3 className="text-primary font-bold text-sm mb-2">What To Do Next</h3>
              <p className="text-text-gray text-sm leading-relaxed">{analysis.advice}</p>
            </motion.div>
          </>
        )}

        {!analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-bg-card border border-white/5 rounded-2xl p-6 text-center"
          >
            <p className="text-text-gray">Your analysis results will appear here.</p>
          </motion.div>
        )}

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Cross-sell: RoastMyRizz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 border border-primary/20 rounded-2xl p-6"
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
            Now Optimize Your Dating Profile 🔥
          </p>
          <h3 className="text-xl font-bold text-text-white mb-2">
            You fixed your texting game. But are you getting enough matches to text in the first place?
          </h3>
          <p className="text-text-gray text-sm mb-5">
            RoastMyRizz users get <span className="text-text-white font-semibold">3x more matches</span> after optimizing their profile with AI.
          </p>

          {/* Before/After Score */}
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="bg-bg-dark/60 rounded-xl px-5 py-3 text-center">
              <p className="text-[10px] text-text-muted uppercase">Before</p>
              <p className="text-3xl font-black text-accent-red">31</p>
            </div>
            <ArrowRight className="text-primary" size={24} />
            <div className="bg-bg-dark/60 rounded-xl px-5 py-3 text-center">
              <p className="text-[10px] text-text-muted uppercase">After</p>
              <p className="text-3xl font-black text-accent-green">87</p>
            </div>
          </div>

          <ul className="space-y-2 mb-5">
            {[
              'Free profile score & brutal AI roast',
              'Photo-by-photo analysis & strategy',
              'Optimized bio rewrite for your app',
              '820K+ profiles improved',
            ].map((item) => (
              <li key={item} className="text-text-gray text-sm flex items-center gap-2">
                <CheckCircle className="text-primary shrink-0" size={14} /> {item}
              </li>
            ))}
          </ul>

          <a
            href="https://roastmyrizz.vercel.app/?ref=vibescan"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-full hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all"
          >
            Get My Free Profile Score &rarr;
          </a>
          <p className="text-text-muted text-xs text-center mt-2">Same AI tech that just analyzed your texts</p>
        </motion.div>

        {/* Back to analyze */}
        <div className="text-center">
          <Link href="/analyze" className="text-text-gray text-sm hover:text-primary transition">
            &larr; Analyze another conversation
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <Brain className="text-primary animate-spin" size={48} />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
