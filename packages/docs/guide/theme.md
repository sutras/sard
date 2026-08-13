---
title: 定制主题
order: 1
group:
  title: 进阶
---

## 介绍

`sard` 把组件可定制的 css 声明值通过 css 变量表示，并将通用 css 变量和组件 css 变量声明在 `:root` 选择器下。

自定义主题的方式是覆盖 `:root` 的样式声明（使用双 `:root` 可避免声明顺序问题）：

```css
:root:root {
  --s-color-primary: red;
}
```

局部自定义主题：

```html
<div style="--s-color-primary: green;">
  <s-button>button</s-button>
</div>
```

## 基础 CSS 变量

### 灰度值

| CSS 变量       | 值        |
| -------------- | --------- |
| `--s-white`    | `#fff`    |
| `--s-gray-50`  | `#fafafa` |
| `--s-gray-100` | `#f3f3f3` |
| `--s-gray-125` | `#ececec` |
| `--s-gray-150` | `#e5e5e5` |
| `--s-gray-200` | `#dedede` |
| `--s-gray-300` | `#c4c4c4` |
| `--s-gray-400` | `#ababab` |
| `--s-gray-500` | `#8f8f8f` |
| `--s-gray-600` | `#717171` |
| `--s-gray-700` | `#525252` |
| `--s-gray-800` | `#353535` |
| `--s-gray-900` | `#181818` |
| `--s-gray-950` | `#0e0e0e` |
| `--s-black`    | `#000`    |

### 灰度值 RGB

| CSS 变量           | 值              |
| ------------------ | --------------- |
| `--s-white-rgb`    | `255, 255, 255` |
| `--s-gray-50-rgb`  | `250, 250, 250` |
| `--s-gray-100-rgb` | `243, 243, 243` |
| `--s-gray-125-rgb` | `236, 236, 236` |
| `--s-gray-150-rgb` | `229, 229, 229` |
| `--s-gray-200-rgb` | `222, 222, 222` |
| `--s-gray-300-rgb` | `196, 196, 196` |
| `--s-gray-400-rgb` | `171, 171, 171` |
| `--s-gray-500-rgb` | `143, 143, 143` |
| `--s-gray-600-rgb` | `113, 113, 113` |
| `--s-gray-700-rgb` | `82, 82, 82`    |
| `--s-gray-800-rgb` | `53, 53, 53`    |
| `--s-gray-900-rgb` | `24, 24, 24`    |
| `--s-gray-950-rgb` | `14, 14, 14`    |
| `--s-black-rgb`    | `0, 0, 0`       |

### 主题色

| CSS 变量              | 值                  |
| --------------------- | ------------------- |
| `--s-color-primary`   | `#3b82f6`           |
| `--s-color-secondary` | `var(--s-gray-600)` |
| `--s-color-success`   | `#22c55e`           |
| `--s-color-warning`   | `#eab308`           |
| `--s-color-danger`    | `#ef4444`           |

### 主题色 RGB

| CSS 变量                  | 值              |
| ------------------------- | --------------- |
| `--s-color-primary-rgb`   | `59, 130, 246`  |
| `--s-color-secondary-rgb` | `113, 113, 113` |
| `--s-color-success-rgb`   | `34, 197, 94`   |
| `--s-color-warning-rgb`   | `234, 179, 8`   |
| `--s-color-danger-rgb`    | `239, 68, 68`   |

### 文本颜色

| CSS 变量                   | 值                  |
| -------------------------- | ------------------- |
| `--s-text-color-emphasis`  | `var(--s-black)`    |
| `--s-text-color-primary`   | `var(--s-gray-900)` |
| `--s-text-color-secondary` | `var(--s-gray-700)` |
| `--s-text-color-tertiary`  | `var(--s-gray-600)` |
| `--s-text-color-fourth`    | `var(--s-gray-400)` |
| `--s-text-color-disabled`  | `var(--s-gray-400)` |

### 背景色

| CSS 变量                     | 值                   |
| ---------------------------- | -------------------- |
| `--s-bg-color-layout`        | `var(--s-gray-100)`  |
| `--s-bg-color-container`     | `var(--s-white)`     |
| `--s-bg-color-container-rgb` | `var(--s-white-rgb)` |
| `--s-bg-color-elevated`      | `var(--s-white)`     |
| `--s-bg-color-elevated-rgb`  | `var(--s-white-rgb)` |
| `--s-bg-color-extreme`       | `var(--s-white)`     |
| `--s-bg-color-disabled`      | `var(--s-gray-150)`  |
| `--s-bg-color-active`        | `var(--s-gray-125)`  |
| `--s-bg-color-active-dark`   | `var(--s-gray-200)`  |
| `--s-fill-color`             | `var(--s-gray-200)`  |
| `--s-fill-color-secondary`   | `var(--s-gray-150)`  |
| `--s-fill-color-tertiary`    | `var(--s-gray-125)`  |
| `--s-fill-color-fourth`      | `var(--s-gray-100)`  |

### 边框

| CSS 变量                    | 值                  |
| --------------------------- | ------------------- |
| `--s-border-style`          | `solid`             |
| `--s-border-width`          | `1px`               |
| `--s-border-color-dark`     | `var(--s-gray-300)` |
| `--s-border-color`          | `var(--s-gray-150)` |
| `--s-border-color-light`    | `var(--s-gray-125)` |
| `--s-border-color-lighter`  | `var(--s-gray-100)` |
| `--s-border-color-disabled` | `var(--s-gray-200)` |

