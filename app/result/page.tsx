'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, XCircle, AlertTriangle, Lightbulb, Share2,
  ArrowRight, Brain, Check
} from 'lucide-react'

interface Analysis {
  score: number
  verdict: string
  positive_signals: string[]
  negative_signals: string[]
  red_flags: string[]
  advice: string
}

const loadingMessages = [
  'Analyzing conversation patterns...',
  'Detecting interest signals...',
  'Calculating honesty score...',
  'Checking for red flags...',
  'Generating your verdict...',
]

function ScoreCircle({ score }: { score: number }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color = score >= 71 ? '#22C55E' : score >= 41 ? '#EAB308' : '#EF4444'
  const emoji = score >= 71 ? '✅' : score >= 41 ? '🤔' : '😬'
  const label = score >= 71 ? "They're Into You" : score >= 41 ? 'Mixed Signals' : 'Not Looking Good'

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90">
          <circle cx="96" cy="96" r={radius} stroke="#1E293B" strokeWidth="8" fill="none" />
          <motion.circle
            cx="96" cy="96" r={radius}
            stroke={color} strokeWidth="8" fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            className="text-5xl font-black font-mono" style={{ color }}>
            {score}
          </motion.span>
          <span className="text-text-muted text-sm">/100</span>
        </div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="mt-4 text-center">
        <span className="text-3xl">{emoji}</span>
        <p className="text-lg font-bold mt-1" style={{ color }}>{label}</p>
      </motion.div>
    </div>
  )
}

function generateDemoAnalysis(): Analysis {
  const rand = Math.random()
  if (rand < 0.3) {
    // Low score
    const score = Math.floor(Math.random() * 21) + 15
    return {
      score,
      verdict: "They're not interested. The signals are clear — you're putting in all the effort while they give you the bare minimum.",
      positive_signals: ['They do respond eventually'],
      negative_signals: [
        'One-word replies are their default',
        'Never initiates conversation',
        'Takes 6+ hours to respond consistently',
        'No questions asked about your life',
      ],
      red_flags: [
        'Classic breadcrumbing pattern detected',
        'Only texts late at night (attention-seeking)',
        'Emoji usage dropped 80% over 2 weeks',
      ],
      advice: "Stop texting first for 1 week. If they don't reach out, you have your answer. Don't waste another month on someone who treats you as an option.",
    }
  } else if (rand < 0.7) {
    // Medium score
    const score = Math.floor(Math.random() * 21) + 45
    return {
      score,
      verdict: "Mixed signals detected. There's some interest, but they're either unsure, distracted, or keeping options open.",
      positive_signals: [
        'Responds to most messages',
        'Uses emojis occasionally',
        'Has initiated conversation a few times',
      ],
      negative_signals: [
        'Response times are inconsistent (1h to 8h)',
        'Rarely asks follow-up questions',
        'Conversations often die without resolution',
      ],
      red_flags: [
        'Hot and cold pattern — engaged one day, distant the next',
      ],
      advice: "Pull back slightly and mirror their energy. If they step up when you step back, there's potential. If not, you're more invested than they are.",
    }
  } else {
    // High score
    const score = Math.floor(Math.random() * 21) + 75
    return {
      score,
      verdict: "They're genuinely interested! The patterns show real engagement, effort, and emotional investment in your conversations.",
      positive_signals: [
        'Responds quickly and consistently',
        'Asks meaningful questions about your life',
        'Initiates conversations regularly',
        'Uses playful and affectionate language',
        'Remembers details from past conversations',
      ],
      negative_signals: [],
      red_flags: [],
      advice: "The interest is real. Ask them out THIS WEEK — don't wait and risk losing momentum. Be direct: suggest a specific day, time, and place.",
    }
  }
}

