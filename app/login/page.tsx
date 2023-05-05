'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { setJwtToken } from '@/lib/cookie'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      user: {
        email: '',
        password: '',
      },
    }

    const formData = new FormData(event.target)
    for (const [key, value] of formData.entries()) {
      data.user[key] = value
    }

    const response = await fetch('https://api.realworld.io/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.status === 200) {
      const res = await response.json()
      setJwtToken(res.user.token)
      router.push('/')
      router.refresh()
    }
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
        <form
          onSubmit={handleSubmit}
          method='post'
          className='w-full md:max-w-[40%]'
        >
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
