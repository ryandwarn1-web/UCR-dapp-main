'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ExternalLink, 
  Share2, 
  Heart, 
  Eye, 
  Award,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Music,
  ImageIcon,
  Video,
  FileText,
  Copy,
  Check,
  X
} from 'lucide-react'
import { getUCRById, getSightingsByUCR } from '@/lib/mockData'
import { formatAddress, formatPrice, formatDateTime, formatLargeNumber } from '@/lib/utils'

const contentTypeIcons = {
  audio: Music,
  image: ImageIcon,
  video: Video,
  document: FileText
}

const licenseTypes = [
  {
    id: 'personal',
    title: 'Personal License',
    description: 'Use for personal, non-commercial projects',
    features: [
      'Personal use only',
      'Social media sharing',
      'Educational projects',
      'No commercial use'
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial License',
    description: 'Use for commercial projects and marketing',
    features: [
      'Commercial use allowed',
      'Marketing campaigns',
      'Client projects',
      'Up to 10,000 copies'
    ],
    popular: true
  },
  {
    id: 'extended',
    title: 'Extended License',
    description: 'Unlimited usage rights and redistribution',
    features: [
      'Unlimited commercial use',
      'Resale and redistribution',
      'Broadcasting rights',
      'Template/product creation'
    ]
  }
]

export default function UCRDetailPage() {
  const params = useParams()
  const ucrId = params.id as string
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const ucr = getUCRById(ucrId)
  const sightings = getSightingsByUCR(ucrId)

  if (!ucr) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">UCR Not Found</h1>
          <p className="text-gray-600 mb-6">The requested UCR does not exist or has been removed.</p>
          <Link href="/portfolio" className="btn-primary">
            Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  const ContentIcon = contentTypeIcons[ucr.metadata.contentType]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLicensePurchase = (licenseType: string) => {
    setSelectedLicense(licenseType)
    setShowLicenseModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/portfolio"
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </button>
              <button className="btn-secondary">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Media */}
            <div className="card">
              <div className="relative w-full h-96 rounded-xl overflow-hidden mb-6">
                <Image
                  src={ucr.imageUrl}
                  alt={ucr.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <ContentIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-white">
                    #{ucr.tokenId}
                  </div>
                </div>
              </div>

              {/* Audio Player (if audio content) */}
              {ucr.metadata.contentType === 'audio' && ucr.audioUrl && (
                <div className="mb-6">
                  <audio controls className="w-full">
                    <source src={ucr.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              {/* Title and Description */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{ucr.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>by {ucr.creator.name}</span>
                    <span>•</span>
                    <span>{formatDateTime(ucr.createdAt)}</span>
                    <span>•</span>
                    <span className="capitalize">{ucr.metadata.contentType}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{ucr.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {ucr.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Content Hash</span>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm text-gray-900">{ucr.contentHash}</p>
                      <button
                        onClick={() => copyToClipboard(ucr.contentHash)}
                        className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">File Size</span>
                    <p className="font-medium text-gray-900">{ucr.metadata.fileSize}</p>
                  </div>
                  {ucr.metadata.duration && (
                    <div>
                      <span className="text-sm text-gray-600">Duration</span>
                      <p className="font-medium text-gray-900">{ucr.metadata.duration}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Format</span>
                    <p className="font-medium text-gray-900">{ucr.metadata.format}</p>
                  </div>
                  {ucr.metadata.dimensions && (
                    <div>
                      <span className="text-sm text-gray-600">Dimensions</span>
                      <p className="font-medium text-gray-900">{ucr.metadata.dimensions}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-600">Royalty</span>
                    <p className="font-medium text-gray-900">{ucr.licensing.royalty}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sightings */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Sightings</h2>
                <span className="text-sm text-gray-600">{sightings.length} total</span>
              </div>
              
              {sightings.length === 0 ? (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No sightings logged yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Your content will appear here when discovered by UCP Lens users
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sightings.slice(0, 5).map((sighting) => (
                    <div key={sighting.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={sighting.spotter.avatar}
                          alt={sighting.spotter.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{sighting.spotter.name}</span>
                          <span className="text-sm text-gray-600">spotted this content</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{sighting.location.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatDateTime(sighting.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="h-3 w-3" />
                            <span>{sighting.confidence}% match</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-success-600">+${sighting.reward} USDC</div>
                        <div className="text-xs text-gray-500">
                          {sighting.verified ? 'Verified' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Info */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={ucr.creator.avatar}
                    alt={ucr.creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{ucr.creator.name}</h3>
                  <p className="text-sm text-gray-600">Creator</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reputation:</span>
                  <span className="font-medium text-gray-900">{ucr.creator.reputation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-mono text-gray-900">{formatAddress(ucr.creator.address)}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Performance Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{formatLargeNumber(ucr.stats.views)}</div>
                  <div className="text-sm text-gray-600">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">{ucr.stats.sightings}</div>
                  <div className="text-sm text-gray-600">Sightings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600">{ucr.stats.licenses}</div>
                  <div className="text-sm text-gray-600">Licenses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">{ucr.stats.revenue}</div>
                  <div className="text-sm text-gray-600">USDC</div>
                </div>
              </div>
            </div>

            {/* Licensing */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">License This Work</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleLicensePurchase('personal')}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-left group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-primary-600">Personal</div>
                      <div className="text-sm text-gray-600">Non-commercial use</div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{formatPrice(ucr.licensing.personalPrice)}</div>
                  </div>
                </button>

                <button
                  onClick={() => handleLicensePurchase('commercial')}
                  className="w-full p-4 border-2 border-primary-500 bg-primary-50 rounded-lg hover:bg-primary-100 transition-all duration-200 text-left group relative"
                >
                  <div className="absolute -top-2 left-4">
                    <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">Popular</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-primary-900">Commercial</div>
                      <div className="text-sm text-primary-700">Business & marketing</div>
                    </div>
                    <div className="text-lg font-bold text-primary-900">{formatPrice(ucr.licensing.commercialPrice)}</div>
                  </div>
                </button>

                <button
                  onClick={() => handleLicensePurchase('extended')}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-left group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-primary-600">Extended</div>
                      <div className="text-sm text-gray-600">Unlimited rights</div>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{formatPrice(ucr.licensing.extendedPrice)}</div>
                  </div>
                </button>
              </div>

              <div className="mt-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-accent-600 mt-0.5" />
                  <div className="text-sm text-accent-800">
                    <strong>Secure Payment:</strong> All transactions are processed on-chain with USDC stablecoin payments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* License Modal */}
      <AnimatePresence>
        {showLicenseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Purchase License</h2>
                <button
                  onClick={() => setShowLicenseModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* License Details */}
                {licenseTypes.map((license) => (
                  license.id === selectedLicense && (
                    <div key={license.id} className="border border-primary-200 rounded-xl p-6 bg-primary-50">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{license.title}</h3>
                      <p className="text-gray-600 mb-4">{license.description}</p>
                      <ul className="space-y-2">
                        {license.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-success-600" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                ))}

                {/* Payment Summary */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">License Fee:</span>
                      <span className="font-medium">
                        {selectedLicense === 'personal' && formatPrice(ucr.licensing.personalPrice)}
                        {selectedLicense === 'commercial' && formatPrice(ucr.licensing.commercialPrice)}
                        {selectedLicense === 'extended' && formatPrice(ucr.licensing.extendedPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee (2%):</span>
                      <span className="font-medium">
                        {selectedLicense === 'personal' && formatPrice(ucr.licensing.personalPrice * 0.02)}
                        {selectedLicense === 'commercial' && formatPrice(ucr.licensing.commercialPrice * 0.02)}
                        {selectedLicense === 'extended' && formatPrice(ucr.licensing.extendedPrice * 0.02)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-lg">
                        {selectedLicense === 'personal' && formatPrice(ucr.licensing.personalPrice * 1.02)}
                        {selectedLicense === 'commercial' && formatPrice(ucr.licensing.commercialPrice * 1.02)}
                        {selectedLicense === 'extended' && formatPrice(ucr.licensing.extendedPrice * 1.02)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowLicenseModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Simulate purchase
                      alert('License purchase simulation - would process payment here')
                      setShowLicenseModal(false)
                    }}
                    className="btn-primary flex-1"
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Purchase License
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}