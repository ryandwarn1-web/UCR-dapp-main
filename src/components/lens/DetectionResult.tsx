'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Award } from 'lucide-react'

interface DetectionResultProps {
  ucrId: string
  title: string
  creator: string
  reward: number
}

export default function DetectionResult({ ucrId, title, creator, reward }: DetectionResultProps) {
  const [isTyping, setIsTyping] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  const fullText = `
> UCR #${ucrId} DETECTED
> TITLE: ${title}
> CREATOR: ${creator}
> STATUS: VERIFIED ON-CHAIN
`

  useEffect(() => {
    if (isTyping) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 20) // Typing speed

      return () => clearInterval(typingInterval)
    }
  }, [fullText, isTyping])

  return (
    <motion.div
      className="absolute bottom-32 right-6 max-w-xs bg-obsidian-300/80 backdrop-blur-md border border-primary-400/50 rounded p-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal-style text output */}
      <pre className="font-mono text-primary-400 text-sm whitespace-pre-line mb-3">
        {displayedText}
        {isTyping && (
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            _
          </motion.span>
        )}
      </pre>

      {/* Reward info - only shown after typing is complete */}
      {!isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-3 pt-3 border-t border-primary-400/30"
        >
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Award className="w-4 h-4 text-primary-400" />
            <span>Sighting Reward: ${reward.toFixed(2)} USDC</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-xs mt-1">
            <Clock className="w-3 h-3" />
            <span>First sighting at this location</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}