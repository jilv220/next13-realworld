import { notFound } from 'next/navigation'

import { ArticleParams, IArticle } from '@/types/articles'

import { fetchData } from './fetch'

export default async function useFetchArticles(
  queryParams: ArticleParams,
  init?: RequestInit
) {
  const res = await fetchData(
    'https://api.realworld.io/api/articles',
    queryParams,
    init
  )
  if (res.status !== 200) {
    return notFound()
  }
  return { articles: res.data.articles, articlesCount: res.data.articlesCount }
}

export async function fetchArticle(slug: string, init?: RequestInit) {
  const res = await fetchData(
    `https://api.realworld.io/api/articles/${slug}`,
    undefined,
    init
  )
  switch (res.status) {
    case 401:
      throw new Error('unauthorized')
    case 200:
      break
    case 204:
      // no content, delete success
      return
    case 422:
      throw new Error(res.data.errors.body)
    default:
      throw new Error(res.data)
  }
  return res.data.article as IArticle
}
