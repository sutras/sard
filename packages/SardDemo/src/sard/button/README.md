# Button 按钮

### 介绍

按钮用于开始一个即时操作。

### 引入

```ts
import { Button } from 'sard'
```

## 代码演示

### 按钮类型

`type` 属性用于配置按钮的类型。

@code('${DEMO_PATH}/button/demo/Type.tsx')

### 按钮主题色

`Button` 组件内置了几个主题色，可以使用 `theme` 属性来配置。

@code('${DEMO_PATH}/button/demo/Theme.tsx')

### 自定义颜色

如果内置主题色不合适，可以自定义主题色。如果需要设置渐变色，需要使用 `LinearGradient` 组件，并传递给 `before` 属性，以便可以兼容不同的端。不通类型按钮主题色设置查看下面案例代码。

@code('${DEMO_PATH}/button/demo/CustomTheme.tsx')

### 圆形按钮

使用 `round` 属性设置为圆形按钮。

@code('${DEMO_PATH}/button/demo/Round.tsx')

### 禁用按钮

禁用状态的按钮不可点击。

@code('${DEMO_PATH}/button/demo/Disabled.tsx')

### 按钮尺寸

内置三种尺寸以供选择。

@code('${DEMO_PATH}/button/demo/Size.tsx')

### 加载中

加载中的按钮不可点击。

@code('${DEMO_PATH}/button/demo/Loading.tsx')

### 图标按钮

按钮在配置了 `iconProps` 属性后将变成图标按钮，再加上 `round` 属性将得到一个正圆。

@code('${DEMO_PATH}/button/demo/Icon.tsx')

## API

### ButtonProps

| 属性         | 描述                         | 类型                                                                     | 默认值    |
| ------------ | ---------------------------- | ------------------------------------------------------------------------ | --------- |
| type         | 按钮类型                     | 'default' \| 'pale' \| 'mild' \| 'outline' \| 'text' \| 'pale-text'      | 'default' |
| theme        | 按钮主题色                   | 'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger' | 'primary' |
| size         | 按钮尺寸                     | 'mini' \| 'small' \| 'medium' \| 'large'                                 | 'medium'  |
| round        | 圆角按钮                     | boolean                                                                  | false     |
| disabled     | 禁用按钮                     | boolean                                                                  | false     |
| loading      | 加载状态                     | boolean                                                                  | false     |
| loadingProps | `Loading` 组件 `props`       | LoadingProps                                                             | -         |
| iconProps    | `Icon` 组件 `props`          | IconProps                                                                | -         |
| before       | 前置插槽，用来设置渐变色背景 | React.ReactNode                                                          | -         |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
