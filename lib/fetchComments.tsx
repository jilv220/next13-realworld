import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { IComment, IComments } from '@/types/comments'

import { fetchData } from './fetch'

export async function fetchComments(slug: string, token: RequestCookie) {
  const res = await fetchData(
    `https://api.realworld.io/api/articles/${slug}/comments`,
    undefined,
    {
      headers: {
        Authorization: `Token ${token.value}`,
        'Content-Type': 'application/json',
      },
    }
  )
  switch (res.status) {
    case 401:
      throw new Error('unauthorized')
    case 200:
      break
    case 422:
      throw new Error(res.data.errors.body)
    default:
      throw new Error(res.data)
  }
  return res.data.comments as IComments
}

export async function createComment(
  slug: string,
  token: RequestCookie,
  body: BodyInit
) {
  const res = await fetchData(
    `https://api.realworld.io/api/articles/${slug}/comments`,
    undefined,
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: body,
    }
  )
  switch (res.status) {
    case 401:
      throw new Error('unauthorized')
    case 200:
      break
    case 422:
      throw new Error(res.data.errors.body)
    default:
      throw new Error(res.data)
  }
  return res.data.comment as IComment
}

export async function deleteComment(
  slug: string,
  id: number,
  token: RequestCookie
) {
  const res = await fetchData(
    `https://api.realworld.io/api/articles/${slug}/comments/${id}`,
    undefined,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token.value}`,
      },
    }
  )
  switch (res.status) {
    case 401:
      throw new Error('unauthorized')
    case 200:
      break
    case 422:
      throw new Error(res.data.errors.body)
    default:
      throw new Error(res.data)
  }
  return true
}
