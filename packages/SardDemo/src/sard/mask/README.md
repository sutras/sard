# Mask 遮罩层

### 介绍

在页面之上显示一个黑色遮罩层。

### 引入

```ts
import { Mask } from 'sard'
```

## 代码演示

## API

### MaskProps

| 属性        | 描述                       | 类型                         | 默认值 |
| ----------- | -------------------------- | ---------------------------- | ------ |
| visible     | 控制遮罩显隐               | boolean                      | false  |
| zIndex      | 设置遮罩层级               | number                       | -      |
| timeout     | 设置显隐持续时间，单位毫秒 | TransitionTimeout            | -      |
| transparent | 显示为透明遮罩             | boolean                      | false  |
| onClick     | 点击遮罩时触发             | (event: ITouchEvent) => void | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
