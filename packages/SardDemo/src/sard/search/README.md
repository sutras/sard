# Search 搜索

### 介绍

用于搜索场景的输入框组件。

### 引入

```ts
import { Search } from 'sard'
```

## 代码演示

### 基础使用

使用 `value` 和 `onChange` 使其变为受控组件。

@code('${DEMO_PATH}/search/demo/Basic.tsx')

### 搜索按钮

使用 `search` 属性可以添加右侧的按钮，在按钮点击时触发 `onSearch` 事件。

@code('${DEMO_PATH}/search/demo/SearchButton.tsx')

### 取消按钮

使用 `cancel` 属性可以添加右侧的按钮，在按钮点击时触发 `onCancel` 事件，并在点击按钮后清空输入框。

@code('${DEMO_PATH}/search/demo/CancelButton.tsx')

### 形状

设置 `shape="round"` 可以将输入框变为圆形。

@code('${DEMO_PATH}/search/demo/Shape.tsx')

### 对齐

设置 `align="center"` 可以将输入内容居中。

@code('${DEMO_PATH}/search/demo/Align.tsx')

### 背景色

通过 `background` 属性可以设置搜索框外部的背景色。
通过 `inputBackground` 属性可以设置搜索框内部的背景色。

@code('${DEMO_PATH}/search/demo/Background.tsx')

### 只读和禁用

只读或禁用后不可输入。

@code('${DEMO_PATH}/search/demo/DisabledReadOnly.tsx')

### 插槽

通过 `prepend`、`append`、`inputPrepend`、`inputAppend` 属性可以自定义内容。

@code('${DEMO_PATH}/search/demo/Slot.tsx')

## API

### SearchProps

| 属性            | 描述               | 类型                          | 默认值   |
| --------------- | ------------------ | ----------------------------- | -------- |
| value           | 输入框值           | string                        | -        |
| defaultValue    | 输入框默认值       | string                        | -        |
| onChange        | 输入框值变化时触发 | (value: string) => void       | -        |
| placeholder     | 输入框占位符内容   | string                        | -        |
| shape           | 输入框形状         | 'round' \| 'square'           | 'square' |
| background      | 搜索框外部的背景色 | string                        | -        |
| inputBackground | 搜索框内部的背景色 | string                        | -        |
| disabled        | 禁用状态           | boolean                       | false    |
| readOnly        | 只读状态           | boolean                       | false    |
| align           | 输入框文字对齐     | 'left' \| 'center' \| 'right' | 'left'   |
| cancel          | 定义取消按钮       | React.ReactNode               | -        |
| onCancel        | 点击取消按钮时触发 | () => void                    | -        |
| search          | 定义搜索按钮       | React.ReactNode               | -        |
| onSearch        | 点击搜索按钮时触发 | (value: string) => void       | -        |
| prepend         | 搜索框前置插槽     | React.ReactNode               | -        |
| append          | 搜索框后置插槽     | React.ReactNode               | -        |
| inputPrepend    | 输入框前置插槽     | React.ReactNode               | -        |
| inputAppend     | 输入框后置插槽     | React.ReactNode               | -        |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
