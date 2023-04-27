import React, { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FeedToggleProps extends HTMLAttributes<HTMLDivElement> {
  valueList: string[]
  selectedValue: string
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
  return (
    <Tabs
      defaultValue={
        selectedValue
          ? selectedValue
          : defaultValue
          ? defaultValue
          : valueList[0]
      }
      className={cn('mt-6', className)}
    >
      <TabsList>
        {valueList.map((value, index) => {
          if (index === 0) {
            return (
              <TabsTrigger key={value} value={value} className='p-0'>
                <Link href='/' className='px-3 py-1.5'>
                  {value}
                </Link>
              </TabsTrigger>
            )
          }
          return (
            <TabsTrigger value={value} key={value}>
              {' '}
              {value}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <TabsContent value={selectedValue}>{children}</TabsContent>
    </Tabs>
  )
}
