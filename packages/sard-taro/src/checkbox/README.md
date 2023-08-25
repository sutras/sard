# Checkbox 复选框

### 介绍

在一组可选项中进行任意选择。

### 引入

```js
import { Checkbox } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/checkbox/demo/Basic.tsx)

### 受控

%(${DEMO_PATH}/checkbox/demo/Controllable.tsx)

### 禁用

%(${DEMO_PATH}/checkbox/demo/Disabled.tsx)

### 图标大小

%(${DEMO_PATH}/checkbox/demo/Size.tsx)

### 自定义颜色

%(${DEMO_PATH}/checkbox/demo/Color.tsx)

### 图标类型

%(${DEMO_PATH}/checkbox/demo/Type.tsx)

### 自定义图标

%(${DEMO_PATH}/checkbox/demo/Icon.tsx)

### 复选框组

复选框组用于收集选中状态的复选框值。

%(${DEMO_PATH}/checkbox/demo/Group.tsx)

### 自定义组件

`Checkbox`的`children`属性可以是一个接收“是否选中状态”和“切换选中函数”参数的函数，用于随心所欲地定制选框组件。

%(${DEMO_PATH}/checkbox/demo/Custom.tsx)

### 完全自定义组件

内置的`Checkbox`组件在内部是基于`useCheck`和`useCheckGroup`钩子以及`CheckContext`上下文对象实现的，并添加默认的结构和样式。也许你也需要定制自己的`Checkbox`。

%(${DEMO_PATH}/checkbox/demo/CustomFully.tsx)

## API

### CheckboxProps

| 属性           | 描述                                             | 类型                                   | 默认值   |
| -------------- | ------------------------------------------------ | -------------------------------------- | -------- |
| children       | label 内容                                       | React.ReactNode                        | -        |
| checked        | 指定当前是否选中                                 | boolean                                | false    |
| defaultChecked | 默认是否选中                                     | boolean                                | false    |
| checkedColor   | 选中时图标的颜色                                 | string                                 | -        |
| disabled       | 禁用状态                                         | boolean                                | false    |
| icon           | 自定义图标                                       | (checked: boolean) => React.ReactNode  | -        |
| onClick        | 点击时触发                                       | onClick?: (event: ITouchEvent) => void | -        |
| onChange       | 变化时触发                                       | (checked: boolean, value: any) => void | -        |
| size           | 图标的尺寸                                       | string \| number                       | -        |
| type           | 图标类型                                         | 'square' \| 'circle'                   | 'square' |
| value          | 被 `CheckboxGroup` 的 `value` 包含时表示选中状态 | any                                    | -        |

### CheckboxGroupProps

| 属性         | 描述             | 类型                                  | 默认值   |
| ------------ | ---------------- | ------------------------------------- | -------- |
| value        | 指定选中的选项   | any[]                                 | []       |
| defaultValue | 默认选中的选项   | any[]                                 | []       |
| onChange     | 变化时触发       | (value: any[]) => void                | -        |
| disabled     | 禁用状态         | boolean                               | false    |
| checkedColor | 选中时图标的颜色 | string                                | -        |
| icon         | 自定义图标       | (checked: boolean) => React.ReactNode | -        |
| size         | 图标的尺寸       | string \| number                      | -        |
| type         | 图标类型         | 'square' \| 'circle'                  | 'square' |
| vertical     | 是否垂直排列     | boolean                               | false    |

## 主题定制

### CSS 变量

%(./index.scss#variables)
