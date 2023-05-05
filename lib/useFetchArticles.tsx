import { notFound } from 'next/navigation'

import { ArticleParams } from '@/types/articles'

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
