'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, TrendingUp, DollarSign, BarChart3, Zap } from 'lucide-react'

export default function NoTokenSection() {
  return (
    <section className="py-24 bg-obsidian-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="container-responsive relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Public Utility, Not a Speculative Project
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The Universal Credits Protocol is designed as a sustainable public infrastructure 
            for creators, with a unique economic model that aligns incentives with users, not speculators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Economic Model Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="glass-panel p-6 border-2 border-primary-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-primary-500/20 p-3 rounded-none">
                  <Shield className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">No $UCP Token</h3>
                  <p className="text-white/70">
                    Unlike most web3 projects, we don't have a speculative token. Governance is based on 
                    creator reputation (UCR ownership), not on buying votes. This ensures decisions are made 
                    by actual stakeholders in the ecosystem.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 border-2 border-primary-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-primary-500/20 p-3 rounded-none">
                  <TrendingUp className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Sustainable Economics</h3>
                  <p className="text-white/70">
                    Commercial license fees (paid in stablecoins) fund the reward pool for community scouts. 
                    This creates a self-sustaining loop where usage directly funds the system's maintenance 
                    and growth without requiring constant token price appreciation.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 border-2 border-primary-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-primary-500/20 p-3 rounded-none">
                  <Users className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">For Creators, By Creators</h3>
                  <p className="text-white/70">
                    This structure ensures the protocol's incentives are always aligned with its users, 
                    not with speculators. The DAO is governed by creators who have skin in the game, 
                    ensuring decisions benefit the ecosystem's long-term health.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Economic Flywheel Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Center Circle */}
              <div className="absolute inset-1/4 bg-glass-100 border-2 border-primary-500/30 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">UCP Ecosystem</div>
                </div>
              </div>

              {/* Flywheel Circles */}
              {[
                { 
                  icon: <DollarSign className="w-8 h-8 text-success-400" />, 
                  label: "License Fees", 
                  position: "top-0 left-1/2 -translate-x-1/2",
                  delay: 0
                },
                { 
                  icon: <BarChart3 className="w-8 h-8 text-accent-400" />, 
                  label: "Scout Rewards", 
                  position: "bottom-0 right-0",
                  delay: 0.2
                },
                { 
                  icon: <Users className="w-8 h-8 text-magenta-400" />, 
                  label: "Creator Value", 
                  position: "bottom-0 left-0",
                  delay: 0.4
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-24 h-24 bg-glass-100 border-2 border-primary-500/30 rounded-full flex flex-col items-center justify-center ${item.position}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: item.delay,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  {item.icon}
                  <div className="text-xs text-white mt-1 text-center">{item.label}</div>
                </motion.div>
              ))}

              {/* Connecting Arrows */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                <motion.path
                  d="M200,80 C260,80 320,160 320,320"
                  fill="none"
                  stroke="#00FFFF"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <motion.path
                  d="M320,320 C320,380 260,380 80,320"
                  fill="none"
                  stroke="#00FFFF"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.9 }}
                />
                <motion.path
                  d="M80,320 C20,260 80,120 200,80"
                  fill="none"
                  stroke="#00FFFF"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}