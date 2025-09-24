'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CentralReticleProps {
  status: 'awaiting' | 'scanning' | 'detected' | 'logging'
  detectedArea?: { x: number; y: number; width: number; height: number }
}

export default function CentralReticle({ status, detectedArea }: CentralReticleProps) {
  const getReticleAnimation = () => {
    switch (status) {
      case 'awaiting':
        return {
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6]
        }
      case 'scanning':
        return {
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
          rotate: [0, 360]
        }
      case 'detected':
        return {
          scale: 1.3,
          opacity: 1
        }
      default:
        return {
          scale: 1,
          opacity: 0.6
        }
    }
  }

  const getTransition = () => {
    switch (status) {
      case 'awaiting':
        return { duration: 2, repeat: Infinity, ease: "easeInOut" }
      case 'scanning':
        return { duration: 1, repeat: Infinity, ease: "linear" }
      case 'detected':
        return { duration: 0.3, ease: "easeOut" }
      default:
        return { duration: 0.5 }
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Central Reticle */}
      <motion.div
        className="relative"
        animate={getReticleAnimation()}
        transition={getTransition()}
      >
        <div className="w-16 h-16 relative">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-primary-400 rounded-full opacity-60"></div>
          
          {/* Inner crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-0.5 bg-primary-400"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 h-8 bg-primary-400"></div>
          </div>
          
          {/* Corner markers */}
          <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-primary-400"></div>
          <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-primary-400"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-primary-400"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-primary-400"></div>
        </div>
      </motion.div>

      {/* Detection Bounding Box */}
      {status === 'detected' && (
        <motion.div
          className="absolute border-2 border-primary-400 bg-primary-400/10"
          style={{
            left: detectedArea?.x || '40%',
            top: detectedArea?.y || '35%',
            width: detectedArea?.width || '20%',
            height: detectedArea?.height || '30%'
          }}
          initial={{ 
            scale: 0,
            opacity: 0,
            borderWidth: 0
          }}
          animate={{ 
            scale: 1,
            opacity: 1,
            borderWidth: 2
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {/* Glitch effect corners */}
          <motion.div
            className="absolute -top-1 -left-1 w-3 h-3 bg-primary-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.1, repeat: 3 }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.1, repeat: 3, delay: 0.05 }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.1, repeat: 3, delay: 0.1 }}
          />
          <motion.div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.1, repeat: 3, delay: 0.15 }}
          />
        </motion.div>
      )}
    </div>
  )
}