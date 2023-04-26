'use client'

import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import { IArticle } from '@/types/articles'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Icons } from './icons'
import { BadgeGroup } from './ui/badgeGroup'

interface ArticleProps {
  article: IArticle
  isFirst: boolean
}

export function Article({ article, isFirst }: ArticleProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toDateString()
  }

  return (
    <>
      <div className={cn('py-6', isFirst && 'py-0 pb-6')}>
        <div className='flex justify-between'>
          <div className='mb-4 flex items-center'>
            <Avatar className='h-[32px] w-[32px]'>
              <AvatarImage
                className='rounded-full'
                src={article.author.image}
                alt='author image'
                width={32}
                height={32}
              />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className='ml-2 mr-6 flex flex-col items-start justify-center'>
              <a className='font-medium'>{article.author.username}</a>
              <span className='text-[0.8rem] font-thin'>
                {formatDate(article.createdAt)}
              </span>
            </div>
          </div>
          <Button variant='outline'>
            <Icons.favorite size={16} className='mr-[3px]' />
            {article?.favoritesCount}
          </Button>
        </div>
        <div className='mb-4'>
          <h1 className='h3-typo mb-[3px]'>{article.title}</h1>
          <p className='leading-7'>{article.description}</p>
        </div>
        <div className='flex justify-between'>
          <span>Read more...</span>
          <div>
            <BadgeGroup
              tagList={article.tagList}
              variant='outline'
            ></BadgeGroup>
          </div>
        </div>
      </div>
      <Separator className='my-[1px]' />
    </>
  )
}
