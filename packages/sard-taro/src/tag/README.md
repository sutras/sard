# Tag 标签

### 介绍

用于分类或概括事物属性的标签。

### 引入

```js
import { Tag } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/tag/demo/Basic.tsx)

### 主题色

%(${DEMO_PATH}/tag/demo/Theme.tsx)

### 镂空

%(${DEMO_PATH}/tag/demo/Plain.tsx)

### 圆角

%(${DEMO_PATH}/tag/demo/Round.tsx)

### 标记样式（半圆角）

%(${DEMO_PATH}/tag/demo/Mark.tsx)

### 尺寸

%(${DEMO_PATH}/tag/demo/Size.tsx)

### 自定义样式

%(${DEMO_PATH}/tag/demo/Style.tsx)

### 可关闭的

%(${DEMO_PATH}/tag/demo/Closable.tsx)

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
| onClick  | 点击标签时触发     | (event: ITouchEvent) => void                                             | -         |

## 主题定制

### CSS 变量

%(./index.scss#variables)
