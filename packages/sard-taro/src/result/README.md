# Result 结果

### 介绍

用于反馈用户的操作结果。

### 引入

```js
import { Result } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/result/demo/Basic.tsx)

### 额外内容

%(${DEMO_PATH}/result/demo/Extra.tsx)

### 自定义图标

%(${DEMO_PATH}/result/demo/Icon.tsx)

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

### CSS 变量

%(./index.scss#variables)
