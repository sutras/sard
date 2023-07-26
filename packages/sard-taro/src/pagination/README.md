# Pagination 分页

### 介绍

用于分割长列表，每次加载一页数据。

### 引入

```js
import { Pagination } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Pagination total={100} pageSize={10} />
```

### 受控的

```tsx
export default () => {
  const [current, setCurrent] = useState(1)

  return (
    <Pagination
      total={100}
      pageSize={10}
      current={current}
      onChange={setCurrent}
    />
  )
}
```

### 显示省略号

```tsx
<Pagination total={100} pageSize={10} ellipsis />
```

### 简单分页

```tsx
<Pagination total={43} pageSize={10} type="simple" />
```

### 自定义

```tsx
<Pagination
  total={100}
  pageSize={10}
  prev={<Icon name="left"></Icon>}
  next={<Icon name="right"></Icon>}
  page={(page) =>
    page === 2 ? <Icon prefix="demo-icon" name="emoji-smile"></Icon> : page
  }
/>
```

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

### CSS 变量

%{variables}
