'use client'

import NextTopLoader from 'nextjs-toploader'

interface ProgressBarProps {
  showSpinner?: boolean
}

export default function ProgressBar({ showSpinner = false }: ProgressBarProps) {
  return (
    <NextTopLoader color={`hsl(var(--primary))`} showSpinner={showSpinner} />
  )
}
