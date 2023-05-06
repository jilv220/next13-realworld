'use client'

import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProfileToggleProps extends HTMLAttributes<HTMLDivElement> {
  valueList: string[]
  selectedValue?: string
  defaultValue?: string
  children: ReactNode
  slug: string
}

export function ProfileToggle({
  valueList,
  selectedValue,
  defaultValue,
  children,
  slug,
  className,
}: ProfileToggleProps) {
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <Tabs defaultValue={value} className={cn('mt-6', className)}>
      <TabsList>
        {valueList.map((value, index) => {
          return (
            <TabsTrigger
              value={value}
              key={value}
              className='p-0 text-base'
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => setValue(value)}
            >
              {index === 0 ? (
                <Link href={`/profile/@${slug}`} className='px-3 py-1.5'>
                  {value}
                </Link>
              ) : (
                <Link
                  href={`/profile/@${slug}/favorites`}
                  className='px-3 py-1.5'
                >
                  {value}
                </Link>
              )}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent value={selectedValue || defaultValue || valueList[0]}>
        {children}
      </TabsContent>
    </Tabs>
  )
}
