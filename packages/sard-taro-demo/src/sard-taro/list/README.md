# List 列表

### 介绍

显示一组垂直排列的数据。

### 引入

```ts
import { List } from 'sard-taro'
```

## 代码演示

### 基础使用

可以给列表项添加标题、描述和值。

%(${DEMO_PATH}/list/demo/Basic.tsx)

### 可点击的

设置 `Linkable` 属性会显示右边的箭头，并且会有点击状态。
显式设置 `clickable` 属性为 `false` 会取消点击状态。

%(${DEMO_PATH}/list/demo/Linkable.tsx)

### 图标

设置 `icon` 属性可以在左边显示图标。

%(${DEMO_PATH}/list/demo/Icon.tsx)

### 内嵌的图标

在 `List.Item` 或者 `List` 上添加 `inset` 属性让图标看起来位于列表项主体里面。

%(${DEMO_PATH}/list/demo/InsetIcon.tsx)

### 自定义内容

列表项的 `body` 和 `footer` 默认平分水平空间，如果 `footer` 需要占据更多的空间，可以设置 `body` 不扩展。

`value` 中的元素默认会向右边靠，如果有使用 `footer` 属性定义内容，则内容会纵向排列。

%(${DEMO_PATH}/list/demo/Slot.tsx)

### 列表标题和描述

列表标题和描述可以对整个列表进行说明

%(${DEMO_PATH}/list/demo/ListSlot.tsx)

### 卡片风格

可以使用 `card` 属性让列表添加左右边距和圆角。

%(${DEMO_PATH}/list/demo/Card.tsx)

## API

### ListProps

| 属性        | 描述                         | 类型            | 默认值 |
| ----------- | ---------------------------- | --------------- | ------ |
| title       | 列表标题                     | React.ReactNode | -      |
| label       | 列表底部描述信息             | React.ReactNode | -      |
| card        | 卡片风格                     | boolean         | false  |
| inlaid      | 嵌入式列表                   | boolean         | false  |
| inset       | 内嵌图标                     | boolean         | false  |
| bodyStyle   | `List.Item` 的 `body` 样式   | CSSProperties   | -      |
| bodyClass   | `List.Item` 的 `body` 类名   | string          | -      |
| footerStyle | `List.Item` 的 `footer` 样式 | CSSProperties   | -      |
| footerClass | `List.Item` 的 `footer` 类名 | string          | -      |

### ListItemProps

| 属性           | 描述                                               | 类型                         | 默认值  |
| -------------- | -------------------------------------------------- | ---------------------------- | ------- |
| title          | 左侧标题                                           | React.ReactNode              | -       |
| label          | 标题下方的描述信息                                 | React.ReactNode              | -       |
| value          | 右侧值                                             | React.ReactNode              | -       |
| footer         | 自定义 `footer`，会覆盖 `value`、`label` 和`arrow` | React.ReactNode              | -       |
| linkable       | 是否展示右侧箭头并开启点击反馈                     | boolean                      | false   |
| clickable      | 开启点击反馈                                       | boolean                      | -       |
| arrowDirection | 箭头方向                                           | 'up' \| 'right' \| 'down'    | 'right' |
| arrow          | 自定义箭头                                         | React.ReactNode              | -       |
| icon           | 左侧图标                                           | React.ReactNode              | -       |
| inset          | 内嵌图标                                           | boolean                      | false   |
| bodyStyle      | `body` 样式                                        | CSSProperties                | -       |
| bodyClass      | `body` 类名                                        | string                       | -       |
| footerStyle    | `footer` 样式                                      | CSSProperties                | -       |
| footerClass    | `footer` 类名                                      | string                       | -       |
| onClick        | 点击列表时触发                                     | (event: ITouchEvent) => void | -       |

## 主题定制

### CSS 变量

%(./index.scss#variables)
