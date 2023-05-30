import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { IUserWithToken } from '@/types/user'
import { fetchUsersLogin, isAuth } from '@/lib/fetchUser'
import { getJwtToken } from '@/lib/serverActions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function LoginPage() {
  const token = await getJwtToken()
  const shouldRedirect = await isAuth(token)
  if (shouldRedirect) {
    redirect('/')
  }

  const handleLogin = async (formData: FormData) => {
    'use server'
    const formEntries = formData.entries()
    const data = Object.fromEntries(formEntries)
    const body = JSON.stringify({ user: data })

    let user: IUserWithToken
    try {
      user = await fetchUsersLogin(body)
      const isProd = process.env.NODE_ENV === 'production'
      cookies().set({
        name: 'jwt',
        value: `${user.token}`,
        path: '/',
        secure: isProd,
        httpOnly: true,
      })
    } catch (err) {
      console.error(err)
      return
    }
    redirect('/')
  }

  return (
    <div className='container'>
      <div className='mt-6 flex flex-col items-center justify-center'>
        <h1 className='mb-2 text-[2.5rem] font-medium leading-[1.1]'>
          Sign In
        </h1>
        <p className='mb-4'>
          <Link href='/register' className='text-primary hover:underline'>
            {' '}
            Need an account?
          </Link>
        </p>
        <form className='w-full md:max-w-[40%]' action={handleLogin}>
          <fieldset>
            <Input
              name='email'
              type='email'
              placeholder='Email'
              autoComplete='email'
              className='mb-4 px-6 py-4 text-base'
              required
            ></Input>
            <Input
              name='password'
              type='password'
              placeholder='Password'
              className='mb-4 px-6 py-4 text-base'
            ></Input>
          </fieldset>
          <Button
            className='float-right px-6 py-4 text-base'
            size='lg'
            type='submit'
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}
