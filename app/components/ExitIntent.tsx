'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CHECKOUT_URL = 'https://whop.com/checkout/plan_6ER2P6s6XzTty'

export default function ExitIntent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let triggered = false
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !triggered) {
        triggered = true
        setShow(true)
      }
    }
    document.addEventListener('mouseleave', handler)
    return () => document.removeEventListener('mouseleave', handler)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShow(false)}
        >
          <motion.div
            className="bg-bg-card border border-primary/30 rounded-2xl p-8 max-w-md w-full text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-xl font-extrabold mb-2">Wait! Don&apos;t Leave Wondering</h3>
            <p className="text-text-gray text-sm mb-6 leading-relaxed">
              We&apos;re capping analyses at 15,000 this month (server costs). You have 1 of 847 remaining slots.
              Claim it before it&apos;s gone?
            </p>
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3.5 rounded-xl w-full justify-center"
            >
              Claim My Spot — $2.99
            </a>
            <button
              onClick={() => setShow(false)}
              className="mt-3 text-text-muted text-xs hover:text-text-gray transition-colors cursor-pointer"
            >
              No thanks, I&apos;ll keep guessing
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
