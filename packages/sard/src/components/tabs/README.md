# Tabs 标签页

### 介绍

选项卡切换组件。

### 引入

```js
import { Tabs } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Card.tsx",
    "./demo/Pill.tsx",
    "./demo/Border.tsx",
    "./demo/Name.tsx",
    "./demo/Disabled.tsx",
    "./demo/Controlled.tsx",
    "./demo/CustomLabel.tsx",
    "./demo/Scroll.tsx",
    "./demo/Style.tsx",
    "./demo/Sticky.tsx",
    "./demo/Slot.tsx",
    "./demo/Animated.tsx",
    "./demo/Swipeable.tsx",
    "./demo/Scrollspy.tsx",
    "./demo/Vertical.tsx",
    "./demo/VerticalScrollspy.tsx"
  ]
</script>

## API

### TabsProps

| 属性               | 描述                                     | 类型                            | 默认值 |
| ------------------ | ---------------------------------------- | ------------------------------- | ------ |
| defaultActiveKey   | 初始化选中面板的 `key`                   | number \| string                | -      |
| activeKey          | 选中面板的 `key`                         | number \| string                | -      |
| onChange           | 切换面板时触发                           | (key: number \| string) => void | -      |
| onLabelClick       | label 点击时触发                         | (key: number \| string) => void | -      |
| inkbarWrapperStyle | 墨水条包裹元素的样式                     | React.CSSProperties             | -      |
| inkbarWidth        | 墨水条宽度                               | 'auto' \| string                | '40px' |
| inkbarStyle        | 墨水条样式                               | React.CSSProperties             | -      |
| inkbar             | 自定义墨水条                             | React.ReactNode                 | -      |
| scrollCount        | 滚动阈值，标签数量超过此值时开始横向滚动 | number                          | 5      |
| type               | 标签样式类型                             | 'line' \| 'pill' \| 'border'    | 'line' |
| headerClass        | header 的 `className`                    | string                          | -      |
| headerStyle        | header 的样式                            | React.CSSProperties             | -      |
| bodyClass          | body 的 `className`                      | string                          | -      |
| bodyStyle          | body 的样式                              | React.CSSProperties             | -      |
| wrapperClass       | wrapper 的 `className`                   | string                          | -      |
| wrapperStyle       | wrapper 的样式                           | React.CSSProperties             | -      |
| labelClass         | 标签的 `className`                       | string                          | -      |
| labelStyle         | 标签的样式                               | React.CSSProperties             | -      |
| activeLabelStyle   | 选中标签的样式                           | React.CSSProperties             | -      |
| activeLabelClass   | 选中标签的 `className`                   | string                          | -      |
| line               | 自定义卡片线条                           | React.ReactNode                 | -      |
| lineWidth          | 卡片线条宽度                             | string \| number                | -      |
| lineStyle          | 卡片线条样式                             | React.CSSProperties             | -      |
| sticky             | 是否粘性定位到顶部                       | boolean                         | false  |
| prepend            | 标签栏前置插槽                           | React.ReactNode                 | -      |
| append             | 标签栏后置插槽                           | React.ReactNode                 | -      |
| animated           | 是否添加面板切换动效                     | boolean                         | false  |
| swipeable          | 是否可滑动切换面板                       | boolean                         | false  |
| swiperProps        | 可滑动切换面板时 `Swiper` 组件的 `props` | swiperProps                     | -      |
| scrollspy          | 是否开启滚动监听                         | boolean                         | false  |
| offset             | 滚动监听的偏移量                         | number                          | 0      |
| vertical           | 垂直标签                                 | boolean                         | false  |

### TabPaneProps

| 属性       | 描述               | 类型                | 默认值 |
| ---------- | ------------------ | ------------------- | ------ |
| label      | 标签文字           | React.ReactNode     | -      |
| labelClass | 标签的 `className` | string              | -      |
| labelStyle | 标签的样式         | React.CSSProperties | -      |
| key        | 对应 `activeKey`   | number \| string    | -      |
| disabled   | 是否禁用           | boolean             | false  |

## 主题定制

### SCSS

```scss

```
