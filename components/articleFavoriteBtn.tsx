'use client'

import { useState } from 'react'

import fetchFavorite from '@/lib/fetchFavorite'
import { cn } from '@/lib/utils'

import { Icons } from './icons'
import { Button } from './ui/button'

interface ArticleFavoriteBtnProps {
  favorited: boolean
  favoritesCount: number
  slug: string
  token: string
}

export default function ArticleFavoriteBtn({
  favorited,
  favoritesCount,
  token,
  slug,
}: ArticleFavoriteBtnProps) {
  const [favoriteState, setFavoriteState] = useState(favorited)
  const [favoritesCountState, setFavoritesCountState] = useState(favoritesCount)

  const toggleFavorite = async (slug: string) => {
    const prev = {
      favoriteState: favoriteState,
      favoritesCountState: favoritesCountState,
    }
    setFavoriteState(!favoriteState)
    setFavoritesCountState(
      favoriteState ? favoritesCountState - 1 : favoritesCountState + 1
    )
    let init: RequestInit = {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
    init.method = favoriteState ? 'delete' : 'post'
    try {
      await fetchFavorite(slug, init)
    } catch (error) {
      console.log(error)
      setFavoriteState(prev.favoriteState)
      setFavoritesCountState(prev.favoritesCountState)
    }
  }

  return (
    <Button
      variant='outline'
      className={cn(favoriteState && 'border-primary bg-primary')}
      onClick={(e) => {
        e.currentTarget.disabled = true
        toggleFavorite(slug as string)
        e.currentTarget.disabled = false
      }}
    >
      {favoriteState ? (
        <Icons.favorite size={16} fill='white' className='mr-[3px]' />
      ) : (
        <Icons.favorite size={16} className='mr-[3px]' />
      )}

      {favoritesCountState}
    </Button>
  )
}
