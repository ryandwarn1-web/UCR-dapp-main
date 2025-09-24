'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Grid, 
  List, 
  Filter, 
  Search, 
  TrendingUp, 
  Eye, 
  Award,
  Music,
  ImageIcon,
  Video,
  FileText,
  Plus,
  ExternalLink,
  Briefcase,
  FolderOpen,
  Calendar,
  Clock,
  Building,
  Users,
  PieChart,
  BarChart3
} from 'lucide-react'
import { mockUCRs } from '@/lib/mockData'
import { formatPrice, formatDate, formatLargeNumber } from '@/lib/utils'
import { GlassPanel, GlassButton } from '@/components/glass'
import { FlickerNumber } from '@/components/pixel'

type ViewMode = 'grid' | 'list'
type FilterType = 'all' | 'audio' | 'image' | 'video' | 'document'

const contentTypeIcons = {
  audio: Music,
  image: ImageIcon,
  video: Video,
  document: FileText
}

const filterOptions = [
  { id: 'all', label: 'All Content', count: mockUCRs.length },
  { id: 'audio', label: 'Audio', count: mockUCRs.filter(ucr => ucr.metadata.contentType === 'audio').length },
  { id: 'image', label: 'Images', count: mockUCRs.filter(ucr => ucr.metadata.contentType === 'image').length },
  { id: 'video', label: 'Video', count: mockUCRs.filter(ucr => ucr.metadata.contentType === 'video').length },
] as const

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUCRs = mockUCRs.filter(ucr => {
    const matchesFilter = filter === 'all' || ucr.metadata.contentType === filter
    const matchesSearch = searchQuery === '' || 
      ucr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ucr.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ucr.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesFilter && matchesSearch
  })

  const totalStats = {
    ucrs: mockUCRs.length,
    sightings: mockUCRs.reduce((sum, ucr) => sum + ucr.stats.sightings, 0),
    revenue: mockUCRs.reduce((sum, ucr) => sum + ucr.stats.revenue, 0),
    licenses: mockUCRs.reduce((sum, ucr) => sum + ucr.stats.licenses, 0)
  }

  return (
    <div className="min-h-screen bg-obsidian-300 relative">
      {/* Digital Atelier Background - Brushed Metal Texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-slate-900/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(100, 116, 139, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
        {/* Subtle metal grain texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(148, 163, 184, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(71, 85, 105, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      <div className="container-responsive relative z-10 py-8">
        {/* Digital Atelier Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-4">
            Digital Atelier
          </h1>
          <p className="text-lg text-white/90">
            Command center for your on-chain creative business. Monitor, analyze, and manage your intellectual property portfolio.
          </p>
        </div>

        {/* Heads-Up Dashboard - Executive Metrics */}
        <div className="glass-panel p-8 mb-8 border-2 border-glitch-500/30 backdrop-blur-md">
          <h2 className="text-2xl headline-glitch mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-3 text-glitch-500 icon-pixel-active" />
            PORTFOLIO COMMAND CENTER
          </h2>

          {/* Executive Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: 'Total UCRs Minted',
                value: totalStats.ucrs,
                icon: Award,
                description: 'Registered works',
                color: 'text-blue-400',
                accent: 'border-blue-400/30'
              },
              { 
                label: 'Total Sightings',
                value: formatLargeNumber(totalStats.sightings),
                icon: Eye,
                description: 'Community verifications',
                color: 'text-emerald-400',
                accent: 'border-emerald-400/30'
              },
              { 
                label: 'Lifetime Earnings',
                value: `$${totalStats.revenue.toFixed(1)} USDC`,
                icon: TrendingUp,
                description: 'Commercial royalties',
                color: 'text-yellow-400',
                accent: 'border-yellow-400/30'
              },
              { 
                label: 'Portfolio Value',
                value: `$${(totalStats.revenue * 12).toFixed(0)}`,
                icon: PieChart,
                description: 'Estimated market value',
                color: 'text-purple-400',
                accent: 'border-purple-400/30'
              }
            ].map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-slate-800/50 backdrop-blur-sm border-2 ${metric.accent} rounded-none p-6 hover:bg-slate-800/70 transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${metric.color}`} />
                    <div className="text-right">
                      <div className={`text-2xl font-mono font-bold ${metric.color}`}>
                        {metric.value}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{metric.label}</h3>
                    <p className="text-slate-400 text-sm">{metric.description}</p>
                  </div>
                  {/* Luxury car dashboard style indicator */}
                  <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${metric.color.replace('text-', 'from-')} to-transparent`}
                      initial={{ width: '0%' }}
                      animate={{ width: '75%' }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>


        {/* Content Grid/List */}
        {filteredUCRs.length === 0 ? (
          <div className="glass-panel p-12 text-center border-2 border-slate-500/30 backdrop-blur-md">
            <div className="w-20 h-20 bg-slate-800/50 rounded-none border-2 border-slate-600/30 flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              No UCRs Found
            </h3>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              {searchQuery ? 'No UCRs match your current search or filter criteria.' : 'Start building your creative portfolio by registering your first work.'}
            </p>
            <Link
              href="/mint"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-none font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 border-2 border-blue-500/30"
            >
              <Plus className="mr-2 h-4 w-4" />
              Register First Work
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUCRs.map((ucr, index) => {
              const ContentIcon = contentTypeIcons[ucr.metadata.contentType]
              return (
                <motion.div
                  key={ucr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group perspective-1000"
                >
                  <Link href={`/ucr/${ucr.id}`}>
                    <motion.div 
                      className="bg-glass-100 backdrop-blur-md border-2 border-glitch-500/20 rounded-none overflow-hidden transition-all duration-300 h-full relative"
                      whileHover={{ 
                        rotateX: 5,
                        rotateY: 5,
                        scale: 1.02,
                        borderColor: 'rgba(0, 255, 255, 0.5)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 255, 0.3)'
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Framed Artwork */}
                      <div className="relative h-48 bg-gradient-to-br from-obsidian-200 to-obsidian-400 overflow-hidden">
                        <Image
                          src={ucr.imageUrl}
                          alt={ucr.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Glitch overlay effect on hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-glitch-500/20 via-transparent to-magenta-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ 
                            backgroundImage: 'linear-gradient(45deg, rgba(0, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 0, 255, 0.1) 25%, transparent 25%)',
                            backgroundSize: '4px 4px'
                          }}
                        />
                        
                        {/* Content Type Badge */}
                        <div className="absolute top-3 left-3 bg-glass-200 backdrop-blur-md border border-glitch-500/30 rounded-none px-2 py-1 flex items-center space-x-1">
                          <ContentIcon className="h-3 w-3 text-glitch-500 icon-pixel" />
                          <span className="text-xs text-text-primary font-pixel uppercase">{ucr.metadata.contentType}</span>
                        </div>
                        
                        {/* UCR ID Badge */}
                        <div className="absolute top-3 right-3 bg-glass-200 backdrop-blur-md border border-glitch-500/30 rounded-none px-2 py-1">
                          <span className="text-xs text-text-primary font-mono">#{ucr.tokenId}</span>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute bottom-3 left-3 bg-success-500 text-obsidian-300 px-2 py-1 rounded-none text-xs font-pixel">
                          ACTIVE
                        </div>

                        {/* Analytics Overlay - slides in on hover */}
                        <motion.div
                          className="absolute bottom-3 right-3 bg-glass-200 backdrop-blur-md border border-glitch-500/30 rounded-none p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex space-x-3 text-xs">
                            <div className="text-center">
                              <Eye className="h-3 w-3 text-glitch-500 mx-auto mb-1 icon-pixel" />
                              <div className="text-text-primary font-semibold">{ucr.stats.sightings}</div>
                            </div>
                            <div className="text-center">
                              <TrendingUp className="h-3 w-3 text-success-500 mx-auto mb-1 icon-pixel" />
                              <div className="text-success-500 font-semibold">{ucr.stats.revenue}</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Content Info */}
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="headline-glitch text-lg group-hover:text-magenta-500 transition-colors duration-200 line-clamp-2">
                            {ucr.title}
                          </h3>
                          <p className="text-sm text-text-secondary body-text">
                            by {ucr.creator.name}
                          </p>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4 text-sm border-t border-glitch-500/20 pt-3">
                          <div className="text-center">
                            <div className="text-text-secondary body-text-secondary">Sightings</div>
                            <div className="text-text-primary font-semibold data-text">{ucr.stats.sightings}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-text-secondary body-text-secondary">Revenue</div>
                            <div className="text-success-500 font-semibold data-text">{ucr.stats.revenue}</div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-2">
                          {ucr.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-glass-200 text-text-secondary text-xs rounded-none border border-glitch-500/20 font-pixel"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                          {ucr.tags.length > 2 && (
                            <span className="px-2 py-1 bg-glass-200 text-text-secondary text-xs rounded-none border border-glitch-500/20 font-pixel">
                              +{ucr.tags.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Creation Date */}
                        <div className="flex items-center justify-between text-xs border-t border-glitch-500/20 pt-3">
                          <div className="flex items-center text-text-secondary">
                            <Calendar className="h-3 w-3 mr-1 icon-pixel" />
                            <span className="body-text-secondary">{formatDate(ucr.createdAt)}</span>
                          </div>
                          <div className="flex items-center text-success-500">
                            <div className="w-2 h-2 bg-success-500 rounded-full mr-1 animate-neon-pulse" />
                            <span className="data-text">ACTIVE</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUCRs.map((ucr, index) => {
              const ContentIcon = contentTypeIcons[ucr.metadata.contentType]
              return (
                <motion.div
                  key={ucr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Link href={`/ucr/${ucr.id}`} className="group">
                    <div className="card hover:shadow-lg transition-all duration-300 group-hover:bg-white/5">
                      <div className="flex items-center space-x-6">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={ucr.imageUrl}
                            alt={ucr.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-1 left-1">
                            <div className="w-6 h-6 bg-black/50 backdrop-blur-sm rounded flex items-center justify-center">
                              <ContentIcon className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-lg text-white group-hover:text-primary-400 transition-colors duration-200 truncate">
                                {ucr.title}
                              </h3>
                              <p className="text-white/70 mb-2">
                                by {ucr.creator.name} • #{ucr.tokenId}
                              </p>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {ucr.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center space-x-8 ml-6">
                              <div className="text-center">
                                <div className="text-lg font-semibold text-white">{ucr.stats.sightings}</div>
                                <div className="text-sm text-white/60">Sightings</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold text-white">{ucr.stats.licenses}</div>
                                <div className="text-sm text-white/60">Licenses</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold text-success-600">{ucr.stats.revenue}</div>
                                <div className="text-sm text-white/60">USDC earned</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-white/60">Created</div>
                                <div className="text-sm font-medium text-white">{formatDate(ucr.createdAt)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}