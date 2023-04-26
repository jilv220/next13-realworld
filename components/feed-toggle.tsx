import React, { ReactNode } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FeedToggleProps {
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
}: FeedToggleProps) {
  return (
    <Tabs
      defaultValue={defaultValue ? defaultValue : valueList[0]}
      className='mt-6'
    >
      <TabsList>
        {valueList.map((value) => (
          <TabsTrigger value={value} key={value}>
            {' '}
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={selectedValue}>{children}</TabsContent>
    </Tabs>
  )
}
