'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface EditableTier {
  id: number
  name: string
  price: string
  summary: string
  media: string[]
}

export default function TierEditForm({ tier }: { tier: EditableTier }) {
  const router = useRouter()
  const [name, setName] = useState(tier.name)
  const [price, setPrice] = useState(tier.price)
  const [summary, setSummary] = useState(tier.summary)
  const [mediaText, setMediaText] = useState(tier.media.join('\n'))
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return

    setErrorMessage('')
    setSuccessMessage('')
    if (!name.trim() || !price.trim() || !summary.trim()) {
      setErrorMessage('등급명, 가격, 요약 설명을 모두 입력해 주세요.')
      return
    }

    const media = mediaText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/pricing/${tier.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, summary, media }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error ?? '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      setSuccessMessage('저장되었습니다.')
      router.refresh()
    } catch {
      setErrorMessage('저장에 실패했습니다. 네트워크 상태를 확인해 주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="board-form ptier-edit-form" onSubmit={handleSubmit} noValidate>
      <div className="bf-row">
        <div className="bf-field">
          <label htmlFor={`pt-name-${tier.id}`}>등급명</label>
          <input
            id={`pt-name-${tier.id}`}
            type="text"
            value={name}
            maxLength={100}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="bf-field">
          <label htmlFor={`pt-price-${tier.id}`}>가격</label>
          <input
            id={`pt-price-${tier.id}`}
            type="text"
            value={price}
            maxLength={30}
            required
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
      </div>
      <div className="bf-field">
        <label htmlFor={`pt-summary-${tier.id}`}>요약 설명 (가격표에 노출)</label>
        <input
          id={`pt-summary-${tier.id}`}
          type="text"
          value={summary}
          maxLength={200}
          required
          onChange={(event) => setSummary(event.target.value)}
        />
      </div>
      <div className="bf-field">
        <label htmlFor={`pt-media-${tier.id}`}>게재 가능 매체 (한 줄에 하나씩)</label>
        <textarea
          id={`pt-media-${tier.id}`}
          value={mediaText}
          rows={6}
          onChange={(event) => setMediaText(event.target.value)}
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
