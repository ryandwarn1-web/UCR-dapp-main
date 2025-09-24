'use client'

import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { config } from '@/lib/config'
import { GlassPanel, GlassInput, GlassSelect, GlassButton } from '@/components/glass'
import { PixelProgressBar } from '@/components/pixel'
import MintingStatus from '@/components/MintingStatus'

type MintingStatusType = 'idle' | 'uploading' | 'minting' | 'success' | 'error'

export default function MintPage() {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  // Form state
  const [contentType, setContentType] = useState<'music' | 'movie' | ''>('')
  const [creatorName, setCreatorName] = useState('')
  const [contentTitle, setContentTitle] = useState('')
  const [contentDescription, setContentDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [royaltyPercentage, setRoyaltyPercentage] = useState('10')
  const [collaborators, setCollaborators] = useState<Array<{name: string, address: string, share: string}>>([])
  const [mintingStatus, setMintingStatus] = useState<MintingStatusType>('idle')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const totalCollaboratorShare = collaborators.reduce((sum, collab) => sum + parseFloat(collab.share || '0'), 0)
  const creatorRoyalty = parseFloat(royaltyPercentage)

  const handleRemoveCollaborator = (indexToRemove: number) => {
    setCollaborators(collaborators.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    try {
      setMintingStatus('uploading')
      
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setMintingStatus('minting')
      
      // Simulate minting
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setMintingStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setMintingStatus('idle')
        setContentType('')
        setCreatorName('')
        setContentTitle('')
        setContentDescription('')
        setFile(null)
        setRoyaltyPercentage('10')
        setCollaborators([])
      }, 3000)
      
    } catch (error) {
      console.error('Minting failed:', error)
      setMintingStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-obsidian-300 relative py-12 px-4 sm:px-6 lg:px-8 pixel-grid">
      {/* Scan lines effect */}
      <div className="absolute inset-0 scan-lines pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="headline-glitch text-4xl lg:text-6xl mb-6 animate-pixel-fade">
            MINT YOUR CREATION
          </h1>
          <p className="text-xl body-text max-w-2xl mx-auto leading-relaxed">
            Enter the sacred act of sealing your work on-chain. 
            Transform your creation into an immutable Universal Credit Record.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <PixelProgressBar
            progress={(mintingStatus === 'idle' ? 25 : mintingStatus === 'uploading' ? 50 : mintingStatus === 'minting' ? 75 : 100)}
            steps={['UPLOAD', 'CREDITS', 'TERMS', 'MINT']}
            currentStep={mintingStatus === 'idle' ? 0 : mintingStatus === 'uploading' ? 1 : mintingStatus === 'minting' ? 2 : 3}
            animated={true}
          />
        </div>

        {/* Main Glass Panel - The Clean Room */}
        <GlassPanel className="p-8 space-y-8" glow={true}>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Content Type Selection */}
            <section className="space-y-6">
              <h2 className="headline-glitch text-2xl mb-6">Content Details</h2>
              
              <GlassSelect
                label="Content Type"
                value={contentType}
                onChange={(e) => setContentType(e.target.value as 'music' | 'movie')}
                options={[
                  { value: 'music', label: 'Music' },
                  { value: 'movie', label: 'Movie' }
                ]}
                placeholder="Select Content Type"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassInput
                  label="Creator's Name"
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g., Your Name or Company Name"
                  required
                  glitchOnFocus={true}
                />

                <GlassInput
                  label="Content Title"
                  type="text"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  placeholder="e.g., Song Title or Movie Title"
                  required
                  glitchOnFocus={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary body-text mb-2">
                  Content Description
                </label>
                <textarea
                  value={contentDescription}
                  onChange={(e) => setContentDescription(e.target.value)}
                  rows={4}
                  className="block w-full rounded-none border-2 border-glitch-500/30 bg-glass-200 backdrop-blur-md text-text-primary placeholder-text-secondary focus:border-glitch-500 focus:ring-0 px-4 py-3 text-sm font-sans transition-all duration-200"
                  placeholder="Describe your content"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary body-text mb-2">
                  Upload File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="audio/*,video/*"
                  className="block w-full text-sm text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-2 file:border-glitch-500/30 file:text-sm file:font-medium file:bg-glass-200 file:text-text-primary hover:file:bg-glass-100 file:backdrop-blur-md"
                  required
                />
              </div>
            </section>

            {/* Royalty Settings */}
            <section className="space-y-6">
              <h2 className="headline-glitch text-2xl mb-6">Revenue Distribution</h2>
              
              <GlassInput
                label="Creator Royalty Percentage"
                type="number"
                value={royaltyPercentage}
                onChange={(e) => setRoyaltyPercentage(e.target.value)}
                min="1"
                max="100"
                placeholder="10"
                required
                glitchOnFocus={true}
              />
            </section>

            <div className="pt-8">
              <GlassButton
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-lg font-semibold"
                disabled={mintingStatus !== 'idle'}
                glitchEffect={true}
              >
                {mintingStatus === 'idle' && 'MINT UCR NFT'}
                {mintingStatus === 'uploading' && 'UPLOADING...'}
                {mintingStatus === 'minting' && 'MINTING...'}
                {mintingStatus === 'success' && 'MINTED!'}
                {mintingStatus === 'error' && 'ERROR!'}
              </GlassButton>
            </div>
          </form>
          
          <MintingStatus status={mintingStatus} />
        </GlassPanel>
      </div>
    </div>
  )
}