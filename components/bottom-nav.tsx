'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'

export function BottomNav() {
  const pages = Array.from({ length: siteConfig.pages }, (_, i) => i + 1)
  const first = pages[0]
  const last = pages.at(-1)

  const searchParams = useSearchParams()
  const page = searchParams.get('page')
  const path = usePathname()
  let currPage = 1
  if (searchParams.get('page') && path == '/') {
    currPage = Number(page)
  }

  return (
    <nav>
      <ul className='my-4 flex flex-wrap'>
        {pages.map((el) => (
          <li key={el}>
            <Link
              href={`/?page=${el}`}
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
