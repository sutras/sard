# Rate 评分

### 介绍

用于对事物进行评级操作。

### 引入

```ts
import { Rate } from 'sard-taro'
```

## 代码演示

### 基础使用

使用 `value` 和 `onChange` 属性使其变成受控组件。

%(${DEMO_PATH}/rate/demo/Basic.tsx)

### 半星

设置 `allowHalf` 属性后可以选中半星。

%(${DEMO_PATH}/rate/demo/AllowHalf.tsx)

### 自定义图标

通过 `iconProps` 属性设置选中时的图标，`voidIconProps` 属性设置未选中时的图标。
或者通过 `icon` 和 `voidIcon` 完全定义图标。

%(${DEMO_PATH}/rate/demo/CustomIcon.tsx)

### 自定义颜色

通过 `color` 属性设置选中时的颜色，`voidColor` 设置未选中时的颜色。

%(${DEMO_PATH}/rate/demo/Color.tsx)

### 自定义尺寸和间距

通过 `size` 属性设置图标大小。
通过 `gap` 属性设置图标间距。

%(${DEMO_PATH}/rate/demo/Size.tsx)

### 自定义数量

通过 `count` 属性设置评分总数。

%(${DEMO_PATH}/rate/demo/Count.tsx)

### 允许清空

当 `clearable` 属性设置为 `true`，再次点击相同的值时，可以将值重置为 0。

%(${DEMO_PATH}/rate/demo/Clearable.tsx)

### 只读和禁用

只读或禁用后不可操作。

%(${DEMO_PATH}/rate/demo/DisableReadOnly.tsx)

## API

### RateProps

| 属性          | 描述                         | 类型                    | 默认值 |
| ------------- | ---------------------------- | ----------------------- | ------ |
| value         | 选中图标数                   | number                  | -      |
| defaultValue  | 默认选中图标数               | number                  | -      |
| allowHalf     | 是否允许半选                 | boolean                 | false  |
| clearable     | 是否允许清空，划到最左边清空 | boolean                 | false  |
| count         | 图标总数                     | number                  | 5      |
| size          | 图标大小                     | number                  | 20     |
| gap           | 图标间距                     | number                  | 10     |
| icon          | 自定义选中时的图标           | React.ReactNode         | -      |
| iconProps     | 自定义选中时的图标           | IconProps               | -      |
| voidIcon      | 自定义未选中时的图标         | React.ReactNode         | -      |
| voidIconProps | 自定义未选中时的图标         | IconProps               | -      |
| color         | 选中时的颜色                 | string                  | -      |
| voidColor     | 未选中时的颜色               | string                  | -      |
| disabled      | 禁用状态                     | boolean                 | false  |
| readOnly      | 只读状态                     | boolean                 | false  |
| onChange      | 选中图标数改变时触发         | (value: number) => void | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
