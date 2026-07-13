import { z } from 'zod'

export const tierUpdateSchema = z.object({
  name: z.string().trim().min(1, '등급명을 입력해 주세요.').max(100, '등급명은 100자 이내로 입력해 주세요.').optional(),
  price: z.string().trim().min(1, '가격을 입력해 주세요.').max(30, '가격은 30자 이내로 입력해 주세요.').optional(),
  summary: z.string().trim().min(1, '요약 설명을 입력해 주세요.').max(200, '요약 설명은 200자 이내로 입력해 주세요.').optional(),
  media: z
    .array(z.string().trim().min(1).max(100))
    .max(300, '매체는 최대 300개까지 등록할 수 있습니다.')
    .optional(),
})

export function parseTierId(raw: string): number | null {
  const id = Number(raw)
  if (!Number.isInteger(id) || id <= 0) return null
  return id
}
