# Grid 栅格

### 介绍

基于行/列来划分区块以展示内容。栅格系统提供了 12 列容器来布局，需要配套使用 `Row` 和 `Col` 组件。

### 引入

```ts
import { Row, Col } from 'sard'
```

## 代码演示

### 基础使用

使用 `span` 属性配置子元素占据的列数。

@code('${DEMO_PATH}/grid/demo/Basic.tsx')

### 列偏移

使用 `offset` 可以将列向右侧偏。例如，`offset={3}` 将元素向右侧偏移了 3 个列的宽度。

@code('${DEMO_PATH}/grid/demo/Offset.tsx')

### 水平对齐

`justify` 属性可以配置子元素在父容器中的水平对齐方式。

@code('${DEMO_PATH}/grid/demo/Justify.tsx')

### 垂直对齐

`align` 属性可以配置子元素在父容器中的垂直对齐方式。

@code('${DEMO_PATH}/grid/demo/Align.tsx')

### 列间距

`gap` 属性可以配置子元素之间的距离。

@code('${DEMO_PATH}/grid/demo/Gap.tsx')

### 列顺序

通过 `order` 来改变元素的排序。

@code('${DEMO_PATH}/grid/demo/Order.tsx')

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

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
