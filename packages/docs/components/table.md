---
title: Table
subtitle: 表格
group: 数据展示
---

## 介绍

用于展示多条结构类似的数据，支持固定表头、固定列、多级表头、行列合并、自定义渲染等功能。

## 代码演示

### 基础使用

通过 `columns` 定义列结构，`data` 传入数据。

<<< @demo/table/demo/Basic.vue

`data.ts`

<<< @demo/table/demo/data.ts

### 隐藏表头

设置 `show-header` 为 `false` 可以隐藏表头。

<<< @demo/table/demo/HideHeader.vue

### 下边框

设置 `underlined` 属性为单元格添加下边框。

<<< @demo/table/demo/Underline.vue

### 边框

设置 `border` 属性为单元格添加边框。

<<< @demo/table/demo/Border.vue

### 有条纹的

设置 `striped` 属性启用斑马纹样式。

<<< @demo/table/demo/Striped.vue

### 自定义宽度

通过列的 `width` 属性设置列宽，支持数字（px）或带单位的字符串。

<<< @demo/table/demo/Width.vue

### 固定表头

设置 `height` 或 `maxHeight` 属性限制表格高度，表头将自动固定在顶部。

<<< @demo/table/demo/FixedHeader.vue

### 固定列

通过列的 `fixed` 属性将列固定在左侧（`true` 或 `'start'`）或右侧（`'end'`）。

<<< @demo/table/demo/FixedColumn.vue

### 固定表头和列

可以同时固定表头和列。

<<< @demo/table/demo/Fixed.vue

### 多级表头

在 `columns` 中嵌套 `columns` 即可实现多级表头。

<<< @demo/table/demo/MultilevelHeader.vue

### 合并行或列

通过 `span-method` 属性动态合并行或列。函数接收 `{ row, rowIndex, column, columnIndex }`，返回 `{ rowspan, colspan }` 或 `[rowspan, colspan]`。返回 `{ rowspan: 0, colspan: 0 }` 表示该单元格被合并。

<<< @demo/table/demo/Merge.vue

### 满屏表格

通过 `cell-class-name`、`cell-style` 等属性可以自定义单元格样式，配合 `height` 实现满屏效果。

<<< @demo/table/demo/FullScreen.vue

`level-data.ts`

<<< @demo/table/demo/level-data.ts

## API

### TableProps

| 属性                | 描述                     | 类型                                                                                 | 默认值  |
| ------------------- | ------------------------ | ------------------------------------------------------------------------------------ | ------- |
| columns             | 列配置                   | `TableColumnProps[]`                                                                 | `[]`    |
| data                | 表格数据                 | `T[]`                                                                                | `[]`    |
| height              | 表格高度，设置后表头固定 | `string \| number`                                                                   | -       |
| maxHeight           | 表格最大高度             | `string \| number`                                                                   | -       |
| striped             | 是否显示斑马纹           | `boolean`                                                                            | `false` |
| bordered            | 是否显示边框             | `boolean`                                                                            | `false` |
| underlined          | 是否显示下边框           | `boolean`                                                                            | `false` |
| size                | 表格尺寸                 | `'small' \| 'medium' \| 'large'`                                                     | -       |
| showHeader          | 是否显示表头             | `boolean`                                                                            | `true`  |
| rowClassName        | 行类名                   | `ClassValue \| ((data: { row, rowIndex }) => ClassValue)`                            | -       |
| rowStyle            | 行样式                   | `CSSProperties \| ((data: { row, rowIndex }) => CSSProperties)`                      | -       |
| cellClassName       | 单元格类名               | `ClassValue \| ((data: { row, column, rowIndex, columnIndex }) => ClassValue)`       | -       |
| cellStyle           | 单元格样式               | `CSSProperties \| ((data: { row, column, rowIndex, columnIndex }) => CSSProperties)` | -       |
| headerRowClassName  | 表头行类名               | `ClassValue \| ((data: { row, rowIndex }) => ClassValue)`                            | -       |
| headerRowStyle      | 表头行样式               | `CSSProperties \| ((data: { row, rowIndex }) => CSSProperties)`                      | -       |
| headerCellClassName | 表头单元格类名           | `ClassValue \| ((data: { row, rowIndex, column, columnIndex }) => ClassValue)`       | -       |
| headerCellStyle     | 表头单元格样式           | `CSSProperties \| ((data: { row, rowIndex, column, columnIndex }) => CSSProperties)` | -       |
| spanMethod          | 合并行或列的方法         | `(data) => [number, number] \| { rowspan, colspan } \| void`                         | -       |

### TableSlots

| 插槽            | 描述                           | 属性                                     |
| --------------- | ------------------------------ | ---------------------------------------- |
| default         | 自定义默认内容                 | -                                        |
| `[column.slot]` | 动态命名插槽，用于自定义列渲染 | `{ row, column, rowIndex, columnIndex }` |

### TableColumnProps

| 属性        | 描述                                                       | 类型                                                    | 默认值    |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------- | --------- |
| label       | 列标题                                                     | `string`                                                | -         |
| prop        | 对应 `data` 中的字段名                                     | `string`                                                | -         |
| width       | 列宽                                                       | `string \| number`                                      | -         |
| minWidth    | 最小列宽                                                   | `string \| number`                                      | -         |
| fixed       | 固定列，`true` 或 `'start'` 固定在左侧，`'end'` 固定在右侧 | `boolean \| 'start' \| 'end'`                           | `false`   |
| align       | 对齐方式                                                   | `'start' \| 'center' \| 'end'`                          | `'start'` |
| headerAlign | 表头对齐方式                                               | `'start' \| 'center' \| 'end'`                          | -         |
| formatter   | 格式化单元格内容，支持返回 VNode                           | `(data: { row, column, rowIndex, columnIndex }) => any` | -         |
| slot        | 指定渲染单元格的插槽名称                                   | `string`                                                | -         |
| columns     | 嵌套子列，用于多级表头                                     | `TableColumnProps[]`                                    | -         |
| className   | 列的自定义类名                                             | `string`                                                | -         |

## 主题定制

### 样式变量

| CSS 变量                    | 值                             |
| --------------------------- | ------------------------------ |
| `--s-table-border-color`    | `var(--s-border-color)`        |
| `--s-table-bg`              | `var(--s-bg-color-container)`  |
| `--s-table-bg-striped`      | `var(--s-fill-color-tertiary)` |
| `--s-table-header-bg`       | `var(--s-bg-color-container)`  |
| `--s-table-cell-padding-sm` | `4px 6px`                      |
| `--s-table-cell-padding`    | `4px 8px`                      |
| `--s-table-cell-padding-lg` | `6px 12px`                     |
| `--s-table-font-size-sm`    | `var(--s-font-size-sm)`        |
| `--s-table-font-size`       | `var(--s-font-size)`           |
| `--s-table-font-size-lg`    | `var(--s-font-size)`           |
