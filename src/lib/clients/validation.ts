import { z } from 'zod'

export const clientListUpdateSchema = z.object({
  clients: z
    .array(
      z
        .string()
        .trim()
        .min(1, '고객사명은 비워둘 수 없습니다.')
        .max(100, '고객사명은 100자 이내로 입력해 주세요.')
    )
    .min(1, '고객사를 1개 이상 입력해 주세요.')
    .max(2000, '고객사는 최대 2,000개까지 등록할 수 있습니다.'),
})
