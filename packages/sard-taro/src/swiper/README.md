# Swiper 滑块视图容器

### 介绍

滑动切换视图容器，可运用于 banner 轮播图等场景。

### 引入

```js
import { Swiper } from 'sard-taro'
```

## 代码演示

### 基础使用

```tsx
<Swiper className="demo-swiper" indicatorDots>
  <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
  <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
  <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
</Swiper>
```

### 受控

```tsx
export default () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handlePrev = () => {
    setActiveIndex((activeIndex) => {
      return Math.max(0, activeIndex - 1)
    })
  }

  const handleNext = () => {
    setActiveIndex((activeIndex) => {
      return Math.min(2, activeIndex + 1)
    })
  }

  return (
    <Button onClick={handlePrev}>prev</Button>
    <Button onClick={handleNext}>next</Button>
    <Swiper
      indicatorDots
      className="demo-swiper"
      current={activeIndex}
      onChange={(event) => setActiveIndex(event.detail.current)}
    >
      <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
      <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
      <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
    </Swiper>
  )
}
```

### 垂直

```tsx
<Swiper className="demo-swiper" indicatorDots vertical>
  <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
  <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
  <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
</Swiper>
```

### 自动播放

```tsx
<Swiper
  className="demo-swiper"
  autoplay
  duration={duration}
  interval={interval}
  indicatorDots
>
  <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
  <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
  <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
</Swiper>
```

### 循环滑动

```tsx
<Swiper className="demo-swiper" indicatorDots circular>
  <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
  <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
  <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
</Swiper>
```

## API

### SwiperProps

### SwiperItemProps

## 主题定制

### CSS 变量

%{variables}
