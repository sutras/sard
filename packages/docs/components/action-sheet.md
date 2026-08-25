---
title: ActionSheet
subtitle: 动作面板
group:
  title: 反馈组件
  order: 5
---

## 介绍

从底部向上弹出动作菜单。

## 代码演示

### 基础使用

使用 `v-model:visible` 属性控制显隐，使用 `itemList` 属性配置动作项。

<<< @demo/action-sheet/demo/Basic.vue

### 取消按钮

设置 `show-cancel` 属性展示取消按钮，或者使用 `cancel` 属性在设置取消按钮文本的同时显示取消按钮。

<<< @demo/action-sheet/demo/Cancel.vue

### 描述信息

使用 `description` 属性对整个动作面板做一个解释说明。使用动作项的 `description` 属性对某个动作做一个解释说明。

<<< @demo/action-sheet/demo/Description.vue

### 动作状态

每个动作项都可以配置 `color`、`disabled`、`loading` 等属性来展示当前的状态。

<<< @demo/action-sheet/demo/Status.vue

### 命令式

使用 `actionSheet` 方法显示动作面板。

<<< @demo/action-sheet/demo/Imperative.vue

### 插槽

可以使用插槽自定义内容，包括描述、取消按钮等。
也可以使用默认插槽自定义动作项，此时需要使用 `action-sheet-item` 组件来构建动作项的布局。

可使用 `action-sheet` 组件的插槽自定义内容。

<<< @demo/action-sheet/demo/Slot.vue

## API

### ActionSheetProps

| 属性                  | 描述                                                                 | 类型                   | 默认值 |
| --------------------- | -------------------------------------------------------------------- | ---------------------- | ------ |
| description           | 动作面板描述说明                                                     | string                 | -      |
| item-list             | 面板项列表                                                           | ActionSheetItemProps[] | []     |
| show-cancel           | 是否显示取消按钮                                                     | boolean                | false  |
| cancel                | 自定义取消按钮文字                                                   | string                 | -      |
| visible               | 是否显示动作面板                                                     | boolean                | false  |
| overlay-closable      | 点击遮罩后是否关闭                                                   | boolean                | true   |
| before-close          | 关闭前的回调，返回 `false` 或 `rejected` 状态的 `Promise` 可阻止关闭 | ActionSheetBeforeClose | -      |
| duration时长，单位 ms | number                                                               | 300                    |

#### ActionSheetBeforeClose

```ts
interface ActionSheetBeforeClose {
  (
    type: 'close' | 'cancel',
    loading: {
      readonly cancel: boolean
      readonly select: boolean
      readonly close: boolean
    },
  ): any
  (
    type: 'select',
    loading: {
      readonly cancel: boolean
      readonly select: boolean
      readonly close: boolean
    },
    item: ActionSheetItemProps,
    index: number,
  ): any
}
```

- 当点击动作项时，`type` 为 `select`；
- 当点击取消按钮时，`type` 为 `cancel`；
- 当点击遮罩时，`type` 为 `close`。

`loading` 表示当前哪个按钮处于异步关闭状态。

### ActionSheetSlots

| 插槽        | 描述           | 属性 |
| ----------- | -------------- | ---- |
| default     | 自定义默认内容 | -    |
| description | 自定义描述     | -    |
| cancel      | 自定义取消按钮 | -    |

### ActionSheetEmits

