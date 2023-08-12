# Popover 气泡弹出框

### 介绍

弹出式的气泡菜单。

### 引入

```js
import { Popover } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/popover/demo/Basic.tsx)

### 暗黑模式

%(${DEMO_PATH}/popover/demo/Dark.tsx)

### 展示图标

%(${DEMO_PATH}/popover/demo/Icon.tsx)

### 禁用选项

%(${DEMO_PATH}/popover/demo/Disabled.tsx)

### 水平排列

%(${DEMO_PATH}/popover/demo/Horizontal.tsx)

### 自定义内容

%(${DEMO_PATH}/popover/demo/Custom.tsx)

### 弹出位置

%(${DEMO_PATH}/popover/demo/Placement.tsx)

## API

### PopoverProps

| 属性           | 描述                              | 类型                            | 默认值     |
| -------------- | --------------------------------- | ------------------------------- | ---------- |
| options        | 菜单选项列表                      | PopoverOption[]                 | []         |
| reference      | 触发气泡弹出框显示的元素          | React.ReactElement              | -          |
| refGap         | 气泡弹出框与`reference`元素的间距 | number                          | -          |
| viewportGap    | 气泡弹出框距与视窗的间距          | number                          | -          |
| placement      | 弹出位置                          | PopoverPlacement                | -          |
| direction      | 菜单选项排列方向                  | 'vertical' \| 'horizontal'      | 'vertical' |
| theme          | 主题风格                          | 'dark' \| 'light'               | 'light'    |
| onSelect       | 点击选项时触发                    | (option: PopoverOption) => void | -          |
| visible        | 是否显示气泡弹出框                | boolean                         | -          |
| defaultVisible | 默认是否显示气泡弹出框            | boolean                         | -          |
| onVisible      | 气泡弹出框显隐时触发              | (visible: boolean) => void      | -          |

### PopoverOption

| 属性      | 描述           | 类型            | 默认值 |
| --------- | -------------- | --------------- | ------ |
| text      | 选项文本       | React.ReactNode | -      |
| disabled  | 是否禁用选项   | boolean         | -      |
| iconProps | 选项左侧的图标 | IconProps       | -      |

### PopoverPlacement

```tsx
type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
```

## 主题定制

### CSS 变量

%(./index.scss#variables)
