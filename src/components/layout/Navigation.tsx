'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  PlusCircle, 
  Camera, 
  User, 
  Vote, 
  Menu, 
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import UCPSigil from '@/components/UCPSigil'
import GlitchText from './GlitchText'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/mint', label: 'Mint' },
  { href: '/lens', label: 'Lens' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/dao', label: 'DAO' },
]

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* The Floating Glass Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian-300/80 backdrop-blur-md border-b border-primary-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left Section: The "Living" UCP Sigil */}
            <Link href="/" className="group relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <UCPSigil 
                  size={48} 
                  animated={true} 
                  glowIntensity="high"
                  className="transition-all duration-300 group-hover:brightness-125"
                />
                {/* Hover intensification effect */}
                <motion.div
                  className="absolute inset-0 bg-primary-500/20 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </Link>

            {/* Center Section: The "Glitch-Nav" */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group"
                  >
                    <GlitchText
                      text={item.label}
                      glitchOnHover={true}
                      isActive={isActive}
                      className={cn(
                        "text-sm font-medium transition-all duration-200 font-sans",
                        isActive
                          ? "text-primary-400"
                          : "text-white/90 group-hover:text-primary-400"
                      )}
                    />
                    {/* Active state underline with flickering pixels */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-full h-full bg-primary-400 animate-pulse" />
                        {/* Flickering pixel effect */}
                        <div className="absolute inset-0 flex justify-between">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-px h-full bg-primary-400"
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                scaleY: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Section: The On-Chain Identity Module */}
            <div className="flex items-center space-x-4">
              {/* Custom Web3Modal Integration */}
              <div className="hidden sm:block">
                <w3m-button />
              </div>
              
              {/* Mobile menu button - Glitchy Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 group relative"
              >
                <div className="relative w-6 h-6">
                  {isMobileMenuOpen ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6 text-primary-400" />
                    </motion.div>
                  ) : (
                    <div className="space-y-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-0.5 bg-primary-400"
                          animate={{
                            scaleX: [1, 0.8, 1],
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            </div>
        </div>

        </div>
      </nav>

      {/* Mobile Navigation - Full-Screen Glass Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Glass overlay background */}
            <div className="absolute inset-0 bg-obsidian-300/90 backdrop-blur-lg" />
            
            {/* Navigation content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
              {/* Mobile wallet button */}
              <div className="mb-8">
                <w3m-button />
              </div>
              
              {/* Navigation links */}
              {navItems.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center"
                    >
                      <GlitchText
                        text={item.label}
                        glitchOnHover={true}
                        isActive={isActive}
                        className={cn(
                          "text-3xl font-medium transition-all duration-200 font-sans",
                          isActive
                            ? "text-primary-400"
                            : "text-white/90"
                        )}
                      />
                      {/* Active state indicator */}
                      {isActive && (
                        <motion.div
                          className="mt-2 mx-auto w-16 h-px bg-primary-400"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}