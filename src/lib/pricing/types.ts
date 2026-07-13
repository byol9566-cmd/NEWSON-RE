export interface PricingTierRecord {
  id: number
  name: string
  price: string
  summary: string
  media: string[]
}

export type UpdateTierInput = Partial<Pick<PricingTierRecord, 'name' | 'price' | 'summary' | 'media'>>

export interface PricingTierRepository {
  list(): Promise<PricingTierRecord[]>
  getById(id: number): Promise<PricingTierRecord | null>
  update(id: number, data: UpdateTierInput): Promise<PricingTierRecord | null>
}
