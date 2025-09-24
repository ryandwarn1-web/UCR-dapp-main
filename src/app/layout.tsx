import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter, VT323, Fira_Code } from 'next/font/google'
import './globals.css'
const DynamicProviders = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false,
})
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

// Glitch & Glass Typography
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
})

const vt323 = VT323({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-pixel'
})

const firaCode = Fira_Code({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://universalcredits.protocol'),
  title: 'Universal Credits Protocol',
  description: 'Decentralized content rights management and discovery protocol',
  keywords: ['NFT', 'Web3', 'Content Rights', 'Decentralized', 'DeFi'],
  authors: [{ name: 'Universal Credits Protocol Team' }],
  openGraph: {
    title: 'Universal Credits Protocol',
    description: 'Decentralized content rights management and discovery protocol',
    url: 'https://universalcredits.protocol',
    siteName: 'Universal Credits Protocol',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Universal Credits Protocol',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal Credits Protocol',
    description: 'Decentralized content rights management and discovery protocol',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.variable} ${vt323.variable} ${firaCode.variable} font-sans`}>
        <DynamicProviders>
          <div className="min-h-screen flex flex-col relative">
            {/* Ambient background effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-glitch-500/5 via-transparent to-magenta-500/5" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glitch-500/10 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-400" />
            </div>
            
            <Navigation />
            <main className="flex-1 relative z-10 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </DynamicProviders>
      </body>
    </html>
  )
}