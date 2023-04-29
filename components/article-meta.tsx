import { HTMLAttributes } from 'react'

import { IArticle } from '@/types/articles'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { Icons } from './icons'

type ArticleMetaProps = Pick<
  IArticle,
  'author' | 'createdAt' | 'favoritesCount'
> &
  HTMLAttributes<HTMLDivElement> & {
    showRear?: boolean
  }

export function ArticleMeta({
  author,
  createdAt,
  favoritesCount,
  className,
  showRear,
}: ArticleMetaProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toDateString()
  }
  return (
    <div className={cn(className, 'flex justify-between')}>
      <div className='flex items-center'>
        <Avatar className='h-[32px] w-[32px]'>
          <AvatarImage
            className='rounded-full'
            src={author.image}
            alt='author image'
            width={32}
            height={32}
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className='ml-2 mr-6 flex flex-col items-start justify-center'>
          <a className='font-medium'>{author.username}</a>
          <span className='text-[0.8rem] font-thin'>
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
      {showRear && (
        <Button variant='outline'>
          <Icons.favorite size={16} className='mr-[3px]' />
          {favoritesCount}
        </Button>
      )}
    </div>
  )
}
