# Button 按钮

### 介绍

按钮用于开始一个即时操作。

### 引入

```js
import { Button } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Pale.tsx",
    "./demo/Mild.tsx",
    "./demo/Outline.tsx",
    "./demo/Text.tsx",
    "./demo/PaleText.tsx",
    "./demo/Color.tsx",
    "./demo/Round.tsx",
    "./demo/Disabled.tsx",
    "./demo/Block.tsx",
    "./demo/Size.tsx",
    "./demo/Loading.tsx"
  ]
</script>

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
| onClick      | 点击按钮时触发         | (event: React.MouseEvent) => void                                        | -         |

## 主题定制

### SCSS

```scss
$s-button-height: 36px !default;
$s-button-padding-y: 0 !default;
$s-button-padding-x: $s-font-size !default;
$s-button-border-radius: $s-border-radius !default;
$s-button-font-size: $s-font-size !default;

$s-button-height-sm: 28px !default;
$s-button-padding-y-sm: 0 !default;
$s-button-padding-x-sm: $s-font-size-sm !default;
$s-button-border-radius-sm: $s-border-radius-sm !default;
$s-button-font-size-sm: $s-font-size-sm !default;

$s-button-height-lg: 50px !default;
$s-button-padding-y-lg: 0 !default;
$s-button-padding-x-lg: $s-font-size-lg !default;
$s-button-border-radius-lg: $s-border-radius-lg !default;
$s-button-font-size-lg: $s-font-size-lg !default;

$s-button-line-height: $s-line-height !default;
$s-button-white-space: nowrap !default;
$s-button-border-width: 1px !default;

$s-button-alpha-opacity: $s-active-opacity !default;

$s-button-active-bg-shade-amount: 20% !default;
$s-button-active-bg-tint-amount: 20% !default;
$s-button-active-bg-more-tint-amount: 90% !default;

$s-button-active-bg: $s-bg-active !default;

$s-button-transition-duration: $s-transition-duration !default;

$s-button-round-border-radius: 1000px !default;

$s-button-loading-opacity: 0.6 !default;
$s-button-loading-text-margin-left: 0.5rem !default;
```
