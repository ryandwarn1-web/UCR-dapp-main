'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import UCPSigil from '@/components/UCPSigil'

interface HeroSectionProps {
  headline: string
  subheadline: string
}

export default function HeroSection({ headline, subheadline }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-obsidian-300 via-obsidian-400 to-obsidian-300 border-b-2 border-glitch-500/30 pixel-grid">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 scan-lines" />
      
      {/* Animated Glitch Storm */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary-500/30 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container-responsive relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Animated UCR Sigil */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="relative">
              <UCPSigil size={150} glowIntensity="high" animated />
              <motion.div
                className="absolute -inset-4 border-2 border-primary-500/30 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-pixel mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient animate-glitch-text">{headline}</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 font-sans leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/mint" className="btn-glitch px-8 py-4 text-xl font-bold group">
              <span className="relative z-10">MINT YOUR FIRST UCR</span>
              <motion.div
                className="absolute inset-0 bg-primary-500/20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Link>
            
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="btn-glass px-8 py-4 text-xl font-bold group"
            >
              <span className="relative z-10">Learn How it Works</span>
              <ArrowDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="h-8 w-8 text-primary-400" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}