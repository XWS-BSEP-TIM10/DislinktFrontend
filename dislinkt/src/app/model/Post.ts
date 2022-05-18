import { Comment } from "./Comment"

export interface Post {
  id: string
  text: string
  ownerId: string
  firstName: string
  lastName: string
  likes: string[]
  dislikes: string[]
  comments: Comment[]
  creationDate: string
  image?: string
}
