import Link from 'next/link'

import { IArticle, queryParams } from '@/types/articles'
import { fetchData } from '@/lib/fetch'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Article } from '@/components/article'
import { BottomNav } from '@/components/bottom-nav'
import { FeedToggle } from '@/components/feed-toggle'
import { Tags } from '@/components/tags'

export default async function IndexPage({ searchParams }) {
  let currPage = 1
  let tabList = ['Global Feed']
  let selected = 0

  if (searchParams.page) {
    currPage = searchParams.page
  }

  let queryParams: queryParams = {
    limit: 10,
    offset: (currPage - 1) * 10,
  }

  if (searchParams.tag) {
    tabList = [...tabList, `#${searchParams.tag}`]
    selected = 1
    queryParams.tag = searchParams.tag
  }

  const res = await fetchData(
    'https://api.realworld.io/api/articles',
    queryParams
  )
  const articles = res.articles

  return (
    <div className='container md:flex'>
      <FeedToggle
        valueList={tabList}
        selectedValue={tabList[selected]}
        className='basis-3/4'
      >
        <main className='items-center gap-6 px-4 pt-6'>
          {articles.map((article: IArticle, index: number) => (
            <div key={article.slug}>
              <Article article={article} isFirst={index === 0}></Article>
            </div>
          ))}
          <BottomNav />
        </main>
      </FeedToggle>
      <aside className='basis-1/4 px-4 pb-8 sm:mt-0 md:mt-6'>
        <div className='rounded bg-secondary px-[10px] pb-[10px] pt-[5px]'>
          <p className='mb-[0.2rem]'> Popular Tags </p>
          {/* @ts-expect-error Server Component */}
          <Tags></Tags>
        </div>
      </aside>
    </div>
  )
}
