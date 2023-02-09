# Pagination 分页

### 介绍

用于分割长列表，每次加载一页数据。

### 引入

```js
import { Pagination } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Controlled.tsx",
    "./demo/Ellipsis.tsx",
    "./demo/Simple.tsx",
    "./demo/Custom.tsx"
  ]
</script>

## API

### PaginationProps

| 属性             | 描述                   | 类型                              | 默认值  |
| ---------------- | ---------------------- | --------------------------------- | ------- |
| total            | 总记录数               | number                            | 0       |
| pageSize         | 每页记录数             | number                            | 10      |
| current          | 当前页码               | number                            | -       |
| defaultCurrent   | 默认页码               | number                            | 1       |
| pageCount        | 总页数，默认自动计算   | number                            | -       |
| pageItemCount    | 显示的页码个数         | number                            | 5       |
| hideOnSinglePage | 只有一页时是否隐藏分页 | boolean                           | false   |
| type             | 分页类型               | 'simple' \| 'multi'               | 'multi' |
| ellipsis         | 是否显示省略号         | boolean                           | false   |
| prev             | 自定义上一页按钮内容   | React.ReactNode                   | -       |
| next             | 自定义下一页按钮内容   | React.ReactNode                   | -       |
| page             | 自定义页码             | (page: number) => React.ReactNode | -       |
| onChange         | 页码改变时触发         | (page: number) => void            | -       |

## 主题定制

### SCSS

```scss

```
