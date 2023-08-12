# NoticeBar 公告栏

### 介绍

用于循环播放展示一组消息通知。

### 引入

```js
import { NoticeBar } from 'sard-taro'
```

## 代码演示

### 基础使用

%(${DEMO_PATH}/notice-bar/demo/Basic.tsx)

### 强制滚动

%(${DEMO_PATH}/notice-bar/demo/Scrollable.tsx)

### 强制不滚动

%(${DEMO_PATH}/notice-bar/demo/UnScrollable.tsx)

### 多行展示

%(${DEMO_PATH}/notice-bar/demo/Wrap.tsx)

### 自定义左边图标

%(${DEMO_PATH}/notice-bar/demo/LeftIcon.tsx)

### 可关闭的

%(${DEMO_PATH}/notice-bar/demo/Closable.tsx)

### 可点击的

%(${DEMO_PATH}/notice-bar/demo/Linkable.tsx)

### 自定义右边图标

%(${DEMO_PATH}/notice-bar/demo/RightIcon.tsx)

### 自定义样式

%(${DEMO_PATH}/notice-bar/demo/Style.tsx)

### 垂直滚动

%(${DEMO_PATH}/notice-bar/demo/Vertical.tsx)

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
| onClick        | 点击公告栏时触发                         | (event: ITouchEvent) => void | -      |
| visible        | 是否显示公告栏                           | boolean                      | -      |
| defaultVisible | 默认是否显示公告栏                       | boolean                      | -      |
| onVisible      | 公告栏显隐时触发                         | (visible: boolean) => void   | -      |

## 主题定制

### CSS 变量

%(./index.scss#variables)
