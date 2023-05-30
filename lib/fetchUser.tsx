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

export async function fetchUsersLogin(body: BodyInit) {
  const res = await fetchData(
    'https://api.realworld.io/api/users/login',
    undefined,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
      cache: 'no-store',
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

export async function isAuth(
  token: RequestCookie | undefined,
  username?: string
) {
  if (!token) return false
  let self: IUserWithToken
  try {
    self = await fetchUser({
      headers: {
        Authorization: `Token ${token.value}`,
      },
    })
    if (username && username === self.username) {
      return true
    } else if (!username) {
      return true
    } else {
      return false
    }
  } catch (err) {
    // console.error(err)
    return false
  }
}
