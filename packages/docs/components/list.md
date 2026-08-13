---
title: List
subtitle: 列表
group: 数据展示
---

## 介绍

显示一组垂直排列的数据。

## 代码演示

### 基础使用

可以给列表项添加标题、描述和值。

<<< @demo/list/demo/Basic.vue

### 可链接的

设置 `arrow` 属性会显示右边的箭头，设置 `hover` 属性会有点击状态。

<<< @demo/list/demo/Linkable.vue

### 图标

设置 `icon` 插槽可以在左边显示图标。

<<< @demo/list/demo/Icon.vue

### 自定义内容

可以使用 `title`, `description`, `value`, `arrow` 等插槽自定义对应内容，也可以使用默认插槽定义整个列表项内容。

<<< @demo/list/demo/Slot.vue

### 列表标题和描述

列表标题和描述可以对整个列表进行说明

<<< @demo/list/demo/Group.vue

### 卡片风格

可以使用 `card` 属性让列表显示为卡片风格。

<<< @demo/list/demo/Card.vue

### 隐藏边框

可以使用 `hide-border` 属性隐藏边框。

<<< @demo/list/demo/HideBorder.vue

## API

### ListProps

| 属性        | 描述         | 类型             | 默认值 |
| ----------- | ------------ | ---------------- | ------ |
| title       | 列表顶部标题 | string \| number | -      |
| description | 列表底部描述 | string \| number | -      |
| card        | 卡片风格     | boolean          | false  |
| inlaid      | 嵌入式列表   | boolean          | false  |
| hide-border | 是否隐藏边框 | boolean          | false  |

### ListSlots

| 插槽        | 描述                                    | 属性 |
| ----------- | --------------------------------------- | ---- |
| default     | 自定义默认内容                          | -    |
| title       | 自定义标题内容，会覆盖`title`属性       | -    |
| description | 自定义描述内容，会覆盖`description`属性 | -    |

### ListItemProps

| 属性            | 描述             | 类型                      | 默认值  |
| --------------- | ---------------- | ------------------------- | ------- |
| title           | 左侧标题         | string \| number          | -       |
| description     | 标题下方的描述   | string \| number          | -       |
| value           | 右侧值           | string \| number          | -       |
| hover           | 是否开启点击反馈 | boolean                   | false   |
| arrow           | 是否展示右侧箭头 | boolean                   | false   |
| arrow-direction | 箭头方向         | 'up' \| 'right' \| 'down' | 'right' |

### ListItemSlots

| 插槽        | 描述                                    | 属性 |
| ----------- | --------------------------------------- | ---- |
| default     | 自定义默认内容，会覆盖所有内容          | -    |
| title       | 自定义标题内容，会覆盖`title`属性       | -    |
| description | 自定义描述内容，会覆盖`description`属性 | -    |
| value       | 自定义值内容，会覆盖`value`属性         | -    |
| arrow       | 自定义箭头                              | -    |
| icon        | 自定义左侧图标，会覆盖`icon`属性        | -    |

### ListItemEmits

| 事件  | 描述             | 类型                          |
| ----- | ---------------- | ----------------------------- |
| click | 点击列表项时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                                | 值                             |
| --------------------------------------- | ------------------------------ |
| `--s-list-border-color`                 | `var(--s-border-color)`        |
| `--s-list-title-margin-x`               | `var(--s-size)`                |
| `--s-list-title-margin-top`             | `var(--s-size-2xl)`            |
| `--s-list-title-margin-bottom`          | `var(--s-size-xs)`             |
| `--s-list-title-font-size`              | `var(--s-font-size-sm)`        |
| `--s-list-title-line-height`            | `var(--s-line-height-snug)`    |
| `--s-list-title-color`                  | `var(--s-text-color-tertiary)` |
| `--s-list-description-margin-x`         | `var(--s-size)`                |
| `--s-list-description-margin-top`       | `var(--s-size-xs)`             |
| `--s-list-description-font-size`        | `var(--s-font-size-sm)`        |
| `--s-list-description-line-height`      | `var(--s-line-height-snug)`    |
| `--s-list-description-color`            | `var(--s-text-color-tertiary)` |
| `--s-list-card-radius`                  | `var(--s-border-radius-lg)`    |
| `--s-list-item-min-height`              | `var(--s-content-height)`      |
| `--s-list-item-padding-x`               | `var(--s-content-padding-x)`   |
| `--s-list-item-padding-y`               | `var(--s-content-padding-y)`   |
| `--s-list-item-bg`                      | `var(--s-bg-color-container)`  |
| `--s-list-item-bg-active`               | `var(--s-bg-color-active)`     |
| `--s-list-item-opacity-disabled`        | `var(--s-opacity-disabled)`    |
| `--s-list-item-icon-size`               | `var(--s-size-lg)`             |
| `--s-list-item-icon-margin-end`         | `var(--s-size-sm)`             |
| `--s-list-item-title-font-size`         | `var(--s-font-size)`           |
| `--s-list-item-title-line-height`       | `var(--s-line-height-snug)`    |
| `--s-list-item-value-font-size`         | `var(--s-font-size)`           |
| `--s-list-item-value-line-height`       | `var(--s-line-height-snug)`    |
| `--s-list-item-value-color`             | `var(--s-text-color-tertiary)` |
| `--s-list-item-description-margin-top`  | `var(--s-size-2xs)`            |
| `--s-list-item-description-font-size`   | `var(--s-font-size-sm)`        |
| `--s-list-item-description-line-height` | `var(--s-line-height-snug)`    |
| `--s-list-item-description-color`       | `var(--s-text-color-tertiary)` |
| `--s-list-item-arrow-margin-start`      | `var(--s-size-xs)`             |
| `--s-list-item-arrow-font-size`         | `var(--s-font-size)`           |
| `--s-list-item-arrow-color`             | `var(--s-text-color-tertiary)` |
| `--s-list-divider-start`                | `var(--s-list-item-padding-x)` |
| `--s-list-divider-end`                  | `var(--s-list-item-padding-x)` |
