# Grid 栅格

### 介绍

基于行/列来划分区块以展示内容。栅格系统提供了 12 列容器来布局，需要配套使用 `Row` 和 `Col` 组件。

### 引入

```js
import { Row, Col } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/grid/demo/Basic.tsx)

### 列偏移

%(${DEMO_PATH}/grid/demo/Offset.tsx)

### 水平对齐

%(${DEMO_PATH}/grid/demo/Justify.tsx)

### 垂直对齐

%(${DEMO_PATH}/grid/demo/Align.tsx)

### 列间距

%(${DEMO_PATH}/grid/demo/Gap.tsx)

### 列顺序

%(${DEMO_PATH}/grid/demo/Order.tsx)

## API

### RowProps

| 属性    | 描述         | 类型                                                              | 默认值 |
| ------- | ------------ | ----------------------------------------------------------------- | ------ |
| gap     | 列间距       | number \|string                                                   | 0      |
| justify | 水平对齐方式 | 'start' \| 'center' \| 'end' \| 'around' \| 'between' \| 'evenly' | -      |
| align   | 垂直对齐方式 | 'start' \| 'center' \| 'end' \| 'stretch'                         | -      |

### ColProps

| 属性   | 描述           | 类型                       | 默认值 |
| ------ | -------------- | -------------------------- | ------ |
| span   | 列元素宽度     | number \| 'auto' \| 'none' | -      |
| offset | 列元素偏移距离 | number                     | -      |
| order  | 列元素顺序     | number                     | -      |
