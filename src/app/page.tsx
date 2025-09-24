'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  TrendingUp, 
  Camera,
  PlusCircle,
  Vote,
  Play,
  Eye,
  Award
} from 'lucide-react'
import { formatLargeNumber } from '@/lib/utils'
import UCPSigil from '@/components/UCPSigil'
import HeroSection from '@/components/landing/HeroSection'
import ProblemSection from '@/components/landing/ProblemSection'
import LivingDocumentSection from '@/components/landing/LivingDocumentSection'
import NoTokenSection from '@/components/landing/NoTokenSection'
import FinalCTA from '@/components/landing/FinalCTA'

const features = [
  {
    icon: Shield,
    title: 'True Ownership',
    description: 'UCR NFTs provide immutable proof of content ownership and governance rights in the protocol.',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: Camera,
    title: 'Audio Discovery',
    description: 'Advanced audio fingerprinting technology identifies your content in the wild and rewards spotters.',
    color: 'from-secondary-500 to-secondary-600'
  },
  {
    icon: TrendingUp,
    title: 'Fair Revenue',
    description: 'Transparent licensing with 70% creator share and decentralized reward distribution.',
    color: 'from-accent-500 to-accent-600'
  },
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'Built on Degen Chain with permanent storage on Arweave. No central points of failure.',
    color: 'from-success-500 to-success-600'
  }
]

export default function HomePage() {
  const [data, setData] = useState({
    stats: {
      totalUCRs: 0,
      activeCreators: 0,
      sightingsLogged: 0,
      revenueDistributed: '$0 USDC',
    },
    trendingUCRs: [],
    recentSightings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/ucr-data');
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  // Create stats array for display
  const stats = [
    {
      icon: Award,
      label: 'Total UCRs',
      value: formatLargeNumber(data.stats.totalUCRs)
    },
    {
      icon: Users,
      label: 'Active Creators',
      value: formatLargeNumber(data.stats.activeCreators)
    },
    {
      icon: Eye,
      label: 'Sightings Logged',
      value: formatLargeNumber(data.stats.sightingsLogged)
    },
    {
      icon: TrendingUp,
      label: 'Revenue Distributed',
      value: data.stats.revenueDistributed
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian-300">
      {/* Section 1: Hero - The Emotional Hook */}
      <HeroSection 
        headline="THEY STOLE YOUR ART. STEAL IT BACK."
        subheadline="The Universal Credits Protocol is a decentralized public utility that gives you unbreakable, on-chain proof of ownership for your creative work."
      />

      {/* Section 2: The Problem - "The Attribution Crisis" */}
      <ProblemSection />

      {/* Section 3: The Solution - "How UCP Revamps Rights Management" */}
      <section id="how-it-works" className="py-24 bg-obsidian-300 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
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
              How UCP Revamps Rights Management
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Three pillars that give creators unbreakable ownership and fair compensation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="glass-panel p-8 border-2 border-primary-500/20 backdrop-blur-md text-center"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 4: The "Living Document" Showcase - Social Proof */}
      <LivingDocumentSection />

      {/* Section 5: The "No Token" Philosophy - Building Trust */}
      <NoTokenSection />

      {/* Section 6: The Final Call to Action */}
      <FinalCTA />
    </div>
  )
}
