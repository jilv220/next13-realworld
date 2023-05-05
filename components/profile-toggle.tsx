import React, { HTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProfileToggleProps extends HTMLAttributes<HTMLDivElement> {
  valueList: string[]
  selectedValue: string
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
          return (
            <TabsTrigger value={value} key={value} className='p-0 text-base'>
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
      <TabsContent value={selectedValue}>{children}</TabsContent>
    </Tabs>
  )
}
