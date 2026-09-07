---
title: 字符串
order: 4
group:
  title: 工具
---

## 介绍

提供字符串相关的工具函数。

## 使用

::: code-group

```ts [ts]
import { camelCase } from 'sard'

camelCase('foo-bar') // fooBar
```

```js [js]
import { camelCase } from 'sard'
camelCase('foo-bar') // fooBar
```

:::

## 接口

### lowerFirst

```ts
function lowerFirst(string: string): string
```

将字符串首字母转换为小写格式。

### upperFirst

```ts
function upperFirst(string: string): string
```

将字符串首字母转换为大写格式。

### pascalCase

```ts
function pascalCase(string: string): string
```

将字符串转换为 PascalCase 格式（大驼峰）。

### camelCase

```ts
function camelCase(string: string): string
```

将字符串转换为 camelCase 格式（小驼峰）。

### capitalize

```ts
function capitalize(string: string): string
```

将字符串转换为 Capitalize 格式（首字母大写，其余小写）。

### kebabCase

```ts
function kebabCase(string: string): string
```

将字符串转换为 kebab-case 格式（使用连字符拼接单词）。

### snakeCase

```ts
function snakeCase(string: string): string
```

将字符串转换为 snake_case 格式（使用下划线拼接单词）。

### addSeparator

```ts
function addSeparator(num: number | string, separator?: string, digit?: number): string
```

每n位数字添加一个分隔符。

参数

- `num`: 要添加分隔符的数字
- `separator`: 分隔符，默认为英文逗号
- `digit`: 相隔的位数，默认为 3 位

### uniqid

```ts
function uniqid(prefix?: string): string
```

生成唯一ID，用于设置元素的ID，以便获取此元素。

参数

- prefix: ID前缀，默认为 `__sar_`

### interpolate

```ts
function interpolate(template: string, data?: Record<string, any> | any[]): string
```

使用 `{key}` 占位符替换模板内容：`data` 为对象时按名匹配（`{name}`），为数组时按下标匹配（`{0}`）。占位符对应值为 `null`/`undefined` 或不存在时保留原样；不传 `data` 时原样返回模板。

参数

- `template`: 模板字符串
- `data`: 插值数据，可为具名对象或列表数组