### 圆角

| CSS 变量                 | 值       |
| ------------------------ | -------- |
| `--s-border-radius-xs`   | `2px`    |
| `--s-border-radius-sm`   | `4px`    |
| `--s-border-radius`      | `6px`    |
| `--s-border-radius-lg`   | `10px`   |
| `--s-border-radius-xl`   | `14px`   |
| `--s-border-radius-full` | `9999px` |

### 字体

| CSS 变量               | 值                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--s-font-family`      | `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif` |
| `--s-font-family-code` | `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`                                                                              |

### 字号

| CSS 变量            | 值     |
| ------------------- | ------ |
| `--s-font-size-xs`  | `10px` |
| `--s-font-size-sm`  | `12px` |
| `--s-font-size`     | `14px` |
| `--s-font-size-lg`  | `16px` |
| `--s-font-size-xl`  | `24px` |
| `--s-font-size-2xl` | `32px` |

### 字重

| CSS 变量                 | 值    |
| ------------------------ | ----- |
| `--s-font-weight-bold`   | `600` |
| `--s-font-weight-normal` | `400` |
| `--s-font-weight-light`  | `300` |

### 行高

| CSS 变量                  | 值      |
| ------------------------- | ------- |
| `--s-line-height-none`    | `1`     |
| `--s-line-height-tight`   | `1.25`  |
| `--s-line-height-snug`    | `1.375` |
| `--s-line-height-normal`  | `1.5`   |
| `--s-line-height-relaxed` | `1.625` |
| `--s-line-height-loose`   | `2`     |

### 尺寸

| CSS 变量       | 值     |
| -------------- | ------ |
| `--s-size-3xs` | `2px`  |
| `--s-size-2xs` | `4px`  |
| `--s-size-xs`  | `8px`  |
| `--s-size-sm`  | `12px` |
| `--s-size`     | `16px` |
| `--s-size-lg`  | `20px` |
| `--s-size-xl`  | `24px` |
| `--s-size-2xl` | `32px` |
| `--s-size-3xl` | `40px` |
| `--s-size-4xl` | `48px` |
| `--s-size-5xl` | `56px` |
| `--s-size-6xl` | `64px` |

### 内容尺寸

| CSS 变量                 | 值                               |
| ------------------------ | -------------------------------- |
| `--s-content-height-2xs` | `24px`                           |
| `--s-content-height-xs`  | `32px`                           |
| `--s-content-height-sm`  | `40px`                           |
| `--s-content-height`     | `44px`                           |
| `--s-content-height-lg`  | `48px`                           |
| `--s-content-padding-y`  | `var(--s-size-xs)`               |
| `--s-content-padding-x`  | `var(--s-size)`                  |
| `--s-content-padding`    | `var(--s-size-xs) var(--s-size)` |

### z-index

| CSS 变量                | 值     |
| ----------------------- | ------ |
| `--s-z-index`           | `1000` |
| `--s-z-index-secondary` | `100`  |
| `--s-z-index-tertiary`  | `10`   |

### 阴影

| CSS 变量                    | 值                                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `--s-box-shadow`            | `0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)` |
| `--s-box-shadow-secondary`  | `0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)` |
| `--s-box-shadow-tertiary`   | `0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px 0 rgba(0, 0, 0, 0.03)`     |
| `--s-box-shadow-side-color` | `rgba(0, 0, 0, 0.15)`                                                                                      |
| `--s-box-shadow-left`       | `inset 10px 0 10px -10px var(--s-box-shadow-side-color)`                                                   |
| `--s-box-shadow-right`      | `inset -10px 0 10px -10px var(--s-box-shadow-side-color)`                                                  |
| `--s-box-shadow-top`        | `inset 0 10px 10px -10px var(--s-box-shadow-side-color)`                                                   |
| `--s-box-shadow-bottom`     | `inset 0 -10px 10px -10px var(--s-box-shadow-side-color)`                                                  |

### 遮罩

| CSS 变量                | 值                   |
| ----------------------- | -------------------- |
| `--s-overlay-legible`   | `rgba(0, 0, 0, 0.1)` |
| `--s-overlay`           | `rgba(0, 0, 0, 0.5)` |
| `--s-overlay-illegible` | `rgba(0, 0, 0, 0.7)` |

### 透明度

| CSS 变量               | 值    |
| ---------------------- | ----- |
| `--s-opacity-disabled` | `0.6` |
| `--s-opacity-active`   | `0.5` |
| `--s-opacity-loading`  | `0.6` |
| `--s-opacity-theme-bg` | `0.1` |

### 光标

| CSS 变量              | 值            |
| --------------------- | ------------- |
| `--s-cursor-disabled` | `not-allowed` |
| `--s-cursor-loading`  | `wait`        |

### filter

| CSS 变量              | 值                |
| --------------------- | ----------------- |
| `--s-filter-disabled` | `grayscale(100%)` |

### 过渡时间

| CSS 变量            | 值      |
| ------------------- | ------- |
| `--s-duration-slow` | `350ms` |
| `--s-duration`      | `250ms` |
| `--s-duration-fast` | `150ms` |

## 组件 CSS 变量

组件介绍页面底部会展示对应组件的 css 变量，例如：[按钮组件介绍页](../components/button#样式变量)
