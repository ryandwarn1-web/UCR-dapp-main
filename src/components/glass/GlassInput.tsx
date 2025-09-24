'use client'

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  glitchOnFocus?: boolean
}

const inputVariants = {
  default: {
    borderColor: 'rgba(0, 255, 255, 0.3)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  },
  focus: {
    borderColor: 'rgba(0, 255, 255, 0.8)',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    x: [0, -1, 1, 0] // Subtle jitter effect
  },
  error: {
    borderColor: 'rgba(255, 0, 0, 0.8)',
    boxShadow: '0 0 10px rgba(255, 0, 0, 0.2)'
  },
  success: {
    borderColor: 'rgba(0, 255, 0, 0.8)',
    boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
  }
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, success, glitchOnFocus = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const getVariant = () => {
      if (error) return 'error'
      if (success) return 'success'
      if (isFocused) return 'focus'
      return 'default'
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text-primary body-text">
            {label}
          </label>
        )}
        
        <motion.div 
          className="relative"
          variants={glitchOnFocus ? inputVariants : undefined}
          initial="default"
          animate={getVariant()}
          transition={{ 
            duration: 0.2, 
            ease: "easeOut",
            x: { duration: 0.1, ease: "easeInOut" }
          }}
        >
          <input
            ref={ref}
            className={cn(
              // Base glass styling
              'block w-full rounded-none border-2 bg-glass-200 backdrop-blur-md',
              'text-text-primary placeholder-text-secondary',
              'px-3 py-2 sm:px-4 sm:py-3 text-sm font-sans',
              'focus:outline-none focus:ring-0',
              'transition-all duration-200',
              // Custom classes
              className
            )}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />
          
          {/* Success/Error Icons */}
          {(success || error) && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {success && (
                <svg className="w-5 h-5 text-success-500 pixel-perfect" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              )}
              {error && (
                <svg className="w-5 h-5 text-error-500 pixel-perfect" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              )}
            </motion.div>
          )}
        </motion.div>
        
        {error && (
          <motion.p
            className="text-sm text-error-500 body-text-secondary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

GlassInput.displayName = 'GlassInput'

export default GlassInput