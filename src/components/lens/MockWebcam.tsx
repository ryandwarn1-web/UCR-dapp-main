'use client'

import React, { forwardRef } from 'react'

interface MockWebcamProps {
  audio?: boolean
  screenshotFormat?: string
  videoConstraints?: any
  className?: string
}

// Mock webcam component that simulates camera feed
const MockWebcam = forwardRef<any, MockWebcamProps>(({ className, ...props }, ref) => {
  return (
    <div className={`relative ${className}`}>
      {/* Simulated camera feed with animated background */}
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated scan lines to simulate camera feed */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-primary-400/20"
              style={{
                top: `${(i * 5)}%`,
                animation: `scan-line ${2 + i * 0.1}s linear infinite`,
              }}
            />
          ))}
        </div>
        
        {/* Simulated camera noise/grain */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Camera status indicator */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white text-sm font-mono">LIVE</span>
        </div>
        
        {/* Mock content for scanning */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50 text-center">
            <div className="text-lg font-mono mb-2">MOCK CAMERA FEED</div>
            <div className="text-sm">Install react-webcam for real camera access</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scan-line {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </div>
  )
})

MockWebcam.displayName = 'MockWebcam'

export default MockWebcam