import { IArticle } from '@/types/articles'

import { fetchData } from './fetch'

export default async function fetchFavorite(slug: string, init?: RequestInit) {
  const res = await fetchData(
    `https://api.realworld.io/api/articles/${slug}/favorite`,
    undefined,
    init
  )

  switch (res.status) {
    case 401:
      throw new Error('unauthorized')
    case 200:
      break
    default:
      throw new Error('fail to favorite the article')
  }
  return res.data.article as IArticle
}
