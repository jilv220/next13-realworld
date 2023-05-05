import Link from 'next/link'

import { IArticle } from '@/types/articles'
import { fetchData } from '@/lib/fetch'
import { BadgeGroup } from '@/components/ui/badgeGroup'
import { Separator } from '@/components/ui/separator'
import { ArticleMeta } from '@/components/article-meta'

export const revalidate = 900
export const dynamic = 'error'

export default async function ArticlePage({ params }) {
  const res = await fetchData(
    `https://api.realworld.io/api/articles/${params.slug}`
  )
  const article: IArticle = res.data.article
  return (
    <>
      <div className='mb-8 bg-secondary py-8'>
        <div className='m-auto px-4 xl:max-w-[1140px]'>
          <h1 className='text-[2.8rem] font-semibold'>{article.title}</h1>
          <ArticleMeta
            author={article.author}
            favoritesCount={article.favoritesCount}
            createdAt={article.createdAt}
            className='mt-8'
          ></ArticleMeta>
        </div>
      </div>
      <div className='m-auto px-4 text-[1.2rem] xl:max-w-[1140px]'>
        <p className='mb-8'>{article.body}</p>
        <BadgeGroup tagList={article.tagList} className='mb-4'></BadgeGroup>
        <Separator className='my-4' />
        <div className='flex'>
          <p className='mb-12 ml-[16.66667%] mt-6'>
            <Link href='/login' className='text-primary'>
              Sign in
            </Link>{' '}
            or{' '}
            <Link href='/register' className='text-primary'>
              sign up
            </Link>{' '}
            to add comments on this article.
          </p>
        </div>
      </div>
    </>
  )
}