继承 [`MotionEmits`](./motion#MotionEmits)。

| 事件           | 描述               | 类型                                                  |
| -------------- | ------------------ | ----------------------------------------------------- |
| update:visible | 动作面板显隐时触发 | `(visible: boolean) => void`                          |
| close          | 点击遮罩时触发     | `() => void`                                          |
| cancel         | 点击取消按钮时触发 | `() => void`                                          |
| select         | 点击动作按钮时触发 | `(item: ActionSheetItemProps, index: number) => void` |

### ActionSheetItemProps

| 属性        | 描述           | 类型    | 默认值 |
| ----------- | -------------- | ------- | ------ |
| label       | 动作标签       | string  | -      |
| value       | 动作的值       | any     | -      |
| description | 动作的描述说明 | string  | -      |
| color       | 字体颜色       | string  | -      |
| disabled    | 禁用状态       | boolean | false  |
| loading     | 加载状态       | boolean | false  |

### ActionSheetItemSlots

| 插槽        | 描述           | 属性 |
| ----------- | -------------- | ---- |
| default     | 自定义默认内容 | -    |
| label       | 自定义标签     | -    |
| description | 自定义描述     | -    |

### ActionSheetItemEmits

| 事件  | 描述             | 类型         |
| ----- | ---------------- | ------------ |
| click | 点击动作项时触发 | `() => void` |

### 命令式方法

| 名称                | 描述                           | 类型                           |
| ------------------- | ------------------------------ | ------------------------------ |
| actionSheet         | 显示动作面板                   | ActionSheetFunction            |
| actionSheet.hide    | 隐藏指定 `id` 的命令式动作面板 | `(id = 'actionSheet') => void` |
| actionSheet.hideAll | 隐藏所有命令式动作面板         | `() => void`                   |

### ActionSheetFunction

```ts
type ActionSheetFunction = ActionSheetSimpleShowFunction & {
  hide: () => void
}
```

### ActionSheetSimpleShowFunction

```ts
interface ActionSheetSimpleShowFunction {
  (options: ActionSheetOptions): void
}
```

## 主题定制

### 样式变量

| CSS 变量                                        | 值                             |
| ----------------------------------------------- | ------------------------------ |
| `--s-action-sheet-border-radius`                | `var(--s-border-radius-xl)`    |
| `--s-action-sheet-border-color`                 | `var(--s-border-color)`        |
| `--s-action-sheet-bg`                           | `var(--s-bg-color-elevated)`   |
| `--s-action-sheet-bg-active`                    | `var(--s-bg-color-active)`     |
| `--s-action-sheet-description-padding`          | `var(--s-size)`                |
| `--s-action-sheet-description-font-size`        | `var(--s-font-size)`           |
| `--s-action-sheet-description-color`            | `var(--s-text-color-tertiary)` |
| `--s-action-sheet-gap-height`                   | `var(--s-size-xs)`             |
| `--s-action-sheet-gap-bg`                       | `var(--s-fill-color-fourth)`   |
| `--s-action-sheet-item-min-height`              | `var(--s-content-height-lg)`   |
| `--s-action-sheet-item-padding`                 | `var(--s-content-padding)`     |
| `--s-action-sheet-item-color-disabled`          | `var(--s-text-color-disabled)` |
| `--s-action-sheet-item-label-font-size`         | `var(--s-font-size-lg)`        |
| `--s-action-sheet-item-label-line-height`       | `var(--s-line-height-normal)`  |
| `--s-action-sheet-item-label-color`             | `var(--s-text-color-primary)`  |
| `--s-action-sheet-item-description-margin-top`  | `var(--s-size-2xs)`            |
| `--s-action-sheet-item-description-font-size`   | `var(--s-font-size-sm)`        |
| `--s-action-sheet-item-description-line-height` | `var(--s-line-height-normal)`  |
| `--s-action-sheet-item-description-color`       | `var(--s-text-color-tertiary)` |
| `--s-action-sheet-loading-font-size`            | `var(--s-size-lg)`             |
| `--s-action-sheet-loading-color`                | `var(--s-text-color-fourth)`   |
| `--s-action-sheet-cancel-min-height`            | `var(--s-content-height-lg)`   |
| `--s-action-sheet-cancel-padding`               | `var(--s-content-padding)`     |
| `--s-action-sheet-cancel-font-size`             | `var(--s-font-size-lg)`        |
| `--s-action-sheet-cancel-line-height`           | `var(--s-line-height-normal)`  |
| `--s-action-sheet-cancel-color`                 | `var(--s-text-color-primary)`  |
