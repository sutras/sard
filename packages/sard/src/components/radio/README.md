# Radio 单选按钮

### 介绍

在一组可选项中进行单一选择。

### 引入

```js
import { Radio } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Controlled.tsx",
    "./demo/Disabled.tsx",
    "./demo/Vertical.tsx",
    "./demo/Size.tsx",
    "./demo/Color.tsx",
    "./demo/Type.tsx",
    "./demo/Icon.tsx"
  ]
</script>

## API

### RadioProps

| 属性           | 描述                                          | 类型                                        | 默认值   |
| -------------- | --------------------------------------------- | ------------------------------------------- | -------- |
| checked        | 指定当前是否选中                              | boolean                                     | false    |
| defaultChecked | 默认是否选中                                  | boolean                                     | false    |
| onChange       | 变化时触发                                    | (checked: boolean, value: any) => void      | -        |
| checkedColor   | 选中时图标的颜色                              | string                                      | -        |
| children       | label 内容                                    | React.ReactNode                             | -        |
| icon           | 自定义图标                                    | (checked: boolean) => React.ReactNode       | -        |
| onClick        | 点击时触发                                    | onClick?: (event: React.MouseEvent) => void | -        |
| value          | 与 `RadioGroup` 的 `value` 相同时表示选中状态 | any                                         | -        |
| size           | 图标的尺寸                                    | string \| number                            | -        |
| type           | 图标类型                                      | 'record' \| 'check'                         | 'record' |
| disabled       | 禁用状态                                      | boolean                                     | false    |

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

### SCSS

```scss

```
