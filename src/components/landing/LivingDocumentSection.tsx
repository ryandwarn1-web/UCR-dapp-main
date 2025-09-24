'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import UCPSigil from '@/components/UCPSigil'

interface UCR {
  id: string
  title: string
  creator: string
  mediaUrl: string
  timestamp: string
}

interface Sighting {
  id: string
  ucrId: string
  ucrTitle: string
  location: string
  timestamp: string
  spotter: string
}

export default function LivingDocumentSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Mock data for recently minted UCRs
  const recentUCRs: UCR[] = [
    {
      id: '8901',
      title: 'Neon Dreams',
      creator: 'CyberArtist',
      mediaUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg',
      timestamp: '2 hours ago'
    },
    {
      id: '8902',
      title: 'Synthwave Sunset',
      creator: 'RetroWaveMaker',
      mediaUrl: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg',
      timestamp: '5 hours ago'
    },
    {
      id: '8903',
      title: 'Digital Dystopia',
      creator: 'FutureVision',
      mediaUrl: 'https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg',
      timestamp: '8 hours ago'
    },
    {
      id: '8904',
      title: 'Quantum Landscape',
      creator: 'DataPainter',
      mediaUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg',
      timestamp: '1 day ago'
    },
    {
      id: '8905',
      title: 'Cyber Punk City',
      creator: 'NeonArchitect',
      mediaUrl: 'https://images.pexels.com/photos/1637439/pexels-photo-1637439.jpeg',
      timestamp: '1 day ago'
    }
  ]

  // Mock data for recent sightings
  const recentSightings: Sighting[] = [
    {
      id: 's1001',
      ucrId: '7890',
      ucrTitle: 'Neon Nights',
      location: 'youtube.com/watch...',
      timestamp: '14:32:01',
      spotter: '0x123...'
    },
    {
      id: 's1002',
      ucrId: '5678',
      ucrTitle: 'Synthwave Dreams',
      location: 'Downtown Cafe',
      timestamp: '14:31:55',
      spotter: '0x456...'
    },
    {
      id: 's1003',
      ucrId: '9012',
      ucrTitle: 'Digital Horizon',
      location: 'instagram.com/p/...',
      timestamp: '14:30:22',
      spotter: '0x789...'
    },
    {
      id: 's1004',
      ucrId: '3456',
      ucrTitle: 'Cyber Dawn',
      location: 'twitter.com/status/...',
      timestamp: '14:28:45',
      spotter: '0xabc...'
    },
    {
      id: 's1005',
      ucrId: '7891',
      ucrTitle: 'Quantum Beat',
      location: 'spotify:track:...',
      timestamp: '14:25:17',
      spotter: '0xdef...'
    }
  ]

  // Carousel drag functionality
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setStartX(e.pageX - carousel.offsetLeft)
      setScrollLeft(carousel.scrollLeft)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startX) * 2 // Scroll speed
      carousel.scrollLeft = scrollLeft - walk
    }

    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mouseleave', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mouseleave', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, startX, scrollLeft])

  return (
    <section className="py-24 bg-obsidian-400 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
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
            The Living Document
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            See the protocol in action with real-time minting and sighting activity.
            The UCP is alive and growing with every creator who joins.
          </p>
        </motion.div>

        {/* Recently Minted UCRs */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Recently Minted UCRs</h3>
            <Link href="/discover" className="text-primary-400 hover:text-primary-300 flex items-center gap-1 group">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div 
            ref={carouselRef}
            className={`flex overflow-x-auto pb-6 space-x-6 no-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          >
            {recentUCRs.map((ucr) => (
              <motion.div
                key={ucr.id}
                className="flex-shrink-0 w-72"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/ucr/${ucr.id}`}>
                  <div className="glass-panel border-2 border-primary-500/20 overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image
                        src={ucr.mediaUrl}
                        alt={ucr.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 right-0 p-2">
                        <UCPSigil size={24} glowIntensity="low" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-white mb-1">{ucr.title}</h4>
                      <p className="text-white/70 text-sm mb-2">by {ucr.creator}</p>
                      <div className="flex items-center text-xs text-white/50">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{ucr.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Sighting Feed */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Live Sighting Feed</h3>
            <Link href="/lens" className="text-primary-400 hover:text-primary-300 flex items-center gap-1 group">
              <span>Open Lens</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="glass-panel border-2 border-primary-500/20 p-4 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse" />
              <span className="text-white/70 text-sm">LIVE FEED</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto terminal-scrollbar">
              {recentSightings.map((sighting, index) => (
                <motion.div
                  key={sighting.id}
                  className="text-sm font-mono"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="text-primary-400">[{sighting.timestamp}]</span>{' '}
                  <span className="text-white/90">SIGHTING:</span>{' '}
                  <span className="text-white">UCR #{sighting.ucrId}</span>{' '}
                  <span className="text-white/70">spotted at</span>{' '}
                  <span className="text-accent-400">{sighting.location}</span>{' '}
                  <span className="text-white/70">by</span>{' '}
                  <span className="text-success-400">{sighting.spotter}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}