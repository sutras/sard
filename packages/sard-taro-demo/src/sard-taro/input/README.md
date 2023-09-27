# Input 输入框

### 介绍

接收用户输入的文本信息。

### 引入

```ts
import { Input } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `value` 和 `onChange` 使其变为受控组件。

%(${DEMO_PATH}/input/demo/Basic.tsx)

### 自定义样式

可以对其尺寸、颜色、背景色、边框等样式进行设置。

%(${DEMO_PATH}/input/demo/Style.tsx)

### 类型

据 `type` 属性定义不同类型的输入框，默认值为 `text。`

%(${DEMO_PATH}/input/demo/Type.tsx)

### 可清除的

设置了 `clearable` 属性后输入框有值时会显示清除按钮。

%(${DEMO_PATH}/input/demo/Clearable.tsx)

### 聚焦时显示清除按钮

只在输入框获取焦点时显示清除按钮。

%(${DEMO_PATH}/input/demo/ShowClearOnlyFocus.tsx)

### 只读和禁用

只读或禁用时无法输入。

%(${DEMO_PATH}/input/demo/DisabledReadOnly.tsx)

### 插槽

可以通过前置或后置插槽添加额外的内容。

%(${DEMO_PATH}/input/demo/Slot.tsx)

### 去除边框

清除边框后页面看起来会很清爽。

%(${DEMO_PATH}/input/demo/Borderless.tsx)

### 嵌入的

`inlaid` 用于清除边框和内边距，以便可以嵌入到其他组件内

%(${DEMO_PATH}/input/demo/Inlaid.tsx)

### 自动高度

设置自动高度可以让文本域随输入内容变多而增高。
另外可以设置 `minHeight` 和 `maxHeight` 限制文本域的最大最小高度。

%(${DEMO_PATH}/input/demo/AutoHeight.tsx)

### 字数提示

设置 `showCount` 属性可以显示当前输入的字数和总字数；
设置 `maxLength` 可以限制输入的最大字数。

%(${DEMO_PATH}/input/demo/ShowCount.tsx)

## API

### InputProps

| 属性               | 描述                                               | 类型                                                                                        | 默认值 |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------ |
| value              | 输入框值                                           | string                                                                                      | -      |
| defaultValue       | 输入框默认值                                       | string                                                                                      | -      |
| onChange           | 输入框值变化时触发                                 | (value: string) => void                                                                     | -      |
| disabled           | 禁用状态                                           | boolean                                                                                     | false  |
| readOnly           | 只读状态                                           | boolean                                                                                     | false  |
| maxLength          | 最大输入长度，设置为 -1 的时候不限制最大长度       | number                                                                                      | 140    |
| showCount          | 是否展示字数                                       | boolean                                                                                     | false  |
| count              | 自定义字数展示内容                                 | (currentCount: number, maxLength: number) => React.ReactNode                                | -      |
| autoHeight         | 文本域自动高度                                     | boolean \| { minHeight: number; maxHeight: number } \| { minRows: number; maxRows: number } | false  |
| borderless         | 是否显示边框                                       | boolean                                                                                     | false  |
| inlaid             | 嵌入式状态                                         | boolean                                                                                     | false  |
| prepend            | 输入框前面插槽                                     | React.ReactNode                                                                             | -      |
| append             | 输入框后面插槽                                     | React.ReactNode                                                                             | -      |
| clearable          | 是否显示清空按钮                                   | boolean                                                                                     | false  |
| showClearOnlyFocus | 是否只在聚焦时显示清空按钮                         | boolean                                                                                     | false  |
| clear              | 自定义清空按钮                                     | React.ReactNode                                                                             | -      |
| onClear            | 点击清空按钮时触发                                 | (value: '') => void                                                                         | -      |
| onClick            | 点击输入框时触发                                   | (event: ITouchEvent) => void                                                                | -      |
| autoFocus          | 自动获取焦点                                       | boolean                                                                                     | false  |
| onFocus            | 输入框获取焦点时触发                               | (event: React.FocusEvent) => void                                                           | -      |
| onBlur             | 输入框失去焦点时触发                               | (event: React.FocusEvent) => void                                                           | -      |
| focused            | 是否获取焦点，用于结合自定义键盘使用时显示高亮效果 | boolean                                                                                     | false  |
| placeholder        | 输入框占位符内容                                   | string                                                                                      | -      |
| type               | 输入框类型                                         | 'text' \| 'password' \| 'textarea' \| 'number' \| 'tel' \| 'url' \| 'search'                | 'text' |
| confirmType        | 输入设置键盘右下角按钮的文字框类型                 | "send" \| "search" \| "next" \| "go" \| "done" \| "return"                                  | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
