import { IProfile } from '@/types/user'

import { fetchData } from './fetch'

export async function fetchProfile(
  usernameSlug: string,
  follow: boolean,
  init: RequestInit
) {
  const res = await fetchData(
    `https://api.realworld.io/api/profiles/${usernameSlug}/${
      follow ? 'follow' : ''
    }`,
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
  return res.data.profile as IProfile
}
