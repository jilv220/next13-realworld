'use client'

import { useRouter } from 'next/navigation'

import { clearJwtToken } from '@/lib/cookie'

import { Button } from './ui/button'

export default function LogoutBtn() {
  return (
    <Button
      className='float-left mb-4 px-6 py-4 text-base hover:border-destructive hover:bg-destructive'
      variant={'outline'}
      size='lg'
      type='submit'
      onClick={() => {
        clearJwtToken()
      }}
    >
      Or click here to logout
    </Button>
  )
}
