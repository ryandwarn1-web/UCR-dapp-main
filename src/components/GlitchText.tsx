'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  triggerOnHover?: boolean
  autoGlitch?: boolean
}

export function GlitchText({ 
  children, 
  className = "", 
  intensity = 'medium',
  triggerOnHover = true,
  autoGlitch = false
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  const intensityConfig = {
    low: {
      duration: 0.2,
      displacement: 1,
      chromatic: 0.5
    },
    medium: {
      duration: 0.3,
      displacement: 2,
      chromatic: 1
    },
    high: {
      duration: 0.5,
      displacement: 4,
      chromatic: 2
    }
  }

  const config = intensityConfig[intensity]

  const glitchVariants = {
    normal: {
      x: 0,
      textShadow: '0 0 0 transparent, 0 0 0 transparent'
    },
    glitch: {
      x: [0, -config.displacement, config.displacement, 0],
      textShadow: [
        '0 0 0 transparent, 0 0 0 transparent',
        `${config.chromatic}px 0 0 #00FFFF, -${config.chromatic}px 0 0 #FF00FF`,
        `-${config.chromatic}px 0 0 #00FFFF, ${config.chromatic}px 0 0 #FF00FF`,
        '0 0 0 transparent, 0 0 0 transparent'
      ],
      transition: {
        duration: config.duration,
        ease: "easeInOut"
      }
    }
  }

  const handleGlitch = () => {
    if (triggerOnHover) {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), config.duration * 1000)
    }
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={glitchVariants}
      initial="normal"
      animate={isGlitching || autoGlitch ? "glitch" : "normal"}
      onHoverStart={handleGlitch}
      style={{ 
        display: 'inline-block',
        cursor: triggerOnHover ? 'pointer' : 'default'
      }}
    >
      {children}
    </motion.span>
  )
}

// Specialized component for headlines with built-in pixel font styling
export function PixelGlitchHeadline({ 
  children, 
  className = "",
  size = 'large'
}: { 
  children: React.ReactNode
  className?: string
  size?: 'small' | 'medium' | 'large' | 'xl'
}) {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl lg:text-6xl',
    xl: 'text-5xl lg:text-8xl'
  }

  return (
    <GlitchText 
      className={`headline-glitch ${sizeClasses[size]} ${className}`}
      intensity="medium"
      triggerOnHover={true}
    >
      {children}
    </GlitchText>
  )
}