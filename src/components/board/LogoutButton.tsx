'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogout() {
    if (isSubmitting) return

    setIsSubmitting(true)
    setErrorMessage('')
    try {
      const response = await fetch('/api/board/login', { method: 'DELETE' })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        setErrorMessage('로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      router.push('/pressrelease')
      router.refresh()
    } catch {
      setErrorMessage('로그아웃에 실패했습니다. 네트워크 상태를 확인해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-line"
        onClick={handleLogout}
        disabled={isSubmitting}
      >
        {isSubmitting ? '처리 중…' : '로그아웃'}
      </button>
      {errorMessage && (
        <span className="bf-error" role="alert">{errorMessage}</span>
      )}
    </>
  )
}
