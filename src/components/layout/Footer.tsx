'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Github, 
  Twitter, 
  MessageCircle, 
  BookOpen, 
  Shield, 
  Globe,
  Zap
} from 'lucide-react'

const footerLinks = {
  protocol: [
    { label: 'Documentation', href: '/docs', icon: BookOpen },
    { label: 'Security', href: '/security', icon: Shield },
    { label: 'Governance', href: '/dao', icon: Globe },
  ],
  community: [
    { label: 'Telegram', href: 'https://t.me/universalcp', icon: MessageCircle },
  ],
}

export function Footer() {
  return (
    <footer className="bg-obsidian-400 border-t border-glitch-500/20 relative">
      <div className="container-responsive py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-glitch-500 to-magenta-500 rounded-none flex items-center justify-center border border-glitch-500/30">
                <Zap className="h-6 w-6 text-obsidian-300 icon-pixel" />
              </div>
              <div className="headline-glitch text-xl">
                Universal Credits Protocol
              </div>
            </div>
            <p className="body-text-secondary mb-6 max-w-md leading-relaxed">
              The decentralized protocol for content rights management and discovery. 
              Empowering creators with true ownership and fair compensation in the Web3 era.
            </p>
            <div className="flex space-x-4">
              {footerLinks.community.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-glass-100 hover:bg-glass-50 rounded-none flex items-center justify-center transition-all duration-200 group border-2 border-glitch-500/20 hover:border-glitch-500/40 backdrop-blur-md"
                  >
                    <Icon className="h-5 w-5 icon-pixel group-hover:icon-pixel-active" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Protocol Links */}
          <div>
            <h3 className="headline-glitch text-lg mb-4">Protocol</h3>
            <ul className="space-y-3">
              {footerLinks.protocol.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 body-text-secondary hover:text-glitch-500 transition-colors duration-200 group"
                    >
                      <Icon className="h-4 w-4 icon-pixel group-hover:icon-pixel-active" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="headline-glitch text-lg mb-4">Network Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="body-text-secondary">Total UCRs:</span>
                <span className="data-text text-glitch-500">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="body-text-secondary">Active Creators:</span>
                <span className="data-text text-glitch-500">342</span>
              </div>
              <div className="flex justify-between">
                <span className="body-text-secondary">Sightings Logged:</span>
                <span className="data-text text-glitch-500">8,923</span>
              </div>
              <div className="flex justify-between">
                <span className="body-text-secondary">Revenue Distributed:</span>
                <span className="data-text text-glitch-500">$1,456 USDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-glitch-500/20 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="body-text-secondary text-xs sm:text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; 2024 Universal Credits Protocol. Decentralized and community-owned.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link href="/terms" className="body-text-secondary hover:text-glitch-500 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/privacy" className="body-text-secondary hover:text-glitch-500 transition-colors duration-200">
              Privacy Policy
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-neon-pulse" />
              <span className="data-text text-success-500">Degen Chain</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}