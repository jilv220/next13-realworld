import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

import { createArticle } from '@/lib/useFetchArticles'

export async function POST(req: NextRequest) {
  const formEntries = (await req.formData()).entries()
  const data = Object.fromEntries(formEntries)

  const cookieStore = cookies()
  const token = cookieStore.get('jwt')

  let noContentRes = new NextResponse(undefined, {
    status: 204,
  })
  if (!token) {
    return noContentRes
  }

  const { title, description, body, tagList } = data
  const tagListSplit = (tagList as string).split(' ')
  const reqBody = JSON.stringify({
    article: { title, description, body, tagList: tagListSplit },
  })

  try {
    await createArticle(token, reqBody)
    redirect('/')
  } catch (err) {
    console.error(err)
  }
  return noContentRes
}
