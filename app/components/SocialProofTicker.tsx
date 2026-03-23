'use client'
import { motion } from 'framer-motion'

const items = [
  '✓ Emma just got her answer',
  '✓ 487 analyses today',
  '✓ Mike avoided a disaster',
  '✓ Sarah moved on in peace',
  '✓ 12,847 total clarity moments',
  '✓ Jake finally asked her out',
  '✓ 2,847 analyses this week',
  '✓ Priya stopped overthinking',
]

export default function SocialProofTicker() {
  return (
    <div className="overflow-hidden bg-primary/10 border-y border-primary/20 py-3">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-sm text-primary font-medium">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
