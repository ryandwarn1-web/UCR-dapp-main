'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Volume2 } from 'lucide-react'

interface ModeSwitchProps {
  mode: 'visual' | 'audio'
  onModeChange: (mode: 'visual' | 'audio') => void
  disabled?: boolean
}

export default function ModeSwitch({ mode, onModeChange, disabled = false }: ModeSwitchProps) {
  return (
    <div className="flex justify-center">
      <div 
        className={`
          flex items-center bg-obsidian-300/70 backdrop-blur-md 
          border border-primary-400/30 rounded-full p-1
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {/* Visual Mode */}
        <motion.button
          className={`relative flex items-center justify-center px-4 py-2 rounded-full ${
            mode === 'visual' ? 'text-primary-400' : 'text-white/60'
          }`}
          onClick={() => !disabled && onModeChange('visual')}
          disabled={disabled}
          whileTap={{ scale: mode !== 'visual' && !disabled ? 0.95 : 1 }}
        >
          <Camera className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">VISUAL</span>
          
          {/* Active Indicator */}
          {mode === 'visual' && (
            <motion.div 
              className="absolute inset-0 bg-primary-400/20 rounded-full -z-10"
              layoutId="modeIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>

        {/* Audio Mode */}
        <motion.button
          className={`relative flex items-center justify-center px-4 py-2 rounded-full ${
            mode === 'audio' ? 'text-primary-400' : 'text-white/60'
          }`}
          onClick={() => !disabled && onModeChange('audio')}
          disabled={disabled}
          whileTap={{ scale: mode !== 'audio' && !disabled ? 0.95 : 1 }}
        >
          <Volume2 className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">AUDIO</span>
          
          {/* Active Indicator */}
          {mode === 'audio' && (
            <motion.div 
              className="absolute inset-0 bg-primary-400/20 rounded-full -z-10"
              layoutId="modeIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.button>
      </div>
    </div>
  )
}