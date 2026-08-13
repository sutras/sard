---
title: 数据持久化
order: 2
group:
  title: 工程化
---

## 介绍

在一个项目当中，数据持久化是比较常用且重要的功能。在页面刷新或重新进入到应用时，可以恢复原来的个性化配置、减少网络请求、降低服务器压力等。

`localStorage` 和 `sessionStorage` 提供了本地数据缓存能力，`@gunny/persist` 包在此基础上扩展了以下功能：

- 添加了命名空间，减少冲突；
- 将数据读取到内存，提高读取效率；
- 新增了数据过期时间；
- 自动序列化和反序列化数据；
- 更简短的调用方法名；
- 可清空命名空间下的所有数据。

## 使用

### 安装

::: code-group

```bash [npm]
npm install @gunny/persist
```

```bash [pnpm]
pnpm add @gunny/persist
```

```bash [yarn]
yarn add @gunny/persist
```

```bash [bun]
bun add @gunny/persist
```

:::

### 创建实例

使用自定义命名空间创建 `Persist` 实例：

```ts [@/utils/persist]
import { Persist } from '@gunny/persist'

const persist = new Persist('Sard')
```

### 使用

```ts
import { persist } from '@/utils/persist'

// 设置：
persist.set('token', 'QWERTYUIOP')

// 设置一个小时有效期：
persist.set('token', 'ASDFGHJK', 60 * 60)

// 获取：
persist.get('token')

// 删除：
persist.remove('token')

// 清空：
persist.clear()
```

## 接口

### Persist 构造函数

```ts
constructor Persist(name: string, options?: {
 type?: PersistType | undefined;
} | undefined): Persist
```

- `name`：命名空间，用于隔离不同应用或模块的缓存数据，避免 `key` 冲突
- `options.type`：存储类型，`'local'` 使用 `localStorage`，`'session'` 使用 `sessionStorage`；默认值：`'local'`

### get 方法

```ts
Persist.get(key: string): any
```

- `key`：要读取的存储键名

读取到的数据会自动反序列化；如果找不到数据，或者数据过期，则返回 `undefined`。

### set 方法

```ts
Persist.set(key: string, value: any, ttl?: number): void
```

- `key`：存储键名，在命名空间内唯一标识该数据
- `value`：存储值，可以为任何能被 `JSON.stringify` 序列化的数据
- `ttl`：过期时间（秒），`0` 表示永不过期；默认值：`0`

### remove 方法

```ts
Persist.remove(key: string): void
```

- `key`：要删除的存储键名

### clear 方法

```ts
Persist.clear(): void
```

清空当前命名空间下的所有数据。

### PersistType

```ts
type PersistType = 'local' | 'session'
```
