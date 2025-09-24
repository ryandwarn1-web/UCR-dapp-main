'use client'

import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import AssemblyDashboard from '@/components/dao/AssemblyDashboard'
import ProposalHub from '@/components/dao/ProposalHub'

export default function DAOPage() {
  const { address } = useAccount()

  return (
    <div className="min-h-screen bg-obsidian-300 relative py-4 sm:py-6 lg:py-8">
      {/* Architectural Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 via-transparent to-slate-800/10" />
        {/* Geometric Parliament Architecture */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(71, 85, 105, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(71, 85, 105, 0.1) 1px, transparent 1px),
              linear-gradient(45deg, rgba(71, 85, 105, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 80px 80px'
          }}
        />
        {/* Abstract geometric shapes for architectural feel */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 border border-slate-500/10 rotate-45 transform"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-slate-500/10 rotate-12 transform"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-slate-500/10 rotate-45 transform"></div>
        </div>
      </div>

      <div className="container-responsive relative z-10">
        {/* Header - Digital Assembly */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Digital Assembly
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A transparent, democratic space where every voice matters. 
            Govern the future of Universal Content Rights through collective wisdom and shared responsibility.
          </motion.p>
        </div>

        {/* Assembly Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AssemblyDashboard userAddress={address} />
        </motion.div>

        {/* Proposal Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Proposal Hub</h2>
            <p className="text-white/70">
              Review, discuss, and vote on proposals that shape our collective future.
            </p>
          </div>
          <ProposalHub />
        </motion.div>
      </div>
    </div>
  )
}