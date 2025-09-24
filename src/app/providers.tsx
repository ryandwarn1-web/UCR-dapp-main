'use client'

import React, { useEffect, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State } from 'wagmi'

import { config, projectId } from '@/lib/config'

// Setup queryClient with default options to prevent hydration issues
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

export function Providers({ 
  children, 
  initialState 
}: { 
  children: React.ReactNode
  initialState?: State 
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Only initialize Web3Modal on the client side with error handling
    if (typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined') {
      import('@web3modal/wagmi/react').then(({ createWeb3Modal }) => {
        if (!projectId) {
          console.warn('Project ID is not defined')
          return
        }

        try {
          createWeb3Modal({
            wagmiConfig: config,
            projectId,
            enableAnalytics: false, // Disable analytics to prevent hydration issues
            enableOnramp: false, // Disable onramp to prevent hydration issues
            themeMode: 'dark',
            themeVariables: {
              '--w3m-color-mix': '#6366f1',
              '--w3m-color-mix-strength': 20,
            }
          })
        } catch (error) {
          console.warn('Failed to initialize Web3Modal:', error)
        }
      }).catch(error => {
        console.warn('Failed to load Web3Modal:', error)
      })
    }
  }, [])

  // Always render the providers, but show loading state until mounted
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {mounted ? children : (
          <div className="min-h-screen bg-obsidian-300 flex items-center justify-center">
            <div className="text-glitch-500">Loading...</div>
          </div>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  )
}