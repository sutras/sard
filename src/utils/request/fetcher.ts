type RequestExtra = {
  /** 最大尝试次数（含首次），大于 1 才会重试 */
  retryCount?: number
  /** 重试间隔(ms) */
  retryDelay?: number
  /** 是否启用请求去重，相同请求并发时复用第一个 Promise（重试时会被强制关闭） */
  dedupe?: boolean
  [key: string]: any
}

export type RequestConfig = RequestInit & {
  url: string
  data?: any
  params?: Record<string, any>
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

/** 响应拦截器：第二个参数是调用方的原始配置，可直接用于重试，详见 doFetch */
type ResponseInterceptor<T = any, R = T> = (response: T, config: RequestConfig) => R | Promise<R>

/** 响应拦截器的错误处理：同样收到原始配置 */
type ResponseErrorInterceptor<T = any> = (error: unknown, config: RequestConfig) => T | Promise<T>

type FetcherConfig = {
  baseURL?: string
  timeout?: number
  /**
   * 在途请求数变化回调：一次逻辑请求（含重试链）开始前 +1，成功/失败结束后 -1。
   * 由 Fetcher 用 try/finally 保证成对，使用方不需要（也不应该）在拦截器里手动增减。
   */
  onPendingChange?: (delta: 1 | -1) => void
}

export class Fetcher {
  private baseURL = ''
  private defaultTimeout: number | undefined
  private onPendingChange: ((delta: 1 | -1) => void) | undefined
  private pendingMap = new Map<string, Promise<any>>()
  private requestInterceptors: Array<{
    fulfilled: RequestInterceptor
    rejected: RequestErrorInterceptor
  }> = []
  private responseInterceptors: Array<{
    fulfilled: ResponseInterceptor
    rejected: ResponseErrorInterceptor
  }> = []

  constructor(config?: FetcherConfig) {
    if (config?.baseURL) {
      this.baseURL = config.baseURL.replace(/\/$/, '')
    }
    this.defaultTimeout = config?.timeout
    this.onPendingChange = config?.onPendingChange
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

    void _1
    void _2

    // 请求去重：相同请求并发时复用已有 Promise。
    // 命中时直接返回，且不参与在途计数 —— 复用方没有发起真实请求，
    // 若也计数就会变成"每次复用 +1、共享 Promise 只 -1"，计数只增不减。
    // 放在超时与 body 处理之前：命中时不会发请求，没必要（也不该）建立超时定时器。
    if (merged.extra?.dedupe) {
      const pending = this.pendingMap.get(this.dedupeKey(merged))
      if (pending) return pending
    }

    // 超时控制：请求级 > 实例级，0 表示不超时
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const effectiveTimeout = timeout ?? this.defaultTimeout
    if (effectiveTimeout && effectiveTimeout > 0) {
      const controller = new AbortController()
      timeoutId = setTimeout(
        () => controller.abort(new DOMException('Request timeout', 'TimeoutError')),
        effectiveTimeout,
      )
      // 合并外部 signal 与超时 signal
      if (init.signal) {
        init.signal.addEventListener('abort', () => controller.abort(), { once: true })
      }
      init.signal = controller.signal
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

    // 在途计数：一次逻辑请求（含拦截器里的重试链）只在这里 +/-1。
    // 用 try/finally 包住整个请求过程，无论成功、抛错、还是拦截器里的任何分支，都不会漏减。
    this.onPendingChange?.(1)
    try {
      // 注意第三个参数传的是调用方的原始 config，不是内部归一化后的 merged：
      // merged 的 url 已拼接 baseURL、query 已序列化，若拿它去重试会二次拼接（见 doFetch 注释）
      const promise = this.doFetch(finalUrl || '', init, config)

      if (merged.extra?.dedupe) {
        const key = this.dedupeKey(merged)
        this.pendingMap.set(key, promise)
        const cleanup = () => this.pendingMap.delete(key)
        // 不用 promise.finally()：它的派生 Promise 在请求失败时无人接管，会产生 unhandledrejection
        promise.then(cleanup, cleanup)
      }

      return await promise
    } finally {
      // 超时定时器在这里统一清理：只挂在 abort 上的话，请求正常结束后它会继续存活到超时才消失
      clearTimeout(timeoutId)
      this.onPendingChange?.(-1)
    }
  }

  /**
   * 实际发起请求，响应拦截器按 then(onFulfilled, onRejected) 成对执行。
   * 传给拦截器的 config 是调用方的原始配置（url 未拼 baseURL、params 未序列化），
   * 这样 rejected 里想原样重试时，直接把它丢回 request() 即可。
   */
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
