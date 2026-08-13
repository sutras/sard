type RequestExtra = {
  /** 重试次数，配合响应拦截器 rejected 使用 */
  retryCount?: number
  /** 重试间隔(ms) */
  retryDelay?: number
  /** 是否启用请求去重，相同请求并发时复用第一个 Promise */
  dedupe?: boolean
  [key: string]: any
}

type RequestConfig = RequestInit & {
  url: string
  data?: any
  params?: Record<string, string | number | boolean>
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'
  /** 请求超时时间(ms)，传入 0 表示不超时，优先使用请求级配置，否则回退到实例级默认值 */
  timeout?: number
  extra?: RequestExtra
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>

type RequestErrorInterceptor = (
  error: unknown,
  config: RequestConfig,
) => RequestConfig | Promise<RequestConfig>

type ResponseInterceptor<T = any, R = T> = (response: T, config: RequestConfig) => R | Promise<R>

type ResponseErrorInterceptor<T = any> = (error: unknown, config: RequestConfig) => T | Promise<T>

export class Fetcher {
  private baseURL = ''
  private defaultTimeout: number | undefined
  private pendingMap = new Map<string, Promise<any>>()
  private requestInterceptors: Array<{
    fulfilled: RequestInterceptor
    rejected: RequestErrorInterceptor
  }> = []
  private responseInterceptors: Array<{
    fulfilled: ResponseInterceptor
    rejected: ResponseErrorInterceptor
  }> = []

  constructor(config?: { baseURL?: string; timeout?: number }) {
    if (config?.baseURL) {
      this.baseURL = config.baseURL.replace(/\/$/, '')
    }
    this.defaultTimeout = config?.timeout
  }

  /** 添加请求拦截器，第二个参数为错误处理，返回移除函数 */
  useRequest(fulfilled: RequestInterceptor, rejected?: RequestErrorInterceptor) {
    const entry = { fulfilled, rejected: rejected ?? ((e) => Promise.reject(e)) }
    this.requestInterceptors.push(entry)
  }

  /** 添加响应拦截器，第二个参数为错误处理（支持重试），返回移除函数 */
  useResponse(fulfilled: ResponseInterceptor, rejected?: ResponseErrorInterceptor) {
    const entry = { fulfilled, rejected: rejected ?? ((e) => Promise.reject(e)) }
    this.responseInterceptors.push(entry)
  }

  /** 生成请求去重的唯一 key，基于 method + url + params + headers */
  private dedupeKey(config: RequestConfig): string {
    const { method, url, data, params, headers } = config
    const h: Record<string, string> = {}
    if (headers) {
      new Headers(headers).forEach((v, k) => (h[k] = v))
    }
    return `${method}:${url}:${JSON.stringify(params ?? {})}:${JSON.stringify(data ?? null)}:${JSON.stringify(h)}`
  }

  private joinURL(base: string, path: string): string {
    return base + (path.startsWith('/') ? path : '/' + path)
  }

  private async execute(config: RequestConfig): Promise<any> {
    const { method: _method = 'GET', url, data, ...rest } = config
    const method = _method.toUpperCase()

    let merged: RequestConfig = {
      ...rest,
      url: this.joinURL(this.baseURL, url),
      method,
    }

    const params = rest.params

    // 执行请求拦截器，按 then(onFulfilled, onRejected) 成对执行
    let configPromise: Promise<RequestConfig> = Promise.resolve(merged)
    for (const { fulfilled, rejected } of this.requestInterceptors) {
      configPromise = configPromise.then(
        (cfg) => fulfilled(cfg),
        (error) => rejected(error, merged),
      )
    }
    merged = await configPromise

    // 序列化查询参数
    const allParams = { ...params, ...merged.params }
    if (Object.keys(allParams).length) {
      const search = new URLSearchParams(
        Object.entries(allParams).map(([k, v]) => [k, String(v)]),
      ).toString()
      merged.url += (merged.url.includes('?') ? '&' : '?') + search
    }

    const { url: finalUrl, params: _1, extra: _2, timeout, ...init } = merged

    // 超时控制：请求级 > 实例级，0 表示不超时
    const effectiveTimeout = timeout ?? this.defaultTimeout
    if (effectiveTimeout && effectiveTimeout > 0) {
      const controller = new AbortController()
      const timeoutId = setTimeout(
        () => controller.abort(new DOMException('Request timeout', 'TimeoutError')),
        effectiveTimeout,
      )
      // 合并外部 signal 与超时 signal
      if (init.signal) {
        init.signal.addEventListener('abort', () => controller.abort(), { once: true })
      }
      init.signal = controller.signal
      // 请求结束后清理定时器
      controller.signal.addEventListener('abort', () => clearTimeout(timeoutId), { once: true })
    }

    if (!['GET', 'HEAD'].includes(method)) {
      init.headers = new Headers(init.headers)
      if (data != null) {
        if (
          typeof data === 'object' &&
          !(
            data instanceof FormData ||
            data instanceof Blob ||
            data instanceof URLSearchParams ||
            data instanceof ReadableStream ||
            data instanceof ArrayBuffer ||
            ArrayBuffer.isView(data)
          )
        ) {
          init.body = JSON.stringify(data)
          init.headers.set('Content-Type', 'application/json')
        } else {
          init.body = data as BodyInit
        }
      } else if (!init.headers.has('Content-Type')) {
        init.headers.set('Content-Type', 'application/json')
      }
    }

    // 请求去重：相同请求并发时复用已有 Promise
    if (merged.extra?.dedupe) {
      const key = this.dedupeKey(merged)
      const pending = this.pendingMap.get(key)
      if (pending) return pending
    }

    const promise = this.doFetch(finalUrl || '', init, merged)

    if (merged.extra?.dedupe) {
      const key = this.dedupeKey(merged)
      this.pendingMap.set(key, promise)
      promise.finally(() => this.pendingMap.delete(key))
    }

    return promise
  }

  /** 实际发起请求，响应拦截器按 then(onFulfilled, onRejected) 成对执行 */
  private async doFetch(url: string, init: RequestInit, config: RequestConfig): Promise<any> {
    let promise: Promise<any> = fetch(url, init)

    for (const { fulfilled, rejected } of this.responseInterceptors) {
      promise = promise.then(
        (response) => fulfilled(response, config),
        (error) => rejected(error, config),
      )
    }

    return promise
  }

  async request<T = any>(config: RequestConfig): Promise<T> {
    const response = await this.execute(config)
    if (response instanceof Response) {
      const responseType = config.responseType ?? 'json'
      return response[responseType]() as T
    }
    return response as T
  }

  get<T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'data' | 'body'>) {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'url' | 'data' | 'body'>,
  ) {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'url' | 'data' | 'body'>,
  ) {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  delete<T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'data' | 'body'>) {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }

  patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: Omit<RequestConfig, 'url' | 'data' | 'body'>,
  ) {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }

  head<T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'data' | 'body'>) {
    return this.request<T>({ ...config, method: 'HEAD', url })
  }

  options<T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'data' | 'body'>) {
    return this.request<T>({ ...config, method: 'OPTIONS', url })
  }
}
