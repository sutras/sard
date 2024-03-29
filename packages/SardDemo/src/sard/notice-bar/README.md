# NoticeBar 公告栏

### 介绍

用于循环播放展示一组消息通知。

### 引入

```ts
import { NoticeBar } from 'sard'
```

## 代码演示

### 基础使用

公告栏的内容长度溢出时会自动开启滚动播放。

@code('${DEMO_PATH}/notice-bar/demo/Basic.tsx')

### 强制滚动

无论公告栏内容多少都会滚动。

@code('${DEMO_PATH}/notice-bar/demo/Scrollable.tsx')

### 强制不滚动

无论公告栏内容多少都不会滚动。

@code('${DEMO_PATH}/notice-bar/demo/UnScrollable.tsx')

### 多行展示

默认文本不换行，设置 `wrap` 可以使其换行。

@code('${DEMO_PATH}/notice-bar/demo/Wrap.tsx')

### 自定义左边图标

可以自定义左边的图标、或者隐藏图标。

@code('${DEMO_PATH}/notice-bar/demo/LeftIcon.tsx')

### 可关闭的

设置 `closable` 属性可以在右边显示关闭按钮。

@code('${DEMO_PATH}/notice-bar/demo/Closable.tsx')

### 可链接的

设置 `linkable` 属性可以有右边显示箭头。

@code('${DEMO_PATH}/notice-bar/demo/Linkable.tsx')

### 自定义右边图标

设置 `rightIcon` 或 `rightIconProps` 可以修改右边的关闭按钮图标或者箭头图标。

@code('${DEMO_PATH}/notice-bar/demo/RightIcon.tsx')

### 自定义样式

通过 `color` 属性设置文本颜色，通过 `background` 属性设置背景色。

@code('${DEMO_PATH}/notice-bar/demo/Style.tsx')

### 垂直滚动

搭配 `NoticeBar` 和 `Swipe` 组件，可以实现垂直滚动的效果。

@code('${DEMO_PATH}/notice-bar/demo/Vertical.tsx')

## API

### NoticeBarProps

| 属性           | 描述                                     | 类型                         | 默认值 |
| -------------- | ---------------------------------------- | ---------------------------- | ------ |
| color          | 自定义颜色                               | string                       | -      |
| background     | 自定义背景色                             | string                       | -      |
| hideLeftIcon   | 隐藏左边图标                             | boolean                      | false  |
| leftIcon       | 自定义左边图标                           | React.ReactNode              | -      |
| leftIconProps  | 自定义左边图标的 `Props`                 | IconProps                    | -      |
| rightIcon      | 自定义右边图标                           | React.ReactNode              | -      |
| rightIconProps | 自定义右边图标的 `Props`                 | IconProps                    | -      |
| delay          | 动画延迟时间 (s)                         | number                       | 1      |
| speed          | 滚动速率 (px/s)                          | number                       | 50     |
| scrollable     | 是否开启滚动播放，内容长度溢出时默认开启 | boolean \| 'auto'            | 'auto' |
| wrap           | 是否开启文本换行                         | boolean                      | false  |
| closable       | 是否显示关闭按钮                         | boolean                      | false  |
| onClose        | 点击关闭按钮时触发                       | (event: ITouchEvent) => void | -      |
| linkable       | 是否展示右侧箭头                         | boolean                      | false  |
| onClick        | 点击公告栏时触发                         | (event: ITouchEvent) => void | -      |
| visible        | 是否显示公告栏                           | boolean                      | -      |
| defaultVisible | 默认是否显示公告栏                       | boolean                      | -      |
| onVisible      | 公告栏显隐时触发                         | (visible: boolean) => void   | -      |
| vertical       | 搭配 `Swipe` 组件实现垂直滚动            | boolean                      | false  |

## 主题定制

### SCSS 变量

@code('./index.scss#variables')
