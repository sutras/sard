# Space 间距

### 介绍

设置元素之间的间距。

### 引入

```ts
import { Space } from 'sard-taro'
```

## 代码演示

### 基础使用

默认垂直排列。

%(${DEMO_PATH}/space/demo/Basic.tsx)

### 水平排列

设置 `direction="horizontal"` 可以水平排列。

%(${DEMO_PATH}/space/demo/Horizontal.tsx)

### 间距

间距分为大中小三个内置值，也可以自定义间距。

%(${DEMO_PATH}/space/demo/Gap.tsx)

### 垂直对齐

使用 `align` 属性设置交叉轴对齐。

%(${DEMO_PATH}/space/demo/Align.tsx)

### 水平对齐

使用 `justify` 属性设置主轴对齐。

%(${DEMO_PATH}/space/demo/Justify.tsx)

## API

### SpaceProps

| 属性      | 描述                   | 类型                                                              | 默认值     |
| --------- | ---------------------- | ----------------------------------------------------------------- | ---------- |
| direction | 子元素排列方向         | 'vertical' \| 'horizontal'                                        | 'vertical' |
| gap       | 子元素间距             | 'small' \| 'medium' \| 'large' \| number                          | 'medium'   |
| align     | 元素在交叉轴的对齐方式 | 'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'           | 'stretch'  |
| justify   | 元素在主轴的对齐方式   | 'start' \| 'center' \| 'end' \| 'around' \| 'between' \| 'evenly' | 'start'    |
| wrap      | 是否换行               | boolean                                                           | false      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
