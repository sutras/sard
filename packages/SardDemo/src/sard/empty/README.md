# Empty 空状态

### 介绍

空状态时的占位提示。

### 引入

```ts
import { Empty } from 'sard'
```

## 代码演示

### 基础使用

@code('${DEMO_PATH}/empty/demo/Basic.tsx')

### 自定义描述信息

@code('${DEMO_PATH}/empty/demo/Description.tsx')

### 自定义图标大小

通过配置 `iconProps` 属性可以修改图标大小。

@code('${DEMO_PATH}/empty/demo/Size.tsx')

### 自定义图标

通过配置 `iconProps` 属性可以修改图标。

@code('${DEMO_PATH}/empty/demo/Icon.tsx')

### 额外内容

额外内容会显示在底部。

@code('${DEMO_PATH}/empty/demo/Extra.tsx')

## API

### EmptyProps

| 属性        | 描述                   | 类型            | 默认值     |
| ----------- | ---------------------- | --------------- | ---------- |
| children    | 放置额外内容           | React.ReactNode | -          |
| icon        | 自定义图标             | React.ReactNode | -          |
| iconProps   | 图标组件的 `iconProps` | IconProps       | -          |
| description | 描述信息               | React.ReactNode | '暂无数据' |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
