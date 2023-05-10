'use client'

import { useState } from 'react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import { fetchProfile } from '@/lib/fetchProfile'

import { Icons } from './icons'
import { Button } from './ui/button'

interface ProfileFollowBtnProps {
  username: string
  following: boolean
  token: RequestCookie
}

export default function ProfileFollowBtn({
  username,
  following,
  token,
}: ProfileFollowBtnProps) {
  const [followingState, setFollowingState] = useState(following)
  const handleClick = async () => {
    const prev = followingState
    setFollowingState(!followingState)
    try {
      await fetchProfile(username, true, {
        method: prev ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Token ${token.value}`,
        },
      })
    } catch (error) {
      console.log(error)
      setFollowingState(prev)
    }
  }
  return (
    <Button
      variant={'outline'}
      className='xl:mr-[calc(116px+1rem)] xl:self-end'
      onClick={(e) => {
        e.currentTarget.disabled = true
        handleClick()
        e.currentTarget.disabled = false
      }}
    >
      {' '}
      <Icons.follow className='mr-1' /> {followingState ? 'Unfollow' : 'Follow'}{' '}
      {username}
    </Button>
  )
}
