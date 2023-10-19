# Pagination 分页

### 介绍

用于分割长列表，每次加载一页数据。

### 引入

```ts
import { Pagination } from 'sard'
```

## 代码演示

### 基础使用

设置 `total` 属性后便会渲染出页码。

@code('${DEMO_PATH}/pagination/demo/Basic.tsx')

### 显示省略号

默认点击省略号会向前或向后 5 页。

@code('${DEMO_PATH}/pagination/demo/Ellipsis.tsx')

### 简单分页

简单分页不显示页码按钮。

@code('${DEMO_PATH}/pagination/demo/Simple.tsx')

### 自定义

自定义页码按钮或前后按钮内容。

@code('${DEMO_PATH}/pagination/demo/Custom.tsx')

## API

### PaginationProps

| 属性             | 描述                   | 类型                              | 默认值  |
| ---------------- | ---------------------- | --------------------------------- | ------- |
| total            | 总记录数               | number                            | 0       |
| pageSize         | 每页记录数             | number                            | 10      |
| current          | 当前页码               | number                            | -       |
| defaultCurrent   | 默认页码               | number                            | 1       |
| onChange         | 页码改变时触发         | (page: number) => void            | -       |
| pageCount        | 总页数，默认自动计算   | number                            | -       |
| pageButtonCount  | 显示的页码按钮个数     | number                            | 5       |
| hideOnSinglePage | 只有一页时是否隐藏分页 | boolean                           | false   |
| type             | 分页类型               | 'simple' \| 'multi'               | 'multi' |
| ellipsis         | 是否显示省略号         | boolean                           | false   |
| multiCount       | 点击省略号跳转的页数   | number                            | 5       |
| prev             | 自定义上一页按钮内容   | React.ReactNode                   | -       |
| next             | 自定义下一页按钮内容   | React.ReactNode                   | -       |
| page             | 自定义页码按钮内容     | (page: number) => React.ReactNode | -       |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
