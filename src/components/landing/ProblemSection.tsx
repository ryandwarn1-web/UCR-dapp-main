'use client'

import React from 'react'
import { motion } from 'framer-motion'
import PixelIcon from '@/components/pixel/PixelIcon'

interface ProblemPoint {
  icon: 'lost-provenance' | 'platform-lockin' | 'ai-blackbox'
  title: string
  description: string
}

export default function ProblemSection() {
  const problems: ProblemPoint[] = [
    {
      icon: 'lost-provenance',
      title: 'Lost Provenance',
      description: 'Your work is shared, reposted, and re-uploaded until its origin is erased. You become anonymous.'
    },
    {
      icon: 'platform-lockin',
      title: 'Platform Lock-In',
      description: 'Your audience, reputation, and revenue are controlled by platforms that can change the rules or de-platform you at any time.'
    },
    {
      icon: 'ai-blackbox',
      title: 'The AI Black Box',
      description: 'Generative AI models are trained on your life\'s work without your consent, credit, or compensation, devaluing your unique skills.'
    }
  ]

  return (
    <section className="py-24 bg-obsidian-300 relative overflow-hidden">
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
            The Attribution Crisis
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            In today's digital landscape, creators face unprecedented challenges to maintaining 
            ownership and receiving fair compensation for their work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass-panel p-8 border-2 border-primary-500/20 backdrop-blur-md"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 relative">
                  <PixelIcon 
                    type={problem.icon}
                    size={96}
                    animated={true}
                    className="mx-auto"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{problem.title}</h3>
                <p className="text-white/70 leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}