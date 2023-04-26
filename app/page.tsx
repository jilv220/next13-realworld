import Link from 'next/link'

import { IArticle } from '@/types/articles'
import { siteConfig } from '@/config/site'
import { fetchData } from '@/lib/fetch'
import { buttonVariants } from '@/components/ui/button'
import { Article } from '@/components/article'
import { FeedToggle } from '@/components/feed-toggle'
import { Tags } from '@/components/tags'

export default async function IndexPage() {
  const queryParams = {
    limit: '10',
    offset: '0',
  }

  const res = await fetchData(
    'https://api.realworld.io/api/articles',
    queryParams
  )
  const articles = res.articles

  const tabList = ['Global Feed', 'Test']
  const selected = 0

  return (
    <div className='container md:flex'>
      <FeedToggle valueList={tabList} selectedValue={tabList[selected]}>
        <section className='items-center gap-6 px-4 pb-8 pt-6 md:pb-10'>
          {articles.map((article: IArticle, index: number) => (
            <div key={article.slug}>
              <Article article={article} isFirst={index === 0}></Article>
            </div>
          ))}
        </section>
      </FeedToggle>
      <aside className='mt-6 px-4 pb-8'>
        <div className='rounded bg-secondary px-[10px] pb-[10px] pt-[5px]'>
          <p className='mb-[0.2rem]'> Popular Tags </p>
          {/* @ts-expect-error Server Component */}
          <Tags></Tags>
        </div>
      </aside>
    </div>
  )
}
