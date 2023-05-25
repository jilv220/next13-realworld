import { cookies } from 'next/headers'
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
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')

  return (
    <>
      <div className={cn('py-6')}>
        {/* @ts-expect-error Server Component */}
        <ArticleMeta
          author={article.author}
          favoritesCount={article.favoritesCount}
          createdAt={article.createdAt}
          slug={article.slug}
          favorited={article.favorited}
          showRear={token !== undefined}
          className='mb-4'
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
              prefetch={true}
              variant='outline'
            ></BadgeGroup>
          </div>
        </div>
      </div>
      <Separator className='my-[1px]' />
    </>
  )
}
