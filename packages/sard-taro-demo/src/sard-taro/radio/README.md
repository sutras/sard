# Radio 单选按钮

### 介绍

在一组可选项中进行单一选择。

### 引入

```ts
import { Radio } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `checked` 和 `onChange` 属性使其变成受控组件。

%(${DEMO_PATH}/radio/demo/Basic.tsx)

### 禁用状态

禁用后不可点击。

%(${DEMO_PATH}/radio/demo/Disabled.tsx)

### 图标大小

使用 `size` 属性配置图标大小。

%(${DEMO_PATH}/radio/demo/Size.tsx)

### 自定义颜色

使用 `checkedColor` 属性配置选中时的图标颜色。

%(${DEMO_PATH}/radio/demo/Color.tsx)

### 图标类型

配置 `type` 属性可以改变图标类型。

%(${DEMO_PATH}/radio/demo/Type.tsx)

### 自定义图标

如果内置的图标不满足需求，可以使用 `icon` 属性配置为任意的图标。
`icon` 属性值为接受当前选中状态的函数。

%(${DEMO_PATH}/radio/demo/CustomIcon.tsx)

### 自定义组件

`Radio`的`children`属性可以是一个接收“是否选中状态”和“切换选中函数”参数的函数，用于随心所欲地定制选框组件。

`Radio` 组件通过 `useContext` 消费复选框上下文的值，一旦有消费，则其嵌套的复选框无法再次消费。

%(${DEMO_PATH}/radio/demo/Custom.tsx)

### 完全自定义组件

内置的`Radio`组件在内部是基于`useSelect`和`useSelectGroup`钩子以及`SelectContext`上下文对象实现的，并添加默认的结构和样式。也许你也需要定制自己的`Radio`。

%(${DEMO_PATH}/radio/demo/CustomFully.tsx)

## API

### RadioProps

| 属性           | 描述                                          | 类型                                                                          | 默认值   |
| -------------- | --------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| checked        | 指定当前是否选中                              | boolean                                                                       | false    |
| defaultChecked | 默认是否选中                                  | boolean                                                                       | false    |
| value          | 与 `RadioGroup` 的 `value` 相同时表示选中状态 | any                                                                           | -        |
| onChange       | 变化时触发                                    | (checked: boolean, value: any) => void                                        | -        |
| disabled       | 禁用状态                                      | boolean                                                                       | false    |
| readOnly       | 只读状态                                      | boolean                                                                       | false    |
| size           | 图标的尺寸                                    | string \| number                                                              | -        |
| type           | 图标类型                                      | 'record' \| 'check'                                                           | 'record' |
| icon           | 自定义图标                                    | (checked: boolean) => React.ReactNode                                         | -        |
| checkedColor   | 选中时图标的颜色                              | string                                                                        | -        |
| children       | label 内容                                    | React.ReactNode \|((checked: boolean, toggle: () => void) => React.ReactNode) | -        |
| onClick        | 点击时触发                                    | onClick?: (event: ITouchEvent) => void                                        | -        |

### RadioGroupProps

| 属性         | 描述             | 类型                                  | 默认值   |
| ------------ | ---------------- | ------------------------------------- | -------- |
| value        | 指定选中的选项   | any                                   | -        |
| defaultValue | 默认选中的选项   | any                                   | -        |
| onChange     | 变化时触发       | (value: any) => void                  | -        |
| disabled     | 禁用状态         | boolean                               | false    |
| readOnly     | 只读状态         | boolean                               | false    |
| size         | 图标的尺寸       | string \| number                      | -        |
| type         | 图标类型         | 'record' \| 'check'                   | 'record' |
| icon         | 自定义图标       | (checked: boolean) => React.ReactNode | -        |
| checkedColor | 选中时图标的颜色 | string                                | -        |

## 主题定制

### CSS 变量

%(./index.scss#variables)
