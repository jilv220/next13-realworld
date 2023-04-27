'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function ClientRouterHandler() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  const path = usePathname()
  const prevTag = useRef<string | null>()

  const shouldScrollToTop = path === '/' && tag !== prevTag.current

  // record prev tag
  useEffect(() => {
    prevTag.current = tag
  }, [tag])

  // scroll to top when tag changes
  useEffect(() => {
    if (shouldScrollToTop) {
      window.scrollTo(0, 0)
    }
  }, [path, shouldScrollToTop, tag])

  return <></>
}
