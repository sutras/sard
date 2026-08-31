---
title: Sidebar
subtitle: 侧边导航
group: 导航组件
---

## 介绍

垂直标签导航，用于在不同的区域之间进行切换。

## 代码演示

### 基础使用

使用 `v-model` 绑定当前选中项的 `value`，`value` 必须且唯一。

<<< @demo/sidebar/demo/Basic.vue

### 圆角

设置 `round` 属性会使选中项上下角变圆。

<<< @demo/sidebar/demo/Round.vue

### 线条

设置 `line` 属性会使选中项左边显示线条。

<<< @demo/sidebar/demo/Line.vue

### 禁用

禁用的导航项无法点击。

<<< @demo/sidebar/demo/Disabled.vue

### 自定义

使用默认插槽自定义内容。

<<< @demo/sidebar/demo/Custom.vue

### 场景应用

#### 场景 1

此场景结合了 `Sidebar` 和 `ScrollSpy` 组件，绑定了同一个值进行双向联动。

<<< @demo/sidebar/demo/Scene1.vue

#### 场景 2

相较于 场景 1，此场景在页面顶部添加了 banner 块和标签栏，且标签栏粘性定位于顶部。

<<< @demo/sidebar/demo/Scene2.vue

## API

### SidebarProps

| 属性                     | 描述                       | 类型                                                                 | 默认值 |
| ------------------------ | -------------------------- | -------------------------------------------------------------------- | ------ |
| model-value              | 当前绑定导航项的名称       | string \| number                                                     | -      |
| round                    | 当前导航项是否显示为圆角   | boolean                                                              | false  |
| line                     | 当前导航项是否添加左边线条 | boolean                                                              | false  |
| scroll-into-view-options | 自定义滚动配置选项         | [ScrollIntoViewOptions](../utilities/geometry#ScrollIntoViewOptions) | -      |

### SidebarSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SidebarEmits

| 事件              | 描述                 | 类型                                |
| ----------------- | -------------------- | ----------------------------------- |
| update:modelValue | 当前导航项改变时触发 | `(value: string \| number) => void` |
| change            | 当前导航项改变时触发 | `(value: string \| number) => void` |

### SidebarItemProps

| 属性     | 描述                 | 类型             | 默认值 |
| -------- | -------------------- | ---------------- | ------ |
| label    | 导航项显示的标题内容 | string           | -      |
| value    | 导航项唯一名称，必需 | string \| number | -      |
| disabled | 是否禁用表单项       | boolean          | false  |

### SidebarItemSlots

| 插槽    | 描述           | 属性 |
| ------- | -------------- | ---- |
| default | 自定义默认内容 | -    |

### SidebarItemEmits

| 事件  | 描述             | 类型                          |
| ----- | ---------------- | ----------------------------- |
| click | 点击导航项时触发 | `(event: MouseEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                              | 值                              |
| ------------------------------------- | ------------------------------- |
| `--s-sidebar-bg`                      | `var(--s-fill-color-tertiary)`  |
| `--s-sidebar-width`                   | `92px`                          |
| `--s-sidebar-item-padding-x`          | `20px`                          |
| `--s-sidebar-item-padding-y`          | `14px`                          |
| `--s-sidebar-item-font-size`          | `var(--s-font-size-sm)`         |
| `--s-sidebar-item-color`              | `var(--s-text-color-secondary)` |
| `--s-sidebar-item-bg-active`          | `var(--s-bg-color-extreme)`     |
| `--s-sidebar-item-color-active`       | `var(--s-text-color-emphasis)`  |
| `--s-sidebar-item-font-weight-active` | `var(--s-font-weight-normal)`   |
| `--s-sidebar-line-width`              | `3px`                           |
| `--s-sidebar-line-height`             | `12px`                          |
| `--s-sidebar-line-bg`                 | `var(--s-color-primary)`        |
| `--s-sidebar-round-size`              | `var(--s-border-radius)`        |
