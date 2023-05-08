import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { IUser, IUserWithToken } from '@/types/user'
import fetchUser, { fetchUsersLogin } from '@/lib/fetchUser'

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

  const body = JSON.stringify({ user: data })
  let newMeta: IUserWithToken
  try {
    newMeta = await fetchUser({
      method: 'PUT',
      headers: {
        Authorization: `Token ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: body,
    })
  } catch (error) {
    console.error(error)
    return noContentRes
  }
  const isProd = process.env.NODE_ENV === 'production'
  noContentRes.cookies.set('jwt', newMeta.token, {
    path: '/',
    secure: isProd,
    httpOnly: true,
  })

  return noContentRes
}
