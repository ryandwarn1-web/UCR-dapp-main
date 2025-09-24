'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus, 
  ChevronDown, 
  ChevronUp,
  User,
  Calendar,
  BarChart3
} from 'lucide-react'
import { GlassPanel, GlassButton } from '@/components/glass'

interface Proposal {
  id: string
  title: string
  proposer: string
  summary: string
  description: string
  status: 'active' | 'passed' | 'failed'
  votesFor: number
  votesAgainst: number
  totalVotes: number
  endDate: string
  category: 'treasury' | 'protocol' | 'text'
  userVote?: 'for' | 'against' | null
}

const mockProposals: Proposal[] = [
  {
    id: 'UIP-003',
    title: 'Fund Development of WASM Audio Module',
    proposer: '0x742d...35Cc',
    summary: 'Allocate 150,000 USDC from Developer Grants to build a WebAssembly-based audio processing module for enhanced UCR metadata extraction.',
    description: `## Proposal Summary

This proposal requests funding for the development of a WebAssembly (WASM) audio processing module that will significantly enhance our ability to extract and verify metadata from audio UCRs.

## Technical Specifications

The module will include:
- Real-time audio fingerprinting
- Metadata extraction and validation
- Cross-platform compatibility
- Integration with existing UCR infrastructure

## Budget Breakdown

- Lead Developer (3 months): $90,000
- Audio Engineering Consultant: $30,000
- Testing and QA: $20,000
- Documentation and Integration: $10,000

**Total: $150,000 USDC**

## Timeline

- Month 1: Core WASM module development
- Month 2: Integration with UCR system
- Month 3: Testing, optimization, and documentation

## Expected Outcomes

This investment will improve UCR verification accuracy by 40% and reduce processing time by 60%.`,
    status: 'active',
    votesFor: 1247,
    votesAgainst: 342,
    totalVotes: 1589,
    endDate: '2024-01-15',
    category: 'treasury',
    userVote: null
  },
  {
    id: 'UIP-004',
    title: 'Increase Scout Reward Multiplier for Video Content',
    proposer: '0x1a2b...9f8e',
    summary: 'Increase the scout reward multiplier for video content sightings from 1.2x to 1.8x to incentivize more video content discovery.',
    description: `## Background

Video content represents the largest growth opportunity for the UCR ecosystem, yet scout participation in video sighting remains lower than other media types.

## Proposal Details

Increase scout reward multiplier for video content from 1.2x to 1.8x, effective immediately upon passage.

## Impact Analysis

- Expected 45% increase in video sighting activity
- Improved creator revenue for video UCRs
- Enhanced platform value proposition

## Cost Analysis

Based on current sighting volumes, this change will increase scout rewards by approximately 25,000 USDC monthly.`,
    status: 'active',
    votesFor: 892,
    votesAgainst: 156,
    totalVotes: 1048,
    endDate: '2024-01-20',
    category: 'protocol',
    userVote: 'for'
  },
  {
    id: 'UIP-002',
    title: 'Treasury Diversification Strategy',
    proposer: '0x8c7d...4a1b',
    summary: 'Diversify 30% of treasury holdings into blue-chip DeFi protocols to reduce risk and generate yield.',
    description: 'Comprehensive treasury diversification proposal...',
    status: 'passed',
    votesFor: 2156,
    votesAgainst: 445,
    totalVotes: 2601,
    endDate: '2024-01-05',
    category: 'treasury',
    userVote: 'for'
  }
]

