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

### 可滚动标签栏

%(${DEMO_PATH}/tabs/demo/Scrollable.tsx)

### 禁用标签

%(${DEMO_PATH}/tabs/demo/Disabled.tsx)

### 受控的标签

%(${DEMO_PATH}/tabs/demo/Controllable.tsx)

### 自定义线条

%(${DEMO_PATH}/tabs/demo/Line.tsx)

### 自定义标签

%(${DEMO_PATH}/tabs/demo/CustomTab.tsx)

### 搭配 Swiper 使用

%(${DEMO_PATH}/tabs/demo/Swiper.tsx)

## API

### TabsProps

| 属性             | 描述                   | 类型                            | 默认值 |
| ---------------- | ---------------------- | ------------------------------- | ------ |
| defaultActiveKey | 默认选中的标签的 `key` | number \| string                | -      |
| activeKey        | 当前选中的标签的 `key` | number \| string                | -      |
| onChange         | 切换标签时触发         | (key: number \| string) => void | -      |
| scrollable       | 是否可滚动             | boolean                         | false  |
| activeTabStyle   | 选中的标签的样式       | React.CSSProperties             | -      |
| activeTabClass   | 选中的标签的类名       | string                          | -      |
| inactiveTabStyle | 未选中的标签的样式     | React.CSSProperties             | -      |
| inactiveTabClass | 未选中的标签的类名     | string                          | -      |
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
