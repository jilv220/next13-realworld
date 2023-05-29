import { IAuthor } from '@/types/articles'

export interface IComment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: IAuthor
}
export type IComments = IComment[]
