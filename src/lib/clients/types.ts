export interface ClientListRepository {
  list(): Promise<string[]>
  replace(names: string[]): Promise<string[]>
}
