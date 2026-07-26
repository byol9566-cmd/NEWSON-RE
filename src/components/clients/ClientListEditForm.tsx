'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useMemo, useState } from 'react'

interface ClientListEditFormProps {
  clients: string[]
}

function parseLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export default function ClientListEditForm({ clients }: ClientListEditFormProps) {
  const router = useRouter()
  const [clientsText, setClientsText] = useState(clients.join('\n'))
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const count = useMemo(() => parseLines(clientsText).length, [clientsText])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    setSuccessMessage('')

    const parsed = parseLines(clientsText)
    if (parsed.length === 0) {
      setErrorMessage('고객사를 1개 이상 입력해 주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clients: parsed }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error ?? '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      setSuccessMessage(`저장되었습니다. (총 ${parsed.length}개)`)
      router.refresh()
    } catch {
      setErrorMessage('저장에 실패했습니다. 네트워크 상태를 확인해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="board-form ptier-edit-form" onSubmit={handleSubmit} noValidate>
      <div className="bf-field">
        <label htmlFor="client-list">고객사 리스트 (한 줄에 하나씩 · 현재 {count}개)</label>
        <textarea
          id="client-list"
          value={clientsText}
          rows={24}
          onChange={(event) => setClientsText(event.target.value)}
        />
      </div>

      {errorMessage && <p className="bf-error" role="alert">{errorMessage}</p>}
      {successMessage && <p className="bf-success" role="status">{successMessage}</p>}

      <div className="bf-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? '저장 중…' : '저장'}
        </button>
      </div>
    </form>
  )
}
