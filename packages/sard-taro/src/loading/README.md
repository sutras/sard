# Loading 加载

### 介绍

表示处理中的状态。

### 引入

```js
import { Loading } from 'sard-taro'
```

## 代码演示

### 加载类型

%(${DEMO_PATH}/loading/demo/Type.tsx)

### 加载尺寸

%(${DEMO_PATH}/loading/demo/Size.tsx)

### 加载文案

%(${DEMO_PATH}/loading/demo/Text.tsx)

### 垂直排布

%(${DEMO_PATH}/loading/demo/Vertical.tsx)

### 自定义颜色

%(${DEMO_PATH}/loading/demo/Color.tsx)

## API

### LoadingProps

| 属性      | 描述                   | 类型                  | 默认值     |
| --------- | ---------------------- | --------------------- | ---------- |
| type      | 加载类型               | 'clock' \| 'circular' | 'circular' |
| color     | 加载颜色               | string                | -          |
| size      | 图标尺寸               | string \| number      | -          |
| text      | 图标文案               | React.ReactNode       | -          |
| textColor | 文字颜色               | string                | -          |
| textSize  | 文字尺寸               | string \| number      | -          |
| vertical  | 是否垂直排列图标和文案 | boolean               | false      |
| iconStyle | 图标样式               | CSSProperties         | -          |
| iconClass | 图标类名               | string                | -          |

## 主题定制

### CSS 变量

%(./index.scss#variables)
