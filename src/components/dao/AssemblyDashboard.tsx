'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Info, ChevronDown, ChevronUp, Activity } from 'lucide-react'
import { GlassPanel } from '@/components/glass'

interface TreasuryAllocation {
  name: string
  amount: number
  percentage: number
  color: string
}

interface ReputationBreakdown {
  ucrsMinted: number
  portfolioSightings: number
  scoutActivity: number
}

interface LiveProposal {
  id: string
  title: string
  status: 'active' | 'passed' | 'failed'
}

const treasuryData: TreasuryAllocation[] = [
  { name: 'Sighting Reward Pool', amount: 2450000, percentage: 35, color: '#6366f1' },
  { name: 'Developer Grants', amount: 1750000, percentage: 25, color: '#8b5cf6' },
  { name: 'Marketing & Growth', amount: 1400000, percentage: 20, color: '#06b6d4' },
  { name: 'Operations', amount: 700000, percentage: 10, color: '#10b981' },
  { name: 'Emergency Reserve', amount: 700000, percentage: 10, color: '#f59e0b' }
]

const liveProposals: LiveProposal[] = [
  { id: 'UIP-003', title: 'Fund Development of WASM Audio Module', status: 'active' },
  { id: 'UIP-004', title: 'Increase Scout Reward Multiplier', status: 'active' },
  { id: 'UIP-002', title: 'Treasury Diversification Strategy', status: 'passed' },
  { id: 'UIP-001', title: 'Platform Fee Adjustment', status: 'failed' }
]

const TreasuryChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  const totalTreasury = treasuryData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="relative">
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {treasuryData.map((item, index) => {
              const radius = 35
              const circumference = 2 * Math.PI * radius
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
              const rotation = treasuryData.slice(0, index).reduce((sum, prev) => sum + prev.percentage, 0) * 3.6
              
              return (
                <motion.circle
                  key={item.name}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset="0"
                  style={{ transformOrigin: '50% 50%', transform: `rotate(${rotation}deg)` }}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredSegment(item.name)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  whileHover={{ strokeWidth: 10 }}
                  initial={{ strokeDasharray: '0 220' }}
                  animate={{ strokeDasharray }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              )
            })}
          </svg>
          
          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-serif">
                ${(totalTreasury / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-white/60 font-mono">TOTAL TREASURY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {treasuryData.map((item) => (
          <motion.div
            key={item.name}
            className={`flex items-center justify-between p-2 rounded transition-all duration-200 ${
              hoveredSegment === item.name ? 'bg-white/10' : ''
            }`}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-white/90 text-sm">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-white font-mono text-sm">
                ${(item.amount / 1000).toLocaleString()}K
              </div>
              <div className="text-white/60 text-xs">{item.percentage}%</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const VotingPowerWidget = ({ userAddress }: { userAddress?: string }) => {
  const [expanded, setExpanded] = useState(false)
  
  const reputation: ReputationBreakdown = {
    ucrsMinted: 50,
    portfolioSightings: 120,
    scoutActivity: 35
  }
  
  const totalPower = reputation.ucrsMinted + reputation.portfolioSightings + reputation.scoutActivity

  if (!userAddress) {
    return (
      <div className="text-center py-8">
        <div className="text-white/60 mb-4">Connect wallet to view your voting power</div>
        <button className="px-6 py-2 bg-primary-500/20 border border-primary-500/40 rounded text-primary-400 hover:bg-primary-500/30 transition-colors">
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary-400 mb-2 font-serif">{totalPower}</div>
        <div className="text-white/60 text-sm font-mono">VOTING POWER</div>
        <div className="text-white/40 text-xs">Reputation-Based Governance</div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
      >
        <Info className="w-4 h-4" />
        <span>View Breakdown</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 pt-4 border-t border-white/10"
          >
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">UCRs Minted</span>
              <span className="text-white font-mono">{reputation.ucrsMinted} VP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Portfolio Sightings</span>
              <span className="text-white font-mono">{reputation.portfolioSightings} VP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Scout Activity</span>
              <span className="text-white font-mono">{reputation.scoutActivity} VP</span>
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Total Power</span>
                <span className="text-primary-400 font-bold font-mono">{totalPower} VP</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const LiveProposalTicker = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400'
      case 'passed': return 'text-green-400'
      case 'failed': return 'text-red-400'
      default: return 'text-white/60'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary-400" />
        <h3 className="text-lg font-bold text-white">Live Proposals</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {liveProposals.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
          >
            <div className="flex-1">
              <div className="font-mono text-xs text-white/60 mb-1">{proposal.id}</div>
              <div className="text-white text-sm font-medium leading-tight">
                {proposal.title}
              </div>
            </div>
            <div className={`text-xs font-medium uppercase ${getStatusColor(proposal.status)}`}>
              {proposal.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function AssemblyDashboard({ userAddress }: { userAddress?: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* DAO Treasury */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GlassPanel className="p-6 h-full">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-primary-400" />
            <h2 className="text-xl font-bold text-white">DAO Treasury</h2>
          </div>
          <TreasuryChart />
        </GlassPanel>
      </motion.div>

      {/* Your Voting Power */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlassPanel className="p-6 h-full">
          <h2 className="text-xl font-bold text-white mb-6">Your Voting Power</h2>
          <VotingPowerWidget userAddress={userAddress} />
        </GlassPanel>
      </motion.div>

      {/* Live Proposal Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlassPanel className="p-6 h-full">
          <LiveProposalTicker />
        </GlassPanel>
      </motion.div>
    </div>
  )
}