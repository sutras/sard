# Swiper 滑块视图容器

### 介绍

滑动切换视图容器，可运用于 banner 轮播图等场景。

### 引入

```js
import { Swiper } from 'sard'
```

## 代码演示

<script type="code">
  [
    "./demo/Basic.tsx",
    "./demo/Imperative.tsx",
    "./demo/Vertical.tsx",
    "./demo/Autoplay.tsx",
    "./demo/Loop.tsx"
  ]
</script>

## API

### SwiperProps

| 属性           | 描述                                                           | 类型                                                    | 默认值 |
| -------------- | -------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| defaultIndex   | 初始位置索引值                                                 | number                                                  | 0      |
| autoplay       | 是否自动切换                                                   | boolean                                                 | false  |
| interval       | 自动切换的间隔，单位为 ms                                      | boolean                                                 | 3000   |
| duration       | 动画时长，单位为 ms                                            | number                                                  | 400    |
| loop           | 是否循环滑动                                                   | boolean                                                 | false  |
| vertical       | 是否垂直滑动                                                   | boolean                                                 | false  |
| damping        | 阻尼系数                                                       | number                                                  | 3      |
| showDots       | 是否显示指示器                                                 | boolean                                                 | false  |
| dots           | 自定义显示指示器，`count` 滑块总数，`activeIndex` 当前滑块索引 | (count: number, activeIndex: number) => React.ReactNode | -      |
| dotColor       | 自定义指示器颜色                                               | string                                                  | -      |
| dotActiveColor | 自定义活动指示器颜色                                           | string                                                  | -      |
| dotClickable   | 是否可点击指示器进行切换                                       | string                                                  | false  |
| touchable      | 是否可进行触摸操作                                             | boolean                                                 | true   |
| onChange       | 切换时触发                                                     | (index: number) => void                                 | -      |
| onAnimateStart | 动画开始时触发                                                 | () => void                                              | -      |
| onAnimateEnd   | 动画结束时触发                                                 | () => void                                              | -      |
| onTouchStart   | 触摸开始时触发                                                 | (event: StrikePanEvent) => void                         | -      |
| onTouchMove    | 触摸移动时触发                                                 | (event: StrikePanEvent) => void                         | -      |
| onTouchEnd     | 触摸结束时触发                                                 | (event: StrikePanEvent) => void                         | -      |

### SwiperItemProps

| 属性    | 描述       | 类型                              | 默认值 |
| ------- | ---------- | --------------------------------- | ------ |
| onClick | 点击时触发 | (event: React.MouseEvent) => void | -      |

### Swiper 方法

| 名称    | 描述                   | 类型                                        |
| ------- | ---------------------- | ------------------------------------------- |
| swipeTo | 切换到指定下标的轮播图 | (index: number, animated?: boolean) => void |
| prev    | 切换到上一个轮播图     | (animated?: boolean) => void                |
| next    | 切换到下一个轮播图     | (animated?: boolean) => void                |

## 主题定制

### SCSS

```scss

```
