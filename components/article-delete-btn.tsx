'use client'

import { useRouter } from 'next/navigation'

import { fetchArticle } from '@/lib/useFetchArticles'

import { Icons } from './icons'
import { Button } from './ui/button'

export default function ArticleDeleteBtn({ slug, token }) {
  const router = useRouter()
  const handleClick = async () => {
    try {
      await fetchArticle(slug, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button
      variant={'outline-destructive'}
      className='ml-2'
      onClick={(e) => {
        e.currentTarget.disabled = true
        handleClick()
        e.currentTarget.disabled = false
      }}
    >
      <Icons.delete size={16} className='mr-1' />
      Delete Article
    </Button>
  )
}
