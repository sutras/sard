# Badge 徽标

### 介绍

用于在各组件右上角显示消息数量以吸引用户处理。

### 引入

```js
import { Badge } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/badge/demo/Basic.tsx)

### 最大值

默认超过 99 的值会显示 99+，可以通过 max 设置最大显示数值

%(${DEMO_PATH}/badge/demo/Max.tsx)

### 值为 0 时不隐藏

值为 0 时，会隐藏，可通过 showZero 让其值为 0 时依然显示。

%(${DEMO_PATH}/badge/demo/ShowZero.tsx)

### 圆点显示

%(${DEMO_PATH}/badge/demo/Dot.tsx)

### 自定义颜色

%(${DEMO_PATH}/badge/demo/Color.tsx)

### 独立展示

%(${DEMO_PATH}/badge/demo/OnlyBadge.tsx)

### 自定义内容

%(${DEMO_PATH}/badge/demo/Custom.tsx)

### 不包裹组件

通常使用徽标包裹组件， 如果要在结构固定的组件里添加徽标，不好将其包裹，可以给组件加个相对定位，让组件包裹徽标，并添加 `fixed` 属性。

%(${DEMO_PATH}/badge/demo/UnWrap.tsx)

## API

### BadgeProps

| 属性      | 描述                                                       | 类型                      | 默认值 |
| --------- | ---------------------------------------------------------- | ------------------------- | ------ |
| value     | 展示的数字                                                 | number \| React.ReactNode | 0      |
| max       | 默认超过 99 的值会显示 99+，可以通过 max 设置最大显示数值  | number                    | 99     |
| showZero  | 值为 0 时，会隐藏，可通过 `showZero` 让其值为 0 时依然显示 | boolean                   | false  |
| color     | 自定义背景颜色                                             | string                    | -      |
| textColor | 自定义文字颜色                                             | string                    | -      |
| isDot     | 显示圆点                                                   | boolean                   | false  |
| fixed     | 是否定位到右上角                                           | boolean                   | false  |

## 主题定制

### CSS 变量

%(./index.scss#variables)
