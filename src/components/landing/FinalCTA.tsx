'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Vote } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15)_0%,transparent_70%)]" />
        
        {/* Animated Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white/20"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container-responsive relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Legacy is Waiting
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join thousands of creators who have already secured their work on-chain. 
            Take control of your creative rights and start earning from your content today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/mint"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 text-xl font-bold flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                <span>MINT YOUR UCR & SECURE YOUR WORK</span>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/dao"
                className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 px-8 py-4 text-xl font-bold flex items-center justify-center gap-2"
              >
                <Vote className="w-5 h-5" />
                <span>JOIN GOVERNANCE</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}