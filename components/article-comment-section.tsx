'use client'

import { useEffect, useState } from 'react'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { useRouter } from 'next/navigation'

import { IComment, IComments } from '@/types/comments'
import { IUserWithToken } from '@/types/user'
import {
  createComment,
  deleteComment,
  fetchComments,
} from '@/lib/fetchComments'
import fetchUser from '@/lib/fetchUser'
import { getJwtToken, serverRevalidatePath } from '@/lib/serverActions'

import AvatarWrapper from './avatar-wrapper'
import { Icons } from './icons'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Textarea } from './ui/textarea'

interface ArticleCommentProps {
  slug: string
}

export default function ArticleCommentSection({ slug }: ArticleCommentProps) {
  const [value, setValue] = useState('')
  const [token, setToken] = useState<RequestCookie | undefined>()
  const [comments, setComments] = useState<IComments>([])
  const [user, setUser] = useState<IUserWithToken | undefined>()

  useEffect(() => {
    const getToken = async () => {
      const token = await getJwtToken()
      setToken(token)
    }
    getToken()
  }, [])

  useEffect(() => {
    const getComments = async () => {
      let comments
      if (token) {
        comments = await fetchComments(slug, token)
      }
      setComments(comments)
    }
    const getUser = async () => {
      let user: IUserWithToken | undefined
      if (token) {
        user = await fetchUser({
          headers: {
            Authorization: `Token ${token.value}`,
          },
        })
      }
      if (user) {
        setUser(user)
      }
    }
    getComments()
    getUser()
  }, [token?.value])

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formEntries = formData.entries()
    const data = Object.fromEntries(formEntries)

    const { body } = data
    const reqBody = JSON.stringify({
      comment: { body },
    })

    let newComment: IComment
    try {
      if (token) {
        newComment = await createComment(slug, token, reqBody)
        setComments([...comments, newComment])
      }
    } catch (err) {
      console.error(err)
    }
    setValue('')
  }

  return (
    <div className='mx-[calc(100%/6)] my-6 w-full'>
      <form className='mb-3' method='post' onSubmit={handleCommentSubmit}>
        <Textarea
          id='comment-body'
          name='body'
          className='h-auto rounded-b-none p-5 focus-visible:ring-0'
          rows={3}
          placeholder='Write a comment...'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        ></Textarea>
        <div className='flex flex-row justify-between bg-secondary px-5 py-3'>
          <AvatarWrapper image={user?.image} />
          <Button size={'sm'} type='submit'>
            Post Comment
          </Button>
        </div>
      </form>
      {comments ? (
        comments.map((comment) => (
          <div className='mb-3' key={comment.id}>
            <div
              className='block max-w-[800px] justify-between rounded-md rounded-b-none border 
              bg-transparent p-5'
            >
              <p className='break-words text-sm'>{comment.body}</p>
            </div>
            <div className='flex flex-row justify-between bg-secondary px-5 py-3'>
              <AvatarWrapper image={comment.author.image} />
              <button
                onClick={async () => {
                  let success: boolean = false
                  if (token) {
                    try {
                      success = await deleteComment(slug, comment.id, token)
                      if (success) {
                        setComments(
                          comments.filter((el) => el.id !== comment.id)
                        )
                      }
                    } catch (err) {
                      console.error(err)
                    }
                  }
                }}
              >
                <Icons.delete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='mb-3'>
          <div
            className='flex flex-col justify-between rounded-md rounded-b-none border 
              bg-transparent p-5 text-sm'
          >
            <Skeleton className='mb-1 h-3 w-full' />
            <Skeleton className='mb-1 h-3 w-full' />
            <Skeleton className='mb-1 h-3 w-full' />
          </div>
          <div className='flex flex-row justify-between bg-secondary px-5 py-3'>
            <Skeleton className='h-[32px] w-full' />
          </div>
        </div>
      )}
    </div>
  )
}
