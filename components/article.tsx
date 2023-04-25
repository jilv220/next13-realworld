"use client"

import Image from 'next/image'
import { IArticle } from "@/types/articles"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { Badge } from './ui/badge'

interface ArticleProps {
  article: IArticle
}

export function Article(props: ArticleProps) {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className='flex items-center'>
          <Avatar>
            <AvatarImage className='rounded-full' src={props.article?.author.image} alt="author image" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center justify-center'>
            <a>{props.article.author.username}</a>
            <span>{formatDate(props.article.createdAt)}</span>
          </div>
        </div>
        <Button variant='outline'>
          {props.article?.favoritesCount}
        </Button>
      </div>
      <div>
        <h1 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          {props.article.title}
        </h1>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          {props.article.description}
        </p>
      </div>
      <div className='flex justify-between'>
        <span>Read more...</span>
        <ul>{props.article.tagList.map((tag: string) => <Badge className='mr-1' variant='outline'>{tag}</Badge>)}</ul>
      </div>
    </div>
  )
}
