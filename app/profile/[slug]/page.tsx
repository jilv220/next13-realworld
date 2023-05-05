import Link from 'next/link'
import { notFound } from 'next/navigation'

import { IArticle } from '@/types/articles'
import { fetchData } from '@/lib/fetch'
import useFetchArticles from '@/lib/useFetchArticles'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArticlePreview } from '@/components/article-preview'
import { FeedToggle } from '@/components/feed-toggle'
import { ProfileToggle } from '@/components/profile-toggle'

export default async function ProfilePage({ params }) {
  const username = decodeURIComponent(params.slug).slice(1)
  const res = await fetchData(
    `https://api.realworld.io/api/profiles/${username}`
  )
  if (res.status !== 200) {
    notFound()
  }
  console.log(res)
  const profile = res.data.profile

  const tabList = ['Articles', 'Favorites']
  const selected = 0

  const { articles } = await useFetchArticles({
    author: profile.username,
    limit: 5,
    offset: 0,
  })

  return (
    <>
      <ProfileToggle
        className='container mx-auto md:px-4 xl:max-w-[1140px]'
        slug={profile.username}
        valueList={tabList}
        selectedValue={tabList[selected]}
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
