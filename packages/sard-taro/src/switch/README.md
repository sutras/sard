# Switch 开关

### 介绍

用于打开/关闭两种状态间的切换。

### 引入

```js
import { Switch } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/switch/demo/Basic.tsx)

### 自定义尺寸

%(${DEMO_PATH}/switch/demo/Size.tsx)

### 自定义颜色

%(${DEMO_PATH}/switch/demo/Color.tsx)

### 不同状态的值

%(${DEMO_PATH}/switch/demo/Value.tsx)

### 只读和禁用

%(${DEMO_PATH}/switch/demo/DisabledReadOnly.tsx)

### 加载状态

%(${DEMO_PATH}/switch/demo/Loading.tsx)

### 异步控制

%(${DEMO_PATH}/switch/demo/Async.tsx)

## API

### SwitchProps

| 属性           | 描述             | 类型                                                           | 默认值 |
| -------------- | ---------------- | -------------------------------------------------------------- | ------ |
| checked        | 指定当前是否开启 | boolean                                                        | -      |
| defaultChecked | 默认是否开启     | boolean                                                        | -      |
| disabled       | 禁用状态         | boolean                                                        | false  |
| readOnly       | 只读状态         | boolean                                                        | false  |
| loading        | 加载状态         | boolean                                                        | false  |
| size           | 开关大小         | string \| number                                               | -      |
| checkedColor   | 开启时的颜色     | string                                                         | -      |
| uncheckedColor | 关闭时的颜色     | string                                                         | -      |
| checkedValue   | 开启时的值       | boolean \| string \| number                                    | -      |
| uncheckedValue | 关闭时的值       | boolean \| string \| number                                    | -      |
| onChange       | 变化时触发       | (checked: boolean, value: boolean \| string \| number) => void | -      |
| onClick        | 点击时触发       | (event: ITouchEvent) => void                                   | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
