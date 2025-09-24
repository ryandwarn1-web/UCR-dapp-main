'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface HUDOverlayProps {
  status: 'awaiting' | 'scanning' | 'detected' | 'logging'
  mode: 'visual' | 'audio'
}

export default function HUDOverlay({ status, mode }: HUDOverlayProps) {
  const getStatusText = () => {
    switch (status) {
      case 'awaiting': return 'STATUS: AWAITING INPUT'
      case 'scanning': return 'STATUS: SCANNING...'
      case 'detected': return 'STATUS: UCR DETECTED'
      case 'logging': return 'STATUS: LOGGING SIGHTING'
      default: return 'STATUS: AWAITING INPUT'
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary-400 opacity-80"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary-400 opacity-80"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary-400 opacity-80"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary-400 opacity-80"></div>

      {/* Data Readouts */}
      <div className="absolute top-6 left-6 font-mono text-sm text-primary-400">
        <div className="mb-1">UCP LENS v3.0</div>
        <motion.div
          animate={status === 'scanning' ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
          transition={{ duration: 0.5, repeat: status === 'scanning' ? Infinity : 0 }}
        >
          {getStatusText()}
        </motion.div>
        <div className="text-xs text-primary-400/60 mt-2">
          MODE: {mode.toUpperCase()}
        </div>
      </div>

      {/* Grid Lines */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Scan Line Effect */}
      {status === 'scanning' && (
        <motion.div
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
          animate={{ y: [0, window.innerHeight] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      )}
    </div>
  )
}