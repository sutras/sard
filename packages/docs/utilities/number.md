---
title: 数字
order: 5
group:
  title: 工具
---

## 介绍

提供数字相关工具函数。

## 使用

::: code-group

```ts [ts]
import { random } from 'sard'

random(0, 10)
```

```js [js]
import { random } from 'sard'
random(0, 10)
```

:::

## 接口

### clamp

```ts
function clamp(n: number, min: number, max: number): number
```

限定数值范围。

### random

```ts
function random(min: number, max: number): number
```

生成两数间的一个随机整数

### inRange

```ts
function inRange(n: number, min: number, max: number): boolean
```

判断一个数是否在指定范围内。

### round

```ts
function round(n: number, precision?: number): number
```

把一个数四舍五入到指定位数小数。

### getDecimalsLength

```ts
function getDecimalsLength(n: number | string): number
```

获取小数位数。

### mround

```ts
function mround(n: number, m: number): number
```

把一个数舍入到指定数的倍数。

### truncToFixed

```ts
function truncToFixed(num: number, decimals?: number): string
```

trunc 版本的 toFixed，截断而非四舍五入，并保留指定小数位数。

### abbrNumber

```ts
function abbrNumber(num: number, decimals?: number, keepZero?: boolean): string
```

通过添加单位缩写数字。例如：`abbrNumber(12000)` 返回 `'12K'`。

### formatThousands

```ts
function formatThousands(num?: number): string
```

将数字格式化为千分位格式。例如：`formatThousands(1234567)` 返回 `'1,234,567'`。
