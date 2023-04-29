'use client'

import Link from 'next/link'

import { IArticle } from '@/types/articles'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

import { ArticleMeta } from './article-meta'
import { BadgeGroup } from './ui/badgeGroup'

interface ArticleProps {
  article: IArticle
}

export function ArticlePreview({ article }: ArticleProps) {
  return (
    <>
      <div className={cn('py-6')}>
        <ArticleMeta
          author={article.author}
          favoritesCount={article.favoritesCount}
          createdAt={article.createdAt}
          className='mb-4'
          showRear={true}
        ></ArticleMeta>

        <div className='mb-4'>
          <Link href={`/article/${article.slug}`}>
            <h3 className='mb-[3px]'>{article.title}</h3>
            <p className='leading-7'>{article.description}</p>
          </Link>
        </div>

        <div className='flex justify-between'>
          <Link href={`/article/${article.slug}`}>
            <span>Read more...</span>
          </Link>
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
