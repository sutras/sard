---
title: 请求数据
order: 2
group:
  title: 工程化
---

## 介绍

在现代前端项目中，HTTP 请求是不可或缺的基础能力。尤其在移动端场景下，网络环境复杂多变（弱网、切换基站、断线重连），一个轻量、可控的请求工具尤为重要。与其引入数十 KB 的第三方库，不如基于浏览器原生的 `fetch` API 封装一个轻量级的请求工具，既满足日常需求，又保持极小的打包体积。

## 实现一个轻量级的 axios

或许你不需要一个重量级的 HTTP 库——下面的实现仅约 2KB，却涵盖了拦截器、基础 URL、查询参数、超时、请求去重、响应类型转换等核心功能，足以应对大多数业务场景。

### 核心能力

- **拦截器** — 请求拦截器 + 响应拦截器（fulfilled/rejected 管道）
- **超时** — 实例级默认超时 + 请求级覆盖，基于 `AbortController`
- **请求去重** — `extra.dedupe` 相同并发请求复用首个 Promise
- **查询参数** — 自动拼接 `?key=value`，支持与拦截器追加的参数合并
- **响应类型** — `json` / `text` / `blob` / `arrayBuffer` / `formData`
- **请求方法** — `get` / `post` / `put` / `delete` / `patch` / `head` / `options`

你可以在此基础上按需扩展重试、弱网提示、请求取消等移动端常用能力。

<<< @src/utils/request/fetcher.ts

## 根据业务添加拦截器

基于 `Fetcher` 添加请求和响应拦截器，构成完整的请求管道：

1. **请求拦截** — 自动注入 `Authorization` token
2. **HTTP 状态码检查** — 非 2xx 直接 reject
3. **响应类型转换** — 按 `responseType` 解析响应体
4. **业务数据解析** — 检查 `code` 并提取 `data`，支持 `extra.retryCount` 重试

<<< @src/utils/request/index.ts

### 使用

```ts
import { fetcher } from '@/utils/request'

// 自动带 token、自动解析 data 字段
const user = await fetcher.get<User>('/user', { params: { id: 1 } })

// 带重试
await fetcher.get('/unstable-api', {
  extra: { retryCount: 3, retryDelay: 500 },
})

// 单次请求覆盖超时（默认不限）
await fetcher.get('/slow-api', { timeout: 10000 })

// 请求去重：并发相同请求只发一次
const [a, b] = await Promise.all([
  fetcher.get('/data', { params: { id: 1 }, extra: { dedupe: true } }),
  fetcher.get('/data', { params: { id: 1 }, extra: { dedupe: true } }),
])
// a === b

// 手动取消请求
const controller = new AbortController()
fetcher.get('/cancel-me', { signal: controller.signal })
controller.abort()

// POST 请求（data 支持泛型）
interface CreateUser {
  name: string
  age: number
}
await fetcher.post<{ id: number }, CreateUser>('/user', { name: 'Tom', age: 18 })

// 获取文本响应
const html = await fetcher.get<string>('/page', { responseType: 'text' })
```
