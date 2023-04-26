import { fetchData } from '@/lib/fetch'

import { BadgeGroup } from './ui/badgeGroup'

export async function Tags() {
  const res = await fetchData('https://api.realworld.io/api/tags')
  return <BadgeGroup tagList={res.tags}></BadgeGroup>
}
