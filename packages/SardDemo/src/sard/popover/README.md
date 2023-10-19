# Popover 气泡弹出框

### 介绍

弹出式的气泡菜单。

### 引入

```ts
import { Popover } from 'sard'
```

## 代码演示

### 基础使用

在 `reference` 触发 `onClick` 事件时会显示气泡弹出框。

@code('${DEMO_PATH}/popover/demo/Basic.tsx')

### 暗黑模式

设置 `theme="dark"` 会显示为暗黑模式。

@code('${DEMO_PATH}/popover/demo/Dark.tsx')

### 展示图标

通过 `options` 属性的`iconProps` 属性配置在左边展示的图标。

@code('${DEMO_PATH}/popover/demo/Icon.tsx')

### 禁用选项

禁用的选项无法点击。

@code('${DEMO_PATH}/popover/demo/Disabled.tsx')

### 水平排列

配置 `direction="horizontal"` 可以水平排列菜单。

@code('${DEMO_PATH}/popover/demo/Horizontal.tsx')

### 自定义内容

弹出框可以放置任何内容，而不仅仅是菜单。

@code('${DEMO_PATH}/popover/demo/Custom.tsx')

### 弹出位置

气泡弹出框会尽量在视窗中匹配各个位置以便可以完整展示，默认从底部展示

@code('${DEMO_PATH}/popover/demo/Placement.tsx')

## API

### PopoverProps

| 属性           | 描述                              | 类型                            | 默认值     |
| -------------- | --------------------------------- | ------------------------------- | ---------- |
| options        | 菜单选项列表                      | PopoverOption[]                 | []         |
| reference      | 触发气泡弹出框显示的元素          | React.ReactElement              | -          |
| refGap         | 气泡弹出框与`reference`元素的间距 | number                          | -          |
| viewportGap    | 气泡弹出框距与视窗的间距          | number                          | -          |
| placement      | 弹出位置                          | PopoverPlacement                | 'bottom'   |
| direction      | 菜单选项排列方向                  | 'vertical' \| 'horizontal'      | 'vertical' |
| theme          | 主题风格                          | 'dark' \| 'light'               | 'light'    |
| zIndex         | 弹出框层级                        | number                          | -          |
| onSelect       | 点击选项时触发                    | (option: PopoverOption) => void | -          |
| visible        | 是否显示气泡弹出框                | boolean                         | -          |
| defaultVisible | 默认是否显示气泡弹出框            | boolean                         | -          |
| onVisible      | 气泡弹出框显隐时触发              | (visible: boolean) => void      | -          |
| duration       | 气泡弹出框显隐持续的时间          | number                          | 250        |
| mask           | 是否显示遮罩                      | boolean                         | true       |
| transparent    | 遮罩是否透明                      | boolean                         | true       |
| maskClass      | 遮罩类名                          | string                          | -          |
| maskStyle      | 遮罩样式                          | CSSProperties                   | -          |
| onMaskClick    | 点击遮罩触发                      | (event: ITouchEvent) => void    | -          |
| onEnter        | 准备显示时触发                    | () => void                      | -          |
| onEntering     | 开始显示时触发                    | () => void                      | -          |
| onEntered      | 完全显示时触发                    | () => void                      | -          |
| onExit         | 准备隐藏时触发                    | () => void                      | -          |
| onExiting      | 开始隐藏时触发                    | () => void                      | -          |
| onExited       | 完全隐藏时触发                    | () => void                      | -          |

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

### SCSS 变量

@code('./index.scss#variables')
