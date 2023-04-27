'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function ClientRouterHandler() {
  const searchParams = useSearchParams()

  const path = usePathname()
  const tag = searchParams.get('tag')
  const page = searchParams.get('page')

  const prevTag = useRef<string | null>()
  const prevPage = useRef<string | null>()

  const shouldScrollToTop = path === '/'

  // Record prev value
  useEffect(() => {
    prevTag.current = tag
    prevPage.current = page
  }, [tag, page])

  // Scroll to top
  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo(0, 0)
    }
  }, [path, shouldScrollToTop, tag, page])

  return <></>
}
