'use client'

import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FeedToggleProps extends HTMLAttributes<HTMLDivElement> {
  valueList: string[]
  selectedValue?: string
  defaultValue?: string
  children: ReactNode
}

export function FeedToggle({
  valueList,
  selectedValue,
  defaultValue,
  children,
  className,
}: FeedToggleProps) {
  // It is so weird to use Radix UI's tabs component...
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <Tabs value={value} className={cn('mt-6', className)}>
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
                <Link href='/' className='px-3 py-1.5' replace>
                  {value}
                </Link>
              ) : value === 'Your Feed' ? (
                <Link href='/?tab=feed' className='px-3 py-1.5' replace>
                  {value}
                </Link>
              ) : (
                <div className='px-3 py-1.5'>{value}</div>
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
