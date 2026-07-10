import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { BASE_ID, SEED_POSTS } from './seed'
import type {
  CreatePostInput,
  ListPostsParams,
  ListPostsResult,
  Post,
  PostRepository,
  UpdatePostInput,
} from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'board.json')

function ensureStore(): void {
  if (existsSync(DATA_FILE)) return
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(SEED_POSTS, null, 2), 'utf-8')
}

function readPosts(): Post[] {
  ensureStore()
  const raw = readFileSync(DATA_FILE, 'utf-8')
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error('board.json 형식이 올바르지 않습니다.')
    }
    return parsed as Post[]
  } catch (error) {
    console.error('Failed to parse board data file', error)
    throw new Error('게시판 데이터를 읽을 수 없습니다. data/board.json 파일을 확인해 주세요.')
  }
}

function writePosts(posts: readonly Post[]): void {
  ensureStore()
  writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

function sortNewestFirst(posts: readonly Post[]): Post[] {
  return [...posts].sort((a, b) => b.id - a.id)
}

async function list({ page, pageSize, q }: ListPostsParams): Promise<ListPostsResult> {
  const posts = sortNewestFirst(readPosts())
  const keyword = q?.trim().toLowerCase()
  const filtered = keyword
    ? posts.filter((post) => post.title.toLowerCase().includes(keyword))
    : posts
  const start = (page - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  }
}

async function getById(id: number): Promise<Post | null> {
  return readPosts().find((post) => post.id === id) ?? null
}

async function create(data: CreatePostInput): Promise<Post> {
  const posts = readPosts()
  const maxId = posts.reduce((max, post) => Math.max(max, post.id), BASE_ID - 1)
  const now = new Date().toISOString()
  const newPost: Post = {
    id: maxId + 1,
    title: data.title,
    author: data.author,
    content: data.content,
    views: 0,
    createdAt: now,
    updatedAt: now,
  }
  writePosts([...posts, newPost])
  return newPost
}

async function update(id: number, data: UpdatePostInput): Promise<Post | null> {
  const posts = readPosts()
  const target = posts.find((post) => post.id === id)
  if (!target) return null

  const updated: Post = {
    ...target,
    ...data,
    updatedAt: new Date().toISOString(),
  }
  writePosts(posts.map((post) => (post.id === id ? updated : post)))
  return updated
}

async function remove(id: number): Promise<boolean> {
  const posts = readPosts()
  const next = posts.filter((post) => post.id !== id)
  if (next.length === posts.length) return false
  writePosts(next)
  return true
}

async function incrementViews(id: number): Promise<Post | null> {
  const posts = readPosts()
  const target = posts.find((post) => post.id === id)
  if (!target) return null

  const updated: Post = { ...target, views: target.views + 1 }
  writePosts(posts.map((post) => (post.id === id ? updated : post)))
  return updated
}

/** 로컬 개발용 JSON 파일 저장소 (Vercel 등 읽기 전용 파일시스템에서는 사용 불가). */
export const jsonPostRepository: PostRepository = {
  list,
  getById,
  create,
  update,
  remove,
  incrementViews,
}
