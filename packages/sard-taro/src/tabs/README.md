# Tabs 标签页

### 介绍

选项卡切换组件。

### 引入

```js
import { Tabs } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/tabs/demo/Basic.tsx)

### 胶囊标签

%(${DEMO_PATH}/tabs/demo/Pill.tsx)

### 边框标签

%(${DEMO_PATH}/tabs/demo/Border.tsx)

### 垂直

%(${DEMO_PATH}/tabs/demo/Vertical.tsx)

### 自定义样式

%(${DEMO_PATH}/tabs/demo/Style.tsx)

### 自定义标签

%(${DEMO_PATH}/tabs/demo/Label.tsx)

### 禁用标签

%(${DEMO_PATH}/tabs/demo/Disabled.tsx)

### 名称匹配

可以使用 `key` 唯一标识当前 `pane`，默认 `key` 为当前 `pane` 在 `DOM` 中的位置下标。

%(${DEMO_PATH}/tabs/demo/NameMatch.tsx)

### 受控组件

%(${DEMO_PATH}/tabs/demo/Controllable.tsx)

### 可滚动的标签栏

当标签数大于 `scrollCount`，标签父元素溢出时可以横向滚动。

%(${DEMO_PATH}/tabs/demo/Scrollable.tsx)

### 插槽

%(${DEMO_PATH}/tabs/demo/Slot.tsx)

### 切换动画

%(${DEMO_PATH}/tabs/demo/Animated.tsx)

### 滑动切换

%(${DEMO_PATH}/tabs/demo/Swiper.tsx)

### 粘性定位

%(${DEMO_PATH}/tabs/demo/Sticky.tsx)

### 滚动监听

%(${DEMO_PATH}/tabs/demo/Scrollspy.tsx)

### 垂直滚动监听

%(${DEMO_PATH}/tabs/demo/ScrollspyVertical.tsx)

## API

### TabsProps

| 属性                | 描述                                     | 类型                                     | 默认值       |
| ------------------- | ---------------------------------------- | ---------------------------------------- | ------------ |
| defaultActiveKey    | 初始化选中面板的 `key`                   | number \| string                         | -            |
| activeKey           | 选中面板的 `key`                         | number \| string                         | -            |
| onChange            | 切换面板时触发                           | (key: number \| string) => void          | -            |
| onLabelClick        | label 点击时触发                         | (key: number \| string) => void          | -            |
| scrollCount         | 滚动阈值，标签数量超过此值时开始横向滚动 | number                                   | 5            |
| type                | 标签样式类型                             | 'inkbar' \| 'card' \| 'pill' \| 'border' | 'inkbar'     |
| headerClass         | header 的 `className`                    | string                                   | -            |
| headerStyle         | header 的样式                            | React.CSSProperties                      | -            |
| bodyClass           | body 的 `className`                      | string                                   | -            |
| bodyStyle           | body 的样式                              | React.CSSProperties                      | -            |
| labelClass          | 标签的 `className`                       | string                                   | -            |
| labelStyle          | 标签的样式                               | React.CSSProperties                      | -            |
| activeLabelStyle    | 选中标签的样式                           | React.CSSProperties                      | -            |
| activeLabelClass    | 选中标签的 `className`                   | string                                   | -            |
| inactiveLabelStyle  | 未选中标签的样式                         | React.CSSProperties                      | -            |
| inactiveLabelClass  | 未选中标签的 `className`                 | string                                   | -            |
| line                | 自定义卡片线条                           | React.ReactNode                          | -            |
| lineStyle           | 卡片线条样式                             | React.CSSProperties                      | -            |
| lineClass           | 卡片线条类名                             | string                                   | -            |
| scrollWithAnimation | label 滚动时是否使用动画过渡             | boolean                                  | true         |
| prepend             | 标签栏前置插槽                           | React.ReactNode                          | -            |
| append              | 标签栏后置插槽                           | React.ReactNode                          | -            |
| animated            | 是否开启面板切换动画                     | boolean                                  | false        |
| scrollspy           | 是否开启滚动监听                         | boolean                                  | false        |
| duration            | 滚动监听滚动的动画时长                   | number                                   | 300          |
| threshold           | 滚动监听节流阈值                         | number                                   | 150          |
| offset              | 滚动监听的偏移量                         | number                                   | 0            |
| direction           | 标签排列方向                             | 'horizontal' \| 'vertical'               | 'horizontal' |

### TabPaneProps

| 属性       | 描述               | 类型                | 默认值 |
| ---------- | ------------------ | ------------------- | ------ |
| label      | 标签文字           | React.ReactNode     | -      |
| labelClass | 标签的 `className` | string              | -      |
| labelStyle | 标签的样式         | React.CSSProperties | -      |
| key        | 对应 `activeKey`   | number \| string    | -      |
| disabled   | 是否禁用           | boolean             | false  |

## 主题定制

### CSS 变量

%(./index.scss#variables)
