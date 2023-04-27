import { IArticle, queryParams } from '@/types/articles'
import { fetchData } from '@/lib/fetch'
import { Article } from '@/components/article'
import { FeedToggle } from '@/components/feed-toggle'
import { Tags } from '@/components/tags'

export default async function IndexPage({ searchParams }) {
  let queryParams: queryParams = {
    limit: 10,
    offset: 0,
  }

  let tabList = ['Global Feed']
  let selected = 0
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
        <main className='items-center gap-6 px-4 pb-8 pt-6 md:pb-10'>
          {articles.map((article: IArticle, index: number) => (
            <div key={article.slug}>
              <Article article={article} isFirst={index === 0}></Article>
            </div>
          ))}
        </main>
      </FeedToggle>
      <aside className='mt-6 basis-1/4 px-4 pb-8'>
        <div className='rounded bg-secondary px-[10px] pb-[10px] pt-[5px]'>
          <p className='mb-[0.2rem]'> Popular Tags </p>
          {/* @ts-expect-error Server Component */}
          <Tags></Tags>
        </div>
      </aside>
    </div>
  )
}
