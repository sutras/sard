# Card 卡片

### 介绍

以矩形的形式呈现相关信息或内容，包含标题、内容和相关元素。

### 引入

```ts
import { Card } from 'sard'
```

## 代码演示

### 基础使用

展示带标题和内容的卡片。

@code('${DEMO_PATH}/card/demo/Basic.tsx')

### 基础使用

设置 `extra` 属性可以在标题右边放置额外内容。

@code('${DEMO_PATH}/card/demo/Extra.tsx')

### 只有主体

如果不设置标题和额外内容，则不会渲染头部。

@code('${DEMO_PATH}/card/demo/OnlyBody.tsx')

### 底部

可以设置 `footer` 属性在主体下面放置内容。

@code('${DEMO_PATH}/card/demo/Footer.tsx')

## API

### CardProps

| 属性        | 描述         | 类型          | 默认值 |
| ----------- | ------------ | ------------- | ------ |
| title       | 头部左边内容 | ReactNode     | -      |
| extra       | 头部右边内容 | ReactNode     | -      |
| children    | 主体内容     | ReactNode     | -      |
| footer      | 底部内容     | ReactNode     | -      |
| headerStyle | 头部样式     | CSSProperties | -      |
| headerClass | 头部类名     | string        | -      |
| bodyStyle   | 主体样式     | CSSProperties | -      |
| bodyClass   | 主体类名     | string        | -      |
| footerStyle | 底部样式     | CSSProperties | -      |
| footerClass | 底部类名     | string        | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
