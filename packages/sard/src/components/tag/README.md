# Tag 标签

### 介绍

用于分类或概括事物属性的标签。

### 引入

```js
import { Tag } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Theme.tsx",
    "./demo/Plain.tsx",
    "./demo/Round.tsx",
    "./demo/Mark.tsx",
    "./demo/Size.tsx",
    "./demo/Style.tsx",
    "./demo/Closable.tsx"
  ]
</script>

## API

### TagProps

| 属性     | 描述               | 类型                                                                     | 默认值    |
| -------- | ------------------ | ------------------------------------------------------------------------ | --------- |
| theme    | 主题色             | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| round    | 圆角按标签         | boolean                                                                  | false     |
| plain    | 镂空标签           | boolean                                                                  | false     |
| mark     | 标记标签           | boolean                                                                  | false     |
| size     | 标签尺寸           | 'small' \| 'medium' \| 'large'                                           | 'medium'  |
| closable | 是否可关闭         | boolean                                                                  | false     |
| onClose  | 点击关闭按钮时触发 | () => void                                                               | -         |
| onClick  | 点击标签时触发     | (event: React.MouseEvent) => void                                        | -         |

## 主题定制

### SCSS

```scss

```
