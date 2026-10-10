import { toast } from 'sard'
import { Fetcher } from './fetcher'

export const fetcher = new Fetcher({ baseURL: '/' })

fetcher.useRequest((config) => {
  const headers = new Headers(config.headers)
  headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  return { ...config, headers }
})

fetcher.useResponse((response: Response) => {
  if (response.status < 200 || response.status >= 300) {
    return Promise.reject(response)
  }
  return response
})

fetcher.useResponse((response: Response, config) => {
  const responseType = config.responseType ?? 'json'
  return response[responseType]()
})

fetcher.useResponse(
  (response: { code: number; data: unknown; message: string }) => {
    if (!response || typeof response !== 'object') {
      return Promise.reject('Error')
    }
    if (response.code !== 200) {
      return Promise.reject(response.message || 'Error')
    }
    return response.data
  },
  async (error, config) => {
    // 手动 abort：跳过重试，直接抛出
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }

    // 重试：config 是调用方原始配置，直接丢回 request() 即可原样重发。
    // 必须关掉 dedupe —— 原请求仍在 pendingMap 里（重试就发生在它的处理链上），
    // 不关就会去重命中自己，重试变成返回自己仍未完成的 Promise，永久挂起。
    const extra = config.extra ?? {}
    const remainingAttempts = (extra.retryCount ?? 1) - 1
    if (remainingAttempts > 0) {
      await new Promise((r) => setTimeout(r, extra.retryDelay ?? 1000))
      return fetcher.request({
        ...config,
        extra: { ...extra, retryCount: remainingAttempts, dedupe: false },
      })
    }

    // 提取错误提示
    let errorText = ''
    if (typeof error === 'string') {
      errorText = error
    } else if (error instanceof Response) {
      errorText = error.status + ' ' + error.statusText
    } else if (error instanceof Error) {
      errorText = error.message
    }

    toast({
      title: errorText || 'Error',
      timeout: 3000,
    })

    throw error
  },
)
