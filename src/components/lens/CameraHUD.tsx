'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Webcam from 'react-webcam'
import { Camera, Square, RotateCcw, Zap, Eye, Database } from 'lucide-react'

export interface CameraHUDProps {
  onCapture?: (imageSrc: string) => void
  onDetection?: (data: any) => void
}

export default function CameraHUD({ onCapture, onDetection }: CameraHUDProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [isDetected, setIsDetected] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [detectedData, setDetectedData] = useState<any>(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      onCapture?.(imageSrc)
      // Simulate detection process
      simulateDetection()
    }
  }, [onCapture])

  const simulateDetection = () => {
    setIsScanning(true)
    setScanProgress(0)
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          
          // Simulate successful detection
          const mockData = {
            ucrId: 'UCR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            title: 'Detected Content',
            creator: 'Artist Name',
            type: Math.random() > 0.5 ? 'music' : 'movie',
            confidence: Math.floor(Math.random() * 20) + 80,
            location: 'New York, NY',
            timestamp: new Date().toISOString()
          }
          
          setDetectedData(mockData)
          setIsDetected(true)
          onDetection?.(mockData)
          
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  const resetScan = () => {
    setIsDetected(false)
    setDetectedData(null)
    setScanProgress(0)
  }

  return (
    <div className="fixed inset-0 bg-obsidian-300 z-50 overflow-hidden">
      {/* Camera Feed */}
      <div className="absolute inset-0">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 1920,
            height: 1080,
            facingMode: "environment"
          }}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner Readouts */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="data-text text-glitch-500 text-sm">
            [LENS v3.0]
          </div>
          <div className="data-text text-text-primary text-sm">
            {isScanning ? '[STATUS: SCANNING...]' : 
             isDetected ? '[STATUS: DETECTED]' : 
             '[STATUS: READY]'}
          </div>
          <div className="data-text text-text-secondary text-xs">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 text-right space-y-2">
          <div className="data-text text-magenta-500 text-sm">
            [PROTOCOL: UCP]
          </div>
          <div className="data-text text-text-primary text-sm">
            [CHAIN: DEGEN]
          </div>
          <div className="data-text text-text-secondary text-xs">
            [CONFIDENCE: {isDetected ? `${detectedData?.confidence}%` : '--'}]
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="data-text text-success-500 text-sm">
            [GPS: ENABLED]
          </div>
          <div className="data-text text-text-secondary text-xs">
            [LAT: 40.7128]
          </div>
          <div className="data-text text-text-secondary text-xs">
            [LON: -74.0060]
          </div>
        </div>
        
        {/* Central Targeting Reticle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-64 h-64"
            animate={isScanning ? {
              scale: [1, 1.1, 1],
              rotate: [0, 360]
            } : {}}
            transition={{
              duration: 2,
              repeat: isScanning ? Infinity : 0,
              ease: "linear"
            }}
          >
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-glitch-500 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.3)',
                  '0 0 40px rgba(0, 255, 255, 0.8)',
                  '0 0 20px rgba(0, 255, 255, 0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner Cross */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-0.5 bg-glitch-500" />
              <div className="absolute w-0.5 h-8 bg-glitch-500" />
            </div>
            
            {/* Corner Brackets */}
            {[
              { top: 0, left: 0, rotate: 0 },
              { top: 0, right: 0, rotate: 90 },
              { bottom: 0, right: 0, rotate: 180 },
              { bottom: 0, left: 0, rotate: 270 }
            ].map((corner, index) => (
              <motion.div
                key={index}
                className="absolute w-8 h-8"
                style={corner}
                animate={isDetected ? {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                } : {}}
                transition={{
                  duration: 0.5,
                  repeat: isDetected ? Infinity : 0
                }}
              >
                <div 
                  className="w-full h-full border-l-2 border-t-2 border-glitch-500"
                  style={{ transform: `rotate(${corner.rotate}deg)` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scan Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.02) 50%)',
            backgroundSize: '100% 4px'
          }}
        />
        
        {/* Scanning Progress */}
        {isScanning && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="bg-obsidian-200 border-2 border-glitch-500 rounded-none w-64 h-4 overflow-hidden">
              <motion.div
                className="h-full bg-glitch-500"
                style={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-center mt-2 data-text text-glitch-500 text-sm">
              SCANNING... {scanProgress}%
            </div>
          </div>
        )}
      </div>
      
      {/* Detection Results */}
      <AnimatePresence>
        {isDetected && detectedData && (
          <motion.div
            className="absolute inset-x-4 bottom-4 bg-glass-100 backdrop-blur-md border-2 border-glitch-500 rounded-none p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="headline-glitch text-lg">DETECTION COMPLETE</h3>
              <div className="data-text text-success-500">
                {detectedData.confidence}% CONFIDENCE
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="body-text-secondary text-xs mb-1">UCR ID</div>
                <div className="data-text text-glitch-500">{detectedData.ucrId}</div>
              </div>
              <div>
                <div className="body-text-secondary text-xs mb-1">TYPE</div>
                <div className="data-text text-magenta-500">{detectedData.type.toUpperCase()}</div>
              </div>
              <div>
                <div className="body-text-secondary text-xs mb-1">CREATOR</div>
                <div className="body-text">{detectedData.creator}</div>
              </div>
              <div>
                <div className="body-text-secondary text-xs mb-1">LOCATION</div>
                <div className="body-text">{detectedData.location}</div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                className="flex-1 bg-glitch-500 hover:bg-glitch-400 text-obsidian-300 py-3 px-4 rounded-none font-pixel text-sm transition-colors duration-200 pointer-events-auto"
                onClick={() => {
                  // Log sighting logic here
                  console.log('Logging sighting:', detectedData)
                }}
              >
                LOG SIGHTING
              </button>
              <button
                className="bg-glass-100 hover:bg-glass-50 text-text-primary border border-glitch-500/30 hover:border-glitch-500/50 py-3 px-4 rounded-none transition-all duration-200 pointer-events-auto"
                onClick={resetScan}
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Control Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 pointer-events-auto">
        {!isDetected && !isScanning && (
          <motion.button
            className="w-16 h-16 bg-glitch-500 hover:bg-glitch-400 rounded-full flex items-center justify-center border-4 border-glitch-500 shadow-neon transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={capture}
          >
            <Camera className="h-8 w-8 text-obsidian-300" />
          </motion.button>
        )}
      </div>
    </div>
  )
}