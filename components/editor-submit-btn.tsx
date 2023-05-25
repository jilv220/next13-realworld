'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { Button } from './ui/button'

export default function EditorSubmitBtn() {
  const { pending } = useFormStatus()
  const router = useRouter()
  const prevPendingRef = useRef(false)

  useEffect(() => {
    prevPendingRef.current = pending
  }, [pending])

  if (prevPendingRef.current && !pending) {
    router.push('/')
  }

  return (
    <Button className='float-right px-6 py-4 text-base' size='lg' type='submit'>
      Publish Article
    </Button>
  )
}
