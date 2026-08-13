---
title: Cascader
subtitle: 级联选择
group: 表单组件
---

## 介绍

用于在多层级数据中进行选择，常用于省市区、组织架构选择。

## 代码演示

### 基础使用

通过 `v-model` 绑定当前值，通过 `options` 配置选项数据。

<<< @demo/cascader/demo/Basic.vue

### 选择即改变

设置 `change-on-select` 属性，允许只选中父级选项。

<<< @demo/cascader/demo/ChangeOnSelect.vue

### 懒加载

设置 `lazy` 属性标识为懒加载，设置 `load` 属性用于获取数据，会在点击节点时调用，当获取的数据为空时，会将点击的节点标识为叶子节点。当然，你也可以提前设置节点是否为叶子节点，以避免为叶子节点时还要请求一次接口。

首次加载失败可点击提示重新加载，“无数据”状态也可点击重新加载；点击节点加载失败回退到 `idle` 状态，可再次点击进行加载。

<<< @demo/cascader/demo/Lazy.vue

### 自定义面板上方内容

使用 `top` 插槽可以在面板顶部展示当前面板的一些信息。

<<< @demo/cascader/demo/OptionTop.vue

### 禁选选项

禁用的选项不可点击。

<<< @demo/cascader/demo/Disabled.vue

### 绑定所有级别的值

如果要绑定所有级别的值，即绑定数组值，而不单单是最后一级，可以使用 `all-levels` 属性。

<<< @demo/cascader/demo/AllLevels.vue

### 多选

设置 `multiple` 属性可在每个选项前面显示复选框，点击复选框可选择多个；如果是最后一级，点击选项也可以选中复选框。

<<< @demo/cascader/demo/Multiple.vue

### 多选-绑定所有级别的值

`all-levels` 属性也可以作用于多选，当设置此属性，绑定的值会是一个二维数组。

<<< @demo/cascader/demo/MultipleAllLevels.vue

### 多选-选择任意级别

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。 启用该功能后，可让父子节点取消关联，选择任意一级选项。

可通过设置 `check-strictly` 来取消父子节点选中关联，从而达到选择任意一级选项的目的。

<<< @demo/cascader/demo/CheckStrictly.vue

### 多选-选择任意级别-绑定所有级别

下面综合演示多选的使用。

<<< @demo/cascader/demo/CheckStrictlyAllLevels.vue

## API

### CascaderProps

| 属性             | 描述                                          | 类型                                                                          | 默认值            |
| ---------------- | --------------------------------------------- | ----------------------------------------------------------------------------- | ----------------- |
| model-value      | 选中项的值                                    | CascaderValue                                                                 | -                 |
| options          | 可选项数据源                                  | CascaderOption[]                                                              | []                |
| field-keys       | 自定义 `options` 中的字段                     | OptionKeys                                                                    | defaultOptionKeys |
| option-keys      | 自定义 `options` 中的字段，同 `field-keys`    | OptionKeys                                                                    | defaultOptionKeys |
| hint-text        | 未选中时的提示文案                            | string                                                                        | '请选择'          |
| label-render     | 自定义可选项渲染                              | `(option: CascaderOption) => string`                                          | -                 |
| change-on-select | 点击每级选项都会触发变化                      | boolean                                                                       | false             |
| all-levels       | 是否绑定所有级别的值，而不单单是最后一级      | boolean                                                                       | false             |
| multiple         | 是否多选                                      | boolean                                                                       | false             |
| check-strictly   | 是否严格的遵守父子节点不互相关联（用于多选）  | boolean                                                                       | false             |
| lazy             | 是否懒加载子节点，需与 load 方法结合使用      | boolean                                                                       | false             |
| load             | 加载子节点的方法，仅当 lazy 属性为true 时生效 | `(node?: CascaderStateNode) => Promise<CascaderOption[]> \| CascaderOption[]` | -                 |

### CascaderSlots

| 插槽 | 描述               | 属性                   |
| ---- | ------------------ | ---------------------- |
| top  | 自定义面板上方内容 | `{ tabIndex: number }` |

### CascaderEmits

| 事件              | 描述                   | 类型                                                                |
| ----------------- | ---------------------- | ------------------------------------------------------------------- |
| update:modelValue | 全部选项选择完成后触发 | `(value: CascaderValue, selectedOptions: CascaderOption[]) => void` |
| change            | 全部选项选择完成后触发 | `(value: CascaderValue, selectedOptions: CascaderOption[]) => void` |
| select            | 选中某一项时触发       | `(option: CascaderOption, tabIndex: number) => void`                |

### CascaderValue

```ts
type CascaderValue = string | number | (string | number)[] | (string | number)[][]
```

### CascaderOption

```ts
interface CascaderOption {
  label?: string
  value?: string | number
  disabled?: boolean
  children?: CascaderOption[]
  isLeaf?: boolean
  [key: PropertyKey]: any
}
```

### OptionKeys

```ts
interface OptionKeys {
  label?: string
  value?: string
  disabled?: string
  children?: string
  isLeaf?: string
}
```

### defaultOptionKeys

::: code-group

```ts [ts]
const defaultOptionKeys: OptionKeys = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
  isLeaf: 'isLeaf',
}
```

```js [js]
const defaultOptionKeys = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  children: 'children',
  isLeaf: 'isLeaf',
}
```

:::

### CascaderStateNode

```ts
interface CascaderStateNode {
  label: string
  value: string | number
  key: string | number
  disabled: boolean
  children?: CascaderStateNode[]
  parent: CascaderStateNode | null
  isLeaf: boolean
  loadStatus: 'idle' | 'loading' | 'loaded'
  depth: number
  indeterminate: boolean
  checked: boolean
  selected: boolean
  option: CascaderOption
}
```

## 主题定制

### 样式变量

| CSS 变量                                   | 值                             |
| ------------------------------------------ | ------------------------------ |
| `--s-cascader-wrapper-duration`            | `var(--s-duration)`            |
| `--s-cascader-options-height`              | `320px`                        |
| `--s-cascader-option-min-height`           | `var(--s-content-height-sm)`   |
| `--s-cascader-option-padding-y`            | `var(--s-content-padding-y)`   |
| `--s-cascader-option-padding-x`            | `var(--s-content-padding-x)`   |
| `--s-cascader-option-color-selected`       | `var(--s-color-primary)`       |
| `--s-cascader-option-font-weight-selected` | `var(--s-font-weight-bold)`    |
| `--s-cascader-option-bg-active`            | `var(--s-bg-color-active)`     |
| `--s-cascader-option-loading-margin-end`   | `var(--s-size-xs)`             |
| `--s-cascader-option-loading-font-size`    | `var(--s-font-size)`           |
| `--s-cascader-option-loading-color`        | `var(--s-text-color-fourth)`   |
| `--s-cascader-option-label-font-size`      | `var(--s-font-size)`           |
| `--s-cascader-option-label-line-height`    | `var(--s-line-height-relaxed)` |
| `--s-cascader-status-font-size`            | `var(--s-font-size)`           |
| `--s-cascader-status-color`                | `var(--s-text-color-fourth)`   |
| `--s-cascader-loading-font-size`           | `var(--s-font-size-xl)`        |
