import { redirect } from 'next/navigation'

import { IUserWithToken } from '@/types/user'
import fetchUser from '@/lib/fetchUser'
import { getJwtToken } from '@/lib/serverActions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import LogoutBtn from '@/components/logout-btn'

export default async function SettingsPage() {
  const token = await getJwtToken()

  let init: RequestInit = {
    cache: 'no-cache',
  }
  if (token) {
    init.headers = {
      Authorization: `Token ${token.value}`,
    }
  }

  let user: IUserWithToken
  try {
    user = await fetchUser(init)
  } catch (err) {
    redirect('/')
  }

  return (
    <div className='container'>
      <div className='mt-6 flex flex-col items-center justify-center'>
        <h1 className='mb-[0.67em] text-[2.5rem] font-normal leading-[1.1]'>
          Your Settings
        </h1>
        <form
          action='/api/user'
          method='post'
          className='w-full md:max-w-[40%]'
        >
          <fieldset>
            <Input
              name='image'
              type='text'
              placeholder='URL of profile picture'
              defaultValue={user.image}
              className='mb-4 px-6 py-4 text-base'
            ></Input>
            <Input
              name='username'
              type='text'
              placeholder='Username'
              defaultValue={user.username}
              className='mb-4 px-6 py-4 text-base'
            ></Input>
            <Textarea
              name='bio'
              placeholder='Short bio about you'
              defaultValue={user.bio}
              className='mb-4 h-full px-6 py-4 text-base'
              rows={8}
            ></Textarea>
            <Input
              name='email'
              type='email'
              placeholder='Email'
              defaultValue={user.email}
              className='mb-4 px-6 py-4 text-base'
            ></Input>
            <Input
              name='password'
              type='password'
              placeholder='New Password'
              className='mb-4 px-6 py-4 text-base'
            ></Input>
          </fieldset>
          <Button
            className='float-right px-6 py-4 text-base'
            size='lg'
            type='submit'
          >
            Update Settings
          </Button>
        </form>
        <form className='w-full md:max-w-[40%]'>
          <Separator className='my-4' />
          <LogoutBtn />
        </form>
      </div>
    </div>
  )
}
