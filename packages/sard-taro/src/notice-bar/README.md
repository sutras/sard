# NoticeBar 公告栏

### 介绍

用于循环播放展示一组消息通知。

### 引入

```js
import { NoticeBar } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<NoticeBar>这是一条公告！</NoticeBar>

<NoticeBar>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 强制滚动

```tsx
<NoticeBar scrollable>这是一条公告！</NoticeBar>

<NoticeBar scrollable>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 强制不滚动

```tsx
<NoticeBar scrollable={false}>这是一条公告！</NoticeBar>

<NoticeBar scrollable={false}>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 多行展示

```tsx
<NoticeBar wrap>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 自定义左边图标

```tsx
<NoticeBar
  leftIconProps={{ prefix: 'demo-icon', name: 'bell', size: 16 }}
>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>

<NoticeBar leftIcon="">
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>

<NoticeBar leftIcon="消息">
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 可关闭的

```tsx
<NoticeBar closable onClose={() => console.log('close')}>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 可点击的

```tsx
<NoticeBar linkable onClick={() => console.log('click')}>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 自定义右边图标

```tsx
<NoticeBar
  closable
  onClose={() => console.log('close')}
  rightIconProps={{ name: 'x-circle-fill' }}
>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 自定义样式

```tsx
<NoticeBar
  color="var(--sar-primary)"
  background="rgba(var(--sar-primary-rgb), 0.1)"
>
  这是一条很长很长很长很长很长很长很长很长很长很长的公告！
</NoticeBar>
```

### 垂直滚动

```tsx
<NoticeBar scrollable={false}>
  <Swiper autoplay vertical interval={1500} circular style={{ height: '100%' }}>
    <Swiper.Item>1. 这是一条公告！</Swiper.Item>
    <Swiper.Item>2. 这是一条公告！</Swiper.Item>
    <Swiper.Item>3. 这是一条公告！</Swiper.Item>
  </Swiper>
</NoticeBar>
```

## API

### NoticeBarProps

| 属性           | 描述                                     | 类型                         | 默认值 |
| -------------- | ---------------------------------------- | ---------------------------- | ------ |
| color          | 自定义颜色                               | string                       | -      |
| background     | 自定义背景色                             | string                       | -      |
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

%{variables}
