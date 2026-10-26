---
title: 编译时标识
order: 6
group:
  title: 进阶
---

## 介绍

sard 内置了中文语言包与农历数据，两者都只在特定场景下才需要。为了让其它场景的产物更小，sard 提供了两个**编译时标识**，由构建工具将其替换为字面量，从而把对应的代码摇树（tree-shaking）掉。

| 标识                    | 默认值 | 作用                       |
| ----------------------- | ------ | -------------------------- |
| `__SARD_DEFAULT_LANG__` | `true` | 是否引入内置的中文语言包   |
| `__SARD_LUNAR__`        | `true` | 是否引入农历数据与农历实现 |

两者都只在构建阶段生效，未定义时按默认值（`true`）处理，不影响开发与运行时。

## 配置

以 Vite 为例，在 `vite.config.ts` 中声明：

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    __SARD_DEFAULT_LANG__: false,
    __SARD_LUNAR__: false,
  },
})
```

其它构建工具的写法：

```js [webpack]
new webpack.DefinePlugin({
  __SARD_DEFAULT_LANG__: JSON.stringify(false),
  __SARD_LUNAR__: JSON.stringify(false),
})
```

```js [rspack]
new rspack.DefinePlugin({
  __SARD_DEFAULT_LANG__: JSON.stringify(false),
  __SARD_LUNAR__: JSON.stringify(false),
})
```

::: warning 注意

- 必须写在构建工具的 `define` / `DefinePlugin` 中，而不是在业务代码里赋值，否则无法参与静态分析，代码不会被移除。
- 值需要是布尔字面量，写字符串 `'false'` 会被当作真值。
  :::

## 移除中文语言包

设置 `__SARD_DEFAULT_LANG__: false` 后，`sard/locale/lang/zh-CN` 不会被打包，`currentLocale` 的初始值为空对象，此时：

- 组件内部文案（`useTranslate`）找不到词条时，返回链式路径本身（如 `calendar.start`）。
- 需要自行通过 [`setLocale`](./i18n.md#setlocale) 或 [`provideLocale`](./i18n.md#providelocale) 注册语言包，例如英语：`setLocale(enUS)`。
- 显式 `import zhCN from 'sard/locale/lang/zh-CN'` 仍然可用——按需引入时该文件本来就会被打包，标识只影响**默认**语言包。

## 移除农历数据

设置 `__SARD_LUNAR__: false` 后，农历数据表（`lunarInfo`、`springFestivals`）与农历名称表不会被打包，相关函数保留但退化为空实现：

- `solarToLunar` 直接返回传入的公历日期，`lunarToSolar` 直接返回传入的农历日期。
- `getLunarDayName`、`getLunarMonthName`、`getLunarHourName` 返回空字符串，`getLunarLeapMonth` 等返回 `0`。

依赖农历的能力相应失效，请在不需要时再关闭：

- `DateStrip` 的 `showLunar`
- `DatetimePicker` 的 `calendar="lunar"`

## 体积收益

以一个同时引入 `DateStrip` 与 `DatetimePicker` 的入口为例（`vue` 外置，minify 后）：

| 配置                   | 原始大小 | gzip     |
| ---------------------- | -------- | -------- |
| 默认（`true`）         | ~50.4 KB | ~15.9 KB |
| 两个标识都设为 `false` | ~42.4 KB | ~12.8 KB |

即约 8 KB（gzip 约 3 KB）农历与中文语言包相关代码被移除。具体数值取决于实际用到的组件，这里只用于说明量级。
