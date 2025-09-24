'use client'

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GlassSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

const selectVariants = {
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
  }
}

const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const getVariant = () => {
      if (error) return 'error'
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
        
        <motion.div className="relative">
          <motion.select
            ref={ref}
            className={cn(
              // Base glass styling
              'block w-full rounded-none border-2 bg-glass-200 backdrop-blur-md',
              'text-text-primary',
              'px-3 py-2 pr-8 sm:px-4 sm:py-3 sm:pr-10 text-sm font-sans',
              'focus:outline-none focus:ring-0',
              'transition-all duration-200',
              'appearance-none cursor-pointer',
              // Custom classes
              className
            )}
            variants={selectVariants}
            initial="default"
            animate={getVariant()}
            transition={{ 
              duration: 0.2, 
              ease: "easeOut",
              x: { duration: 0.1, ease: "easeInOut" }
            }}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className="bg-obsidian-300 text-text-primary"
              >
                {option.label}
              </option>
            ))}
          </motion.select>
          
          {/* Custom dropdown arrow */}
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            animate={isFocused ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-text-secondary icon-pixel" />
          </motion.div>
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

GlassSelect.displayName = 'GlassSelect'

export default GlassSelect