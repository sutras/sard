---
title: Swiper
subtitle: 轮播图
group: 数据展示
---

## 介绍

滑动切换视图容器，可运用于banner轮播图等场景。

## 代码演示

### 基础使用

通过 `Swiper` 和 `SwiperItem` 组件构建轮播，使用 `show-indicator` 显示指示点，通过 `change` 事件监听切换。

<<< @demo/swiper/demo/Basic.vue

### 纵向滚动

使用 `vertical` 将滑动方向切换为纵向。

<<< @demo/swiper/demo/Vertical.vue

### 循环滑动

使用 `loop` 开启循环滑动，可在首尾之间无缝切换。

<<< @demo/swiper/demo/Loop.vue

### 自动播放

使用 `autoplay` 开启自动播放，通过 `delay` 设置间隔时间（毫秒）。

<<< @demo/swiper/demo/AutoPlay.vue

### 自定义指示器

通过 `v-model` 绑定当前下标，可以自定义指示器的样式和位置。

<<< @demo/swiper/demo/DotType.vue

### 展示标题

在滑块内叠加标题文本，可随轮播切换展示不同标题。

<<< @demo/swiper/demo/Title.vue

### 嵌入视频

在滑块中嵌入视频，通过监听 `v-model` 控制视频的播放与暂停。

<<< @demo/swiper/demo/Video.vue

`VideoSlide.vue`
<<< @demo/swiper/demo/VideoSlide.vue

### 多项展示

使用 `slides-per-view` 设置同时展示的滑块数量，配合 `space-between` 设置间距。

<<< @demo/swiper/demo/MultipleItems.vue

### 组切换

使用 `slides-per-group` 设置每次切换的滑块数量，配合 `slides-per-view` 可实现分组滑动效果。

<<< @demo/swiper/demo/Group.vue

### 缩放效果

通过 `v-model` 获取当前下标，结合 CSS transform 实现缩放切换效果。

<<< @demo/swiper/demo/Scale.vue

### 多项居中

使用 `centered-slides` 将活动滑块居中显示。

<<< @demo/swiper/demo/MultipleCenter.vue

### 自动高度

使用 `auto-height` 让轮播容器自动适应当前滑块的高度，适用于每个滑块内容高度不一致的场景。

<<< @demo/swiper/demo/AutoHeight.vue

### 嵌套轮播

Swiper 支持嵌套使用，内外层轮播互不干扰，各自独立滑动。

<<< @demo/swiper/demo/Nested.vue

## API

### SwiperProps

| 属性             | 描述                   | 类型    | 默认值 |
| ---------------- | ---------------------- | ------- | ------ |
| model-value      | 当前滑块的下标         | number  | 0      |
| show-indicator   | 是否显示指示点         | boolean | false  |
| vertical         | 滑动方向是否为纵向     | boolean | false  |
| speed            | 滑动动画时长（ms）     | number  | 300    |
| autoplay         | 是否自动播放           | boolean | false  |
| delay            | 自动播放间隔时间（ms） | number  | 3000   |
| loop             | 是否启用循环滑动       | boolean | false  |
| slides-per-view  | 同时展示的滑块数量     | number  | 1      |
| slides-per-group | 每次切换的滑块数量     | number  | 1      |
| space-between    | 滑块之间的间距（px）   | number  | 0      |
| centered-slides  | 是否居中显示活动滑块   | boolean | false  |
| allow-touch-move | 是否允许触摸滑动       | boolean | true   |
| auto-height      | 是否自动适应内容高度   | boolean | false  |

### SwiperEmits

| 事件               | 描述           | 类型                      |
| ------------------ | -------------- | ------------------------- |
| change             | 滑块切换时触发 | `(index: number) => void` |
| update:model-value | 滑块切换时触发 | `(index: number) => void` |

### SwiperSlots

| 插槽名  | 描述         |
| ------- | ------------ |
| default | 轮播项的内容 |

## 主题定制

### 样式变量

| CSS 变量                       | 值                            |
| ------------------------------ | ----------------------------- |
| `--s-swiper-height`            | `150px`                       |
| `--s-swiper-dots-margin`       | `10px`                        |
| `--s-swiper-dots-gap`          | `6px`                         |
| `--s-swiper-dot-bg`            | `rgba(255, 255, 255, 0.3)`    |
| `--s-swiper-dot-width`         | `6px`                         |
| `--s-swiper-dot-width-active`  | `6px`                         |
| `--s-swiper-dot-height`        | `6px`                         |
| `--s-swiper-dot-height-active` | `6px`                         |
| `--s-swiper-dot-border-radius` | `var(--s-border-radius-full)` |
| `--s-swiper-dot-bg-active`     | `var(--s-white)`              |
