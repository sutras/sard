---
title: Input
subtitle: 输入框
group: 表单组件
---

## 介绍

接收用户输入的文本信息。

## 代码演示

### 基础使用

可以通过 `v-model` 绑定输入框的值，通过 `placeholder` 设置占位提示文字。

<<< @demo/input/demo/Basic.vue

### 自定义样式

可以对其尺寸、颜色、背景色、边框等样式进行设置。

<<< @demo/input/demo/Style.vue

### 类型

据 `type` 属性定义不同类型的输入框，默认值为 `text。`

<<< @demo/input/demo/Type.vue

### 可清除的

设置了 `clearable` 属性后，在输入框有值时会显示清除按钮。

<<< @demo/input/demo/Clearable.vue

### 聚焦时显示清除按钮

只在输入框获取焦点时显示清除按钮。

<<< @demo/input/demo/ShowClearOnlyFocus.vue

### 只读和禁用

只读或禁用时无法输入。

<<< @demo/input/demo/DisabledReadOnly.vue

### 插槽

可以通过前置或后置插槽添加额外的内容。

<<< @demo/input/demo/Slot.vue

### 去除边框

清除边框后页面看起来会很清爽。

<<< @demo/input/demo/Borderless.vue

### 嵌入的

`inlaid` 用于清除边框和内边距，以便可以嵌入到其他组件内。

<<< @demo/input/demo/Inlaid.vue

### 多行文本

设置 `type="textarea"` 可以换行输入。

<<< @demo/input/demo/Multiple.vue

### 自动高度

设置自动高度可以让文本域随输入内容变多而增高。
另外可以设置 `minHeight` 设置文本域的最小高度。

<<< @demo/input/demo/AutoHeight.vue

### 字数提示

设置 `showCount` 属性可以显示当前输入的字数和总字数；
设置 `maxlength` 可以限制输入的最大字数。

<<< @demo/input/demo/ShowCount.vue

## API

### InputProps

| 属性                  | 描述                                                                         | 类型                                                    | 默认值 |
| --------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| model-value           | 输入框值                                                                     | string \| number                                        | -      |
| clearable             | 是否显示清空按钮                                                             | boolean                                                 | false  |
| show-clear-only-focus | 是否只在聚焦时显示清空按钮                                                   | boolean                                                 | false  |
| show-count            | 是否展示字数                                                                 | boolean                                                 | false  |
| inlaid                | 嵌入式状态                                                                   | boolean                                                 | false  |
| borderless            | 是否隐藏边框                                                                 | boolean                                                 | false  |
| focused               | 是否显示获焦样式，用于结合自定义键盘使用时显示高亮效果                       | boolean                                                 | false  |
| auto-height           | 文本域自动高度                                                               | boolean \| { minHeight?: number; maxHeight?: number }   | false  |
| validate-event        | 是否触发表单验证                                                             | boolean                                                 | true   |
| show-eye              | `type` 为 `password` 时，是否显示眼睛图标按钮                                | boolean                                                 | false  |
| precision             | 类型为 `number` 或 `digit` 时，可以用来设置数字的精度                        | number                                                  | -      |
| formatter             | 指定输入值的格式                                                             | (value: string, trigger: 'input' \| 'change') => string | -      |
| type                  | 输入框类型, 支持原生 `input` 标签的所有 `type` 属性，额外支持了 `digit` 类型 | InputTypeHTMLAttribute \| 'textarea' \| 'digit'         | 'text' |
| disabled              | 禁用状态                                                                     | boolean                                                 | false  |
| readonly              | 只读状态                                                                     | boolean                                                 | false  |
| maxlength             | 最大输入长度，设置为 -1 的时候不限制最大长度                                 | number                                                  | -      |
| min                   | 输入框类型为 `number` 或 `digit` 类型时设置可允许的最小值                    | number                                                  | -      |
| max                   | 输入框类型为 `number` 或 `digit` 类型时设置可允许的最大值                    | number                                                  | -      |
| rows                  | HTML 原生属性，用于指定输入框的可见文本行数，只对 `textarea` 有效            | string \| number                                        | -      |
| placeholder           | HTML 原生属性，输入框占位符内容                                              | string                                                  | -      |
| autofocus             | HTML 原生属性，是否自动聚焦                                                  | boolean                                                 | -      |
| autocomplete          | HTML 原生属性，用于控制自动完成功能                                          | string                                                  | -      |
| inputmode             | HTML 原生属性，用于指定输入框的输入模式                                      | string                                                  | 'text' |
| enterkeyhint          | HTML 原生属性，用于控制回车键样式                                            | string                                                  | -      |
| spellcheck            | HTML 原生属性，用于检查元素的拼写错误                                        | string                                                  | -      |
| autocorrect           | HTML 原生属性，用于自动更正输入的文本                                        | string                                                  | -      |
| autocapitalize        | HTML 原生属性，用于控制文本输入时是否自动大写                                | string                                                  | -      |

