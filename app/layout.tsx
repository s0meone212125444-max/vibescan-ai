import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'VibeScan – Find Out If They\'re Actually Into You',
  description: 'AI analyzes your text conversations with brutal honesty. No more guessing. Get your score in 30 seconds.',
  openGraph: {
    title: 'VibeScan – Find Out If They\'re Actually Into You',
    description: 'AI analyzes your text conversations with brutal honesty. No more guessing.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-bg-dark">{children}</body>
    </html>
  )
}