const ProposalCard = ({ 
  proposal, 
  expanded, 
  onToggle, 
  onVote 
}: { 
  proposal: Proposal
  expanded: boolean
  onToggle: () => void
  onVote: (proposalId: string, vote: 'for' | 'against') => void
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500'
      case 'passed': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />
      case 'passed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const calculateVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  const forPercentage = calculateVotePercentage(proposal.votesFor, proposal.totalVotes)
  const againstPercentage = calculateVotePercentage(proposal.votesAgainst, proposal.totalVotes)

  return (
    <motion.div
      layout
      className="cursor-pointer"
      onClick={onToggle}
    >
      <GlassPanel className="p-6 hover:border-primary-500/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-sm text-primary-400">{proposal.id}</span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs text-white ${getStatusColor(proposal.status)}`}>
                {getStatusIcon(proposal.status)}
                <span className="capitalize">{proposal.status}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
            <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="font-mono">{proposal.proposer}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Ends {proposal.endDate}</span>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{proposal.summary}</p>
          </div>
          <div className="ml-4">
            {expanded ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
          </div>
        </div>

        {/* Voting Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60 flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              Voting Progress
            </span>
            <span className="text-white/60">{proposal.totalVotes.toLocaleString()} votes</span>
          </div>
          
          <div className="space-y-2">
            {/* For Votes */}
            <div className="flex items-center gap-3">
              <span className="text-blue-400 text-sm w-16">For</span>
              <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full ${proposal.userVote === 'for' ? 'bg-blue-500' : 'bg-blue-400'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${forPercentage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span className="text-blue-400 text-sm w-20 text-right font-mono">
                {proposal.votesFor.toLocaleString()} ({forPercentage.toFixed(1)}%)
              </span>
            </div>

            {/* Against Votes */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm w-16">Against</span>
              <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full ${proposal.userVote === 'against' ? 'bg-red-500' : 'bg-gray-400'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${againstPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <span className="text-gray-400 text-sm w-20 text-right font-mono">
                {proposal.votesAgainst.toLocaleString()} ({againstPercentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-white/90 text-sm leading-relaxed">
                  {proposal.description}
                </div>
              </div>

              {/* Voting Buttons */}
              {proposal.status === 'active' && (
                <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                  <GlassButton
                    variant={proposal.userVote === 'for' ? 'primary' : 'secondary'}
                    size="sm"
                    className="flex-1 text-blue-400 border-blue-400/30"
                    onClick={(e) => {
                      e.stopPropagation()
                      onVote(proposal.id, 'for')
                    }}
                  >
                    {proposal.userVote === 'for' ? '✓ Voted For' : 'Vote For'}
                  </GlassButton>
                  <GlassButton
                    variant={proposal.userVote === 'against' ? 'primary' : 'secondary'}
                    size="sm"
                    className="flex-1 text-red-400 border-red-400/30"
                    onClick={(e) => {
                      e.stopPropagation()
                      onVote(proposal.id, 'against')
                    }}
                  >
                    {proposal.userVote === 'against' ? '✓ Voted Against' : 'Vote Against'}
                  </GlassButton>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </GlassPanel>
    </motion.div>
  )
}

export default function ProposalHub() {
  const [activeTab, setActiveTab] = useState<'active' | 'passed' | 'failed' | 'create'>('active')
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null)
  const [proposals, setProposals] = useState(mockProposals)

  const filteredProposals = proposals.filter(p => p.status === activeTab)

  const handleVote = (proposalId: string, vote: 'for' | 'against') => {
    setProposals(prev => prev.map(p => 
      p.id === proposalId 
        ? { ...p, userVote: vote }
        : p
    ))
  }

  const tabs = [
    { id: 'active', label: 'Active', count: proposals.filter(p => p.status === 'active').length },
    { id: 'passed', label: 'Passed', count: proposals.filter(p => p.status === 'passed').length },
    { id: 'failed', label: 'Failed', count: proposals.filter(p => p.status === 'failed').length },
    { id: 'create', label: 'Create Proposal', count: null }
  ] as const

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {tab.id === 'create' && <Plus className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'create' ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassPanel className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Create New Proposal</h3>
              <p className="text-white/70 mb-6">
                Submit a proposal to the DAO for community consideration and voting.
              </p>
              <GlassButton variant="primary" size="lg">
                Start Proposal Creation
              </GlassButton>
            </GlassPanel>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {filteredProposals.length === 0 ? (
              <GlassPanel className="p-8 text-center">
                <p className="text-white/60">No {activeTab} proposals found.</p>
              </GlassPanel>
            ) : (
              filteredProposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  expanded={expandedProposal === proposal.id}
                  onToggle={() => setExpandedProposal(
                    expandedProposal === proposal.id ? null : proposal.id
                  )}
                  onVote={handleVote}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}