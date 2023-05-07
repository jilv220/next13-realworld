import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { IUser } from '@/types/user'
import { fetchData } from '@/lib/fetch'
import fetchUser from '@/lib/fetchUser'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export default async function ProfileLayout({ children, params }) {
  const username = decodeURIComponent(params.slug).slice(1)
  const res = await fetchData(
    `https://api.realworld.io/api/profiles/${username}`
  )
  if (res.status !== 200) {
    notFound()
  }
  const profile = res.data.profile

  const cookieStore = cookies()
  const token = cookieStore.get('jwt')

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
  const isSelf = username === self.username

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
        {token && !isSelf ? (
          <Button
            variant={'outline'}
            className='xl:mr-[calc(116px+1rem)] xl:self-end'
          >
            {' '}
            <Icons.follow /> Follow {profile.username}
          </Button>
        ) : token && isSelf ? (
          <Link
            href='/settings'
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'xl:mr-[calc(116px+1rem)] xl:self-end'
            )}
          >
            <Icons.settings />
            Edit Profile Settings
          </Link>
        ) : (
          <Link href='/login' className='text-primary hover:underline'>
            Sign in to follow
          </Link>
        )}
      </div>
      {children}
    </>
  )
}
