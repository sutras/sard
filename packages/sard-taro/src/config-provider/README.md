# ConfigProvider 全局配置

### 介绍

用于全局配置 `sard-taro` 组件，提供主题定制，国际化支持。

### 引入

```js
import { ConfigProvider } from 'sard-taro'
```

## 代码演示

### 国际化

`sard-taro` 提供了 `ConfigProvider` 组件用于全局配置国际化语言。目前支持以下语言:

- 简体中文：`zh-CN`
- 英语（美式）：`en-US`

```tsx
import enUS from 'sard-taro/dist/locale/lang/en-US'

function App({ children }: PropsWithChildren) {
  return <ConfigProvider lang={enUS}>{children}</ConfigProvider>
}

export default App
```

如果想要在组件内部动态修改国际化语言，可以使用[`Locale`](./#/components/locale) 组件导出的 `LocaleContext`。

### 主题定制

`sard-taro` 可以通过 `CSS` 变量 来组织样式，通过覆盖这些 `CSS` 变量，可以实现定制主题、动态切换主题等效果。

#### 通过 CSS 覆盖

在导入`sard-taro`组件样式之后，在其后定义全局 `CSS` 变量进行覆盖。

在 `:root, page` 选择器上的声明可以兼容小程序和 H5。

```scss
@import 'sard-taro/dist/style.scss';

:root,
page {
  --sar-primary: #6f42c1;
}
```

#### 通过 ConfigProvider 定义主题

略。

## API

### ConfigProviderProps

| 属性  | 描述   | 类型        | 默认值  |
| ----- | ------ | ----------- | ------- |
| lang  | 语言包 | typeof zhCN | zhCN    |
| theme | 主题   | string      | 'light' |

## 主题定制

### CSS 变量

%{variables}
