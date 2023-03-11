# Switch 开关

### 介绍

用于打开/关闭两种状态间的切换。

### 引入

```js
import { Switch } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Size.tsx",
    "./demo/Color.tsx",
    "./demo/Value.tsx",
    "./demo/Disabled.tsx",
    "./demo/ReadOnly.tsx",
    "./demo/Loading.tsx",
    "./demo/Async.tsx"
  ]
</script>

## API

### SwitchProps

| 属性           | 描述             | 类型                                   | 默认值 |
| -------------- | ---------------- | -------------------------------------- | ------ |
| checked        | 指定当前是否开启 | boolean                                | -      |
| defaultChecked | 默认是否开启     | boolean                                | -      |
| disabled       | 禁用状态         | boolean                                | false  |
| readOnly       | 只读状态         | boolean                                | false  |
| loading        | 加载状态         | boolean                                | false  |
| size           | 开关大小         | string \| number                       | -      |
| checkedColor   | 开启时的颜色     | string                                 | -      |
| uncheckedColor | 关闭时的颜色     | string                                 | -      |
| checkedValue   | 开启时的值       | any                                    | -      |
| uncheckedValue | 关闭时的值       | any                                    | -      |
| onChange       | 变化时触发       | (checked: boolean, value: any) => void | -      |
| onClick        | 点击时触发       | (event: React.MouseEvent) => void      | -      |

## 主题定制

### CSS 变量

%{variables}
