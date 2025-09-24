'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Mic, Check, Loader2 } from 'lucide-react'

interface ActionButtonProps {
  status: 'awaiting' | 'scanning' | 'detected' | 'logging'
  mode: 'visual' | 'audio'
  onClick: () => void
  disabled?: boolean
}

export default function ActionButton({ status, mode, onClick, disabled = false }: ActionButtonProps) {
  const getIcon = () => {
    if (status === 'scanning') {
      return <Loader2 className="w-6 h-6 animate-spin" />
    }
    
    if (status === 'detected' || status === 'logging') {
      return <Check className="w-6 h-6" />
    }
    
    return mode === 'visual' ? <Camera className="w-6 h-6" /> : <Mic className="w-6 h-6" />
  }

  const getLabel = () => {
    switch (status) {
      case 'awaiting': return mode === 'visual' ? 'SCAN' : 'LISTEN'
      case 'scanning': return 'SCANNING...'
      case 'detected': return 'LOG SIGHTING'
      case 'logging': return 'LOGGING...'
      default: return 'SCAN'
    }
  }

  const getButtonStyle = () => {
    if (status === 'detected') {
      return 'bg-primary-400 text-obsidian-300 hover:bg-primary-500'
    }
    
    return 'bg-obsidian-300/70 border border-primary-400/50 text-primary-400 hover:bg-obsidian-200/70'
  }

  const getButtonAnimation = () => {
    if (status === 'detected') {
      return {
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 0 0 0 rgba(0, 255, 255, 0)',
          '0 0 0 8px rgba(0, 255, 255, 0.3)',
          '0 0 0 0 rgba(0, 255, 255, 0)'
        ]
      }
    }
    
    if (status === 'awaiting') {
      return {
        scale: [1, 1.03, 1],
      }
    }
    
    return {}
  }

  return (
    <motion.button
      className={`
        flex items-center justify-center gap-2 px-6 py-3 rounded-full
        backdrop-blur-md font-medium transition-colors
        ${getButtonStyle()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${status === 'detected' ? 'min-w-40' : 'min-w-32'}
      `}
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      animate={getButtonAnimation()}
      transition={{ 
        duration: status === 'detected' ? 2 : 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileTap={{ scale: !disabled ? 0.95 : 1 }}
    >
      {getIcon()}
      <span>{getLabel()}</span>
    </motion.button>
  )
}