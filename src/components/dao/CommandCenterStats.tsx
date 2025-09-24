'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Award, Zap } from 'lucide-react'
import { GlassPanel } from '@/components/glass'
import { FlickerNumber } from '@/components/pixel'

const stats = [
  {
    label: 'Treasury Balance',
    value: '2.4M',
    unit: 'USDC',
    icon: TrendingUp,
    color: '#00FFFF'
  },
  {
    label: 'Active Proposals',
    value: '7',
    unit: 'LIVE',
    icon: Award,
    color: '#FF00FF'
  },
  {
    label: 'Total Voters',
    value: '1,247',
    unit: 'MEMBERS',
    icon: Users,
    color: '#00FF00'
  },
  {
    label: 'Protocol Power',
    value: '98.7',
    unit: '%',
    icon: Zap,
    color: '#FFFF00'
  }
]

export default function CommandCenterStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <GlassPanel className="p-6 text-center h-full">
              <div className="flex items-center justify-center mb-3">
                <Icon 
                  className="h-8 w-8 icon-pixel-active" 
                  style={{ color: stat.color }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <FlickerNumber
                    value={stat.value}
                    className="text-2xl"
                    color={stat.color}
                    intensity="medium"
                  />
                  <span className="data-text text-text-secondary text-sm">
                    {stat.unit}
                  </span>
                </div>
                
                <div className="body-text-secondary text-sm">
                  {stat.label}
                </div>
              </div>
              
              {/* Status indicator */}
              <motion.div
                className="mt-3 h-1 bg-obsidian-200 rounded-none overflow-hidden"
              >
                <motion.div
                  className="h-full rounded-none"
                  style={{ backgroundColor: stat.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </motion.div>
            </GlassPanel>
          </motion.div>
        )
      })}
    </div>
  )
}