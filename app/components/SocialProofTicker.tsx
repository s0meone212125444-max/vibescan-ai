'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const items = [
  '✓ Emma just got her answer',
  '✓ 487 analyses today',
  '✓ Mike avoided a disaster',
  '✓ Sarah moved on in peace',
  '✓ 12,847 total clarity moments',
  '✓ Jake finally asked her out',
  '✓ 2,847 analyses this week',
  '✓ Priya stopped overthinking',
  '✓ 94% said it matched reality',
]

export default function SocialProofTicker() {
  const [index, setIndex] = useState(0)

  // Show 3 items at a time, rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 3) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const visible = [
    items[index % items.length],
    items[(index + 1) % items.length],
    items[(index + 2) % items.length],
  ]

  return (
    <div className="bg-primary/10 border-y border-primary/20 py-3.5 px-5">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="flex items-center justify-center gap-6 md:gap-10 flex-wrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {visible.map((item, i) => (
              <span key={i} className="text-sm text-primary font-medium whitespace-nowrap">
                {item}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
