# Checkbox 复选框

### 介绍

在一组可选项中进行任意选择。

### 引入

```js
import { Checkbox } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Controlled.tsx",
    "./demo/Disabled.tsx",
    "./demo/Group.tsx",
    "./demo/Size.tsx",
    "./demo/Color.tsx",
    "./demo/Type.tsx",
    "./demo/Icon.tsx"
  ]
</script>

## API

### CheckboxProps

| 属性           | 描述                                             | 类型                                        | 默认值   |
| -------------- | ------------------------------------------------ | ------------------------------------------- | -------- |
| children       | label 内容                                       | React.ReactNode                             | -        |
| checked        | 指定当前是否选中                                 | boolean                                     | false    |
| defaultChecked | 默认是否选中                                     | boolean                                     | false    |
| checkedColor   | 选中时图标的颜色                                 | string                                      | -        |
| disabled       | 禁用状态                                         | boolean                                     | false    |
| icon           | 自定义图标                                       | (checked: boolean) => React.ReactNode       | -        |
| onClick        | 点击时触发                                       | onClick?: (event: React.MouseEvent) => void | -        |
| onChange       | 变化时触发                                       | (checked: boolean, value: any) => void      | -        |
| size           | 图标的尺寸                                       | string \| number                            | -        |
| type           | 图标类型                                         | 'square' \| 'circle'                        | 'square' |
| value          | 被 `CheckboxGroup` 的 `value` 包含时表示选中状态 | any                                         | -        |

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

%{variables}
