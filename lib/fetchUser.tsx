import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { IUser, IUserWithToken } from '@/types/user'

import { fetchData } from './fetch'

export default async function fetchUser(init?: RequestInit) {
  const res = await fetchData(
    'https://api.realworld.io/api/user',
    undefined,
    init
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
  return res.data.user as IUserWithToken
}

export async function fetchUsersLogin(token: RequestCookie) {
  const res = await fetchData(
    'https://api.realworld.io/api/users/login',
    undefined,
    {
      headers: { Authorization: `Token ${token.value}` },
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
  return res.data.user as IUserWithToken
}

export async function isAuthAndSelf(
  token: RequestCookie | undefined,
  username: string
) {
  if (!token) return false

  let self: IUser = {
    email: '',
    username: '',
    bio: '',
    image: '',
  }

  if (token) {
    self = await fetchUser({
      headers: {
        Authorization: `Token ${token.value}`,
      },
    })
  }
  return username === self.username
}
