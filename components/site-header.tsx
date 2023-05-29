import { cookies } from 'next/headers'
import Link from 'next/link'

import { IUserWithToken } from '@/types/user'
import { siteConfig } from '@/config/site'
import fetchUser from '@/lib/fetchUser'
import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'

import { MainNavDropDown } from './main-nav-dropdown'

export async function SiteHeader() {
  const token = cookies().get('jwt')

  let init: RequestInit = {
    cache: 'no-store',
  }
  if (token) {
    init.headers = {
      Authorization: `Token ${token.value}`,
    }
  }

  let user: IUserWithToken | undefined
  try {
    user = await fetchUser(init)
  } catch (err) {
    // console.error(err)
  }
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
        <MainNav items={siteConfig.mainNav} />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <MainNavDropDown
            user={user}
            items={siteConfig.mainNav}
          ></MainNavDropDown>
          <nav className='flex items-center space-x-1'>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
