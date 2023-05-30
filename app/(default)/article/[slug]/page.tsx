import Link from 'next/link'
import { notFound } from 'next/navigation'

import { IArticle } from '@/types/articles'
import { isAuth } from '@/lib/fetchUser'
import { getJwtToken } from '@/lib/serverActions'
import { fetchArticle } from '@/lib/useFetchArticles'
import { BadgeGroup } from '@/components/ui/badgeGroup'
import { Separator } from '@/components/ui/separator'
import ArticleCommentSection from '@/components/article-comment-section'
import { ArticleMeta } from '@/components/article-meta'

export default async function ArticlePage({ params }) {
  let article: IArticle
  try {
    article = (await fetchArticle(params.slug, {
      cache: 'no-store',
    })) as IArticle
  } catch (err) {
    console.log(err)
    notFound()
  }

  const token = await getJwtToken()
  const isUserAuth = await isAuth(token)

  return (
    <>
      <div className='mb-8 bg-secondary py-8'>
        <div className='m-auto px-4 xl:max-w-[1140px]'>
          <h1 className='text-[2.8rem] font-semibold'>{article.title}</h1>
          {/* @ts-expect-error Server Component */}
          <ArticleMeta
            author={article.author}
            favoritesCount={article.favoritesCount}
            createdAt={article.createdAt}
            className='mt-8'
            favorited={false}
            slug={article.slug}
            path='article'
          ></ArticleMeta>
        </div>
      </div>
      <div className='m-auto px-4 text-[1.2rem] xl:max-w-[1140px]'>
        <p className='mb-8'>{article.body}</p>
        <BadgeGroup tagList={article.tagList} className='mb-4'></BadgeGroup>
        <Separator className='my-4' />
        <div className='mx-[-15px] flex flex-wrap'>
          {isUserAuth ? (
            <ArticleCommentSection slug={params.slug} />
          ) : (
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
          )}
        </div>
      </div>
    </>
  )
}
