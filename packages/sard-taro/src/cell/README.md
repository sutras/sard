# Cell 单元格

### 介绍

表示列表中单个展示项，结合单元格组常用于个人中心、设置等页面列表。

### 引入

```js
import { Cell } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/cell/demo/Basic.tsx)

### 可点击的

%(${DEMO_PATH}/cell/demo/Linkable.tsx)

### 图标

%(${DEMO_PATH}/cell/demo/Icon.tsx)

### 内嵌的图标

在 `Cell` 或者 `CellGroup` 上添加 `inset` 属性让图标看起来位于单元格主体里面。

%(${DEMO_PATH}/cell/demo/InsetIcon.tsx)

### 自定义内容

%(${DEMO_PATH}/cell/demo/Slot.tsx)

### 分组

%(${DEMO_PATH}/cell/demo/Group.tsx)

### 卡片风格

%(${DEMO_PATH}/cell/demo/Card.tsx)

## API

### CellProps

| 属性           | 描述                                               | 类型                         | 默认值   |
| -------------- | -------------------------------------------------- | ---------------------------- | -------- |
| title          | 左侧标题                                           | React.ReactNode              | -        |
| label          | 标题下方的描述信息                                 | React.ReactNode              | -        |
| value          | 右侧值                                             | React.ReactNode              | -        |
| footer         | 自定义 `footer`，会覆盖 `value`、`label` 和`arrow` | React.ReactNode              | -        |
| linkable       | 是否展示右侧箭头并开启点击反馈                     | boolean                      | false    |
| clickable      | 开启点击反馈                                       | boolean                      | -        |
| arrowDirection | 箭头方向                                           | 'up' \| 'right' \| 'down'    | 'right'  |
| arrow          | 自定义箭头                                         | React.ReactNode              | -        |
| icon           | 左侧图标                                           | React.ReactNode              | -        |
| inset          | 内嵌图标                                           | boolean                      | false    |
| size           | 单元格尺寸                                         | 'normal' \| 'large'          | 'normal' |
| bodyStyle      | `body` 样式                                        | CSSProperties                | -        |
| bodyClass      | `body` 类名                                        | string                       | -        |
| footerStyle    | `footer` 样式                                      | CSSProperties                | -        |
| footerClass    | `footer` 类名                                      | string                       | -        |
| onClick        | 点击单元格时触发                                   | (event: ITouchEvent) => void | -        |

### CellGroupProps

| 属性        | 描述                    | 类型                | 默认值   |
| ----------- | ----------------------- | ------------------- | -------- |
| title       | 单元格组标题            | React.ReactNode     | -        |
| label       | 单元格组底部描述信息    | React.ReactNode     | -        |
| card        | 卡片风格                | boolean             | false    |
| inlaid      | 嵌入式状态              | boolean             | false    |
| inset       | 内嵌图标                | boolean             | false    |
| size        | 单元格尺寸              | 'normal' \| 'large' | 'normal' |
| bodyStyle   | `Cell` 的 `body` 样式   | CSSProperties       | -        |
| bodyClass   | `Cell` 的 `body` 类名   | string              | -        |
| footerStyle | `Cell` 的 `footer` 样式 | CSSProperties       | -        |
| footerClass | `Cell` 的 `footer` 类名 | string              | -        |

## 主题定制

### CSS 变量

%(./index.scss#variables)
