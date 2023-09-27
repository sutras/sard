# Switch 开关

### 介绍

用于打开/关闭两种状态间的切换。

### 引入

```ts
import { Switch } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `checked` 和 `onChange` 使其变为受控组件。

%(${DEMO_PATH}/switch/demo/Basic.tsx)

### 自定义尺寸

使用 `size` 属性设置开关尺寸。

%(${DEMO_PATH}/switch/demo/Size.tsx)

### 自定义颜色

使用 `checkedColor` 属性设置打开时的颜色，使用 `uncheckedColor` 属性设置关闭时的颜色。

%(${DEMO_PATH}/switch/demo/Color.tsx)

### 不同状态的值

`checkedValue` 和 `uncheckedValue` 的属性设置的值会作为 `onChange` 的第二个参数。

%(${DEMO_PATH}/switch/demo/Value.tsx)

### 只读和禁用

只读或禁用时不可操作。

%(${DEMO_PATH}/switch/demo/DisabledReadOnly.tsx)

### 加载状态

加载时不可操作。

%(${DEMO_PATH}/switch/demo/Loading.tsx)

## API

### SwitchProps

| 属性           | 描述             | 类型                                   | 默认值 |
| -------------- | ---------------- | -------------------------------------- | ------ |
| checked        | 指定当前是否开启 | boolean                                | -      |
| defaultChecked | 默认是否开启     | boolean                                | -      |
| onChange       | 变化时触发       | (checked: boolean, value: any) => void | -      |
| disabled       | 禁用状态         | boolean                                | false  |
| readOnly       | 只读状态         | boolean                                | false  |
| loading        | 加载状态         | boolean                                | false  |
| size           | 开关大小         | number                                 | 30     |
| checkedColor   | 开启时的颜色     | string                                 | -      |
| uncheckedColor | 关闭时的颜色     | string                                 | -      |
| checkedValue   | 开启时的值       | any                                    | true   |
| uncheckedValue | 关闭时的值       | any                                    | false  |
| onClick        | 点击时触发       | (event: ITouchEvent) => void           | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
