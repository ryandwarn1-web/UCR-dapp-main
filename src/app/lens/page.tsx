'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { GlassButton } from '@/components/glass'
import dynamic from 'next/dynamic'

// Dynamically import SeekersHUD to avoid SSR issues with camera access
const SeekersHUD = dynamic(() => import('@/components/lens/SeekersHUD'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-primary-400 text-xl">Loading Seeker's HUD...</div>
    </div>
  )
})

export default function LensPage() {
  const [isActive, setIsActive] = useState(true)
  
  const handleClose = () => {
    setIsActive(false)
    // In a real app, this would navigate back to the previous page
    setTimeout(() => {
      window.history.back()
    }, 300)
  }

  return (
    <div className="min-h-screen bg-black relative">
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back Button */}
            <motion.div 
              className="absolute top-4 left-4 z-50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit Lens</span>
              </GlassButton>
            </motion.div>
            
            {/* The Seeker's HUD */}
            <SeekersHUD onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
