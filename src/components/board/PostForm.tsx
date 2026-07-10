'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface EditablePost {
  id: number
  title: string
  author: string
  content: string
}

interface PostFormProps {
  mode: 'create' | 'edit'
  post?: EditablePost
}

export default function PostForm({ mode, post }: PostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title ?? '')
  const [author, setAuthor] = useState(post?.author ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cancelHref = mode === 'edit' && post ? `/pressrelease/${post.id}` : '/pressrelease'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    if (!title.trim()) {
      setErrorMessage('제목을 입력해 주세요.')
      return
    }
    if (!author.trim()) {
      setErrorMessage('글쓴이를 입력해 주세요.')
      return
    }
    if (!content.trim()) {
      setErrorMessage('내용을 입력해 주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      const url = mode === 'create' ? '/api/board' : `/api/board/${post?.id}`
      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, content }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error ?? '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      const targetId: number | undefined = data.post?.id ?? post?.id
      router.push(targetId ? `/pressrelease/${targetId}` : '/pressrelease')
      router.refresh()
    } catch {
      setErrorMessage('저장에 실패했습니다. 네트워크 상태를 확인해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="board-form" onSubmit={handleSubmit} noValidate>
      <div className="bf-field">
        <label htmlFor="bf-title">제목</label>
        <input
          id="bf-title"
          type="text"
          value={title}
          maxLength={200}
          required
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="bf-field">
        <label htmlFor="bf-author">글쓴이</label>
        <input
          id="bf-author"
          type="text"
          value={author}
          maxLength={50}
          required
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div className="bf-field">
        <label htmlFor="bf-content">내용</label>
        <textarea
          id="bf-content"
          value={content}
          maxLength={20000}
          rows={14}
          required
          onChange={(event) => setContent(event.target.value)}
        />
      </div>

      {errorMessage && (
        <p className="bf-error" role="alert">{errorMessage}</p>
      )}

      <div className="bf-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? '저장 중…' : mode === 'create' ? '등록' : '수정 완료'}
        </button>
        <Link href={cancelHref} className="btn btn-line">취소</Link>
      </div>
    </form>
  )
}
