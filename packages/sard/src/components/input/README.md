# Input 输入框

### 介绍

接收用户输入的文本信息。

### 引入

```js
import { Input } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Controlled.tsx",
    "./demo/Style.tsx",
    "./demo/type.tsx",
    "./demo/Clearable.tsx",
    "./demo/Disabled.tsx",
    "./demo/ReadOnly.tsx",
    "./demo/Slot.tsx",
    "./demo/Borderless.tsx",
    "./demo/Inlaid.tsx",
    "./demo/AutoHeight.tsx",
    "./demo/ShowCount.tsx"
  ]
</script>

## API

### InputProps

| 属性         | 描述                     | 类型                                                                                        | 默认值 |
| ------------ | ------------------------ | ------------------------------------------------------------------------------------------- | ------ |
| value        | 输入框内容               | string \| number                                                                            | -      |
| defaultValue | 输入框默认内容           | string \| number                                                                            | -      |
| onChange     | 输入框值变化时触发       | (value: string) => void                                                                     | -      |
| placeholder  | 输入框占位符内容         | string                                                                                      | -      |
| type         | 输入框类型               | 'text' \| 'password' \| 'textarea' \| 'number' \| 'tel' \| 'url' \| 'search'                | 'text' |
| prepend      | 输入框前面插槽           | React.ReactNode                                                                             | -      |
| append       | 输入框后面插槽           | React.ReactNode                                                                             | -      |
| autoFocus    | 自动获取焦点             | boolean                                                                                     | false  |
| autoHeight   | 文本域自动高度           | boolean \| { minHeight: number; maxHeight: number } \| { minRows: number; maxRows: number } | false  |
| disabled     | 禁用状态                 | boolean                                                                                     | false  |
| readOnly     | 只读状态                 | boolean                                                                                     | false  |
| borderless   | 是否显示边框             | boolean                                                                                     | false  |
| inlaid       | 嵌入式状态               | boolean                                                                                     | false  |
| rows         | 文本域显示的行数         | number                                                                                      | -      |
| maxLength    | 输入框允许输入的最大长度 | number                                                                                      | -      |
| showCount    | 是否展示字数             | boolean                                                                                     | false  |
| onFocus      | 输入框获取焦点时触发     | (event: React.FocusEvent) => void                                                           | -      |
| onBlur       | 输入框失去焦点时触发     | (event: React.FocusEvent) => void                                                           | -      |
| onClick      | 点击输入框时触发         | (event: React.MouseEvent) => void                                                           | -      |
| clear        | 自定义清空按钮           | React.ReactNode                                                                             | -      |
| clearable    | 是否显示清空按钮         | boolean                                                                                     | false  |
| onClear      | 点击清空按钮时触发       | (value: '') => void                                                                         | -      |

## 主题定制

### SCSS

```scss

```
