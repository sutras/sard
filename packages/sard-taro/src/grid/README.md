# Grid 栅格

### 介绍

基于行/列来划分区块以展示内容。栅格系统提供了 12 列容器来布局，需要配套使用 `Row` 和 `Col` 组件。

### 引入

```js
import { Row, Col } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Row>
  <Col>
    <View className="grid-box">span</View>
  </Col>
  <Col>
    <View className="grid-box">span</View>
  </Col>
</Row>

<Row>
  <Col span={4}>
    <View className="grid-box">span-4</View>
  </Col>
  <Col span={8}>
    <View className="grid-box">span-8</View>
  </Col>
</Row>

<Row>
  <Col span={3}>
    <View className="grid-box">span-3</View>
  </Col>
  <Col>
    <View className="grid-box">span</View>
  </Col>
  <Col span="auto">
    <View className="grid-box">auto</View>
  </Col>
</Row>
```

### 列偏移

```tsx
<Row>
  <Col>
    <View className="grid-box">span</View>
  </Col>
  <Col offset={3}>
    <View className="grid-box">offset-3</View>
  </Col>
</Row>
```

### 水平对齐

```tsx
<Row justify="start">
  <Col span={3}>
    <View className="grid-box">span-3</View>
  </Col>
  <Col span={3}>
    <View className="grid-box">span-3</View>
  </Col>
</Row>

<Row justify="center">
  <Col span={3}>
    <View className="grid-box">span-3</View>
  </Col>
  <Col span={3}>
    <View className="grid-box">span-3</View>
  </Col>
</Row>

<Row justify="end">
  <Col span={3}>
    <View className="grid-box">span-3</View>
  </Col>
  <Col span={3}>
    <View className="grid-box">span-3</View>
  </Col>
</Row>
```

### 垂直对齐

```tsx
<Row align="start">
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
</Row>

<Row align="center">
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
</Row>

<Row align="end">
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
</Row>
```

### 列间距

```tsx
<Row gap={30}>
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
  <Col>
    <View className="grid-box">span-3</View>
  </Col>
</Row>
```

### 列顺序

```tsx
<Row>
  <Col>
    <View className="grid-box">col1</View>
  </Col>
  <Col order={-1}>
    <View className="grid-box">col2 order:-1</View>
  </Col>
</Row>

<Row>
  <Col order={2}>
    <View className="grid-box">col1 order:2</View>
  </Col>
  <Col order={1}>
    <View className="grid-box">col2 order:1</View>
  </Col>
  <Col>
    <View className="grid-box">col3</View>
  </Col>
</Row>
```

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

### CSS 变量

%{variables}
