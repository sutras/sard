# Rate 评分

### 介绍

用于对事物进行评级操作。

### 引入

```js
import { Rate } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/rate/demo/Basic.tsx)

### 半星

%(${DEMO_PATH}/rate/demo/AllowHalf.tsx)

### 自定义图标

%(${DEMO_PATH}/rate/demo/CustomIcon.tsx)

### 自定义颜色

%(${DEMO_PATH}/rate/demo/Color.tsx)

### 自定义尺寸和间距

%(${DEMO_PATH}/rate/demo/Size.tsx)

### 自定义数量

%(${DEMO_PATH}/rate/demo/Count.tsx)

### 允许清空

%(${DEMO_PATH}/rate/demo/AllowClear.tsx)

### 只读和禁用

%(${DEMO_PATH}/rate/demo/DisableReadOnly.tsx)

## API

### RateProps

| 属性         | 描述                         | 类型                    | 默认值 |
| ------------ | ---------------------------- | ----------------------- | ------ |
| value        | 选中图标数                   | number                  | -      |
| defaultValue | 默认选中图标数               | number                  | -      |
| allowHalf    | 是否允许半选                 | boolean                 | false  |
| allowClear   | 是否允许清空，划到最左边清空 | boolean                 | false  |
| count        | 图标总数                     | number                  | 5      |
| size         | 图标大小                     | number \| string        | -      |
| spacing      | 图标间距                     | number \| string        | -      |
| icon         | 自定义选中时的图标           | React.ReactNode         | -      |
| voidIcon     | 自定义未选中时的图标         | React.ReactNode         | -      |
| color        | 选中时的颜色                 | string                  | -      |
| voidColor    | 未选中时的颜色               | string                  | -      |
| disabled     | 禁用状态                     | boolean                 | false  |
| readOnly     | 只读状态                     | boolean                 | false  |
| onChange     | 选中图标数改变时触发         | (value: number) => void | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
