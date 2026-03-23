'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, MessageSquare, AlertCircle } from 'lucide-react'

const EXAMPLE = `Example format:
You: Hey! How was your weekend?
Them: Good
You: Did you do anything fun?
Them: Not really`

export default function AnalyzePage() {
  const [text, setText] = useState('')
  const charCount = text.length
  const isValid = charCount >= 100 && charCount <= 5000
  const tooShort = charCount > 0 && charCount < 100
  const tooLong = charCount > 5000

  const handleSubmit = () => {
    if (!isValid) return

    // Generate unique text ID
    const textId = crypto.randomUUID()

    // Save to sessionStorage
    sessionStorage.setItem('analysisText', text)
    sessionStorage.setItem('textId', textId)

    // Redirect to Paddle checkout
    const productId = process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID || ''
    window.location.href = `https://buy.paddle.com/product/${productId}?passthrough=${textId}`
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text-white transition-colors mb-8">
          <ArrowLeft size={18} /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="text-primary" size={28} />
            <h1 className="text-3xl font-black text-text-white">Paste Your Conversation</h1>
          </div>
          <p className="text-text-gray">Include at least 10-15 messages for accurate analysis.</p>

          {/* Example format */}
          <div className="bg-bg-card border border-white/5 rounded-xl p-4 mt-6">
            <p className="text-text-muted text-xs uppercase tracking-wide font-semibold mb-2">Format</p>
            <pre className="text-text-gray text-sm whitespace-pre-wrap font-mono">{EXAMPLE}</pre>
          </div>

          {/* Text area */}
          <div className="mt-6 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text messages here..."
              rows={14}
              className="w-full bg-bg-card border border-white/10 rounded-xl p-5 text-text-white placeholder-text-muted resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm leading-relaxed"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                {tooShort && (
                  <span className="text-accent-red text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> Minimum 100 characters
                  </span>
                )}
                {tooLong && (
                  <span className="text-accent-red text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> Maximum 5,000 characters
                  </span>
                )}
              </div>
              <span className={`text-xs font-mono ${tooLong ? 'text-accent-red' : 'text-text-muted'}`}>
                {charCount.toLocaleString()} / 5,000
              </span>
            </div>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-5 rounded-full transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            Continue to Payment – $2.99
          </button>

          <p className="text-text-muted text-sm text-center mt-4 flex items-center justify-center gap-2">
            <Lock size={14} /> Your messages are encrypted and never stored
          </p>
        </motion.div>
      </div>
    </div>
  )
}
