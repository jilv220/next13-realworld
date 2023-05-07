import { IUser } from '@/types/user'

import { fetchData } from './fetch'

export default async function useFetchUser(init?: RequestInit) {
  const res = await fetchData(
    'https://api.realworld.io/api/user',
    undefined,
    init
  )
  if (res.status !== 200) {
    throw new Error('not authorized')
  }
  return res.data.user as IUser
}
