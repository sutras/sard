# Tabbar 标签栏

### 介绍

固定在页面底部的导航栏，用于切换不同的页面。

### 引入

```ts
import { Tabbar } from 'sard'
```

## 代码演示

### 基础使用

使用 `activeKey` 和 `onChange` 使其变为受控组件。

@code('${DEMO_PATH}/tabbar/demo/Basic.tsx')

### 自定义图标

使用 `iconProps` 属性设置图标。

@code('${DEMO_PATH}/tabbar/demo/Icon.tsx')

### 自定义颜色

使用 `color` 属性设置未选中标签的颜色。
使用 `activeColor` 属性设置选中标签的颜色。

@code('${DEMO_PATH}/tabbar/demo/Color.tsx')

### 徽标

使用 `badge` 属性设置徽标。

@code('${DEMO_PATH}/tabbar/demo/Badge.tsx')

## API

### TabbarProps

| 属性             | 描述                          | 类型                            | 默认值 |
| ---------------- | ----------------------------- | ------------------------------- | ------ |
| activeKey        | 当前选中标签的 `key` 或索引值 | number \| string                | -      |
| defaultActiveKey | 默认选中标签的 `key` 或索引值 | number \| string                | -      |
| onChange         | 切换标签时触发                | (key: number \| string) => void | -      |
| color            | 未选中标签的颜色              | string                          | -      |
| activeColor      | 选中标签的颜色                | string                          | -      |

### TabbarItemProps

| 属性        | 描述             | 类型                                                      | 默认值 |
| ----------- | ---------------- | --------------------------------------------------------- | ------ |
| key         | 对应 `activeKey` | string \| number                                          | -      |
| icon        | 自定义图标       | React.ReactNode \| ((active: boolean) => React.ReactNode) | -      |
| iconProps   | 自定义图标       | IconProps \| ((active: boolean) => IconProps)             | -      |
| color       | 未选中标签的颜色 | string                                                    | -      |
| activeColor | 选中标签的颜色   | string                                                    | -      |
| badge       | 添加徽标         | BadgeProps                                                | -      |
| onClick     | 点击时触发       | (event: ITouchEvent) => void                              | -      |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
