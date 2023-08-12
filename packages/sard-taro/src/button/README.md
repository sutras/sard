# Button 按钮

### 介绍

按钮用于开始一个即时操作。

### 引入

```js
import { Button } from 'sard-taro'
```

## 代码演示

### 按钮类型

%(${DEMO_PATH}/button/demo/Type.tsx)

### 按钮主题色

%(${DEMO_PATH}/button/demo/Theme.tsx)

### 自定义颜色

%(${DEMO_PATH}/button/demo/CustomTheme.tsx)

### 圆形按钮

%(${DEMO_PATH}/button/demo/Round.tsx)

### 禁用按钮

%(${DEMO_PATH}/button/demo/Disabled.tsx)

### 块级按钮

%(${DEMO_PATH}/button/demo/Block.tsx)

### 按钮尺寸

%(${DEMO_PATH}/button/demo/Size.tsx)

### 加载中

%(${DEMO_PATH}/button/demo/Loading.tsx)

## API

### ButtonProps

| 属性         | 描述                   | 类型                                                                     | 默认值    |
| ------------ | ---------------------- | ------------------------------------------------------------------------ | --------- |
| type         | 按钮类型               | 'default' \| 'pale' \| 'mild' \| 'outline' \| 'text' \| 'pale-text'      | 'default' |
| theme        | 按钮主题色             | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| size         | 按钮尺寸               | 'medium' \| 'small' \| 'large'                                           | 'medium'  |
| round        | 圆角按钮               | boolean                                                                  | false     |
| block        | 块级按钮               | boolean                                                                  | false     |
| disabled     | 禁用按钮               | boolean                                                                  | false     |
| loading      | 加载中状态             | boolean                                                                  | false     |
| loadingText  | 加载文本               | React.ReactNode                                                          | -         |
| loadingProps | `Loading` 组件 `props` | LoadingProps                                                             | -         |

## 主题定制

### CSS 变量

%(./index.scss#variables)
