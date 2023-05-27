import { Suspense } from 'react'
import { cookies } from 'next/headers'

import { ArticleParams, IArticle } from '@/types/articles'
import { siteConfig } from '@/config/site'
import { fetchData } from '@/lib/fetch'
import { ArticlePreview } from '@/components/article-preview'
import { BottomNav } from '@/components/bottom-nav'
import { FeedToggle } from '@/components/feed-toggle'
import { Tags } from '@/components/tags'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function IndexPage({ searchParams }) {
  let currPage = 1
  let tabList = ['Global Feed']
  let selected = 0

  const cookieStore = cookies()
  const token = cookieStore.get('jwt')

  if (searchParams.page) {
    currPage = searchParams.page
  }

  let queryParams: ArticleParams = {
    limit: siteConfig.limit,
    offset: (currPage - 1) * 10,
  }

  if (token) {
    tabList = [...tabList, `Your Feed`]
  }

  if (searchParams.tag) {
    tabList = [...tabList, `#${searchParams.tag}`]
    selected = tabList.length - 1
    queryParams.tag = searchParams.tag
  }

  let articles
  let articlesCount
  let res

  if (token) {
    res = await fetchData(
      'https://api.realworld.io/api/articles',
      queryParams,
      {
        headers: {
          Authorization: `Token ${token.value}`,
        },
        cache: 'no-store',
      }
    )
  } else {
    res = await fetchData(
      'https://api.realworld.io/api/articles',
      queryParams,
      {
        cache: 'no-store',
      }
    )
  }

  if (searchParams.tab === 'feed' && token) {
    selected = tabList.length - 1
    res = await fetchData(
      'https://api.realworld.io/api/articles/feed',
      undefined,
      {
        headers: {
          Authorization: `Token ${token.value}`,
        },
        cache: 'no-store',
      }
    )
  }

  articles = res.data.articles
  articlesCount = res.data.articlesCount

  const reminder = articlesCount % siteConfig.limit
  let pageCount =
    reminder !== 0
      ? articlesCount / siteConfig.limit + 1
      : articlesCount / siteConfig.limit

  return (
    <div className='container mx-auto md:px-4 xl:max-w-[1140px]'>
      <Suspense
        fallback={
          <FeedToggle valueList={tabList} defaultValue={tabList[selected]}>
            Loading...
          </FeedToggle>
        }
      >
        <FeedToggle valueList={tabList} defaultValue={tabList[selected]}>
          <div className='md:flex'>
            <main className='basis-3/4 items-center'>
              {articles.map((article: IArticle, index) => (
                <div key={article.slug}>
                  <ArticlePreview
                    article={article}
                    index={index}
                  ></ArticlePreview>
                </div>
              ))}
              <BottomNav pageCount={pageCount} />
            </main>
            <aside className='basis-1/4 px-4 pb-8 sm:mt-0 md:mt-6'>
              <div className='rounded bg-secondary px-[10px] pb-[10px] pt-[5px]'>
                <p className='mb-[0.2rem]'> Popular Tags </p>
                {/* @ts-expect-error Server Component */}
                <Tags></Tags>
              </div>
            </aside>
          </div>
        </FeedToggle>
      </Suspense>
    </div>
  )
}
