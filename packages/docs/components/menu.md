---
title: Menu
subtitle: 菜单
group: 导航组件
---

## 介绍

提供多个菜单项供选择。

## 代码演示

### 基础使用

最简单的用法，通过 `label` 和 `value` 属性配置菜单项。

<<< @demo/menu/demo/Basic.vue

### 暗黑模式

设置 `theme="dark"` 使用深色主题。

<<< @demo/menu/demo/Dark.vue

### 展示图标

通过 `icon` 插槽在菜单项中展示图标。

<<< @demo/menu/demo/Icon.vue

### 禁用选项

设置 `disabled` 属性禁用菜单项，禁用的项不可点击。

<<< @demo/menu/demo/Disabled.vue

### 水平排列

设置 `direction="horizontal"` 使菜单水平排列，同时支持图标插槽。

<<< @demo/menu/demo/Horizontal.vue

## API

### MenuProps

| 属性      | 描述     | 类型                       | 默认值     |
| --------- | -------- | -------------------------- | ---------- |
| direction | 排列方向 | 'vertical' \| 'horizontal' | 'vertical' |
| theme     | 主题风格 | 'dark' \| 'light'          | 'light'    |

### MenuSlots

| 插槽    | 描述                             |
| ------- | -------------------------------- |
| default | 默认插槽，用于放置 MenuItem 组件 |

### MenuEmits

| 事件   | 描述             | 类型                |
| ------ | ---------------- | ------------------- |
| select | 选择菜单项时触发 | (item: any) => void |

### MenuItemProps

| 属性     | 描述       | 类型             | 默认值 |
| -------- | ---------- | ---------------- | ------ |
| label    | 菜单项标签 | string \| number | -      |
| value    | 菜单项的值 | any              | -      |
| disabled | 是否禁用   | boolean          | -      |

### MenuItemSlots

| 插槽    | 描述                   |
| ------- | ---------------------- |
| default | 默认插槽，显示标签内容 |
| icon    | 图标插槽               |

### MenuItemEmits

| 事件  | 描述             | 类型                        |
| ----- | ---------------- | --------------------------- |
| click | 点击菜单项时触发 | (event: MouseEvent) => void |

## 主题定制

### 样式变量

| CSS 变量                          | 值                           |
| --------------------------------- | ---------------------------- |
| `--s-menu-bg`                     | `var(--s-white)`             |
| `--s-menu-item-radius`            | `var(--s-border-radius)`     |
| `--s-menu-item-height`            | `var(--s-content-height)`    |
| `--s-menu-item-padding-x`         | `var(--s-content-padding-x)` |
| `--s-menu-item-font-size`         | `var(--s-font-size)`         |
| `--s-menu-item-bg-active`         | `var(--s-bg-color-active)`   |
| `--s-menu-border-color`           | `var(--s-border-color)`      |
| `--s-menu-item-bg-active-dark`    | `var(--s-gray-900)`          |
| `--s-menu-item-color-dark`        | `var(--s-white)`             |
| `--s-menu-border-color-dark`      | `var(--s-gray-700)`          |
| `--s-menu-bg-dark`                | `var(--s-gray-800)`          |
| `--s-menu-item-horizontal-height` | `var(--s-content-height-xs)` |
| `--s-menu-icon-font-size`         | `var(--s-font-size)`         |
| `--s-menu-icon-gap`               | `var(--s-size-sm)`           |
| `--s-menu-icon-horizontal-gap`    | `var(--s-size-xs)`           |
