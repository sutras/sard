# Result 结果

### 介绍

用于反馈用户的操作结果。

### 引入

```ts
import { Result } from 'sard'
```

## 代码演示

### 基础使用

设置 `status` 属性展示不同状态的结果。

@code('${DEMO_PATH}/result/demo/Basic.tsx')

### 额外内容

通过 `children` 属性设置的额外内容会在底部展示。

@code('${DEMO_PATH}/result/demo/Extra.tsx')

### 自定义图标

通过 `iconProps` 属性设置自定义图标。

@code('${DEMO_PATH}/result/demo/Icon.tsx')

## API

### ResultProps

| 属性        | 描述         | 类型                                                      | 默认值 |
| ----------- | ------------ | --------------------------------------------------------- | ------ |
| status      | 结果的状态   | 'success' \| 'info' \| 'warning' \| 'error' \| 'question' | 'info' |
| icon        | 自定义图标   | React.ReactNode                                           | -      |
| title       | 标题         | React.ReactNode                                           | -      |
| description | 描述         | React.ReactNode                                           | -      |
| children    | 定义额外内容 | React.ReactNode                                           | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
