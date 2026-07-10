'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeletePostButtonProps {
  postId: number
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (isDeleting) return
    if (!window.confirm('이 게시물을 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.')) {
      return
    }

    setIsDeleting(true)
    setErrorMessage('')
    try {
      const response = await fetch(`/api/board/${postId}`, { method: 'DELETE' })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error ?? '삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      router.push('/pressrelease')
      router.refresh()
    } catch {
      setErrorMessage('삭제에 실패했습니다. 네트워크 상태를 확인해 주세요.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-line bf-danger"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? '삭제 중…' : '삭제'}
      </button>
      {errorMessage && (
        <span className="bf-error" role="alert">{errorMessage}</span>
      )}
    </>
  )
}
