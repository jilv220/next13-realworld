import Link from 'next/link'

import { NavItem } from '@/types/nav'
import { IUserWithToken } from '@/types/user'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface MainNavProps {
  user: IUserWithToken | undefined
  items?: NavItem[]
}

export function MainNavDropDown({ user, items }: MainNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='h-[32px] w-[32px]'>
          {user && (
            <AvatarImage
              className='rounded-full'
              src={user.image}
              alt='author image'
              width={32}
              height={32}
            />
          )}
          <span className='flex h-full w-full items-center justify-center rounded-full bg-muted'>
            AI
          </span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!user ? (
          items &&
          items.map(
            (item) =>
              item.href && (
                <Link href={item.href} key={item.title}>
                  <DropdownMenuItem className='cursor-pointer'>
                    {item.title}
                  </DropdownMenuItem>
                </Link>
              )
          )
        ) : (
          <>
            <Link href={`/profile/@${user.username}`}>
              <DropdownMenuItem className='cursor-pointer'>
                Profile
              </DropdownMenuItem>
            </Link>

            <Link href={`/editor`}>
              <DropdownMenuItem className='cursor-pointer'>
                New Post
              </DropdownMenuItem>
            </Link>

            <Link href={`/settings`}>
              <DropdownMenuItem className='cursor-pointer'>
                Settings
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
