import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import fetchUser from '@/lib/fetchUser'
import { createArticle } from '@/lib/useFetchArticles'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import EditorSubmitBtn from '@/components/editor-submit-btn'

export default async function EditorPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')

  if (!token) {
    redirect('/')
  }

  let init: RequestInit = {
    headers: {
      Authorization: `Token ${token.value}`,
    },
    cache: 'no-store',
  }

  try {
    await fetchUser(init)
  } catch (err) {
    redirect('/')
  }

  async function upsertArticle(formData: FormData) {
    'use server'
    if (!token) return

    const formEntries = formData.entries()
    const data = Object.fromEntries(formEntries)

    const { title, description, body, tagList } = data
    const tagListSplit = (tagList as string).split(' ')
    const reqBody = JSON.stringify({
      article: { title, description, body, tagList: tagListSplit },
    })

    try {
      await createArticle(token, reqBody)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='container'>
      <div className='mt-6 flex flex-col items-center justify-center'>
        <form action={upsertArticle} className='w-full md:max-w-[40%]'>
          <fieldset>
            <Input
              name='title'
              type='text'
              placeholder='Article Title'
              className='mb-4 h-auto px-6 py-4 text-[20px]'
            ></Input>
            <Input
              name='description'
              type='text'
              placeholder="What's this article about?"
              className='mb-4 px-6 py-4 text-base'
            ></Input>
            <Textarea
              name='body'
              placeholder='Write your article (in markdown)'
              className='mb-4 h-full px-6 py-4 text-base'
              rows={8}
            ></Textarea>
            <Input
              name='tagList'
              placeholder='Enter Tags'
              className='mb-4 px-6 py-4 text-base'
            ></Input>
          </fieldset>
          <EditorSubmitBtn />
        </form>
      </div>
    </div>
  )
}
