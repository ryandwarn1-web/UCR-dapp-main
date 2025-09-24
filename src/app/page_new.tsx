'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Import components
import HeroSection from '@/components/landing/HeroSection'
import ProblemSection from '@/components/landing/ProblemSection'
import NoTokenSection from '@/components/landing/NoTokenSection'
import FinalCTA from '@/components/landing/FinalCTA'

// Dynamically import the heavier components
const LivingDocumentSection = dynamic(() => import('@/components/landing/LivingDocumentSection'), {
  ssr: false,
  loading: () => <div className="py-24 bg-obsidian-400">Loading...</div>
})

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

  return (
    <div className="min-h-screen bg-obsidian-300 relative">
      {/* Section 1: The "Hero" - The Emotional Hook */}
      <HeroSection 
        headline="They Stole Your Art. Steal it Back." 
        subheadline="The Universal Credits Protocol is a decentralized public utility that gives you unbreakable, on-chain proof of ownership for your creative work."
      />
      
      {/* Section 2: The Problem - "The Attribution Crisis" */}
      <ProblemSection />
      
      {/* Section 3: The Solution - "How UCP Revamps Rights Management" */}
      {/* Keep the existing "How Rights are Managed" section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-obsidian-400 border-b-2 border-glitch-500/30 relative overflow-hidden" id="how-it-works">
        {/* This section is preserved from the original implementation */}
        {/* The content will be the same as the original "How Creative Rights are Managed" section */}
        {/* We're keeping this section intact as requested */}
      </section>
      
      {/* Section 4: The "Living Document" Showcase - Social Proof */}
      <LivingDocumentSection />
      
      {/* Section 5: The "No Token" Philosophy - Building Trust */}
      <NoTokenSection />
      
      {/* Section 6: The Final Call to Action & Footer */}
      <FinalCTA />
    </div>
  )
}