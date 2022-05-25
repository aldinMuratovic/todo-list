export interface CRUDAction<T> {
  action: 'post' | 'put' | 'delete'
  data?: T
}
