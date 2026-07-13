'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface LoginFormProps {
  redirectTo?: string
}

export default function LoginForm({ redirectTo = '/pressrelease' }: LoginFormProps) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    if (!password) {
      setErrorMessage('비밀번호를 입력해 주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/board/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error ?? '로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      router.push(redirectTo)
      router.refresh()
    } catch {
      setErrorMessage('로그인에 실패했습니다. 네트워크 상태를 확인해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="board-form board-login-form" onSubmit={handleSubmit} noValidate>
      <div className="bf-field">
        <label htmlFor="bf-password">관리자 비밀번호</label>
        <input
          id="bf-password"
          type="password"
          value={password}
          maxLength={100}
          autoComplete="current-password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {errorMessage && (
        <p className="bf-error" role="alert">{errorMessage}</p>
      )}

      <div className="bf-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? '확인 중…' : '로그인'}
        </button>
      </div>
    </form>
  )
}
