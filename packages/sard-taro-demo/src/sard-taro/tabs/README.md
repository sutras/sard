# Tabs 标签页

### 介绍

选项卡切换组件。

### 引入

```ts
import { Tabs } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `activeKey` 和 `onChange` 使其变为受控组件。

%(${DEMO_PATH}/tabs/demo/Basic.tsx)

### 可滚动标签栏

设置 `scrollable` 后标签不再平分空间，并且可以实现水平滚动。

%(${DEMO_PATH}/tabs/demo/Scrollable.tsx)

### 禁用标签

禁用的标签无法点击。

%(${DEMO_PATH}/tabs/demo/Disabled.tsx)

### 自定义线条

使用 `lineStyle` 属性设置线条样式，使用 `line` 属性可以定义线条内容。

%(${DEMO_PATH}/tabs/demo/Line.tsx)

### 自定义标签

使用 `showLine`、`activeStyle`、`activeClass`、`inactiveStyle`、`inactiveClass` 等属性可以实现胶囊标签和卡片标签。

%(${DEMO_PATH}/tabs/demo/CustomTab.tsx)

### 搭配 Swiper 使用

`Tabs` 组件并不提供面板的功能，可以搭配 `Swiper` 或其他组件一起使用。

%(${DEMO_PATH}/tabs/demo/Swiper.tsx)

## API

### TabsProps

| 属性             | 描述                   | 类型                            | 默认值 |
| ---------------- | ---------------------- | ------------------------------- | ------ |
| defaultActiveKey | 默认选中的标签的 `key` | number \| string                | -      |
| activeKey        | 当前选中的标签的 `key` | number \| string                | -      |
| onChange         | 切换标签时触发         | (key: number \| string) => void | -      |
| scrollable       | 是否可滚动             | boolean                         | false  |
| activeStyle      | 选中的标签的样式       | React.CSSProperties             | -      |
| activeClass      | 选中的标签的类名       | string                          | -      |
| inactiveStyle    | 未选中的标签的样式     | React.CSSProperties             | -      |
| inactiveClass    | 未选中的标签的类名     | string                          | -      |
| showLine         | 是否显示线条           | boolean                         | true   |
| line             | 线条插槽               | React.ReactNode                 | -      |
| lineStyle        | 线条样式               | React.CSSProperties             | -      |
| lineClass        | 线条类名               | string                          | -      |

### TabsTabProps

| 属性     | 描述             | 类型                                                      | 默认值 |
| -------- | ---------------- | --------------------------------------------------------- | ------ |
| key      | 对应 `activeKey` | number \| string                                          | -      |
| children | 自定义标签内容   | React.ReactNode \| ((active: boolean) => React.ReactNode) | -      |
| disabled | 是否禁用         | boolean                                                   | false  |

## 主题定制

### CSS 变量

%(./index.scss#variables)
