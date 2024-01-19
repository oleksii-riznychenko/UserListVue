export interface IListData<T extends object> {
  readonly data: T[]
  readonly page: number
  readonly total: number
  readonly per_page: number
  readonly total_pages: number
}
