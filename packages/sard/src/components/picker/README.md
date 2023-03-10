# Picker 选择器

### 介绍

一个或多个可滚动列表选择器。

### 引入

```js
import { Picker } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Multiple.tsx",
    "./demo/Controlled.tsx",
    "./demo/Disabled.tsx",
    "./demo/FieldNames.tsx",
    "./demo/Popout.tsx"
  ]
</script>

## API

### PickerProps

| 属性           | 描述                                                         | 类型                                                               | 默认值                                                   |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------- |
| columns        | 二维数组，配置每一列的数据                                   | PickerOption[][]                                                   | []                                                       |
| fieldNames     | 自定义 `columns` 结构中的字段                                | { label?: string, value?: string, children?: string }              | { label: 'label', value: 'value', children: 'children' } |
| value          | 选中项                                                       | any[]                                                              | -                                                        |
| defaultValue   | 默认选中项                                                   | any[]                                                              | -                                                        |
| onChange       | 选项改变时触发（所有列都选择完毕）                           | (value: any[]) => void                                             | -                                                        |
| onColumnChange | 列值改变时触发，`columnIndex` 列下标，`index` 选择的项的下标 | (columnIndex: number, option: PickerOption, index: number) => void | -                                                        |
| itemHeight     | 选项的高度，单位 px                                          | number                                                             | 48                                                       |
| focusHeight    | 中间选中框的高度，单位 px                                    | number                                                             | 56                                                       |

### Picker 方法

| 属性               | 描述                                               | 类型                        |
| ------------------ | -------------------------------------------------- | --------------------------- |
| getOptions         | 获取当前选中的选项                                 | () => PickerOption[]        |
| pickImmediately    | 停止惯性滚动并选定选项                             | () => void                  |
| setIndexesForcibly | 强制设置选中选项的下标，不会触发事件，没有动画效果 | (indexes: number[]) => void |

## 主题定制

### SCSS

```scss

```
