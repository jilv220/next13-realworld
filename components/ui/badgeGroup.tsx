import { HTMLAttributes } from 'react'
import Link from 'next/link'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Badge, badgeVariants } from './badge'

interface BadgeGroupProps
  extends VariantProps<typeof badgeVariants>,
    HTMLAttributes<HTMLDivElement> {
  tagList: string[]
  prefetch?: boolean
}

export function BadgeGroup({
  tagList,
  prefetch = false,
  variant,
  className,
}: BadgeGroupProps) {
  return (
    <div className={className}>
      {tagList.map((tag) => (
        <Link href={`/?tag=${tag}`} prefetch={prefetch} key={tag}>
          <Badge
            className={cn(badgeVariants({ variant }), 'mr-[3px]')}
            variant={variant}
          >
            {' '}
            {tag}{' '}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
