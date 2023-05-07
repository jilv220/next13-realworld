import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { fetchData } from '@/lib/fetch'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')
  if (!token) {
    return NextResponse.json('missing authorization credentials')
  }
  const res = await fetchData('https://api.realworld.io/api/user', undefined, {
    headers: {
      Authorization: `Token ${token.value}`,
    },
  })
  return NextResponse.json(res.data.user)
}
