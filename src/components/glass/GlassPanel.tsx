'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'focus'
  glow?: boolean
}

const glassVariants = {
  default: {
    borderColor: 'rgba(0, 255, 255, 0.2)',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  },
  hover: {
    borderColor: 'rgba(0, 255, 255, 0.4)',
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
  },
  focus: {
    borderColor: 'rgba(0, 255, 255, 0.6)',
    boxShadow: '0 0 40px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
  }
}

export default function GlassPanel({ 
  children, 
  className, 
  variant = 'default',
  glow = true,
  ...props 
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        // Base glass styling
        'bg-glass-100 backdrop-blur-md border-2 rounded-none relative',
        // Responsive spacing
        'p-4 sm:p-6',
        // Custom classes
        className
      )}
      variants={glow ? glassVariants : undefined}
      initial="default"
      animate={variant}
      whileHover={glow ? "hover" : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}