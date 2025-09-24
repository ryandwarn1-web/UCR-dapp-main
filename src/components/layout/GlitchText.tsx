'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
  glitchOnHover?: boolean
  isActive?: boolean
}

export default function GlitchText({ text, className = '', glitchOnHover = false, isActive = false }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`'
  
  const triggerGlitch = () => {
    if (isGlitching) return
    
    setIsGlitching(true)
    const originalText = text
    let iterations = 0
    const maxIterations = 3
    
    const glitchInterval = setInterval(() => {
      if (iterations >= maxIterations) {
        setDisplayText(originalText)
        setIsGlitching(false)
        clearInterval(glitchInterval)
        return
      }
      
      // Create glitched version
      const glitchedText = originalText
        .split('')
        .map((char, index) => {
          if (Math.random() < 0.3) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          }
          return char
        })
        .join('')
      
      setDisplayText(glitchedText)
      iterations++
    }, 50)
  }

  useEffect(() => {
    if (isActive && !isGlitching) {
      const interval = setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 2 seconds
          triggerGlitch()
        }
      }, 2000)
      
      return () => clearInterval(interval)
    }
  }, [isActive, isGlitching])

  return (
    <span 
      className={className}
      onMouseEnter={glitchOnHover ? triggerGlitch : undefined}
    >
      {displayText}
    </span>
  )
}