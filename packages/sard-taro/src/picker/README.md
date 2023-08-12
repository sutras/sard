# Picker 选择器

### 介绍

一个或多个可滚动列表选择器。

### 引入

```js
import { Picker } from 'sard-taro'
```

## 代码演示

### 普通选择器

%(${DEMO_PATH}/picker/demo/General.tsx)

### 对象类型数组

%(${DEMO_PATH}/picker/demo/ObjectOption.tsx)

### 多列

%(${DEMO_PATH}/picker/demo/Multiple.tsx)

### 对象类型多列

%(${DEMO_PATH}/picker/demo/ObjectMultiple.tsx)

### 级联选择

%(${DEMO_PATH}/picker/demo/Cascaded.tsx)

### 配合弹出框

%(${DEMO_PATH}/picker/demo/WithPopout.tsx)

## API

### PickerProps

| 属性         | 描述                          | 类型                                                                           | 默认值                                                   |
| ------------ | ----------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| columns      | 配置每一列的数据              | PickerOption[] \| PickerOption[][]                                             | []                                                       |
| optionKeys   | 自定义 `columns` 结构中的字段 | PickerOptionKeys                                                               | { label: 'label', value: 'value', children: 'children' } |
| value        | 选中项的值                    | any[]                                                                          | -                                                        |
| defaultValue | 默认选中项的值                | any[]                                                                          | -                                                        |
| onChange     | 选中项改变时触发              | (value: any[],selectedOptions: PickerOption[],selectedIndex: number[]) => void | -                                                        |

### PickerOption

```tsx
type PickerOption =
  | {
      label?: any
      value?: any
      children?: PickerOption[]
      [key: PropertyKey]: any
    }
  | number
  | string
```

### PickerOptionKeys

```tsx
interface PickerOptionKeys {
  label?: string
  value?: string
  children?: string
}
```

## 主题定制

### CSS 变量

%(./index.scss#variables)

## 原生 picker-view 缺点

- 隐藏状态下无法让其滚动到指定位置
- H5 和 RN 没有 immediateChange 属性
- 无法让其立即停止并滚动到指定位置
