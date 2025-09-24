'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  Users, 
  Zap, 
  Lock, 
  Globe, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Camera,
  Music,
  Image,
  FileText,
  Coins
} from 'lucide-react'
import { GlassPanel } from '@/components/glass'
import UCPSigil from '@/components/UCPSigil'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-obsidian-300 relative py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-glitch-500/5 via-transparent to-magenta-500/5" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center mb-8">
            <UCPSigil size={120} className="mb-6" glowIntensity="medium" />
            <h1 className="text-6xl font-bold font-pixel text-glitch-500 mb-6 leading-tight">
              UCP DOCUMENTATION
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            The New Standard for Creative Sovereignty
          </h2>
          
          <div className="mt-8 p-6 bg-red-500/20 border border-red-500/30 rounded-lg">
            <h3 className="text-2xl font-bold text-red-400 mb-4 font-pixel">
              STOP RENTING YOUR LEGACY. IT'S TIME TO OWN IT.
            </h3>
            <p className="text-xl text-red-300 font-semibold">
              The Attribution Crisis is Here. Your Work is at Risk.
            </p>
          </div>

          {/* UCP Sigil Showcase Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <GlassPanel className="p-8 text-center">
              <h3 className="text-2xl font-bold text-glitch-500 mb-6 font-pixel">
                THE UCP SIGIL: MACHINE-READABLE WATERMARK
              </h3>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <UCPSigil size={200} glowIntensity="high" />
                </div>
                <div className="text-left space-y-4">
                  <p className="text-white/90">
                    The UCP Sigil is a sophisticated machine-readable watermark designed for seamless integration into video content. 
                    This hexagonal data matrix serves as an immutable proof of ownership that can be detected by the UCP Lens.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-glass-200 p-3 rounded-none border border-glitch-500/20">
                      <strong className="text-glitch-500">Anchor Points:</strong> Three corner dots for precise orientation detection
                    </div>
                    <div className="bg-glass-200 p-3 rounded-none border border-glitch-500/20">
                      <strong className="text-glitch-500">Central Icon:</strong> Represents the Protocol Core and Lens system
                    </div>
                    <div className="bg-glass-200 p-3 rounded-none border border-glitch-500/20">
                      <strong className="text-glitch-500">Data Ring:</strong> Encodes UCR on-chain address in binary format
                    </div>
                    <div className="bg-glass-200 p-3 rounded-none border border-glitch-500/20">
                      <strong className="text-glitch-500">Neon Glow:</strong> Enhances visibility while maintaining aesthetic appeal
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </motion.div>

        {/* Crisis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <GlassPanel className="p-8">
            <div className="flex items-start mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">The Crisis</h3>
                <div className="space-y-4 text-white/90 leading-relaxed">
                  <p>
                    For too long, the internet has operated on a broken promise. You create, you share, and the value you generate is captured by platforms, aggregators, and anonymous accounts. Your credit is stripped, your content is used without permission, and your ability to earn a living is controlled by opaque algorithms.
                  </p>
                  <p>
                    Now, with the explosion of generative AI, this crisis has become an <strong className="text-red-400">existential threat</strong>. AI models are being trained on the collective work of humanity - on your work - without consent, credit, or compensation. The digital world is rapidly becoming a "black box" where the concept of provenance is being erased.
                  </p>
                  <p className="text-yellow-300 font-semibold">
                    This is not a future problem. This is happening now. Relying on old systems of copyright and platform goodwill is no longer a viable strategy. It is a recipe for creative extinction.
                  </p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <GlassPanel className="p-8">
            <div className="flex items-start mb-6">
              <Shield className="w-8 h-8 text-primary-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">The Solution</h3>
                <p className="text-white/90 leading-relaxed">
                  The Universal Credits Protocol (UCP) is not just another platform; it is a <strong className="text-primary-400">decentralized public utility</strong> designed to reverse this trend. It is a new foundation for the creative economy, giving you the tools to seize ownership, enforce your rights, and build a permanent, verifiable legacy.
                </p>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How UCP Revamps Rights Management: The Three Pillars of Sovereignty
          </h2>
          <p className="text-center text-white/80 mb-12 text-lg">
            UCP replaces the broken system with a simple but unbreakable on-chain logic.
          </p>

          <div className="space-y-8">
            {/* Pillar 1 */}
            <GlassPanel className="p-8">
              <div className="flex items-start mb-6">
                <div className="bg-primary-500 rounded-full p-3 mr-6 flex-shrink-0">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pillar 1: The Universal Credits Record (UCR) - Your Digital Birth Certificate
                  </h3>
                  <p className="text-white/90 mb-6">
                    Before you publish anywhere, you mint a UCR NFT. This is the core of the protocol. It is not just a collectible; it is a legally and cryptographically robust "digital birth certificate" for your work.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <Lock className="w-6 h-6 text-primary-400 mb-3" />
                      <h4 className="font-semibold text-white mb-2">Immutable Proof of Creation</h4>
                      <p className="text-sm text-white/80">
                        The UCR is timestamped on the Degen Chain blockchain, providing undeniable proof that you created your work at a specific moment in time.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg">
                      <Zap className="w-6 h-6 text-accent-400 mb-3" />
                      <h4 className="font-semibold text-white mb-2">Programmable Rights</h4>
                      <p className="text-sm text-white/80">
                        Embedded directly within your UCR, you define the terms. You state collaborators, revenue share, licensing rules, and AI training consent.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 p-4 rounded-lg">
                      <Shield className="w-6 h-6 text-success-400 mb-3" />
                      <h4 className="font-semibold text-white mb-2">True Ownership</h4>
                      <p className="text-sm text-white/80">
                        The UCR lives in your wallet, not on a company server. You can sell it, use it as collateral, or hold it as a permanent record.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Pillar 2 */}
            <GlassPanel className="p-8">
              <div className="flex items-start mb-6">
                <div className="bg-accent-500 rounded-full p-3 mr-6 flex-shrink-0">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pillar 2: The UCP Lens & Multi-Modal Watermarking - Your Global Watchdog
                  </h3>
                  <p className="text-white/90 mb-6">
                    How do you protect your work once it's out in the wild? We turn the entire community into your watchdog.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-lg">
                      <h4 className="font-semibold text-white mb-4 flex items-center">
                        <Camera className="w-5 h-5 mr-2 text-primary-400" />
                        Smart Watermarking
                      </h4>
                      <p className="text-white/80 mb-4">
                        When you mint a UCR, our dApp provides you with a protected version of your file.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <Image className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <strong className="text-blue-300">For Visual Media:</strong>
                            <p className="text-sm text-white/70">A subtle but machine-readable visual watermark is embedded.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Music className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <strong className="text-purple-300">For Audio Media:</strong>
                            <p className="text-sm text-white/70">An inaudible audio watermark is woven directly into the soundwaves.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-lg">
                      <h4 className="font-semibold text-white mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-accent-400" />
                        The UCP Lens & Community Scouting
                      </h4>
                      <p className="text-white/80 mb-4">
                        The UCP Lens is a core feature in our dApp that allows anyone to verify your work, anywhere.
                      </p>
                      <p className="text-white/80">
                        A community member, or "scout," can use their phone to scan a watermarked video on a TV, a photo on a blog, or even "listen" to a song playing in a store. This action, called a "sighting," is a human-verified attestation that gets logged permanently on-chain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Pillar 3 */}
            <GlassPanel className="p-8">
              <div className="flex items-start mb-6">
                <div className="bg-success-500 rounded-full p-3 mr-6 flex-shrink-0">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Pillar 3: The DAO - A Creator-Owned Institution
                  </h3>
                  <p className="text-white/90 mb-6">
                    The UCP is not a company; it is a Decentralized Autonomous Organization (DAO) governed by its users.
                  </p>
                  
                  <div className="bg-white/5 p-6 rounded-lg">
                    <h4 className="font-semibold text-white mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-success-400" />
                      Your Work is Your Vote
                    </h4>
                    <p className="text-white/80">
                      Governance power is not for sale. Your voting rights are determined by your reputation and contribution to the ecosystem - how many UCRs you've minted and how valuable your contributions as a scout are. This ensures the protocol always serves the interests of active creators.
                    </p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </motion.div>

        {/* Business Model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            The Business Model: A Self-Sustaining Public Utility
          </h2>
          <p className="text-center text-white/80 mb-12 text-lg">
            UCP has no speculative token. Our economic model is designed for stability, transparency, and long-term sustainability.
          </p>

          <div className="space-y-8">
            {/* Funding */}
            <GlassPanel className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <DollarSign className="w-7 h-7 mr-3 text-primary-400" />
                How the Protocol is Funded
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-lg">
                  <h4 className="font-semibold text-white mb-3 text-primary-300">Initial Funding</h4>
                  <p className="text-white/80">
                    The protocol's initial development and the "Sighting Reward Pool" are funded by a treasury seeded through grants and pre-seed investment from partners who believe in building a better creative economy.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-lg">
                  <h4 className="font-semibold text-white mb-3 text-success-300">Ongoing Sustainability</h4>
                  <p className="text-white/80">
                    The protocol funds itself by facilitating real commerce. When a brand, studio, or AI company licenses a UCR for commercial use, they pay in USDC. A small, transparent protocol fee (typically 1-2%) is automatically taken.
                  </p>
                </div>
              </div>
            </GlassPanel>

            {/* Revenue Sharing */}
            <GlassPanel className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Coins className="w-7 h-7 mr-3 text-accent-400" />
                How Revenue & Royalties are Shared
              </h3>
              
              <div className="bg-white/5 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-white mb-4">Example Transaction Flow:</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                    <span className="text-white/80">Brand pays for license</span>
                    <span className="text-success-400 font-semibold">$1,000 USDC</span>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                    <span className="text-white/80">Protocol fee (2%)</span>
                    <span className="text-yellow-400 font-semibold">$20 USDC → Sighting Pool</span>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                    <span className="text-white/80">Creators receive</span>
                    <span className="text-primary-400 font-semibold">$980 USDC (auto-split)</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/80">
                This system is transparent, instantaneous, and removes the need for invoices, collections, or trusting a third party to pay you.
              </p>
            </GlassPanel>

            {/* Scout Rewards */}
            <GlassPanel className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Eye className="w-7 h-7 mr-3 text-magenta-400" />
                How Community Scouts are Rewarded
              </h3>
              
              <div className="bg-white/5 p-6 rounded-lg mb-6">
                <p className="text-white/80 mb-4">
                  The Sighting Reward Pool, funded by the protocol fees, is used to directly incentivize the community.
                </p>
                <p className="text-white/80">
                  When a scout uses the UCP Lens to log a valid, new sighting of a UCR, the SightingLog smart contract automatically pays them a small, fixed reward (e.g., $0.10 USDC) for their work.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 p-6 rounded-lg border border-primary-500/30">
                <h4 className="font-semibold text-white mb-3">The Economic Flywheel</h4>
                <p className="text-white/90">
                  This creates a perfect economic flywheel: the more commercial activity the protocol enables, the more rewards are available for scouts. More active scouts lead to a stronger attribution network, which in turn makes the protocol more valuable and attractive for commercial use.
                </p>
              </div>
            </GlassPanel>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <GlassPanel className="p-8 bg-gradient-to-r from-glitch-500/20 to-magenta-500/20 border border-glitch-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              This is not a theoretical economy.
            </h3>
            <p className="text-xl text-white/90 mb-6">
              It's a direct, clear, and powerful system where the value generated by creative work is used to protect and reward the entire creative ecosystem.
            </p>
            <p className="text-2xl font-bold text-glitch-400 font-pixel">
              THE TIME TO JOIN IS NOW.
            </p>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  )
}