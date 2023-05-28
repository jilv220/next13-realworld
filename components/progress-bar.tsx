'use client'

import { useRef } from 'react'
import NextTopLoader from 'nextjs-toploader'

interface ProgressBarProps {
  showSpinner?: boolean
}

export default function ProgressBar({ showSpinner = false }: ProgressBarProps) {
  // why this works...
  const primaryRef = useRef('var(--primary)')

  return (
    <NextTopLoader
      color={`hsl(${primaryRef.current})`}
      showSpinner={showSpinner}
    />
  )
}
