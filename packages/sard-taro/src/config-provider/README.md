# ConfigProvider 全局配置

### 介绍

用于全局配置 `sard-taro` 组件，提供自定义 `BEM` 风格和国际化支持。

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

### BEM 风格配置

`sard-taro` 通过 `BEM` 风格编写样式，如果有特定的需要，可以修改为想要的格式，例如：

```tsx
<ConfigProvider bem={{ namespace: 'custom', modifierSeparator: '--' }}>
  {children}
</ConfigProvider>
```

在全局配置修改后，元素的类名会按照您的修改来生成，另外，还需要修改样式文件类名的格式。

这需要你在引入`sard-taro`的样式文件之前定义变量来可以覆盖默认的变量值，例如：

```scss
@use 'sard-taro/dist/style/variables' with (
  $sar-namespace: 'custom',
  $sar-modifier-separator: '--'
);

@use 'sard-taro/dist/index.scss';
```

完整的`scss`变量可以查看[`style`](./#/components/style) 组件。

## API

### ConfigProviderProps

| 属性  | 描述               | 类型        | 默认值  |
| ----- | ------------------ | ----------- | ------- |
| lang  | 语言包             | typeof zhCN | \<zhCN> |
| theme | 主题               | string      | 'light' |
| bem   | `bem` 风格编写样式 | Bem         | -       |

### Bem

| 属性名            | 说明           | 类型   | 默认值 |
| ----------------- | -------------- | ------ | ------ |
| namespace         | 命名空间       | string | 'sar'  |
| blockSeparator    | 块的分隔符     | string | '-'    |
| elementSeparator  | 元素的分隔符   | string | '\_\_' |
| modifierSeparator | 装饰器的分隔符 | string | '\_'   |