### InputSlots

| 插槽    | 描述                 | 属性 |
| ------- | -------------------- | ---- |
| prepend | 自定义输入框前面内容 | -    |
| append  | 自定义输入框后面内容 | -    |

### InputEmits

| 事件              | 描述                           | 类型                                |
| ----------------- | ------------------------------ | ----------------------------------- |
| input             | 输入框值改变时触发             | `(value: string \| number) => void` |
| update:modelValue | 输入框值改变时触发             | `(value: string \| number) => void` |
| change            | 键盘非聚焦状态且内容改变时触发 | `(value: string \| number) => void` |
| clear             | 点击清除按钮时触发             | `() => void`                        |
| focus             | 聚焦时触发                     | `(event: FocusEvent) => void`       |
| blur              | 失焦时触发                     | `(event: FocusEvent) => void`       |
| compositionstart  | 开始合成时触发                 | `(event: CompositionEvent) => void` |
| compositionupdate | 字符被输入到一段文字时触发     | `(event: CompositionEvent) => void` |
| compositionend    | 合成完成或取消时               | `(event: CompositionEvent) => void` |

## 主题定制

### 样式变量

| CSS 变量                           | 值                             |
| ---------------------------------- | ------------------------------ |
| `--s-input-padding-y`              | `5px`                          |
| `--s-input-padding-y-borderless`   | `6px`                          |
| `--s-input-padding-x`              | `var(--s-size-sm)`             |
| `--s-input-gap`                    | `var(--s-size-xs)`             |
| `--s-input-border-radius`          | `var(--s-border-radius)`       |
| `--s-input-border-color`           | `var(--s-border-color)`        |
| `--s-input-border-color-focused`   | `var(--s-color-primary)`       |
| `--s-input-bg`                     | `transparent`                  |
| `--s-input-bg-disabled`            | `var(--s-bg-color-disabled)`   |
| `--s-input-duration`               | `var(--s-duration)`            |
| `--s-input-control-height`         | `24px`                         |
| `--s-input-control-font-size`      | `var(--s-font-size)`           |
| `--s-input-control-line-height`    | `var(--s-line-height-normal)`  |
| `--s-input-control-color-disabled` | `var(--s-text-color-disabled)` |
| `--s-input-placeholder-color`      | `var(--s-text-color-fourth)`   |
| `--s-input-append-gap`             | `var(--s-size-xs)`             |
| `--s-input-clear-font-size`        | `var(--s-size)`                |
| `--s-input-clear-color`            | `var(--s-text-color-fourth)`   |
| `--s-input-eye-font-size`          | `var(--s-size)`                |
| `--s-input-eye-color`              | `var(--s-text-color-fourth)`   |
| `--s-input-count-font-size`        | `var(--s-font-size-sm)`        |
| `--s-input-count-line-height`      | `var(--s-line-height-tight)`   |
| `--s-input-count-color`            | `var(--s-text-color-tertiary)` |
| `--s-input-count-margin-top`       | `var(--s-size-2xs)`            |
