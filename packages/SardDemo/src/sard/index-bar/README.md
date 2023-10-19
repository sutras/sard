# IndexBar 索引栏

### 介绍

用于列表分类展示和索引定位。

### 引入

```ts
import { IndexBar } from 'sard'
```

## 代码演示

### 基础使用

点击索引栏时，会自动跳转到对应的锚点位置。

@code('${DEMO_PATH}/index-bar/demo/Basic.tsx')

## API

### IndexBarProps

| 属性             | 描述                         | 类型                            | 默认值 |
| ---------------- | ---------------------------- | ------------------------------- | ------ |
| defaultActiveKey | 初始化时当前索引项的 `key`   | number \| string                | -      |
| onChange         | 当前索引项变化时触发         | (key: number \| string) => void | -      |
| initialScroll    | 是否在初始化时定位当前索引项 | boolean                         | false  |
| anchorClass      | 索引项锚点元素的类名         | string                          | -      |
| anchorStyle      | 索引项锚点元素的样式         | React.CSSProperties             | -      |
| threshold        | 滚动监听节流阈值             | number                          | 150    |

### IndexBarRef

| 属性     | 描述                      | 类型                            |
| -------- | ------------------------- | ------------------------------- |
| scrollTo | 定位到指定 `key` 的索引项 | (key: number \| string) => void |

### IndexBarItemProps

| 属性        | 描述                 | 类型                | 默认值 |
| ----------- | -------------------- | ------------------- | ------ |
| title       | 索引项的标题         | React.ReactNode     | -      |
| key         | 对应 `activeKey`     | number \| string    | -      |
| anchorClass | 索引项锚点元素的类名 | string              | -      |
| anchorStyle | 索引项锚点元素的样式 | React.CSSProperties | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
