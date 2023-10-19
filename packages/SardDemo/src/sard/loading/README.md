# Loading 加载

### 介绍

表示处理中的状态。

### 引入

```ts
import { Loading } from 'sard'
```

## 代码演示

### 基础使用

显示一个不停旋转的圆。

@code('${DEMO_PATH}/loading/demo/Basic.tsx')

### 加载尺寸

使用 `size` 属性设置任意大小的尺寸。

@code('${DEMO_PATH}/loading/demo/Size.tsx')

### 自定义颜色

使用 `color` 属性设置任意颜色。

@code('${DEMO_PATH}/loading/demo/Color.tsx')

## API

### LoadingProps

| 属性     | 描述                     | 类型      | 默认值    |
| -------- | ------------------------ | --------- | --------- |
| name     | 加载类型名称             | 'loading' | 'loading' |
| color    | 加载颜色                 | string    | -         |
| size     | 图标尺寸                 | number    | 20        |
| duration | 旋转一圈的时间，单位毫秒 | number    | 800       |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
