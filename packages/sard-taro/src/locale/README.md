# Locale 国际化

### 介绍

默认采用中文作为默认语言，允许切换不同语言。

## 代码演示

### 初始化语言配置

初始化语言是通过 [`ConfigProvider`](./#/components/config-provider) 组件完成的。

### 动态修改语言

后续的语言修改除了借助 `ConfigProvider` 组件，还可以通过 `LocaleContext` 提供的 `setLang` 函数进行修改。

%(${DEMO_PATH}/locale/demo/Dynamic.tsx)

## API

### LocaleContextValue

```tsx
interface LocaleContextValue {
  lang: LocaleLang
  setLang: (lang: LocaleLang) => void
}
```

### LocaleLang

```tsx
typeof zhCN
```
