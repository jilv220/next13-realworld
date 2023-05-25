'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

interface BottomNavProps {
  pageCount: number
}

export function BottomNav({ pageCount }: BottomNavProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)
  const first = pages[0]
  const last = pages.at(-1)

  const path = usePathname()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || undefined

  let currPage = 1
  if (searchParams.get('page') && path == '/') {
    currPage = Number(page)
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <nav>
      <ul className='my-4 flex flex-wrap'>
        {pages.map((el) => (
          <li key={el}>
            <Link
              href={`${path}?${createQueryString('page', `${el}`)}`}
              prefetch={el === currPage + 1}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-9',
                'rounded-none',
                el === first && 'rounded-l-md',
                el === last && 'rounded-r-md',
                el === currPage && 'bg-accent'
              )}
            >
              {el}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