function ResultContent() {
  const searchParams = useSearchParams()
  const textId = searchParams.get('d') || searchParams.get('text_id')
  const isDemo = searchParams.get('demo') === 'true'

  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  // Rotate loading messages
  useEffect(() => {
    if (!loading) return
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % loadingMessages.length), 3000)
    return () => clearInterval(id)
  }, [loading])

  const runAnalysis = useCallback(async () => {
    // Demo mode: generate fake results after a short delay
    if (isDemo) {
      await new Promise((r) => setTimeout(r, 2500))
      setAnalysis(generateDemoAnalysis())
      setLoading(false)
      return
    }

    // Retrieve texts from sessionStorage
    let texts = textId ? sessionStorage.getItem(textId) : null
    if (!texts) texts = sessionStorage.getItem('analysisText')

    if (!texts) {
      setError('Session expired. Please go back and paste your texts again.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Analysis failed')
      }

      const data = await res.json()
      setAnalysis(data)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.')
      setLoading(false)
    }
  }, [textId, isDemo])

  useEffect(() => {
    runAnalysis()
  }, [runAnalysis])

  const handleShare = () => {
    const text = `I used VibeScan and got ${analysis?.score}/100 💀\nFind out if they're into you: vibescan.vercel.app`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-6"
          >
            <Brain className="text-primary" size={48} />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-text-gray text-lg"
            >
              {loadingMessages[msgIndex]}
            </motion.p>
          </AnimatePresence>
          <div className="w-64 h-1.5 bg-bg-card rounded-full mx-auto mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              animate={{ width: ['0%', '80%', '40%', '90%', '60%'] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertTriangle className="text-accent-yellow mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold text-text-white mb-2">Oops</h1>
          <p className="text-text-gray mb-6">{error}</p>
          <Link href="/analyze" className="bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
            Try Again
          </Link>
        </div>
      </div>
    )
  }

  if (!analysis) return null

  return (
    <div className="min-h-screen bg-bg-dark py-12 px-6 relative">
      {/* Demo watermark */}
      {isDemo && (
        <div className="fixed top-4 right-4 z-50 bg-accent-yellow/20 border border-accent-yellow/40 text-accent-yellow text-xs font-bold px-3 py-1.5 rounded-lg">
          Demo Mode
        </div>
      )}
      <div className="max-w-2xl mx-auto space-y-8">
        {/* SCORE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex justify-center pt-8">
          <ScoreCircle score={analysis.score} />
        </motion.div>

        {/* VERDICT */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-6 text-center">
          <p className="text-text-white text-xl font-bold leading-relaxed">&ldquo;{analysis.verdict}&rdquo;</p>
        </motion.div>

        {/* SIGNALS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-4">
          <div className="bg-bg-card border border-white/5 rounded-2xl p-5">
            <h3 className="text-accent-green font-bold flex items-center gap-2 mb-3">
              <CheckCircle size={18} /> Positive Signals
            </h3>
            {analysis.positive_signals.length > 0 ? (
              <ul className="space-y-2">
                {analysis.positive_signals.map((s, i) => (
                  <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                    <CheckCircle className="text-accent-green shrink-0 mt-0.5" size={14} /> {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted text-sm">No positive signals detected</p>
            )}
          </div>

          <div className="bg-bg-card border border-white/5 rounded-2xl p-5">
            <h3 className="text-accent-red font-bold flex items-center gap-2 mb-3">
              <XCircle size={18} /> Negative Signals
            </h3>
            {analysis.negative_signals.length > 0 ? (
              <ul className="space-y-2">
                {analysis.negative_signals.map((s, i) => (
                  <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                    <XCircle className="text-accent-red shrink-0 mt-0.5" size={14} /> {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted text-sm">No negative signals detected</p>
            )}
          </div>
        </motion.div>

        {/* RED FLAGS */}
        {analysis.red_flags.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="bg-accent-red/5 border border-accent-red/20 rounded-2xl p-5">
            <h3 className="text-accent-red font-bold flex items-center gap-2 mb-3">
              <AlertTriangle size={18} /> Red Flags
            </h3>
            <ul className="space-y-2">
              {analysis.red_flags.map((f, i) => (
                <li key={i} className="text-text-gray text-sm flex items-start gap-2">
                  <span className="text-accent-red">⚠️</span> {f}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* ADVICE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <h3 className="text-primary font-bold flex items-center gap-2 mb-3">
            <Lightbulb size={18} /> What To Do Next
          </h3>
          <p className="text-text-gray leading-relaxed">{analysis.advice}</p>
        </motion.div>

        {/* ACTIONS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-3">
          <Link href="/analyze"
            className="flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-full text-center hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2">
            Analyze Another – $2.99 <ArrowRight size={18} />
          </Link>
          <button onClick={handleShare}
            className="flex-1 border border-white/10 text-text-white font-semibold py-4 rounded-full hover:border-primary/30 transition-all flex items-center justify-center gap-2">
            {copied ? <><Check size={18} /> Copied!</> : <><Share2 size={18} /> Share Score</>}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <Brain className="text-primary animate-spin" size={48} />
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
