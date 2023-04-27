'use client'

import { Suspense } from 'react'
import useSWR from 'swr'

import { IArticle } from '@/types/articles'
import { fetchData } from '@/lib/fetch'

import { Article } from './article'

export function Articles() {
  const { data, error, isLoading } = useSWR(
    `https://api.realworld.io/api/articles?limit=${10}&offset=${0}`,
    fetchData
  )

  if (isLoading) return <>Loading...</>

  return (
    <>
      {data.articles.map((article: IArticle, index: number) => (
        <Article
          key={article.slug}
          article={article}
          isFirst={index === 0}
        ></Article>
      ))}
    </>
  )
}
