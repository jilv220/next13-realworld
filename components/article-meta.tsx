import { HTMLAttributes } from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { IArticle } from '@/types/articles'
import { isAuthAndSelf } from '@/lib/fetchUser'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import ArticleDeleteBtn from './article-delete-btn'
import ArticleFavoriteBtn from './articleFavoriteBtn'
import { Icons } from './icons'
import { Button, buttonVariants } from './ui/button'

type ArticleMetaProps = Pick<
  IArticle,
  'author' | 'createdAt' | 'favoritesCount' | 'favorited'
> &
  HTMLAttributes<HTMLDivElement> & {
    showRear?: boolean
    slug?: string
    path?: string
  }

export async function ArticleMeta({
  author,
  createdAt,
  favoritesCount,
  className,
  showRear,
  slug,
  favorited,
  path,
}: ArticleMetaProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toDateString()
  }

  const token = cookies().get('jwt')
  const authAndSelf = await isAuthAndSelf(token, author.username)

  return (
    <div className={cn(className, 'flex justify-between')}>
      <div className='flex items-center'>
        <Avatar className='h-[32px] w-[32px]'>
          <AvatarImage
            className='rounded-full'
            src={author.image}
            alt='author image'
            width={32}
            height={32}
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className='ml-2 mr-6 flex flex-col items-start justify-center'>
          <Link className='font-medium' href={`/profile/@${author.username}`}>
            {author.username}
          </Link>
          <span className='text-[0.8rem] font-thin'>
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
      {authAndSelf && path === 'article' && (
        <div>
          <Link
            href={`/editor/${slug}`}
            className={buttonVariants({ variant: 'outline' })}
          >
            <Icons.edit size={16} className='mr-1' />
            Edit Article
          </Link>
          <ArticleDeleteBtn slug={slug} token={token?.value} />
        </div>
      )}
      {showRear && (
        <ArticleFavoriteBtn
          favorited={favorited}
          favoritesCount={favoritesCount}
          slug={slug as string}
          token={token?.value as string}
        />
      )}
    </div>
  )
}
