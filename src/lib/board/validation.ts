import { z } from 'zod'

export const postInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, '제목을 입력해 주세요.')
    .max(200, '제목은 200자 이내로 입력해 주세요.'),
  author: z
    .string()
    .trim()
    .min(1, '글쓴이를 입력해 주세요.')
    .max(50, '글쓴이는 50자 이내로 입력해 주세요.'),
  content: z
    .string()
    .trim()
    .min(1, '내용을 입력해 주세요.')
    .max(20000, '내용은 20,000자 이내로 입력해 주세요.'),
})

export const loginSchema = z.object({
  password: z
    .string()
    .min(1, '비밀번호를 입력해 주세요.')
    .max(100, '비밀번호는 100자 이내로 입력해 주세요.'),
})

export function parsePostId(raw: string): number | null {
  const id = Number(raw)
  if (!Number.isInteger(id) || id <= 0) return null
  return id
}
