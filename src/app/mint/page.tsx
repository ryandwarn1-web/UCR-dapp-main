'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GlassButton } from '@/components/glass'
import FileDropzone from '@/components/mint/FileDropzone'
import CreditsStep from '@/components/mint/CreditsStep'
import TermsStep from '@/components/mint/TermsStep'
import MintStep from '@/components/mint/MintStep'
import ProgressBar from '@/components/mint/ProgressBar'

type MintingStatusType = 'idle' | 'confirming' | 'minting' | 'success' | 'error'

interface Contributor {
  id: string
  address: string
  role: string
  share: number
}

export default function MintPage() {
  const { address } = useAccount()

  // Step management
  const [currentStep, setCurrentStep] = useState(1)
  const stepLabels = ['UPLOAD', 'CREDITS', 'TERMS', 'MINT']

  // File state
  const [file, setFile] = useState<File | null>(null)
  const [contentHash, setContentHash] = useState<string | null>(null)

  // Contributors state
  const [contributors, setContributors] = useState<Contributor[]>([])

  // Terms state
  const [selectedLicense, setSelectedLicense] = useState('')
  const [aiTrainingConsent, setAiTrainingConsent] = useState(false)
  const [sigilEnabled, setSigilEnabled] = useState(true)

  // Minting state
  const [mintingStatus, setMintingStatus] = useState<MintingStatusType>('idle')
  const [mintedUCRId, setMintedUCRId] = useState<string | undefined>()

  // Generate content hash when file is selected
  useEffect(() => {
    if (file) {
      generateContentHash(file)
    }
  }, [file])

  const generateContentHash = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      setContentHash(hashHex)
    } catch (error) {
      console.error('Error generating hash:', error)
      setContentHash('Error generating hash')
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setContentHash(null) // Reset hash while generating new one
  }

  // Navigation functions
  const nextStep = () => {
    if (currentStep < stepLabels.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Validation functions
  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 1: // Upload
        return !!(file && contentHash)
      case 2: // Credits
        const totalShare = contributors.reduce((sum, c) => sum + c.share, 0)
        return totalShare === 100 && contributors.every(c => 
          c.address && c.role && c.share > 0
        )
      case 3: // Terms
        return !!selectedLicense
      case 4: // Mint
        return true
      default:
        return false
    }
  }

  // Minting function
  const handleMint = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    try {
      setMintingStatus('confirming')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMintingStatus('minting')
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate random UCR ID for demo
      const ucrId = Math.floor(Math.random() * 99999) + 10000
      setMintedUCRId(ucrId.toString())
      setMintingStatus('success')
      
    } catch (error) {
      console.error('Minting failed:', error)
      setMintingStatus('error')
      setTimeout(() => {
        setMintingStatus('idle')
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-obsidian-300 relative py-4 sm:py-6 lg:py-8">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      <div className="container-responsive relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent mb-4">
            The Digital Notary
          </h1>
          <p className="text-lg text-white/90">
            Permanently seal your work on-chain with Universal Content Rights
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep}
          totalSteps={stepLabels.length}
          stepLabels={stepLabels}
        />

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[600px]"
            >
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-2">Secure the Asset</h2>
                    <p className="text-white/60">Upload your media and generate a cryptographic fingerprint</p>
                  </div>
                  <FileDropzone
                    onFileSelect={handleFileSelect}
                    selectedFile={file}
                    contentHash={contentHash}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <CreditsStep
                  contributors={contributors}
                  onContributorsChange={setContributors}
                  userAddress={address}
                />
              )}

              {currentStep === 3 && (
                <TermsStep
                  selectedLicense={selectedLicense}
                  onLicenseChange={setSelectedLicense}
                  aiTrainingConsent={aiTrainingConsent}
                  onAiTrainingChange={setAiTrainingConsent}
                  sigilEnabled={sigilEnabled}
                  onSigilChange={setSigilEnabled}
                  mediaPreview={file ? URL.createObjectURL(file) : undefined}
                />
              )}

              {currentStep === 4 && (
                <MintStep
                  file={file}
                  contentHash={contentHash}
                  contributors={contributors}
                  selectedLicense={selectedLicense}
                  aiTrainingConsent={aiTrainingConsent}
                  sigilEnabled={sigilEnabled}
                  onMint={handleMint}
                  mintingStatus={mintingStatus}
                  mintedUCRId={mintedUCRId}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {mintingStatus !== 'success' && (
            <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
              <GlassButton
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </GlassButton>

              <div className="text-center">
                <p className="text-white/60 text-sm">
                  {currentStep < stepLabels.length ? (
                    canProceedFromStep(currentStep) ? 
                      "Ready to proceed" : 
                      "Complete this step to continue"
                  ) : (
                    "Ready to mint"
                  )}
                </p>
              </div>

              <GlassButton
                variant="primary"
                onClick={nextStep}
                disabled={currentStep === stepLabels.length || !canProceedFromStep(currentStep)}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </GlassButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}