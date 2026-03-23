'use client'
import Hero from './components/Hero'
import SocialProofTicker from './components/SocialProofTicker'
import PainPoints from './components/PainPoints'
import HowItWorks from './components/HowItWorks'
import ValueStack from './components/ValueStack'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import ExitIntent from './components/ExitIntent'

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProofTicker />
      <PainPoints />
      <HowItWorks />
      <ValueStack />
      <Testimonials />
      <FAQ />
      <FinalCTA />

      {/* Footer */}
      <footer className="py-8 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} VibeScan. All rights reserved.</p>
          <div className="flex gap-4">
            <span>🔒 Your messages are never stored</span>
            <span>💳 Secure payment via Whop</span>
          </div>
        </div>
      </footer>

      <ExitIntent />
    </main>
  )
}
