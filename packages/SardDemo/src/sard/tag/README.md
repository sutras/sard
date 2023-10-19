# Tag 标签

### 介绍

用于分类或概括事物属性的标签。

### 引入

```ts
import { Tag } from 'sard'
```

## 代码演示

### 基础使用

通过 `theme` 属性控制标签颜色。

@code('${DEMO_PATH}/tag/demo/Basic.tsx')

### 镂空

设置 `plain` 属性设置为空心样式。

@code('${DEMO_PATH}/tag/demo/Plain.tsx')

### 圆角

通过 `round` 设置为圆角样式。

@code('${DEMO_PATH}/tag/demo/Round.tsx')

### 标记样式（半圆角）

通过 `mark` 设置为标记样式(半圆角)。

@code('${DEMO_PATH}/tag/demo/Mark.tsx')

### 尺寸

通过 `size` 属性调整标签大小。

@code('${DEMO_PATH}/tag/demo/Size.tsx')

### 自定义样式

通过 `color` 和 `textColor` 属性设置标签颜色。

@code('${DEMO_PATH}/tag/demo/Style.tsx')

### 可关闭的

添加 `closeable` 属性表示标签是可关闭的，点击关闭按钮时会触发 `onClose` 事件。

@code('${DEMO_PATH}/tag/demo/Closable.tsx')

## API

### TagProps

| 属性      | 描述               | 类型                                                                     | 默认值    |
| --------- | ------------------ | ------------------------------------------------------------------------ | --------- |
| theme     | 主题色             | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| round     | 圆角按标签         | boolean                                                                  | false     |
| plain     | 镂空标签           | boolean                                                                  | false     |
| mark      | 标记标签           | boolean                                                                  | false     |
| size      | 标签尺寸           | 'small' \| 'medium' \| 'large'                                           | 'medium'  |
| color     | 标签颜色           | string                                                                   | -         |
| textColor | 文本颜色           | string                                                                   | -         |
| closable  | 是否可关闭         | boolean                                                                  | false     |
| onClose   | 点击关闭按钮时触发 | () => void                                                               | -         |
| onClick   | 点击标签时触发     | (event: ITouchEvent) => void                                             | -         |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
