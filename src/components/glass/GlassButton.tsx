'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  glitchEffect?: boolean
  children: React.ReactNode
}

const buttonVariants = {
  primary: {
    default: {
      backgroundColor: '#00FFFF',
      color: '#1A1A1A',
      borderColor: '#00FFFF',
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    },
    hover: {
      backgroundColor: '#00E6E6',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      scale: 1.02,
      x: [0, -1, 1, 0] // Glitch jitter
    },
    tap: {
      scale: 0.98
    }
  },
  secondary: {
    default: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#EAEAEA',
      borderColor: 'rgba(0, 255, 255, 0.3)',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    },
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(0, 255, 255, 0.5)',
      boxShadow: '0 0 15px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      scale: 1.02
    },
    tap: {
      scale: 0.98
    }
  },
  glass: {
    default: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      color: '#EAEAEA',
      borderColor: 'rgba(0, 255, 255, 0.2)',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    },
    hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      borderColor: 'rgba(0, 255, 255, 0.4)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      scale: 1.01
    },
    tap: {
      scale: 0.99
    }
  }
}

const sizeClasses = {
  sm: 'px-3 py-1.5 sm:px-4 sm:py-2 text-sm',
  md: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
  lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg'
}

export default function GlassButton({
  variant = 'primary',
  size = 'md',
  glitchEffect = true,
  children,
  className,
  disabled,
  ...props
}: GlassButtonProps) {
  const variants = buttonVariants[variant]

  return (
    <motion.button
      className={cn(
        // Base styling
        'relative font-sans font-semibold rounded-none border-2 backdrop-blur-md',
        'focus:outline-none focus:ring-0 transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Size classes
        sizeClasses[size],
        // Custom classes
        className
      )}
      variants={glitchEffect ? variants : undefined}
      initial="default"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        x: { duration: 0.1, ease: "easeInOut" }
      }}
      disabled={disabled}
      {...props}
    >
      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Glitch overlay effect */}
      {glitchEffect && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{
            x: '100%',
            opacity: [0, 1, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      )}
    </motion.button>
  )
}