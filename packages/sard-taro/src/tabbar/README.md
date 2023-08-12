# Tabbar 标签栏

### 介绍

固定在页面底部的导航栏，用于切换不同的页面。

### 引入

```js
import { Tabbar } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/tabbar/demo/Basic.tsx)

### 自定义图标

%(${DEMO_PATH}/tabbar/demo/Icon.tsx)

### 自定义颜色

%(${DEMO_PATH}/tabbar/demo/Color.tsx)

### 固定定位

%(${DEMO_PATH}/tabbar/demo/Fixed.tsx)

### 徽标

%(${DEMO_PATH}/tabbar/demo/Badge.tsx)

## API

### TabbarProps

| 属性             | 描述                          | 类型                            | 默认值 |
| ---------------- | ----------------------------- | ------------------------------- | ------ |
| activeKey        | 当前选中标签的 `key` 或索引值 | number \| string                | -      |
| defaultActiveKey | 默认选中标签的 `key` 或索引值 | number \| string                | -      |
| color            | 未选中标签的颜色              | string                          | -      |
| activeColor      | 选中标签的颜色                | string                          | -      |
| fixed            | 是否固定在底部                | boolean                         | true   |
| zIndex           | 固定时的层级                  | boolean                         | -      |
| onChange         | 切换标签时触发                | (key: number \| string) => void | -      |

### TabbarItemProps

| 属性        | 描述             | 类型                                                | 默认值 |
| ----------- | ---------------- | --------------------------------------------------- | ------ |
| key         | 对应 `activeKey` | string \| number                                    | -      |
| icon        | 自定义图标       | IconProps \| ((active: boolean) => React.ReactNode) | -      |
| color       | 未选中标签的颜色 | string                                              | -      |
| activeColor | 选中标签的颜色   | string                                              | -      |
| badge       | 添加徽标         | BadgeProps                                          | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
