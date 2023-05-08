import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { IArticle } from '@/types/articles'
import { fetchData } from '@/lib/fetch'
import useFetchArticles from '@/lib/useFetchArticles'
import { ArticlePreview } from '@/components/article-preview'
import { ProfileToggle } from '@/components/profile-toggle'

export default async function FavoritesPage({ params }) {
  const username = decodeURIComponent(params.slug).slice(1)
  const res = await fetchData(
    `https://api.realworld.io/api/profiles/${username}`
  )
  if (res.status !== 200) {
    notFound()
  }
  const profile = res.data.profile

  const tabList = ['Articles', 'Favorites']
  const selected = 1

  const cookieStore = cookies()
  const token = cookieStore.get('jwt')

  let init: RequestInit = {
    cache: 'no-store',
  }
  if (token) {
    init.headers = {
      Authorization: `Token ${token.value}`,
    }
  }

  const { articles } = await useFetchArticles(
    {
      favorited: profile.username,
      limit: 20,
      offset: 0,
    },
    init
  )

  return (
    <>
      <ProfileToggle
        className='container mx-auto md:px-4 xl:max-w-[1140px]'
        slug={profile.username}
        valueList={tabList}
        defaultValue={tabList[selected]}
      >
        <main className='basis-3/4 items-center'>
          {articles.map((article: IArticle) => (
            <div key={article.slug}>
              <ArticlePreview article={article}></ArticlePreview>
            </div>
          ))}
        </main>
        {articles.length === 0 && (
          <main className='py-4'> No articles are here... yet.</main>
        )}
      </ProfileToggle>
    </>
  )
}
