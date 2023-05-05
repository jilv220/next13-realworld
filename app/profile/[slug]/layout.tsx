import Link from 'next/link'
import { notFound } from 'next/navigation'

import { fetchData } from '@/lib/fetch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function ProfileLayout({ children, params }) {
  const username = decodeURIComponent(params.slug).slice(1)
  const res = await fetchData(
    `https://api.realworld.io/api/profiles/${username}`
  )
  if (res.status !== 200) {
    notFound()
  }
  const profile = res.data.profile

  return (
    <>
      <div className='mb-8 flex flex-col items-center bg-secondary pb-4 pt-8'>
        <Avatar className='mb-4 h-[100px] w-[100px]'>
          <AvatarImage
            className='rounded-full'
            src={profile.image}
            alt='profile avatar'
            width={100}
            height={100}
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <h4 className='mb-2'>{profile.username}</h4>
        <Link href='/login' className='text-primary hover:underline'>
          Sign in to follow
        </Link>
      </div>
      {children}
    </>
  )
}
