import Link from 'next/link'
import { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

import { Badge, badgeVariants } from './badge'

interface BadgeGroupProps extends VariantProps<typeof badgeVariants> {
  tagList: string[]
}

export function BadgeGroup({ tagList, variant }: BadgeGroupProps) {
  return (
    <>
      {tagList.map((tag: string) => (
        <Link href={`/?tag=${tag}`} key={tag} scroll={true}>
          <Badge
            className={cn(badgeVariants({ variant }), 'mr-[3px]')}
            variant={variant}
          >
            {' '}
            {tag}{' '}
          </Badge>
        </Link>
      ))}
    </>
  )
}
