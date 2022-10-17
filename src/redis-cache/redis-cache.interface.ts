export interface RedisCacheInterface {
  keys(key: string): Promise<any>
  get(key: string): Promise<any>
  set(key: string, value: any): Promise<any>
  del(key: string): Promise<any>
}
