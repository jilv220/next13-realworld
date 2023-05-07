'use client'

import { HTMLAttributes, useEffect } from 'react'
import Link from 'next/link'

import { IArticle } from '@/types/articles'
import fetchFavorite from '@/lib/fetchFavorite'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { Icons } from './icons'

type ArticleMetaProps = Pick<
  IArticle,
  'author' | 'createdAt' | 'favoritesCount' | 'favorited'
> &
  HTMLAttributes<HTMLDivElement> & {
    showRear?: boolean
    slug?: string
    token?: string
  }

export function ArticleMeta({
  author,
  createdAt,
  favoritesCount,
  className,
  showRear,
  slug,
  token,
  favorited,
}: ArticleMetaProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toDateString()
  }

  const toggleFavorite = async (slug: string) => {
    const article = await fetchFavorite(slug, {
      method: 'post',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    console.log(article)
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
          <Link className='font-medium' href={`/profile/@${author.username}`}>
            {author.username}
          </Link>
          <span className='text-[0.8rem] font-thin'>
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
      {showRear && (
        <Button
          variant='outline'
          className={cn(favorited && 'border-primary bg-primary')}
          onClick={() => toggleFavorite(slug as string)}
        >
          {favorited ? (
            <Icons.favorite size={16} fill='white' className='mr-[3px]' />
          ) : (
            <Icons.favorite size={16} className='mr-[3px]' />
          )}

          {favoritesCount}
        </Button>
      )}
    </div>
  )
}
