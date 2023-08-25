# Radio 单选按钮

### 介绍

在一组可选项中进行单一选择。

### 引入

```js
import { Radio } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/radio/demo/Basic.tsx)

### 受控

%(${DEMO_PATH}/radio/demo/Controllable.tsx)

### 禁用状态

%(${DEMO_PATH}/radio/demo/Disabled.tsx)

### 图标大小

%(${DEMO_PATH}/radio/demo/Size.tsx)

### 颜色

%(${DEMO_PATH}/radio/demo/Color.tsx)

### 图标类型

%(${DEMO_PATH}/radio/demo/Type.tsx)

### 自定义图标

%(${DEMO_PATH}/radio/demo/CustomIcon.tsx)

### 自定义组件

`Radio`的`children`属性可以是一个接收“是否选中状态”和“切换选中函数”参数的函数，用于随心所欲地定制选框组件。

%(${DEMO_PATH}/radio/demo/Custom.tsx)

### 完全自定义组件

内置的`Radio`组件在内部是基于`useCheck`和`useCheckGroup`钩子以及`CheckContext`上下文对象实现的，并添加默认的结构和样式。也许你也需要定制自己的`Radio`。

%(${DEMO_PATH}/radio/demo/CustomFully.tsx)

## API

### RadioProps

| 属性           | 描述                                          | 类型                                   | 默认值   |
| -------------- | --------------------------------------------- | -------------------------------------- | -------- |
| checked        | 指定当前是否选中                              | boolean                                | false    |
| defaultChecked | 默认是否选中                                  | boolean                                | false    |
| onChange       | 变化时触发                                    | (checked: boolean, value: any) => void | -        |
| checkedColor   | 选中时图标的颜色                              | string                                 | -        |
| children       | label 内容                                    | React.ReactNode                        | -        |
| icon           | 自定义图标                                    | (checked: boolean) => React.ReactNode  | -        |
| onClick        | 点击时触发                                    | onClick?: (event: ITouchEvent) => void | -        |
| value          | 与 `RadioGroup` 的 `value` 相同时表示选中状态 | any                                    | -        |
| size           | 图标的尺寸                                    | string \| number                       | -        |
| type           | 图标类型                                      | 'record' \| 'check'                    | 'record' |
| disabled       | 禁用状态                                      | boolean                                | false    |

### RadioGroupProps

| 属性         | 描述             | 类型                                  | 默认值   |
| ------------ | ---------------- | ------------------------------------- | -------- |
| value        | 指定选中的选项   | any                                   | -        |
| defaultValue | 默认选中的选项   | any                                   | -        |
| onChange     | 变化时触发       | (value: any) => void                  | -        |
| checkedColor | 选中时图标的颜色 | string                                | -        |
| icon         | 自定义图标       | (checked: boolean) => React.ReactNode | -        |
| size         | 图标的尺寸       | string \| number                      | -        |
| type         | 图标类型         | 'record' \| 'check'                   | 'record' |
| vertical     | 是否垂直排列     | boolean                               | false    |
| disabled     | 禁用状态         | boolean                               | false    |

## 主题定制

### CSS 变量

%(./index.scss#variables)
