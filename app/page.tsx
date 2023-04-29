import { IArticle, queryParams } from '@/types/articles'
import { siteConfig } from '@/config/site'
import { fetchData } from '@/lib/fetch'
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
    limit: siteConfig.limit,
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
  const articlesCount = res.articlesCount
  const diff =
    articlesCount -
    Math.floor(articlesCount / siteConfig.limit) * siteConfig.limit
  let pageCount =
    diff > 0 && diff < siteConfig.limit
      ? articlesCount / siteConfig.limit + 1
      : articlesCount / siteConfig.limit

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
          <BottomNav pageCount={pageCount} />
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
