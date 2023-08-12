# Input 输入框

### 介绍

接收用户输入的文本信息。

### 引入

```js
import { Input } from 'sard-taro'
```

## 代码演示

### 非受控组件

%(${DEMO_PATH}/input/demo/Basic.tsx)

### 受控组件

%(${DEMO_PATH}/input/demo/Controllable.tsx)

### 自定义样式

%(${DEMO_PATH}/input/demo/Style.tsx)

### 类型

%(${DEMO_PATH}/input/demo/Type.tsx)

### 可清除的

%(${DEMO_PATH}/input/demo/Clearable.tsx)

### 聚焦时显示清除按钮

%(${DEMO_PATH}/input/demo/ShowClearOnlyFocus.tsx)

### 禁用

%(${DEMO_PATH}/input/demo/Disabled.tsx)

### 只读

%(${DEMO_PATH}/input/demo/ReadOnly.tsx)

### 插槽

%(${DEMO_PATH}/input/demo/Slot.tsx)

### 去除边框

%(${DEMO_PATH}/input/demo/Borderless.tsx)

### 嵌入的

`inlaid` 用于清除边框和内边距，以便可以嵌入到其他组件内

%(${DEMO_PATH}/input/demo/Inlaid.tsx)

### 自动高度

%(${DEMO_PATH}/input/demo/AutoHeight.tsx)

### 字数提示

%(${DEMO_PATH}/input/demo/ShowCount.tsx)

## API

### InputProps

| 属性         | 描述                                               | 类型                                                                                        | 默认值 |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------ |
| value        | 输入框内容                                         | string                                                                                      | -      |
| defaultValue | 输入框默认内容                                     | string                                                                                      | -      |
| onChange     | 输入框值变化时触发                                 | (value: string) => void                                                                     | -      |
| placeholder  | 输入框占位符内容                                   | string                                                                                      | -      |
| type         | 输入框类型                                         | 'text' \| 'password' \| 'textarea' \| 'number' \| 'tel' \| 'url' \| 'search'                | 'text' |
| prepend      | 输入框前面插槽                                     | React.ReactNode                                                                             | -      |
| append       | 输入框后面插槽                                     | React.ReactNode                                                                             | -      |
| autoFocus    | 自动获取焦点                                       | boolean                                                                                     | false  |
| autoHeight   | 文本域自动高度                                     | boolean \| { minHeight: number; maxHeight: number } \| { minRows: number; maxRows: number } | false  |
| disabled     | 禁用状态                                           | boolean                                                                                     | false  |
| readOnly     | 只读状态                                           | boolean                                                                                     | false  |
| borderless   | 是否显示边框                                       | boolean                                                                                     | false  |
| inlaid       | 嵌入式状态                                         | boolean                                                                                     | false  |
| maxLength    | 最大输入长度，设置为 -1 的时候不限制最大长度       | number                                                                                      | 140    |
| showCount    | 是否展示字数                                       | boolean                                                                                     | false  |
| onFocus      | 输入框获取焦点时触发                               | (event: React.FocusEvent) => void                                                           | -      |
| onBlur       | 输入框失去焦点时触发                               | (event: React.FocusEvent) => void                                                           | -      |
| onClick      | 点击输入框时触发                                   | (event: ITouchEvent) => void                                                                | -      |
| clear        | 自定义清空按钮                                     | React.ReactNode                                                                             | -      |
| clearable    | 是否显示清空按钮                                   | boolean                                                                                     | false  |
| onClear      | 点击清空按钮时触发                                 | (value: '') => void                                                                         | -      |
| focused      | 是否获取焦点，用于结合自定义键盘使用时显示高亮效果 | boolean                                                                                     | false  |

## 主题定制

### CSS 变量

%(./index.scss#variables)

```

```
