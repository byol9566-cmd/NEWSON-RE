export interface Post {
  id: number
  title: string
  author: string
  content: string
  views: number
  createdAt: string
  updatedAt: string
}

export interface CreatePostInput {
  title: string
  author: string
  content: string
}

export type UpdatePostInput = Partial<CreatePostInput>

export interface ListPostsParams {
  page: number
  pageSize: number
  q?: string
}

export interface ListPostsResult {
  items: Post[]
  total: number
  page: number
  pageSize: number
}

export interface PostRepository {
  list(params: ListPostsParams): Promise<ListPostsResult>
  getById(id: number): Promise<Post | null>
  create(data: CreatePostInput): Promise<Post>
  update(id: number, data: UpdatePostInput): Promise<Post | null>
  remove(id: number): Promise<boolean>
  incrementViews(id: number): Promise<Post | null>
}
